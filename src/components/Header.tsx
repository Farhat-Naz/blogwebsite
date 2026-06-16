"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${
      scrolled ? "bg-white/90 backdrop-blur shadow-sm border-b border-slate-100" : "bg-transparent"
    }`}>
      <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900">
          <span className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white text-sm font-bold select-none">R</span>
          ResearchPulse
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm">
          <Link href="/posts" className="px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium">
            All Posts
          </Link>
          <Link href="/categories" className="px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium">
            Categories
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-5 py-3 flex flex-col gap-1">
          {[["All Posts", "/posts"], ["Categories", "/categories"]].map(([l, h]) => (
            <Link key={h} href={h} onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-slate-700 hover:text-violet-600 transition-colors">
              {l}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
