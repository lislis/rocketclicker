export const levels = {
  width: 2000,
  height: 721,
  1: {
    rocket: { x: 80, y: 150 },
    moon: { x: 700, y:90, scale: 0.1},
    distance: 75.0,
    bg: {x: 0, y: 0, scale: 1, width: 2000 }, //1 2000
    blurp: "To the Moon!"
  },
  2: {
    rocket: { x: 80, y: 150 },
    moon: { x: 700, y: 80, scale: 0.2},
    distance: 100.0,
    bg: {x: 0, y: -30, scale: 1.2, width: 1665 },
    blurp: "Up and to the right!"
  },
  3: {
    rocket: { x: 80, y: 150 },
    moon: { x: 700, y: 100, scale: 0.3},
    distance: 120.0,
    bg: {x: 0, y: -20, scale: 1.35, width: 1485 },
    blurp: "To, to, to, to the moon!"
  },
  4: {
    rocket: { x: 80, y: 150 },
    moon: { x: 700, y: 120, scale: 0.4},
    distance: 150.0,
    bg: {x: 0, y: -40, scale: 1.5, width: 1333 },
    blurp: "Something, something moon!"
  }
}
