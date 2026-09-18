<script setup>
import { computed } from 'vue'
import {
  battle,
  currentActor,
  setCurrentActor,
  skillIsUsable,
  selectSkill,
  cancelSkillSelection,
  selectTarget,
  moveActor,
  defendAction,
  releaseDragonArt,
  canReleaseDragonArt,
  endTurn,
  endBattle,
  applyRewardsAndSync,
  syncOnDefeat
} from '../game/combat-engine'
import { getSkill } from '../game/skills'
import { getDragonArt } from '../game/dragon-arts'
import { itemDisplayName } from '../game/loot'
import { getSprite, unitSpriteId } from '../assets/sprites'

const emit = defineEmits(['finished'])

const actor = computed(() => currentActor())
const dragonReady = computed(() => canReleaseDragonArt())

function isActorAt(pos) {
  const a = actor.value
  return a && a.side === 'ally' && a.position === pos
}

function alliesAt(pos) {
  return battle.allies.filter(u => u.position === pos && u.isAlive)
}

function enemiesAt(pos) {
  return battle.enemies.filter(u => u.position === pos && u.isAlive)
}

function canTargetEnemyAt(pos) {
  if (!battle.waitingForTarget) return false
  const s = getSkill(battle.pendingSkill)
  if (!s) return false
  return s.targetPositions?.includes(pos)
}

function skillUsable(skillId) {
  const a = actor.value
  if (!a) return false
  return skillIsUsable(a, skillId)
}

function skillName(skillId) {
  return getSkill(skillId)?.name || skillId
}

function skillAp(skillId) {
  return getSkill(skillId)?.apCost || 0
}

function skillDesc(skillId) {
  return getSkill(skillId)?.description || ''
}

function activeDragonArtName() {
  const p = battle.allies.find(u => u.isPlayer)
  if (!p?.activeDragonArt) return ''
  return getDragonArt(p.activeDragonArt)?.name || ''
}

function onSkillClick(skillId) {
  selectSkill(skillId)
}

function onCancelSkill() {
  cancelSkillSelection()
}

function onUnitClick(unit) {
  if (unit.side === 'ally' && !battle.waitingForTarget) {
    setCurrentActor(unit.instanceId)
    return
  }
  if (unit.side === 'enemy' && battle.waitingForTarget) {
    selectTarget(unit.instanceId)
    return
  }
}

function onSelfSlotClick(pos) {
  const allies = alliesAt(pos)
  if (allies.length) onUnitClick(allies[0])
}

function tryMove(direction) {
  const a = actor.value
  if (!a) return
  const dir = a.side === 'ally' ? -direction : direction
  moveActor(dir)
}

function tryDefend() {
  defendAction()
}

function onDragonClick() {
  releaseDragonArt()
}

function onEndTurn() {
  endTurn()
}

function itemLabel(it) {
  return itemDisplayName(it)
}

function onCloseResult() {
  if (battle.result === 'victory') {
    applyRewardsAndSync()
  } else {
    syncOnDefeat()
  }
  const result = battle.result
  endBattle()
  emit('finished', result)
}

function statusList(unit) {
  return unit.statuses.map(s => s.name).join(' · ')
}
</script>

