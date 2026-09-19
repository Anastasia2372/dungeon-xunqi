<script setup>
import { ref, computed, onMounted } from 'vue'
import { dungeon, nextFloor, markClueFound, exitDungeon } from '../stores/dungeon'
import { player } from '../stores/player'
import { quest, setFlag, getFlag } from '../stores/quest'
import { getDungeon, getFloor, getClue, generateFloorRooms } from '../game/dungeons'
import { initBattle } from '../game/combat-engine'
import { saveGame } from '../stores/save'

const emit = defineEmits(['start-combat', 'exit-dungeon', 'awakening'])

const showClueText = ref(null)

const currentDungeon = computed(() => getDungeon(dungeon.currentDungeonId))
const currentFloor = computed(() => getFloor(dungeon.currentDungeonId, dungeon.currentFloor))
const currentRoom = computed(() => dungeon.floorRooms[dungeon.currentRoom])
const nextIdx = computed(() => dungeon.currentRoom + 1)
const isFloorEnd = computed(() => nextIdx.value >= dungeon.floorRooms.length)
const hasNextFloor = computed(() => currentFloor.value?.exitToFloor != null)

onMounted(() => {
  ensureRooms()
})

function ensureRooms() {
  if (dungeon.floorRooms.length === 0 && currentFloor.value) {
    dungeon.floorRooms = generateFloorRooms(currentFloor.value)
    dungeon.currentRoom = 0
  }
}

function roomLabel(room) {
  if (!room) return '(空)'
  if (room.type === 'combat') return `${room.cleared ? '(已清)' : ''}遭遇`
  if (room.type === 'boss') return `${room.cleared ? '(已胜)' : ''}王者之厅`
  if (room.type === 'clue') return `${room.cleared ? '(已拾)' : ''}发现物`
  if (room.type === 'loot') return `${room.cleared ? '(已取)' : ''}宝箱`
  return `${room.cleared ? '(已过)' : ''}空室`
}

function enterCurrentRoom() {
  const r = currentRoom.value
  if (!r || r.cleared) return
  if (r.type === 'combat') {
    initBattle(r.enemyIds, { floor: dungeon.currentFloor, roomIdx: dungeon.currentRoom })
    emit('start-combat', r)
    return
  }
  if (r.type === 'boss') {
    initBattle([r.bossId], {
      floor: dungeon.currentFloor,
      roomIdx: dungeon.currentRoom,
      isBoss: true,
      firstAwakening: currentFloor.value.firstAwakening,
      secondAwakening: currentFloor.value.secondAwakening,
      finalAwakening: currentFloor.value.finalAwakening
    })
    emit('start-combat', r)
    return
  }
  if (r.type === 'clue') {
    const clue = getClue(r.clueId)
    if (clue) {
      markClueFound(r.clueId)
      showClueText.value = clue
    }
    r.cleared = true
    saveGame()
    return
  }
  if (r.type === 'loot') {
    r.cleared = true
    saveGame()
    return
  }
  r.cleared = true
  saveGame()
}

function dismissClue() {
  showClueText.value = null
}

function advanceRoom() {
  if (isFloorEnd.value) {
    if (hasNextFloor.value) {
      nextFloor()
      const floorDef = getFloor(dungeon.currentDungeonId, dungeon.currentFloor)
      if (floorDef) {
        dungeon.floorRooms = generateFloorRooms(floorDef)
        dungeon.currentRoom = 0
      }
    } else {
      exitDungeon()
      emit('exit-dungeon', 'cleared')
    }
    saveGame()
    return
  }
  dungeon.currentRoom = nextIdx.value
  saveGame()
}

function retreatToTown() {
  saveGame()
  emit('exit-dungeon', 'retreat')
}

function isRoomCurrent(i) { return i === dungeon.currentRoom }
</script>

