"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [mounted, setMounted] = useState(false);
  const { csXp, aiXp, cyberXp, sweXp } = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-full min-h-screen w-full overflow-y-auto bg-slate-950 px-4 py-12 md:flex md:items-center md:justify-center md:p-8 text-slate-200">
      <div className="mx-auto w-full max-w-5xl text-center pb-24 md:pb-0">
        <div className="mb-6 flex flex-col items-center justify-center animate-fade-in">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-4 text-cyan-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
            Welcome to CS<span className="text-cyan-500">³</span>
          </h1>
        </div>

        <div className="mb-12 flex flex-col md:flex-row items-center justify-center gap-4 animate-slide-up">
          <div className="flex w-full md:w-auto items-center justify-center gap-2 rounded-full border border-blue-900/50 bg-blue-950/30 px-6 py-2 text-blue-400">
            <BookOpen className="h-4 w-4" />
            <span className="font-bold tracking-wide">THEORY</span>
          </div>
          <div className="hidden h-px w-8 bg-slate-800 md:block" />
          <div className="flex w-full md:w-auto items-center justify-center gap-2 rounded-full border border-purple-900/50 bg-purple-950/30 px-6 py-2 text-purple-400">
            <TerminalSquare className="h-4 w-4" />
            <span className="font-bold tracking-wide">IMPLEMENTATION</span>
          </div>
          <div className="hidden h-px w-8 bg-slate-800 md:block" />
          <div className="flex w-full md:w-auto items-center justify-center gap-2 rounded-full border border-emerald-900/50 bg-emerald-950/30 px-6 py-2 text-emerald-400">
            <AreaChart className="h-4 w-4" />
            <span className="font-bold tracking-wide">VISUALIZATION</span>
          </div>
        </div>

        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 animate-slide-up"
          style={{ animationDelay: "100ms" }}
        >
          <Link
            href="/cs"
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-blue-900/50 bg-slate-900 p-8 transition-all hover:border-blue-500 hover:bg-slate-800 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
          >
            <div className="mb-4 rounded-full bg-blue-500/10 p-4 text-blue-400 transition-transform group-hover:scale-110">
              <Code2 className="h-10 w-10" />
            </div>
            <h2 className="text-xl font-bold text-white">Computer Science</h2>
            <div className="mt-6 rounded-full bg-blue-950/50 px-4 py-1 text-xs font-bold text-blue-400">
              {mounted ? csXp : 0} XP
            </div>
          </Link>

          <Link
            href="/swe"
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-amber-900/50 bg-slate-900 p-8 transition-all hover:border-amber-500 hover:bg-slate-800 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]"
          >
            <div className="mb-4 rounded-full bg-amber-500/10 p-4 text-amber-500 transition-transform group-hover:scale-110">
              <Component className="h-10 w-10" />
            </div>
            <h2 className="text-xl font-bold text-white">Software Eng.</h2>
            <div className="mt-6 rounded-full bg-amber-950/50 px-4 py-1 text-xs font-bold text-amber-500">
              {mounted ? sweXp : 0} XP
            </div>
          </Link>

          <Link
            href="/ai"
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-purple-900/50 bg-slate-900 p-8 transition-all hover:border-purple-500 hover:bg-slate-800 hover:shadow-[0_0_30px_rgba(147,51,234,0.2)]"
          >
            <div className="mb-4 rounded-full bg-purple-500/10 p-4 text-purple-400 transition-transform group-hover:scale-110">
              <Brain className="h-10 w-10" />
            </div>
            <h2 className="text-xl font-bold text-white">Artificial Intel.</h2>
            <div className="mt-6 rounded-full bg-purple-950/50 px-4 py-1 text-xs font-bold text-purple-400">
              {mounted ? aiXp : 0} XP
            </div>
          </Link>

          <Link
            href="/cyber"
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-emerald-900/50 bg-slate-900 p-8 transition-all hover:border-emerald-500 hover:bg-slate-800 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
          >
            <div className="mb-4 rounded-full bg-emerald-500/10 p-4 text-emerald-400 transition-transform group-hover:scale-110">
              <Shield className="h-10 w-10" />
            </div>
            <h2 className="text-xl font-bold text-white">Cybersecurity</h2>
            <div className="mt-6 rounded-full bg-emerald-950/50 px-4 py-1 text-xs font-bold text-emerald-400">
              {mounted ? cyberXp : 0} XP
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
