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
    goldReward: [40, 80],
    bossPhase2Hp: 60,
    bossPhase2Skills: ['captain_rage']
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
