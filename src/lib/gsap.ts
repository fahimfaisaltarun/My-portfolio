"use client";

/**
 * The ONLY place GSAP plugins are registered. Import gsap, ScrollTrigger,
 * SplitText and useGSAP from here — never straight from "gsap" in components —
 * so plugins are registered exactly once and tree-shaking stays predictable.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import { duration, ease } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP);
  gsap.defaults({ ease: ease.outExpo, duration: duration.base });
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP };
