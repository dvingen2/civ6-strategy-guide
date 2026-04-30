# City & District Placement Guide

*Arabia-specific. The decisions made here compound for 200+ turns.*

*[Overview →](overview.md) | [T1–T50 Script →](phases/turns-1-50.md)*

---

## Why Placement Is Arabia's Most Important Skill

Other civs can afford mediocre district placement and compensate elsewhere. Arabia cannot, because:

1. **Madrasa Faith = Campus adjacency** — a low-adjacency Campus means a nearly useless Madrasa
2. **Holy Site adjacency = Faith generation** — which funds your entire religious strategy
3. **Worship Building % bonus** — scales with city development, so strong cities matter more

A well-placed city with +4 Campus adjacency and +5 Holy Site adjacency produces dramatically more value than two poorly-placed cities. **Quality beats quantity** for Arabia.

---

## Part 1: Settling New Cities

### The Evaluation Sequence

Before settling, answer these four questions in order:

**1. Can I place a Holy Site with ≥3 adjacency here?**
Count Mountains within 3 tiles of the candidate city center. Each adjacent Mountain = +1 Faith for the Holy Site.

**2. Can I place a Campus with ≥3 adjacency here?**
Same Mountains help both (Mountains give +1 adjacency to Holy Sites AND Campuses). Natural Wonders give +2 to Holy Sites but don't help Campuses.

**3. Is there Food security?**
Population drives everything. Does the city have access to: Rivers (Farms), Grassland, Oasis tiles, Floodplains? A city that can't grow past pop 6 limits your district slots.

**4. Is there Production?**
Hills provide +1 Production. A city with only flat tiles will build districts very slowly.

### Scoring a Candidate City

Score candidate tiles before settling:

| Feature | Points |
|---------|--------|
| Each adjacent Mountain to candidate Holy Site placement | +2 |
| Adjacent Natural Wonder | +3 |
| River access for capital/city | +2 |
| Oasis within city radius | +2 |
| Multiple Grassland/Plains tiles for Food | +1 |
| Hills tiles for Production | +1 |
| Desert tiles (if Desert Folklore active) | +0.5 each |
| Horses accessible | +2 |
| Existing competing city-state on best tile | −3 |

**A score of 8+ is a strong city. 12+ is exceptional. Below 5 is borderline — consider passing on it.**

---

## Part 2: Holy Site Placement

This is the single most impactful placement decision you'll make.

### Adjacency Sources for Holy Sites

| Source | Bonus per tile | Notes |
|--------|---------------|-------|
| Mountain | +1 Faith | Each adjacent Mountain counts; no cap |
| Natural Wonder | +2 Faith | Huge; settle adjacent to a Natural Wonder if possible |
| Forest/Woods | +0.5 Faith | Requires 2 adjacent tiles for +1; minor |
| Other districts | +0.5 Faith | Minor; don't plan around this |
| Rainforest | +1 Faith | **Only with Sacred Path pantheon** — not a default bonus |

### How to Find the Best Holy Site Location

1. Open the district placement preview (start building the Holy Site in the queue without confirming)
2. Hover over each candidate tile — you'll see the projected Faith adjacency bonus
3. Move systematically around the city to compare all options
4. Pick the highest number that doesn't conflict with other needed districts

### Placement Conflict: Holy Site vs. Campus

Both Holy Sites and Campuses want to be next to Mountains. In cities with few Mountains, they compete.

**Resolution priority:**
- If only 1–2 Mountains: Place **Holy Site** adjacent to them (Faith income comes first in order of operations — you need Faith before you need Madrasa Faith)
- If 3–4 Mountains: Place both districts so each gets 2 Mountain adjacency
- If 5+ Mountains: Ideal — both districts can have excellent adjacency

```
Mountain cluster example (4 Mountains):
  [M][M][ ][ ]
  [M][ ][ ][ ]
  [M][ ][ ][ ]
       ^
       City center
  
Best placement:
  Holy Site: 1 tile north → adjacent to 3 Mountains = +3 Faith
  Campus: 1 tile northeast → adjacent to 2 Mountains = +2 Science → +2 Madrasa Faith
```

### What to Avoid

