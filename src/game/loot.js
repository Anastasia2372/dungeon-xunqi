export const itemBases = {
  short_bow: { slot: 'weapon', name: '短弓', baseAtk: 3, kind: 'bow' },
  hunter_bow: { slot: 'weapon', name: '猎弓', baseAtk: 6, kind: 'bow' },
  long_bow: { slot: 'weapon', name: '长弓', baseAtk: 10, kind: 'bow' },
  worn_leather: { slot: 'armor', name: '旧皮甲', baseDef: 2, baseHp: 5 },
  leather_armor: { slot: 'armor', name: '皮甲', baseDef: 4, baseHp: 8 },
  chain_mail: { slot: 'armor', name: '锁子甲', baseDef: 7, baseHp: 12 },
  wooden_charm: { slot: 'trinket', name: '木符', baseHp: 5 },
  bone_ring: { slot: 'trinket', name: '骨戒', baseHp: 3, baseAtk: 2 }
}

export const affixPool = {
  prefix: [
    { key: 'sharp', name: '锋利的', attr: 'atk', bonus: [1, 5] },
    { key: 'sturdy', name: '坚固的', attr: 'def', bonus: [1, 3] },
    { key: 'swift', name: '迅捷的', attr: 'spd', bonus: [1, 3] },
    { key: 'deadly', name: '致命的', attr: 'crit', bonus: [2, 8] },
    { key: 'nimble', name: '灵巧的', attr: 'dodge', bonus: [2, 6] },
    { key: 'vital', name: '生机的', attr: 'hpMax', bonus: [4, 10] }
  ],
  suffix: [
    { key: 'of_hunter', name: '·猎手', attr: 'atk', bonus: [1, 4] },
    { key: 'of_ward', name: '·守御', attr: 'def', bonus: [1, 3] },
    { key: 'of_vigor', name: '·活力', attr: 'hpMax', bonus: [3, 10] },
    { key: 'of_dragon', name: '·龙意', attr: 'dragonGain', bonus: [1, 4] },
    { key: 'of_bird', name: '·飞鸟', attr: 'spd', bonus: [1, 3] }
  ]
}

export const qualityDef = {
  white:  { name: '凡品', color: '#8a8578', prefixCount: 0, suffixCount: 0 },
  green:  { name: '良品', color: '#4a7a3a', prefixCount: 1, suffixCount: 0 },
  blue:   { name: '精品', color: '#3a5a9a', prefixCount: 1, suffixCount: 1 }
}

let uidCounter = 1000

function nextUid() {
  return `item_${uidCounter++}`
}

function roll(range) {
  const [lo, hi] = range
  return Math.floor(Math.random() * (hi - lo + 1)) + lo
}

function pick(pool) {
  return pool[Math.floor(Math.random() * pool.length)]
}

export function generateItem(baseId, quality = 'white') {
  const base = itemBases[baseId]
  if (!base) return null
  const q = qualityDef[quality]
  const affixes = []
  for (let i = 0; i < q.prefixCount; i++) {
    const a = pick(affixPool.prefix)
    affixes.push({ key: a.key, name: a.name, attr: a.attr, value: roll(a.bonus) })
  }
  for (let i = 0; i < q.suffixCount; i++) {
    const a = pick(affixPool.suffix)
    affixes.push({ key: a.key, name: a.name, attr: a.attr, value: roll(a.bonus) })
  }
  return {
    uid: nextUid(),
    defId: baseId,
    slot: base.slot,
    baseName: base.name,
    quality,
    baseAtk: base.baseAtk || 0,
    baseDef: base.baseDef || 0,
    baseHp: base.baseHp || 0,
    affixes,
    stackable: false
  }
}

export function rollQuality(floor) {
  const r = Math.random()
  if (floor >= 4) {
    if (r < 0.5) return 'blue'
    if (r < 0.85) return 'green'
    return 'white'
  }
  if (floor >= 2) {
    if (r < 0.2) return 'blue'
    if (r < 0.6) return 'green'
    return 'white'
  }
  if (r < 0.05) return 'blue'
  if (r < 0.4) return 'green'
  return 'white'
}

export function generateLoot(floor, slotHint = null) {
  const quality = rollQuality(floor)
  const baseIds = slotHint
    ? Object.keys(itemBases).filter(k => itemBases[k].slot === slotHint)
    : Object.keys(itemBases)
  const baseId = pick(baseIds)
  return generateItem(baseId, quality)
}

export function itemDisplayName(item) {
  if (!item) return ''
  const prefix = item.affixes.find(a => affixPool.prefix.some(p => p.key === a.key))
  const suffix = item.affixes.find(a => affixPool.suffix.some(s => s.key === a.key))
  return `${prefix ? prefix.name : ''}${item.baseName}${suffix ? suffix.name : ''}`
}

export function computeItemBonus(item) {
  if (!item) return { atk: 0, def: 0, hpMax: 0, spd: 0, crit: 0, dodge: 0, dragonGain: 0 }
  const bonus = {
    atk: item.baseAtk || 0,
    def: item.baseDef || 0,
    hpMax: item.baseHp || 0,
    spd: 0, crit: 0, dodge: 0, dragonGain: 0
  }
  for (const a of item.affixes) {
    bonus[a.attr] = (bonus[a.attr] || 0) + a.value
  }
  return bonus
}
