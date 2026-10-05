import Image from "next/image";
import { hero, profile } from "@/data";
import { HeroMotion } from "@/components/motion/hero-motion";
import { PillLink } from "@/components/ui/pill-link";

/** Circular rotating text badge (decorative). */
function RotatingBadge({ text }: { text: string }) {
  return (
    <div
      data-hero-badge
      aria-hidden
      className="absolute -top-8 right-4 grid size-28 place-items-center rounded-full bg-accent text-accent-foreground sm:size-32 lg:-top-10 lg:right-auto lg:-left-10"
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full animate-spin-slow p-1.5 motion-reduce:animate-none"
      >
        <defs>
          <path id="hero-badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        {/* Tracking tuned so the text (~234 units) nearly closes the r=38 circle (238.8).
            Chrome ignores textLength on textPath, so spacing is set via letter-spacing.
            Re-tune if badgeText changes length. */}
        <text className="fill-current text-[8px] font-semibold tracking-[0.105em] uppercase">
          <textPath href="#hero-badge-circle">{text}</textPath>
        </text>
      </svg>
      <span className="size-3 rounded-full bg-accent-foreground" />
    </div>
  );
}

/**
 * Homepage hero: name (the page's only h1), one promise, supporting line,
 * CTAs, proof points, and a cinematic portrait. Copy lives in src/data/hero.ts.
 */
export function HeroSection() {
  const { portrait } = profile;

  return (
    <HeroMotion>
      <section
        id="top"
        aria-labelledby="hero-title"
        className="relative isolate overflow-hidden pt-[calc(var(--header-height)+2rem)] pb-16 lg:flex lg:min-h-dvh lg:items-center lg:pb-20"
      >
        {/* Ambient ember glow behind the portrait */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/3 right-[-20%] -z-10 aspect-square w-[70vw] max-w-[56rem] rounded-full bg-ember-700/25 blur-[120px]"
        />

        <div className="container-page grid w-full gap-x-12 gap-y-14 lg:grid-cols-12 lg:items-center">
          {/* Copy */}
          <div data-hero-content className="lg:col-span-7">
            <p data-hero-label className="label">
              {profile.headline}
            </p>

            <h1
              id="hero-title"
              data-hero-title
              className="mt-5 text-h1 font-extrabold tracking-display"
            >
              {profile.fullName}
            </h1>

            <p data-hero-tagline className="mt-6 text-h2 font-bold tracking-tight text-balance">
              {hero.tagline.before}{" "}
              <span className="accent-serif text-accent">{hero.tagline.serif}</span>{" "}
              {hero.tagline.middle}{" "}
              <span data-hero-pill className="pill-accent accent-serif">
                {hero.tagline.pill}
              </span>
            </p>

            <p data-hero-fade className="mt-8 max-w-xl text-lead text-muted">
              {hero.supporting}
            </p>

            <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
              <PillLink href={profile.primaryCta.href} size="lg">
                {profile.primaryCta.label}
              </PillLink>
              <PillLink href={hero.secondaryCta.href} variant="outline" size="lg">
                {hero.secondaryCta.label}
              </PillLink>
            </div>

            <ul
              data-hero-fade
              aria-label="Highlights"
              className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6 text-small text-muted"
            >
              {hero.proof.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div
              data-hero-media
              className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface lg:max-h-[calc(100dvh-var(--header-height)-6rem)]"
            >
              <div data-hero-image className="absolute inset-x-0 -inset-y-[8%]">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  width={portrait.width}
                  height={portrait.height}
                  preload
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw"
                  className="size-full object-cover object-[50%_20%] brightness-90 contrast-[1.08] grayscale transition-[filter] duration-1000 ease-out-expo group-hover:brightness-100 group-hover:grayscale-0 motion-reduce:transition-none"
                />
              </div>
              {/* Ember light cast + fade into the page */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-tr from-ember-700/45 via-transparent to-transparent mix-blend-multiply transition-opacity duration-1000 group-hover:opacity-0"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background via-background/40 to-transparent"
              />
              <p className="absolute bottom-5 left-5 flex items-center gap-2 text-small text-foreground/90">
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                {hero.location}
              </p>
            </div>
            <RotatingBadge text={hero.badgeText} />
          </div>
        </div>

        {/* Scroll cue (desktop) */}
        <div
          aria-hidden
          data-hero-fade
          className="absolute bottom-8 left-[var(--gutter)] hidden items-center gap-3 text-caption tracking-label text-muted uppercase lg:flex"
        >
          <span className="relative h-10 w-px overflow-hidden bg-border">
            <span className="absolute inset-0 animate-scroll-cue bg-foreground motion-reduce:animate-none" />
          </span>
          Scroll
        </div>
      </section>
    </HeroMotion>
  );
}
