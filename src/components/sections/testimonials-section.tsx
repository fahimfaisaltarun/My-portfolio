import { approvedTestimonials, testimonialsCopy, type Testimonial } from "@/data";
import { VerticalLoop } from "@/components/motion/vertical-loop";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { cn } from "@/lib/utils";

/** Round-robin split so every column gets a similar mix and length. */
function toColumns(items: Testimonial[], count: number): Testimonial[][] {
  const columns: Testimonial[][] = Array.from({ length: count }, () => []);
  items.forEach((item, index) => columns[index % count].push(item));
  return columns;
}

/**
 * Clip + fade the columns at top and bottom. Kept here (not exported from the
 * "use client" VerticalLoop module): non-component values imported from a client
 * module into a Server Component become client references, not strings.
 */
const MASK =
  "overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]";

/** Loop speed per column (seconds); different speeds keep columns out of sync. */
const DURATIONS = [34, 42, 38];

/**
 * One layout per breakpoint so every review is reachable at every width:
 * all reviews in one column on mobile, split in two on tablet, three on desktop.
 * Inactive layouts are display:none (not in the accessibility tree).
 */
const LAYOUTS = [
  { columns: 1, className: "grid md:hidden" },
  { columns: 2, className: "hidden md:grid md:grid-cols-2 lg:hidden" },
  { columns: 3, className: "hidden lg:grid lg:grid-cols-3" },
];

/**
 * Client reviews in endlessly scrolling columns. Renders nothing until
 * approved reviews exist in src/data/testimonials.ts — never placeholder quotes.
 */
export function TestimonialsSection() {
  if (approvedTestimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      data-theme="light"
      aria-labelledby="testimonials-title"
      className="pb-[clamp(5rem,3rem+8vw,11rem)]"
    >
      <div className="container-page">
        <SectionHeading copy={testimonialsCopy} id="testimonials-title" index="06" align="split" />

        <div className="mt-14">
          {LAYOUTS.map((layout) => {
            // Fewer reviews than columns → fewer columns rather than empty ones.
            const count = Math.min(layout.columns, approvedTestimonials.length);
            return (
              <div
                key={layout.columns}
                className={cn(
                  layout.className,
                  MASK,
                  "max-h-[46rem] gap-5 motion-reduce:max-h-none motion-reduce:[mask-image:none]",
                )}
              >
                {toColumns(approvedTestimonials, count).map((column, index) => (
                  <VerticalLoop key={index} duration={DURATIONS[index]} reverse={index === 1}>
                    {column.map((testimonial) => (
                      <TestimonialCard
                        key={`${testimonial.name}-${testimonial.quote.slice(0, 24)}`}
                        testimonial={testimonial}
                      />
                    ))}
                  </VerticalLoop>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
