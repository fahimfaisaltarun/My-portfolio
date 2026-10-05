"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

let lenisInstance: Lenis | null = null;

/**
 * The active Lenis instance, or null (reduced motion, or not mounted yet).
 * Call it inside event handlers — it's not reactive, so don't read it during render.
 */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/** Smooth-scroll to an element or y position, falling back to native scrolling. */
export function scrollToTarget(target: HTMLElement | number) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { force: true });
    return;
  }
  const top = typeof target === "number" ? target : target.getBoundingClientRect().top + scrollY;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}

/**
 * Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger and Lenis
 * share one clock (no jitter). Disabled entirely for prefers-reduced-motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      root.classList.add("reduced-motion");
      return;
    }

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return children;
}
