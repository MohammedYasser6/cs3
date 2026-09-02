"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import { Lock, Unlock, Code2 } from "lucide-react";

const MODULES = [
  { id: "hw", title: "01. Hardware & Memory", path: "/hardware", reqXp: 0 },
  { id: "bin", title: "02. Binary & Data Types", path: "/binary", reqXp: 0 },
  {
    id: "ptr",
    title: "03. Pointers & References",
    path: "/pointers",
    reqXp: 0,
  },
  {
    id: "arr",
    title: "04. Arrays & Memory Layout",
    path: "/arrays",
    reqXp: 50,
  },
  {
    id: "2d",
    title: "05. 2D Arrays (Matrices)",
    path: "/2d-arrays",
    reqXp: 100,
  },
  { id: "ll", title: "06. Linked Lists", path: "/linked-lists", reqXp: 150 },
  {
    id: "sq",
    title: "07. Stacks & Queues",
    path: "/stacks-queues",
    reqXp: 200,
  },
  { id: "ht", title: "08. Hash Tables", path: "/hash-tables", reqXp: 250 },
  { id: "tr", title: "09. Trees & BSTs", path: "/trees", reqXp: 300 },
  { id: "gr", title: "10. Graphs & Networks", path: "/graphs", reqXp: 350 },
  { id: "rc", title: "11. Recursion", path: "/recursion", reqXp: 400 },
  { id: "st", title: "12. Sorting Algorithms", path: "/sorting", reqXp: 450 },
  { id: "sh", title: "13. Searching Algorithms", path: "/search", reqXp: 450 },
];

export default function CSPage() {
  const [mounted, setMounted] = useState(false);
  const xp = useStore((state) => state.csXp) ?? 0;

  useEffect(() => setMounted(true), []);

  return (
    <div className="h-full w-full overflow-y-auto p-8 text-white bg-slate-950">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 border-b border-blue-900/50 pb-6">
          <h1 className="text-4xl font-black text-blue-500 flex items-center gap-4">
            <Code2 className="h-10 w-10" /> Computer Science
          </h1>
          <p className="mt-2 text-slate-400">
            Memory, data structures, and algorithms.
          </p>
        </header>

        <div className="grid gap-4">
          {MODULES.map((mod) => {
            const isUnlocked = mounted && xp >= mod.reqXp;
            return (
              <div
                key={mod.id}
                className={`flex items-center justify-between rounded-xl border p-5 transition-all ${isUnlocked ? "border-blue-800/50 bg-slate-900/50 hover:border-blue-500" : "border-slate-800 bg-slate-950/50 opacity-60"}`}
              >
                <h2 className="text-lg font-bold text-slate-200">
                  {mod.title}
                </h2>
                {isUnlocked ? (
                  <Link
                    href={mod.path}
                    className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500"
                  >
                    <Unlock className="h-4 w-4" /> Enter
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex items-center gap-2 rounded bg-slate-800 px-4 py-2 text-sm font-bold text-slate-500"
                  >
                    <Lock className="h-4 w-4" /> {mod.reqXp} XP
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
