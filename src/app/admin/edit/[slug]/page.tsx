export const dynamic = "force-dynamic";

import { getPostBySlug } from "@/lib/posts";
import PostForm from "@/components/admin/PostForm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return { title: post ? `Edit: ${post.title}` : "Edit Post" };
}

export default async function EditPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Edit Post</h1>
        <p className="text-sm text-slate-500 mt-0.5 font-mono">{slug}</p>
      </div>
      <PostForm
        initialData={{
          title: post.title,
          date: post.date,
          summary: post.summary,
          category: post.category,
          tags: post.tags,
          author: post.author,
          content: post.content,
        }}
        isEditing
        slug={slug}
      />
    </div>
  );
}
