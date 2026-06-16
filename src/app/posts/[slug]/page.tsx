import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import CategoryBadge from "@/components/CategoryBadge";
import Link from "next/link";
import { format } from "date-fns";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

const GRAD: Record<string, string> = {
  "AI & Machine Learning": "from-violet-600 to-purple-700",
  "Physics":               "from-blue-600 to-sky-700",
  "Biology":               "from-emerald-600 to-green-700",
  "Medicine":              "from-rose-600 to-pink-700",
  "Chemistry":             "from-orange-500 to-amber-600",
  "Computer Science":      "from-cyan-600 to-teal-700",
  "Neuroscience":          "from-fuchsia-600 to-pink-700",
  "Climate & Environment": "from-teal-600 to-emerald-700",
  "Mathematics":           "from-amber-500 to-orange-600",
  "Space & Astronomy":     "from-indigo-600 to-violet-700",
};

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return post ? { title: post.title, description: post.summary } : {};
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const grad = GRAD[post.category] ?? "from-slate-700 to-slate-900";

  return (
    <>
      {/* Hero banner */}
      <div className={`bg-gradient-to-br ${grad} py-14 px-5`}>
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-8 transition-colors">
            ← Back to home
          </Link>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <CategoryBadge category={post.category} />
            <span className="text-white/60 text-sm">{post.readingTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-white/75 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
            {post.summary}
          </p>

          <div className="flex items-center gap-3 text-sm text-white/60">
            <span className="font-semibold text-white/90">{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-5 py-12">
        <article className="prose prose-slate prose-lg max-w-none
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
          prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline
          prose-code:text-violet-700 prose-code:bg-violet-50 prose-code:px-1.5 prose-code:py-0.5
          prose-code:rounded prose-code:text-sm prose-code:font-normal
          prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-slate-900 prose-pre:rounded-2xl prose-pre:border prose-pre:border-slate-800
          prose-blockquote:border-l-violet-500 prose-blockquote:text-slate-600
          prose-blockquote:bg-violet-50 prose-blockquote:rounded-r-xl prose-blockquote:py-1
          prose-img:rounded-2xl prose-table:text-sm">
          <MDXRemote source={post.content} />
        </article>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-10 pt-8 border-t border-slate-100">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Tags</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <Link href="/" className="btn-primary">
            ← More research
          </Link>
        </div>
      </div>
    </>
  );
}
