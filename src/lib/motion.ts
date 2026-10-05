/**
 * Shared motion tokens for GSAP. Mirror of the CSS variables in globals.css —
 * change both together so CSS transitions and GSAP tweens feel identical.
 */
export const ease = {
  /** Default for reveals and entrances. */
  outExpo: "expo.out",
  /** Page / section transitions and masks. */
  inOutQuart: "power4.inOut",
  /** Small UI feedback (hover, magnetic buttons). */
  out: "power3.out",
} as const;

export const duration = {
  fast: 0.2,
  base: 0.45,
  slow: 0.9,
  reveal: 1.2,
} as const;

export const stagger = {
  chars: 0.02,
  words: 0.06,
  lines: 0.1,
  items: 0.08,
} as const;
