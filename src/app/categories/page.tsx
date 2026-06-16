import { getAllPosts } from "@/lib/posts";
import CategoryBadge from "@/components/CategoryBadge";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Categories" };

export default function CategoriesPage() {
  const posts = getAllPosts();
  const counts: Record<string, number> = {};
  for (const p of posts) counts[p.category] = (counts[p.category] ?? 0) + 1;
  const categories = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-1">Categories</h1>
      <p className="text-slate-500 mb-10">Browse research by scientific field</p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map(([cat, count]) => (
          <Link key={cat} href={`/categories/${encodeURIComponent(cat)}`}
            className="card p-5 group flex items-center justify-between">
            <div>
              <CategoryBadge category={cat} />
              <p className="text-xs text-slate-400 mt-2">{count} article{count !== 1 ? "s" : ""}</p>
            </div>
            <span className="text-slate-300 group-hover:text-violet-500 transition-colors text-lg">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
