import { HeroSection } from "@/components/sections/hero-section";

/**
 * Homepage. Sections are added here in roadmap order (see docs/project-brief.md).
 * The hero holds the page's only <h1>.
 */
export default function HomePage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <HeroSection />
    </main>
  );
}
