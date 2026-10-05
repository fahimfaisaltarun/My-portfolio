"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { ease } from "@/lib/motion";

/**
 * Hero choreography. Wraps the server-rendered hero and animates its
 * `data-hero-*` parts:
 *  1. portrait wipes up while the photo settles from a slow zoom
 *  2. name rises letter by letter, then the promise line by line
 *  3. pill stretches in, supporting copy / CTAs / proof fade up, badge pops
 *  4. on scroll: portrait parallax, copy drifts up and fades
 *  5. desktop pointer: portrait leans toward the cursor
 * Reduced motion: everything is shown immediately, no movement.
 */
export function HeroMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: ease.outExpo }, delay: 0.2 });

        intro
          .fromTo(
            "[data-hero-media]",
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: ease.inOutQuart },
            0,
          )
          .from("[data-hero-image]", { scale: 1.3, duration: 2.2 }, 0.1)
          .from("[data-hero-label]", { yPercent: 100, autoAlpha: 0, duration: 0.9 }, 0.35)
          .from("[data-hero-fade]", { y: 28, autoAlpha: 0, duration: 1, stagger: 0.1 }, 1.05)
          .from(
            "[data-hero-badge]",
            { scale: 0, rotate: -120, autoAlpha: 0, duration: 1.2, ease: "back.out(1.6)" },
            1.25,
          );

        // Text splits re-run on resize/font load; returning the tween keeps its progress.
        const title = SplitText.create("[data-hero-title]", {
          type: "lines,chars",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 115,
              duration: 1.3,
              ease: ease.outExpo,
              stagger: 0.028,
              delay: 0.4,
            }),
        });

        // The pill is animated here (not in the intro timeline) because splitting
        // rebuilds the DOM — querying inside onSplit always targets the live node.
        const tagline = SplitText.create("[data-hero-tagline]", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            const pill = root.querySelector("[data-hero-pill]");
            return gsap
              .timeline({ delay: 0.85 })
              .from(self.lines, { yPercent: 110, duration: 1.2, ease: ease.outExpo, stagger: 0.12 })
              .from(
                pill,
                { scaleX: 0, transformOrigin: "0% 50%", duration: 1, ease: ease.outExpo },
                0.3,
              );
          },
        });

        // Start states are applied — safe to show the hero now (no flash).
        gsap.set(root, { visibility: "visible" });

        // Scroll-out: portrait parallax + copy drifts away.
        gsap.to("[data-hero-image]", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-content]", {
          y: -80,
          autoAlpha: 0.15,
          ease: "none",
          scrollTrigger: { trigger: root, start: "35% top", end: "bottom top", scrub: true },
        });

        return () => {
          title.revert();
          tagline.revert();
        };
      });

      // Desktop with a real pointer: portrait leans toward the cursor.
      mm.add(
        "(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 64rem)",
        () => {
          const media = root.querySelector<HTMLElement>("[data-hero-media]");
          if (!media) return;
          gsap.set(media, { transformPerspective: 1200 });
          const rotX = gsap.quickTo(media, "rotationX", { duration: 0.8, ease: ease.out });
          const rotY = gsap.quickTo(media, "rotationY", { duration: 0.8, ease: ease.out });

          const onMove = (event: PointerEvent) => {
            const rect = root.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            rotY(x * 8);
            rotX(-y * 6);
          };
          const onLeave = () => {
            rotX(0);
            rotY(0);
          };

          root.addEventListener("pointermove", onMove);
          root.addEventListener("pointerleave", onLeave);
          return () => {
            root.removeEventListener("pointermove", onMove);
            root.removeEventListener("pointerleave", onLeave);
          };
        },
      );

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root, { visibility: "visible" });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="will-reveal">
      {children}
    </div>
  );
}
