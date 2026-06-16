import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-20">
      <div className="max-w-5xl mx-auto px-5 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

        <div>
          <div className="flex items-center gap-2 font-bold text-slate-900 mb-1.5">
            <span className="w-6 h-6 rounded-md bg-violet-600 inline-flex items-center justify-center text-white text-xs font-bold">R</span>
            ResearchPulse
          </div>
          <p className="text-sm text-slate-400 max-w-xs">
            Daily curated research summaries for curious minds.
          </p>
        </div>

        <nav className="flex gap-8 text-sm text-slate-500">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-slate-700 text-xs uppercase tracking-widest mb-1">Explore</span>
            <Link href="/posts" className="hover:text-violet-600 transition-colors">All Posts</Link>
            <Link href="/categories" className="hover:text-violet-600 transition-colors">Categories</Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-slate-700 text-xs uppercase tracking-widest mb-1">Fields</span>
            <Link href="/categories/AI%20%26%20Machine%20Learning" className="hover:text-violet-600 transition-colors">AI & ML</Link>
            <Link href="/categories/Physics" className="hover:text-violet-600 transition-colors">Physics</Link>
            <Link href="/categories/Medicine" className="hover:text-violet-600 transition-colors">Medicine</Link>
          </div>
        </nav>
      </div>

      <div className="border-t border-slate-100 max-w-5xl mx-auto px-5 py-4 flex items-center justify-between text-xs text-slate-400">
        <span>&copy; {new Date().getFullYear()} ResearchPulse</span>
        <span>Built with Next.js &amp; Tailwind CSS</span>
      </div>
    </footer>
  );
}
