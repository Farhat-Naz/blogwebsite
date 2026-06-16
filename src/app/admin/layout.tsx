import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Admin top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-lg bg-violet-600 flex items-center justify-center text-white text-xs font-bold">R</span>
              ResearchPulse
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/admin" className="text-sm font-semibold text-violet-600">
              Admin
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/new"
              className="px-3.5 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition"
            >
              + New Post
            </Link>
            <Link
              href="/"
              target="_blank"
              className="text-xs text-slate-500 hover:text-slate-700 transition"
            >
              View site ↗
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-8">{children}</main>
    </div>
  );
}
