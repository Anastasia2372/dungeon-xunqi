import { reactive } from 'vue'
import { getEnemy, spawnEnemy } from './enemies'
import { getSkill, canUseSkill } from './skills'
import { getDragonArt } from './dragon-arts'
import { computeItemBonus } from './loot'
import { player, gainExp, gainDragonMeter, isDragonReady, consumeDragonMeter } from '../stores/player'
import { party, activeCompanions } from '../stores/party'
import { addItem, addGold } from '../stores/inventory'
import { generateLoot } from './loot'

export const battle = reactive({
  active: false,
  allies: [],
  enemies: [],
  turn: 'ally',
  turnNumber: 1,
  currentActorId: null,
  log: [],
  ended: false,
  result: null,
  rewards: null,
  dragonMode: false,
  pendingSkill: null,
  waitingForTarget: false,
  meta: {}
})

function pushLog(text) {
  battle.log.push({ turn: battle.turnNumber, side: battle.turn, text })
  if (battle.log.length > 60) battle.log.shift()
}

function computePlayerAttrs() {
  const base = { ...player.attrs, hpMax: player.hpMax }
  for (const slot of ['weapon', 'armor', 'trinket']) {
    const item = player.equipment[slot]
    if (!item) continue
    const bonus = computeItemBonus(item)
    for (const k of Object.keys(bonus)) {
      base[k] = (base[k] || 0) + bonus[k]
    }
  }
  return base
}

function buildPlayerUnit() {
  const attrs = computePlayerAttrs()
  return {
    instanceId: 'player',
    isPlayer: true,
    side: 'ally',
    name: player.name,
    profession: player.profession,
    position: 3,
    hp: player.hp,
    hpMax: player.hpMax,
    ap: player.apMax,
    apMax: player.apMax,
    attrs,
    skills: [...player.skills],
    activeDragonArt: player.activeDragonArt || (player.dragonArts.length ? player.dragonArts[0] : null),
    dragonArts: [...player.dragonArts],
    dragonMeter: player.dragonMeter,
    dragonMeterMax: player.dragonMeterMax,
    statuses: [],
    isAlive: player.hp > 0
  }
}

function buildCompanionUnit(c, position) {
  return {
    instanceId: c.id,
    isPlayer: false,
    side: 'ally',
    name: c.name,
    profession: c.profession,
    position,
    hp: c.hp,
    hpMax: c.hpMax,
    ap: c.apMax,
    apMax: c.apMax,
    attrs: { ...c.attrs, hpMax: c.hpMax },
    skills: [...c.skills],
    statuses: [],
    isAlive: c.hp > 0
  }
}

export function initBattle(enemyIds, meta = {}) {
  const allies = []
  allies.push(buildPlayerUnit())

  const companionPositions = [2, 1]
  const comps = activeCompanions()
  comps.forEach((c, i) => {
    if (c.hp <= 0) return
    allies.push(buildCompanionUnit(c, companionPositions[i] || 1))
  })

  const enemies = []
  const usedPositions = new Set()
  for (const eid of enemyIds) {
    const e = spawnEnemy(eid)
    if (!e) continue
    let pos = e.position
    let tries = 0
    while (usedPositions.has(pos) && tries < 4) {
      pos = pos % 4 + 1
      tries += 1
    }
    e.position = pos
    e.side = 'enemy'
    e.isAlive = true
    usedPositions.add(pos)
    enemies.push(e)
  }

  battle.active = true
  battle.allies = allies
  battle.enemies = enemies
  battle.turn = 'ally'
  battle.turnNumber = 1
  battle.currentActorId = allies[0]?.instanceId || null
  battle.log = []
  battle.ended = false
  battle.result = null
  battle.rewards = null
  battle.dragonMode = false
  battle.pendingSkill = null
  battle.waitingForTarget = false
  battle.meta = meta

  pushLog(`遭遇: ${enemies.map(e => e.name).join('、')}`)
  return battle
}

export function endBattle() {
  battle.active = false
  battle.allies = []
  battle.enemies = []
  battle.log = []
  battle.pendingSkill = null
  battle.waitingForTarget = false
  battle.dragonMode = false
}

export function findUnit(instanceId) {
  return battle.allies.find(u => u.instanceId === instanceId)
      || battle.enemies.find(u => u.instanceId === instanceId)
}

export function currentActor() {
  return findUnit(battle.currentActorId)
}

export function setCurrentActor(instanceId) {
  const u = findUnit(instanceId)
  if (!u || !u.isAlive || u.side !== battle.turn) return false
  battle.currentActorId = instanceId
  battle.pendingSkill = null
  battle.waitingForTarget = false
  return true
}

export function livingAllies() {
  return battle.allies.filter(u => u.isAlive)
}

