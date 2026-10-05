"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { duration, ease, stagger as staggers } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** Element to render. Keep semantic (h2, p…) — text stays server-rendered HTML. */
  as?: ElementType;
  className?: string;
  /** Split granularity. Lines for paragraphs/headlines, chars for big wordmarks. */
  type?: "lines" | "words" | "chars";
  /** Tie progress to scroll position instead of playing once. */
  scrub?: boolean;
  /** ScrollTrigger start, e.g. "top 85%". */
  start?: string;
  /** ScrollTrigger end (used with scrub). */
  end?: string;
  "aria-hidden"?: boolean;
  id?: string;
};

/**
 * Masked text reveal on scroll using GSAP SplitText. Re-splits automatically
 * when fonts load or the element resizes. Without JS or with reduced motion
 * the text is simply visible.
 */
export function SplitReveal({
  children,
  as: Tag = "div",
  className,
  type = "lines",
  scrub = false,
  start = "top 85%",
  end = "bottom bottom",
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(el, {
          type,
          mask: type,
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: "visible" });
            const targets = self[type];
            return gsap.from(targets, {
              yPercent: 110,
              duration: duration.reveal,
              ease: scrub ? "none" : ease.outExpo,
              stagger: type === "chars" ? staggers.chars * 2 : staggers.lines,
              scrollTrigger: scrub
                ? { trigger: el, start: "top bottom", end, scrub: 0.6 }
                : { trigger: el, start, once: true },
            });
          },
        });
        return () => split.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { visibility: "visible" });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={cn("will-reveal", className)} {...rest}>
      {children}
    </Tag>
  );
}
