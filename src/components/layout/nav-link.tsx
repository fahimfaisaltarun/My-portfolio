"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { scrollToTarget } from "@/components/providers/smooth-scroll";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Runs before navigating/scrolling (e.g. to close the mobile menu). */
  onNavigate?: () => void;
};

/**
 * Link that smooth-scrolls (via Lenis) when the target section is on the
 * current page, and navigates normally otherwise. Sets aria-current on the
 * active route.
 */
export function NavLink({ href, children, className, onNavigate }: Props) {
  const pathname = usePathname();
  const [path, hash] = href.split("#");
  const targetPath = path || "/";
  const isCurrentRoute = !hash && pathname === targetPath;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();
    if (!hash || pathname !== targetPath) return;
    const target = document.getElementById(hash);
    if (!target) return;
    event.preventDefault();
    scrollToTarget(target);
    history.replaceState(null, "", `#${hash}`);
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      aria-current={isCurrentRoute ? "page" : undefined}
      className={className}
    >
      {children}
    </Link>
  );
}
