<script setup>
import { computed } from 'vue'
import { hasSave, loadGame, newGame, importSaveJson } from '../stores/save'

const emit = defineEmits(['start-new', 'continue', 'imported'])

const hasSaveFile = computed(() => hasSave())

function onNewGame() {
  newGame()
  emit('start-new')
}

function onContinue() {
  if (loadGame()) emit('continue')
}

function onImport() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'application/json,.json'
  input.onchange = () => {
    const file = input.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (importSaveJson(reader.result)) emit('imported')
      else alert('导入失败: 存档不兼容或损坏')
    }
    reader.readAsText(file)
  }
  input.click()
}
</script>

<template>
  <div class="menu">
    <div class="frame">
      <h1 class="title">寻妻之旅</h1>
      <p class="subtitle">地下城</p>
      <div class="btn-list">
        <button @click="onNewGame">新游戏</button>
        <button :disabled="!hasSaveFile" @click="onContinue">继续</button>
        <button @click="onImport">导入存档</button>
      </div>
      <p class="hint">占位版本 · 名字与文案陆续替换</p>
    </div>
  </div>
</template>

<style scoped>
.menu {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4efe6;
  color: #1a1612;
  font-family: 'Georgia', 'STSong', 'SimSun', serif;
}

.frame {
  text-align: center;
  padding: 3rem 4rem;
}

.title {
  font-size: 4.5rem;
  letter-spacing: 0.4em;
  margin: 0;
  font-weight: 300;
  padding-left: 0.4em;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.4;
  letter-spacing: 0.4em;
  padding-left: 0.4em;
  margin: 0.5rem 0 3.5rem 0;
}

.btn-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.btn-list button {
  font-family: inherit;
  font-size: 1.05rem;
  padding: 0.55rem 3.5rem;
  border: 1.5px solid #1a1612;
  background: transparent;
  color: #1a1612;
  cursor: pointer;
  letter-spacing: 0.25em;
  border-radius: 2px;
  min-width: 220px;
}

.btn-list button:hover:not(:disabled) {
  background: #1a1612;
  color: #f4efe6;
}

.btn-list button:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.hint {
  margin-top: 2rem;
  font-size: 0.72rem;
  opacity: 0.35;
  letter-spacing: 0.15em;
}
</style>