export function livingEnemies() {
  return battle.enemies.filter(u => u.isAlive)
}

function statusMultiplier(unit, key) {
  let m = 1
  for (const s of unit.statuses) {
    if (s[key]) m *= s[key]
  }
  return m
}

function tickStatuses(unit) {
  const remaining = []
  for (const s of unit.statuses) {
    if (s.dot) {
      const dmg = s.dot.damage
      unit.hp = Math.max(0, unit.hp - dmg)
      pushLog(`${unit.name} 受 ${s.name || '灼烧'} 灼伤 ${dmg}`)
      if (unit.hp <= 0) unit.isAlive = false
    }
    const nextDuration = s.duration - 1
    if (nextDuration > 0) {
      remaining.push({ ...s, duration: nextDuration })
    }
  }
  unit.statuses = remaining
}

function computeDamage(attacker, target, effectDamage, skill) {
  const atk = attacker.attrs.atk || 0
  const base = effectDamage.base || 0
  const scale = effectDamage.atkScale || 1
  let raw = base + atk * scale
  const def = (target.attrs.def || 0) * statusMultiplier(target, 'defMultiplier')
  let dmg = Math.max(1, Math.floor(raw - def * 0.7))
  const critBonus = (skill?.effect?.critBonus || 0)
  const critChance = (attacker.attrs.crit || 0) + critBonus
  const isCrit = Math.random() * 100 < critChance
  if (isCrit) dmg = Math.floor(dmg * 1.6)
  dmg = Math.floor(dmg * statusMultiplier(attacker, 'atkMultiplier'))
  return { dmg, isCrit }
}

function rollHit(attacker, target, accuracy) {
  const acc = accuracy || 100
  const dodge = target.attrs.dodge || 0
  const finalAcc = Math.max(5, Math.min(99, acc - dodge))
  return Math.random() * 100 < finalAcc
}

function targetsForSkill(actor, skill) {
  if (skill.targetType === 'self') return [actor]
  if (skill.targetType === 'all_enemies') {
    return actor.side === 'ally' ? livingEnemies() : livingAllies()
  }
  if (skill.targetType === 'enemy_row') return null
  if (skill.targetType === 'summon') return []
  const opp = actor.side === 'ally' ? livingEnemies() : livingAllies()
  return opp.filter(t => skill.targetPositions.includes(t.position))
}

export function skillIsUsable(actor, skillId) {
  const skill = getSkill(skillId)
  if (!skill) return false
  if (actor.ap < skill.apCost) return false
  if (!skill.userPositions.includes(actor.position)) return false
  return true
}

export function selectSkill(skillId) {
  const actor = currentActor()
  if (!actor || !skillIsUsable(actor, skillId)) return false
  const skill = getSkill(skillId)
  battle.pendingSkill = skillId
  if (skill.targetType === 'self' || skill.targetType === 'all_enemies') {
    battle.waitingForTarget = false
    executeSkill(actor, skill, null)
    return true
  }
  battle.waitingForTarget = true
  return true
}

export function cancelSkillSelection() {
  battle.pendingSkill = null
  battle.waitingForTarget = false
}

export function selectTarget(targetInstanceId) {
  if (!battle.waitingForTarget) return false
  const actor = currentActor()
  const skill = getSkill(battle.pendingSkill)
  const target = findUnit(targetInstanceId)
  if (!actor || !skill || !target || !target.isAlive) return false
  if (skill.targetPositions && !skill.targetPositions.includes(target.position)) return false
  executeSkill(actor, skill, target)
  battle.waitingForTarget = false
  battle.pendingSkill = null
  return true
}

