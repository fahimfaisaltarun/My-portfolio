import { intro, profile } from "@/data";
import { IntroMotion } from "@/components/motion/intro-motion";
import { introFlagScript } from "@/lib/intro";

const corner = "absolute size-8 border-foreground/60 sm:size-10";

/**
 * First-visit intro overlay (homepage, once per session). The inline script
 * runs during HTML parsing — before first paint — and flags the load; CSS in
 * globals.css only displays the overlay while `<html data-intro="play">`, so
 * returning visitors, no-JS and reduced-motion users never see it.
 *
 * Everything inside is decorative (aria-hidden) except the skip button; the
 * real content is already in the page underneath.
 */
export function SiteIntro() {
  const name = Array.from(profile.shortName);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: introFlagScript(intro.storageKey) }} />
      <IntroMotion storageKey={intro.storageKey}>
        <div aria-hidden className="absolute inset-[var(--gutter)]">
          {/* Viewfinder corners */}
          <span data-intro-frame className={`${corner} top-0 left-0 border-t-2 border-l-2`} />
          <span data-intro-frame className={`${corner} top-0 right-0 border-t-2 border-r-2`} />
          <span data-intro-frame className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
          <span data-intro-frame className={`${corner} right-0 bottom-0 border-r-2 border-b-2`} />

          <div
            data-intro-frame
            className="absolute top-5 left-6 flex items-center gap-3 font-mono text-small text-foreground sm:top-7 sm:left-8"
          >
            <span className="flex items-center gap-2 font-semibold text-ember-400">
              <span data-intro-rec className="size-2.5 rounded-full bg-accent" />
              REC
            </span>
            <span data-intro-timecode className="tabular-nums">
              00:00:00:00
            </span>
          </div>

          {/* Wordmark + rotating service words */}
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <p className="-my-[0.08em] flex items-end overflow-hidden py-[0.08em] text-display font-extrabold tracking-display">
              {name.map((char, i) => (
                <span
                  key={i}
                  data-intro-char
                  className="inline-block"
                  style={{ transform: "translateY(115%)" }}
                >
                  {char}
                </span>
              ))}
              <span
                data-intro-dot
                className="mb-[0.14em] ml-[0.04em] inline-block size-[0.16em] rounded-full bg-accent"
                style={{ transform: "scale(0)" }}
              />
            </p>
            <span className="relative block h-[1.25em] w-full overflow-hidden accent-serif text-h3 text-accent">
              {intro.words.map((word) => (
                <span
                  key={word}
                  data-intro-word
                  className="absolute inset-x-0 top-0 block"
                  style={{ transform: "translateY(110%)" }}
                >
                  {word}
                </span>
              ))}
            </span>
          </div>

          {/* Bottom: role + load counter, with the progress line */}
          <div
            data-intro-frame
            className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-6 sm:inset-x-8 sm:bottom-8"
          >
            <span className="max-w-[14rem] label sm:max-w-none">{profile.headline}</span>
            <span
              data-intro-count
              className="text-h2 leading-none font-extrabold tracking-tight tabular-nums"
            >
              000
            </span>
          </div>
          <span className="absolute inset-x-0 -bottom-px h-px bg-border">
            <span
              data-intro-progress
              className="absolute inset-0 origin-left bg-accent"
              style={{ transform: "scaleX(0)" }}
            />
          </span>
        </div>

        <button
          type="button"
          data-intro-skip
          className="absolute top-[calc(var(--gutter)+0.5rem)] right-[calc(var(--gutter)+1rem)] min-h-11 px-2 text-small text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline sm:right-[calc(var(--gutter)+1.5rem)]"
        >
          {intro.skipLabel}
        </button>
      </IntroMotion>
    </>
  );
}
