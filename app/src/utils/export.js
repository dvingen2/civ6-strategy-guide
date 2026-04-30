export function buildExportText(session, phases) {
  if (!session) return ''

  const { setup, flags } = session
  const lines = []

  lines.push('=== CIV 6 ARABIA STRATEGY — GAME LOG ===')
  lines.push('')
  lines.push(`Leader:     Saladin ${setup.leader === 'vizier' ? '(Vizier)' : '(Sultan)'}`)
  lines.push(`Map:        ${setup.mapType}`)
  lines.push(`Size:       ${setup.mapSize}`)
  lines.push(`Difficulty: ${setup.difficulty}`)
  lines.push(`Started:    ${new Date(session.startedAt).toLocaleDateString()}`)
  lines.push('')

  phases.forEach((phase, idx) => {
    const phaseState = session.phases[phase.id]
    const isCompleted = phaseState?.completedAt
    const isCurrent = idx === session.currentPhaseIndex
    const label = isCompleted ? '✓' : isCurrent ? '→' : '·'

    lines.push(`${label} PHASE ${idx + 1}: ${phase.title.toUpperCase()} (${phase.turnRange})`)

    const items = session.phases[phase.id]?.items || {}
    phase.items.forEach(item => {
      if (item.condition) {
        const flagVal = flags[item.condition.flag]
        if (flagVal !== item.condition.value) return
      }
      const status = items[item.id]
      if (!status) return
      const mark = status === 'done' ? '✓' : status === 'skipped' ? '—' : '✗'
      lines.push(`  ${mark} [${item.priority}] ${item.text}`)
    })

    if (phaseState?.note) {
      lines.push(`  Note: ${phaseState.note}`)
    }

    if (phaseState?.checkpoints) {
      const cpLines = Object.entries(phaseState.checkpoints)
        .map(([k, v]) => {
          const cp = phase.checkpoints?.find(c => c.id === k)
          if (!cp) return null
          const display = Array.isArray(v) ? v.join(', ') : String(v)
          return `  → ${cp.question} ${display}`
        })
        .filter(Boolean)
      if (cpLines.length) {
        lines.push('  Checkpoint answers:')
        lines.push(...cpLines)
      }
    }

    lines.push('')
  })

  lines.push('--- ACTIVE FLAGS ---')
  Object.entries(flags).forEach(([k, v]) => {
    lines.push(`  ${k}: ${v}`)
  })

  lines.push('')
  lines.push('Paste this log to an LLM (Claude, ChatGPT) for situational analysis.')
  lines.push('Prompt suggestion: "I am playing Civ 6 as Arabia. Here is my game log. What should I prioritise next and why?"')

  return lines.join('\n')
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
