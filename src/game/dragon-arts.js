export const dragonArts = {
  primal_flame: {
    id: 'primal_flame',
    name: '血脉初焰',
    tbd: true,
    description: '龙血觉醒后的第一式,战场焚燃,敌我皆惊',
    apCost: 1,
    dragonMeterCost: 100,
    targetType: 'all_enemies',
    effect: {
      damage: { base: 40, atkScale: 2.0 },
      accuracy: 100,
      dot: { name: 'burn', damage: 8, duration: 2 }
    },
    unlockFlag: 'firstAwakening',
    lore: '当封印第一次松动,主角眼中窜出一线金焰'
  },
  dragon_scale: {
    id: 'dragon_scale',
    name: '龙鳞屏障',
    tbd: true,
    description: '皮下浮起龙鳞,承伤大减 3 回合',
    apCost: 1,
    dragonMeterCost: 100,
    targetType: 'self',
    effect: {
      status: { name: 'dragon_scale', duration: 3, defMultiplier: 3.0 }
    },
    unlockFlag: 'secondAwakening',
    lore: '骨头里那东西第一次给你答复 · 它不想被解开'
  },
  dragon_eye: {
    id: 'dragon_eye',
    name: '龙目洞察',
    tbd: true,
    description: '龙目开启,战场全体敌方闪避降为零 3 回合,己方暴击率翻倍',
    apCost: 1,
    dragonMeterCost: 100,
    targetType: 'all_enemies',
    effect: {
      status: { name: 'dragon_gaze', duration: 3, dodgeReset: true },
      accuracy: 100
    },
    unlockFlag: 'secondAwakening',
    lore: '刹那间你看清了几何'
  },
  dragon_wing: {
    id: 'dragon_wing',
    name: '龙翼疾风',
    tbd: true,
    description: '龙翼展开,主角可无视 AP 移动到任意位 + 一次追加射击',
    apCost: 1,
    dragonMeterCost: 100,
    targetType: 'self_and_enemy',
    effect: {
      teleportAny: true,
      followUp: { damage: { base: 30, atkScale: 1.5 }, accuracy: 100 }
    },
    unlockFlag: 'finalAwakening',
    lore: '你不像自己了 · 也像了'
  },
  dragon_roar: {
    id: 'dragon_roar',
    name: '龙威震慑',
    tbd: true,
    description: '一声龙吼,全体敌方定身 1 回合 + 承伤易伤 1 回合',
    apCost: 1,
    dragonMeterCost: 100,
    targetType: 'all_enemies',
    effect: {
      damage: { base: 15, atkScale: 0.8 },
      accuracy: 100,
      status: { name: 'stunned', duration: 1, defMultiplier: 0.5 }
    },
    unlockFlag: 'finalAwakening',
    lore: '契约的最后一层薄纸'
  }
}

export function getDragonArt(id) {
  return dragonArts[id]
}

export function unlockedDragonArts(flags) {
  return Object.values(dragonArts).filter(art => !art.unlockFlag || flags[art.unlockFlag])
}
