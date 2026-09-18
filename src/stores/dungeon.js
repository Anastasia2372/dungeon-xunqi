import { reactive } from 'vue'

const defaultDungeon = () => ({
  currentDungeonId: null,
  currentFloor: 0,
  currentRoom: 0,
  floorRooms: [],
  cleared: {},
  clues: [],
  atSaveRoom: false,
  atExit: false
})

export const dungeon = reactive(defaultDungeon())

export function resetDungeon(overrides = {}) {
  Object.assign(dungeon, defaultDungeon(), overrides)
}

export function enterDungeon(id, floor = 1) {
  dungeon.currentDungeonId = id
  dungeon.currentFloor = floor
  dungeon.currentRoom = 0
}

export function exitDungeon() {
  dungeon.currentDungeonId = null
  dungeon.currentFloor = 0
  dungeon.currentRoom = 0
  dungeon.floorRooms = []
}

export function goToRoom(idx) {
  dungeon.currentRoom = idx
}

export function nextFloor() {
  dungeon.currentFloor += 1
  dungeon.currentRoom = 0
  dungeon.floorRooms = []
}

export function markClueFound(clueId) {
  if (!dungeon.clues.includes(clueId)) {
    dungeon.clues.push(clueId)
  }
}

export function markFloorCleared() {
  const key = `${dungeon.currentDungeonId}_${dungeon.currentFloor}`
  dungeon.cleared[key] = true
}

export function isFloorCleared(dungeonId, floor) {
  return !!dungeon.cleared[`${dungeonId}_${floor}`]
}
