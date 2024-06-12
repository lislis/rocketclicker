export const levels = {
  width: 2000,
  height: 721,
  1: {
    rocket: { x: 80, y: 150 },
    moon: { x: 170, y: 110, scale: 0.1},
    distance: 75.0,
    bg: {x: 0, y: 0, scale: 1, width: 2000 }, //1 2000
    blurp: "To the Moon!"
  },
  2: {
    rocket: { x: 80, y: 150 },
    moon: { x: 200, y: 160, scale: 0.3},
    distance: 100.0,
    bg: {x: 0, y: -30, scale: 1.2, width: 1666 },
    blurp: "Up and to the right!"
  },
  3: {
    rocket: { x: 80, y: 150 },
    moon: { x: 220, y: 280, scale: 0.5},
    distance: 180.0,
    bg: {x: 0, y: -20, scale: 1.35, width: 1481 },
    blurp: "To, to, to, to the moon!"
  },
  4: {
    rocket: { x: 80, y: 150 },
    moon: { x: 300, y: 260, scale: 0.7},
    distance: 200.0,
    bg: {x: 0, y: -40, scale: 1.5, width: 1333 },
    blurp: "Something, something moon!"
  },
  5: {
    rocket: { x: 80, y: 150 },
    moon: { x: 350, y: 280, scale: 0.99},
    distance: 300.0,
    bg: {x: 0, y: -40, scale: 1.5, width: 1333 },
    blurp: "To the moon!"
  }
}
