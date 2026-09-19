<script setup>
import { ref, computed } from 'vue'
import { player, restorePlayer, equipDragonArt, unequipDragonArt } from '../stores/player'
import { party, restoreCompanions, recruitCompanion, createCompanion, toggleActive } from '../stores/party'
import { availableTavernMercs } from '../stores/party'
import { inventory, addItem, removeItem, spendGold } from '../stores/inventory'
import { dungeon } from '../stores/dungeon'
import { itemDisplayName, computeItemBonus, rerollAffixes, upgradeQuality, rerollCost, upgradeCost, qualityDef, qualityOrder } from '../game/loot'
import { getDragonArt, dragonArts } from '../game/dragon-arts'
import { saveGame, downloadSave } from '../stores/save'
import { getSprite } from '../assets/sprites'

const emit = defineEmits(['enter-dungeon', 'back-to-menu'])

const view = ref('main')
const toast = ref(null)

function flash(text, ms = 1400) {
  toast.value = text
  setTimeout(() => { if (toast.value === text) toast.value = null }, ms)
}

function onRest() {
  restorePlayer()
  restoreCompanions()
  saveGame()
  flash('休整完毕 · HP AP 已恢复')
}

function onEnterDungeon() {
  saveGame()
  emit('enter-dungeon', 'main')
}

function equipItem(uid) {
  const item = inventory.items.find(x => x.uid === uid)
  if (!item) return
  const currentEquipped = player.equipment[item.slot]
  player.equipment[item.slot] = item
  inventory.items = inventory.items.filter(x => x.uid !== uid)
  if (currentEquipped) inventory.items.push(currentEquipped)
  saveGame()
}

