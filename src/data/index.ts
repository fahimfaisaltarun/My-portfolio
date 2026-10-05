/**
 * Single source of truth for all portfolio content.
 * Import from "@/data" — never hard-code copy, numbers or links in components.
 */
export { profile } from "./profile";
export { agency } from "./agency";
export { mainNav, footerCta } from "./navigation";
export { hero } from "./hero";
export {
  marqueeItems,
  servicesCopy,
  workCopy,
  processCopy,
  processSteps,
  aboutCopy,
  reviewsCopy,
  proofStats,
} from "./home";
export { services, industries, platforms, tools } from "./services";
export { stats, badges, work, credentials } from "./proof";
export { testimonials, testimonialsCopy } from "./testimonials";
export { designShowcase, designShowcaseSource } from "./design-showcase";
export type * from "./types";

import { work as allWork } from "./proof";
import { testimonials as allTestimonials } from "./testimonials";
import { designShowcase as allShowcase } from "./design-showcase";

/** Work items that are ready to render. */
export const publishedWork = allWork.filter((item) => item.status === "published");

/** Testimonials the owner has approved for display. */
export const approvedTestimonials = allTestimonials.filter((t) => t.approved);

/** Design showcase boards flagged for the homepage. */
export const featuredShowcase = allShowcase.filter((board) => board.featured);
