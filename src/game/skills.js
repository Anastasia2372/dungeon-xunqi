export const skills = {
  aimed_shot: {
    id: 'aimed_shot',
    name: '精准射击',
    description: '锁定一敌深射,消耗 2 AP,伤害高,暴击率提升',
    apCost: 2,
    userPositions: [3, 4],
    targetType: 'enemy',
    targetPositions: [1, 2, 3, 4],
    effect: { damage: { base: 15, atkScale: 1.5 }, accuracy: 90, critBonus: 20 },
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
    effect: { damage: { base: 8, atkScale: 1.0 }, accuracy: 95 },
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
    effect: { trapDamage: { base: 12, atkScale: 0.8 }, stunTurns: 1 },
    dragonGain: 4
  },
  defend: {
    id: 'defend',
    name: '防御',
    description: '防御姿态,下回合承伤减半',
    apCost: 1,
    userPositions: [1, 2, 3, 4],
    targetType: 'self',
    effect: { status: { name: 'defending', duration: 1, defMultiplier: 2.0 } },
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
    effect: { damage: { base: 10, atkScale: 1.0 }, accuracy: 85 },
    dragonGain: 0
  },
  bite_dive: {
    id: 'bite_dive',
    name: '扑咬',
    apCost: 1,
    userPositions: [1, 2, 3, 4],
    targetType: 'enemy',
    targetPositions: [1, 2, 3, 4],
    effect: { damage: { base: 5, atkScale: 1.0 }, accuracy: 80 }
  },
  bone_slash: {
    id: 'bone_slash',
    name: '骨刃',
    apCost: 1,
    userPositions: [1, 2],
    targetType: 'enemy',
    targetPositions: [1, 2],
    effect: { damage: { base: 9, atkScale: 1.0 }, accuracy: 85 }
  },
  bone_throw: {
    id: 'bone_throw',
    name: '掷骨',
    apCost: 2,
    userPositions: [1, 2, 3, 4],
    targetType: 'enemy',
    targetPositions: [1, 2, 3, 4],
    effect: { damage: { base: 8, atkScale: 0.8 }, accuracy: 75 }
  },
  stone_smash: {
    id: 'stone_smash',
    name: '巨石重击',
    apCost: 2,
    userPositions: [1, 2],
    targetType: 'enemy',
    targetPositions: [1, 2],
    effect: { damage: { base: 14, atkScale: 1.2 }, accuracy: 80, knockback: 1 }
  },
  stone_guard: {
    id: 'stone_guard',
    name: '石身',
    apCost: 1,
    userPositions: [1, 2, 3, 4],
    targetType: 'self',
    effect: { status: { name: 'stone_guard', duration: 2, defMultiplier: 3.0 } }
  },
  captain_cleave: {
    id: 'captain_cleave',
    name: '横斩',
    apCost: 2,
    userPositions: [1, 2],
    targetType: 'enemy_row',
    targetPositions: [1, 2],
    effect: { damage: { base: 12, atkScale: 1.1 }, accuracy: 85, aoePositions: [1, 2] }
  },
  captain_summon: {
    id: 'captain_summon',
    name: '召唤援兵',
    apCost: 3,
    userPositions: [1, 2, 3, 4],
    targetType: 'summon',
    effect: { summonId: 'skeleton_warrior', maxAllies: 3 }
  },
  captain_rage: {
    id: 'captain_rage',
    name: '狂怒',
    apCost: 1,
    userPositions: [1, 2, 3, 4],
    targetType: 'self',
    effect: { status: { name: 'rage', duration: 3, atkMultiplier: 1.8 } }
  },
  dual_slash: {
    id: 'dual_slash',
    name: '双刃斩',
    apCost: 2,
    userPositions: [1, 2],
    targetType: 'enemy',
    targetPositions: [1, 2],
    effect: { damage: { base: 11, atkScale: 1.2 }, accuracy: 85, hits: 2 }
  },
  wall_grab: {
    id: 'wall_grab',
    name: '拽墙',
    apCost: 2,
    userPositions: [3, 4],
    targetType: 'enemy',
    targetPositions: [1, 2, 3, 4],
    effect: { damage: { base: 8, atkScale: 0.9 }, accuracy: 80, knockback: -1 }
  },
  wall_stare: {
    id: 'wall_stare',
    name: '凝视',
    apCost: 1,
    userPositions: [3, 4],
    targetType: 'enemy',
    targetPositions: [1, 2, 3, 4],
    effect: { status: { name: 'petrified', duration: 1, defMultiplier: 0.7 } }
  },
  non_euclid_step: {
    id: 'non_euclid_step',
    name: '非欧步',
    apCost: 2,
    userPositions: [1, 2, 3, 4],
    targetType: 'enemy',
    targetPositions: [1, 2, 3, 4],
    effect: { damage: { base: 13, atkScale: 1.3 }, accuracy: 90, teleport: true }
  },
  shape_pierce: {
    id: 'shape_pierce',
    name: '形穿',
    apCost: 2,
    userPositions: [2, 3],
    targetType: 'enemy_row',
    targetPositions: [1, 2, 3, 4],
    effect: { damage: { base: 10, atkScale: 1.1 }, accuracy: 85, aoePositions: [1, 2, 3, 4] }
  },
  blind_charge: {
    id: 'blind_charge',
    name: '盲冲',
    apCost: 2,
    userPositions: [1, 2],
    targetType: 'enemy',
    targetPositions: [1, 2],
    effect: { damage: { base: 16, atkScale: 1.4 }, accuracy: 60, critBonus: 15 }
  },
  headless_strike: {
    id: 'headless_strike',
    name: '无首击',
    apCost: 1,
    userPositions: [1, 2],
    targetType: 'enemy',
    targetPositions: [1, 2],
    effect: { damage: { base: 12, atkScale: 1.1 }, accuracy: 80 }
  },
  warp_reality: {
    id: 'warp_reality',
    name: '扭曲现实',
    apCost: 3,
    userPositions: [1, 2, 3, 4],
    targetType: 'all_enemies',
    effect: { damage: { base: 12, atkScale: 1.0 }, accuracy: 95 }
  },
  morph_form: {
    id: 'morph_form',
    name: '化形',
    apCost: 2,
    userPositions: [1, 2, 3, 4],
    targetType: 'self',
    effect: { status: { name: 'morph', duration: 3, atkMultiplier: 1.4, defMultiplier: 1.4 } }
  },
  fire_bite: {
    id: 'fire_bite',
    name: '焰咬',
    apCost: 1,
    userPositions: [1, 2],
    targetType: 'enemy',
    targetPositions: [1, 2],
    effect: { damage: { base: 11, atkScale: 1.1 }, accuracy: 88, dot: { name: 'burn', damage: 4, duration: 2 } }
  },
  dragon_curse: {
    id: 'dragon_curse',
    name: '龙诅',
    apCost: 2,
    userPositions: [1, 2, 3, 4],
    targetType: 'enemy',
    targetPositions: [1, 2, 3, 4],
    effect: { damage: { base: 6, atkScale: 0.7 }, accuracy: 90, dot: { name: 'curse', damage: 7, duration: 3 } }
  },
  flame_breath: {
    id: 'flame_breath',
    name: '龙息吐焰',
    apCost: 2,
    userPositions: [2, 3, 4],
    targetType: 'enemy_row',
    targetPositions: [1, 2],
    effect: { damage: { base: 14, atkScale: 1.3 }, accuracy: 85, aoePositions: [1, 2] }
  },
  wing_swipe: {
    id: 'wing_swipe',
    name: '翼扫',
    apCost: 1,
    userPositions: [1, 2, 3, 4],
    targetType: 'enemy',
    targetPositions: [1, 2, 3, 4],
    effect: { damage: { base: 9, atkScale: 1.0 }, accuracy: 85, knockback: 1 }
  },
  bone_flame: {
    id: 'bone_flame',
    name: '骨焰',
    apCost: 2,
    userPositions: [3, 4],
    targetType: 'enemy',
    targetPositions: [1, 2, 3, 4],
    effect: { damage: { base: 13, atkScale: 1.2 }, accuracy: 90, dot: { name: 'burn', damage: 5, duration: 2 } }
  },
  soul_drain: {
    id: 'soul_drain',
    name: '摄魂',
    apCost: 2,
    userPositions: [1, 2, 3, 4],
    targetType: 'enemy',
    targetPositions: [1, 2, 3, 4],
    effect: { damage: { base: 10, atkScale: 1.1 }, accuracy: 85, lifeSteal: 0.5 }
  },
  scale_slam: {
    id: 'scale_slam',
    name: '鳞盾冲撞',
    apCost: 2,
    userPositions: [1, 2],
    targetType: 'enemy',
    targetPositions: [1, 2],
    effect: { damage: { base: 18, atkScale: 1.3 }, accuracy: 85, knockback: 2 }
  },
  scale_wall: {
    id: 'scale_wall',
    name: '鳞壁',
    apCost: 1,
    userPositions: [1, 2, 3, 4],
    targetType: 'self',
    effect: { status: { name: 'scale_wall', duration: 2, defMultiplier: 2.5 } }
  },
  dragon_wrath: {
    id: 'dragon_wrath',
    name: '龙怒',
    apCost: 3,
    userPositions: [1, 2, 3, 4],
    targetType: 'all_enemies',
    effect: { damage: { base: 22, atkScale: 1.4 }, accuracy: 95, dot: { name: 'burn', damage: 6, duration: 2 } }
  },
  summon_hatchling: {
    id: 'summon_hatchling',
    name: '召幼龙',
    apCost: 3,
    userPositions: [1, 2, 3, 4],
    targetType: 'summon',
    effect: { summonId: 'hatchling', maxAllies: 3 }
  },
  rebirth: {
    id: 'rebirth',
    name: '重生',
    apCost: 3,
    userPositions: [1, 2, 3, 4],
    targetType: 'self',
    effect: { heal: 80 }
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
