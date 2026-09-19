const S = 'stroke="#1a1612" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"'
const SF = 'fill="#1a1612" stroke="#1a1612" stroke-width="1"'
const SD = 'stroke="#7a3b2e" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"'

export const sprites = {
  player_hunter: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="12" r="5" ${S}/>
    <path d="M30,17 L30,44 M30,44 L23,66 M30,44 L37,68" ${S}/>
    <path d="M30,22 L14,26" ${S}/>
    <path d="M11,10 Q7,26 11,42" ${S}/>
    <path d="M11,10 L38,28 L11,42" ${S}/>
    <path d="M30,24 L38,32" ${S}/>
    <path d="M11,26 L26,26 M23,24 L26,26 L23,28" ${S}/>
  </svg>`,

  companion_swordsman: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="12" r="5" ${S}/>
    <path d="M30,17 L30,45 M30,45 L23,68 M30,45 L37,68" ${S}/>
    <path d="M30,22 L44,18" ${S}/>
    <path d="M44,10 L44,32" ${S}/>
    <path d="M42,10 L46,10" ${S}/>
    <path d="M30,26 L20,32" ${S}/>
    <path d="M14,44 L26,44 L26,30 L14,30 Z" ${S}/>
  </svg>`,

  companion_archer: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="12" r="5" ${S}/>
    <path d="M30,17 L30,45 M30,45 L24,66 M30,45 L36,66" ${S}/>
    <path d="M30,22 L44,26" ${S}/>
    <path d="M48,14 Q52,30 48,42" ${S}/>
    <path d="M48,14 L20,30 L48,42" ${S}/>
    <path d="M30,24 L20,32" ${S}/>
  </svg>`,

  companion_guard: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="14" r="5" ${S}/>
    <path d="M30,19 L30,46 M30,46 L23,68 M30,46 L37,68" ${S}/>
    <path d="M12,24 L28,20 L28,52 L12,52 Z" ${S}/>
    <path d="M14,30 L26,30 M14,42 L26,42" ${S}/>
    <path d="M30,26 L46,22 L44,32" ${S}/>
  </svg>`,

  companion_rogue: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="12" r="5" ${S}/>
    <path d="M25,10 L35,10" ${S}/>
    <path d="M30,17 L30,44 M30,44 L23,66 M30,44 L37,68" ${S}/>
    <path d="M30,22 L18,30 L22,28" ${S}/>
    <path d="M30,22 L42,30 L38,28" ${S}/>
    <path d="M20,32 L24,26" ${S}/>
    <path d="M40,32 L36,26" ${S}/>
  </svg>`,

  companion_ranger: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="12" r="5" ${S}/>
    <path d="M24,8 L36,8 L30,4 Z" ${S}/>
    <path d="M30,17 L30,44 M30,44 L23,66 M30,44 L37,68" ${S}/>
    <path d="M30,22 L14,26" ${S}/>
    <path d="M11,10 Q7,26 11,42" ${S}/>
    <path d="M11,26 L26,26" ${S}/>
  </svg>`,

  companion_veteran: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="14" r="5" ${S}/>
    <path d="M25,10 L28,6 M35,10 L32,6" ${S}/>
    <path d="M30,19 L30,45 M30,45 L22,68 M30,45 L38,68" ${S}/>
    <path d="M14,26 L46,26 L46,52 L14,52 Z" ${S}/>
    <path d="M20,32 L40,32 M20,42 L40,42" ${S}/>
    <path d="M46,18 L50,50" ${S}/>
  </svg>`,

  companion_hexer: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="12" r="5" ${S}/>
    <path d="M30,17 L30,50 L20,70 M30,50 L40,70" ${S}/>
    <path d="M18,26 Q14,44 18,58" ${S}/>
    <path d="M42,26 Q46,44 42,58" ${S}/>
    <circle cx="30" cy="32" r="4" ${SD}/>
    <path d="M28,30 L32,34 M32,30 L28,34" ${SD}/>
  </svg>`,

  companion_dragon_hunter: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <path d="M20,14 L40,14 L36,6 L24,6 Z" ${S}/>
    <circle cx="30" cy="16" r="5" ${S}/>
    <path d="M30,21 L30,46 M30,46 L20,68 M30,46 L40,68" ${S}/>
    <path d="M30,26 L46,20" ${S}/>
    <path d="M46,12 L52,26 L44,30" ${S}/>
    <path d="M14,44 L28,44 L28,32 L14,32 Z" ${S}/>
  </svg>`,

  enemy_goblin_scout: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <path d="M25,15 Q20,10 22,7 L28,12 L34,7 Q38,10 33,15" ${S}/>
    <circle cx="29" cy="18" r="6" ${S}/>
    <circle cx="26" cy="18" r="1" ${SF}/>
    <circle cx="32" cy="18" r="1" ${SF}/>
    <path d="M27,22 Q29,23 31,22" ${S}/>
    <path d="M29,24 L29,44 M29,44 L23,64 M29,44 L36,64" ${S}/>
    <path d="M29,30 L18,38 L20,42" ${S}/>
    <path d="M29,32 L40,35" ${S}/>
    <path d="M40,35 L44,30 L46,34 L42,38 Z" ${S}/>
  </svg>`,

  enemy_cave_bat: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="24" r="6" ${S}/>
    <path d="M27,22 Q28,20 26,18 M33,22 Q32,20 34,18" ${S}/>
    <path d="M24,30 Q10,26 4,38 Q14,34 24,36 Z" ${S}/>
    <path d="M36,30 Q50,26 56,38 Q46,34 36,36 Z" ${S}/>
    <circle cx="27" cy="23" r="0.7" ${SF}/>
    <circle cx="33" cy="23" r="0.7" ${SF}/>
    <path d="M28,26 L30,28 L32,26" ${S}/>
  </svg>`,

  enemy_skeleton_warrior: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <path d="M23,14 Q23,6 30,6 Q37,6 37,14 Q37,20 30,22 Q23,20 23,14 Z" ${S}/>
    <circle cx="27" cy="14" r="1.5" ${SF}/>
    <circle cx="33" cy="14" r="1.5" ${SF}/>
    <path d="M27,19 L33,19" ${S}/>
    <path d="M28,20 L28,21 M30,20 L30,21 M32,20 L32,21" ${S}/>
    <path d="M30,22 L30,44" ${S}/>
    <path d="M26,26 L34,26 M26,30 L34,30 M26,34 L34,34" ${S}/>
    <path d="M30,44 L22,66 M30,44 L38,66" ${S}/>
    <path d="M30,28 L46,28" ${S}/>
    <path d="M42,22 L50,30 L46,32 L48,36" ${S}/>
    <path d="M30,28 L15,32" ${S}/>
    <path d="M13,26 L13,42 M10,26 L16,26" ${S}/>
  </svg>`,

  enemy_stone_sentinel: `<svg viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <path d="M25,18 L55,18 L58,32 L22,32 Z" ${S}/>
    <circle cx="34" cy="24" r="2" ${SF}/>
    <circle cx="46" cy="24" r="2" ${SF}/>
    <path d="M20,32 L60,32 L64,68 L16,68 Z" ${S}/>
    <path d="M16,68 L14,86 L26,86 L28,68" ${S}/>
    <path d="M64,68 L66,86 L54,86 L52,68" ${S}/>
    <path d="M20,40 L60,40 M20,52 L60,52 M20,60 L60,60" ${S}/>
    <path d="M8,42 L20,38 L20,58 L8,62 Z" ${S}/>
    <path d="M60,38 L72,42 L72,62 L60,58 Z" ${S}/>
  </svg>`,

  enemy_ruined_captain: `<svg viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <path d="M30,4 L40,10 L50,4 L52,18 L28,18 Z" ${S}/>
    <path d="M28,18 Q28,8 40,8 Q52,8 52,18 Q52,26 40,30 Q28,26 28,18 Z" ${S}/>
    <path d="M33,20 L37,20 M43,20 L47,20" ${S}/>
    <circle cx="35" cy="20" r="0.8" ${SF}/>
    <circle cx="45" cy="20" r="0.8" ${SF}/>
    <path d="M36,26 L44,26 M37,27 L38,28 M42,27 L43,28" ${S}/>
    <path d="M40,30 L40,52" ${S}/>
    <path d="M24,36 L56,36 L58,54 L22,54 Z" ${S}/>
    <path d="M28,38 L52,38 M28,44 L52,44 M28,50 L52,50" ${S}/>
    <path d="M40,54 L30,80 M40,54 L50,80" ${S}/>
    <path d="M22,40 L8,58 L14,60 L18,50" ${S}/>
    <path d="M58,40 L74,44 L72,52 L66,50" ${S}/>
    <path d="M4,58 L14,60 L14,64 L4,62 Z" ${S}/>
    <path d="M4,58 L4,62 M2,64 L14,68" ${S}/>
  </svg>`,

  enemy_warped_skeleton: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <path d="M23,14 Q23,6 30,6 Q37,6 37,14 Q37,20 30,22 Q23,20 23,14 Z" ${S}/>
    <circle cx="26" cy="14" r="1.2" ${SF}/>
    <circle cx="34" cy="14" r="1.2" ${SF}/>
    <path d="M30,22 L30,46 M30,46 L22,68 M30,46 L38,68" ${S}/>
    <path d="M30,28 L14,34 M30,28 L46,34" ${S}/>
    <path d="M30,32 L10,44 M30,32 L50,44" ${S}/>
    <path d="M14,34 L8,28 M46,34 L52,28" ${S}/>
    <path d="M10,44 L4,50 M50,44 L56,50" ${S}/>
  </svg>`,

  enemy_wall_dweller: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <path d="M4,10 L4,74 L56,74 L56,10" ${S}/>
    <path d="M22,74 Q22,60 30,52 Q38,60 38,74" ${S}/>
    <circle cx="30" cy="46" r="5" ${S}/>
    <circle cx="28" cy="46" r="0.8" ${SF}/>
    <circle cx="32" cy="46" r="0.8" ${SF}/>
    <path d="M27,49 Q30,51 33,49" ${S}/>
    <path d="M22,58 L14,62 L10,58" ${S}/>
    <path d="M38,58 L46,62 L50,58" ${S}/>
    <path d="M4,20 L18,20 M4,32 L20,32" ${S}/>
    <path d="M42,20 L56,20 M40,32 L56,32" ${S}/>
  </svg>`,

  enemy_geometry_walker: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
    <path d="M35,10 L60,35 L35,60 L10,35 Z" ${S}/>
    <path d="M35,20 L50,35 L35,50 L20,35 Z" ${S}/>
    <path d="M25,25 L45,45 M45,25 L25,45" ${S}/>
    <circle cx="35" cy="35" r="3" ${SF}/>
  </svg>`,

  enemy_headless_sentinel: `<svg viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <path d="M22,22 L58,22 L58,60 L22,60 Z" ${S}/>
    <path d="M20,22 L60,22" ${S}/>
    <circle cx="40" cy="18" r="3" ${SF}/>
    <path d="M30,10 L36,18 L44,18 L50,10" ${S}/>
    <path d="M22,60 L20,86 L32,86 L34,60" ${S}/>
    <path d="M58,60 L60,86 L48,86 L46,60" ${S}/>
    <path d="M22,32 L58,32 M22,44 L58,44 M22,52 L58,52" ${S}/>
    <path d="M6,32 L22,26 L22,58 L6,64 Z" ${S}/>
    <path d="M58,26 L74,32 L74,64 L58,58 Z" ${S}/>
  </svg>`,

  enemy_warped_lord: `<svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
    <path d="M45,10 L70,30 L60,60 L30,60 L20,30 Z" ${S}/>
    <path d="M35,25 L55,25" ${S}/>
    <circle cx="35" cy="30" r="2" ${SF}/>
    <circle cx="55" cy="30" r="2" ${SF}/>
    <circle cx="45" cy="42" r="2" ${SF}/>
    <path d="M45,60 L45,80" ${S}/>
    <path d="M25,45 L10,30 M25,55 L10,55 M25,50 L8,45" ${S}/>
    <path d="M65,45 L80,30 M65,55 L80,55 M65,50 L82,45" ${S}/>
    <path d="M45,80 L30,88 M45,80 L60,88" ${S}/>
    <path d="M20,30 L45,10 L70,30 L45,50 Z" ${SD}/>
  </svg>`,

  enemy_dragon_servant: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="14" r="6" ${S}/>
    <path d="M25,10 L28,4 M35,10 L32,4" ${SD}/>
    <circle cx="27" cy="14" r="1" ${SF}/>
    <circle cx="33" cy="14" r="1" ${SF}/>
    <path d="M27,18 L33,18" ${S}/>
    <path d="M30,20 L30,46 M30,46 L22,68 M30,46 L38,68" ${S}/>
    <path d="M30,26 L46,32" ${S}/>
    <path d="M42,28 L52,22 L54,28" ${SD}/>
    <path d="M30,28 L14,32" ${S}/>
  </svg>`,

  enemy_hatchling: `<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
    <path d="M14,40 Q14,28 30,28 Q46,28 46,40 Q46,54 30,54 Q14,54 14,40 Z" ${SD}/>
    <path d="M30,28 Q28,18 34,14 Q38,18 34,28" ${SD}/>
    <circle cx="32" cy="20" r="1" ${SF}/>
    <path d="M14,40 Q6,32 4,44 Q10,42 14,44" ${SD}/>
    <path d="M46,40 Q54,32 56,44 Q50,42 46,44" ${SD}/>
    <path d="M46,50 Q54,54 56,60 M22,54 L20,62 M32,54 L32,64 M42,54 L44,62" ${SD}/>
  </svg>`,

  enemy_dragon_bone_wraith: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <path d="M22,14 Q22,4 30,4 Q38,4 38,14 Q38,22 30,26 Q22,22 22,14 Z" ${S}/>
    <circle cx="26" cy="14" r="1.5" ${SF}/>
    <circle cx="34" cy="14" r="1.5" ${SF}/>
    <path d="M23,20 L37,20" ${S}/>
    <path d="M22,20 Q28,22 30,26 Q32,22 38,20" ${SD}/>
    <path d="M30,26 L26,54 L20,74 M30,26 L34,54 L40,74" ${S}/>
    <path d="M22,32 L38,32 M22,42 L38,42" ${S}/>
    <path d="M26,54 L18,60 L8,54" ${SD}/>
    <path d="M34,54 L42,60 L52,54" ${SD}/>
  </svg>`,

  enemy_scale_guard: `<svg viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="16" r="6" ${S}/>
    <path d="M32,10 L36,4 M48,10 L44,4" ${SD}/>
    <path d="M40,22 L40,50" ${S}/>
    <path d="M20,26 L60,26 L64,58 L16,58 Z" ${S}/>
    <path d="M20,32 L60,32 M20,40 L60,40 M20,48 L60,48" ${SD}/>
    <path d="M16,58 L14,84 L28,84 L30,58" ${S}/>
    <path d="M64,58 L66,84 L52,84 L50,58" ${S}/>
    <path d="M20,30 L14,50 L18,54" ${S}/>
    <path d="M60,30 L66,50 L62,54" ${S}/>
    <path d="M4,50 L14,48 L14,58 L4,60 Z" ${S}/>
    <path d="M66,48 L76,50 L76,60 L66,58 Z" ${S}/>
  </svg>`,

  enemy_elder_dragon_guardian: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="18" r="8" ${S}/>
    <path d="M38,10 L42,2 M58,10 L54,2" ${SD}/>
    <path d="M42,20 L46,20 M54,20 L58,20" ${S}/>
    <circle cx="44" cy="18" r="1.2" ${SF}/>
    <circle cx="56" cy="18" r="1.2" ${SF}/>
    <path d="M46,24 L54,24 M46,26 L48,28 M52,26 L54,28" ${SD}/>
    <path d="M50,26 L50,54" ${S}/>
    <path d="M22,32 L78,32 L82,64 L18,64 Z" ${S}/>
    <path d="M24,40 L76,40 M24,48 L76,48 M24,56 L76,56" ${SD}/>
    <path d="M18,64 L14,94 L34,94 L36,64" ${S}/>
    <path d="M82,64 L86,94 L66,94 L64,64" ${S}/>
    <path d="M22,36 L6,44 L4,64 L14,58" ${SD}/>
    <path d="M78,36 L94,44 L96,64 L86,58" ${SD}/>
    <path d="M22,32 Q10,28 4,34 Q10,36 22,38" ${SD}/>
    <path d="M78,32 Q90,28 96,34 Q90,36 78,38" ${SD}/>
  </svg>`,

  dragon_symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M20,50 Q30,20 50,25 Q70,20 80,50 Q70,80 50,75 Q30,80 20,50 Z" ${SD}/>
    <path d="M30,50 Q40,35 50,40 Q60,35 70,50 Q60,65 50,60 Q40,65 30,50 Z" ${SD}/>
    <path d="M45,45 Q50,42 55,45 L55,55 Q50,58 45,55 Z" fill="#b58a2d" stroke="#7a3b2e" stroke-width="0.8"/>
    <path d="M12,50 L24,44 M12,50 L24,56" ${SD}/>
    <path d="M76,50 L88,44 M76,50 L88,56" ${SD}/>
    <path d="M50,14 L46,26 L54,26 Z" ${SD}/>
    <path d="M50,86 L46,74 L54,74 Z" ${SD}/>
  </svg>`,

  clue_icon: `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25" r="18" ${SD}/>
    <path d="M25,15 L25,28 M25,32 L25,35" ${SD}/>
  </svg>`,

  door_icon: `<svg viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
    <path d="M5,55 L5,10 Q5,4 12,4 L28,4 Q35,4 35,10 L35,55 Z" ${S}/>
    <circle cx="28" cy="30" r="1.5" ${SF}/>
    <path d="M12,10 L28,10 M12,55 L28,55" ${S}/>
  </svg>`
}

const companionSpriteMap = {
  swordsman: 'companion_swordsman',
  guard: 'companion_guard',
  archer: 'companion_archer',
  rogue: 'companion_rogue',
  ranger: 'companion_ranger',
  veteran: 'companion_veteran',
  hexer: 'companion_hexer',
  dragon_hunter: 'companion_dragon_hunter'
}

export function getSprite(id) {
  return sprites[id] || ''
}

export function unitSpriteId(unit) {
  if (unit.isPlayer) return 'player_hunter'
  if (unit.side === 'ally') {
    return companionSpriteMap[unit.profession] || 'companion_swordsman'
  }
  const specific = `enemy_${unit.id}`
  if (sprites[specific]) return specific
  return 'enemy_goblin_scout'
}
