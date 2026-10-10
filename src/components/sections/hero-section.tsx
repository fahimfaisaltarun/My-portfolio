import Image from "next/image";
import { Heart, MessageCircle, Send } from "lucide-react";
import { designShowcase, hero, profile } from "@/data";
import { HeroMotion } from "@/components/motion/hero-motion";
import { PillLink } from "@/components/ui/pill-link";
import { cn } from "@/lib/utils";

const boards = Object.fromEntries(designShowcase.map((board) => [board.slug, board.image]));
const binBoards = designShowcase.slice(0, 6);
const reelBoards = [boards.restaurant, boards.spa, boards.fashion];

/** Shots with their start/end as fractions of the timeline (0–1). */
const totalLength = hero.studio.shots.reduce((sum, shot) => sum + shot.length, 0);
const shots = hero.studio.shots.map((shot, i, all) => {
  const before = all.slice(0, i).reduce((sum, s) => sum + s.length, 0);
  return {
    ...shot,
    start: before / totalLength,
    end: (before + shot.length) / totalLength,
    image: shot.media === "portrait" ? profile.portrait : boards[shot.media],
  };
});
/** Without animation the playhead rests mid-portrait-shot and the preview shows it. */
const restShot = shots.find((shot) => shot.media === "portrait") ?? shots[0];
const restAt = (restShot.start + restShot.end) / 2;

/** Deterministic waveform so server and client render the same bars. */
const waveform = Array.from({ length: 72 }, (_, i) =>
  Math.min(
    95,
    22 + Math.round(Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.17)) * 68 + (i % 4) * 3),
  ),
);

const pad = (n: number) => String(n).padStart(2, "0");
const ruler = Array.from({ length: 7 }, (_, i) => `00:${pad((hero.studio.duration / 6) * i)}`);

/**
 * The "studio": a laptop running a video editor (media bin, portrait preview,
 * inspector, timeline) publishing to a phone. Purely illustrative — one
 * role="img" label for assistive tech. Every size is in `cqw` (percent of the
 * stage width), so the whole scene scales as one picture at any breakpoint.
 * `data-hero-*` hooks are animated by HeroMotion; nothing GSAP moves carries a
 * CSS transform of its own (rotation lives on inner elements).
 */
