export const dungeons = {
  main: {
    id: 'main',
    name: '古文明遗迹',
    tbd: true,
    description: '未婚妻的最后行踪指向这里',
    entryTown: 'home',
    maxFloor: 5,
    floors: {
      1: {
        floor: 1,
        theme: 'ruins_outer',
        name: '外围石廊',
        rooms: 4,
        enemyPool: ['goblin_scout', 'cave_bat'],
        encounterRate: 0.55,
        clue: 'clue_handkerchief',
        exitToFloor: 2
      },
      2: {
        floor: 2,
        theme: 'ruins_gallery',
        name: '雕像回廊',
        rooms: 5,
        enemyPool: ['goblin_scout', 'skeleton_warrior', 'cave_bat'],
        encounterRate: 0.6,
        clue: 'clue_hairpin',
        exitToFloor: 3
      },
      3: {
        floor: 3,
        theme: 'ruins_deep',
        name: '深处石殿',
        rooms: 5,
        enemyPool: ['skeleton_warrior', 'stone_sentinel'],
        encounterRate: 0.65,
        clue: 'clue_diary_page',
        eliteRate: 0.2,
        exitToFloor: 4
      },
      4: {
        floor: 4,
        theme: 'ruins_chamber',
        name: '密仪殿',
        rooms: 6,
        enemyPool: ['skeleton_warrior', 'stone_sentinel'],
        encounterRate: 0.7,
        eliteRate: 0.3,
        clue: 'clue_letter',
        exitToFloor: 5
      },
      5: {
        floor: 5,
        theme: 'ruins_boss',
        name: '守卫之厅',
        rooms: 3,
        enemyPool: ['skeleton_warrior'],
        encounterRate: 0.4,
        clue: 'clue_pendant',
        boss: 'ruined_captain',
        firstAwakening: true,
        exitToFloor: null
      }
    }
  }
}

export const clueDefs = {
  clue_handkerchief: {
    id: 'clue_handkerchief',
    name: '未婚妻的手帕',
    tbd: true,
    description: '(占位)她随身带的手帕,染了泥土,还留她惯用香。她走过这里,而且还活着'
  },
  clue_hairpin: {
    id: 'clue_hairpin',
    name: '木簪',
    tbd: true,
    description: '(占位)她最爱那根木簪,上面有她惯用的小结。此刻掉在雕像脚下'
  },
  clue_diary_page: {
    id: 'clue_diary_page',
    name: '日记页残片',
    tbd: true,
    description: '(占位)半页日记,墨迹被水浸开。你还是认得那字迹'
  },
  clue_letter: {
    id: 'clue_letter',
    name: '一封未完的信',
    tbd: true,
    description: '(占位)信只写了半段,收信人是她"父亲"。可她的父亲已过世多年'
  },
  clue_pendant: {
    id: 'clue_pendant',
    name: '一枚坠饰',
    tbd: true,
    description: '(占位)她成年礼那天你送她的坠饰。此刻它落在这里,链子断了'
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
  const enemies = []
  for (let i = 0; i < count; i++) {
    const pool = floorDef.enemyPool
    enemies.push(pool[Math.floor(Math.random() * pool.length)])
  }
  return enemies
}
