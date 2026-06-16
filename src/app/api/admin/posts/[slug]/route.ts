export const runtime = "nodejs";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function filePath(slug: string) {
  return path.join(POSTS_DIR, `${slug}.mdx`);
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fp = filePath(slug);
  if (!fs.existsSync(fp)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const raw = fs.readFileSync(fp, "utf-8");
  const { data, content } = matter(raw);
  return NextResponse.json({ slug, ...data, content });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fp = filePath(slug);
  if (!fs.existsSync(fp)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json();
  const { content, ...frontmatter } = body;

  const fileContent = matter.stringify(content ?? "", frontmatter);
  fs.writeFileSync(fp, fileContent, "utf-8");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fp = filePath(slug);
  if (!fs.existsSync(fp)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  fs.unlinkSync(fp);
  return NextResponse.json({ ok: true });
}
