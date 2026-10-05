import type { SectionCopy, Testimonial } from "./types";

/**
 * Client reviews — copied word for word from Upwork (owner has permission to
 * publish names and feedback). Upwork work history doesn't show client names,
 * so `name` is the client's industry unless a name was given (Jennett T.).
 * Contracts without written feedback are not listed. Never add rates/earnings.
 *
 * Format:
 * {
 *   quote: "…exact review text…",
 *   name: "Jessica B." | "Medspa & beauty clinic",
 *   role: "Verified Upwork client",
 *   project: "Upwork job title",
 *   rating: 5,
 *   date: "2026-02",
 *   endorsements: ["Reliable"],
 *   source: "upwork",
 *   approved: true,
 * }
 */

const upwork = {
  role: "Verified Upwork client",
  rating: 5,
  source: "upwork",
  approved: true,
} as const;

// Newest first; the strongest review leads.
export const testimonials: Testimonial[] = [
  {
    ...upwork,
    quote:
      "Fahim has been an incredible support in managing and growing our social media presence across Facebook, Instagram, and TikTok. His strength in ad management, content strategy, and technical support has made a real difference to our overall performance. From staying on top of trends to ensuring everything runs smoothly behind the scenes, he has helped elevate our brand and engagement. Highly recommend for anyone looking to grow their online presence.",
    name: "Jennett T.",
    date: "2026-04",
  },
  {
    ...upwork,
    quote:
      "Fahim did a great job creating content and supporting our paid ads. Professional, responsive, and easy to work with. Highly recommended!",
    name: "Sports nutrition brand",
    project: "Social Media Content Creator & Paid Ads Specialist",
    date: "2026-06",
    endorsements: [
      "Committed to Quality",
      "Solution Oriented",
      "Accountable for Outcomes",
      "Professional",
    ],
  },
  {
    ...upwork,
    quote: "Great work on both digital marketing and website management. Highly recommended!",
    name: "Real estate brand",
    project: "Digital Marketing Manager & Website Specialist",
    date: "2026-04",
    endorsements: ["Committed to Quality", "Solution Oriented", "Accountable for Outcomes"],
  },
  {
    ...upwork,
    quote: "Great communication!",
    name: "Hookah lounge",
    project: "Social Media Promotion",
    date: "2026-04",
    endorsements: ["Clear Communicator"],
  },
  {
    ...upwork,
    quote:
      "Fahim did an excellent job creating Instagram content for our medspa. He understood the tone we needed and delivered everything on schedule. Highly recommended!",
    name: "Medspa & beauty clinic",
    project: "Instagram Content Creator",
    date: "2026-02",
    endorsements: ["Reliable", "Committed to Quality", "Solution Oriented", "Clear Communicator"],
  },
  {
    ...upwork,
    quote:
      "Fahim delivered clear, effective social media strategies for our fitness brand. Professional, reliable, and great to work with!",
    name: "Fitness, wellness & gym center",
    project: "Social Media Marketing Strategist",
    date: "2025-11",
    endorsements: ["Reliable", "Collaborative", "Committed to Quality", "Detail Oriented"],
  },
  {
    ...upwork,
    quote: "Hire him he is the best and I hope to work with him again.",
    name: "Multi-platform brand",
    project: "Social Media Content Creator — LinkedIn, Facebook, Instagram & TikTok",
    date: "2025-11",
    endorsements: ["Collaborative"],
  },
  {
    ...upwork,
    quote: "Very professional and easy to work with. Looking forward to more projects together.",
    name: "Ongoing content client",
    project: "Creative Social Media Content Creator",
    date: "2025-05",
    endorsements: ["Professional", "Collaborative"],
  },
  {
    ...upwork,
    quote:
      "Tarun is an amazing content creator. He has an amazing eye for content design. Will definitely hire him again.",
    name: "Content design client",
    project: "Social Media Content Creator & Canva Expert",
    date: "2022-04",
    endorsements: ["Committed to Quality"],
  },
  {
    ...upwork,
    quote:
      "Fahim is really quick and the best at his field. I am really impressed with his effort. Will hire him again in the near future.",
    name: "Canva design client",
    project: "Canva Expert",
    date: "2022-04",
    endorsements: ["Reliable", "Committed to Quality"],
  },
  {
    ...upwork,
    quote:
      "He is an amazing content creator. In fact, one of the best on Upwork. Will use his skills again in the future.",
    name: "Social media client",
    project: "Social Media Expert & Content Creator",
    date: "2022-04",
    endorsements: ["Committed to Quality"],
  },
  {
    ...upwork,
    quote: "Amazing work done by him. He was very quick and very responsive. 100% recommended.",
    name: "Branding client",
    project: "Business Card Designer",
    date: "2022-04",
    endorsements: ["Committed to Quality", "Reliable", "Clear Communicator"],
  },
];

export const testimonialsCopy: SectionCopy = {
  eyebrow: "Client reviews",
  title: "Words from real clients",
  emphasis: "real",
  intro: "Straight from my Upwork reviews — unedited.",
};
