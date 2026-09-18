<script setup>
import { ref } from 'vue'

const props = defineProps({
  slides: { type: Array, required: true },
  title: { type: String, default: '' }
})

const emit = defineEmits(['done'])

const idx = ref(0)

function next() {
  if (idx.value < props.slides.length - 1) {
    idx.value += 1
  } else {
    emit('done')
  }
}

function skip() {
  emit('done')
}
</script>

<template>
  <div class="cutscene" @click="next">
    <div class="content">
      <h2 v-if="title && idx === 0" class="title">{{ title }}</h2>
      <p class="slide-text">{{ slides[idx] }}</p>
      <div class="progress">
        <span v-for="i in slides.length" :key="i"
              class="dot" :class="{ done: i - 1 <= idx }"></span>
      </div>
      <div class="hint">
        <span>{{ idx < slides.length - 1 ? '轻按继续' : '轻按结束' }}</span>
        <button class="skip" v-if="idx < slides.length - 1" @click.stop="skip">跳过</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cutscene {
  height: 100vh;
  background: #1a1612;
  color: #ebe4d5;
  font-family: 'Georgia', 'STSong', 'SimSun', serif;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 3rem;
}

.content {
  max-width: 640px;
  text-align: center;
}

.title {
  font-size: 2rem;
  letter-spacing: 0.4em;
  padding-left: 0.4em;
  font-weight: 300;
  margin: 0 0 3rem 0;
  opacity: 0.7;
}

.slide-text {
  font-size: 1.3rem;
  line-height: 2.2;
  letter-spacing: 0.08em;
  margin: 0 0 3rem 0;
  animation: fade 0.6s ease-out;
}

@keyframes fade {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.progress {
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid #ebe4d5;
}

.dot.done {
  background: #ebe4d5;
}

.hint {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.8rem;
  opacity: 0.5;
  letter-spacing: 0.2em;
}

.skip {
  font-family: inherit;
  font-size: 0.75rem;
  padding: 0.25rem 0.8rem;
  border: 1px solid rgba(235, 228, 213, 0.4);
  background: transparent;
  color: #ebe4d5;
  cursor: pointer;
  letter-spacing: 0.15em;
  border-radius: 2px;
  opacity: 0.7;
}

.skip:hover {
  opacity: 1;
  border-color: #ebe4d5;
}
</style>
