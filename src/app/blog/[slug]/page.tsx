import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { profile, visiblePosts } from "@/data";
import { siteConfig } from "@/config/site";
import { formatPostDate, getPost, getRelatedPosts, loadPostBody } from "@/lib/blog";
import { blogPostingJsonLd, breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogCard } from "@/components/ui/blog-card";

/** Every post is prerendered at build time; unknown slugs 404. */
export function generateStaticParams() {
  return visiblePosts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: `/blog/${post.slug}/opengraph-image`,
    article: {
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      section: post.category,
      tags: post.tags,
    },
  });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const [Body, related] = await Promise.all([loadPostBody(slug), getRelatedPosts(post)]);
  const updated = post.updatedAt && post.updatedAt !== post.publishedAt;

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <JsonLd
        data={[
          blogPostingJsonLd(post),
          breadcrumbJsonLd([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article aria-labelledby="post-title">
        <header className="container-page pt-[calc(var(--header-height)+3rem)] sm:pt-[calc(var(--header-height)+5rem)]">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-small font-medium text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transition-none"
              />
              All articles
            </Link>

            <p className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-caption font-medium tracking-label text-muted uppercase">
              <span className="text-accent">{post.category}</span>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min read</span>
              {post.status === "draft" && (
                <>
                  <span aria-hidden>·</span>
                  <span className="text-foreground">Draft — not visible in production</span>
                </>
              )}
            </p>

            <h1
              id="post-title"
              className="mt-5 text-h2 font-extrabold tracking-display text-balance"
            >
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-muted">{post.excerpt}</p>

            <div className="mt-10 flex items-center gap-4 border-t border-border pt-6">
              <Image
                src={profile.portrait.src}
                alt=""
                width={48}
                height={48}
                className="size-12 rounded-full object-cover object-top grayscale"
              />
              <div className="text-small">
                <p className="font-semibold text-foreground">{siteConfig.name}</p>
                <p className="text-muted">
                  <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                  {updated && (
                    <>
                      {" · Updated "}
                      <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt!)}</time>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </header>

        {post.cover && (
          <div className="container-page mt-12 sm:mt-16">
            <Image
              src={post.cover.src}
              alt={post.cover.alt}
              width={post.cover.width}
              height={post.cover.height}
              priority
              sizes="(min-width: 100rem) 95rem, 100vw"
              className="mx-auto aspect-[16/9] w-full max-w-6xl rounded-3xl border border-border object-cover"
            />
          </div>
        )}

        <div className="container-page">
          <div className="mx-auto max-w-[46rem] pt-8 pb-[clamp(4rem,3rem+4vw,7rem)] sm:text-[1.0625rem]">
            <Body />

            {post.tags && post.tags.length > 0 && (
              <ul
                aria-label="Tags"
                className="mt-14 flex flex-wrap gap-2 border-t border-border pt-8"
              >
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-small text-muted"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section
          aria-labelledby="related-title"
          className="border-t border-border pt-[clamp(4rem,3rem+4vw,7rem)] pb-[clamp(5rem,3rem+8vw,11rem)]"
        >
          <div className="container-page">
            <h2 id="related-title" className="text-h3 font-bold tracking-tight">
              Keep <span className="accent-serif text-accent">reading</span>
            </h2>
            <Reveal as="ul" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug} data-reveal className="will-reveal">
                  <BlogCard post={item} />
                </li>
              ))}
            </Reveal>
          </div>
        </section>
      )}
    </main>
  );
}
