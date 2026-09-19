export const itemBases = {
  short_bow: { slot: 'weapon', name: '短弓', baseAtk: 3, kind: 'bow' },
  hunter_bow: { slot: 'weapon', name: '猎弓', baseAtk: 6, kind: 'bow' },
  long_bow: { slot: 'weapon', name: '长弓', baseAtk: 10, kind: 'bow' },
  war_bow: { slot: 'weapon', name: '战弓', baseAtk: 15, kind: 'bow' },
  dragon_bow: { slot: 'weapon', name: '龙纹弓', baseAtk: 22, kind: 'bow', tbd: true },
  worn_leather: { slot: 'armor', name: '旧皮甲', baseDef: 2, baseHp: 5 },
  leather_armor: { slot: 'armor', name: '皮甲', baseDef: 4, baseHp: 8 },
  chain_mail: { slot: 'armor', name: '锁子甲', baseDef: 7, baseHp: 12 },
  plate_mail: { slot: 'armor', name: '板甲', baseDef: 11, baseHp: 18 },
  dragon_scale_mail: { slot: 'armor', name: '龙鳞甲', baseDef: 16, baseHp: 26, tbd: true },
  wooden_charm: { slot: 'trinket', name: '木符', baseHp: 5 },
  bone_ring: { slot: 'trinket', name: '骨戒', baseHp: 3, baseAtk: 2 },
  silver_pendant: { slot: 'trinket', name: '银坠', baseHp: 8, baseAtk: 3 },
  dragon_tear: { slot: 'trinket', name: '龙泪', baseHp: 12, baseAtk: 5, tbd: true }
}

export const affixPool = {
  prefix: [
    { key: 'sharp', name: '锋利的', attr: 'atk', bonus: [1, 5] },
    { key: 'sturdy', name: '坚固的', attr: 'def', bonus: [1, 3] },
    { key: 'swift', name: '迅捷的', attr: 'spd', bonus: [1, 3] },
    { key: 'deadly', name: '致命的', attr: 'crit', bonus: [2, 8] },
    { key: 'nimble', name: '灵巧的', attr: 'dodge', bonus: [2, 6] },
    { key: 'vital', name: '生机的', attr: 'hpMax', bonus: [4, 10] },
    { key: 'blazing', name: '灼焰的', attr: 'atk', bonus: [3, 8] },
    { key: 'runed', name: '铭纹的', attr: 'crit', bonus: [4, 12] },
    { key: 'stormy', name: '疾风的', attr: 'spd', bonus: [2, 5] },
    { key: 'warded', name: '守护的', attr: 'def', bonus: [2, 6] }
  ],
  suffix: [
    { key: 'of_hunter', name: '·猎手', attr: 'atk', bonus: [1, 4] },
    { key: 'of_ward', name: '·守御', attr: 'def', bonus: [1, 3] },
    { key: 'of_vigor', name: '·活力', attr: 'hpMax', bonus: [3, 10] },
    { key: 'of_dragon', name: '·龙意', attr: 'dragonGain', bonus: [1, 4] },
    { key: 'of_bird', name: '·飞鸟', attr: 'spd', bonus: [1, 3] },
    { key: 'of_ash', name: '·灰烬', attr: 'atk', bonus: [2, 6] },
    { key: 'of_scales', name: '·龙鳞', attr: 'def', bonus: [3, 7] },
    { key: 'of_flame', name: '·龙焰', attr: 'dragonGain', bonus: [2, 6] }
  ]
}

