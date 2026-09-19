export const enemies = {
  goblin_scout: {
    id: 'goblin_scout',
    name: '哥布林斥候',
    tier: 'common',
    hpMax: 22,
    apMax: 2,
    position: 2,
    attrs: { atk: 8, def: 2, spd: 6, crit: 3, dodge: 8 },
    skills: ['melee_strike'],
    expReward: 8,
    goldReward: [3, 8]
  },
  cave_bat: {
    id: 'cave_bat',
    name: '洞穴蝙蝠',
    tier: 'common',
    hpMax: 14,
    apMax: 3,
    position: 3,
    attrs: { atk: 6, def: 0, spd: 10, crit: 5, dodge: 15 },
    skills: ['bite_dive'],
    expReward: 5,
    goldReward: [1, 4]
  },
  skeleton_warrior: {
    id: 'skeleton_warrior',
    name: '骷髅战士',
    tier: 'common',
    hpMax: 32,
    apMax: 2,
    position: 1,
    attrs: { atk: 11, def: 5, spd: 4, crit: 5, dodge: 3 },
    skills: ['bone_slash', 'bone_throw'],
    expReward: 12,
    goldReward: [5, 12]
  },
  stone_sentinel: {
    id: 'stone_sentinel',
    name: '石像守卫',
    tier: 'elite',
    hpMax: 55,
    apMax: 2,
    position: 1,
    attrs: { atk: 14, def: 10, spd: 2, crit: 3, dodge: 0 },
    skills: ['stone_smash', 'stone_guard'],
    expReward: 22,
    goldReward: [10, 20]
  },
  ruined_captain: {
    id: 'ruined_captain',
    name: '遗迹兵长',
    tbd: true,
    tier: 'boss',
    hpMax: 120,
    apMax: 4,
    position: 2,
    attrs: { atk: 16, def: 8, spd: 6, crit: 8, dodge: 5 },
    skills: ['captain_cleave', 'captain_summon', 'bone_slash'],
    expReward: 60,
    goldReward: [40, 80]
  },
  warped_skeleton: {
    id: 'warped_skeleton',
    name: '多手骷髅',
    tbd: true,
    tier: 'common',
    hpMax: 44,
    apMax: 3,
    position: 1,
    attrs: { atk: 13, def: 5, spd: 6, crit: 7, dodge: 4 },
    skills: ['dual_slash', 'bone_slash'],
    expReward: 18,
    goldReward: [8, 16]
  },
  wall_dweller: {
    id: 'wall_dweller',
    name: '墙中之人',
    tbd: true,
    tier: 'common',
    hpMax: 38,
    apMax: 2,
    position: 4,
    attrs: { atk: 10, def: 8, spd: 3, crit: 4, dodge: 2 },
    skills: ['wall_grab', 'wall_stare'],
    expReward: 20,
    goldReward: [9, 18]
  },
  geometry_walker: {
    id: 'geometry_walker',
    name: '几何行者',
    tbd: true,
    tier: 'elite',
    hpMax: 60,
    apMax: 3,
    position: 3,
    attrs: { atk: 15, def: 6, spd: 9, crit: 10, dodge: 20 },
    skills: ['non_euclid_step', 'shape_pierce'],
    expReward: 30,
    goldReward: [15, 30]
  },
  headless_sentinel: {
    id: 'headless_sentinel',
    name: '无头守卫',
    tbd: true,
    tier: 'elite',
    hpMax: 80,
    apMax: 2,
    position: 1,
    attrs: { atk: 17, def: 12, spd: 3, crit: 5, dodge: 0 },
    skills: ['blind_charge', 'headless_strike'],
    expReward: 35,
    goldReward: [18, 35]
  },
  warped_lord: {
    id: 'warped_lord',
    name: '扭曲之主',
    tbd: true,
    tier: 'boss',
    hpMax: 200,
    apMax: 4,
    position: 2,
    attrs: { atk: 20, def: 10, spd: 7, crit: 10, dodge: 5 },
    skills: ['warp_reality', 'morph_form', 'shape_pierce', 'non_euclid_step'],
    expReward: 120,
    goldReward: [80, 160]
  },
  dragon_servant: {
    id: 'dragon_servant',
    name: '龙仆',
    tbd: true,
    tier: 'common',
    hpMax: 58,
    apMax: 3,
    position: 2,
    attrs: { atk: 16, def: 7, spd: 7, crit: 6, dodge: 5 },
    skills: ['fire_bite', 'dragon_curse'],
    expReward: 25,
    goldReward: [12, 24]
  },
  hatchling: {
    id: 'hatchling',
    name: '幼龙',
    tbd: true,
    tier: 'common',
    hpMax: 68,
    apMax: 3,
    position: 3,
    attrs: { atk: 18, def: 8, spd: 8, crit: 8, dodge: 8 },
    skills: ['flame_breath', 'wing_swipe'],
    expReward: 30,
    goldReward: [15, 30]
  },
  dragon_bone_wraith: {
    id: 'dragon_bone_wraith',
    name: '龙骨魂',
    tbd: true,
    tier: 'elite',
    hpMax: 90,
    apMax: 3,
    position: 4,
    attrs: { atk: 20, def: 6, spd: 6, crit: 12, dodge: 10 },
    skills: ['bone_flame', 'soul_drain'],
    expReward: 45,
    goldReward: [22, 45]
  },
  scale_guard: {
    id: 'scale_guard',
    name: '鳞卫',
    tbd: true,
    tier: 'elite',
    hpMax: 110,
    apMax: 3,
    position: 1,
    attrs: { atk: 22, def: 16, spd: 4, crit: 6, dodge: 2 },
    skills: ['scale_slam', 'scale_wall'],
    expReward: 50,
    goldReward: [25, 50]
  },
  elder_dragon_guardian: {
    id: 'elder_dragon_guardian',
    name: '上古守灵',
    tbd: true,
    tier: 'boss',
    hpMax: 320,
    apMax: 5,
    position: 2,
    attrs: { atk: 26, def: 14, spd: 8, crit: 14, dodge: 6 },
    skills: ['dragon_wrath', 'summon_hatchling', 'dragon_curse', 'scale_slam', 'rebirth'],
    expReward: 250,
    goldReward: [200, 400]
  }
}

export function getEnemy(id) {
  return enemies[id]
}

export function spawnEnemy(id) {
  const def = enemies[id]
  if (!def) return null
  return {
    id: def.id,
    instanceId: `${def.id}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    name: def.name,
    tier: def.tier,
    hp: def.hpMax,
    hpMax: def.hpMax,
    ap: def.apMax,
    apMax: def.apMax,
    position: def.position,
    attrs: { ...def.attrs },
    skills: [...def.skills],
    statuses: [],
    isAlive: true
  }
}