function executeSkill(actor, skill, target) {
  actor.ap -= skill.apCost
  pushLog(`${actor.name} 使用 ${skill.name}`)

  if (skill.effect.status && skill.targetType === 'self') {
    const s = { ...skill.effect.status, name: skill.effect.status.name || skill.id }
    actor.statuses.push(s)
    pushLog(`${actor.name} 进入 ${s.name} 状态`)
  }

  if (skill.effect.damage) {
    const targets = skill.targetType === 'all_enemies'
      ? (actor.side === 'ally' ? livingEnemies() : livingAllies())
      : [target]
    for (const t of targets) {
      if (!t || !t.isAlive) continue
      const hit = rollHit(actor, t, skill.effect.accuracy)
      if (!hit) {
        pushLog(`${actor.name} 攻击 ${t.name} 未命中`)
        continue
      }
      const { dmg, isCrit } = computeDamage(actor, t, skill.effect.damage, skill)
      t.hp = Math.max(0, t.hp - dmg)
      pushLog(`${actor.name} 命中 ${t.name}${isCrit ? '(暴击)' : ''} 造成 ${dmg} 伤害`)
      if (skill.effect.dot) {
        t.statuses.push({ ...skill.effect.dot, name: skill.effect.dot.name || 'burn', duration: skill.effect.dot.duration || 2 })
      }
      if (t.hp <= 0) {
        t.isAlive = false
        pushLog(`${t.name} 倒下`)
      }
      if (actor.isPlayer) {
        const gain = skill.dragonGain || 4
        actor.dragonMeter = Math.min(actor.dragonMeterMax, actor.dragonMeter + gain)
      }
    }
  }

  if (skill.effect.knockback && target) {
    const dir = actor.side === 'ally' ? 1 : -1
    const oldPos = target.position
    const newPos = Math.max(1, Math.min(4, oldPos + skill.effect.knockback * (actor.side === 'ally' ? 1 : -1)))
    target.position = newPos
    if (newPos !== oldPos) pushLog(`${target.name} 被击退到 ${newPos} 位`)
  }

  if (skill.effect.summonId) {
    if (battle.enemies.filter(e => e.isAlive).length < (skill.effect.maxAllies || 3)) {
      const summon = spawnEnemy(skill.effect.summonId)
      if (summon) {
        summon.side = 'enemy'
        summon.isAlive = true
        summon.position = pickFreePosition('enemy')
        battle.enemies.push(summon)
        pushLog(`${actor.name} 召唤了 ${summon.name}`)
      }
    }
  }

  if (actor.isPlayer && actor.hp <= actor.hpMax * 0.3) {
    actor.dragonMeter = Math.min(actor.dragonMeterMax, actor.dragonMeter + 8)
  }
  if (actor.isPlayer) {
    player.dragonMeter = actor.dragonMeter
  }
  checkBattleEnd()
}

function pickFreePosition(side) {
  const list = side === 'enemy' ? battle.enemies : battle.allies
  const used = new Set(list.filter(u => u.isAlive).map(u => u.position))
  for (const p of [1, 2, 3, 4]) if (!used.has(p)) return p
  return 1
}

export function moveActor(direction) {
  const actor = currentActor()
  if (!actor || actor.ap < 1) return false
  const newPos = actor.position + direction
  if (newPos < 1 || newPos > 4) return false
  const occupied = (actor.side === 'ally' ? battle.allies : battle.enemies)
    .some(u => u !== actor && u.isAlive && u.position === newPos)
  if (occupied) return false
  actor.position = newPos
  actor.ap -= 1
  pushLog(`${actor.name} 移动到 ${newPos} 位`)
  return true
}

export function defendAction() {
  const actor = currentActor()
  if (!actor || actor.ap < 1) return false
  actor.ap -= 1
  actor.statuses.push({ name: 'defending', duration: 1, defMultiplier: 2.0 })
  pushLog(`${actor.name} 进入防御姿态`)
  return true
}

export function canReleaseDragonArt() {
  const p = battle.allies.find(u => u.isPlayer)
  if (!p || !p.isAlive) return false
  if (!p.activeDragonArt) return false
  if (p.dragonMeter < p.dragonMeterMax) return false
  const art = getDragonArt(p.activeDragonArt)
  if (!art) return false
  if (p.ap < art.apCost) return false
  return true
}

export function releaseDragonArt() {
  const p = battle.allies.find(u => u.isPlayer)
  if (!p || !canReleaseDragonArt()) return false
  const art = getDragonArt(p.activeDragonArt)
  p.ap -= art.apCost
  p.dragonMeter = 0
  player.dragonMeter = 0
  battle.dragonMode = true
  pushLog(`${p.name} 血脉迸发,释放【${art.name}】`)
  const targets = livingEnemies()
  for (const t of targets) {
    const hit = rollHit(p, t, art.effect.accuracy)
    if (!hit) continue
    const { dmg, isCrit } = computeDamage(p, t, art.effect.damage, { effect: { critBonus: 30 } })
    t.hp = Math.max(0, t.hp - dmg)
    pushLog(`${art.name} 灼中 ${t.name}${isCrit ? '(暴击)' : ''} 造成 ${dmg} 伤害`)
    if (art.effect.dot) {
      t.statuses.push({ ...art.effect.dot, duration: art.effect.dot.duration || 2 })
    }
    if (t.hp <= 0) {
      t.isAlive = false
      pushLog(`${t.name} 倒下`)
    }
  }
  battle.dragonMode = false
  checkBattleEnd()
  return true
}

export function nextAlivelyAlly() {
  const arr = battle.allies.filter(u => u.isAlive && u.ap > 0)
  if (arr.length === 0) return null
  return arr[0]
}

