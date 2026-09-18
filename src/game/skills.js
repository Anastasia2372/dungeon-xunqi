export const skills = {
  aimed_shot: {
    id: 'aimed_shot',
    name: '精准射击',
    description: '锁定一敌深射,消耗 2 AP,伤害高,暴击率提升',
    apCost: 2,
    userPositions: [3, 4],
    targetType: 'enemy',
    targetPositions: [1, 2, 3, 4],
    effect: {
      damage: { base: 15, atkScale: 1.5 },
      accuracy: 90,
      critBonus: 20
    },
    dragonGain: 6
  },
  quick_shot: {
    id: 'quick_shot',
    name: '快速射击',
    description: '快速一箭,消耗 1 AP,伤害稳但低',
    apCost: 1,
    userPositions: [2, 3, 4],
    targetType: 'enemy',
    targetPositions: [1, 2, 3, 4],
    effect: {
      damage: { base: 8, atkScale: 1.0 },
      accuracy: 95
    },
    dragonGain: 3
  },
  set_trap: {
    id: 'set_trap',
    name: '设置陷阱',
    description: '在敌方一格放陷阱,踩到者受伤 + 短暂僵直',
    apCost: 2,
    userPositions: [1, 2, 3, 4],
    targetType: 'ground_enemy',
    targetPositions: [1, 2, 3, 4],
    effect: {
      trapDamage: { base: 12, atkScale: 0.8 },
      stunTurns: 1
    },
    dragonGain: 4
  },
  defend: {
    id: 'defend',
    name: '防御',
    description: '防御姿态,下回合承伤减半',
    apCost: 1,
    userPositions: [1, 2, 3, 4],
    targetType: 'self',
    effect: {
      status: { name: 'defending', duration: 1, defMultiplier: 2.0 }
    },
    dragonGain: 2
  },
  melee_strike: {
    id: 'melee_strike',
    name: '近身斩击',
    description: '近战一击',
    apCost: 1,
    userPositions: [1, 2],
    targetType: 'enemy',
    targetPositions: [1, 2],
    effect: {
      damage: { base: 10, atkScale: 1.0 },
      accuracy: 85
    },
    dragonGain: 0
  },
  bite_dive: {
    id: 'bite_dive',
    name: '扑咬',
    description: '蝙蝠扑向一人',
    apCost: 1,
    userPositions: [1, 2, 3, 4],
    targetType: 'enemy',
    targetPositions: [1, 2, 3, 4],
    effect: {
      damage: { base: 5, atkScale: 1.0 },
      accuracy: 80
    }
  },
  bone_slash: {
    id: 'bone_slash',
    name: '骨刃',
    description: '骨剑挥砍',
    apCost: 1,
    userPositions: [1, 2],
    targetType: 'enemy',
    targetPositions: [1, 2],
    effect: {
      damage: { base: 9, atkScale: 1.0 },
      accuracy: 85
    }
  },
  bone_throw: {
    id: 'bone_throw',
    name: '掷骨',
    description: '骷髅掷出锐骨',
    apCost: 2,
    userPositions: [1, 2, 3, 4],
    targetType: 'enemy',
    targetPositions: [1, 2, 3, 4],
    effect: {
      damage: { base: 8, atkScale: 0.8 },
      accuracy: 75
    }
  },
  stone_smash: {
    id: 'stone_smash',
    name: '巨石重击',
    description: '石臂横扫,击退目标一格',
    apCost: 2,
    userPositions: [1, 2],
    targetType: 'enemy',
    targetPositions: [1, 2],
    effect: {
      damage: { base: 14, atkScale: 1.2 },
      accuracy: 80,
      knockback: 1
    }
  },
  stone_guard: {
    id: 'stone_guard',
    name: '石身',
    description: '化石戍守,承伤大减 2 回合',
    apCost: 1,
    userPositions: [1, 2, 3, 4],
    targetType: 'self',
    effect: {
      status: { name: 'stone_guard', duration: 2, defMultiplier: 3.0 }
    }
  },
  captain_cleave: {
    id: 'captain_cleave',
    name: '横斩',
    description: '兵长的横扫,对面 1-2 位同伤',
    apCost: 2,
    userPositions: [1, 2],
    targetType: 'enemy_row',
    targetPositions: [1, 2],
    effect: {
      damage: { base: 12, atkScale: 1.1 },
      accuracy: 85,
      aoePositions: [1, 2]
    }
  },
  captain_summon: {
    id: 'captain_summon',
    name: '召唤援兵',
    description: '召骷髅战士援手',
    apCost: 3,
    userPositions: [1, 2, 3, 4],
    targetType: 'summon',
    effect: {
      summonId: 'skeleton_warrior',
      maxAllies: 3
    }
  },
  captain_rage: {
    id: 'captain_rage',
    name: '狂怒',
    description: 'HP 过半后进入狂怒,伤害翻倍两回合',
    apCost: 1,
    userPositions: [1, 2, 3, 4],
    targetType: 'self',
    effect: {
      status: { name: 'rage', duration: 3, atkMultiplier: 1.8 }
    }
  }
}

export function getSkill(id) {
  return skills[id]
}

export function canUseSkill(skill, userPos, targetPos) {
  if (!skill) return false
  if (!skill.userPositions.includes(userPos)) return false
  if (skill.targetPositions && targetPos != null) {
    return skill.targetPositions.includes(targetPos)
  }
  return true
}
