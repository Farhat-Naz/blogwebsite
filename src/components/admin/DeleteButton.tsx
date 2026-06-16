"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirming) { setConfirming(true); return; }
    setLoading(true);
    await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" });
    router.refresh();
  }

  if (loading) return <span className="text-xs text-slate-400">Deleting…</span>;

  return (
    <button
      onClick={handleDelete}
      onBlur={() => setConfirming(false)}
      className={`text-xs px-2.5 py-1.5 rounded-lg transition font-medium ${
        confirming
          ? "bg-rose-600 text-white hover:bg-rose-700"
          : "bg-rose-50 text-rose-600 hover:bg-rose-100"
      }`}
    >
      {confirming ? "Sure?" : "Delete"}
    </button>
  );
}