function Studio() {
  const { studio } = hero;
  const { portrait } = profile;

  return (
    <div
      data-hero-stage
      role="img"
      aria-label={studio.label}
      className="@container relative aspect-[100/72] w-full select-none"
    >
      {/* Laptop */}
      <div data-hero-laptop className="absolute top-0 left-[5.5cqw] w-[88cqw]">
        <div className="flex aspect-[16/10] flex-col overflow-hidden rounded-t-[2.4cqw] border-[1.1cqw] border-b-[1.6cqw] border-ink-800 bg-ink-900 shadow-[0_5cqw_12cqw_rgb(0_0_0/0.6)] ring-1 ring-foreground/10">
          {/* Title bar */}
          <div className="flex h-[3.6cqw] shrink-0 items-center gap-[0.7cqw] border-b border-border bg-surface px-[1.4cqw] text-[1.25cqw] text-muted">
            <span className="size-[0.9cqw] rounded-full bg-accent" />
            <span className="size-[0.9cqw] rounded-full bg-ink-600" />
            <span className="size-[0.9cqw] rounded-full bg-ink-600" />
            <span className="flex-1 truncate text-center">{studio.fileName}</span>
            <span
              data-hero-export
              className="rounded-full bg-accent px-[1.1cqw] py-[0.3cqw] font-semibold text-accent-foreground"
            >
              {studio.exportLabel}
            </span>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[17cqw_minmax(0,1fr)_17cqw]">
            {/* Media bin */}
            <div className="flex flex-col gap-[0.9cqw] border-r border-border p-[1.1cqw]">
              <span className="text-[1.05cqw] tracking-label text-muted uppercase">
                {studio.mediaLabel}
              </span>
              <div className="grid grid-cols-2 gap-[0.7cqw]">
                {binBoards.map((board) => (
                  <div
                    key={board.slug}
                    data-hero-bin={board.slug}
                    className="relative h-[6.2cqw] overflow-hidden rounded-[0.5cqw] bg-surface"
                  >
                    <Image src={board.image.src} alt="" fill sizes="8vw" className="object-cover" />
                    <span
                      data-hero-bin-ring
                      className="absolute inset-0 rounded-[0.5cqw] opacity-0 ring-[0.25cqw] ring-accent ring-inset"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Preview monitor */}
            <div className="relative flex items-center justify-center bg-background pb-[2.6cqw]">
              {/* Plays the shot under the playhead: cut, punch-in, pan, caption. */}
              <div
                data-hero-preview
                className="relative aspect-[9/15] w-[15.5cqw] overflow-hidden rounded-[0.7cqw] bg-surface"
              >
                {shots.map((shot) => {
                  const isPortrait = shot.media === "portrait";
                  return (
                    <div
                      key={shot.media}
                      data-hero-shot={shot.media}
                      data-start={shot.start}
                      data-end={shot.end}
                      className={cn(
                        "absolute inset-0 overflow-hidden",
                        shot !== restShot && "opacity-0",
                      )}
                    >
                      {/* Boards are landscape: the media layer is wider than the frame and pans across it. */}
                      <div
                        data-hero-shot-media
                        className={cn(
                          "absolute",
                          isPortrait ? "inset-0" : "inset-y-0 left-0 aspect-[4/3] h-full",
                        )}
                      >
                        <Image
                          src={shot.image.src}
                          alt=""
                          fill
                          preload={isPortrait}
                          loading={isPortrait ? undefined : "eager"}
                          sizes={
                            isPortrait
                              ? "(min-width: 1024px) 12vw, 24vw"
                              : "(min-width: 1024px) 22vw, 50vw"
                          }
                          className={cn(
                            "object-cover",
                            isPortrait &&
                              "object-[50%_30%] brightness-90 contrast-[1.15] grayscale",
                          )}
                        />
                      </div>
                      <span
                        data-hero-shot-caption
                        className="absolute inset-x-[0.9cqw] bottom-[1.1cqw] rounded-[0.4cqw] bg-background/75 px-[0.4cqw] py-[0.45cqw] text-center text-[1.15cqw] font-semibold"
                      >
                        {shot.caption}
                      </span>
                    </div>
                  );
                })}
                {/* Cut flash */}
                <span
                  data-hero-flash
                  className="pointer-events-none absolute inset-0 bg-foreground opacity-0"
                />
                <span className="absolute top-[0.9cqw] left-[0.9cqw] flex items-center gap-[0.4cqw] font-mono text-[1cqw] text-foreground">
                  <span data-hero-rec className="size-[0.7cqw] rounded-full bg-accent" />
                  REC
                </span>
              </div>
              <span
                data-hero-timecode
                data-duration={studio.duration}
                className="absolute bottom-[0.9cqw] font-mono text-[1.1cqw] text-subtle tabular-nums"
              >
                00:00:{pad(Math.floor(restAt * studio.duration))}:00 / 00:00:
                {pad(studio.duration)}:00
              </span>
            </div>

            {/* Inspector */}
            <div className="flex flex-col gap-[1.4cqw] border-l border-border p-[1.1cqw] text-[1.1cqw] text-muted">
              <span className="text-[1.05cqw] tracking-label uppercase">
                {studio.inspectorLabel}
              </span>
              {studio.inspector.map((item) => (
                <div key={item.label} className="flex flex-col gap-[0.5cqw]">
                  {item.label}
                  <span className="relative h-[0.35cqw] rounded-full bg-ink-700">
                    <span
                      data-hero-meter
                      className={cn(
                        "absolute inset-y-0 left-0 origin-left rounded-full",
                        item.accent ? "bg-accent" : "bg-bone-200",
                      )}
                      style={{ width: `${item.value}%` }}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="flex h-[16.5cqw] shrink-0 flex-col gap-[0.7cqw] border-t border-border bg-surface pt-[0.9cqw] pr-[1.4cqw] pb-[1.1cqw] pl-[4.6cqw]">
            <div className="flex justify-between font-mono text-[1cqw] text-subtle">
              {ruler.map((mark) => (
                <span key={mark}>{mark}</span>
              ))}
            </div>
            <div data-hero-tracks className="relative flex flex-1 flex-col gap-[0.7cqw]">
              {/* V1 — clips */}
              <div className="relative flex h-[4cqw] gap-[0.35cqw]">
                <span className="absolute top-[1.2cqw] -left-[3.3cqw] text-[1cqw] text-muted">
                  V1
                </span>
                {shots.map((shot) => (
                  <div
                    key={shot.media}
                    data-hero-clip={shot.media}
                    className="relative min-w-0 overflow-hidden rounded-[0.45cqw] bg-ink-700"
                    style={{ flex: shot.length }}
                  >
                    <Image
                      src={shot.image.src}
                      alt=""
                      fill
                      sizes="10vw"
                      className={cn(
                        "object-cover",
                        shot.media === "portrait" && "object-[50%_30%] grayscale",
                      )}
                    />
                    <span
                      data-hero-clip-ring
                      className={cn(
                        "absolute inset-0 rounded-[0.45cqw] ring-[0.2cqw] ring-foreground ring-inset",
                        shot !== restShot && "opacity-0",
                      )}
                    />
                  </div>
                ))}
              </div>

              {/* T1 — captions, one per shot */}
              <div className="relative flex h-[2cqw] gap-[0.35cqw]">
                <span className="absolute top-[0.3cqw] -left-[3.3cqw] text-[1cqw] text-muted">
                  T1
                </span>
                {shots.map((shot) => (
                  <span
                    key={shot.media}
                    data-hero-caption
                    className="min-w-0 origin-left truncate rounded-[0.4cqw] border border-accent/70 bg-accent/30 pl-[0.7cqw] text-[1cqw] leading-[1.8cqw] text-bone-100"
                    style={{ flex: shot.length }}
                  >
                    {shot.caption}
                  </span>
                ))}
              </div>

              {/* A1 — audio */}
              <div className="relative flex h-[3.3cqw] items-center gap-[0.2cqw] rounded-[0.4cqw] bg-foreground/5 px-[0.5cqw]">
                <span className="absolute top-[1cqw] -left-[3.3cqw] text-[1cqw] text-muted">
                  A1
                </span>
                {waveform.map((height, i) => (
                  <span
                    key={i}
                    data-hero-bar
                    className="flex-1 rounded-[0.1cqw] bg-muted"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>

              {/* Playhead: the full-width rail moves (xPercent), the line sits at its left edge */}
              <div
                data-hero-playhead
                data-rest={restAt}
                data-seconds={totalLength}
                className="pointer-events-none absolute -inset-y-[0.5cqw] left-0 w-full"
              >
                <span
                  data-hero-playhead-line
                  className="absolute inset-y-0 w-[0.2cqw] bg-accent"
                  style={{ left: `${restAt * 100}%` }}
                >
                  <span className="absolute -top-[0.4cqw] -left-[0.55cqw] h-[1cqw] w-[1.3cqw] rounded-[0.2cqw] bg-accent" />
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Base */}
        <div className="relative -mx-[5cqw] h-[2cqw] rounded-b-[1.8cqw] bg-linear-to-b from-ink-600 to-ink-850">
          <span className="absolute top-0 left-1/2 h-[0.8cqw] w-[14cqw] -translate-x-1/2 rounded-b-[1cqw] bg-ink-900" />
        </div>
      </div>

      {/* Publish arrow */}
      <svg
        data-hero-publish
        viewBox="0 0 300 90"
        fill="none"
        className="absolute top-[58cqw] left-[43cqw] h-[10cqw] w-[33cqw] overflow-visible text-accent"
      >
        <path
          data-hero-publish-path
          d="M5 4 C 50 80, 200 86, 288 46"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 7"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M274 40 L290 45 L280 58"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        data-hero-publish-label
        className="absolute top-[66.5cqw] left-[55cqw] rounded-full bg-foreground px-[1.3cqw] py-[0.6cqw] text-[1.5cqw] font-semibold text-background"
      >
        {studio.publishLabel}
      </span>

      {/* Phone (GSAP moves this wrapper; the tilt lives on the inner frame) */}
      <div data-hero-phone className="absolute top-[26.5cqw] left-[76.5cqw] w-[21.7cqw]">
        <div className="relative aspect-[1/2] rotate-[5deg] overflow-hidden rounded-[4cqw] border-[0.9cqw] border-ink-800 bg-ink-900 shadow-[0_4cqw_10cqw_rgb(0_0_0/0.8)] ring-1 ring-foreground/15">
          {reelBoards.map((image, i) => (
            <div
              key={image.src}
              data-hero-reel
              className={cn("absolute inset-0", i !== 0 && "opacity-0")}
            >
              {/* The first reel frame is the hero's largest image (LCP): preload it. */}
              <Image
                src={image.src}
                alt=""
                fill
                preload={i === 0}
                loading={i === 0 ? undefined : "eager"}
                sizes="(min-width: 1024px) 14vw, 22vw"
                className="object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-b from-transparent to-background/95" />
          <div className="absolute inset-x-[1.1cqw] top-[1.3cqw] flex gap-[0.3cqw]">
            {reelBoards.map((image) => (
              <span
                key={image.src}
                className="relative h-[0.25cqw] flex-1 overflow-hidden rounded-full bg-foreground/30"
              >
                <span data-hero-story className="absolute inset-0 origin-left bg-foreground" />
              </span>
            ))}
          </div>
          <div className="absolute right-[1cqw] bottom-[7cqw] flex flex-col gap-[1.4cqw] text-foreground">
            <Heart data-hero-like className="size-[2.1cqw] fill-accent text-accent" />
            <MessageCircle className="size-[2.1cqw]" />
            <Send className="size-[2.1cqw]" />
          </div>
          <div className="absolute right-[4.5cqw] bottom-[1.6cqw] left-[1.1cqw] flex items-center gap-[0.7cqw] text-[1.2cqw] font-semibold">
            <span className="relative size-[2.6cqw] shrink-0 overflow-hidden rounded-full ring-[0.15cqw] ring-foreground">
              <Image
                src={portrait.src}
                alt=""
                fill
                sizes="3vw"
                className="object-cover object-[50%_32%] grayscale"
              />
            </span>
            <span className="truncate">{profile.fullName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Homepage hero, "studio" design: the promise as a four-line headline, a
 * laptop editing a reel that publishes to a phone, and the name (the page's
 * only h1), supporting line, CTAs and proof along the bottom.
 * Copy lives in src/data/hero.ts; motion in HeroMotion.
 */
export function HeroSection() {
  const { tagline } = hero;
  const lines = [
    { key: "before", content: tagline.before },
    {
      key: "serif",
      content: <span className="pe-[0.08em] accent-serif text-accent">{tagline.serif}</span>,
    },
    { key: "middle", content: tagline.middle },
    {
      key: "end",
      content: (
        <>
          {tagline.end}
          <span className="text-accent">.</span>
        </>
      ),
    },
  ];

  return (
    <HeroMotion>
      <section
        id="top"
        aria-labelledby="hero-title"
        className="relative isolate overflow-hidden pt-[calc(var(--header-height)+2.5rem)] pb-14 lg:flex lg:min-h-dvh lg:flex-col lg:pb-12"
      >
        {/* Ambient ember glow under the laptop */}
        <div
          aria-hidden
          data-hero-glow
          className="pointer-events-none absolute top-[40%] right-[5%] -z-10 aspect-[5/3] w-[60vw] max-w-[60rem] rounded-full bg-ember-700/25 blur-[120px]"
        />

        <div className="container-page grid w-full flex-1 items-center gap-x-10 gap-y-12 lg:grid-cols-12">
          <p
            data-hero-tagline
            className="text-[clamp(3.25rem,0.5rem+6vw,7rem)] leading-[0.92] font-extrabold tracking-display lg:col-span-5"
          >
            {lines.map((line) => (
              <span key={line.key} className="-my-[0.1em] block overflow-hidden py-[0.1em]">
                <span data-hero-line className="block">
                  {line.content}
                </span>
              </span>
            ))}
          </p>

          <div data-hero-studio className="lg:col-span-7">
            <Studio />
          </div>
        </div>

        <div className="container-page mt-12 flex w-full flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between">
          <div data-hero-fade className="max-w-md">
            <h1 id="hero-title" className="text-lead font-semibold tracking-snug">
              {profile.fullName}
            </h1>
            <p className="mt-1.5 text-body text-muted">{hero.supporting}</p>
          </div>

          <div data-hero-fade className="flex flex-col gap-4 lg:items-end">
            <div className="flex flex-wrap gap-3">
              <PillLink href={hero.secondaryCta.href} variant="outline">
                {hero.secondaryCta.label}
              </PillLink>
              <PillLink href={profile.primaryCta.href}>{profile.primaryCta.label}</PillLink>
            </div>
            <ul
              aria-label="Highlights"
              className="flex flex-wrap gap-x-4 gap-y-1 text-small text-muted"
            >
              {hero.proof.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </HeroMotion>
  );
}
