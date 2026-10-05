/**
 * Single source of truth for all portfolio content.
 * Import from "@/data" — never hard-code copy, numbers or links in components.
 */
export { profile } from "./profile";
export { agency } from "./agency";
export { mainNav, footerCta } from "./navigation";
export { hero } from "./hero";
export { services, industries, platforms, tools } from "./services";
export { stats, badges, work, testimonials, credentials } from "./proof";
export { designShowcase, designShowcaseSource } from "./design-showcase";
export type * from "./types";

import { work as allWork, testimonials as allTestimonials } from "./proof";
import { designShowcase as allShowcase } from "./design-showcase";

/** Work items that are ready to render. */
export const publishedWork = allWork.filter((item) => item.status === "published");

/** Testimonials the owner has approved for display. */
export const approvedTestimonials = allTestimonials.filter((t) => t.approved);

/** Design showcase boards flagged for the homepage. */
export const featuredShowcase = allShowcase.filter((board) => board.featured);
