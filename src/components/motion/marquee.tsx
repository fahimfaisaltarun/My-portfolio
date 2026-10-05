"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** Seconds for one full loop. Higher = slower. */
  speed?: number;
  reverse?: boolean;
  className?: string;
  /** Accessible label for the strip; duplicates are hidden from AT. */
  label?: string;
};

/**
 * Infinite horizontal loop. Content is rendered twice (second copy
 * aria-hidden) and the track slides -50%. Scrolling the page speeds it up
 * in the scroll direction; it eases back to cruising speed after.
 * Reduced motion: static row.
 */
export function Marquee({ children, speed = 40, reverse = false, className, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = ref.current?.querySelector<HTMLElement>("[data-marquee-track]");
      if (!track) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const loop = gsap.fromTo(
          track,
          { xPercent: reverse ? -50 : 0 },
          { xPercent: reverse ? 0 : -50, duration: speed, ease: "none", repeat: -1 },
        );

        // Scroll velocity boosts speed; a tween on the timeScale() getter/setter eases it back.
        const trigger = ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const boost = gsap.utils.clamp(-5, 5, self.getVelocity() / 300);
            loop.timeScale(1 + Math.abs(boost));
            gsap.to(loop, { timeScale: 1, duration: 0.8, ease: "power3.out", overwrite: true });
          },
        });

        // Pause when off-screen to save work.
        const visibility = ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
        });

        return () => {
          trigger.kill();
          visibility.kill();
        };
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      role={label ? "region" : undefined}
      aria-label={label}
      className={cn("overflow-hidden", className)}
    >
      <div data-marquee-track className="flex w-max">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden inert>
          {children}
        </div>
      </div>
    </div>
  );
}
