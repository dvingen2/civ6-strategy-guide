const DOC_BASE_URL = 'https://github.com/dvingen2/civ6-strategy-guide/blob/main'

function guide(label, path) {
  return {
    label,
    path,
    url: `${DOC_BASE_URL}/${path}`,
  }
}

export const GUIDE_REFS = {
  overview: {
    ...guide('Arabia overview', 'civilizations/arabia/overview.md'),
  },
  turns50: {
    ...guide('T1-T50 script', 'civilizations/arabia/phases/turns-1-50.md'),
  },
  earlyGame: {
    ...guide('Early game', 'civilizations/arabia/phases/early-game.md'),
  },
  midGame: {
    ...guide('Mid game', 'civilizations/arabia/phases/mid-game.md'),
  },
  lateGame: {
    ...guide('Late game', 'civilizations/arabia/phases/late-game.md'),
  },
  cityPlacement: {
    ...guide('City placement', 'civilizations/arabia/city-district-placement.md'),
  },
  techCivics: {
    ...guide('Tech & civics', 'civilizations/arabia/tech-civics-priorities.md'),
  },
  policyCards: {
    ...guide('Policy cards', 'civilizations/arabia/policy-cards-reference.md'),
  },
  victoryPaths: {
    ...guide('Victory paths', 'civilizations/arabia/victory-paths.md'),
  },
  situations: {
    ...guide('Situational tactics', 'civilizations/arabia/situations.md'),
  },
  cityStates: {
    ...guide('City-states', 'civilizations/arabia/city-states-reference.md'),
  },
  greatPeople: {
    ...guide('Great people', 'civilizations/arabia/great-people-guide.md'),
  },
  wonders: {
    ...guide('Wonders', 'civilizations/arabia/wonders-reference.md'),
  },
}

const PHASE_GUIDES = {
  opening: ['turns50', 'earlyGame', 'cityPlacement'],
  early_expansion: ['earlyGame', 'cityPlacement', 'techCivics'],
  religion_window: ['overview', 'earlyGame', 'policyCards'],
  mamluk_window: ['midGame', 'policyCards', 'victoryPaths'],
  victory_push: ['victoryPaths', 'lateGame', 'policyCards'],
  classical_war: ['earlyGame', 'situations', 'policyCards'],
  mamluk_conquest: ['midGame', 'victoryPaths', 'policyCards'],
}

const ITEM_GUIDE_RULES = [
  { match: /settle|city|campus|holy site|mountain|district/i, refs: ['cityPlacement'] },
  { match: /research|civic|astrology|stirrups|education|recorded history|reformed church/i, refs: ['techCivics'] },
  { match: /policy|government|theocracy|democracy|fascism|natural philosophy|rationalism/i, refs: ['policyCards'] },
  { match: /mamluk|conquest|war|flanking|capital/i, refs: ['midGame', 'situations'] },
  { match: /religion|belief|worship|missionar|apostle|faith|tithe|jesuit/i, refs: ['overview', 'situations'] },
  { match: /victory|science|religious|domination|space/i, refs: ['victoryPaths'] },
  { match: /scientist|merchant|general|great people/i, refs: ['greatPeople'] },
  { match: /city-state|envoy|suzerain|bologna|kandy|nazca/i, refs: ['cityStates'] },
  { match: /hagia|oxford|wonder|pyramids|stonehenge/i, refs: ['wonders'] },
]

function uniqueRefs(refIds) {
  return [...new Set(refIds)]
    .map(id => GUIDE_REFS[id])
    .filter(Boolean)
}

export function guidesForPhase(phaseId) {
  return uniqueRefs(PHASE_GUIDES[phaseId] || ['overview'])
}

export function guidesForItem(item) {
  if (item.guideRefs) return uniqueRefs(item.guideRefs)

  const haystack = `${item.id || ''} ${item.text || ''} ${item.detail || ''}`
  const refs = ITEM_GUIDE_RULES.flatMap(rule => rule.match.test(haystack) ? rule.refs : [])
  return uniqueRefs(refs).slice(0, 3)
}
