import { marqueeItems } from "@/data";
import { Marquee } from "@/components/motion/marquee";

/** Big scrolling strip of skills/platforms between hero and services. */
export function MarqueeBand() {
  return (
    <div className="border-y border-border py-6 sm:py-8">
      <Marquee speed={45} label="Skills and platforms">
        <ul className="flex items-center">
          {marqueeItems.map((item) => (
            <li
              key={item}
              className="flex items-center gap-8 pr-8 text-h3 font-bold tracking-tight whitespace-nowrap sm:gap-12 sm:pr-12"
            >
              {item}
              <span aria-hidden className="text-lead text-accent">
                ✦
              </span>
            </li>
          ))}
        </ul>
      </Marquee>
    </div>
  );
}
