export const dragonArts = {
  primal_flame: {
    id: 'primal_flame',
    name: '血脉初焰',
    tbd: true,
    description: '龙血觉醒后的第一式。战场焚燃,敌我皆惊',
    apCost: 1,
    dragonMeterCost: 100,
    targetType: 'all_enemies',
    effect: {
      damage: { base: 40, atkScale: 2.0 },
      accuracy: 100,
      dot: { name: 'burn', damage: 8, duration: 2 }
    },
    unlockFlag: 'firstAwakening',
    lore: '(占位·朔拍名字与文案)当封印第一次松动,主角眼中窜出一线金焰。它烧焦了石殿,也灼过了主角的血脉'
  }
}

export function getDragonArt(id) {
  return dragonArts[id]
}

export function unlockedDragonArts(flags) {
  return Object.values(dragonArts).filter(art => !art.unlockFlag || flags[art.unlockFlag])
}
