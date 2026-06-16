import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "All Posts" };

export default function PostsPage() {
  const posts = getAllPosts();
  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-1">All Posts</h1>
      <p className="text-slate-500 mb-10">{posts.length} article{posts.length !== 1 ? "s" : ""}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map(post => <PostCard key={post.slug} post={post} />)}
      </div>
    </div>
  );
}
