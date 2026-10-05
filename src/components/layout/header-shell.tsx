"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fixed header wrapper with "smart" behaviour, written as data attributes
 * (no re-renders): `data-scrolled` once the page moves, and `data-hidden`
 * while scrolling down. It reappears on scroll up or when it receives focus.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;

    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - lastY;
      header.dataset.scrolled = String(y > 8);
      if (Math.abs(delta) > 4) {
        const menuOpen = document.documentElement.hasAttribute("data-menu-open");
        header.dataset.hidden = String(delta > 0 && y > 160 && !menuOpen);
        lastY = y;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={ref}
      data-scrolled="false"
      data-hidden="false"
      className="fixed inset-x-0 top-0 z-40 header-in border-b border-transparent transition-[translate,background-color,border-color,backdrop-filter] duration-500 ease-out-expo data-[hidden=true]:not-focus-within:-translate-y-full data-[scrolled=true]:border-border data-[scrolled=true]:bg-background/75 data-[scrolled=true]:backdrop-blur-xl motion-reduce:transition-none"
    >
      {children}
    </header>
  );
}
