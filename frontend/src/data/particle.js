const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 1,
    startVelocity: 30,
    shapes: ["star"],
    colors: ["8300ff", "ff00fa", "0400ff", "aaa", "eee"],
  };

export const shoot = (level) => {
    [...Array(5).keys()].forEach(x => {
        confetti({
            ...defaults,
            particleCount: 40,
            scalar: 1.2,
            shapes: ["star"],
        });
        confetti({
            ...defaults,
            particleCount: 60,
            scalar: 0.85,
            shapes: ["circle"],
        });
    });
}

  