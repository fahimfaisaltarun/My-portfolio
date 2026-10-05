import type { NavItem } from "./types";

/**
 * Main navigation, in homepage section order. Hash links point at section
 * ids; `#contact` is the footer.
 */
export const mainNav: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
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
