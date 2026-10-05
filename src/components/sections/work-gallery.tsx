"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import type { DesignShowcase } from "@/data";
import { gsap } from "@/lib/gsap";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { getLenis } from "@/components/providers/smooth-scroll";

type Props = { boards: DesignShowcase[] };

/** Card spans for the editorial grid: alternating wide/narrow rows. */
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

/**
 * Showcase cards + lightbox. Cards are buttons that open a native modal
 * <dialog> (focus trap, Esc) with prev/next and arrow-key navigation.
 */
export function WorkGallery({ boards }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  // The full-size image is only rendered while open: a lazy <img> inside a
  // closed <dialog> never starts loading, which left the frame empty.
  const [isOpen, setIsOpen] = useState(false);
  const board = boards[active];

  // Event-handler tween (not render-time), so no GSAP context is needed.
  function animateIn() {
    const figure = dialogRef.current?.querySelector("[data-lightbox-figure]");
    if (!figure || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      figure,
      { autoAlpha: 0, scale: 0.94, y: 24 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: ease.outExpo },
    );
  }

  function open(index: number) {
    setActive(index);
    setIsOpen(true);
    dialogRef.current?.showModal();
    getLenis()?.stop();
    animateIn();
  }

  function close() {
    dialogRef.current?.close();
  }

  function go(step: number) {
    setActive((current) => (current + step + boards.length) % boards.length);
    animateIn();
  }

  return (
    <>
      <ul className="grid gap-5 lg:grid-cols-12">
        {boards.map((item, index) => (
          <li
            key={item.slug}
            data-reveal
            className={cn("will-reveal", SPANS[index % SPANS.length])}
          >
            <button
              type="button"
              onClick={() => open(index)}
              aria-haspopup="dialog"
              className="group block w-full overflow-hidden rounded-3xl border border-border bg-surface text-left"
            >
              <span className="relative block aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  sizes="(min-width: 1024px) 55vw, (min-width: 640px) 90vw, 100vw"
                  className="size-full object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.04] motion-reduce:transition-none"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </span>
              <span className="flex items-center justify-between gap-4 p-5 sm:p-6">
                <span>
                  <span className="block text-lead font-bold tracking-snug">{item.industry}</span>
                  <span className="block text-small text-muted">Social media design</span>
                </span>
                <span
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-border-strong transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground"
                >
                  <ArrowUpRight className="size-5" />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${board.industry} social media design`}
        data-lenis-prevent
        onClose={() => {
          setIsOpen(false);
          getLenis()?.start();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") go(1);
          if (event.key === "ArrowLeft") go(-1);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto max-h-none w-[min(72rem,calc(100vw-2rem),calc((100dvh-9rem)*4/3))] max-w-none bg-transparent p-0 text-foreground backdrop:bg-ink-950/90 backdrop:backdrop-blur-sm"
      >
        <figure
          data-lightbox-figure
          className="overflow-hidden rounded-3xl border border-border bg-surface"
        >
          {/* Fixed 4:3 frame reserves space while the image loads. */}
          <div className="relative aspect-[4/3] bg-surface-raised">
            {isOpen && (
              <Image
                key={board.slug}
                src={board.image.src}
                alt={board.image.alt}
                fill
                loading="eager"
                sizes="(min-width: 1152px) 72rem, 100vw"
                className="object-contain"
              />
            )}
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5">
            <div>
              <p className="font-bold">{board.industry}</p>
              <p className="text-small text-muted tabular-nums">
                {active + 1} / {boards.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous design"
                className="grid size-11 place-items-center rounded-full border border-border-strong transition-colors hover:border-foreground"
              >
                <ArrowLeft className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next design"
                className="grid size-11 place-items-center rounded-full border border-border-strong transition-colors hover:border-foreground"
              >
                <ArrowRight className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
          </figcaption>
        </figure>
      </dialog>
    </>
  );
}
