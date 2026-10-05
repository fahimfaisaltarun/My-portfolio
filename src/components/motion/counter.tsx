"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ease } from "@/lib/motion";

type Props = { value: number; prefix?: string; suffix?: string; className?: string };

const format = (n: number) => Math.round(n).toLocaleString("en-US");

/**
 * Number that counts up from 0 when scrolled into view. The final value is
 * server-rendered (correct for SEO and no-JS); the count-up is client-only.
 */
export function Counter({ value, prefix = "", suffix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const state = { n: 0 };
        el.textContent = `${prefix}${format(0)}${suffix}`;
        gsap.to(state, {
          n: value,
          duration: 2.2,
          ease: ease.outExpo,
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = `${prefix}${format(state.n)}${suffix}`;
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(value)}
      {suffix}
    </span>
  );
}
