"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";
import { Lock, Unlock } from "lucide-react";

const CS_MODULES = [
  {
    id: "binary",
    title: "01. Binary & Bitwise",
    desc: "The foundation of computing.",
    path: "/binary",
    reqXp: 0,
  },
  {
    id: "trees",
    title: "02. Trees & Hierarchical Structures",
    desc: "BSTs, AVL trees, and traversal algorithms.",
    path: "/trees",
    reqXp: 50,
  },
  {
    id: "graphs",
    title: "03. Graphs & Networks",
    desc: "Nodes, edges, Dijkstra, and A* pathfinding.",
    path: "/graphs",
    reqXp: 100,
  },
  {
    id: "dp",
    title: "04. Dynamic Programming",
    desc: "Memoization and solving overlapping subproblems.",
    path: "/dp",
    reqXp: 150,
  },
];

export default function CSTrackDashboard() {
  const csXp = useStore((state) => state.csXp) || 0;

  return (
    <div className="h-full w-full overflow-y-auto p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 border-b border-cyan-900/50 pb-6">
          <h1 className="text-4xl font-black tracking-tight text-cyan-400">
            Computer Science
          </h1>
          <p className="mt-2 text-slate-400">
            Master core software architecture, data structures, and algorithms.
          </p>
        </header>

        <div className="grid gap-6">
          {CS_MODULES.map((mod) => {
            const isUnlocked = csXp >= mod.reqXp;

            return (
              <div
                key={mod.id}
                className={`relative flex items-center justify-between rounded-xl border p-6 transition-all ${
                  isUnlocked
                    ? "border-cyan-800/50 bg-slate-900/50 hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
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
                      Requires {mod.reqXp} CS XP
                    </span>
                  )}
                  {isUnlocked ? (
                    <Link
                      href={mod.path}
                      className="flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-500"
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
