import type { SectionCopy, Testimonial } from "./types";

/**
 * Client reviews — copied word for word from Upwork (owner has permission to
 * publish names and feedback). The testimonials section renders only entries
 * with `approved: true`, and hides itself entirely while there are none.
 *
 * Add one object per review:
 * {
 *   quote: "Fahim did a great job creating content…",   // exact review text
 *   name: "Jessica B.",                                 // as shown on Upwork
 *   role: "Founder",                                    // optional
 *   company: "Glow Med Spa",                            // optional
 *   project: "Instagram Content Creator | Medspa",      // Upwork job title
 *   rating: 5,                                          // Upwork stars
 *   date: "2026-02",                                    // optional
 *   source: "upwork",
 *   approved: true,
 * }
 */
export const testimonials: Testimonial[] = [];

export const testimonialsCopy: SectionCopy = {
  eyebrow: "Client reviews",
  title: "Words from real clients",
  emphasis: "real",
  intro: "Straight from my Upwork reviews — unedited.",
};
