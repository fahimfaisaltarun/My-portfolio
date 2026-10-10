"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ease } from "@/lib/motion";
import { INTRO_DONE_EVENT, isIntroPlaying } from "@/lib/intro";
import { getLenis } from "@/components/providers/smooth-scroll";

const pad = (n: number, size = 2) => String(Math.floor(n)).padStart(size, "0");

/** Fonts + window load, capped so a slow asset never holds the intro hostage. */
function pageReady(maxWait = 1500): Promise<void> {
  const loaded =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((resolve) =>
          window.addEventListener("load", () => resolve(), { once: true }),
        );
  const fonts = document.fonts?.ready.then(() => undefined) ?? Promise.resolve();
  return Promise.race([
    Promise.all([loaded, fonts]).then(() => undefined),
    new Promise<void>((resolve) => setTimeout(resolve, maxWait)),
  ]);
}

/**
 * First-visit intro choreography (only runs when the inline script flagged
 * this load):
 *  1. viewfinder fades in, REC blinks, wordmark rises letter by letter, dot pops
 *  2. service words rotate while the counter + progress line run 000 → 100
 *     (timecode follows); holds at 100 until fonts/assets are ready
 *  3. exit: wordmark lifts out, overlay wipes up — the hero starts as the
 *     wipe begins (INTRO_DONE_EVENT), then `<html data-intro="done">`
 * Skip button / Escape jump straight to the exit. Scroll is locked meanwhile.
 */
export function IntroMotion({ storageKey, children }: { storageKey: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || !isIntroPlaying()) return;
      const html = document.documentElement;
      const q = gsap.utils.selector(root);
      let handedOver = false;

      const handOver = () => {
        if (handedOver) return;
        handedOver = true;
        try {
          sessionStorage.setItem(storageKey, "1");
        } catch {}
        getLenis()?.start();
        window.dispatchEvent(new Event(INTRO_DONE_EVENT));
      };
      const finish = () => {
        handOver();
        html.dataset.intro = "done";
      };

      // Lenis mounts after this component (parent effects run later): stop it next frame.
      requestAnimationFrame(() => getLenis()?.stop());
      window.scrollTo(0, 0);

      const counter = q("[data-intro-count]")[0];
      const timecode = q("[data-intro-timecode]")[0];
      const progress = { value: 0 };
      const words = q("[data-intro-word]");

      const tl = gsap.timeline({ defaults: { ease: ease.outExpo } });
      tl.from(q("[data-intro-frame]"), { autoAlpha: 0, duration: 0.8, stagger: 0.05 }, 0)
        .fromTo(
          q("[data-intro-char]"),
          { yPercent: 115, y: 0 },
          { yPercent: 0, duration: 1.1, stagger: 0.06 },
          0.1,
        )
        .fromTo(
          q("[data-intro-dot]"),
          { scale: 0 },
          { scale: 1, duration: 0.7, ease: "back.out(3)" },
          0.55,
        )
        .fromTo(
          q("[data-intro-progress]"),
          { scaleX: 0 },
          { scaleX: 1, duration: 1.9, ease: "power2.inOut" },
          0.3,
        )
        .to(
          progress,
          {
            value: 100,
            duration: 1.9,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter) counter.textContent = pad(progress.value, 3);
              if (timecode) {
                const seconds = progress.value * 0.03; // 100% ≈ 3s of "footage"
                timecode.textContent = `00:00:${pad(seconds)}:${pad((seconds % 1) * 30)}`;
              }
            },
          },
          0.3,
        );

      // Service words roll like a strip: the next word enters exactly as the
      // current one leaves (same start, duration and ease), so they never overlap.
      const roll = { duration: 0.5, ease: "power3.inOut" };
      words.forEach((word, i) => {
        const at = 0.3 + i * 0.5;
        tl.fromTo(word, { yPercent: 110, y: 0 }, { yPercent: 0, ...roll }, at);
        if (i < words.length - 1) tl.to(word, { yPercent: -110, ...roll }, at + 0.5);
      });

      // Hold at 100 until the page is ready.
      tl.addLabel("ready", 2.25).call(
        () => {
          tl.pause();
          pageReady().then(() => tl.play());
        },
        [],
        "ready",
      );

      // Exit.
      tl.addLabel("exit", "ready+=0.05")
        .to(
          q("[data-intro-char], [data-intro-dot]"),
          { yPercent: -115, duration: 0.6, stagger: 0.03, ease: "power3.in" },
          "exit",
        )
        .to(
          q("[data-intro-word], [data-intro-frame], [data-intro-skip]"),
          { autoAlpha: 0, duration: 0.4 },
          "exit",
        )
        .call(handOver, [], "exit+=0.45")
        .fromTo(
          root,
          { clipPath: "inset(0% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: ease.inOutQuart },
          "exit+=0.4",
        )
        .call(finish);

      gsap.to(q("[data-intro-rec]"), {
        autoAlpha: 0.15,
        duration: 0.5,
        ease: "steps(1)",
        yoyo: true,
        repeat: -1,
      });

      const skip = () => {
        if (tl.time() >= tl.labels.exit) return;
        tl.play("exit");
      };
      const onKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") skip();
      };
      const button = q("[data-intro-skip]")[0];
      button?.addEventListener("click", skip);
      window.addEventListener("keydown", onKey);

      return () => {
        button?.removeEventListener("click", skip);
        window.removeEventListener("keydown", onKey);
        // A real unmount mid-intro (back navigation) must not leave the page locked.
        // React Strict Mode remounts immediately, so only finish if the overlay is gone.
        setTimeout(() => {
          if (!document.querySelector("[data-site-intro]") && isIntroPlaying()) finish();
        }, 0);
      };
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      data-site-intro
      className="fixed inset-0 z-[100] overflow-hidden bg-background text-foreground"
    >
      {children}
    </div>
  );
}
