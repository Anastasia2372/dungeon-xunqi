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

export function getSprite(id) {
  return sprites[id] || ''
}

export function unitSpriteId(unit) {
  if (unit.isPlayer) return 'player_hunter'
  if (unit.side === 'ally') return 'companion_swordsman'
  return `enemy_${unit.id}`
}
