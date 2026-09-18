<script setup>
import { ref, computed } from 'vue'
import MainMenu from './components/MainMenu.vue'
import Town from './components/Town.vue'
import Dungeon from './components/Dungeon.vue'
import Combat from './components/Combat.vue'
import CutScene from './components/CutScene.vue'
import { enterDungeon, dungeon, exitDungeon } from './stores/dungeon'
import { player, restorePlayer, gainDragonMeter } from './stores/player'
import { quest, setFlag, getFlag } from './stores/quest'
import { party, createCompanion, recruitCompanion, restoreCompanions } from './stores/party'
import { saveGame } from './stores/save'
import { prologueSlides, firstAwakeningSlides, endOfMvpSlides } from './game/scenes'
import { battle, applyRewardsAndSync, syncOnDefeat, endBattle } from './game/combat-engine'

const scene = ref('main-menu')
const pendingPostCombatScene = ref(null)

function goto(s) {
  scene.value = s
}

function onNewGame() {
  goto('prologue')
}

function onContinue() {
  goto('town')
}

function onImported() {
  goto('town')
}

function onPrologueDone() {
  if (!getFlag('prologueDone')) {
    setFlag('prologueDone', true)
    if (party.recruited.length === 0) {
      const companion = createCompanion({
        id: 'first_companion',
        name: '同伴',
        profession: 'swordsman',
        hpMax: 60,
        apMax: 3,
        position: 2,
        attrs: { atk: 12, def: 6, spd: 4, crit: 4, dodge: 4 },
        skills: ['melee_strike', 'defend']
      })
      recruitCompanion(companion)
    }
  }
  saveGame()
  goto('town')
}

function onEnterDungeon(id) {
  if (!dungeon.currentDungeonId) {
    enterDungeon(id, 1)
  } else if (dungeon.currentDungeonId !== id) {
    exitDungeon()
    enterDungeon(id, 1)
  }
  goto('dungeon')
}

function onStartCombat(room) {
  if (room?.type === 'boss' && battle.meta.firstAwakening && !getFlag('firstAwakening')) {
    pendingPostCombatScene.value = 'firstAwakening'
  }
  goto('combat')
}

function onCombatFinished(result) {
  if (result === 'victory') {
    const currentRoom = dungeon.floorRooms[battle.meta.roomIdx]
    if (currentRoom) currentRoom.cleared = true
    applyRewardsAndSync()
    endBattle()
    if (pendingPostCombatScene.value === 'firstAwakening' && !getFlag('firstAwakening')) {
      setFlag('firstAwakening', true)
      player.flags.firstAwakening = true
      player.dragonArts.push('primal_flame')
      if (!player.activeDragonArt) player.activeDragonArt = 'primal_flame'
      pendingPostCombatScene.value = null
      saveGame()
      goto('awakening')
      return
    }
    pendingPostCombatScene.value = null
    saveGame()
    goto('dungeon')
  } else {
    syncOnDefeat()
    endBattle()
    restorePlayer()
    restoreCompanions()
    player.hp = Math.max(1, Math.floor(player.hpMax * 0.4))
    pendingPostCombatScene.value = null
    saveGame()
    goto('town')
  }
}

function onAwakeningDone() {
  const floorDef = dungeon.floorRooms
  const isLastFloor = !dungeon.currentDungeonId
  saveGame()
  const currentFloor = dungeon.currentFloor
  const dungeonId = dungeon.currentDungeonId
  if (dungeonId && currentFloor >= 5) {
    goto('mvp-end')
  } else {
    goto('dungeon')
  }
}

function onMvpEndDone() {
  exitDungeon()
  saveGame()
  goto('town')
}

function onExitDungeon() {
  goto('town')
}
</script>

<template>
  <MainMenu v-if="scene === 'main-menu'"
    @start-new="onNewGame"
    @continue="onContinue"
    @imported="onImported" />

  <CutScene v-else-if="scene === 'prologue'"
    :slides="prologueSlides"
    title="寻妻之旅"
    @done="onPrologueDone" />

  <Town v-else-if="scene === 'town'"
    @enter-dungeon="onEnterDungeon"
    @back-to-menu="goto('main-menu')" />

  <Dungeon v-else-if="scene === 'dungeon'"
    @start-combat="onStartCombat"
    @exit-dungeon="onExitDungeon" />

  <Combat v-else-if="scene === 'combat'"
    @finished="onCombatFinished" />

  <CutScene v-else-if="scene === 'awakening'"
    :slides="firstAwakeningSlides"
    title="血脉觉醒"
    @done="onAwakeningDone" />

  <CutScene v-else-if="scene === 'mvp-end'"
    :slides="endOfMvpSlides"
    title="第一层结束"
    @done="onMvpEndDone" />
</template>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden;
}

body {
  background: #f4efe6;
  color: #1a1612;
  font-family: 'Georgia', 'STSong', 'SimSun', serif;
}

* {
  box-sizing: border-box;
}
</style>
