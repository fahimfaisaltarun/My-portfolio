import { mainNav, profile } from "@/data";
import { Availability } from "@/components/ui/availability";
import { Logo } from "@/components/ui/logo";
import { PillLink } from "@/components/ui/pill-link";
import { RollText } from "@/components/ui/roll-text";
import { HeaderShell } from "./header-shell";
import { MobileMenu } from "./mobile-menu";
import { NavLink } from "./nav-link";

/** Site-wide header: logo, desktop nav (lg+), CTA and mobile menu (< lg). */
export function SiteHeader() {
  return (
    <HeaderShell>
      <div className="container-page flex h-[var(--header-height)] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  className="group text-small font-medium text-muted transition-colors duration-300 hover:text-foreground aria-[current=page]:text-foreground"
                >
                  <RollText>{item.label}</RollText>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Availability className="hidden xl:inline-flex" />
          <PillLink href={profile.primaryCta.href} size="sm" className="hidden sm:inline-flex">
            {profile.primaryCta.label}
          </PillLink>
          <MobileMenu
            links={mainNav}
            socials={profile.socials}
            cta={profile.primaryCta}
            email={profile.email}
          />
        </div>
      </div>
    </HeaderShell>
  );
}
