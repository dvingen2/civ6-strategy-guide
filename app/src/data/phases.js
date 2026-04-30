// Phase content for Arabia / Saladin — Vizier and Sultan
// Priority tiers: E = Essential, H = High, S = Situational, O = Optional

export const VIZIER_PHASES = [
  {
    id: 'opening',
    title: 'Opening',
    turnRange: 'T1–T20',
    summary: 'Settle capital, Scout, expand to City 2, claim Pantheon.',
    items: [
      {
        id: 'assess_start',
        text: 'Assess start before settling: Mountains, River, Desert tiles, Natural Wonder visible?',
        detail: 'Mountains drive Campus + Holy Site adjacency — the core of your Science and Faith engines. Move Settler 1–2 tiles if a clearly better position exists. Don\'t move 3+ tiles chasing uncertain gains.',
        priority: 'E',
      },
      {
        id: 'settle_capital',
        text: 'Settle capital',
        priority: 'E',
      },
      {
        id: 'build_scout',
        text: 'Build Scout first (Warrior first if Barbarian camp visible)',
        detail: 'Finding a Natural Wonder triggers the Astrology Eureka — halving its research cost. Scouting also reveals Barbarian camps before they reach you.',
        priority: 'E',
      },
      {
        id: 'move_warrior',
        text: 'Move Warrior to scout opposite direction from Scout',
        priority: 'H',
      },
      {
        id: 'research_pottery',
        text: 'Research: Pottery → Animal Husbandry',
        detail: 'Animal Husbandry reveals Horse resources. You must know where Horses are before Medieval (Mamluks need them). Don\'t skip this.',
        priority: 'E',
      },
      {
        id: 'civics_code_of_laws',
        text: 'Civics: Code of Laws → Craftsmanship',
        priority: 'H',
      },
      {
        id: 'build_monument',
        text: 'Build Monument after Scout (unless Barbarian threat)',
        detail: '+2 Culture/turn accelerates your civic tree. Every turn of Culture compounds toward Theocracy, Policy cards, and Republic.',
        priority: 'H',
      },
      {
        id: 'settler_city2',
        text: 'Build Settler — City 2 settled by T18–20',
        detail: 'Good site: Mountains within 3 hexes for Campus adjacency, River access, minimum 4 tiles from capital. Horses visible nearby is a bonus.',
        priority: 'E',
      },
      {
        id: 'meet_city_states',
        text: 'Meet city-states; send Delegation to each rival civ (costs 25 Gold)',
        detail: 'Delegations prevent the "Surprise War" diplomatic penalty and improve relations passively.',
        priority: 'H',
      },
      {
        id: 'pantheon',
        text: 'Choose Pantheon at 25 Faith: Desert Folklore if 4+ Desert tiles (default)',
        detail: 'Desert Folklore: +1 Faith per Desert tile. Arabia\'s start bias makes this reliable. Alternatives: Stone Circles (Quarries), God of the Open Sky (Pastures), Monument to the Gods (if building Stonehenge/Pyramids).',
        priority: 'E',
      },
    ],
    checkpoints: [
      {
        id: 'natural_wonder_found',
        question: 'Did your Scout find a Natural Wonder?',
        type: 'boolean',
        hint: 'Triggers Astrology Eureka — halves Holy Site tech cost',
      },
      {
        id: 'city_2_settled',
        question: 'City 2 settled by T20?',
        type: 'boolean',
      },
      {
        id: 'horses_located',
        question: 'Horses located (Animal Husbandry researched)?',
        type: 'boolean',
        hint: 'Mamluks need Horses. If still unknown, continue researching.',
      },
      {
        id: 'pantheon_chosen',
        question: 'Pantheon chosen?',
        type: 'boolean',
      },
    ],
    carryForwardRules: [
      {
        condition: { checkpoint: 'city_2_settled', value: false },
        injectItem: {
          id: 'cf_settle_city2',
          text: '⚑ City 2 not yet settled — prioritise Settler above all else',
          priority: 'E',
          isCarryForward: true,
        },
      },
      {
        condition: { checkpoint: 'horses_located', value: false },
        injectItem: {
          id: 'cf_find_horses',
          text: '⚑ Horses not yet located — research Animal Husbandry immediately',
          priority: 'E',
          isCarryForward: true,
        },
      },
    ],
  },
  {
    id: 'early_expansion',
    title: 'Early Expansion',
    turnRange: 'T21–T45',
    summary: 'City 3, Campus placement, Holy Site when Astrology Eureka fires.',
    items: [
      {
        id: 'city3_target',
        text: 'Identify City 3 site: Mountains for Campus, River, Horses accessible',
        detail: 'The Madrasa generates Faith equal to Campus adjacency. A Campus adjacent to 4 Mountains gives +5 Science AND +4 Faith/turn. Campus placement is Arabia\'s most important city-planning decision.',
        priority: 'E',
      },
      {
        id: 'settle_city3',
        text: 'Settle City 3 by T40–45',
        priority: 'E',
      },
      {
        id: 'monument_each_city',
        text: 'Monument in each new city (Culture acceleration)',
        priority: 'H',
      },
      {
        id: 'shrine_cities',
        text: 'Shrine in City 2 and City 3 (start Faith accumulation)',
        priority: 'H',
      },
      {
        id: 'astrology_eureka',
        text: 'If Natural Wonder found: queue Astrology now (half cost)',
        detail: 'The Astrology Eureka halves research cost from ~320 to ~160 Science. Don\'t rush it without the Eureka — use those turns for Settlers instead.',
        priority: 'E',
        condition: { flag: 'natural_wonder_found', value: true },
      },
      {
        id: 'astrology_no_eureka',
        text: 'No Natural Wonder: research Astrology by T40 anyway (full cost)',
        detail: 'If no Natural Wonder has appeared by T35–40, pay full cost. Don\'t wait past T45 for the Holy Site.',
        priority: 'H',
        condition: { flag: 'natural_wonder_found', value: false },
      },
      {
        id: 'holy_site_capital',
        text: 'Holy Site in capital when Astrology completes — target +3 adjacency minimum',
        detail: 'Compare tiles before placing. Each Mountain adjacent = +1 Faith. Natural Wonder = +2. Rainforest only counts with Sacred Path pantheon. Also plan Campus location before placing Holy Site — share the Mountain cluster.',
        priority: 'E',
      },
      {
        id: 'campus_placement',
        text: 'Identify Campus placement in capital and City 2 (Mountains within 3 hexes)',
        detail: 'The Mountain Rule: a tile adjacent to both Campus and Holy Site gives +1 Science (Campus) AND +1 Faith (Holy Site). Plan both districts around the same Mountain cluster.',
        priority: 'E',
      },
      {
        id: 'warriors_defense',
        text: '2 Warriors active — cover both cities',
        priority: 'H',
      },
    ],
    checkpoints: [
      {
        id: 'holy_site_started',
        question: 'Holy Site district started in capital?',
        type: 'boolean',
      },
      {
        id: 'city_3_settled',
        question: 'City 3 settled?',
        type: 'boolean',
      },
      {
        id: 'horses_confirmed',
        question: 'Horses confirmed accessible (on your land or tradeable)?',
        type: 'boolean',
      },
      {
        id: 'campus_sites_identified',
        question: 'Campus locations identified in 2+ cities?',
        type: 'boolean',
      },
    ],
    carryForwardRules: [
      {
        condition: { checkpoint: 'holy_site_started', value: false },
        injectItem: {
          id: 'cf_holy_site_urgent',
          text: '⚑ Holy Site not started — queue it now; must complete with Shrine + Temple before religion can be founded',
          priority: 'E',
          isCarryForward: true,
        },
      },
      {
        condition: { checkpoint: 'city_3_settled', value: false },
        injectItem: {
          id: 'cf_city3_urgent',
          text: '⚑ City 3 not settled — build Settler; every turn of delay is lost compounding',
          priority: 'E',
          isCarryForward: true,
        },
      },
      {
        condition: { checkpoint: 'horses_confirmed', value: false },
        injectItem: {
          id: 'cf_horses_critical',
          text: '⚑ Horses still not confirmed — check map; plan to trade for them if needed; Mamluks are non-negotiable',
          priority: 'E',
          isCarryForward: true,
        },
      },
    ],
  },
  {
    id: 'religion_window',
    title: 'Religion & Worship Buildings',
    turnRange: 'T46–T80',
    summary: 'Found religion, deploy Worship Buildings empire-wide, prepare Mamluks.',
    items: [
      {
        id: 'holy_site_complete',
        text: 'Holy Site + Shrine + Temple complete in capital',
        detail: 'Temple is required before the Worship Building slot is available. Prioritise finishing it.',
        priority: 'E',
      },
      {
        id: 'holy_site_city2',
        text: 'Holy Site + Shrine underway in City 2',
        priority: 'H',
      },
      {
        id: 'check_beliefs',
        text: 'When Great Prophet spawns: check available Beliefs BEFORE founding',
        detail: 'AI civs pick Beliefs suboptimally at all difficulty levels. Jesuit Education and Tithe are frequently still available to a late Prophet. Don\'t panic — assess what\'s left.',
        priority: 'E',
      },
      {
        id: 'found_religion',
        text: 'Found religion: Follower = Jesuit Education (fallback: Feed the World)',
        detail: 'Jesuit Education allows Faith-purchasing Campus and Theater buildings including Madrasa. This is the core of the Science engine. Feed the World (+3 Food, +1 Housing from Shrines/Temples) is a strong fallback.',
        priority: 'E',
      },
      {
        id: 'founder_belief',
        text: 'Founder Belief: Tithe (fallback: Church Property)',
        detail: 'Tithe: +1 Gold per 4 followers — scales with every civ that follows your religion. Church Property: +2 Gold per following city, good early but falls off at scale.',
        priority: 'E',
      },
      {
        id: 'worship_buildings',
        text: 'Deploy Worship Buildings in ALL cities with Temple immediately (costs ~16 Production each)',
        detail: 'This is the Vizier\'s key moment. Each Worship Building adds +10% Science, Faith, AND Culture city-wide. Near-free at 90% discount. Build them all within the first few turns after founding.',
        priority: 'E',
      },
      {
        id: 'worship_building_choice',
        text: 'Choose Worship Building: Mosque (Loyalty, border cities) or Stupa (Amenities, wide empire)',
        detail: 'Mosque: +1 Loyalty to nearby cities — great for future conquered cities. Stupa: +1 Amenity — better if you\'re going wide without much war.',
        priority: 'H',
      },
      {
        id: 'theocracy_path',
        text: 'Reformed Church civic on path — Theocracy unlocked and queued',
        detail: 'Theocracy: 15% discount on Faith purchases + +5 CS in Theological Combat. Essential for faith-buying Mamluks and Missionaries.',
        priority: 'E',
      },
      {
        id: 'stirrups_path',
        text: 'Research path includes Stirrups (unlocks Mamluks)',
        detail: 'Stirrups → Mamluks. Make sure it\'s in your tech queue. After Astrology: Writing → Education → Stirrups is the core path.',
        priority: 'E',
      },
      {
        id: '4_cities',
        text: '4 cities settled or Settler queued',
        priority: 'H',
      },
      {
        id: 'trade_routes',
        text: 'At least 1 international Trade Route active (Gold income)',
        detail: 'International Trade Routes generate Gold that funds Missionaries, Apostles, and faith purchases. Build Commercial Hub or Harbor in capital.',
        priority: 'H',
      },
    ],
    checkpoints: [
      {
        id: 'religion_founded',
        question: 'Religion founded?',
        type: 'boolean',
      },
      {
        id: 'jesuit_education',
        question: 'Jesuit Education belief secured?',
        type: 'boolean',
        hint: 'If not, Feed the World is the fallback; Madrasas will need to be built via Production',
      },
      {
        id: 'tithe_belief',
        question: 'Tithe founder belief secured?',
        type: 'boolean',
        hint: 'If not, Church Property is the fallback',
      },
      {
        id: 'worship_buildings_deployed',
        question: 'Worship Buildings deployed in all cities with a Temple?',
        type: 'boolean',
      },
      {
        id: 'theocracy_active',
        question: 'Theocracy government active?',
        type: 'boolean',
      },
    ],
    carryForwardRules: [
      {
        condition: { checkpoint: 'religion_founded', value: false },
        injectItem: {
          id: 'cf_religion_urgent',
          text: '⚑ Religion not yet founded — Great Prophet should be imminent; check Faith tracker',
          priority: 'E',
          isCarryForward: true,
        },
      },
      {
        condition: { checkpoint: 'worship_buildings_deployed', value: false },
        injectItem: {
          id: 'cf_worship_buildings',
          text: '⚑ Worship Buildings not deployed — do this immediately; costs ~16 Production per city',
          priority: 'E',
          isCarryForward: true,
        },
      },
      {
        condition: { checkpoint: 'jesuit_education', value: false },
        injectItem: {
          id: 'cf_no_jesuit',
          text: '⚑ No Jesuit Education — build Madrasas via Production instead of Faith-purchasing',
          priority: 'H',
          isCarryForward: true,
        },
      },
      {
        condition: { checkpoint: 'theocracy_active', value: false },
        injectItem: {
          id: 'cf_theocracy',
          text: '⚑ Theocracy not yet active — prioritise Reformed Church civic',
          priority: 'E',
          isCarryForward: true,
        },
      },
    ],
  },
  {
    id: 'mamluk_window',
    title: 'Mamluk Window',
    turnRange: 'T81–T120',
    summary: 'Build and deploy Mamluks, activate Science engine, assess victory path.',
    items: [
      {
        id: 'theocracy_confirm',
        text: 'Theocracy government active — switch immediately if not yet done',
        priority: 'E',
      },
      {
        id: 'policy_stack',
        text: 'Policy cards: Triangular Trade + Chivalry + Simultaneity (+ Scripture if still Medieval)',
        detail: 'Triangular Trade: +4 Gold +1 Faith per Trade Route. Chivalry: +7 CS to Mamluks. Simultaneity: Faith-purchase units (Theocracy required).',
        priority: 'E',
      },
      {
        id: 'build_mamluks',
        text: 'Build 4–6 Mamluks in highest-Production city with Horses accessible',
        detail: 'Mamluks heal every turn regardless of actions (20 HP/turn in City Centers, 15 in friendly, 10 neutral, 5 hostile). This is Arabia\'s defining mid-game strength — use it.',
        priority: 'E',
      },
      {
        id: 'conquest_target',
        text: 'Identify conquest target: Mountain-rich city, competing religion source, or blocking neighbour',
        detail: 'Even for Science or Religious victory, Mamluk conquest pays off — more cities = more Worship Building multipliers, more Campuses, more Tithe followers. Don\'t leave this window unused.',
        priority: 'E',
      },
      {
        id: 'attack_execute',
        text: 'Execute conquest: 4–5 Mamluks + 1–2 Crossbowmen; use flanking; keep Mamluks in front',
        detail: 'Mamluks heal while fighting — no need to rotate damaged units. Push deep without stopping to recover. Take 1–2 cities, make peace, rebuild if needed.',
        priority: 'H',
      },
      {
        id: 'campus_build',
        text: 'Campus + Library in 2–3 core cities (those with best Mountain adjacency)',
        priority: 'E',
      },
      {
        id: 'madrasa_faithbuy',
        text: 'Madrasa faith-purchased in core cities (Jesuit Education required)',
        detail: 'Madrasa: +5 Science base + Faith equal to Campus adjacency. A +4 Campus gives +4 Faith/turn. Natural Philosophy (next item) doubles this.',
        priority: 'E',
      },
      {
        id: 'natural_philosophy',
        text: 'Natural Philosophy policy card active (Recorded History civic) — doubles Campus adjacency = doubles Madrasa Faith',
        detail: 'A Campus with +4 adjacency gives +4 Madrasa Faith normally. With Natural Philosophy: +8 Faith/turn. This is one of Arabia\'s strongest mid-game power plays.',
        priority: 'E',
      },
      {
        id: 'trade_routes_expand',
        text: '3+ international Trade Routes active; Triangular Trade policy',
        priority: 'H',
      },
      {
        id: 'missionaries_spread',
        text: '2–3 Missionaries spreading religion to nearby civs and city-states',
        detail: 'Trade Routes passively spread religion to destination city each turn — route first, Missionaries second.',
        priority: 'H',
      },
      {
        id: 'victory_assess',
        text: 'Assess victory path at T100–120: Science, Religious, or Domination?',
        detail: 'Science: strong Campus network, Madrasa Faith high. Religious: 25%+ cities converted, good Gold. Domination: military advantage, capitals accessible. All three are viable from this opening.',
        priority: 'E',
      },
    ],
    checkpoints: [
      {
        id: 'mamluks_operational',
        question: '4+ Mamluks operational?',
        type: 'boolean',
      },
      {
        id: 'conquest_done',
        question: 'At least one conquest campaign executed (or underway)?',
        type: 'boolean',
        hint: 'Even 1 captured city pays dividends for any victory path',
      },
      {
        id: 'madrasas_deployed',
        question: 'Madrasa in 2+ core cities?',
        type: 'boolean',
      },
      {
        id: 'natural_philosophy_active',
        question: 'Natural Philosophy policy card active?',
        type: 'boolean',
      },
      {
        id: 'victory_path',
        question: 'Victory path decided?',
        type: 'choice',
        options: ['science', 'religious', 'domination', 'undecided'],
        labels: ['Science Victory', 'Religious Victory', 'Domination Victory', 'Not yet decided'],
      },
    ],
    carryForwardRules: [
      {
        condition: { checkpoint: 'mamluks_operational', value: false },
        injectItem: {
          id: 'cf_no_mamluks',
          text: '⚑ Mamluks not operational — build immediately; the conquest window is closing',
          priority: 'E',
          isCarryForward: true,
        },
      },
      {
        condition: { checkpoint: 'madrasas_deployed', value: false },
        injectItem: {
          id: 'cf_madrasas',
          text: '⚑ Madrasas not deployed — faith-purchase immediately; core of Science + Faith engine',
          priority: 'E',
          isCarryForward: true,
        },
      },
    ],
  },
  {
    id: 'victory_push',
    title: 'Victory Push',
    turnRange: 'T121–T160',
    summary: 'Execute the committed victory path.',
    items: [
      // Science Victory items
      {
        id: 'sci_madrasas_all',
        text: '[Science] Madrasas in all core cities',
        priority: 'E',
        condition: { flag: 'victory_path', value: 'science' },
      },
      {
        id: 'sci_research_labs',
        text: '[Science] Research Labs built (requires Electricity tech)',
        priority: 'E',
        condition: { flag: 'victory_path', value: 'science' },
      },
      {
        id: 'sci_democracy',
        text: '[Science] Switch to Democracy government',
        priority: 'E',
        condition: { flag: 'victory_path', value: 'science' },
      },
      {
        id: 'sci_policy_cards',
        text: '[Science] Policy cards: Rationalism (+1 Science/Campus) + Nobel Prize (+6 GS pts/turn)',
        priority: 'E',
        condition: { flag: 'victory_path', value: 'science' },
      },
      {
        id: 'sci_space_port',
        text: '[Science] Space Port in highest-Production city (requires Industrial Zone)',
        priority: 'E',
        condition: { flag: 'victory_path', value: 'science' },
      },
      {
        id: 'sci_great_scientists',
        text: '[Science] Target Great Scientists aggressively from Bologna city-state',
        priority: 'H',
        condition: { flag: 'victory_path', value: 'science' },
      },
      {
        id: 'sci_space_race',
        text: '[Science] Launch Space Race projects in order: Earth Satellite → Moon Landing → Mars Colony',
        priority: 'E',
        condition: { flag: 'victory_path', value: 'science' },
      },
      // Religious Victory items
      {
        id: 'rel_apostle_corps',
        text: '[Religion] 5+ active Missionaries/Apostles',
        priority: 'E',
        condition: { flag: 'victory_path', value: 'religious' },
      },
      {
        id: 'rel_open_borders',
        text: '[Religion] Open Borders negotiated with civs you need to convert',
        detail: 'Open Borders lets your religious units spread without entering foreign territory being blocked.',
        priority: 'E',
        condition: { flag: 'victory_path', value: 'religious' },
      },
      {
        id: 'rel_hagia_sophia',
        text: '[Religion] Hagia Sophia wonder (if buildable): +1 Missionary spread + free Apostle promotion',
        priority: 'H',
        condition: { flag: 'victory_path', value: 'religious' },
      },
      {
        id: 'rel_proselytizer',
        text: '[Religion] Proselytizer Apostles for stubborn cities (removes all other religions)',
        priority: 'H',
        condition: { flag: 'victory_path', value: 'religious' },
      },
      {
        id: 'rel_coverage',
        text: '[Religion] 40%+ city coverage by T150; 51% = win',
        priority: 'E',
        condition: { flag: 'victory_path', value: 'religious' },
      },
      // Domination items
      {
        id: 'dom_upgrade_mamluks',
        text: '[Domination] Upgrade Mamluks → Cavalry as tech allows',
        priority: 'E',
        condition: { flag: 'victory_path', value: 'domination' },
      },
      {
        id: 'dom_capitals',
        text: '[Domination] 1–2 rival original capitals taken by T150',
        priority: 'E',
        condition: { flag: 'victory_path', value: 'domination' },
      },
      {
        id: 'dom_loyalty',
        text: '[Domination] Governor + Apostle in each conquered city (Loyalty + religion)',
        detail: 'Mosque Worship Buildings give +1 Loyalty to nearby cities — especially useful for managing conquered territory.',
        priority: 'H',
        condition: { flag: 'victory_path', value: 'domination' },
      },
      {
        id: 'dom_fascism',
        text: '[Domination] Consider Fascism government (Military policy slots)',
        priority: 'S',
        condition: { flag: 'victory_path', value: 'domination' },
      },
      // Universal late-game
      {
        id: 'late_religion_defense',
        text: 'Keep Apostle (Debater) on border cities — defend against counter-spreading',
        priority: 'H',
      },
      {
        id: 'late_trade_routes',
        text: 'Maintain all Trade Routes; re-route to targets needing conversion or Gold',
        priority: 'H',
      },
    ],
    checkpoints: [
      {
        id: 'victory_progress',
        question: 'Victory progress on track?',
        type: 'boolean',
        hint: 'Science: Research Labs built; Religious: 35%+ coverage; Domination: capitals falling',
      },
    ],
    carryForwardRules: [],
  },
]

