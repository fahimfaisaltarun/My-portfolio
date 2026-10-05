import { agency } from "./agency";
import { designShowcase } from "./design-showcase";
import { stats } from "./proof";
import type { SectionCopy } from "./types";

/**
 * Homepage section copy (hero copy lives in hero.ts). Rule: one strong
 * headline per section, one short line under it — people scan, not read.
 */

const stat = (id: "hours" | "jobs" | "reviews") => stats.find((s) => s.id === id)!;
export const industryCount = new Set(designShowcase.map((board) => board.sector)).size;

export const marqueeItems = [
  "Social media marketing",
  "Instagram Reels",
  "TikTok",
  "Meta ads",
  "Google ads",
  "Content strategy",
  "WordPress",
  "Shopify",
  "Wix",
  "Branding",
] as const;

export const servicesCopy: SectionCopy = {
  eyebrow: "Services",
  title: "Four ways I grow your brand",
  emphasis: "grow",
  intro: "One partner for content, video, ads and web.",
};

export const workCopy: SectionCopy = {
  eyebrow: "Selected work",
  title: "Designs that get noticed",
  emphasis: "noticed",
  intro: `Social media design for ${industryCount} industries. Tap any board to see it full size.`,
};

export const processCopy: SectionCopy = {
  eyebrow: "Process",
  title: "From scroll to sale in four steps",
  emphasis: "sale",
};

export const processSteps = [
  { title: "Audit", text: "I study your brand, audience and competitors." },
  { title: "Strategy", text: "A clear plan: platforms, content pillars, calendar." },
  { title: "Create", text: "Posts, Reels and ads made to stop the scroll." },
  { title: "Grow", text: "Track, test and scale what works. Every week." },
] as const;

export const aboutCopy = {
  eyebrow: "About",
  /** Big statement revealed word by word on scroll. From the Upwork profile. */
  statement:
    "I don't believe in random posting. I build content systems that make brands consistent, recognisable and profitable.",
  highlight: ["random posting.", "profitable."],
  agencyLine: `In 2024 I founded ${agency.name} — now a ${agency.teamSize} person team serving brands worldwide.`,
} as const;

export const reviewsCopy: SectionCopy = {
  eyebrow: "Proof",
  title: "Proof, not promises",
  emphasis: "promises",
  intro: "Real numbers from real client work.",
};

/** Proof stats. Numbers count up on scroll; strings render as-is. */
export const proofStats: { value: number | string; suffix?: string; label: string }[] = [
  { value: stat("hours").value, suffix: "+", label: "Hours delivered on Upwork" },
  { value: stat("reviews").value, label: "Client reviews" },
  { value: industryCount, label: "Industries designed for" },
  { value: agency.teamSize, label: `People on the ${agency.name} team` },
];
