import { AboutSection } from "@/components/sections/about-section";
import { BlogSection } from "@/components/sections/blog-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { ProcessSection } from "@/components/sections/process-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { WorkSection } from "@/components/sections/work-section";

/**
 * Homepage, in section order (matches mainNav). The hero holds the page's
 * only <h1>; the footer (#contact) is rendered by the root layout.
 */
export default function HomePage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <HeroSection />
      <MarqueeBand />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <AboutSection />
      <ReviewsSection />
      <TestimonialsSection />
      <BlogSection />
    </main>
  );
}
