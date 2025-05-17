import { AnimationControls, TargetAndTransition } from "framer-motion";

// Calculate positions of elements in an orbit
export const calculateOrbitPositions = (
  avatars: Array<{ angle: number }>,
  centerX: number,
  centerY: number,
  radius: number,
  elementSize: number
) => {
  const offset = elementSize / 2;

  return avatars.map((item) => {
    const rad = (item.angle * Math.PI) / 180;
    const x = centerX + radius * Math.cos(rad) - offset;
    const y = centerY + radius * Math.sin(rad) - offset;
    return { x, y };
  });
};

// Start continuous orbit rotation animation
export const startOrbitAnimation = (
  control: AnimationControls,
  duration = 45
): void => {
  control.start({
    rotate: 360,
    transition: {
      duration,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    },
  });
};

// Start counter-rotation for orbit elements
export const startCounterRotationAnimation = (
  controls: AnimationControls[],
  duration = 45
): void => {
  controls.forEach((control) => {
    control.start({
      rotate: -360,
      transition: {
        duration,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      },
    });
  });
};

// Define avatar animation variants
export const orbitAnimationVariants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 45,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    },
  },
};

export const counterRotationVariants = {
  initial: { rotate: 0 },
  animate: {
    rotate: -360,
    transition: {
      duration: 45,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    },
  },
};
