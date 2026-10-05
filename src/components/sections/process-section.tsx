import { processCopy, processSteps } from "@/data";
import { Reveal } from "@/components/motion/reveal";
import { ScrollLine } from "@/components/motion/scroll-line";
import { SectionHeading } from "@/components/ui/section-heading";

/** Four-step process with a progress line that fills as you scroll. */
export function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-title" className="section-y">
      <div className="container-page">
        <SectionHeading copy={processCopy} id="process-title" index="03" />

        <div className="relative mt-16">
          {/* Desktop: horizontal line across the step markers */}
          <ScrollLine
            axis="x"
            className="absolute top-[0.6rem] right-0 left-0 hidden h-px lg:block"
          />
          {/* Mobile: vertical line down the left */}
          <ScrollLine axis="y" className="absolute top-2 bottom-2 left-[0.6rem] w-px lg:hidden" />

          <Reveal as="ol" className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, index) => (
              <li
                key={step.title}
                data-reveal
                className="will-reveal relative pl-12 lg:pt-14 lg:pl-0"
              >
                <span
                  aria-hidden
                  className="absolute top-0 left-0 grid size-5 place-items-center rounded-full border border-accent bg-background"
                >
                  <span className="size-2 rounded-full bg-accent" />
                </span>
                <p className="text-h1 leading-none font-extrabold tracking-display text-surface-raised">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-h3 font-extrabold tracking-tight">{step.title}</h3>
                <p className="mt-2 max-w-xs text-muted">{step.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
