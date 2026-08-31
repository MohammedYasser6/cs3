"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";
import { Lock, Unlock } from "lucide-react";

const CS_MODULES = [
  // 1. CS Fundamentals
  {
    id: "hardware",
    title: "Hardware & RAM",
    desc: "How computers actually think, store, and process data at the hardware level.",
    path: "/hardware",
    reqXp: 0,
  },
  {
    id: "binary",
    title: "Binary & Bitwise",
    desc: "Low-level data representation and operations.",
    path: "/binary",
    reqXp: 0,
  },
  {
    id: "pointers",
    title: "Pointers & Memory",
    desc: "Memory addresses and reference management.",
    path: "/pointers",
    reqXp: 0,
  },

  // 2. Linear Data Structures
  {
    id: "arrays",
    title: "1D Arrays",
    desc: "Storing and sequentially accessing data in memory.",
    path: "/arrays",
    reqXp: 50,
  },
  {
    id: "2d-arrays",
    title: "2D Arrays & Matrices",
    desc: "Multi-dimensional grid structures.",
    path: "/2d-arrays",
    reqXp: 100,
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    desc: "Dynamic node architectures.",
    path: "/linked-lists",
    reqXp: 150,
  },
  {
    id: "stacks-queues",
    title: "Stacks & Queues",
    desc: "LIFO and FIFO sequential memory logic.",
    path: "/stacks-queues",
    reqXp: 200,
  },
  {
    id: "hash-tables",
    title: "Hash Tables",
    desc: "Key-value O(1) lookups via hashing.",
    path: "/hash-tables",
    reqXp: 250,
  },

  // 3. Non-Linear Structures
  {
    id: "trees",
    title: "AVL Trees",
    desc: "Branching architectures for complex relational data.",
    path: "/trees",
    reqXp: 300,
  },
  {
    id: "graphs",
    title: "Graphs & Networks",
    desc: "Vertices, edges, and complex network mapping.",
    path: "/graphs",
    reqXp: 350,
  },

  // 4. Algorithms & Logic
  {
    id: "recursion",
    title: "Recursion & Call Stack",
    desc: "Frame management and divide-and-conquer logic.",
    path: "/recursion",
    reqXp: 400,
  },
  {
    id: "sorting",
    title: "Bubble Sort",
    desc: "Iterative element comparison and sorting algorithms.",
    path: "/sorting",
    reqXp: 450,
  },
  {
    id: "search",
    title: "Binary Search",
    desc: "Efficient logarithmic dataset searching.",
    path: "/search",
    reqXp: 450,
  },
];

export default function CSTrackDashboard() {
  const csXp = useStore((state) => state.csXp) || 0;

  return (
    <div className="h-full w-full overflow-y-auto p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 border-b border-cyan-900/50 pb-6">
          <h1 className="text-4xl font-black tracking-tight text-cyan-400">
            Computer Science Curriculum
          </h1>
          <p className="mt-2 text-slate-400">
            Restored to your exact 4-track modular architecture.
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
