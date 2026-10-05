"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  /** Seconds for one full loop. Different values per column = organic feel. */
  duration?: number;
  /** Scroll downward instead of upward. */
  reverse?: boolean;
  className?: string;
};

/**
 * Endless vertical scroll of its children (rendered twice; the copy is
 * hidden from assistive tech). Eases to a stop on hover/focus so people can
 * read, pauses off-screen, and is static for reduced motion (copy hidden).
 */
export function VerticalLoop({ children, duration = 20, reverse = false, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      const track = root?.querySelector<HTMLElement>("[data-loop-track]");
      if (!root || !track) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const loop = gsap.fromTo(
          track,
          { yPercent: reverse ? -50 : 0 },
          { yPercent: reverse ? 0 : -50, duration, ease: "none", repeat: -1 },
        );

        const slow = () => gsap.to(loop, { timeScale: 0, duration: 0.6, overwrite: true });
        const resume = () => gsap.to(loop, { timeScale: 1, duration: 0.6, overwrite: true });
        root.addEventListener("pointerenter", slow);
        root.addEventListener("pointerleave", resume);
        root.addEventListener("focusin", slow);
        root.addEventListener("focusout", resume);

        const visibility = ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
        });

        return () => {
          visibility.kill();
          root.removeEventListener("pointerenter", slow);
          root.removeEventListener("pointerleave", resume);
          root.removeEventListener("focusin", slow);
          root.removeEventListener("focusout", resume);
        };
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      <div data-loop-track className="flex flex-col">
        <div className="flex flex-col gap-5 pb-5">{children}</div>
        <div className="flex flex-col gap-5 pb-5 motion-reduce:hidden" aria-hidden inert>
          {children}
        </div>
      </div>
    </div>
  );
}
