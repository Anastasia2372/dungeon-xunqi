import { reactive } from 'vue'

const defaultQuest = () => ({
  main: {
    stage: 0,
    completedStages: []
  },
  side: {},
  flags: {}
})

export const quest = reactive(defaultQuest())

export function resetQuest(overrides = {}) {
  Object.assign(quest, defaultQuest(), overrides)
}

export function advanceMainStage() {
  quest.main.completedStages.push(quest.main.stage)
  quest.main.stage += 1
}

export function setFlag(key, value = true) {
  quest.flags[key] = value
}

export function getFlag(key) {
  return !!quest.flags[key]
}

export function isMainStageAtLeast(n) {
  return quest.main.stage >= n
}