export const SULTAN_PHASES = [
  {
    id: 'opening',
    title: 'Opening',
    turnRange: 'T1–T20',
    summary: 'Aggressive opening — Warrior corps, City 2, Pantheon.',
    items: [
      {
        id: 'assess_start',
        text: 'Assess start: Mountains (Campus), River, Desert, neighbours visible',
        detail: 'Sultan will likely fight early. Note nearest civs and their distance. Mountain access still matters for Campus/Holy Site adjacency.',
        priority: 'E',
      },
      {
        id: 'settle_capital',
        text: 'Settle capital',
        priority: 'E',
      },
      {
        id: 'build_warrior',
        text: 'Build Warrior first (Sultan needs early military strength)',
        detail: 'Sultan\'s doubled Flanking bonus applies from the start. Two Warriors flanking an enemy unit is already powerful in the Ancient era.',
        priority: 'E',
      },
      {
        id: 'build_scout',
        text: 'Build Scout second — scout for Natural Wonders and expansion sites',
        priority: 'H',
      },
      {
        id: 'research_pottery',
        text: 'Research: Pottery → Animal Husbandry → Bronze Working',
        detail: 'Animal Husbandry reveals Horses. Bronze Working unlocks Swordsmen and reveals Iron.',
        priority: 'E',
      },
      {
        id: 'build_monument',
        text: 'Monument after Warriors (Culture toward Oligarchy → Military cards)',
        priority: 'H',
      },
      {
        id: 'settler_city2',
        text: 'City 2 settled by T18–20',
        priority: 'E',
      },
      {
        id: 'pantheon',
        text: 'Pantheon: Desert Folklore (default) or Stone Circles / God of the Open Sky',
        priority: 'E',
      },
      {
        id: 'flanking_awareness',
        text: 'Practice flanking: always position 2 units before attacking any enemy',
        detail: 'Sultan\'s ability doubles Flanking AND Support bonuses. Attack from opposite sides of a target: Unit A moves adjacent → Unit B attacks from the other side. This applies to religious units too.',
        priority: 'E',
      },
    ],
    checkpoints: [
      {
        id: 'natural_wonder_found',
        question: 'Natural Wonder found?',
        type: 'boolean',
      },
      {
        id: 'city_2_settled',
        question: 'City 2 settled?',
        type: 'boolean',
      },
      {
        id: 'horses_located',
        question: 'Horses located?',
        type: 'boolean',
      },
      {
        id: 'classical_war_planned',
        question: 'Classical-era war target identified (optional)?',
        type: 'boolean',
        hint: 'Sultan shines in Classical wars. A weak neighbour blocking good sites is worth removing.',
      },
    ],
    carryForwardRules: [
      {
        condition: { checkpoint: 'city_2_settled', value: false },
        injectItem: {
          id: 'cf_city2',
          text: '⚑ City 2 not settled — Settler now',
          priority: 'E',
          isCarryForward: true,
        },
      },
    ],
  },
  {
    id: 'classical_war',
    title: 'Classical Expansion',
    turnRange: 'T21–T60',
    summary: 'Optional Classical war, Holy Sites, 3–4 cities settled.',
    items: [
      {
        id: 'classical_war_check',
        text: 'Optional Classical war: 3 Warriors + Catapult vs weak neighbour (no walls, 1–2 cities)',
        detail: 'How: Catapult bombards city HP → two Warriors flank-attack defender (doubled bonus) → capture when HP low. Shrine in captured city immediately; Apostle to convert within 10 turns.',
        priority: 'S',
      },
      {
        id: 'holy_sites_start',
        text: 'Holy Sites started in capital + City 2 when Astrology done',
        detail: 'Sultan doesn\'t get Worship Building discount — Holy Sites are still the Faith engine. Target +3 adjacency minimum.',
        priority: 'H',
      },
      {
        id: 'settle_city3',
        text: 'City 3 settled (or taken in Classical war)',
        priority: 'E',
      },
      {
        id: 'shrines_temples',
        text: 'Shrine + Temple in capital and City 2',
        priority: 'H',
      },
      {
        id: 'policy_oligarchy',
        text: 'Policy: Oligarchy → Discipline (+5 CS adjacent to friendly) + Agoge (+50% unit Production)',
        priority: 'H',
      },
      {
        id: 'campus_sites',
        text: 'Campus placement identified: Mountains within 3 hexes in core cities',
        priority: 'E',
      },
      {
        id: 'religion_founded',
        text: 'Religion founded (Last Prophet guarantee) — Tithe + Religious Community beliefs',
        detail: 'Sultan\'s Worship Buildings cost normal Production — build them selectively in high-value cities only, unlike Vizier who deploys everywhere.',
        priority: 'H',
      },
      {
        id: 'worship_selective',
        text: 'Worship Buildings in 2–3 highest-value cities only (full Production cost)',
        priority: 'S',
      },
    ],
    checkpoints: [
      {
        id: 'city_3_settled',
        question: 'City 3 settled or captured?',
        type: 'boolean',
      },
      {
        id: 'religion_founded',
        question: 'Religion founded?',
        type: 'boolean',
      },
      {
        id: 'horses_improved',
        question: 'Horses improved and accessible?',
        type: 'boolean',
      },
    ],
    carryForwardRules: [
      {
        condition: { checkpoint: 'horses_improved', value: false },
        injectItem: {
          id: 'cf_sultan_horses',
          text: '⚑ Horses not improved — critical for Mamluks; build Builder to improve immediately',
          priority: 'E',
          isCarryForward: true,
        },
      },
    ],
  },
  {
    id: 'mamluk_conquest',
    title: 'Mamluk Conquest',
    turnRange: 'T61–T120',
    summary: 'Mamluks operational — primary conquest phase with flanking dominance.',
    items: [
      {
        id: 'theocracy',
        text: 'Theocracy government active (faith-buy Mamluks)',
        priority: 'E',
      },
      {
        id: 'policy_chivalry',
        text: 'Policy cards: Chivalry (+7 CS to Mamluks) + Simultaneity (faith-buy units)',
        priority: 'E',
      },
      {
        id: 'mamluks_build',
        text: 'Build 4–6 Mamluks — highest Production city with Encampment',
        priority: 'E',
      },
      {
        id: 'flanking_discipline',
        text: 'Always flank: position two Mamluks on opposite sides before attacking',
        detail: 'Sultan flanking: doubled bonus. Stack Chivalry (+7 CS) + Encampment XP + flanking angle. Formula: Unit A adjacent to enemy → Unit B attacks from opposite side = doubled flanking bonus on top of Chivalry.',
        priority: 'E',
      },
      {
        id: 'conquest_targets',
        text: 'Primary conquest: take 1–2 rival capitals in the Mamluk window (T85–T130)',
        priority: 'E',
      },
      {
        id: 'convert_conquered',
        text: 'After each capture: Shrine immediately, Apostle to convert within 10 turns',
        detail: 'Converted cities stay loyal via your religion. Mosque Worship Building adds +1 Loyalty per city.',
        priority: 'H',
      },
      {
        id: 'campus_madrasa',
        text: 'Campus + Madrasa in core cities (Science secondary path)',
        priority: 'H',
      },
      {
        id: 'natural_philosophy',
        text: 'Natural Philosophy policy: doubles Campus adjacency → doubles Madrasa Faith',
        priority: 'H',
      },
      {
        id: 'religion_holy_war',
        text: 'Declare Holy War for diplomatic cover when attacking religious-divergent civs',
        detail: 'Holy War declaration removes the Surprise War diplomatic penalty when attacking a civ that follows a different religion.',
        priority: 'S',
      },
    ],
    checkpoints: [
      {
        id: 'mamluks_operational',
        question: '4+ Mamluks operational?',
        type: 'boolean',
      },
      {
        id: 'capitals_taken',
        question: 'Rival capital(s) captured?',
        type: 'boolean',
      },
      {
        id: 'victory_path',
        question: 'Victory path?',
        type: 'choice',
        options: ['domination', 'religious', 'science'],
        labels: ['Domination (continue conquering)', 'Religious (spread + convert)', 'Science (Madrasa engine)'],
      },
    ],
    carryForwardRules: [
      {
        condition: { checkpoint: 'mamluks_operational', value: false },
        injectItem: {
          id: 'cf_sultan_mamluks',
          text: '⚑ Mamluks not built — the window is closing; build immediately',
          priority: 'E',
          isCarryForward: true,
        },
      },
    ],
  },
  {
    id: 'victory_push',
    title: 'Victory Push',
    turnRange: 'T121+',
    summary: 'Final capitals or religious conversion campaign.',
    items: [
      {
        id: 'dom_upgrade',
        text: '[Domination] Upgrade: Mamluk → Cavalry → Mechanized Infantry',
        priority: 'E',
        condition: { flag: 'victory_path', value: 'domination' },
      },
      {
        id: 'dom_final_push',
        text: '[Domination] Final capitals campaign — all original capitals captured = win',
        priority: 'E',
        condition: { flag: 'victory_path', value: 'domination' },
      },
      {
        id: 'dom_fascism',
        text: '[Domination] Fascism government: Military policy slots maximised',
        priority: 'H',
        condition: { flag: 'victory_path', value: 'domination' },
      },
      {
        id: 'rel_apostles',
        text: '[Religion] 5+ Apostles spreading; Proselytizer for stubborn cities',
        priority: 'E',
        condition: { flag: 'victory_path', value: 'religious' },
      },
      {
        id: 'rel_51',
        text: '[Religion] 51% of all rival cities = Religious Victory',
        priority: 'E',
        condition: { flag: 'victory_path', value: 'religious' },
      },
      {
        id: 'sci_labs',
        text: '[Science] Research Labs + Space Port; launch Space Race projects',
        priority: 'E',
        condition: { flag: 'victory_path', value: 'science' },
      },
    ],
    checkpoints: [],
    carryForwardRules: [],
  },
]

