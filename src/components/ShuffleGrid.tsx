"use client";
import { useState, useCallback } from "react";
import type { PostMeta } from "@/lib/types";
import PostCard from "./PostCard";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ShuffleGrid({ posts }: { posts: PostMeta[] }) {
  const [items, setItems] = useState(posts);
  const [fading, setFading] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  const handleShuffle = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setItems(shuffle(posts));
      setRenderKey(k => k + 1);
      setFading(false);
    }, 250);
  }, [posts]);

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Recent Research
          <span className="ml-2 text-sm font-normal text-slate-400">({items.length} articles)</span>
        </h2>

        <button
          onClick={handleShuffle}
          className="btn-ghost text-sm gap-1.5"
        >
          <span className="text-base leading-none">⟳</span>
          Shuffle
        </button>
      </div>

      <div
        key={renderKey}
        className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-opacity duration-200 ${fading ? "opacity-0" : "opacity-100"}`}
      >
        {items.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
