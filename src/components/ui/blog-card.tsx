import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPostDate, type PostSummary } from "@/lib/blog";
import { cn } from "@/lib/utils";

type Props = {
  post: PostSummary;
  /** h3 under a section h2 (homepage); h2 directly under the page h1 (/blog). */
  headingLevel?: "h2" | "h3";
  /** Larger image + title for the lead post on /blog. */
  featured?: boolean;
  /** Load the cover eagerly (above-the-fold cards only). */
  priority?: boolean;
  className?: string;
};

/**
 * Blog preview card. The title link is stretched over the whole card, so the
 * card is one click target but screen readers announce just the title.
 */
export function BlogCard({
  post,
  headingLevel: Heading = "h3",
  featured = false,
  priority = false,
  className,
}: Props) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 focus-within:border-border-strong hover:border-border-strong",
        featured && "lg:grid lg:grid-cols-12",
        className,
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden bg-surface-raised",
          featured && "lg:col-span-7",
        )}
      >
        {post.cover ? (
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            priority={priority}
            sizes={
              featured
                ? "(min-width: 64rem) 55vw, 100vw"
                : "(min-width: 64rem) 30vw, (min-width: 40rem) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04] motion-reduce:transition-none"
          />
        ) : (
          <div aria-hidden className="absolute inset-0 grid place-items-center p-8">
            <span className="text-center accent-serif text-h2 text-foreground/80">
              {post.category}
            </span>
            <span className="absolute right-5 bottom-5 size-2.5 rounded-full bg-accent" />
          </div>
        )}
        {post.status === "draft" && (
          <span className="absolute top-4 left-4 rounded-full bg-background/85 px-3 py-1 text-caption font-medium text-foreground backdrop-blur">
            Draft — dev only
          </span>
        )}
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col p-6 sm:p-7",
          featured && "lg:col-span-5 lg:justify-center lg:p-12",
        )}
      >
        <p className="flex items-center gap-2 text-caption font-medium tracking-label text-muted uppercase">
          <span className="text-accent">{post.category}</span>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </p>

        <Heading
          className={cn(
            "mt-4 font-bold tracking-tight text-balance",
            featured ? "text-h3" : "text-lead leading-snug",
          )}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
          >
            {post.title}
          </Link>
        </Heading>

        <p className={cn("mt-3 line-clamp-3 text-foreground/75", featured && "lg:text-lead")}>
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-8">
          <time dateTime={post.publishedAt} className="text-small text-muted">
            {formatPostDate(post.publishedAt)}
          </time>
          <span
            aria-hidden
            className="grid size-10 place-items-center rounded-full border border-border-strong text-foreground transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground motion-reduce:transition-none"
          >
            <ArrowUpRight className="size-4" strokeWidth={2.25} />
          </span>
        </div>
      </div>
    </article>
  );
}
