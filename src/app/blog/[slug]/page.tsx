import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: `${post.publishedAt}T00:00:00Z`,
      ...(post.updatedAt && {
        modifiedTime: `${post.updatedAt}T00:00:00Z`,
      }),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // Article JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Organization",
      name: siteConfig.organization.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.organization.name,
    },
    datePublished: `${post.publishedAt}T00:00:00Z`,
    dateModified: post.updatedAt
      ? `${post.updatedAt}T00:00:00Z`
      : `${post.publishedAt}T00:00:00Z`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${slug}`,
    },
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Link
        href="/blog"
        className="inline-flex items-center text-sm text-muted-foreground hover:underline mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        All articles
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            {post.title}
          </h1>
          <p className="text-muted-foreground mb-2">{post.description}</p>
          <time className="text-sm text-muted-foreground">
            Published {post.publishedAt}
            {post.updatedAt && ` · Updated ${post.updatedAt}`}
          </time>
        </header>

        <div
          className="prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>

      {/* CTA back to tool */}
      <div className="mt-16 p-6 border rounded-lg text-center">
        <h3 className="text-lg font-semibold mb-2">
          Try {siteConfig.name} Free
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {siteConfig.hero.subtitle}
        </p>
        <Link
          href="/tool"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {siteConfig.hero.cta}
        </Link>
      </div>
    </div>
  );
}
