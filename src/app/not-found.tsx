import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="container-page flex min-h-dvh flex-col items-start justify-center gap-8">
      <span className="label">Error 404</span>
      <h1 className="text-h1 tracking-display font-extrabold">
        Cut <span className="accent-serif text-accent">missing</span>
      </h1>
      <p className="text-lead max-w-xl text-muted">
        This page didn&apos;t make the final edit. Head back to the main timeline.
      </p>
      <Link
        href="/"
        className="rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground transition-colors duration-200 hover:bg-accent-hover"
      >
        Back to home
      </Link>
    </main>
  );
}
