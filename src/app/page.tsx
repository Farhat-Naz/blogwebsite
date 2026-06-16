import { getAllPosts, getAllCategories } from "@/lib/posts";
import FeaturedPost from "@/components/FeaturedPost";
import ShuffleGrid from "@/components/ShuffleGrid";
import CategoryBadge from "@/components/CategoryBadge";
import Link from "next/link";

export default function HomePage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="max-w-5xl mx-auto px-5 py-12 space-y-14">

      {/* Hero */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold px-4 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 inline-block"></span>
          Updated daily · All science fields
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
          The world&apos;s research,<br />
          <span className="text-violet-600">distilled daily</span>
        </h1>

        <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
          Curated summaries of breakthrough science — AI, physics, medicine, biology, and more.
        </p>
      </section>

      {/* Category filter strip */}
      {categories.length > 0 && (
        <section className="flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <Link key={cat} href={`/categories/${encodeURIComponent(cat)}`}
              className="hover:scale-105 transition-transform">
              <CategoryBadge category={cat} />
            </Link>
          ))}
        </section>
      )}

      {/* Featured post */}
      {featured && (
        <section>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Featured today</p>
          <FeaturedPost post={featured} />
        </section>
      )}

      {/* Shuffle grid */}
      {rest.length > 0 && <ShuffleGrid posts={rest} />}

      {posts.length === 0 && (
        <div className="text-center py-24 text-slate-400">
          <div className="text-5xl mb-4">🔬</div>
          <p className="font-semibold text-slate-700">No posts yet</p>
          <p className="text-sm mt-1">Add <code className="text-violet-600">.mdx</code> files to <code className="text-violet-600">content/posts/</code></p>
        </div>
      )}
    </div>
  );
}
