export const levels = {
  1: {
    rocket: { x: 0, y: 50 },
    moon: { x: 180, y: 150, scale: 0.22 , texture: 'moon' }, // 180 150
    distance: 100.0,
    bg: {x: 0, y: -20, scale: 1, width: 2000, texture: 'whitepaper' }, //1 2000
    blurp: "To the Moon!",
    skyline: { x: 0, y: 409, width: 3905, scale: 0.9 }
  },
  2: {
    rocket: { x: 0, y: 350 },
    moon: { x: 220, y: 180, scale: 0.51, texture: 'moon' },
    distance: 190.0,
    bg: {x: 0, y: 0, scale: 1, width: 2000, texture: 'currencies' }, //{x: 0, y: -30, scale: 1.2, width: 1666, texture: 'bg1' },
    blurp: "Up and to the right!",
    skyline: { x: 0, y: 629, width: 1415, scale: 0.34 }
  },
  3: {
    rocket: { x: 0, y: 350 },
    moon: { x: 280, y: 250, scale: 0.7, texture: 'moon' },
    distance: 350.0,
    bg: {x: 0, y: -20, scale: 1, width: 2000, texture: 'headlines' },
    blurp: "To, to, to, to the moon!",
    skyline: { x: 0, y: 2099, width: 815, scale: 0.2 }
  }
}
