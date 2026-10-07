import { blogPageCopy, visiblePosts } from "@/data";
import { getPosts } from "@/lib/blog";
import { blogJsonLd, breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { withEmphasis } from "@/lib/text";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogCard } from "@/components/ui/blog-card";

export const metadata = createMetadata({
  title: "Blog",
  description: blogPageCopy.intro,
  path: "/blog",
  // Kept out of search until the first post is published.
  noIndex: visiblePosts.length === 0,
});

/** Blog index: newest post as a wide lead card, the rest in a grid. */
export default async function BlogPage() {
  const posts = await getPosts();
  const [lead, ...rest] = posts;

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <JsonLd data={[blogJsonLd(posts), breadcrumbJsonLd([{ name: "Blog", path: "/blog" }])]} />

      <section
        aria-labelledby="blog-title"
        className="section-y pt-[calc(var(--header-height)+4rem)]"
      >
        <div className="container-page">
          <header className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <p className="label">{blogPageCopy.eyebrow}</p>
              <SplitReveal
                as="h1"
                id="blog-title"
                className="mt-5 text-h1 font-extrabold tracking-display"
              >
                {withEmphasis(blogPageCopy.title, blogPageCopy.emphasis)}
              </SplitReveal>
            </div>
            <p className="max-w-md text-lead text-muted lg:col-span-4 lg:justify-self-end lg:text-right">
              {blogPageCopy.intro}
            </p>
          </header>

          {lead ? (
            <div className="mt-16 space-y-5">
              {/* Lead card is above the fold (LCP), so it isn't hidden for a reveal. */}
              <BlogCard post={lead} headingLevel="h2" featured priority />
              {rest.length > 0 && (
                <Reveal as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <li key={post.slug} data-reveal className="will-reveal">
                      <BlogCard post={post} headingLevel="h2" />
                    </li>
                  ))}
                </Reveal>
              )}
            </div>
          ) : (
            <p className="mt-16 rounded-2xl border border-border bg-surface p-10 text-center text-lead text-muted">
              {blogPageCopy.empty}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
