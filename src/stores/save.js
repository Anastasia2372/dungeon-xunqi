import { player, resetPlayer } from './player'
import { party, resetParty } from './party'
import { inventory, resetInventory } from './inventory'
import { dungeon, resetDungeon } from './dungeon'
import { quest, resetQuest } from './quest'

const SAVE_KEY = 'xunqi_save_v1'
const SAVE_VERSION = 1

function snapshot() {
  return {
    version: SAVE_VERSION,
    savedAt: new Date().toISOString(),
    player: JSON.parse(JSON.stringify(player)),
    party: JSON.parse(JSON.stringify(party)),
    inventory: JSON.parse(JSON.stringify(inventory)),
    dungeon: JSON.parse(JSON.stringify(dungeon)),
    quest: JSON.parse(JSON.stringify(quest))
  }
}

export function saveGame() {
  try {
    const s = snapshot()
    localStorage.setItem(SAVE_KEY, JSON.stringify(s))
    return true
  } catch (e) {
    console.error('存档失败', e)
    return false
  }
}

export function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return false
    return applySaveJson(raw)
  } catch (e) {
    console.error('读档失败', e)
    return false
  }
}

export function hasSave() {
  return localStorage.getItem(SAVE_KEY) != null
}

export function deleteSave() {
  localStorage.removeItem(SAVE_KEY)
}

export function exportSaveAsJson() {
  const raw = localStorage.getItem(SAVE_KEY)
  return raw || JSON.stringify(snapshot(), null, 2)
}

export function importSaveJson(json) {
  return applySaveJson(json)
}

function applySaveJson(json) {
  const s = JSON.parse(json)
  if (!s || s.version !== SAVE_VERSION) {
    console.warn('存档版本不匹配', s?.version, '≠', SAVE_VERSION)
    return false
  }
  resetPlayer(s.player)
  resetParty(s.party)
  resetInventory(s.inventory)
  resetDungeon(s.dungeon)
  resetQuest(s.quest)
  localStorage.setItem(SAVE_KEY, json)
  return true
}

export function newGame() {
  resetPlayer()
  resetParty()
  resetInventory()
  resetDungeon()
  resetQuest()
  deleteSave()
}

export function downloadSave() {
  const raw = exportSaveAsJson()
  const blob = new Blob([raw], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `xunqi_save_${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}
