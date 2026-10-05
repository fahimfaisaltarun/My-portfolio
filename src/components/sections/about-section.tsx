import { ArrowUpRight } from "lucide-react";
import { aboutCopy, agency, credentials, platforms, profile, tools } from "@/data";
import { Reveal } from "@/components/motion/reveal";
import { ScrubWords } from "@/components/motion/scrub-words";
import { RollText } from "@/components/ui/roll-text";

/** Highlights each phrase from `aboutCopy.highlight` inside the statement. */
function Statement() {
  let parts: React.ReactNode[] = [aboutCopy.statement];
  for (const phrase of aboutCopy.highlight) {
    parts = parts.flatMap((part) => {
      if (typeof part !== "string" || !part.includes(phrase)) return [part];
      const [before, after] = part.split(phrase);
      return [
        before,
        <span key={phrase} className="accent-serif text-accent">
          {phrase}
        </span>,
        after,
      ];
    });
  }
  return <>{parts}</>;
}

/** About: scroll-lit statement, short bio, agency, credentials and toolkit. */
export function AboutSection() {
  const education = credentials.filter((c) => c.kind !== "experience");

  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-border section-y">
      <div className="container-page">
        <h2 id="about-title" className="label">
          <span className="mr-3 text-accent">(04)</span>
          {aboutCopy.eyebrow}
        </h2>

        <ScrubWords className="mt-8 max-w-6xl text-h2 font-extrabold tracking-display">
          <Statement />
        </ScrubWords>

        <Reveal className="mt-20 grid gap-12 border-t border-border pt-12 md:grid-cols-2 lg:grid-cols-12">
          <div data-reveal className="will-reveal space-y-5 lg:col-span-5">
            <h3 className="text-lead font-bold tracking-snug">Hi, I&apos;m {profile.shortName}.</h3>
            {profile.bio.map((paragraph) => (
              <p key={paragraph} className="max-w-md text-muted">
                {paragraph}
              </p>
            ))}
            <p className="max-w-md text-muted">{aboutCopy.agencyLine}</p>
            <a
              href={agency.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-medium"
            >
              <RollText>{`Visit ${agency.name}`}</RollText>
              <ArrowUpRight aria-hidden className="size-4 text-accent" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <div data-reveal className="will-reveal lg:col-span-3">
            <h3 className="label">Credentials</h3>
            <ul className="mt-5 space-y-4">
              {education.map((item) => (
                <li key={item.title}>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-small text-muted">
                    {item.issuer}
                    {item.end && ` · ${item.end}`}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="will-reveal md:col-span-2 lg:col-span-4">
            <h3 className="label">Platforms</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <li
                  key={platform}
                  className="rounded-full bg-surface-raised px-3 py-1.5 text-small"
                >
                  {platform}
                </li>
              ))}
            </ul>
            <h3 className="mt-8 label">Toolkit</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <li
                  key={tool.name}
                  className="rounded-full border border-border px-3 py-1.5 text-small text-foreground/80"
                >
                  {tool.name}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
