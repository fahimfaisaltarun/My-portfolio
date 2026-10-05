"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = { children: ReactNode; className?: string };

/**
 * Animates line-art SVG illustrations inside it:
 *  - `data-draw`   strokes draw themselves in (DrawSVG) on scroll
 *  - `data-pop`    small shapes scale in after the lines
 *  - `data-float`  gentle endless bob (idle life)
 *  - `data-pulse`  endless soft scale pulse
 * Illustrations stay plain server-rendered SVG; this only adds motion.
 */
export function DrawOnScroll({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Not every illustration uses every hook — only animate what exists.
        const q = (selector: string) => gsap.utils.toArray<Element>(selector, ref.current);
        const [draw, pop, float, pulse] = [
          "[data-draw]",
          "[data-pop]",
          "[data-float]",
          "[data-pulse]",
        ].map(q);

        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        });
        if (draw.length)
          tl.from(draw, {
            drawSVG: 0,
            duration: 1.4,
            ease: ease.inOutQuart,
            stagger: 0.07,
          });
        if (pop.length)
          tl.from(
            pop,
            {
              scale: 0,
              transformOrigin: "50% 50%",
              duration: 0.8,
              ease: "back.out(2)",
              stagger: 0.08,
            },
            "-=0.6",
          );

        if (float.length)
          gsap.to(float, {
            y: -6,
            duration: 1.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: { each: 0.4, from: "random" },
          });
        if (pulse.length)
          gsap.to(pulse, {
            scale: 1.15,
            transformOrigin: "50% 50%",
            duration: 1.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("text-foreground", className)}>
      {children}
    </div>
  );
}
