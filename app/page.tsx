"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";
import { Code2, Brain, Shield } from "lucide-react";

export default function PlatformHub() {
  const { xp, level } = useStore();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-y-auto p-8 text-white">
      <div className="mx-auto w-full max-w-5xl text-center">
        <h1 className="mb-4 text-5xl font-black tracking-tight text-slate-100">
          Welcome to CS<span className="text-cyan-500">³</span>
        </h1>
        <p className="mb-12 text-lg text-slate-400">
          Select a domain to begin your interactive curriculum.
          <br className="hidden md:block" />
          Current Global Rank:{" "}
          <strong className="text-cyan-400">Level {level}</strong> ({xp} Total
          XP)
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {/* CS Track Card */}
          <Link
            href="/cs"
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-cyan-900/50 bg-slate-900/50 p-8 transition-all hover:border-cyan-500 hover:bg-slate-900 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
          >
            <Code2 className="mb-4 h-12 w-12 text-cyan-500 transition-transform group-hover:scale-110" />
            <h2 className="text-xl font-bold text-slate-200">
              Software Engineering
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Data structures, object-oriented design, and algorithms.
            </p>
          </Link>

          {/* AI Track Card */}
          <Link
            href="/ai"
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-purple-900/50 bg-slate-900/50 p-8 transition-all hover:border-purple-500 hover:bg-slate-900 hover:shadow-[0_0_30px_rgba(147,51,234,0.15)]"
          >
            <Brain className="mb-4 h-12 w-12 text-purple-500 transition-transform group-hover:scale-110" />
            <h2 className="text-xl font-bold text-slate-200">
              Artificial Intelligence
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Linear algebra, regressions, and neural networks.
            </p>
          </Link>

          {/* Cyber Track Card */}
          <Link
            href="/cyber"
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-emerald-900/50 bg-slate-900/50 p-8 transition-all hover:border-emerald-500 hover:bg-slate-900 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
          >
            <Shield className="mb-4 h-12 w-12 text-emerald-500 transition-transform group-hover:scale-110" />
            <h2 className="text-xl font-bold text-slate-200">Cybersecurity</h2>
            <p className="mt-2 text-sm text-slate-400">
              Cryptography, web vulnerabilities, and network defense.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