<template>
  <div class="combat">
    <div class="side-header">敌方 (回合 {{ battle.turnNumber }} · {{ battle.turn === 'ally' ? '你的回合' : '敌方回合' }})</div>
    <div class="track track-enemy">
      <div v-for="pos in [1, 2, 3, 4]" :key="'e' + pos" class="slot"
           :class="{ 'targetable': canTargetEnemyAt(pos) }">
        <div v-for="e in enemiesAt(pos)" :key="e.instanceId" class="unit unit-enemy"
             :class="{ dead: !e.isAlive }" @click="onUnitClick(e)">
          <div class="unit-sprite" v-html="getSprite(unitSpriteId(e))"></div>
          <div class="unit-name">{{ e.name }}</div>
          <div class="unit-hp">
            <div class="hp-bar"><div class="hp-fill" :style="{ width: (e.hp / e.hpMax * 100) + '%' }"></div></div>
            <span class="hp-text">{{ e.hp }}/{{ e.hpMax }}</span>
          </div>
          <div class="unit-status" v-if="e.statuses.length">{{ statusList(e) }}</div>
        </div>
        <div class="slot-pos">{{ pos }}位</div>
      </div>
    </div>

    <div class="log">
      <div class="log-line" v-for="(l, i) in battle.log.slice(-6)" :key="i">
        <span class="log-turn">[{{ l.turn }}]</span> {{ l.text }}
      </div>
    </div>

    <div class="track track-ally">
      <div v-for="pos in [4, 3, 2, 1]" :key="'a' + pos" class="slot"
           :class="{ 'current-slot': isActorAt(pos) }" @click="onSelfSlotClick(pos)">
        <div v-for="a in alliesAt(pos)" :key="a.instanceId" class="unit unit-ally"
             :class="{ current: actor && actor.instanceId === a.instanceId, dead: !a.isAlive }"
             @click.stop="onUnitClick(a)">
          <div class="unit-sprite" v-html="getSprite(unitSpriteId(a))"></div>
          <div class="unit-name">{{ a.name }}</div>
          <div class="unit-hp">
            <div class="hp-bar"><div class="hp-fill" :style="{ width: (a.hp / a.hpMax * 100) + '%' }"></div></div>
            <span class="hp-text">{{ a.hp }}/{{ a.hpMax }}</span>
          </div>
          <div class="unit-ap">AP {{ a.ap }}/{{ a.apMax }}</div>
          <div class="unit-dragon" v-if="a.isPlayer">
            <div class="dragon-bar"><div class="dragon-fill" :style="{ width: (a.dragonMeter / a.dragonMeterMax * 100) + '%' }"></div></div>
            <span class="dragon-text">龙意 {{ a.dragonMeter }}/{{ a.dragonMeterMax }}</span>
          </div>
          <div class="unit-status" v-if="a.statuses.length">{{ statusList(a) }}</div>
        </div>
        <div class="slot-pos">{{ pos }}位</div>
      </div>
    </div>
    <div class="side-header">己方</div>

    <div class="action-bar" v-if="battle.turn === 'ally' && !battle.ended && actor">
      <div class="current-info">
        <span class="c-name">{{ actor.name }}</span>
        <span>HP {{ actor.hp }}/{{ actor.hpMax }}</span>
        <span>AP {{ actor.ap }}/{{ actor.apMax }}</span>
        <span class="c-pos">{{ actor.position }}位</span>
      </div>
      <div class="actions" v-if="!battle.waitingForTarget">
        <button v-for="skillId in actor.skills" :key="skillId"
                :disabled="!skillUsable(skillId)"
                :title="skillDesc(skillId)"
                @click="onSkillClick(skillId)">
          {{ skillName(skillId) }} · {{ skillAp(skillId) }}
        </button>
        <button @click="tryMove(-1)" :disabled="actor.ap < 1">前移·1</button>
        <button @click="tryMove(1)" :disabled="actor.ap < 1">后退·1</button>
        <button @click="tryDefend" :disabled="actor.ap < 1">防御·1</button>
        <button v-if="actor.isPlayer && dragonReady" class="dragon-btn" @click="onDragonClick">
          发动【{{ activeDragonArtName() }}】
        </button>
        <button class="end-turn" @click="onEndTurn">结束回合</button>
      </div>
      <div class="target-hint" v-else>
        <span>选择目标 (点击对面 {{ getSkill(battle.pendingSkill)?.targetPositions?.join('/') }} 位)</span>
        <button @click="onCancelSkill">取消</button>
      </div>
    </div>
    <div class="waiting" v-else-if="battle.turn === 'enemy' && !battle.ended">
      敌方回合...
    </div>

    <div class="result-overlay" v-if="battle.ended">
      <div class="result-box" :class="battle.result">
        <h2 v-if="battle.result === 'victory'">胜</h2>
        <h2 v-else>败</h2>
        <div v-if="battle.result === 'victory' && battle.rewards" class="rewards">
          <div>经验 +{{ battle.rewards.exp }}</div>
          <div>金币 +{{ battle.rewards.gold }}</div>
          <div v-if="battle.rewards.items.length" class="loot-list">
            <div class="loot-title">战利品</div>
            <div v-for="(it, i) in battle.rewards.items" :key="i" class="loot-item">
              {{ itemLabel(it) }}
            </div>
          </div>
        </div>
        <div v-else class="defeat-hint">你受重伤,回到城镇休整</div>
        <button @click="onCloseResult">继续</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.combat {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f4efe6;
  color: #1a1612;
  padding: 0.6rem 1rem;
  font-family: 'Georgia', 'STSong', 'SimSun', serif;
  overflow: hidden;
}

.side-header {
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  opacity: 0.55;
  margin: 0.2rem 0;
}

.track {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.6rem;
  margin: 0.4rem 0;
}

.slot {
  min-height: 110px;
  border: 1.5px solid #1a1612;
  border-radius: 4px;
  padding: 0.4rem;
  position: relative;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  cursor: default;
}

