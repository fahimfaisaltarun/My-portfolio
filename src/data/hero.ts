import { agency } from "./agency";
import { badges, stats } from "./proof";

const hours = stats[0];

/**
 * Homepage hero copy. Kept deliberately short: name (h1), one promise, one
 * supporting line, two actions, three proof points.
 */
export const hero = {
  /** Promise line. `serif` renders in accent serif, `pill` in the red pill. */
  tagline: { before: "Turning", serif: "scrollers", middle: "into", pill: "customers" },
  supporting:
    "Social media strategy, short-form video and websites that turn attention into revenue.",
  secondaryCta: { label: "See my work", href: "/#work" },
  proof: [
    badges[0],
    `${hours.value.toLocaleString("en-US")}${hours.suffix ?? ""} hours delivered`,
    `Founder of ${agency.name} · ${agency.teamSize} team`,
  ],
  /** Text circling the rotating badge on the portrait. */
  badgeText: "Open to new projects • Top Rated on Upwork • ",
  location: "Bangladesh · Working worldwide",
} as const;
