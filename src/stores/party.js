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
