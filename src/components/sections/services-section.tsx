import { services, servicesCopy } from "@/data";
import { ServiceIllustration } from "@/components/illustrations/service-illustrations";
import { DrawOnScroll } from "@/components/motion/draw-on-scroll";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { withEmphasis } from "@/lib/text";

/** Four featured services as large cards, each with a self-drawing illustration. */
export function ServicesSection() {
  const featured = services.filter((service) => service.featured);

  return (
    <section id="services" aria-labelledby="services-title" className="section-y">
      <div className="container-page">
        <SectionHeading copy={servicesCopy} id="services-title" index="01" align="split" />

        <Reveal as="ul" className="mt-16 grid gap-5 md:grid-cols-2">
          {featured.map((service, index) => (
            <li
              key={service.id}
              data-reveal
              className="group will-reveal relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface p-7 transition-colors duration-500 hover:border-border-strong sm:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="label">{service.label}</span>
                <span className="text-small text-muted tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <DrawOnScroll className="mx-auto my-8 w-full max-w-[17rem] transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
                <ServiceIllustration id={service.id} />
              </DrawOnScroll>

              <h3 className="mt-auto text-h3 font-extrabold tracking-tight">
                {withEmphasis(service.title, service.emphasis)}
              </h3>
              <p className="mt-3 max-w-sm text-muted">{service.summary}</p>

              <ul
                className="mt-6 flex flex-wrap gap-2"
                aria-label={`${service.label} deliverables`}
              >
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-3 py-1 text-caption text-foreground/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {/* Accent glow on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-24 -bottom-24 size-64 rounded-full bg-accent/0 blur-3xl transition-colors duration-700 group-hover:bg-accent/15"
              />
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
