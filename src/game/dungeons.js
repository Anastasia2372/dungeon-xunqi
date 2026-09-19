export const dungeons = {
  main: {
    id: 'main',
    name: '古文明遗迹',
    tbd: true,
    description: '未婚妻的最后行踪指向这里',
    entryTown: 'home',
    maxFloor: 15,
    floors: {
      1: {
        floor: 1, theme: 'ruins_outer', name: '外围石廊', tbd: true,
        rooms: 4, enemyPool: ['goblin_scout', 'cave_bat'],
        encounterRate: 0.55, clue: 'clue_handkerchief', exitToFloor: 2
      },
      2: {
        floor: 2, theme: 'ruins_gallery', name: '雕像回廊', tbd: true,
        rooms: 5, enemyPool: ['goblin_scout', 'skeleton_warrior', 'cave_bat'],
        encounterRate: 0.6, clue: 'clue_hairpin', exitToFloor: 3
      },
      3: {
        floor: 3, theme: 'ruins_deep', name: '深处石殿', tbd: true,
        rooms: 5, enemyPool: ['skeleton_warrior', 'stone_sentinel'],
        encounterRate: 0.65, eliteRate: 0.2, clue: 'clue_diary_page', exitToFloor: 4
      },
      4: {
        floor: 4, theme: 'ruins_chamber', name: '密仪殿', tbd: true,
        rooms: 6, enemyPool: ['skeleton_warrior', 'stone_sentinel'],
        encounterRate: 0.7, eliteRate: 0.3, clue: 'clue_letter', exitToFloor: 5
      },
      5: {
        floor: 5, theme: 'ruins_boss', name: '守卫之厅', tbd: true,
        rooms: 3, enemyPool: ['skeleton_warrior'],
        encounterRate: 0.4, clue: 'clue_pendant',
        boss: 'ruined_captain', firstAwakening: true, exitToFloor: 6
      },
      6: {
        floor: 6, theme: 'warp_folds', name: '折叠石廊', tbd: true,
        rooms: 5, enemyPool: ['warped_skeleton', 'wall_dweller'],
        encounterRate: 0.65, eliteRate: 0.15, clue: 'clue_broken_mirror', exitToFloor: 7
      },
      7: {
        floor: 7, theme: 'warp_gallery', name: '错嵌之厅', tbd: true,
        rooms: 5, enemyPool: ['warped_skeleton', 'wall_dweller', 'geometry_walker'],
        encounterRate: 0.7, eliteRate: 0.2, clue: 'clue_blood_trail', exitToFloor: 8
      },
      8: {
        floor: 8, theme: 'warp_stairs', name: '楼上楼下', tbd: true,
        rooms: 6, enemyPool: ['wall_dweller', 'geometry_walker', 'headless_sentinel'],
        encounterRate: 0.7, eliteRate: 0.3, clue: 'clue_rope', exitToFloor: 9
      },
      9: {
        floor: 9, theme: 'warp_angleless', name: '无角之殿', tbd: true,
        rooms: 6, enemyPool: ['geometry_walker', 'headless_sentinel'],
        encounterRate: 0.7, eliteRate: 0.35, clue: 'clue_torn_robe', exitToFloor: 10
      },
      10: {
        floor: 10, theme: 'warp_boss', name: '至扭曲者之庭', tbd: true,
        rooms: 3, enemyPool: ['headless_sentinel'],
        encounterRate: 0.4, clue: 'clue_last_diary',
        boss: 'warped_lord', secondAwakening: true, exitToFloor: 11
      },
      11: {
        floor: 11, theme: 'nest_scales', name: '龙鳞之径', tbd: true,
        rooms: 5, enemyPool: ['dragon_servant', 'hatchling'],
        encounterRate: 0.7, eliteRate: 0.2, clue: 'clue_dragon_scale', exitToFloor: 12
      },
      12: {
        floor: 12, theme: 'nest_slumber', name: '龙眠殿', tbd: true,
        rooms: 5, enemyPool: ['dragon_servant', 'hatchling', 'dragon_bone_wraith'],
        encounterRate: 0.7, eliteRate: 0.3, clue: 'clue_clasp', exitToFloor: 13
      },
      13: {
        floor: 13, theme: 'nest_molten', name: '熔金厅', tbd: true,
        rooms: 6, enemyPool: ['hatchling', 'dragon_bone_wraith', 'scale_guard'],
        encounterRate: 0.75, eliteRate: 0.4, clue: 'clue_hair', exitToFloor: 14
      },
      14: {
        floor: 14, theme: 'nest_bones', name: '龙骨大厅', tbd: true,
        rooms: 6, enemyPool: ['dragon_bone_wraith', 'scale_guard'],
        encounterRate: 0.75, eliteRate: 0.5, clue: 'clue_dagger', exitToFloor: 15
      },
      15: {
        floor: 15, theme: 'nest_pact', name: '契约之庭', tbd: true,
        rooms: 3, enemyPool: ['scale_guard'],
        encounterRate: 0.5, clue: 'clue_breath',
        boss: 'elder_dragon_guardian', finalAwakening: true, exitToFloor: null
      }
    }
  }
}

