# Animation — GSAP + Lenis

## Setup

| File                                                                                          | Role                                                                                                   |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [`src/lib/gsap.ts`](../src/lib/gsap.ts)                                                       | Registers `ScrollTrigger`, `SplitText`, `useGSAP` once; sets defaults. **Import GSAP only from here.** |
| [`src/lib/motion.ts`](../src/lib/motion.ts)                                                   | Shared eases, durations, staggers (mirror of CSS motion tokens)                                        |
| [`src/components/providers/smooth-scroll.tsx`](../src/components/providers/smooth-scroll.tsx) | Lenis, driven by `gsap.ticker`, synced to `ScrollTrigger.update`. Off for reduced motion.              |

Defaults: `ease: "expo.out"`, `duration: 0.45`.

## Ready-made

- **`SplitReveal`** (`src/components/motion/split-reveal.tsx`) — use this for any text reveal
  instead of writing SplitText code: `<SplitReveal as="h2" type="lines">…</SplitReveal>`;
  `type="chars" scrub` for big wordmarks. The example below is how it works inside.
- **Mobile menu** — open = timeline (panel `clip-path` wipe → links `yPercent` stagger → meta
  fade); close = separate 0.6s wipe tween (never reverse the long open timeline). Lenis is
  stopped while open (`getLenis()?.stop()`), restarted at the start of close.
- **Header** — hide/show is CSS transitions driven by `data-hidden`/`data-scrolled`; the
  entrance is the `header-in` CSS animation (runs before hydration). Use `fill-mode: backwards`
  for entrance keyframes on elements that also transition `translate`, or the animation will
  override the transition forever.
- **Hero** (`HeroMotion`) — "studio" scene. Intro timeline (headline line masks → laptop tilts up
  → editor fills in → publish arrow wipes → phone flies in), then continuous loops created
  paused and started when the intro ends. The playhead sweep is the "director": the preview
  cuts to the shot under it (`hero.studio.shots`: punch-in + flash, camera pan/push-in, caption
  pop) and lights the matching clip and media-bin thumbnail; it also drives the timecode text.
  Plus waveform, REC blink, meters, phone float + story-style reel. A
  ScrollTrigger pauses every loop while the hero is off screen. GSAP-moved wrappers carry no CSS
  transform of their own (tilts live on inner elements), and the scene is sized in `cqw` so it
  scales as one picture.
- **First-visit intro** (`SiteIntro` + `IntroMotion`, homepage only, once per session) — an
  inline script flags `<html data-intro="play">` before first paint (skipped for reduced motion,
  `#hash` links and repeat loads); CSS shows the overlay only then and locks scroll. Timeline:
  viewfinder + wordmark chars → service words roll → counter/progress 000→100 → holds until
  fonts/load (max 1.5s) → wordmark lifts, overlay `clip-path` wipes up. It fires
  `INTRO_DONE_EVENT` as the wipe starts; anything that must wait uses `whenIntroDone()` from
  `@/lib/intro` (the hero does). Skip button + Escape jump to the exit.
- **Section motion kit** — `Reveal` (batched fade-up via `data-reveal`), `Marquee`, `Counter`,
  `DrawOnScroll` (DrawSVG line art), `ScrubWords`, `Parallax`, `ScrollLine`. Reach for these
  before writing new GSAP code. Guard optional targets (`toArray` + `length`) to avoid
  "target not found" warnings.
- **Never use `once: true` on ScrollTriggers.** When the page loads already scrolled (a
  `/#work` link, or refresh mid-page), already-passed `once` triggers kill themselves inside
  ScrollTrigger's refresh loop, which shrinks its trigger list mid-iteration and crashes
  (`Cannot read properties of undefined (reading 'end')` → "This page couldn't load"). The
  default `toggleActions: "play none none none"` already plays once and never reverses.
- **Hot reload caveat:** editing `src/lib/gsap.ts` while a page is open can throw GSAP context
  errors (re-registered plugins under live contexts). Reload in a fresh tab before debugging.
- **Testing tip:** GSAP runs on `requestAnimationFrame`, which is paused in hidden tabs/panes —
  an animation that "never finishes" in a background preview usually just isn't being ticked.

## Component pattern

```tsx
"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { duration, ease, stagger } from "@/lib/motion";

export function RevealHeading({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(ref.current, { type: "lines", mask: "lines" });
        gsap.set(ref.current, { visibility: "visible" });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: duration.reveal,
          ease: ease.outExpo,
          stagger: stagger.lines,
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        });
        return () => split.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(ref.current, { visibility: "visible" });
      });
    },
    { scope: ref },
  );

  return (
    <h2 ref={ref} className="will-reveal text-h2 font-extrabold tracking-display">
      {children}
    </h2>
  );
}
```

## Rules

1. **`useGSAP` with `scope`** — never animate in a bare `useEffect`. It auto-reverts on unmount
   (important for Fast Refresh and route changes).
2. **Animate transforms and opacity only** (`x`, `y`, `scale`, `rotate`, `autoAlpha`, `clipPath`).
   Avoid animating `width`, `height`, `top`, `left`, `filter: blur` on large areas.
3. **No FOUC:** elements that animate in get `will-reveal` (visibility hidden) and the tween
   reveals them. Without JS or with reduced motion they're visible automatically.
4. **Reduced motion:** wrap animations in `gsap.matchMedia()`; provide a static/instant fallback.
   Lenis is already disabled for these users.
5. **Server-render the content, animate on the client.** Text must be in the HTML for SEO — the
   animated client component wraps it; it never fetches or generates the text itself.
6. **SplitText:** always `revert()` in cleanup; use `mask: "lines"` for clean line reveals;
   re-split on resize via `autoSplit: true` when the layout is fluid.
7. **ScrollTrigger:** pin sparingly (max one or two per page). After images/video load call
   `ScrollTrigger.refresh()` if layout shifts. Use `markers: true` only while developing.
8. **Scroll-locking (menus, modals):** call `lenis.stop()` / `lenis.start()`, or add
   `data-lenis-prevent` to scrollable children.
9. **Mobile:** keep effects lighter below `md` (fewer pins, no cursor effects, shorter distances).

## Motion vocabulary (planned)

| Effect                    | Where              | Technique                                          |
| ------------------------- | ------------------ | -------------------------------------------------- |
| Line-mask headline reveal | All section titles | SplitText lines + `yPercent`                       |
| Giant word scrub ("Work") | Section dividers   | ScrollTrigger `scrub` on `xPercent`                |
| Thumbnail row parallax    | Service rows       | ScrollTrigger `scrub`, alternating direction       |
| Hero intro                | Load               | Timeline: name chars → role label → media scale-in |
| Magnetic CTA              | Buttons            | `gsap.quickTo` on pointermove                      |
| Custom cursor             | Desktop only       | `quickTo`, grows over video with "Play" label      |
