# Animation — GSAP + Lenis

## Setup

| File | Role |
| ---- | ---- |
| [`src/lib/gsap.ts`](../src/lib/gsap.ts) | Registers `ScrollTrigger`, `SplitText`, `useGSAP` once; sets defaults. **Import GSAP only from here.** |
| [`src/lib/motion.ts`](../src/lib/motion.ts) | Shared eases, durations, staggers (mirror of CSS motion tokens) |
| [`src/components/providers/smooth-scroll.tsx`](../src/components/providers/smooth-scroll.tsx) | Lenis, driven by `gsap.ticker`, synced to `ScrollTrigger.update`. Off for reduced motion. |

Defaults: `ease: "expo.out"`, `duration: 0.45`.

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
    <h2 ref={ref} className="will-reveal text-h2 tracking-display font-extrabold">
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

| Effect | Where | Technique |
| ------ | ----- | --------- |
| Line-mask headline reveal | All section titles | SplitText lines + `yPercent` |
| Giant word scrub ("Work") | Section dividers | ScrollTrigger `scrub` on `xPercent` |
| Thumbnail row parallax | Service rows | ScrollTrigger `scrub`, alternating direction |
| Hero intro | Load | Timeline: name chars → role label → media scale-in |
| Magnetic CTA | Buttons | `gsap.quickTo` on pointermove |
| Custom cursor | Desktop only | `quickTo`, grows over video with "Play" label |
