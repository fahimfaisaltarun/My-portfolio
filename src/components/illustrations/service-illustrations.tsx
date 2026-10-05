import type { ServiceCategory } from "@/data";

/**
 * Line-art service illustrations (decorative, aria-hidden). Pure SVG so they
 * server-render; wrap in <DrawOnScroll> to animate:
 * data-draw = stroke draws in, data-pop = scales in, data-float / data-pulse = idle loops.
 * Strokes use currentColor (foreground); accents use the ember token.
 */

const base = {
  viewBox: "0 0 240 180",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "h-auto w-full",
};

function SocialIllustration() {
  return (
    <svg {...base}>
      {/* phone */}
      <rect data-draw x="74" y="14" width="92" height="152" rx="16" />
      <path data-draw d="M108 26h24" />
      {/* post */}
      <rect data-draw x="86" y="42" width="68" height="56" rx="8" />
      <path data-draw d="M92 88l16-18 12 12 10-9 18 15" className="stroke-muted" />
      <path data-draw d="M88 110h40M88 122h56M88 134h28" className="stroke-muted" />
      {/* heart */}
      <g data-pulse>
        <path
          data-pop
          d="M146 148c-6-5-12-9-12-15a6 6 0 0 1 12-2 6 6 0 0 1 12 2c0 6-6 10-12 15z"
          className="fill-accent stroke-accent"
        />
      </g>
      {/* growth arrow */}
      <path data-draw d="M24 150l30-30 18 14 38-46" className="stroke-accent" strokeWidth={2.5} />
      <path data-draw d="M96 88h14v14" className="stroke-accent" strokeWidth={2.5} />
      {/* floating reactions */}
      <g data-float>
        <circle data-pop cx="196" cy="46" r="14" className="stroke-accent" />
        <path data-draw d="M190 46l4 4 8-8" className="stroke-accent" />
      </g>
      <g data-float>
        <rect data-pop x="178" y="92" width="44" height="24" rx="12" />
        <circle data-pop cx="191" cy="104" r="2.5" className="fill-current" />
        <circle data-pop cx="200" cy="104" r="2.5" className="fill-current" />
        <circle data-pop cx="209" cy="104" r="2.5" className="fill-current" />
      </g>
    </svg>
  );
}

function VideoIllustration() {
  return (
    <svg {...base}>
      {/* vertical video frame */}
      <rect data-draw x="70" y="10" width="100" height="160" rx="16" />
      {/* play button */}
      <g data-pulse>
        <circle data-pop cx="120" cy="78" r="24" className="fill-accent stroke-accent" />
        <path data-pop d="M113 66l20 12-20 12z" className="fill-background stroke-background" />
      </g>
      {/* progress bar */}
      <path data-draw d="M84 140h72" className="stroke-muted" />
      <path data-draw d="M84 140h44" className="stroke-accent" strokeWidth={3} />
      <circle data-pop cx="128" cy="140" r="4" className="fill-accent stroke-accent" />
      {/* caption lines */}
      <path data-draw d="M84 120h50M84 128h32" className="stroke-muted" />
      {/* timeline / waveform */}
      <g data-float>
        <path
          data-draw
          d="M190 60v24M200 50v44M210 64v16M220 54v36"
          className="stroke-accent"
          strokeWidth={3}
        />
      </g>
      <g data-float>
        <rect data-pop x="14" y="98" width="42" height="30" rx="6" />
        <path data-draw d="M26 106l12 7-12 7z" />
      </g>
      <path data-draw d="M22 60c10-14 26-14 36 0" className="stroke-muted" />
      <path data-draw d="M28 52c7-8 17-8 24 0" className="stroke-muted" />
    </svg>
  );
}

function WebIllustration() {
  return (
    <svg {...base}>
      {/* browser */}
      <rect data-draw x="20" y="20" width="200" height="140" rx="14" />
      <path data-draw d="M20 46h200" />
      <circle data-pop cx="36" cy="33" r="3.5" className="fill-accent stroke-accent" />
      <circle data-pop cx="48" cy="33" r="3.5" className="fill-current" />
      <circle data-pop cx="60" cy="33" r="3.5" className="fill-current" />
      {/* hero block */}
      <path data-draw d="M38 70h86M38 84h60" strokeWidth={3} />
      <path data-draw d="M38 100h74M38 110h52" className="stroke-muted" />
      {/* CTA */}
      <rect
        data-pop
        x="38"
        y="124"
        width="58"
        height="20"
        rx="10"
        className="fill-accent stroke-accent"
      />
      {/* image block */}
      <rect data-draw x="138" y="62" width="64" height="82" rx="8" className="stroke-muted" />
      <path data-draw d="M144 132l16-20 12 12 10-8 14 16" className="stroke-muted" />
      <circle data-draw cx="186" cy="80" r="7" className="stroke-muted" />
      {/* cursor */}
      <g data-float>
        <path
          data-pop
          d="M98 132l0 26 7-7 6 12 6-3-6-12 10 0z"
          className="fill-foreground stroke-background"
          strokeWidth={1.5}
        />
      </g>
    </svg>
  );
}

function AdsIllustration() {
  return (
    <svg {...base}>
      {/* target */}
      <circle data-draw cx="88" cy="92" r="64" />
      <circle data-draw cx="88" cy="92" r="42" className="stroke-muted" />
      <circle data-draw cx="88" cy="92" r="20" />
      <g data-pulse>
        <circle data-pop cx="88" cy="92" r="7" className="fill-accent stroke-accent" />
      </g>
      {/* arrow */}
      <path data-draw d="M178 22L94 86" className="stroke-accent" strokeWidth={2.5} />
      <path
        data-draw
        d="M170 16l10 4-4 10M182 30l8 2-2 8"
        className="stroke-accent"
        strokeWidth={2.5}
      />
      {/* results chart */}
      <g data-float>
        <rect data-draw x="160" y="104" width="64" height="58" rx="8" />
        <path
          data-draw
          d="M172 150v-10M184 150v-18M196 150v-14M208 150v-28"
          className="stroke-accent"
          strokeWidth={4}
        />
      </g>
    </svg>
  );
}

const illustrations: Partial<Record<ServiceCategory, () => React.JSX.Element>> = {
  "social-media": SocialIllustration,
  "short-form-video": VideoIllustration,
  "web-design": WebIllustration,
  "paid-ads": AdsIllustration,
};

export function ServiceIllustration({ id }: { id: ServiceCategory }) {
  const Illustration = illustrations[id];
  return Illustration ? <Illustration /> : null;
}