<template>
  <div class="dungeon">
    <header class="hud">
      <div class="hud-item">
        <span class="hud-label">遗迹</span>
        <span class="hud-value">{{ currentDungeon?.name || '未知' }} · 第 {{ dungeon.currentFloor }} 层</span>
      </div>
      <div class="hud-item">
        <span class="hud-label">{{ currentFloor?.name || '' }}</span>
        <span class="hud-value">房间 {{ dungeon.currentRoom + 1 }} / {{ dungeon.floorRooms.length }}</span>
      </div>
      <div class="hud-item">
        <span class="hud-label">HP</span>
        <span class="hud-value">{{ player.hp }}/{{ player.hpMax }}</span>
      </div>
      <div class="hud-item">
        <span class="hud-label">龙意</span>
        <span class="hud-value">{{ player.dragonMeter }}/{{ player.dragonMeterMax }}</span>
      </div>
    </header>

    <main class="scene">
      <div class="rooms-track">
        <div v-for="(r, i) in dungeon.floorRooms" :key="i" class="room-mark"
             :class="{ current: isRoomCurrent(i), cleared: r.cleared, ahead: i > dungeon.currentRoom }">
          <div class="room-num">{{ i + 1 }}</div>
          <div class="room-type">{{ roomLabel(r) }}</div>
        </div>
      </div>

      <div class="room-detail" v-if="currentRoom">
        <h3 class="room-title">{{ roomLabel(currentRoom) }}</h3>
        <p v-if="currentRoom.type === 'combat' && !currentRoom.cleared" class="room-desc">
          有人影在此逡巡 · 敌数 {{ currentRoom.enemyIds?.length }}
        </p>
        <p v-else-if="currentRoom.type === 'boss' && !currentRoom.cleared" class="room-desc">
          殿门后有沉重的呼吸声。楼层的守卫在这里
        </p>
        <p v-else-if="currentRoom.type === 'clue' && !currentRoom.cleared" class="room-desc">
          地上有什么东西反着微光
        </p>
        <p v-else-if="currentRoom.type === 'loot' && !currentRoom.cleared" class="room-desc">
          墙角一只旧箱
        </p>
        <p v-else-if="currentRoom.cleared" class="room-desc cleared-desc">
          这间已经翻过
        </p>
        <p v-else class="room-desc">
          什么也没有。往前走
        </p>

        <div class="room-actions">
          <button v-if="!currentRoom.cleared" class="primary" @click="enterCurrentRoom">
            <span v-if="currentRoom.type === 'combat' || currentRoom.type === 'boss'">迎击</span>
            <span v-else-if="currentRoom.type === 'clue'">查看</span>
            <span v-else-if="currentRoom.type === 'loot'">开箱</span>
            <span v-else>穿过</span>
          </button>
          <button v-else class="primary" @click="advanceRoom">
            <span v-if="isFloorEnd && hasNextFloor">下到第 {{ dungeon.currentFloor + 1 }} 层</span>
            <span v-else-if="isFloorEnd && !hasNextFloor">离开遗迹</span>
            <span v-else>前进到下一房间</span>
          </button>
          <button class="secondary" @click="retreatToTown">回城</button>
        </div>
      </div>
    </main>

    <div class="clue-modal" v-if="showClueText" @click.self="dismissClue">
      <div class="clue-box">
        <h2>{{ showClueText.name }}</h2>
        <p>{{ showClueText.description }}</p>
        <button @click="dismissClue">收好</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dungeon {
  height: 100vh;
  background: #ebe4d5;
  color: #1a1612;
  font-family: 'Georgia', 'STSong', 'SimSun', serif;
  display: flex;
  flex-direction: column;
}

.hud {
  display: flex;
  gap: 2rem;
  padding: 0.8rem 1.5rem;
  border-bottom: 1.5px solid #1a1612;
  background: rgba(26, 22, 18, 0.06);
}

.hud-item {
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
}

.hud-label {
  font-size: 0.7rem;
  opacity: 0.55;
  letter-spacing: 0.15em;
  margin-bottom: 0.15rem;
}

.hud-value {
  font-weight: 500;
}

.scene {
  flex: 1;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
}

.rooms-track {
  display: flex;
  gap: 0.4rem;
  border: 1.5px solid #1a1612;
  padding: 1rem;
  background: rgba(255,255,255,0.4);
}

.room-mark {
  flex: 1;
  padding: 0.6rem 0.4rem;
  border: 1px dashed #1a1612;
  text-align: center;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}

.room-mark.current {
  background: #1a1612;
  color: #f4efe6;
  border-style: solid;
  border-width: 2px;
}

.room-mark.cleared {
  opacity: 0.4;
}

.room-mark.ahead {
  opacity: 0.5;
}

.room-num {
  font-size: 1.05rem;
  font-weight: 500;
}

.room-type {
  opacity: 0.7;
  margin-top: 0.2rem;
}

.room-detail {
  border: 1.5px solid #1a1612;
  padding: 1.6rem 2rem;
  background: rgba(255,255,255,0.55);
  max-width: 640px;
}

.room-title {
  font-size: 1.4rem;
  letter-spacing: 0.3em;
  margin: 0 0 0.8rem 0;
  font-weight: 400;
  padding-left: 0.3em;
}

.room-desc {
  font-size: 0.95rem;
  opacity: 0.75;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.cleared-desc {
  opacity: 0.4;
}

.room-actions {
  display: flex;
  gap: 0.6rem;
}

.room-actions button {
  font-family: inherit;
  font-size: 0.95rem;
  padding: 0.5rem 1.4rem;
  border: 1.5px solid #1a1612;
  background: transparent;
  color: #1a1612;
  cursor: pointer;
  letter-spacing: 0.15em;
  border-radius: 2px;
}

.room-actions button:hover {
  background: #1a1612;
  color: #ebe4d5;
}

.room-actions button.primary {
  border-color: #7a3b2e;
  color: #7a3b2e;
  border-width: 2px;
  font-weight: 500;
}

.room-actions button.primary:hover {
  background: #7a3b2e;
  color: #ebe4d5;
}

.room-actions button.secondary {
  opacity: 0.65;
  font-size: 0.85rem;
}

.clue-modal {
  position: fixed;
  inset: 0;
  background: rgba(26, 22, 18, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
}

.clue-box {
  background: #f4efe6;
  border: 2px solid #1a1612;
  padding: 2rem 3rem;
  max-width: 460px;
  text-align: center;
}

.clue-box h2 {
  font-size: 1.6rem;
  letter-spacing: 0.25em;
  margin: 0 0 1rem 0;
  font-weight: 400;
  color: #7a3b2e;
  padding-left: 0.25em;
}

.clue-box p {
  font-size: 0.95rem;
  line-height: 1.7;
  opacity: 0.85;
  margin: 0 0 1.5rem 0;
}

.clue-box button {
  font-family: inherit;
  font-size: 0.95rem;
  padding: 0.5rem 2rem;
  border: 1.5px solid #1a1612;
  background: transparent;
  cursor: pointer;
}

.clue-box button:hover {
  background: #1a1612;
  color: #f4efe6;
}
</style>
