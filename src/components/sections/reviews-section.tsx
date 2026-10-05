import { Award, Star } from "lucide-react";
import { approvedTestimonials, badges, profile, proofStats, reviewsCopy } from "@/data";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { PillLink } from "@/components/ui/pill-link";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Proof band on a light "paper" background: count-up stats, Upwork badge and
 * — once real, approved quotes exist in src/data/proof.ts — testimonial cards.
 */
export function ReviewsSection() {
  const upwork = profile.socials.find((s) => s.platform === "upwork");

  return (
    <section id="reviews" data-theme="light" aria-labelledby="reviews-title" className="section-y">
      <div className="container-page">
        <SectionHeading copy={reviewsCopy} id="reviews-title" index="05" align="split" />

        <Reveal
          as="dl"
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4"
        >
          {proofStats.map((stat) => (
            <div
              key={stat.label}
              data-reveal
              className="will-reveal flex flex-col gap-3 bg-background p-6 sm:p-8"
            >
              <dt className="order-2 text-small text-muted">{stat.label}</dt>
              <dd className="order-1 text-h2 font-extrabold tracking-display">
                {typeof stat.value === "number" ? (
                  <Counter value={stat.value} suffix={stat.suffix} />
                ) : (
                  stat.value
                )}
              </dd>
            </div>
          ))}
        </Reveal>

        {approvedTestimonials.length > 0 && (
          <Reveal as="ul" className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {approvedTestimonials.map((t) => (
              <li key={t.name} data-reveal className="will-reveal">
                <figure className="flex h-full flex-col rounded-3xl border border-border bg-surface p-7">
                  {t.rating && (
                    <div
                      className="flex gap-1 text-accent"
                      aria-label={`${t.rating} out of 5 stars`}
                    >
                      {Array.from({ length: Math.round(t.rating) }, (_, i) => (
                        <Star key={i} aria-hidden className="size-4 fill-current" />
                      ))}
                    </div>
                  )}
                  <blockquote className="mt-5 flex-1 text-lead">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 text-small">
                    <span className="font-bold">{t.name}</span>
                    {(t.role || t.company) && (
                      <span className="block text-muted">
                        {[t.role, t.company].filter(Boolean).join(", ")}
                      </span>
                    )}
                  </figcaption>
                </figure>
              </li>
            ))}
          </Reveal>
        )}

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <p className="inline-flex items-center gap-3 text-lead font-bold tracking-snug">
            <Award aria-hidden className="size-6 text-accent" />
            {badges[0]}
          </p>
          {upwork && (
            <PillLink href={upwork.url} variant="outline">
              Read reviews on Upwork
            </PillLink>
          )}
        </div>
      </div>
    </section>
  );
}
