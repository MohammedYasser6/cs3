"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";
import { Lock, Unlock } from "lucide-react"; // Install lucide-react if you haven't: npm i lucide-react

const AI_MODULES = [
  {
    id: "what-is-ai",
    title: "01. The Learning Paradigm",
    desc: "Understand the difference between explicit rules and machine learning.",
    path: "/ai/what-is-ai",
    reqXp: 0,
  },
  {
    id: "vectors-and-matrices",
    title: "02. Vectors & Matrices",
    desc: "The foundational mathematics behind AI data structures.",
    path: "/ai/vectors-and-matrices",
    reqXp: 100,
  },
  {
    id: "linear-regression",
    title: "03. Linear Regression",
    desc: "Predicting continuous values using best-fit lines and loss functions.",
    path: "/ai/linear-regression",
    reqXp: 250,
  },
];

export default function AITrackDashboard() {
  const aiXp = useStore((state) => state.aiXp) || 0;

  return (
    <div className="h-full w-full overflow-y-auto p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 border-b border-purple-900/50 pb-6">
          <h1 className="text-4xl font-black tracking-tight text-purple-400">
            Artificial Intelligence
          </h1>
          <p className="mt-2 text-slate-400">
            Master machine learning from raw data to deep neural networks.
          </p>
        </header>

        <div className="grid gap-6">
          {AI_MODULES.map((mod) => {
            const isUnlocked = aiXp >= mod.reqXp;

            return (
              <div
                key={mod.id}
                className={`relative flex items-center justify-between rounded-xl border p-6 transition-all ${
                  isUnlocked
                    ? "border-purple-800/50 bg-slate-900/50 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.15)]"
                    : "border-slate-800 bg-slate-950 opacity-60"
                }`}
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-200">
                    {mod.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">{mod.desc}</p>
                </div>

                <div className="flex items-center gap-4">
                  {!isUnlocked && (
                    <span className="text-xs font-mono text-slate-500">
                      Requires {mod.reqXp} AI XP
                    </span>
                  )}
                  {isUnlocked ? (
                    <Link
                      href={mod.path}
                      className="flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
                    >
                      <Unlock className="h-4 w-4" /> Enter Module
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="flex cursor-not-allowed items-center gap-2 rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-500"
                    >
                      <Lock className="h-4 w-4" /> Locked
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