export const SITUATIONS = [
  {
    id: 'no_horses',
    title: 'No Horses accessible',
    phase: 'any',
    response: 'Check if Horses exist on another continent — plan to acquire via trade or conquest. As a fallback, pivot to Crossbowmen + Catapults. Crossbowmen are ranged, not cavalry, so no self-healing — but still viable mid-game. Note that your Mamluk window will be weaker.',
  },
  {
    id: 'rival_religion_spreading',
    title: 'Rival religion spreading into your cities',
    phase: 'religion_window',
    response: 'Position an Apostle (Debater promotion) in the threatened city. Theological Combat: your Apostle attacks arriving enemy Missionaries/Apostles. Re-spread aggressively. If a civ is sending many units, consider a Declaration of Holy War — no diplomatic penalty.',
  },
  {
    id: 'top_beliefs_taken',
    title: 'Jesuit Education AND Tithe both taken',
    phase: 'religion_window',
    response: 'Take Feed the World + Church Property. This is a functional religion — slower, not dead. Build Madrasas via Production instead of faith-purchasing. Tithe absence hurts Gold scaling most; track your income and adjust.',
  },
  {
    id: 'hemmed_in',
    title: 'Civs have settled all expansion sites',
    phase: 'early_expansion',
    response: 'With Sultan: declare war with Warriors + Catapult on the weakest neighbour blocking you. With Vizier: settle the best available sites even if suboptimal, then use Mamluks at T85 to take a better-positioned city. Prioritise Campus adjacency over Holy Site adjacency when compromising.',
  },
  {
    id: 'low_faith',
    title: 'Faith generation too low to sustain Missionaries',
    phase: 'mamluk_window',
    response: 'Check: Worship Buildings deployed? (each adds +10% to city Faith). Triangular Trade policy active? (+1 Faith per Trade Route). More Trade Routes = more Faith passively. Theocracy discount applies to Missionary costs too.',
  },
  {
    id: 'behind_on_science',
    title: 'Falling behind on Science',
    phase: 'victory_push',
    response: 'Prioritise: Madrasa in every core city (faith-purchase if Jesuit Education). Natural Philosophy policy (doubles Madrasa Faith = more faith-purchases). Research Labs via Production or Faith. Democracy + Rationalism policy card. Target Great Scientists from Bologna suzerainty.',
  },
  {
    id: 'conquered_city_revolting',
    title: 'Conquered city losing Loyalty / in revolt',
    phase: 'mamluk_window',
    response: 'Assign a Governor immediately (Reyna or Victor). Convert with an Apostle — your religion\'s Mosque Worship Building adds +1 Loyalty passively. Build Amenity buildings (Stupa if chosen). Make peace and stabilise before the next war.',
  },
]
