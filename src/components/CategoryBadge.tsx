const STYLES: Record<string, string> = {
  "AI & Machine Learning": "bg-violet-100 text-violet-700",
  "Physics":               "bg-blue-100 text-blue-700",
  "Biology":               "bg-emerald-100 text-emerald-700",
  "Medicine":              "bg-rose-100 text-rose-700",
  "Chemistry":             "bg-orange-100 text-orange-700",
  "Computer Science":      "bg-cyan-100 text-cyan-700",
  "Neuroscience":          "bg-pink-100 text-pink-700",
  "Climate & Environment": "bg-teal-100 text-teal-700",
  "Mathematics":           "bg-amber-100 text-amber-800",
  "Space & Astronomy":     "bg-indigo-100 text-indigo-700",
};

export default function CategoryBadge({ category }: { category: string }) {
  return (
    <span className={`tag ${STYLES[category] ?? "bg-slate-100 text-slate-600"}`}>
      {category}
    </span>
  );
}
