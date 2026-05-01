// Resolve which items to show in a phase, given session flags and carry-forwards from prior phases
export function resolvePhaseItems(phase, flags, priorPhases, allPriorPhaseData) {
  const items = []

  // Inject carry-forward items from all prior phases
  allPriorPhaseData.forEach(({ phase: priorPhase, state }) => {
    if (!priorPhase.carryForwardRules || !state) return
    priorPhase.carryForwardRules.forEach(rule => {
      const { checkpoint, value } = rule.condition
      const answer = state.checkpoints?.[checkpoint]
      if (answer === value || (value === false && !answer)) {
        items.push({ ...rule.injectItem, _injected: true })
      }
    })
  })

  // Add phase's own items, filtered by conditions
  phase.items.forEach(item => {
    if (item.condition) {
      const flagVal = flags[item.condition.flag]
      if (flagVal !== item.condition.value) return
    }
    items.push(item)
  })

  return items
}

export function phaseCompletionPercent(phase, phaseState, flags, allPriorPhaseData = []) {
  if (!phaseState) return 0
  const items = resolvePhaseItems(phase, flags, null, allPriorPhaseData)
  const essentialItems = items.filter(i => i.priority === 'E' || i.priority === 'H')
  if (essentialItems.length === 0) return 100
  const done = essentialItems.filter(i => phaseState.items?.[i.id] === 'done').length
  return Math.round((done / essentialItems.length) * 100)
}
