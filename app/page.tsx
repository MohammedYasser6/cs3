"use client";

import Link from "next/link";
import {
  Code2,
  Brain,
  Shield,
  Component,
  BookOpen,
  TerminalSquare,
  AreaChart,
} from "lucide-react";
import { useStore } from "@/store/useStore";

export default function HomePage() {
  const { csXp, aiXp, cyberXp, sweXp } = useStore();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-8 text-slate-200">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="mb-6 text-6xl font-black text-white tracking-tight">
          Welcome to <span className="text-cyan-400">CS3</span>
        </h1>

        {/* The 3 Pillars of CS3 */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2 rounded-full border border-blue-900/50 bg-blue-950/30 px-6 py-2 text-blue-400">
            <BookOpen className="h-4 w-4" />
            <span className="font-bold tracking-wide">THEORY</span>
          </div>
          <div className="hidden h-px w-8 bg-slate-800 md:block" />
          <div className="flex items-center gap-2 rounded-full border border-purple-900/50 bg-purple-950/30 px-6 py-2 text-purple-400">
            <TerminalSquare className="h-4 w-4" />
            <span className="font-bold tracking-wide">IMPLEMENTATION</span>
          </div>
          <div className="hidden h-px w-8 bg-slate-800 md:block" />
          <div className="flex items-center gap-2 rounded-full border border-emerald-900/50 bg-emerald-950/30 px-6 py-2 text-emerald-400">
            <AreaChart className="h-4 w-4" />
            <span className="font-bold tracking-wide">VISUALIZATION</span>
          </div>
        </div>

        <p className="mb-12 text-lg text-slate-400">
          Select a curriculum track to begin your journey. Earn XP to unlock
          advanced modules.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* CS Track */}
          <Link
            href="/cs"
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-blue-900/50 bg-slate-900 p-8 transition-all hover:border-blue-500 hover:bg-slate-800 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
          >
            <div className="mb-4 rounded-full bg-blue-500/10 p-4 text-blue-400 transition-transform group-hover:scale-110">
              <Code2 className="h-10 w-10" />
            </div>
            <h2 className="text-xl font-bold text-white">Computer Science</h2>
            <p className="mt-2 text-sm text-slate-400">
              Memory, Arrays, & Algorithms
            </p>
            <div className="mt-6 rounded-full bg-blue-950/50 px-4 py-1 text-xs font-bold text-blue-400">
              {csXp} XP
            </div>
          </Link>

          {/* New SWE Track */}
          <Link
            href="/swe"
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-amber-900/50 bg-slate-900 p-8 transition-all hover:border-amber-500 hover:bg-slate-800 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]"
          >
            <div className="mb-4 rounded-full bg-amber-500/10 p-4 text-amber-500 transition-transform group-hover:scale-110">
              <Component className="h-10 w-10" />
            </div>
            <h2 className="text-xl font-bold text-white">Software Eng.</h2>
            <p className="mt-2 text-sm text-slate-400">
              Architecture & Patterns
            </p>
            <div className="mt-6 rounded-full bg-amber-950/50 px-4 py-1 text-xs font-bold text-amber-500">
              {sweXp || 0} XP
            </div>
          </Link>

          {/* AI Track */}
          <Link
            href="/ai"
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-purple-900/50 bg-slate-900 p-8 transition-all hover:border-purple-500 hover:bg-slate-800 hover:shadow-[0_0_30px_rgba(147,51,234,0.2)]"
          >
            <div className="mb-4 rounded-full bg-purple-500/10 p-4 text-purple-400 transition-transform group-hover:scale-110">
              <Brain className="h-10 w-10" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Artificial Intelligence
            </h2>
            <p className="mt-2 text-sm text-slate-400">Neural Networks & ML</p>
            <div className="mt-6 rounded-full bg-purple-950/50 px-4 py-1 text-xs font-bold text-purple-400">
              {aiXp} XP
            </div>
          </Link>

          {/* Cyber Track */}
          <Link
            href="/cyber"
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-emerald-900/50 bg-slate-900 p-8 transition-all hover:border-emerald-500 hover:bg-slate-800 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
          >
            <div className="mb-4 rounded-full bg-emerald-500/10 p-4 text-emerald-400 transition-transform group-hover:scale-110">
              <Shield className="h-10 w-10" />
            </div>
            <h2 className="text-xl font-bold text-white">Cybersecurity</h2>
            <p className="mt-2 text-sm text-slate-400">
              Cryptography & Networks
            </p>
            <div className="mt-6 rounded-full bg-emerald-950/50 px-4 py-1 text-xs font-bold text-emerald-400">
              {cyberXp} XP
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
