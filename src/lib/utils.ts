import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge must know our custom theme scales, otherwise it can't tell
 * `text-h1` (font size) from `text-accent` (colour) and drops one of them.
 * Keep these lists in sync with the @theme block in src/app/globals.css.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["caption", "small", "body", "lead", "h3", "h2", "h1", "display", "wordmark"],
      tracking: ["display", "tight", "snug", "label"],
    },
  },
});

/** Compose class names: conditional (clsx) + conflict-free (tailwind-merge). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