export const qualityDef = {
  white:  { name: '凡品', color: '#8a8578', prefixCount: 0, suffixCount: 0, weight: 100 },
  green:  { name: '良品', color: '#4a7a3a', prefixCount: 1, suffixCount: 0, weight: 60 },
  blue:   { name: '精品', color: '#3a5a9a', prefixCount: 1, suffixCount: 1, weight: 30 },
  purple: { name: '遗品', color: '#7a3a9a', prefixCount: 2, suffixCount: 1, weight: 10, tbd: true },
  orange: { name: '神品', color: '#c88a2a', prefixCount: 2, suffixCount: 2, weight: 3, tbd: true }
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

function pickAffix(pool, excludeKeys) {
  const available = pool.filter(a => !excludeKeys.includes(a.key))
  return available[Math.floor(Math.random() * available.length)]
}

export function generateItem(baseId, quality = 'white') {
  const base = itemBases[baseId]
  if (!base) return null
  const q = qualityDef[quality] || qualityDef.white
  const affixes = []
  const usedKeys = []
  for (let i = 0; i < q.prefixCount; i++) {
    const a = pickAffix(affixPool.prefix, usedKeys)
    if (!a) break
    usedKeys.push(a.key)
    affixes.push({ key: a.key, name: a.name, attr: a.attr, value: roll(a.bonus) })
  }
  for (let i = 0; i < q.suffixCount; i++) {
    const a = pickAffix(affixPool.suffix, usedKeys)
    if (!a) break
    usedKeys.push(a.key)
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
  const r = Math.random() * 100
  if (floor >= 12) {
    if (r < 5) return 'orange'
    if (r < 20) return 'purple'
    if (r < 55) return 'blue'
    if (r < 85) return 'green'
    return 'white'
  }
  if (floor >= 8) {
    if (r < 2) return 'orange'
    if (r < 12) return 'purple'
    if (r < 45) return 'blue'
    if (r < 80) return 'green'
    return 'white'
  }
  if (floor >= 4) {
    if (r < 4) return 'purple'
    if (r < 30) return 'blue'
    if (r < 70) return 'green'
    return 'white'
  }
  if (floor >= 2) {
    if (r < 15) return 'blue'
    if (r < 55) return 'green'
    return 'white'
  }
  if (r < 3) return 'blue'
  if (r < 35) return 'green'
  return 'white'
}

function pickBaseByFloor(floor, slotHint) {
  const all = Object.entries(itemBases)
  const filtered = all.filter(([_, base]) => !slotHint || base.slot === slotHint)
  const early = filtered.filter(([id]) => !itemBases[id].tbd)
  const late = filtered
  if (floor >= 12 && Math.random() < 0.5) return pick(late)
  if (floor >= 8 && Math.random() < 0.25) return pick(late)
  return pick(early)
}

export function generateLoot(floor, slotHint = null) {
  const quality = rollQuality(floor)
  const picked = pickBaseByFloor(floor, slotHint)
  return generateItem(picked[0], quality)
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

export function rerollAffixes(item) {
  if (!item) return item
  const q = qualityDef[item.quality] || qualityDef.white
  const affixes = []
  const usedKeys = []
  for (let i = 0; i < q.prefixCount; i++) {
    const a = pickAffix(affixPool.prefix, usedKeys)
    if (!a) break
    usedKeys.push(a.key)
    affixes.push({ key: a.key, name: a.name, attr: a.attr, value: roll(a.bonus) })
  }
  for (let i = 0; i < q.suffixCount; i++) {
    const a = pickAffix(affixPool.suffix, usedKeys)
    if (!a) break
    usedKeys.push(a.key)
    affixes.push({ key: a.key, name: a.name, attr: a.attr, value: roll(a.bonus) })
  }
  return { ...item, affixes }
}

export const qualityOrder = ['white', 'green', 'blue', 'purple', 'orange']

export function upgradeQuality(item) {
  if (!item) return item
  const idx = qualityOrder.indexOf(item.quality)
  if (idx < 0 || idx >= qualityOrder.length - 1) return item
  const newQuality = qualityOrder[idx + 1]
  const q = qualityDef[newQuality]
  const affixes = [...item.affixes]
  const usedKeys = affixes.map(a => a.key)
  while (affixes.filter(a => affixPool.prefix.some(p => p.key === a.key)).length < q.prefixCount) {
    const a = pickAffix(affixPool.prefix, usedKeys)
    if (!a) break
    usedKeys.push(a.key)
    affixes.push({ key: a.key, name: a.name, attr: a.attr, value: roll(a.bonus) })
  }
  while (affixes.filter(a => affixPool.suffix.some(s => s.key === a.key)).length < q.suffixCount) {
    const a = pickAffix(affixPool.suffix, usedKeys)
    if (!a) break
    usedKeys.push(a.key)
    affixes.push({ key: a.key, name: a.name, attr: a.attr, value: roll(a.bonus) })
  }
  return { ...item, quality: newQuality, affixes }
}

export function rerollCost(item) {
  const idx = qualityOrder.indexOf(item?.quality)
  return 30 + idx * 60
}

export function upgradeCost(item) {
  const idx = qualityOrder.indexOf(item?.quality)
  return 80 + idx * 180
}
