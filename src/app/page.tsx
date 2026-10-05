import { siteConfig } from "@/config/site";

/**
 * Temporary placeholder. Portfolio sections (hero, work, services, about,
 * contact) will replace this — keep exactly one <h1> on the page.
 */
export default function HomePage() {
  return (
    <main id="main" className="container-page flex min-h-dvh flex-col justify-between py-10">
      <header className="flex items-center justify-between">
        <span className="label">{siteConfig.jobTitle}</span>
        <span className="size-2 rounded-full bg-accent" aria-hidden />
      </header>

      <section aria-labelledby="hero-title">
        <h1
          id="hero-title"
          className="text-h1 tracking-display font-extrabold"
        >
          {siteConfig.name}
          <span className="sr-only"> — {siteConfig.jobTitle}</span>
        </h1>
        <p className="text-h3 mt-6 max-w-3xl font-bold">
          Edits that make people <span className="pill-accent accent-serif">stop</span> the scroll
          and <span className="accent-serif text-accent">watch</span>.
        </p>
      </section>

      <footer className="flex items-center justify-between text-small text-muted">
        <span>Portfolio in progress</span>
        <a
          href={`mailto:${siteConfig.email}`}
          className="transition-colors duration-200 hover:text-foreground"
        >
          {siteConfig.email}
        </a>
      </footer>
    </main>
  );
}
