<script setup>
import { ref, computed } from 'vue'
import { player, restorePlayer } from '../stores/player'
import { party, restoreCompanions } from '../stores/party'
import { inventory } from '../stores/inventory'
import { dungeon } from '../stores/dungeon'
import { quest } from '../stores/quest'
import { itemDisplayName, computeItemBonus } from '../game/loot'
import { saveGame, downloadSave } from '../stores/save'

const emit = defineEmits(['enter-dungeon', 'back-to-menu'])

const view = ref('main')

function onRest() {
  restorePlayer()
  restoreCompanions()
  saveGame()
}

function onEnterDungeon() {
  saveGame()
  emit('enter-dungeon', 'main')
}

function equip(uid) {
  const item = inventory.items.find(x => x.uid === uid)
  if (!item) return
  const currentEquipped = player.equipment[item.slot]
  player.equipment[item.slot] = item
  inventory.items = inventory.items.filter(x => x.uid !== uid)
  if (currentEquipped) inventory.items.push(currentEquipped)
  saveGame()
}

function unequip(slot) {
  const item = player.equipment[slot]
  if (!item) return
  player.equipment[slot] = null
  inventory.items.push(item)
  saveGame()
}

const equipmentList = computed(() => [
  { slot: 'weapon', slotName: '武器', item: player.equipment.weapon },
  { slot: 'armor', slotName: '护甲', item: player.equipment.armor },
  { slot: 'trinket', slotName: '饰品', item: player.equipment.trinket }
])

const cluesFound = computed(() => dungeon.clues.length)
const dungeonProgress = computed(() => {
  if (dungeon.currentDungeonId) {
    return `已探索至第 ${dungeon.currentFloor} 层 (${dungeon.currentRoom + 1}/${dungeon.floorRooms.length || '?'} 房间)`
  }
  return '尚未踏入'
})

function itemBonusText(it) {
  if (!it) return ''
  const b = computeItemBonus(it)
  const parts = []
  if (b.atk) parts.push(`攻+${b.atk}`)
  if (b.def) parts.push(`防+${b.def}`)
  if (b.hpMax) parts.push(`HP+${b.hpMax}`)
  if (b.spd) parts.push(`速+${b.spd}`)
  if (b.crit) parts.push(`暴+${b.crit}`)
  if (b.dodge) parts.push(`闪+${b.dodge}`)
  if (b.dragonGain) parts.push(`龙意+${b.dragonGain}`)
  return parts.join(' · ')
}
</script>

<template>
  <div class="town">
    <header class="hud">
      <div class="hud-item">
        <span class="hud-label">{{ player.name }}</span>
        <span class="hud-value">Lv {{ player.level }} · {{ player.exp }}/{{ player.expToNext }}</span>
      </div>
      <div class="hud-item">
        <span class="hud-label">HP</span>
        <span class="hud-value">{{ player.hp }}/{{ player.hpMax }}</span>
      </div>
      <div class="hud-item">
        <span class="hud-label">金币</span>
        <span class="hud-value">{{ inventory.gold }}</span>
      </div>
      <div class="hud-item">
        <span class="hud-label">线索</span>
        <span class="hud-value">{{ cluesFound }}</span>
      </div>
      <div class="hud-item">
        <span class="hud-label">进度</span>
        <span class="hud-value">{{ dungeonProgress }}</span>
      </div>
    </header>

    <main class="scene">
      <div v-if="view === 'main'" class="main-view">
        <h2 class="place-name">家</h2>
        <p class="place-desc">灶台上还剩她煮过的一半汤。你不能停在这</p>
        <div class="actions">
          <button @click="onRest">在家中休息 · 回满 HP</button>
          <button @click="view = 'inventory'">查看行囊</button>
          <button class="primary" @click="onEnterDungeon">前往遗迹入口</button>
          <button class="secondary" @click="downloadSave">下载存档</button>
        </div>
      </div>

      <div v-else-if="view === 'inventory'" class="inv-view">
        <h2 class="place-name">行囊</h2>
        <div class="inv-cols">
          <section class="equipped">
            <h3>已穿戴</h3>
            <div v-for="e in equipmentList" :key="e.slot" class="equip-row">
              <span class="slot-name">{{ e.slotName }}</span>
              <span class="item-name" v-if="e.item">{{ itemDisplayName(e.item) }}</span>
              <span class="item-name empty" v-else>(空)</span>
              <span class="item-bonus" v-if="e.item">{{ itemBonusText(e.item) }}</span>
              <button v-if="e.item" class="mini" @click="unequip(e.slot)">卸下</button>
            </div>
          </section>
          <section class="bag">
            <h3>背包 ({{ inventory.items.length }})</h3>
            <div v-if="!inventory.items.length" class="empty-hint">空空如也</div>
            <div v-for="it in inventory.items" :key="it.uid" class="bag-row">
              <span class="item-name">{{ itemDisplayName(it) }}</span>
              <span class="item-bonus">{{ itemBonusText(it) }}</span>
              <button class="mini" @click="equip(it.uid)">穿戴</button>
            </div>
          </section>
        </div>
        <div class="back">
          <button @click="view = 'main'">← 返回</button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.town {
  height: 100vh;
  background: #f4efe6;
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
  background: rgba(26, 22, 18, 0.04);
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
  overflow-y: auto;
}