export function endTurn() {
  if (battle.ended) return
  if (battle.turn === 'ally') {
    for (const u of battle.allies) {
      if (u.isAlive) tickStatuses(u)
    }
    battle.turn = 'enemy'
    for (const u of battle.enemies) {
      if (u.isAlive) u.ap = u.apMax
    }
    runEnemyTurn()
  } else {
    for (const u of battle.enemies) {
      if (u.isAlive) tickStatuses(u)
    }
    battle.turn = 'ally'
    battle.turnNumber += 1
    for (const u of battle.allies) {
      if (u.isAlive) u.ap = u.apMax
    }
    const first = battle.allies.find(u => u.isAlive)
    battle.currentActorId = first?.instanceId || null
    battle.pendingSkill = null
    battle.waitingForTarget = false
  }
  checkBattleEnd()
}

function runEnemyTurn() {
  for (const enemy of battle.enemies) {
    if (!enemy.isAlive) continue
    while (enemy.ap > 0 && enemy.isAlive) {
      const skill = pickEnemySkill(enemy)
      if (!skill) {
        if (!tryMoveEnemyToward(enemy)) break
        continue
      }
      const targets = livingAllies()
      if (targets.length === 0) break
      const target = pickEnemyTarget(enemy, skill, targets)
      if (!target) break
      executeSkill(enemy, skill, target)
      if (battle.ended) return
    }
  }
  setTimeout(() => {
    if (!battle.ended && battle.turn === 'enemy') endTurn()
  }, 400)
}

function pickEnemySkill(enemy) {
  const usable = enemy.skills
    .map(id => getSkill(id))
    .filter(s => s && enemy.ap >= s.apCost && s.userPositions.includes(enemy.position))
  if (usable.length === 0) return null
  return usable[Math.floor(Math.random() * usable.length)]
}

function pickEnemyTarget(enemy, skill, targets) {
  const inRange = targets.filter(t => !skill.targetPositions || skill.targetPositions.includes(t.position))
  if (inRange.length === 0) return null
  inRange.sort((a, b) => a.hp - b.hp)
  return inRange[0]
}

function tryMoveEnemyToward(enemy) {
  if (enemy.ap < 1) return false
  const dir = enemy.position < 4 ? 1 : -1
  const newPos = enemy.position + dir
  if (newPos < 1 || newPos > 4) return false
  const occupied = battle.enemies.some(u => u !== enemy && u.isAlive && u.position === newPos)
  if (occupied) return false
  enemy.position = newPos
  enemy.ap -= 1
  pushLog(`${enemy.name} 移动到 ${newPos} 位`)
  return true
}

function checkBattleEnd() {
  if (battle.ended) return
  const alliesAlive = battle.allies.some(u => u.isAlive)
  const enemiesAlive = battle.enemies.some(u => u.isAlive)
  if (!alliesAlive) {
    battle.ended = true
    battle.result = 'defeat'
    pushLog('战斗失败')
    return
  }
  if (!enemiesAlive) {
    battle.ended = true
    battle.result = 'victory'
    battle.rewards = computeRewards()
    pushLog('战斗胜利')
    return
  }
}

function computeRewards() {
  let exp = 0
  let gold = 0
  const items = []
  for (const e of battle.enemies) {
    const def = getEnemy(e.id)
    if (!def) continue
    exp += def.expReward || 0
    const [gLo, gHi] = def.goldReward || [0, 0]
    gold += Math.floor(Math.random() * (gHi - gLo + 1)) + gLo
    if (def.tier === 'elite' && Math.random() < 0.6) {
      items.push(generateLoot(battle.meta.floor || 1))
    }
    if (def.tier === 'boss') {
      items.push(generateLoot(battle.meta.floor || 1))
      items.push(generateLoot(battle.meta.floor || 1))
    }
    if (def.tier === 'common' && Math.random() < 0.18) {
      items.push(generateLoot(battle.meta.floor || 1))
    }
  }
  return { exp, gold, items }
}

export function applyRewardsAndSync() {
  if (!battle.rewards) return
  const { exp, gold, items } = battle.rewards
  gainExp(exp)
  addGold(gold)
  for (const it of items) if (it) addItem(it)
  const playerUnit = battle.allies.find(u => u.isPlayer)
  if (playerUnit) {
    player.hp = playerUnit.hp
    player.dragonMeter = playerUnit.dragonMeter
  }
  for (const u of battle.allies) {
    if (u.isPlayer) continue
    const c = party.recruited.find(x => x.id === u.instanceId)
    if (c) c.hp = u.hp
  }
}

export function syncOnDefeat() {
  const playerUnit = battle.allies.find(u => u.isPlayer)
  if (playerUnit) player.hp = Math.max(1, playerUnit.hp)
  for (const u of battle.allies) {
    if (u.isPlayer) continue
    const c = party.recruited.find(x => x.id === u.instanceId)
    if (c) c.hp = Math.max(1, u.hp)
  }
}

export function isBattleEnded() {
  return battle.ended
}
