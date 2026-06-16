import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostMeta } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function getPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
}

export function getAllPosts(): PostMeta[] {
  return getPostFiles()
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      const rt = readingTime(content);
      return {
        slug,
        title: data.title,
        date: data.date,
        summary: data.summary,
        category: data.category,
        tags: data.tags ?? [],
        author: data.author ?? "Editorial Team",
        readingTime: rt.text,
        image: data.image,
      } as PostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);
  return {
    slug,
    title: data.title,
    date: data.date,
    summary: data.summary,
    category: data.category,
    tags: data.tags ?? [],
    author: data.author ?? "Editorial Team",
    readingTime: rt.text,
    image: data.image,
    content,
  } as Post;
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): string[] {
  const all = getAllPosts().map((p) => p.category);
  return Array.from(new Set(all));
}

export function getAllTags(): string[] {
  const all = getAllPosts().flatMap((p) => p.tags);
  return Array.from(new Set(all));
}