export const clueDefs = {
  clue_handkerchief: {
    id: 'clue_handkerchief', name: '未婚妻的手帕', tbd: true,
    description: '她随身带的手帕,染了泥土,还留她惯用香。她走过这里,而且还活着'
  },
  clue_hairpin: {
    id: 'clue_hairpin', name: '木簪', tbd: true,
    description: '她最爱那根木簪,上面有她惯用的小结。此刻掉在雕像脚下'
  },
  clue_diary_page: {
    id: 'clue_diary_page', name: '日记页残片', tbd: true,
    description: '半页日记,墨迹被水浸开。你还是认得那字迹'
  },
  clue_letter: {
    id: 'clue_letter', name: '一封未完的信', tbd: true,
    description: '信只写了半段,收信人是她"父亲"。可她的父亲已过世多年'
  },
  clue_pendant: {
    id: 'clue_pendant', name: '一枚坠饰', tbd: true,
    description: '她成年礼那天你送她的坠饰。此刻它落在这里,链子断了'
  },
  clue_broken_mirror: {
    id: 'clue_broken_mirror', name: '碎裂镜面', tbd: true,
    description: '一片手心大的镜子,反照的却不是这里的天花板。她见过了什么?'
  },
  clue_blood_trail: {
    id: 'clue_blood_trail', name: '一段血迹', tbd: true,
    description: '不多,血还没干透。她受伤了,但还能走'
  },
  clue_rope: {
    id: 'clue_rope', name: '半截绳梯', tbd: true,
    description: '绳梯断在一半 · 她试着爬向本不该有的楼梯,失败了'
  },
  clue_torn_robe: {
    id: 'clue_torn_robe', name: '一片衣角', tbd: true,
    description: '你认得那素色麻布 · 她走前穿的正是这件长袍'
  },
  clue_last_diary: {
    id: 'clue_last_diary', name: '日记末页', tbd: true,
    description: '"石头开始活了 · 我不知道还能不能出去 · 若你读到,别为我下来"'
  },
  clue_dragon_scale: {
    id: 'clue_dragon_scale', name: '一片金鳞', tbd: true,
    description: '拳大 · 边缘还留着她指尖的擦痕 · 她把它带到了这里'
  },
  clue_clasp: {
    id: 'clue_clasp', name: '断裂的项链扣', tbd: true,
    description: '不是坠饰那条 · 是她母亲留她的老银 · 她挣扎过'
  },
  clue_hair: {
    id: 'clue_hair', name: '一撮头发', tbd: true,
    description: '发丝沾了金粉 · 她距离你越来越近了'
  },
  clue_dagger: {
    id: 'clue_dagger', name: '她的短刀', tbd: true,
    description: '你打的那把 · 她一直贴身带 · 此刻它弃在这里,刀口新缺'
  },
  clue_breath: {
    id: 'clue_breath', name: '一段气息', tbd: true,
    description: '她还活着 · 就在深处 · 你几乎能听见她的呼吸'
  }
}

export function getDungeon(id) {
  return dungeons[id]
}

export function getFloor(dungeonId, floor) {
  return dungeons[dungeonId]?.floors[floor]
}

export function getClue(id) {
  return clueDefs[id]
}

export function generateFloorRooms(floorDef) {
  const rooms = []
  const totalRooms = floorDef.rooms
  const clueRoom = Math.floor(Math.random() * (totalRooms - 1)) + 1
  for (let i = 0; i < totalRooms; i++) {
    const isLast = i === totalRooms - 1
    let type = 'empty'
    if (isLast && floorDef.boss) {
      type = 'boss'
    } else if (i === clueRoom && floorDef.clue) {
      type = 'clue'
    } else if (Math.random() < floorDef.encounterRate) {
      type = 'combat'
    } else if (Math.random() < 0.25) {
      type = 'loot'
    }
    rooms.push({
      idx: i,
      type,
      enemyIds: type === 'combat' ? pickEnemies(floorDef) : null,
      bossId: type === 'boss' ? floorDef.boss : null,
      clueId: type === 'clue' ? floorDef.clue : null,
      cleared: false
    })
  }
  return rooms
}

function pickEnemies(floorDef) {
  const count = 1 + Math.floor(Math.random() * 2)
  const list = []
  for (let i = 0; i < count; i++) {
    const pool = floorDef.enemyPool
    list.push(pool[Math.floor(Math.random() * pool.length)])
  }
  return list
}
