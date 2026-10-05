import Image from "next/image";
import { designShowcase, featuredShowcase, workCopy } from "@/data";
import { Marquee } from "@/components/motion/marquee";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { WorkGallery } from "./work-gallery";

function ThumbRow({ reverse = false }: { reverse?: boolean }) {
  const boards = reverse ? [...designShowcase].reverse() : designShowcase;
  return (
    <Marquee speed={70} reverse={reverse}>
      <ul className="flex gap-4 pr-4">
        {boards.map((board) => (
          <li
            key={board.slug}
            className="w-64 shrink-0 overflow-hidden rounded-2xl border border-border sm:w-80"
          >
            <Image
              src={board.image.src}
              alt={board.image.alt}
              width={board.image.width}
              height={board.image.height}
              sizes="20rem"
              className="aspect-[4/3] w-full object-cover"
            />
          </li>
        ))}
      </ul>
    </Marquee>
  );
}

/** Selected work: giant scrolling "Work" word, showcase cards, and all-boards rows. */
export function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="overflow-hidden section-y">
      <Parallax x={[8, -18]} className="pointer-events-none select-none">
        <p
          aria-hidden
          className="text-display font-extrabold tracking-display whitespace-nowrap text-surface-raised"
        >
          Work <span className="accent-serif text-accent/80">that</span> works
        </p>
      </Parallax>

      <div className="container-page -mt-[0.35em] sm:-mt-[0.5em]">
        <SectionHeading copy={workCopy} id="work-title" index="02" align="split" />
        <Reveal className="mt-16">
          <WorkGallery boards={featuredShowcase} />
        </Reveal>
      </div>

      <div className="mt-20 space-y-4" aria-label="More social media designs" role="region">
        <ThumbRow />
        <ThumbRow reverse />
      </div>
    </section>
  );
}
