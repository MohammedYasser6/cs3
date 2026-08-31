"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "../store/useStore";

export default function Header() {
  const pathname = usePathname();
  const { csXp, aiXp, cyberXp } = useStore();

  // Determine active track for dynamic styling
  const isAI = pathname.startsWith("/ai");
  const isCyber = pathname.startsWith("/cyber");
  const isCS = !isAI && !isCyber && pathname !== "/login";

  return (
    <header className="flex w-full items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 py-4 backdrop-blur-md z-50">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter text-white"
        >
          CS<span className="text-cyan-500">³</span>
        </Link>

        <nav className="hidden space-x-1 md:flex">
          <Link
            href="/trees"
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
              isCS
                ? "bg-cyan-900/30 text-cyan-400"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            Computer Science
          </Link>
          <Link
            href="/ai"
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
              isAI
                ? "bg-purple-900/30 text-purple-400"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            Artificial Intelligence
          </Link>
          <Link
            href="/cyber/classical-ciphers"
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
              isCyber
                ? "bg-emerald-900/30 text-emerald-400"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            Cybersecurity
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4 font-mono text-sm">
        {isCS && <span className="text-cyan-400">CS XP: {csXp}</span>}
        {isAI && <span className="text-purple-400">AI XP: {aiXp}</span>}
        {isCyber && (
          <span className="text-emerald-400">CYBER XP: {cyberXp}</span>
        )}
      </div>
    </header>
  );
}
