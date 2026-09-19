import { reactive } from 'vue'

const defaultPlayer = () => ({
  name: '主角',
  profession: 'hunter',
  level: 1,
  exp: 0,
  expToNext: 20,
  hp: 50,
  hpMax: 50,
  ap: 5,
  apMax: 5,
  position: 3,
  attrs: {
    atk: 10,
    def: 5,
    spd: 5,
    crit: 5,
    dodge: 5
  },
  equipment: {
    weapon: null,
    armor: null,
    trinket: null
  },
  skills: ['aimed_shot', 'quick_shot', 'set_trap'],
  dragonArts: [],
  activeDragonArts: [],
  dragonArtsSlots: 1,
  dragonMeter: 0,
  dragonMeterMax: 100,
  flags: {
    prologueDone: false,
    firstAwakening: false,
    secondAwakening: false,
    finalAwakening: false,
    knowsAboutBlood: false
  }
})

export const player = reactive(defaultPlayer())

export function resetPlayer(overrides = {}) {
  Object.assign(player, defaultPlayer(), overrides)
  if (!Array.isArray(player.activeDragonArts)) {
    player.activeDragonArts = player.activeDragonArt ? [player.activeDragonArt] : []
  }
}

export function gainExp(amount) {
  player.exp += amount
  while (player.exp >= player.expToNext) {
    player.exp -= player.expToNext
    levelUp()
  }
}

export function levelUp() {
  player.level += 1
  player.expToNext = Math.floor(player.expToNext * 1.5)
  player.hpMax += 8
  player.hp = player.hpMax
  player.attrs.atk += 2
  player.attrs.def += 1
  player.attrs.spd += 1
}

export function damagePlayer(amount) {
  player.hp = Math.max(0, player.hp - amount)
  return player.hp <= 0
}

export function healPlayer(amount) {
  player.hp = Math.min(player.hpMax, player.hp + amount)
}

export function restorePlayer() {
  player.hp = player.hpMax
  player.ap = player.apMax
  player.dragonMeter = 0
}

export function gainDragonMeter(amount) {
  player.dragonMeter = Math.min(player.dragonMeterMax, player.dragonMeter + amount)
}

export function consumeDragonMeter() {
  player.dragonMeter = 0
}

export function isDragonReady() {
  return player.dragonMeter >= player.dragonMeterMax
}

export function equipDragonArt(id) {
  if (!player.dragonArts.includes(id)) return false
  if (player.activeDragonArts.includes(id)) return false
  if (player.activeDragonArts.length >= player.dragonArtsSlots) {
    player.activeDragonArts.shift()
  }
  player.activeDragonArts.push(id)
  return true
}

export function unequipDragonArt(id) {
  const idx = player.activeDragonArts.indexOf(id)
  if (idx < 0) return false
  player.activeDragonArts.splice(idx, 1)
  return true
}

export function unlockDragonArt(id) {
  if (player.dragonArts.includes(id)) return false
  player.dragonArts.push(id)
  if (player.activeDragonArts.length < player.dragonArtsSlots) {
    player.activeDragonArts.push(id)
  }
  return true
}

export function setDragonArtsSlots(n) {
  player.dragonArtsSlots = Math.max(1, n)
  while (player.activeDragonArts.length > player.dragonArtsSlots) {
    player.activeDragonArts.pop()
  }
}
