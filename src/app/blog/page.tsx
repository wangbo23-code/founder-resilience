import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.name}`,
  description: `Tips, guides, and insights about ${siteConfig.name.toLowerCase()} and related topics.`,
};

export default function BlogIndex() {
  const posts = getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground">No articles yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Blog</h1>
      <p className="text-muted-foreground mb-10">
        Guides, tips, and insights to help you get the most out of{" "}
        {siteConfig.name}.
      </p>

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-6">
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-xl font-semibold group-hover:underline mb-1">
                {post.title}
              </h2>
            </Link>
            <p className="text-sm text-muted-foreground mb-2">
              {post.description}
            </p>
            <time className="text-xs text-muted-foreground">
              {post.publishedAt}
            </time>
          </article>
        ))}
      </div>
    </div>
  );
}
