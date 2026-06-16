import Link from "next/link";
import { format } from "date-fns";
import type { PostMeta } from "@/lib/types";
import CategoryBadge from "./CategoryBadge";

/* Gradient per category */
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

const EMOJI: Record<string, string> = {
  "AI & Machine Learning": "🤖", "Physics": "⚛️", "Biology": "🧬",
  "Medicine": "🩺", "Chemistry": "🧪", "Computer Science": "💻",
  "Neuroscience": "🧠", "Climate & Environment": "🌍",
  "Mathematics": "∑", "Space & Astronomy": "🔭",
};

export default function FeaturedPost({ post }: { post: PostMeta }) {
  const grad = GRAD[post.category] ?? "from-slate-700 to-slate-900";
  const emoji = EMOJI[post.category] ?? "📄";

  return (
    <Link href={`/posts/${post.slug}`} className="block group">
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${grad} p-8 md:p-10`}>
        {/* Subtle dot grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-white/60 bg-white/10 rounded-full px-3 py-1">
                Featured Today
              </span>
              <CategoryBadge category={post.category} />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3 group-hover:text-white/90 transition-colors">
              {post.title}
            </h2>

            <p className="text-white/70 leading-relaxed mb-5 max-w-xl text-sm md:text-base line-clamp-3">
              {post.summary}
            </p>

            <div className="flex items-center gap-3 text-sm text-white/60">
              <span className="font-medium text-white/80">{post.author}</span>
              <span>·</span>
              <time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
          </div>

          {/* Big emoji */}
          <div className="text-7xl md:text-8xl select-none flex-shrink-0 hidden sm:block opacity-90">
            {emoji}
          </div>
        </div>

        {/* Read more */}
        <div className="absolute bottom-5 right-6 text-xs font-semibold text-white/40 group-hover:text-white/70 transition-colors">
          Read article →
        </div>
      </div>
    </Link>
  );
}
