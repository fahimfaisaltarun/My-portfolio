import type { Profile } from "./types";

// Source: Upwork freelancer profile (fetched 2026-10-05) + owner's notes in chat.
export const profile: Profile = {
  fullName: "Fahim Faisal Tarun",
  shortName: "Fahim",
  // Positioning (decided 2026-10-05): founder + marketer — personal brand first, agency as proof.
  headline: "Social Media Marketer & Founder of BrandEzzy",
  summary:
    "Founder of BrandEzzy and Top Rated freelancer on Upwork. I help brands grow with social media marketing, scroll-stopping short-form video, and websites built on WordPress, Wix and Shopify.",
  bio: [
    // TODO(owner): replace with your own words (2–3 short paragraphs).
    "I'm a social media marketer, content strategist and founder of BrandEzzy, a digital agency working with brands worldwide.",
    "I don't believe in random posting. I build content systems — strategy, design, short-form video and consistent publishing — that help brands stay professional and keep growing.",
  ],
  location: { country: "Bangladesh", timezone: "Asia/Dhaka" },
  email: "fahimfaisaltarun@gmail.com",
  languages: ["English"],
  portrait: {
    type: "image",
    src: "/images/profile/fahim-faisal-tarun.webp",
    alt: "Fahim Faisal Tarun, social media marketer and founder of BrandEzzy, in a light suit and glasses",
    width: 1564,
    height: 1710,
  },
  introVideo: "https://youtu.be/HxOulkAyNUc",
  socials: [
    {
      platform: "upwork",
      label: "Upwork",
      url: "https://www.upwork.com/freelancers/~01078c58fef2299030",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/fahimfaisaltarun/",
    },
    {
      platform: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/fahim__faisal__/",
    },
    { platform: "x", label: "X", url: "https://x.com/TarunFahim" },
    { platform: "facebook", label: "Facebook", url: "https://www.facebook.com/fahimfaisaltarun/" },
  ],
  // Decided 2026-10-05: hiring through Upwork is the primary conversion.
  primaryCta: {
    label: "Hire me on Upwork",
    href: "https://www.upwork.com/freelancers/~01078c58fef2299030",
  },
  availability: "Open to new projects",
};
