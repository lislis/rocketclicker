const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 1,
    startVelocity: 30,
    shapes: ["star"],
    colors: ["8300ff", "ff00fa", "0400ff", "aaa"],
  };

export const shoot = () => {
    confetti({
        ...defaults,
        particleCount: 90,
        scalar: 1.2,
        shapes: ["star"],
    });

    confetti({
        ...defaults,
        particleCount: 60,
        scalar: 0.75,
        shapes: ["circle"],
    });

    confetti({
        ...defaults,
        particleCount: 40,
        scalar: 0.9,
        shapes: ["circle"],
    });
    console.log('shoot')
}

  