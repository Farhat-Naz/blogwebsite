import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { format } from "date-fns";
import CategoryBadge from "@/components/CategoryBadge";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const posts = getAllPosts();

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Posts</h1>
          <p className="text-sm text-slate-500 mt-0.5">{posts.length} article{posts.length !== 1 ? "s" : ""} total</p>
        </div>
        <Link href="/admin/new" className="btn-primary">
          + New Post
        </Link>
      </div>

      {/* Table */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
          <p className="text-4xl mb-3">📝</p>
          <p className="font-semibold text-slate-700">No posts yet</p>
          <p className="text-sm text-slate-400 mt-1">Create your first article to get started.</p>
          <Link href="/admin/new" className="btn-primary mt-5 inline-flex">
            Create first post
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Title</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden lg:table-cell">Author</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden sm:table-cell">Date</th>
                <th className="px-4 py-3 w-28"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((post) => (
                <tr key={post.slug} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-900 line-clamp-1">{post.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5 font-mono">{post.slug}</p>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <CategoryBadge category={post.category} />
                  </td>
                  <td className="px-4 py-4 text-slate-500 hidden lg:table-cell">{post.author}</td>
                  <td className="px-4 py-4 text-slate-500 hidden sm:table-cell whitespace-nowrap">
                    {format(new Date(post.date), "MMM d, yyyy")}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/posts/${post.slug}`}
                        target="_blank"
                        className="text-xs px-2.5 py-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition"
                        title="View"
                      >
                        View ↗
                      </Link>
                      <Link
                        href={`/admin/edit/${post.slug}`}
                        className="text-xs px-2.5 py-1.5 rounded-lg bg-violet-50 text-violet-700 hover:bg-violet-100 transition font-medium"
                      >
                        Edit
                      </Link>
                      <DeleteButton slug={post.slug} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
