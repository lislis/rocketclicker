const colors = ["624099", "8e4099", "404a99", "eee"];

const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 1,
    drift: 1,
    startVelocity: 30,
    shapes: ["star"],
    colors
  };

export const shoot = (level) => {
    [...Array(5).keys()].forEach(x => {
        confetti({
            ...defaults,
            particleCount: 40,
            scalar: 1.1,
            shapes: ["star", "circle"],
        });
        confetti({
            ...defaults,
            particleCount: 60,
            scalar: 0.75,
            shapes: ["circle"],
        });
    });
}

export const cannon = (timer) => {
    const end = Date.now() + timer * 1000;

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        shapes: ["star", "circle"],
        colors: colors,
      });
    
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        shapes: ["star", "circle"],
        colors: colors,
      });
    
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
}