<script setup>
import { ref } from 'vue'
import MainMenu from './components/MainMenu.vue'
import Town from './components/Town.vue'
import Dungeon from './components/Dungeon.vue'
import Combat from './components/Combat.vue'
import CutScene from './components/CutScene.vue'
import { enterDungeon, dungeon, exitDungeon } from './stores/dungeon'
import { player, restorePlayer, unlockDragonArt, setDragonArtsSlots } from './stores/player'
import { quest, setFlag, getFlag } from './stores/quest'
import { party, createCompanion, recruitCompanion, restoreCompanions } from './stores/party'
import { saveGame } from './stores/save'
import { prologueSlides, firstAwakeningSlides, secondAwakeningSlides, finalAwakeningSlides, endOfChapter1Slides } from './game/scenes'
import { battle, applyRewardsAndSync, syncOnDefeat, endBattle } from './game/combat-engine'

const scene = ref('main-menu')
const pendingPostCombatScene = ref(null)

function goto(s) { scene.value = s }

function onNewGame() { goto('prologue') }
function onContinue() { goto('town') }
function onImported() { goto('town') }

function onPrologueDone() {
  if (!getFlag('prologueDone')) {
    setFlag('prologueDone', true)
    if (party.recruited.length === 0) {
      const companion = createCompanion({
        id: 'first_companion',
        name: '同伴',
        profession: 'swordsman',
        hpMax: 60,
        apMax: 4,
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

function onStartCombat() {
  if (battle.meta.firstAwakening && !getFlag('firstAwakening')) pendingPostCombatScene.value = 'firstAwakening'
  else if (battle.meta.secondAwakening && !getFlag('secondAwakening')) pendingPostCombatScene.value = 'secondAwakening'
  else if (battle.meta.finalAwakening && !getFlag('finalAwakening')) pendingPostCombatScene.value = 'finalAwakening'
  goto('combat')
}

function onCombatFinished(result) {
  if (result === 'victory') {
    const currentRoom = dungeon.floorRooms[battle.meta.roomIdx]
    if (currentRoom) currentRoom.cleared = true
    applyRewardsAndSync()
    endBattle()

    const pending = pendingPostCombatScene.value
    pendingPostCombatScene.value = null

    if (pending === 'firstAwakening' && !getFlag('firstAwakening')) {
      setFlag('firstAwakening', true)
      player.flags.firstAwakening = true
      unlockDragonArt('primal_flame')
      saveGame()
      goto('awakening_1')
      return
    }
    if (pending === 'secondAwakening' && !getFlag('secondAwakening')) {
      setFlag('secondAwakening', true)
      player.flags.secondAwakening = true
      unlockDragonArt('dragon_scale')
      unlockDragonArt('dragon_eye')
      setDragonArtsSlots(2)
      saveGame()
      goto('awakening_2')
      return
    }
    if (pending === 'finalAwakening' && !getFlag('finalAwakening')) {
      setFlag('finalAwakening', true)
      player.flags.finalAwakening = true
      unlockDragonArt('dragon_wing')
      unlockDragonArt('dragon_roar')
      setDragonArtsSlots(3)
      saveGame()
      goto('awakening_3')
      return
    }
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

function onAwakening1Done() {
  saveGame()
  goto('dungeon')
}

function onAwakening2Done() {
  saveGame()
  goto('dungeon')
}

function onAwakening3Done() {
  saveGame()
  goto('chapter1-end')
}

function onChapter1EndDone() {
  exitDungeon()
  saveGame()
  goto('town')
}

function onExitDungeon() { goto('town') }
</script>

<template>
  <MainMenu v-if="scene === 'main-menu'"
    @start-new="onNewGame" @continue="onContinue" @imported="onImported" />
  <CutScene v-else-if="scene === 'prologue'" :slides="prologueSlides" title="寻妻之旅" @done="onPrologueDone" />
  <Town v-else-if="scene === 'town'" @enter-dungeon="onEnterDungeon" @back-to-menu="goto('main-menu')" />
  <Dungeon v-else-if="scene === 'dungeon'" @start-combat="onStartCombat" @exit-dungeon="onExitDungeon" />
  <Combat v-else-if="scene === 'combat'" @finished="onCombatFinished" />
  <CutScene v-else-if="scene === 'awakening_1'" :slides="firstAwakeningSlides" title="血脉觉醒 · 一" @done="onAwakening1Done" />
  <CutScene v-else-if="scene === 'awakening_2'" :slides="secondAwakeningSlides" title="血脉觉醒 · 二" @done="onAwakening2Done" />
  <CutScene v-else-if="scene === 'awakening_3'" :slides="finalAwakeningSlides" title="血脉觉醒 · 终" @done="onAwakening3Done" />
  <CutScene v-else-if="scene === 'chapter1-end'" :slides="endOfChapter1Slides" title="第一章 完" @done="onChapter1EndDone" />
</template>

<style>
html, body, #app { margin: 0; padding: 0; height: 100vh; overflow: hidden; }
body { background: #f4efe6; color: #1a1612; font-family: 'Georgia', 'STSong', 'SimSun', serif; }
* { box-sizing: border-box; }
</style>
