"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ease } from "@/lib/motion";
import { isIntroPlaying, whenIntroDone } from "@/lib/intro";

const pad = (n: number) => String(Math.floor(n)).padStart(2, "0");

/**
 * Hero choreography for the "studio" scene. Wraps the server-rendered hero and
 * animates its `data-hero-*` parts.
 *
 * Intro (once; waits for the first-visit SiteIntro to hand over when it plays):
 * headline lines rise → laptop tilts up into place → editor
 * fills in (preview wipe, media bin, meters, clips, captions, waveform) →
 * publish arrow draws → phone flies in → name / CTAs fade up.
 *
 * Loops (after the intro, paused while the hero is off screen): the playhead
 * sweeps the timeline and "directs" the preview like a video — it cuts to the
 * shot under it (punch-in + flash, camera pan, caption pop) and lights up the
 * matching clip and media-bin thumbnail; the timecode follows; the waveform
 * plays, REC blinks, meters breathe, the phone floats and plays its reel like
 * stories, the publish line marches.
 *
 * Scroll: headline drifts up and fades, the scene lags behind (depth).
 * Desktop pointer: the scene tilts toward the cursor, the phone leads.
 * Reduced motion: everything is shown immediately, nothing moves.
 */
export function HeroMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const one = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const loops: (gsap.core.Tween | gsap.core.Timeline)[] = [];
        let introDone = false;
        let onScreen = true;
        const syncLoops = () =>
          loops.forEach((loop) => (introDone && onScreen ? loop.play() : loop.pause()));

        /* ---------------- Intro ---------------- */
        // After the first-visit intro, the timeline waits for its hand-over, and the
        // headline stays painted under the overlay (only drifts up, never hidden) so
        // it is still the page's early LCP; the overlay wipe is its reveal.
        const afterSiteIntro = isIntroPlaying();
        const intro = gsap.timeline({
          defaults: { ease: ease.outExpo },
          delay: afterSiteIntro ? 0 : 0.15,
          paused: afterSiteIntro,
        });
        const releaseIntro = whenIntroDone(() => intro.play());
        intro
          .from(
            afterSiteIntro ? "[data-hero-tagline]" : q("[data-hero-line]"),
            afterSiteIntro
              ? { y: 110, duration: 1.6 }
              : { yPercent: 110, duration: 1.3, stagger: 0.1 },
            0,
          )
          .from(
            "[data-hero-laptop]",
            {
              y: 90,
              rotationX: 24,
              transformPerspective: 1600,
              transformOrigin: "50% 100%",
              autoAlpha: 0,
              duration: 1.8,
            },
            0.2,
          )
          .from("[data-hero-glow]", { autoAlpha: 0, scale: 0.6, duration: 2.4 }, 0.2)
          .fromTo(
            "[data-hero-preview]",
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: ease.inOutQuart },
            0.8,
          )
          .from("[data-hero-preview]", { scale: 1.12, duration: 2 }, 0.8)
          .from(
            q("[data-hero-bin]"),
            { scale: 0.6, autoAlpha: 0, duration: 0.8, stagger: 0.06 },
            0.95,
          )
          .from(q("[data-hero-meter]"), { scaleX: 0, duration: 1.1, stagger: 0.1 }, 1.05)
          .from(q("[data-hero-clip]"), { x: -24, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 1.05)
          .from(
            q("[data-hero-caption]"),
            { scaleX: 0, transformOrigin: "0% 50%", duration: 0.9, stagger: 0.12 },
            1.25,
          )
          .from(
            q("[data-hero-bar]"),
            { scaleY: 0, duration: 0.6, stagger: { each: 0.006, from: "center" } },
            1.15,
          )
          .from(q("[data-hero-fade]"), { y: 28, autoAlpha: 0, duration: 1, stagger: 0.12 }, 1.1)
          .from(
            "[data-hero-phone]",
            { x: 160, y: 70, rotation: 16, autoAlpha: 0, duration: 1.5 },
            1.55,
          )
          .fromTo(
            "[data-hero-publish]",
            { clipPath: "inset(0% 100% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: ease.inOutQuart },
            1.9,
          )
          .from(
            "[data-hero-publish-label]",
            { scale: 0, autoAlpha: 0, duration: 0.8, ease: "back.out(2)" },
            2.35,
          )
          .call(
            () => {
              introDone = true;
              syncLoops();
            },
            [],
            2.4,
          );

        // Start states are applied — safe to show the hero now (no flash).
        gsap.set(root, { visibility: "visible" });

        /* ---------------- Continuous loops (created paused) ---------------- */
        const loop = <T extends gsap.core.Tween | gsap.core.Timeline>(anim: T) => {
          anim.pause();
          loops.push(anim);
          return anim;
        };

        /*
         * The preview plays the reel: whichever shot (V1 clip) is under the
         * playhead is on screen. Each cut = hard switch + punch-in + a short
         * flash, then the shot's camera move (pan across a design board, slow
         * push-in on the portrait) and its caption pops in. The matching clip
         * and media-bin thumbnail light up.
         */
        const shots = q("[data-hero-shot]");
        const clipRings = q("[data-hero-clip-ring]");
        const binRings = new Map(
          q("[data-hero-bin]").map((bin) => [
            bin.dataset.heroBin,
            bin.querySelector("[data-hero-bin-ring]"),
          ]),
        );
        const flash = one("[data-hero-flash]");
        let current = -1;
        let camera: gsap.core.Tween | null = null;

        const cut = (index: number, seconds: number) => {
          const prev = shots[current];
          const next = shots[index];
          current = index;
          if (prev) gsap.set(prev, { autoAlpha: 0 });
          gsap.set(next, { autoAlpha: 1 });
          gsap.fromTo(
            next,
            { scale: 1.14 },
            { scale: 1, duration: 0.7, ease: ease.outExpo, overwrite: true },
          );
          if (flash) {
            gsap.fromTo(
              flash,
              { autoAlpha: 0.4 },
              { autoAlpha: 0, duration: 0.4, ease: "power2.out", overwrite: true },
            );
          }

          camera?.kill();
          const media = next.querySelector("[data-hero-shot-media]");
          if (media) {
            camera =
              next.dataset.heroShot === "portrait"
                ? gsap.fromTo(
                    media,
                    { scale: 1, transformOrigin: "50% 30%" },
                    { scale: 1.18, duration: seconds, ease: "none" },
                  )
                : // Board layer is ~2.2× the frame width: -55% shows its right edge.
                  gsap.fromTo(
                    media,
                    { xPercent: index % 2 ? -55 : 0 },
                    { xPercent: index % 2 ? 0 : -55, duration: seconds, ease: "sine.inOut" },
                  );
          }

          const caption = next.querySelector("[data-hero-shot-caption]");
          if (caption) {
            gsap.fromTo(
              caption,
              { yPercent: 80, autoAlpha: 0 },
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.5,
                delay: 0.15,
                ease: "back.out(2)",
                overwrite: true,
              },
            );
          }

          clipRings.forEach((ring, i) =>
            gsap.to(ring, { autoAlpha: i === index ? 1 : 0, duration: 0.2, overwrite: true }),
          );
          const binRing = binRings.get(next.dataset.heroShot);
          binRings.forEach((ring) => {
            if (ring)
              gsap.to(ring, {
                autoAlpha: ring === binRing ? 1 : 0,
                duration: 0.3,
                overwrite: true,
              });
          });
        };

        // Playhead sweeps the timeline, drives the timecode and cuts the preview.
        const playhead = one("[data-hero-playhead]");
        const line = one("[data-hero-playhead-line]");
        const timecode = one("[data-hero-timecode]");
        const total = Number(timecode?.dataset.duration ?? 30);
        const loopSeconds = Number(playhead?.dataset.seconds ?? 12);
        const ranges = shots.map((shot) => [Number(shot.dataset.start), Number(shot.dataset.end)]);
        if (playhead && line) {
          gsap.set(line, { left: 0 });
          const sweep = loop(
            gsap.fromTo(
              playhead,
              { xPercent: 0 },
              {
                xPercent: 100,
                duration: loopSeconds,
                ease: "none",
                repeat: -1,
                onUpdate() {
                  const progress = this.progress();
                  const index = ranges.findIndex(
                    ([start, end]) => progress >= start && progress < end,
                  );
                  if (index !== -1 && index !== current) {
                    const [start, end] = ranges[index];
                    cut(index, (end - start) * loopSeconds);
                  }
                  if (!timecode) return;
                  const seconds = progress * total;
                  const frames = (seconds % 1) * 30;
                  timecode.textContent = `00:00:${pad(seconds)}:${pad(frames)} / 00:00:${pad(total)}:00`;
                },
              },
            ),
          );
          // Start where the static (no-JS) frame rests: mid-portrait-shot.
          sweep.progress(Number(playhead.dataset.rest ?? 0));
        }

        // Waveform: every bar pulses on its own rhythm.
        loop(
          gsap.to(q("[data-hero-bar]"), {
            scaleY: "random(0.25, 1)",
            duration: 0.42,
            ease: "sine.inOut",
            stagger: { each: 0.02, from: "random", repeat: -1, yoyo: true },
          }),
        );

        // REC blinks.
        loop(
          gsap.to("[data-hero-rec]", {
            autoAlpha: 0.15,
            duration: 0.6,
            ease: "steps(1)",
            yoyo: true,
            repeat: -1,
          }),
        );

        // Inspector meters breathe.
        q("[data-hero-meter]").forEach((meter, i) =>
          loop(
            gsap.to(meter, {
              scaleX: "random(0.72, 1)",
              duration: 1.6 + i * 0.35,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              repeatRefresh: true,
            }),
          ),
        );

        // Phone floats…
        loop(
          gsap.to("[data-hero-phone]", {
            yPercent: -3,
            rotation: -1.5,
            duration: 3.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          }),
        );

        // …and plays its reel like stories: bar fills, slide cross-fades, like pops.
        const slides = q("[data-hero-reel]");
        const stories = q("[data-hero-story]");
        const like = one("[data-hero-like]");
        if (slides.length > 1 && stories.length === slides.length) {
          gsap.set(stories, { scaleX: 0 });
          gsap.set(slides, { autoAlpha: (i: number) => (i === 0 ? 1 : 0) });
          const reel = gsap.timeline({ repeat: -1 });
          slides.forEach((slide, i) => {
            const next = slides[(i + 1) % slides.length];
            reel
              .to(stories[i], { scaleX: 1, duration: 3.4, ease: "none" })
              .to(slide, { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" })
              .to(next, { autoAlpha: 1, duration: 0.5, ease: "power2.inOut" }, "<");
            if (like) {
              reel.to(
                like,
                { scale: 1.4, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" },
                "<",
              );
            }
          });
          reel.set(stories, { scaleX: 0 });
          loop(reel);
        }

        // Publish line marches toward the phone; glow breathes.
        loop(
          gsap.to("[data-hero-publish-path]", {
            strokeDashoffset: -26,
            duration: 0.9,
            ease: "none",
            repeat: -1,
          }),
        );
        loop(
          gsap.to("[data-hero-glow]", {
            scale: 1.1,
            autoAlpha: 0.7,
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          }),
        );

        // Only run the loops while the hero is on screen.
        ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            onScreen = self.isActive;
            syncLoops();
          },
        });

        /* ---------------- Scroll-out ---------------- */
        gsap.to("[data-hero-tagline]", {
          yPercent: -18,
          autoAlpha: 0.15,
          ease: "none",
          scrollTrigger: { trigger: root, start: "20% top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-studio]", {
          y: 90,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
        });

        return releaseIntro;
      });

      // Desktop with a real pointer: the scene tilts toward the cursor, the phone leads.
      mm.add(
        "(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 64rem)",
        () => {
          const stage = one("[data-hero-stage]");
          const phone = one("[data-hero-phone]");
          if (!stage || !phone) return;
          gsap.set(stage, { transformPerspective: 1600 });
          const rotX = gsap.quickTo(stage, "rotationX", { duration: 0.9, ease: ease.out });
          const rotY = gsap.quickTo(stage, "rotationY", { duration: 0.9, ease: ease.out });
          const phoneX = gsap.quickTo(phone, "x", { duration: 1.1, ease: ease.out });

          const onMove = (event: PointerEvent) => {
            const rect = root.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            rotY(x * 7);
            rotX(-y * 5);
            phoneX(x * 24);
          };
          const onLeave = () => {
            rotX(0);
            rotY(0);
            phoneX(0);
          };

          root.addEventListener("pointermove", onMove);
          root.addEventListener("pointerleave", onLeave);
          return () => {
            root.removeEventListener("pointermove", onMove);
            root.removeEventListener("pointerleave", onLeave);
          };
        },
      );

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root, { visibility: "visible" });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="will-reveal">
      {children}
    </div>
  );
}
