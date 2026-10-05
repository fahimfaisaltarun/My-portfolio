import type { SectionCopy } from "@/data";
import { SplitReveal } from "@/components/motion/split-reveal";
import { withEmphasis } from "@/lib/text";
import { cn } from "@/lib/utils";

type Props = {
  copy: SectionCopy;
  /** Must match the section's aria-labelledby. */
  id: string;
  /** e.g. "01" — shown before the eyebrow. */
  index?: string;
  className?: string;
  align?: "left" | "split";
};

/**
 * Standard section header: "(01) Eyebrow" label, h2 with accent word and a
 * masked line reveal, optional one-line intro. `split` puts the intro to the
 * right of the title on desktop.
 */
export function SectionHeading({ copy, id, index, className, align = "left" }: Props) {
  return (
    <header
      className={cn(
        "grid gap-6",
        align === "split" && "lg:grid-cols-12 lg:items-end lg:gap-12",
        className,
      )}
    >
      <div className={cn(align === "split" && "lg:col-span-8")}>
        <p className="label">
          {index && <span className="mr-3 text-accent">({index})</span>}
          {copy.eyebrow}
        </p>
        <SplitReveal as="h2" id={id} className="mt-5 text-h2 font-extrabold tracking-display">
          {withEmphasis(copy.title, copy.emphasis)}
        </SplitReveal>
      </div>
      {copy.intro && (
        <p
          className={cn(
            "max-w-md text-lead text-muted",
            align === "split" && "lg:col-span-4 lg:justify-self-end lg:text-right",
          )}
        >
          {copy.intro}
        </p>
      )}
    </header>
  );
}
