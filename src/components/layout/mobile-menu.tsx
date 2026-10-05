"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { NavItem, SocialLink } from "@/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { ease, stagger } from "@/lib/motion";
import { getLenis } from "@/components/providers/smooth-scroll";
import { Logo } from "@/components/ui/logo";
import { PillLink } from "@/components/ui/pill-link";
import { Availability } from "@/components/ui/availability";
import { NavLink } from "./nav-link";

type Props = {
  links: NavItem[];
  socials: SocialLink[];
  cta: { label: string; href: string };
  email: string;
};

const MENU_ID = "mobile-menu";
const DESKTOP_QUERY = "(min-width: 64rem)"; // matches Tailwind `lg`

/**
 * Full-screen mobile navigation built on a native modal <dialog>: focus is
 * trapped, Esc closes, and the page behind is inert. GSAP adds the panel
 * wipe + staggered link reveal; reduced motion opens and closes instantly.
 */
export function MobileMenu({ links, socials, cta, email }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const closeTween = useRef<gsap.core.Tween | null>(null);
  const closing = useRef(false);
  const [open, setOpen] = useState(false);

  function finishClose() {
    closing.current = false;
    dialogRef.current?.close();
    document.documentElement.removeAttribute("data-menu-open");
    setOpen(false);
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        timeline.current = gsap
          .timeline({ paused: true })
          .fromTo(
            "[data-menu-panel]",
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: ease.inOutQuart },
          )
          .from(
            "[data-menu-link]",
            { yPercent: 110, duration: 0.9, stagger: stagger.items, ease: ease.outExpo },
            "-=0.35",
          )
          .from(
            "[data-menu-meta]",
            { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.06, ease: ease.out },
            "-=0.6",
          );
        // Close uses its own short wipe rather than reversing the longer open timeline.
        closeTween.current = gsap.to("[data-menu-panel]", {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.6,
          ease: ease.inOutQuart,
          paused: true,
          onComplete: finishClose,
        });
        return () => {
          timeline.current = null;
          closeTween.current = null;
        };
      });
    },
    { scope: dialogRef },
  );

  function openMenu() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    closing.current = false;
    dialog.showModal();
    // Explicit focus: the `autofocus` attribute is ignored when the URL has a #fragment.
    closeButtonRef.current?.focus();
    document.documentElement.setAttribute("data-menu-open", "");
    getLenis()?.stop();
    setOpen(true);
    timeline.current?.play(0);
  }

  function closeMenu() {
    if (!dialogRef.current?.open || closing.current) return;
    closing.current = true;
    // Restart scrolling first so in-page links can scroll while the panel wipes away.
    getLenis()?.start();
    if (!timeline.current || !closeTween.current) {
      finishClose();
      return;
    }
    timeline.current.pause();
    closeTween.current.invalidate().restart();
  }

  // Close if the viewport grows to desktop while open.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches && dialogRef.current?.open) {
        getLenis()?.start();
        timeline.current?.pause();
        finishClose();
      }
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={openMenu}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={MENU_ID}
        className="group inline-flex h-10 items-center gap-3 rounded-full border border-border-strong pr-3 pl-4 text-small font-medium transition-colors hover:border-foreground lg:hidden"
      >
        Menu
        <span aria-hidden className="flex w-4 flex-col gap-1">
          <span className="h-px w-full bg-current transition-transform duration-300 group-hover:translate-x-0.5" />
          <span className="h-px w-full bg-current transition-transform duration-300 group-hover:-translate-x-0.5" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        id={MENU_ID}
        aria-label="Site menu"
        data-lenis-prevent
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-foreground backdrop:bg-transparent"
      >
        <div data-menu-panel className="flex min-h-full flex-col overflow-y-auto bg-background">
          <div className="container-page flex h-[var(--header-height)] shrink-0 items-center justify-between">
            <Logo onClick={closeMenu} />
            <button
              type="button"
              ref={closeButtonRef}
              onClick={closeMenu}
              className="group inline-flex h-10 items-center gap-3 rounded-full border border-border-strong pr-3 pl-4 text-small font-medium transition-colors hover:border-foreground"
            >
              Close
              <span aria-hidden className="relative block size-4">
                <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current transition-transform duration-300 group-hover:rotate-[135deg]" />
                <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="container-page flex flex-1 flex-col justify-center py-10"
          >
            <ol className="space-y-1">
              {links.map((link, index) => (
                <li key={link.href} className="overflow-hidden">
                  <NavLink
                    href={link.href}
                    onNavigate={closeMenu}
                    className="group flex items-baseline gap-4 py-1 text-h2 font-extrabold tracking-display"
                  >
                    <span data-menu-link className="flex items-baseline gap-4">
                      <span className="text-small font-medium tracking-normal text-muted tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="transition-colors duration-300 group-hover:text-accent">
                        {link.label}
                      </span>
                    </span>
                  </NavLink>
                </li>
              ))}
            </ol>
          </nav>

          <div className="container-page grid shrink-0 gap-6 border-t border-border py-8">
            <div data-menu-meta>
              <PillLink href={cta.href} size="lg" onClick={closeMenu}>
                {cta.label}
              </PillLink>
            </div>
            <div data-menu-meta className="flex flex-wrap items-center justify-between gap-4">
              <a href={`mailto:${email}`} className="text-small underline-offset-4 hover:underline">
                {email}
              </a>
              <Availability />
            </div>
            <ul
              data-menu-meta
              className="flex flex-wrap gap-x-6 gap-y-2"
              aria-label="Social profiles"
            >
              {socials.map((social) => (
                <li key={social.url}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-small text-muted transition-colors hover:text-foreground"
                  >
                    {social.label}
                    <ArrowUpRight aria-hidden className="size-3.5" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </dialog>
    </>
  );
}
