import Image from "next/image";
import { Star } from "lucide-react";
import type { Testimonial } from "@/data";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const sourceLabel: Record<Testimonial["source"], string> = {
  upwork: "Upwork",
  direct: "Client",
  linkedin: "LinkedIn",
  google: "Google",
};

/** One review card: stars, quote, project, and the client's name. */
export function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  const byline = [t.role, t.company].filter(Boolean).join(", ");

  return (
    <figure className="w-full rounded-3xl border border-border bg-background p-7 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        {t.rating ? (
          <div
            className="flex gap-0.5 text-accent"
            role="img"
            aria-label={`Rated ${t.rating} out of 5`}
          >
            {Array.from({ length: Math.round(t.rating) }, (_, i) => (
              <Star key={i} aria-hidden className="size-4 fill-current" />
            ))}
          </div>
        ) : (
          <span />
        )}
        <span className="rounded-full border border-border px-2.5 py-0.5 text-caption text-muted">
          {sourceLabel[t.source]}
        </span>
      </div>

      <blockquote className="mt-5 text-body leading-relaxed">
        <p>“{t.quote}”</p>
      </blockquote>

      {t.project && <p className="mt-4 text-small text-muted">Project: {t.project}</p>}

      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        {t.avatar ? (
          <Image
            src={t.avatar}
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-small font-bold text-accent-foreground"
          >
            {initials(t.name)}
          </span>
        )}
        <span className="flex flex-col">
          <span className="leading-5 font-bold tracking-tight">{t.name}</span>
          {byline && <span className="text-small leading-5 text-muted">{byline}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
