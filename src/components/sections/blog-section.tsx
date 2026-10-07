import { blogCopy } from "@/data";
import { getPosts } from "@/lib/blog";
import { Reveal } from "@/components/motion/reveal";
import { PillLink } from "@/components/ui/pill-link";
import { BlogCard } from "@/components/ui/blog-card";
import { SectionHeading } from "@/components/ui/section-heading";

const PREVIEW_COUNT = 3;

/**
 * Latest blog posts as cards, linking to /blog. Renders nothing until a post
 * is published (drafts appear in development only).
 */
export async function BlogSection() {
  const posts = (await getPosts()).slice(0, PREVIEW_COUNT);
  if (posts.length === 0) return null;

  return (
    <section id="blog" aria-labelledby="blog-title" className="section-y">
      <div className="container-page">
        <SectionHeading copy={blogCopy} id="blog-title" index="07" align="split" />

        <Reveal as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug} data-reveal className="will-reveal">
              <BlogCard post={post} />
            </li>
          ))}
        </Reveal>

        <div className="mt-12 flex justify-center">
          <PillLink href="/blog" variant="outline">
            View all articles
          </PillLink>
        </div>
      </div>
    </section>
  );
}