.slot.targetable {
  border-color: #a03a24;
  background: rgba(160, 58, 36, 0.08);
  cursor: crosshair;
}

.slot.current-slot {
  border-color: #3a5a9a;
  background: rgba(58, 90, 154, 0.08);
}

.slot-pos {
  position: absolute;
  bottom: 2px;
  right: 4px;
  font-size: 0.7rem;
  opacity: 0.4;
}

.unit {
  flex: 1;
  padding: 0.3rem;
  cursor: pointer;
  font-size: 0.9rem;
}

.unit.dead {
  opacity: 0.25;
  text-decoration: line-through;
  cursor: default;
}

.unit.current {
  outline: 2px solid #3a5a9a;
  outline-offset: 2px;
}

.unit-sprite {
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem;
}

.unit-sprite :deep(svg) {
  height: 100%;
  width: auto;
  max-width: 56px;
}

.unit-name {
  font-weight: 500;
  margin-bottom: 0.2rem;
  font-size: 0.85rem;
}

.unit-hp, .unit-dragon {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  margin: 0.1rem 0;
}

.hp-bar, .dragon-bar {
  flex: 1;
  height: 8px;
  border: 1px solid #1a1612;
  background: rgba(255,255,255,0.5);
  overflow: hidden;
}

.hp-fill {
  height: 100%;
  background: #7a3b2e;
  transition: width 0.3s;
}

.dragon-fill {
  height: 100%;
  background: linear-gradient(90deg, #b58a2d, #d0a850);
  transition: width 0.3s;
}

.hp-text, .dragon-text {
  font-size: 0.7rem;
  opacity: 0.75;
  min-width: 55px;
  text-align: right;
}

.unit-ap {
  font-size: 0.75rem;
  opacity: 0.7;
}

.unit-status {
  font-size: 0.7rem;
  color: #7a3b2e;
  margin-top: 0.15rem;
}

.log {
  border: 1px solid #1a1612;
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
  margin: 0.4rem 0;
  height: 90px;
  overflow-y: auto;
  background: rgba(255,255,255,0.4);
  font-size: 0.82rem;
}

.log-line {
  margin: 0.15rem 0;
}

.log-turn {
  opacity: 0.5;
  margin-right: 0.4rem;
}

.action-bar {
  margin-top: auto;
  padding: 0.5rem 0.4rem;
  border-top: 1.5px solid #1a1612;
}

.current-info {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.4rem;
  font-size: 0.85rem;
  opacity: 0.85;
}

.c-name {
  font-weight: 500;
  color: #3a5a9a;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

button {
  font-family: inherit;
  font-size: 0.85rem;
  padding: 0.35rem 0.7rem;
  border: 1.5px solid #1a1612;
  background: transparent;
  color: #1a1612;
  cursor: pointer;
  border-radius: 2px;
}

button:hover:not(:disabled) {
  background: #1a1612;
  color: #f4efe6;
}

button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.dragon-btn {
  border-color: #b58a2d;
  color: #b58a2d;
  font-weight: 600;
}

.dragon-btn:hover:not(:disabled) {
  background: #b58a2d;
  color: #f4efe6;
}

.end-turn {
  margin-left: auto;
}

.target-hint {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 0.9rem;
  color: #a03a24;
}

.waiting {
  padding: 0.5rem;
  border-top: 1.5px solid #1a1612;
  text-align: center;
  opacity: 0.6;
  font-size: 0.9rem;
}

.result-overlay {
  position: fixed;
  inset: 0;
  background: rgba(26, 22, 18, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.result-box {
  background: #f4efe6;
  border: 2px solid #1a1612;
  padding: 2rem 3rem;
  min-width: 300px;
  text-align: center;
}

.result-box h2 {
  font-size: 4rem;
  margin: 0 0 1rem 0;
  letter-spacing: 0.5em;
  font-weight: 300;
}

.result-box.victory h2 { color: #3a5a9a; }
.result-box.defeat h2 { color: #7a3b2e; }

.rewards > div {
  margin: 0.3rem 0;
}

.loot-list {
  margin-top: 0.8rem;
  border-top: 1px solid #1a1612;
  padding-top: 0.6rem;
}

.loot-title {
  font-size: 0.85rem;
  opacity: 0.6;
  margin-bottom: 0.3rem;
}

.loot-item {
  font-size: 0.9rem;
  margin: 0.15rem 0;
}

.defeat-hint {
  font-size: 0.9rem;
  opacity: 0.7;
  margin: 0.8rem 0;
}

.result-box button {
  margin-top: 1rem;
  font-size: 1rem;
  padding: 0.5rem 1.5rem;
}
</style>