function unequipItem(slot) {
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

function qualityLabel(q) {
  return qualityDef[q]?.name || q
}

function qualityColor(q) {
  return qualityDef[q]?.color || '#8a8578'
}

function canUpgrade(item) {
  const idx = qualityOrder.indexOf(item?.quality)
  return idx >= 0 && idx < qualityOrder.length - 1
}

const allItems = computed(() => {
  const bag = inventory.items.map(it => ({ ...it, source: 'bag' }))
  const equipped = equipmentList.value
    .filter(x => x.item)
    .map(x => ({ ...x.item, source: 'equipped', slotHint: x.slot }))
  return [...equipped, ...bag]
})

function blacksmithReroll(item) {
  const cost = rerollCost(item)
  if (!spendGold(cost)) return flash('金币不足')
  const newItem = rerollAffixes(item)
  applyItemChange(item, newItem)
  saveGame()
  flash(`重铸完成 · 花费 ${cost} 金`)
}

function blacksmithUpgrade(item) {
  if (!canUpgrade(item)) return flash('已达最高品级')
  const cost = upgradeCost(item)
  if (!spendGold(cost)) return flash('金币不足')
  const newItem = upgradeQuality(item)
  applyItemChange(item, newItem)
  saveGame()
  flash(`品级提升至 ${qualityLabel(newItem.quality)} · 花费 ${cost} 金`)
}

function applyItemChange(oldItem, newItem) {
  for (const slot of ['weapon', 'armor', 'trinket']) {
    if (player.equipment[slot]?.uid === oldItem.uid) {
      player.equipment[slot] = newItem
      return
    }
  }
  const idx = inventory.items.findIndex(x => x.uid === oldItem.uid)
  if (idx >= 0) inventory.items[idx] = newItem
}

const availableMercs = computed(() => {
  const flags = player.flags || {}
  return availableTavernMercs(flags).filter(m => !party.recruited.find(c => c.id === m.id))
})

function hireMerc(merc) {
  if (party.recruited.find(c => c.id === merc.id)) return flash('已招募')
  if (inventory.gold < merc.cost) return flash('金币不足')
  spendGold(merc.cost)
  const companion = createCompanion(merc)
  recruitCompanion(companion)
  saveGame()
  flash(`招募 ${merc.name}`)
}

const unlockedDragonArtsList = computed(() =>
  player.dragonArts.map(id => dragonArts[id]).filter(Boolean)
)

function isActiveDragonArt(id) {
  return player.activeDragonArts?.includes(id)
}

function toggleDragonArt(id) {
  if (isActiveDragonArt(id)) {
    unequipDragonArt(id)
  } else {
    if (player.activeDragonArts.length >= player.dragonArtsSlots) {
      flash(`挂配槽已满 (最多 ${player.dragonArtsSlots})`)
      return
    }
    equipDragonArt(id)
  }
  saveGame()
}

function activeCompanionIds() {
  return party.activeIds
}

function toggleCompanionActive(id) {
  toggleActive(id)
  saveGame()
}
</script>

<template>
  <div class="town">
    <header class="hud">
      <div class="hud-item"><span class="hud-label">{{ player.name }}</span><span class="hud-value">Lv {{ player.level }} · {{ player.exp }}/{{ player.expToNext }}</span></div>
      <div class="hud-item"><span class="hud-label">HP</span><span class="hud-value">{{ player.hp }}/{{ player.hpMax }}</span></div>
      <div class="hud-item"><span class="hud-label">金币</span><span class="hud-value">{{ inventory.gold }}</span></div>
      <div class="hud-item"><span class="hud-label">线索</span><span class="hud-value">{{ cluesFound }}</span></div>
      <div class="hud-item"><span class="hud-label">进度</span><span class="hud-value">{{ dungeonProgress }}</span></div>
    </header>

    <main class="scene">
      <div v-if="view === 'main'" class="main-view">
        <h2 class="place-name">家</h2>
        <p class="place-desc">灶台上还剩她煮过的一半汤 · 你不能停在这</p>
        <div class="actions">
          <button @click="onRest">在家中休息 · 回满 HP/AP</button>
          <button @click="view = 'inventory'">查看行囊</button>
          <button @click="view = 'blacksmith'">铁匠铺</button>
          <button @click="view = 'tavern'">酒馆</button>
          <button v-if="unlockedDragonArtsList.length" @click="view = 'dragon_arts'">龙术挂配</button>
          <button v-if="party.recruited.length" @click="view = 'party'">同伴上阵</button>
          <button class="primary" @click="onEnterDungeon">前往遗迹入口</button>
          <button class="secondary" @click="downloadSave">下载存档</button>
        </div>
      </div>

      <div v-else-if="view === 'inventory'" class="sub-view">
        <h2 class="place-name">行囊</h2>
        <div class="inv-cols">
          <section class="equipped">
            <h3>已穿戴</h3>
            <div v-for="e in equipmentList" :key="e.slot" class="row">
              <span class="slot-name">{{ e.slotName }}</span>
              <span class="item-name" v-if="e.item" :style="{ color: qualityColor(e.item.quality) }">{{ itemDisplayName(e.item) }}</span>
              <span class="item-name empty" v-else>(空)</span>
              <span class="item-bonus" v-if="e.item">{{ itemBonusText(e.item) }}</span>
              <button v-if="e.item" class="mini" @click="unequipItem(e.slot)">卸下</button>
            </div>
          </section>
          <section class="bag">
            <h3>背包 ({{ inventory.items.length }})</h3>
            <div v-if="!inventory.items.length" class="empty-hint">空空如也</div>
            <div v-for="it in inventory.items" :key="it.uid" class="row">
              <span class="quality-tag" :style="{ color: qualityColor(it.quality) }">{{ qualityLabel(it.quality) }}</span>
              <span class="item-name">{{ itemDisplayName(it) }}</span>
              <span class="item-bonus">{{ itemBonusText(it) }}</span>
              <button class="mini" @click="equipItem(it.uid)">穿戴</button>
            </div>
          </section>
        </div>
        <div class="back"><button @click="view = 'main'">← 返回</button></div>
      </div>

      <div v-else-if="view === 'blacksmith'" class="sub-view">
        <h2 class="place-name">铁匠铺</h2>
        <p class="place-desc">重铸洗词缀 · 升级提品级 · 均按品级收费</p>
        <div v-if="!allItems.length" class="empty-hint">没有可加工的装备</div>
        <div v-for="it in allItems" :key="it.uid" class="row wide">
          <span class="source-tag">{{ it.source === 'equipped' ? '穿戴' : '背包' }}</span>
          <span class="quality-tag" :style="{ color: qualityColor(it.quality) }">{{ qualityLabel(it.quality) }}</span>
          <span class="item-name">{{ itemDisplayName(it) }}</span>
          <span class="item-bonus">{{ itemBonusText(it) }}</span>
          <button class="mini" @click="blacksmithReroll(it)">重铸 · {{ rerollCost(it) }}金</button>
          <button class="mini" :disabled="!canUpgrade(it)" @click="blacksmithUpgrade(it)">升级 · {{ upgradeCost(it) }}金</button>
        </div>
        <div class="back"><button @click="view = 'main'">← 返回</button></div>
      </div>

      <div v-else-if="view === 'tavern'" class="sub-view">
        <h2 class="place-name">酒馆</h2>
        <p class="place-desc">佣兵随主线推进逐渐出现在酒馆里</p>
        <div v-if="!availableMercs.length" class="empty-hint">此刻没有新的可招之人</div>
        <div v-for="m in availableMercs" :key="m.id" class="row wide">
          <div class="merc-sprite" v-html="getSprite('companion_' + m.profession)"></div>
          <div class="merc-info">
            <div class="merc-name">{{ m.name }} <span class="merc-prof">· {{ m.profession }}</span></div>
            <div class="merc-stats">HP {{ m.hpMax }} · AP {{ m.apMax }} · 攻 {{ m.attrs.atk }} · 防 {{ m.attrs.def }} · 速 {{ m.attrs.spd }}</div>
            <div class="merc-skills">技能: {{ m.skills.join(' · ') }}</div>
          </div>
          <button class="mini" :disabled="inventory.gold < m.cost" @click="hireMerc(m)">招募 · {{ m.cost }}金</button>
        </div>
        <div class="back"><button @click="view = 'main'">← 返回</button></div>
      </div>

      <div v-else-if="view === 'party'" class="sub-view">
        <h2 class="place-name">同伴上阵</h2>
        <p class="place-desc">最多 2 人上阵 · 主角 + 同伴共 3 位轨道</p>
        <div v-if="!party.recruited.length" class="empty-hint">尚未招募任何同伴</div>
        <div v-for="c in party.recruited" :key="c.id" class="row wide">
          <div class="merc-sprite" v-html="getSprite('companion_' + c.profession)"></div>
          <div class="merc-info">
            <div class="merc-name">{{ c.name }} <span class="merc-prof">· Lv {{ c.level }} · {{ c.profession }}</span></div>
            <div class="merc-stats">HP {{ c.hp }}/{{ c.hpMax }} · AP {{ c.apMax }} · 攻 {{ c.attrs.atk }} · 防 {{ c.attrs.def }}</div>
          </div>
          <button class="mini" :class="{ active: activeCompanionIds().includes(c.id) }" @click="toggleCompanionActive(c.id)">
            {{ activeCompanionIds().includes(c.id) ? '上阵中' : '休息中' }}
          </button>
        </div>
        <div class="back"><button @click="view = 'main'">← 返回</button></div>
      </div>

      <div v-else-if="view === 'dragon_arts'" class="sub-view">
        <h2 class="place-name">龙术挂配</h2>
        <p class="place-desc">当前挂配槽 {{ player.activeDragonArts.length }}/{{ player.dragonArtsSlots }} · 战斗中攒满龙意可释放已挂配的龙术</p>
        <div v-if="!unlockedDragonArtsList.length" class="empty-hint">尚未觉醒任何龙术</div>
        <div v-for="art in unlockedDragonArtsList" :key="art.id" class="row wide">
          <div class="art-symbol" v-html="getSprite('dragon_symbol')"></div>
          <div class="art-info">
            <div class="art-name">{{ art.name }}</div>
            <div class="art-desc">{{ art.description }}</div>
          </div>
          <button class="mini" :class="{ active: isActiveDragonArt(art.id) }" @click="toggleDragonArt(art.id)">
            {{ isActiveDragonArt(art.id) ? '已挂配' : '挂配' }}
          </button>
        </div>
        <div class="back"><button @click="view = 'main'">← 返回</button></div>
      </div>
    </main>

    <div class="toast" v-if="toast">{{ toast }}</div>
  </div>
</template>

<style scoped>
.town { height: 100vh; background: #f4efe6; color: #1a1612; font-family: 'Georgia', 'STSong', 'SimSun', serif; display: flex; flex-direction: column; }
.hud { display: flex; gap: 2rem; padding: 0.8rem 1.5rem; border-bottom: 1.5px solid #1a1612; background: rgba(26,22,18,0.04); }
.hud-item { display: flex; flex-direction: column; font-size: 0.85rem; }
.hud-label { font-size: 0.7rem; opacity: 0.55; letter-spacing: 0.15em; margin-bottom: 0.15rem; }
.hud-value { font-weight: 500; }
.scene { flex: 1; padding: 2rem 3rem; overflow-y: auto; }
.place-name { font-size: 2rem; letter-spacing: 0.4em; padding-left: 0.4em; margin: 0.5rem 0 0.5rem 0; font-weight: 300; }
.place-desc { font-size: 0.95rem; opacity: 0.7; margin-bottom: 1.5rem; font-style: italic; }
.actions { display: flex; flex-direction: column; gap: 0.8rem; max-width: 340px; }
.actions button { font-family: inherit; font-size: 1rem; padding: 0.55rem 1.2rem; border: 1.5px solid #1a1612; background: transparent; color: #1a1612; cursor: pointer; letter-spacing: 0.2em; border-radius: 2px; text-align: left; }
.actions button:hover { background: #1a1612; color: #f4efe6; }
.actions button.primary { border-color: #7a3b2e; color: #7a3b2e; border-width: 2px; font-weight: 500; }
.actions button.primary:hover { background: #7a3b2e; color: #f4efe6; }
.actions button.secondary { font-size: 0.85rem; opacity: 0.7; }

.sub-view h3 { font-size: 1rem; letter-spacing: 0.2em; margin-bottom: 0.8rem; font-weight: 400; border-bottom: 1px solid #1a1612; padding-bottom: 0.3rem; }
.inv-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1rem; }
.row { display: grid; grid-template-columns: 5rem 1fr auto auto; gap: 0.6rem; padding: 0.4rem 0; font-size: 0.9rem; align-items: center; border-bottom: 1px dashed rgba(26,22,18,0.15); }
.row.wide { grid-template-columns: 3rem 4rem 1fr 1fr auto auto; }
.slot-name, .source-tag, .quality-tag { opacity: 0.6; font-size: 0.78rem; letter-spacing: 0.1em; }
.item-name { font-weight: 500; }
.item-name.empty { font-style: italic; opacity: 0.4; }
.item-bonus { font-size: 0.78rem; opacity: 0.7; }

.merc-sprite, .art-symbol { height: 44px; display: flex; align-items: center; justify-content: center; }
.merc-sprite :deep(svg), .art-symbol :deep(svg) { height: 100%; width: auto; max-width: 60px; }
.merc-info, .art-info { display: flex; flex-direction: column; gap: 0.15rem; }
.merc-name { font-weight: 500; font-size: 0.95rem; }
.merc-prof { opacity: 0.5; font-size: 0.8rem; }
.merc-stats { opacity: 0.75; font-size: 0.78rem; }
.merc-skills { opacity: 0.55; font-size: 0.75rem; font-style: italic; }
.art-name { font-weight: 500; }
.art-desc { opacity: 0.7; font-size: 0.82rem; }

.empty-hint { opacity: 0.4; font-style: italic; font-size: 0.9rem; padding: 1rem 0; }
.mini { font-family: inherit; font-size: 0.78rem; padding: 0.25rem 0.7rem; border: 1px solid #1a1612; background: transparent; color: #1a1612; cursor: pointer; border-radius: 2px; letter-spacing: 0.1em; }
.mini:hover:not(:disabled) { background: #1a1612; color: #f4efe6; }
.mini:disabled { opacity: 0.35; cursor: not-allowed; }
.mini.active { background: #7a3b2e; color: #f4efe6; border-color: #7a3b2e; }
.back { margin-top: 2rem; }
.back button { font-family: inherit; font-size: 0.9rem; padding: 0.4rem 1rem; border: 1.5px solid #1a1612; background: transparent; color: #1a1612; cursor: pointer; }

.toast { position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); background: rgba(26,22,18,0.92); color: #ebe4d5; padding: 0.6rem 1.8rem; border-radius: 3px; font-size: 0.9rem; letter-spacing: 0.15em; z-index: 200; }
</style>
