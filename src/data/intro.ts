/**
 * First-visit intro (homepage, once per browser session). Kept short: the
 * wordmark, a few rotating service words and a load counter.
 */
export const intro = {
  /** sessionStorage key — present once the intro has played this session. */
  storageKey: "intro-seen",
  /** Rotates under the wordmark while the page loads. */
  words: ["Social media", "Short-form video", "Websites", "Paid ads"],
  skipLabel: "Skip intro",
} as const;
