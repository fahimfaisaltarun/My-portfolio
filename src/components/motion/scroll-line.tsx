"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = { className?: string; axis?: "x" | "y"; trigger?: string };

/**
 * A progress line that fills as you scroll through its parent (or the
 * element matching `trigger`). Track uses `bg-border`, fill uses accent.
 */
export function ScrollLine({ className, axis = "x", trigger }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const fill = ref.current?.firstElementChild;
      if (!fill) return;
      const scope = trigger ? document.querySelector(trigger) : ref.current?.parentElement;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          fill,
          { [axis === "x" ? "scaleX" : "scaleY"]: 0 },
          {
            [axis === "x" ? "scaleX" : "scaleY"]: 1,
            ease: "none",
            scrollTrigger: { trigger: scope, start: "top 70%", end: "bottom 60%", scrub: 0.5 },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden className={cn("bg-border", className)}>
      <div className={cn("size-full bg-accent", axis === "x" ? "origin-left" : "origin-top")} />
    </div>
  );
}
