import { reactive } from 'vue'

const defaultInventory = () => ({
  items: [],
  gold: 0
})

export const inventory = reactive(defaultInventory())

export function resetInventory(overrides = {}) {
  Object.assign(inventory, defaultInventory(), overrides)
}

export function addItem(item, count = 1) {
  if (item.stackable) {
    const existing = inventory.items.find(x => x.defId === item.defId)
    if (existing) {
      existing.count += count
      return
    }
  }
  inventory.items.push({ ...item, count })
}

export function removeItem(uid, count = 1) {
  const idx = inventory.items.findIndex(x => x.uid === uid)
  if (idx < 0) return false
  const it = inventory.items[idx]
  if (it.stackable && it.count > count) {
    it.count -= count
  } else {
    inventory.items.splice(idx, 1)
  }
  return true
}

export function addGold(amount) {
  inventory.gold += amount
}

export function spendGold(amount) {
  if (inventory.gold < amount) return false
  inventory.gold -= amount
  return true
}

export function findItem(uid) {
  return inventory.items.find(x => x.uid === uid)
}
