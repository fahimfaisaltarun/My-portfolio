import { createMetadata } from "@/lib/seo";

/** Internal design-token preview. noindex + disallowed in robots.ts. */
export const metadata = createMetadata({
  title: "Design system",
  path: "/design",
  noIndex: true,
});

const swatches = [
  { name: "ink-950", hex: "#0A0A0A", role: "background" },
  { name: "ink-850", hex: "#161514", role: "surface" },
  { name: "ink-800", hex: "#1F1E1C", role: "surface-raised" },
  { name: "ink-700", hex: "#2A2826", role: "border" },
  { name: "bone-50", hex: "#F4F1EC", role: "foreground" },
  { name: "ash-400", hex: "#8C8782", role: "muted" },
  { name: "ember-500", hex: "#E8352B", role: "accent" },
  { name: "ember-400", hex: "#FF5446", role: "accent-hover" },
];

const typeScale = [
  { token: "text-display", sample: "Work" },
  { token: "text-h1", sample: "Fahim Faisal" },
  { token: "text-h2", sample: "Selected work" },
  { token: "text-h3", sample: "Performance ads" },
  { token: "text-lead", sample: "Edits that help brands get watched and sell." },
  { token: "text-body", sample: "Body copy sits at 16px with relaxed line height." },
  { token: "text-small", sample: "Supporting text and meta information." },
] as const;

export default function DesignPage() {
  return (
    <main id="main" className="container-page section-y space-y-24">
      <header className="space-y-4">
        <span className="label">Internal · Ember noir</span>
        <h1 className="text-h2 tracking-display font-extrabold">Design system</h1>
      </header>

      <section aria-labelledby="colors" className="space-y-6">
        <h2 id="colors" className="label">Colour</h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {swatches.map((s) => (
            <li key={s.name} className="space-y-3">
              <div
                className="aspect-[4/3] rounded-2xl border border-border"
                style={{ backgroundColor: s.hex }}
              />
              <div className="text-small">
                <p className="font-medium">{s.name}</p>
                <p className="text-muted">
                  {s.hex} · {s.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="type" className="space-y-6">
        <h2 id="type" className="label">Type — Inter Tight + Instrument Serif</h2>
        <div className="space-y-8">
          {typeScale.map(({ token, sample }) => (
            <div key={token} className="grid gap-2 border-t border-border pt-4 md:grid-cols-[12rem_1fr]">
              <code className="text-small text-muted">{token}</code>
              <p
                className={`${token} ${token.startsWith("text-h") || token === "text-display" ? "tracking-display font-extrabold" : ""}`}
              >
                {sample}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="accents" className="space-y-6">
        <h2 id="accents" className="label">Accent patterns</h2>
        <p className="text-h2 tracking-display font-extrabold">
          Making people <span className="pill-accent accent-serif">stop</span> the scroll and{" "}
          <span className="accent-serif text-accent">watch</span>
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#"
            className="rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground transition-colors duration-200 hover:bg-accent-hover"
          >
            Primary CTA
          </a>
          <a
            href="#"
            className="rounded-full border border-border-strong px-6 py-3 font-medium transition-colors duration-200 hover:border-foreground"
          >
            Secondary CTA
          </a>
        </div>
      </section>

      <section data-theme="light" aria-labelledby="light" className="-mx-[var(--gutter)] rounded-3xl p-[var(--gutter)] section-y">
        <h2 id="light" className="label">Light section · data-theme=&quot;light&quot;</h2>
        <p className="text-h2 tracking-display mt-6 font-extrabold">
          I help brands sell with <span className="accent-serif text-accent">video</span>
        </p>
      </section>
    </main>
  );
}
