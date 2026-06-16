import Link from "next/link";
import { format } from "date-fns";
import type { PostMeta } from "@/lib/types";
import CategoryBadge from "./CategoryBadge";

/* Thin colored top border per category */
const BORDER: Record<string, string> = {
  "AI & Machine Learning": "border-t-violet-500",
  "Physics":               "border-t-blue-500",
  "Biology":               "border-t-emerald-500",
  "Medicine":              "border-t-rose-500",
  "Chemistry":             "border-t-orange-500",
  "Computer Science":      "border-t-cyan-500",
  "Neuroscience":          "border-t-pink-500",
  "Climate & Environment": "border-t-teal-500",
  "Mathematics":           "border-t-amber-500",
  "Space & Astronomy":     "border-t-indigo-500",
};

export default function PostCard({ post }: { post: PostMeta }) {
  const topBorder = BORDER[post.category] ?? "border-t-slate-400";

  return (
    <article className={`card border-t-4 ${topBorder} flex flex-col`}>
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Meta row */}
        <div className="flex items-center gap-2 flex-wrap">
          <CategoryBadge category={post.category} />
          <span className="text-xs text-slate-400">{post.readingTime}</span>
        </div>

        {/* Title */}
        <Link href={`/posts/${post.slug}`} className="group/t block">
          <h2 className="font-bold text-slate-900 leading-snug text-[15px] group-hover/t:text-violet-600 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Summary */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
          {post.summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400 mt-auto">
          <span className="font-medium text-slate-600 truncate max-w-[140px]">{post.author}</span>
          <time dateTime={post.date}>{format(new Date(post.date), "MMM d, yyyy")}</time>
        </div>
      </div>
    </article>
  );
}
