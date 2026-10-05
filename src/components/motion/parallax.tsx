"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** xPercent travelled across the scroll range, e.g. [10, -25]. */
  x?: [number, number];
  /** yPercent travelled across the scroll range. */
  y?: [number, number];
};

/** Moves its content horizontally/vertically in sync with page scroll. */
export function Parallax({ children, className, x, y }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { xPercent: x?.[0] ?? 0, yPercent: y?.[0] ?? 0 },
          {
            xPercent: x?.[1] ?? 0,
            yPercent: y?.[1] ?? 0,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
