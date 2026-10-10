import { ArrowUpRight } from "lucide-react";
import { analyticsEnabled } from "@/config/site";
import { agency, footerCta, mainNav, profile, services } from "@/data";
import { CookieSettingsButton } from "@/components/analytics/cookie-settings-button";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Availability } from "@/components/ui/availability";
import { PillLink } from "@/components/ui/pill-link";
import { RollText } from "@/components/ui/roll-text";
import { withEmphasis } from "@/lib/text";
import { BackToTop } from "./back-to-top";
import { NavLink } from "./nav-link";

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="label">{title}</h3>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

const linkClass =
  "group inline-flex items-center gap-1 text-small text-foreground/80 transition-colors hover:text-foreground";

/** Site-wide footer: contact CTA (#contact), link columns, giant wordmark, legal bar. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const featuredServices = services.filter((service) => service.featured);

  return (
    <footer
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden border-t border-border bg-ink-900"
    >
      <div className="container-page section-y">
        {/* Call to action */}
        <div className="max-w-5xl">
          <p className="label">({footerCta.eyebrow})</p>
          <SplitReveal
            as="h2"
            id="contact-title"
            className="mt-6 text-h1 font-extrabold tracking-display"
          >
            {withEmphasis(footerCta.headline, footerCta.emphasis)}
          </SplitReveal>
          <p className="mt-8 max-w-xl text-lead text-muted">{footerCta.blurb}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <PillLink href={profile.primaryCta.href} size="lg">
              {profile.primaryCta.label}
            </PillLink>
            <a
              href={`mailto:${profile.email}`}
              className="group text-lead font-medium underline decoration-border-strong underline-offset-8 transition-colors hover:decoration-accent"
            >
              <RollText>{profile.email}</RollText>
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className="mt-24 grid gap-12 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <p className="text-lead font-bold tracking-snug">{profile.headline}</p>
            <p className="max-w-sm text-small text-muted">
              {profile.location.country} · Working with brands worldwide
            </p>
            <Availability />
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title="Navigate">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href} className={linkClass}>
                    <RollText>{item.label}</RollText>
                  </NavLink>
                </li>
              ))}
            </FooterColumn>
          </div>

          <div className="lg:col-span-3">
            <FooterColumn title="Services">
              {featuredServices.map((service) => (
                <li key={service.id}>
                  <NavLink href="/#services" className={linkClass}>
                    <RollText>{service.title}</RollText>
                  </NavLink>
                </li>
              ))}
            </FooterColumn>
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title="Socials">
              {profile.socials.map((social) => (
                <li key={social.url}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    <RollText>{social.label}</RollText>
                    <ArrowUpRight
                      aria-hidden
                      className="size-3.5 text-muted transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </FooterColumn>
          </div>
        </div>
      </div>

      {/* Giant wordmark — decorative; the name is already in text above. */}
      <div className="container-page" aria-hidden>
        <SplitReveal
          as="p"
          type="chars"
          scrub
          end="bottom bottom"
          className="-mb-[0.12em] text-center text-wordmark font-extrabold tracking-display whitespace-nowrap select-none"
        >
          {profile.fullName.split(" ").slice(0, 2).join(" ")}
        </SplitReveal>
      </div>

      {/* Legal bar */}
      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-4 py-6 text-small text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.fullName}. All rights reserved.
          </p>
          <a
            href={agency.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 transition-colors hover:text-foreground"
          >
            <RollText>{`${agency.role} of ${agency.name}`}</RollText>
            <ArrowUpRight aria-hidden className="size-3.5" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <div className="flex items-center gap-6">
            {analyticsEnabled && <CookieSettingsButton />}
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