.place-name {
  font-size: 2rem;
  letter-spacing: 0.4em;
  padding-left: 0.4em;
  margin: 0.5rem 0 0.5rem 0;
  font-weight: 300;
}

.place-desc {
  font-size: 0.95rem;
  opacity: 0.7;
  margin-bottom: 2.5rem;
  font-style: italic;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 320px;
}

.actions button {
  font-family: inherit;
  font-size: 1rem;
  padding: 0.55rem 1.2rem;
  border: 1.5px solid #1a1612;
  background: transparent;
  color: #1a1612;
  cursor: pointer;
  letter-spacing: 0.2em;
  border-radius: 2px;
}

.actions button:hover {
  background: #1a1612;
  color: #f4efe6;
}

.actions button.primary {
  border-color: #7a3b2e;
  color: #7a3b2e;
  border-width: 2px;
  font-weight: 500;
}

.actions button.primary:hover {
  background: #7a3b2e;
  color: #f4efe6;
}

.actions button.secondary {
  font-size: 0.85rem;
  opacity: 0.7;
}

.inv-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 1rem;
}

.equipped h3, .bag h3 {
  font-size: 1rem;
  letter-spacing: 0.2em;
  margin-bottom: 0.8rem;
  font-weight: 400;
  border-bottom: 1px solid #1a1612;
  padding-bottom: 0.3rem;
}

.equip-row, .bag-row {
  display: grid;
  grid-template-columns: 5rem 1fr auto auto;
  gap: 0.6rem;
  padding: 0.4rem 0;
  font-size: 0.9rem;
  align-items: center;
}

.slot-name {
  opacity: 0.55;
  font-size: 0.8rem;
}

.item-name {
  font-weight: 500;
}

.item-name.empty {
  font-style: italic;
  opacity: 0.4;
}

.item-bonus {
  font-size: 0.78rem;
  opacity: 0.65;
}

.empty-hint {
  opacity: 0.4;
  font-style: italic;
  font-size: 0.9rem;
}

.mini {
  font-family: inherit;
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border: 1px solid #1a1612;
  background: transparent;
  color: #1a1612;
  cursor: pointer;
  border-radius: 2px;
}

.mini:hover {
  background: #1a1612;
  color: #f4efe6;
}

.back {
  margin-top: 2rem;
}

.back button {
  font-family: inherit;
  font-size: 0.9rem;
  padding: 0.4rem 1rem;
  border: 1.5px solid #1a1612;
  background: transparent;
  color: #1a1612;
  cursor: pointer;
}
</style>
