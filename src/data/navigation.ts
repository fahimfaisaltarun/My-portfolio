import type { NavItem } from "./types";

/**
 * Main navigation. Hash links point at homepage sections by id; until a
 * section exists the link simply does nothing. `#contact` is the footer.
 */
export const mainNav: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
];

/** Footer call-to-action copy. Adapted from the Upwork profile pitch. */
export const footerCta = {
  eyebrow: "Let's work together",
  headline: "Ready to grow your brand?",
  emphasis: "grow",
  blurb:
    "Tell me about your brand and goals — I'll tell you honestly whether I'm the right fit before you spend a cent.",
} as const;
