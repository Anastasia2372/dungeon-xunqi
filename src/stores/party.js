import { reactive } from 'vue'

const defaultParty = () => ({
  recruited: [],
  activeIds: []
})

export const party = reactive(defaultParty())

export function resetParty(overrides = {}) {
  Object.assign(party, defaultParty(), overrides)
}

export function recruitCompanion(companion) {
  if (party.recruited.find(c => c.id === companion.id)) return false
  party.recruited.push(companion)
  if (party.activeIds.length < 2) {
    party.activeIds.push(companion.id)
  }
  return true
}

export function setActive(ids) {
  party.activeIds = ids.slice(0, 2)
}

export function toggleActive(id) {
  if (!party.recruited.find(c => c.id === id)) return
  const idx = party.activeIds.indexOf(id)
  if (idx >= 0) {
    party.activeIds.splice(idx, 1)
  } else if (party.activeIds.length < 2) {
    party.activeIds.push(id)
  }
}

export function activeCompanions() {
  return party.activeIds
    .map(id => party.recruited.find(c => c.id === id))
    .filter(Boolean)
}

export function damageCompanion(id, amount) {
  const c = party.recruited.find(x => x.id === id)
  if (!c) return false
  c.hp = Math.max(0, c.hp - amount)
  return c.hp <= 0
}

export function healCompanion(id, amount) {
  const c = party.recruited.find(x => x.id === id)
  if (!c) return
  c.hp = Math.min(c.hpMax, c.hp + amount)
}

export function restoreCompanions() {
  for (const c of party.recruited) {
    c.hp = c.hpMax
    c.ap = c.apMax
  }
}

export function createCompanion(spec) {
  return {
    id: spec.id,
    name: spec.name,
    profession: spec.profession,
    level: spec.level || 1,
    hp: spec.hpMax,
    hpMax: spec.hpMax,
    ap: spec.apMax || 3,
    apMax: spec.apMax || 3,
    position: spec.position || 2,
    attrs: { ...spec.attrs },
    skills: spec.skills || [],
    equipment: { weapon: null, armor: null, trinket: null }
  }
}

export const tavernPool = [
  {
    id: 'merc_wanderer_swordsman',
    name: '流浪剑士', tbd: true,
    profession: 'swordsman', cost: 180,
    hpMax: 55, apMax: 4, position: 2,
    attrs: { atk: 12, def: 6, spd: 5, crit: 5, dodge: 5 },
    skills: ['melee_strike', 'defend'],
    unlockAfter: 'prologueDone'
  },
  {
    id: 'merc_shieldman',
    name: '守卫佣兵', tbd: true,
    profession: 'guard', cost: 260,
    hpMax: 78, apMax: 3, position: 1,
    attrs: { atk: 10, def: 12, spd: 3, crit: 3, dodge: 2 },
    skills: ['melee_strike', 'stone_guard'],
    unlockAfter: 'prologueDone'
  },
  {
    id: 'merc_archer',
    name: '流散弓手', tbd: true,
    profession: 'archer', cost: 220,
    hpMax: 48, apMax: 4, position: 4,
    attrs: { atk: 14, def: 3, spd: 8, crit: 10, dodge: 8 },
    skills: ['quick_shot', 'aimed_shot'],
    unlockAfter: 'prologueDone'
  },
  {
    id: 'merc_rogue',
    name: '暗巷刺客', tbd: true,
    profession: 'rogue', cost: 320,
    hpMax: 52, apMax: 5, position: 2,
    attrs: { atk: 16, def: 4, spd: 12, crit: 15, dodge: 15 },
    skills: ['dual_slash', 'melee_strike'],
    unlockAfter: 'firstAwakening'
  },
  {
    id: 'merc_veteran',
    name: '退役兵长', tbd: true,
    profession: 'veteran', cost: 500,
    hpMax: 95, apMax: 4, position: 1,
    attrs: { atk: 17, def: 10, spd: 5, crit: 8, dodge: 3 },
    skills: ['captain_cleave', 'melee_strike', 'defend'],
    unlockAfter: 'firstAwakening'
  },
  {
    id: 'merc_ranger',
    name: '林间游侠', tbd: true,
    profession: 'ranger', cost: 420,
    hpMax: 62, apMax: 5, position: 3,
    attrs: { atk: 15, def: 6, spd: 10, crit: 12, dodge: 12 },
    skills: ['aimed_shot', 'set_trap', 'quick_shot'],
    unlockAfter: 'secondAwakening'
  },
  {
    id: 'merc_hex_witch',
    name: '咒血术者', tbd: true,
    profession: 'hexer', cost: 620,
    hpMax: 55, apMax: 5, position: 4,
    attrs: { atk: 20, def: 4, spd: 7, crit: 15, dodge: 8 },
    skills: ['dragon_curse', 'soul_drain'],
    unlockAfter: 'secondAwakening'
  },
  {
    id: 'merc_dragon_hunter',
    name: '猎龙者', tbd: true,
    profession: 'dragon_hunter', cost: 900,
    hpMax: 110, apMax: 5, position: 1,
    attrs: { atk: 22, def: 12, spd: 8, crit: 14, dodge: 7 },
    skills: ['scale_slam', 'melee_strike', 'defend'],
    unlockAfter: 'finalAwakening'
  }
]

export function availableTavernMercs(playerFlags) {
  return tavernPool.filter(m => !m.unlockAfter || playerFlags[m.unlockAfter])
}
