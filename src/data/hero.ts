import { agency } from "./agency";
import { badges, stats } from "./proof";

const hours = stats.find((stat) => stat.id === "hours")!;

/**
 * Homepage hero copy. Kept deliberately short: one promise (the big headline),
 * name (h1), one supporting line, two actions, three proof points — plus the
 * labels for the "studio" illustration (editor on a laptop → reel on a phone).
 */
export const hero = {
  /** Promise, one line each. `serif` renders in accent serif; `end` gets a red full stop. */
  tagline: { before: "Turning", serif: "scrollers", middle: "into", end: "customers" },
  supporting:
    "Social media strategy, short-form video and websites that turn attention into revenue.",
  secondaryCta: { label: "See my work", href: "/#work" },
  proof: [
    badges[0],
    `${hours.value.toLocaleString("en-US")}${hours.suffix ?? ""} hours delivered`,
    `Founder of ${agency.name} · ${agency.teamSize} team`,
  ],
  /** Decorative editor → phone illustration. All of it is aria-hidden except this label. */
  studio: {
    label: "Illustration: editing a short-form reel on a laptop and publishing it to a phone",
    fileName: "Restaurant_reel_v3 — 1080 × 1920",
    exportLabel: "Export",
    mediaLabel: "Media",
    inspectorLabel: "Inspector",
    /** Inspector sliders: label + fill (0–100). `accent` draws it in red. */
    inspector: [
      { label: "Hook", value: 78, accent: true },
      { label: "Pacing", value: 64, accent: false },
      { label: "Captions", value: 90, accent: false },
      { label: "Call to action", value: 100, accent: true },
    ],
    /**
     * The reel being edited, in order. Each shot is one clip on the timeline
     * (V1), its caption on the caption track (T1), and what the preview plays
     * while the playhead is over it. `media` is a design-showcase slug or
     * "portrait"; `length` is seconds of loop time. The portrait shot is the
     * one shown when there is no animation.
     */
    shots: [
      { media: "restaurant", length: 3, caption: "Stop the scroll" },
      { media: "portrait", length: 2.5, caption: "Hi, I’m Fahim" },
      { media: "spa", length: 3, caption: "Turning scrollers" },
      { media: "fashion", length: 2.5, caption: "into customers" },
      { media: "gym", length: 3, caption: "Let’s grow your brand" },
    ],
    /** Reel length shown on the ruler and timecode, in seconds. */
    duration: 30,
    publishLabel: "Publish",
  },
} as const;
