import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { profile } from "@/data";
import { cn } from "@/lib/utils";
import { PillLink } from "@/components/ui/pill-link";

/**
 * Styles for blog post bodies (src/content/blog/*.mdx). Markdown maps to these
 * elements, so posts stay plain Markdown and every post looks consistent.
 * Required by @next/mdx in the App Router.
 */

function MdxLink({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  const className =
    "font-medium text-foreground underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent";
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

type FigureProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** Extend past the text column on large screens (detailed images, infographics). */
  wide?: boolean;
};

/**
 * Image with exact dimensions (no layout shift) and an optional caption.
 * Use in MDX: <Figure src="/images/blog/x.webp" alt="…" width={1600} height={900} caption="…" wide />
 */
/**
 * Primary call to action (Upwork link from src/data/profile.ts).
 * Use in MDX: <HireMe /> or <HireMe label="Work with me" />
 */
function HireMe({ label = profile.primaryCta.label }: { label?: string }) {
  return (
    <div className="my-10">
      <PillLink href={profile.primaryCta.href} size="lg">
        {label}
      </PillLink>
    </div>
  );
}

function Figure({ src, alt, width, height, caption, wide = false }: FigureProps) {
  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={
        wide
          ? "(min-width: 80rem) 64rem, (min-width: 48rem) 46rem, 100vw"
          : "(min-width: 48rem) 46rem, 100vw"
      }
      className="h-auto w-full rounded-2xl border border-border"
    />
  );
  return (
    <figure className={cn("my-10", wide && "xl:-mx-36")}>
      {wide ? (
        // Detailed images open full size so their text is readable on phones.
        <a href={src} target="_blank" rel="noopener" className="block rounded-2xl">
          {image}
          <span className="sr-only"> (opens full size in a new tab)</span>
        </a>
      ) : (
        image
      )}
      {(caption || wide) && (
        <figcaption className="mt-3 text-center text-small text-muted">
          {caption}
          {wide && <span className="lg:hidden"> Tap the image to view it full size.</span>}
        </figcaption>
      )}
    </figure>
  );
}

const components = {
  // The post title is the page's only h1, so a Markdown "#" becomes an h2.
  h1: ({ className, ...props }) => (
    <h2 className={cn("mt-14 mb-5 text-h3 font-bold tracking-tight", className)} {...props} />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn("mt-14 mb-5 scroll-mt-28 text-h3 font-bold tracking-tight", className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn("mt-10 mb-4 scroll-mt-28 text-lead font-semibold tracking-snug", className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4 className={cn("mt-8 mb-3 font-semibold", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("my-5 text-foreground/85", className)} {...props} />
  ),
  a: MdxLink,
  strong: ({ className, ...props }) => (
    <strong className={cn("font-semibold text-foreground", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-5 list-disc space-y-2 pl-6 marker:text-accent", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("my-5 list-decimal space-y-2 pl-6 marker:text-muted", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("pl-1 text-foreground/85", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "my-10 border-l-2 border-accent pl-6 font-serif text-h3 leading-snug text-foreground italic [&>p]:text-foreground",
        className,
      )}
      {...props}
    />
  ),
  hr: () => <hr className="my-14 border-border" />,
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded-md bg-surface-raised px-1.5 py-0.5 font-mono text-[0.9em] text-foreground",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "my-8 overflow-x-auto rounded-2xl border border-border bg-surface p-5 text-small [&>code]:bg-transparent [&>code]:p-0",
        className,
      )}
      {...props}
    />
  ),
  // Plain Markdown images have no size; prefer <Figure> for exact dimensions.
  img: ({ src, alt = "" }) => (
    <Image
      src={typeof src === "string" ? src : ""}
      alt={alt}
      width={1600}
      height={900}
      sizes="(min-width: 48rem) 46rem, 100vw"
      className="my-10 h-auto w-full rounded-2xl border border-border"
    />
  ),
  table: ({ className, ...props }) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-border">
      <table className={cn("w-full text-left text-small", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn("border-b border-border bg-surface px-4 py-3 font-semibold", className)}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn("border-b border-border px-4 py-3 text-foreground/85", className)}
      {...props}
    />
  ),
  Figure,
  HireMe,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
