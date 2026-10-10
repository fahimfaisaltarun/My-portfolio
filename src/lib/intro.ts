/**
 * Coordination between the first-visit intro and the hero.
 *
 * An inline script (SiteIntro) sets `<html data-intro="play">` before first
 * paint when the intro should run; CSS shows the overlay only in that state.
 * The intro dispatches INTRO_DONE_EVENT as its exit wipe starts, then sets
 * `data-intro="done"`.
 */
export const INTRO_DONE_EVENT = "site-intro:done";

export function isIntroPlaying(): boolean {
  return document.documentElement.dataset.intro === "play";
}

/** Run `callback` once the intro has handed over (immediately if there's no intro). Returns a cleanup. */
export function whenIntroDone(callback: () => void): () => void {
  if (!isIntroPlaying()) {
    callback();
    return () => {};
  }
  window.addEventListener(INTRO_DONE_EVENT, callback, { once: true });
  return () => window.removeEventListener(INTRO_DONE_EVENT, callback);
}

/** Inline script source: flags this load for the intro (first homepage load of the session). */
export function introFlagScript(storageKey: string): string {
  const key = JSON.stringify(storageKey);
  return `(function(){try{if(sessionStorage.getItem(${key})||location.hash||matchMedia("(prefers-reduced-motion: reduce)").matches)return;document.documentElement.dataset.intro="play"}catch(e){}})();`;
}
