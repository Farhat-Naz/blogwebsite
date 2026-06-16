import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function ensureDir() {
  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });
}

export async function GET() {
  ensureDir();
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
    const { data } = matter(raw);
    return { slug, ...data };
  });
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  ensureDir();
  const body = await request.json();
  const { slug, content, ...frontmatter } = body;

  if (!slug || !frontmatter.title) {
    return NextResponse.json({ error: "slug and title are required" }, { status: 400 });
  }

  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (fs.existsSync(filePath)) {
    return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
  }

  const fileContent = matter.stringify(content ?? "", frontmatter);
  fs.writeFileSync(filePath, fileContent, "utf-8");
  return NextResponse.json({ ok: true, slug }, { status: 201 });
}
