import PostForm from "@/components/admin/PostForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "New Post — Admin" };

export default function NewPostPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">New Post</h1>
        <p className="text-sm text-slate-500 mt-0.5">Fill in the details and write your article.</p>
      </div>
      <PostForm />
    </div>
  );
}