- **Placing Holy Site on a flat Desert tile surrounded by nothing**: wastes the district
- **Placing Holy Site inside a Mountain ring** (Mountains are impassable — you can't *be on* a Mountain): the Holy Site must be on a passable tile *adjacent to* Mountains
- **Saving the best tile for a future district**: if +4 adjacency is available now, take it

---

## Part 3: Campus Placement

Campus placement determines your Madrasa's Faith output AND your Science adjacency.

### Adjacency Sources for Campus

| Source | Bonus per tile | Notes |
|--------|---------------|-------|
| Mountain | +1 Science | Primary adjacency source for Arabia |
| Rainforest | +0.5 Science | Minor; needs 2 tiles for +1 |
| Geothermal Fissure | +2 Science | Rare but exceptional |
| Natural Wonder | +0.5 Science | Minor for Campus (better for Holy Site) |
| Other districts | +0.5 Science | Minor |

### The Madrasa Chain
```
Campus adjacency → Madrasa Faith output
+1 Campus adjacency = +1 Faith/turn from Madrasa (permanent, no cap)
```

In practical terms: a Campus with +4 adjacency placed in a city with Holy Site generates:
- Campus: +4 Science from adjacency (plus base science from buildings)
- Madrasa: +4 Faith/turn
- Holy Site + Worship Building: Faith + 10% Science boost

This is how Arabia generates Faith from two separate sources simultaneously in the same city.

### Aim For Each Campus

| Campus Adjacency | Assessment |
|-----------------|-----------|
| +1 | Weak — Madrasa gives only +1 Faith; reconsider city placement |
| +2 | Acceptable — Madrasa gives +2 Faith; workable |
| +3 | Good — Madrasa gives +3 Faith; solid city |
| +4 | Excellent — Madrasa gives +4 Faith; this is your target |
| +5–6 | Exceptional — prioritise these cities above all others |

---

## Part 4: Commercial Hub vs. Harbor Placement

Every city needs a gold/trade route district. Choose based on geography:

**Commercial Hub:** requires no coast or river (can be built anywhere)
- River adjacency gives +2 Gold bonus
- Preferred for inland cities
- Place next to a river tile if possible

**Harbor:** requires coastal city
- Place adjacent to the City Center (you lose nothing — Harbors always touch water)
- Provides +1 Trade Route (same as Commercial Hub)
- Can be combined with Commercial Hub for 2 Trade Routes

**For Arabia:** inland cities → Commercial Hub. Coastal cities → Harbor first (cheaper and mandatory for naval access), then Commercial Hub later for the second Trade Route.

---

## Part 5: Industrial Zone Placement

Industrial Zones boost Production for nearby cities (within 6 tiles). Key facts:

- One strong Industrial Zone can serve multiple cities
- Adjacency bonuses: +1 Production per adjacent Mine or Quarry
- **Don't build in every city** — 1–2 strong Industrial Zones can supply your entire empire via the Factory's area effect

**For Arabia:** Build 1 Industrial Zone in your highest-Production city (likely your Mamluk production city). Other cities don't need one until late game.

---

## Part 6: City Spacing

**Minimum 4 tiles between city centers.** Closer than this and tiles overlap, reducing your total worked tiles.

**Optimal spacing: 5–6 tiles.** This gives each city a full working radius without overlap.

```
Standard city working radius: 3 tiles in each direction
Two cities 5 tiles apart = slight overlap at the edges
Two cities 6 tiles apart = no overlap; full autonomy
```

**For Arabia's strategy:** you need each city to build both a Holy Site AND a Campus. That requires enough tiles to justify both districts being present. Don't settle so many cities that each one has only 4 tiles of working space.

---

## Part 7: Worked Tile Priorities

Once a district is placed, the city works surrounding tiles for yields. Set this manually for key cities:

**Priority for Arabia cities:**
1. **High Food tiles** (Grassland, Floodplains, Oasis) — population drives everything
2. **Production tiles** (Hills, Mines) — builds your districts faster
3. **Faith tiles** (Shrines, Holy Sites, Worship Buildings are handled by buildings, not tile-working — focus on Food/Production for tiles)
4. **Gold tiles** (Trade posts, Luxury resources)

> **Governor assignments:** Assign Governors (Magnus, Liang, Reyna, etc.) to prioritise production in your district-building cities. Magnus's Provision ability (removes -1 Food penalty from chopping) is especially powerful for Arabia's early expansion — chop forests to rush-complete Holy Site districts.

---

## Quick Reference: Arabia City Archetypes

### Tier 1 — Core City (invest fully)
**Characteristics:** 4+ Mountain adjacency for both Holy Site AND Campus; river access
**Build:** Holy Site → Shrine → Temple → Worship Building → Campus → Library → Madrasa → Commercial Hub → Market

### Tier 2 — Faith City (faith-only investment)
**Characteristics:** 2–3 Mountain adjacency for Holy Site only; no good Campus site
**Build:** Holy Site → Shrine → Temple → Worship Building → Commercial Hub → Harbor

### Tier 3 — Production City (military/wonder production)
**Characteristics:** Many Hills; strong Production; may have poor Holy Site options
**Build:** Industrial Zone → Workshop → Encampment → [Holy Site if possible] → Armory

### Tier 4 — Satellite City (minimal investment)
**Characteristics:** Settled for border control or resources; poor yields overall
**Build:** Monument → Holy Site (even at +1 adjacency — still generates Faith) → Worship Building → nothing else until late game

---

## District Placement Mistakes to Avoid

| Mistake | Cost |
|---------|------|
| Holy Site on a tile with +0 adjacency | ~200+ Faith lost over 100 turns |
| Campus built before Holy Site | Madrasa delayed; Jesuit Education less useful |
| Campus adjacent to 0 Mountains when Mountains are available | Weak Madrasa output permanently |
| Settling too close to another city | Reduced working tiles; both cities underperform |
| Industrial Zone in every city | Wasted Production; IZ area bonus covers multiple cities |
| Ignoring Governor assignments | Slower district build times |

---

*See also: [T1–T50 Script →](phases/turns-1-50.md) | [Overview →](overview.md)*
