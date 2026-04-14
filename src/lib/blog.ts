import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  publishedAt: string;
  updatedAt?: string;
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
}

/** List all published blog posts sorted by date (newest first) */
export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(CONTENT_DIR, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);

      return {
        slug,
        title: (data.title as string) ?? slug,
        description: (data.description as string) ?? "",
        keywords: (data.keywords as string[]) ?? [],
        publishedAt: (data.publishedAt as string) ?? "",
        updatedAt: (data.updatedAt as string) ?? undefined,
      };
    })
    .filter((p) => p.publishedAt) // skip drafts without date
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Get a single blog post by slug, with rendered HTML */
export async function getPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? "",
    keywords: (data.keywords as string[]) ?? [],
    publishedAt: (data.publishedAt as string) ?? "",
    updatedAt: (data.updatedAt as string) ?? undefined,
    contentHtml,
  };
}

/** Get all slugs for static generation */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
