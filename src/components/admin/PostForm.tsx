"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  "AI & Machine Learning", "Physics", "Biology", "Medicine",
  "Chemistry", "Computer Science", "Neuroscience",
  "Climate & Environment", "Mathematics", "Space & Astronomy",
];

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

interface PostData {
  title: string;
  date: string;
  summary: string;
  category: string;
  tags: string[];
  author: string;
  content: string;
}

interface Props {
  initialData?: PostData & { slug?: string };
  isEditing?: boolean;
  slug?: string;
}

export default function PostForm({ initialData, isEditing, slug }: Props) {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState<PostData>({
    title: initialData?.title ?? "",
    date: initialData?.date ?? today,
    summary: initialData?.summary ?? "",
    category: initialData?.category ?? CATEGORIES[0],
    tags: initialData?.tags ?? [],
    author: initialData?.author ?? "",
    content: initialData?.content ?? "",
  });

  const [postSlug, setPostSlug] = useState(slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEditing ?? false);
  const [tagInput, setTagInput] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = useCallback((field: keyof PostData, value: string) => {
    setForm((f) => {
      const next = { ...f, [field]: value };
      if (field === "title" && !slugTouched) {
        setPostSlug(toSlug(value));
      }
      return next;
    });
  }, [slugTouched]);

  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = tagInput.trim().replace(/^,|,$/g, "");
      if (tag && !form.tags.includes(tag)) {
        setForm((f) => ({ ...f, tags: [...f.tags, tag] }));
      }
      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setErrorMsg("");

    const payload = { ...form, slug: postSlug };
    const url = isEditing
      ? `/api/admin/posts/${slug}`
      : "/api/admin/posts";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus("success");
      setTimeout(() => router.push("/admin"), 800);
      router.refresh();
    } else {
      const data = await res.json();
      setErrorMsg(data.error ?? "Save failed");
      setStatus("error");
    }
  }

  const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Left column — metadata */}
      <div className="lg:col-span-1 space-y-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <h2 className="font-semibold text-slate-900 text-sm">Post details</h2>

          {/* Slug */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
              Slug (URL)
            </label>
            <input
              type="text"
              value={postSlug}
              onChange={(e) => { setPostSlug(e.target.value); setSlugTouched(true); }}
              required
              disabled={isEditing}
              placeholder="my-post-slug"
              className={`${inputCls} font-mono text-xs ${isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {!isEditing && <p className="text-xs text-slate-400 mt-1">Auto-generated from title</p>}
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              required
              className={inputCls}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className={inputCls}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
              Author
            </label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => set("author", e.target.value)}
              placeholder="Dr. Jane Smith"
              className={inputCls}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
              Tags
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {form.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-violet-100 text-violet-700 rounded-full text-xs font-medium">
                  #{tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-rose-500 leading-none">×</button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addTag}
              placeholder="Type tag and press Enter"
              className={inputCls}
            />
          </div>
        </div>

        {/* Save button */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          {status === "error" && (
            <p className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
              {errorMsg}
            </p>
          )}
          {status === "success" && (
            <p className="text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
              Saved! Redirecting…
            </p>
          )}
          <button
            type="submit"
            disabled={status === "saving" || status === "success"}
            className="w-full py-2.5 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 disabled:opacity-60 transition"
          >
            {status === "saving" ? "Saving…" : isEditing ? "Update post" : "Publish post"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-600 font-semibold text-sm hover:bg-slate-200 transition"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Right column — title, summary, content */}
      <div className="lg:col-span-2 space-y-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
              Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              required
              placeholder="New Study Reveals…"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-semibold text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
              Summary * <span className="font-normal normal-case">(shown on cards)</span>
            </label>
            <textarea
              value={form.summary}
              onChange={(e) => set("summary", e.target.value)}
              required
              rows={3}
              maxLength={300}
              placeholder="One or two sentences summarising the research…"
              className={inputCls + " resize-none leading-relaxed"}
            />
            <p className="text-xs text-slate-400 text-right mt-1">{form.summary.length}/300</p>
          </div>
        </div>

        {/* Content editor */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
            Article Body (Markdown / MDX)
          </label>
          <textarea
            value={form.content}
            onChange={(e) => set("content", e.target.value)}
            rows={26}
            placeholder={`## Introduction\n\nWrite your article here using Markdown.\n\n**Bold**, *italic*, \`code\`, tables, and blockquotes all work.\n\n## Section Heading\n\nMore content…`}
            className={`${inputCls} font-mono text-xs leading-relaxed resize-none`}
            spellCheck={false}
          />
          <p className="text-xs text-slate-400 mt-2">
            Supports Markdown: <code className="font-mono">## headings</code>, <code className="font-mono">**bold**</code>, <code className="font-mono">| tables |</code>, <code className="font-mono">&gt; blockquotes</code>
          </p>
        </div>
      </div>
    </form>
  );
}
