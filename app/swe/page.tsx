"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import { Lock, Unlock, Component } from "lucide-react";

const MODULES = [
  {
    id: "agile",
    title: "01. SDLC & Agile Workspaces",
    path: "/swe/sdlc-agile",
    reqXp: 0,
  },
  {
    id: "srs",
    title: "02. Software Requirements (SRS)",
    path: "/swe/srs-requirements",
    reqXp: 100,
  },
  {
    id: "solid",
    title: "03. The SOLID Principles",
    path: "/swe/solid-principles",
    reqXp: 250,
  },
  {
    id: "struct",
    title: "04. Structural Patterns",
    path: "/swe/structural-patterns",
    reqXp: 400,
  },

  // FIX: Match the route guard (550)
  {
    id: "behav",
    title: "05. Behavioral Patterns",
    path: "/swe/behavioral-patterns",
    reqXp: 550,
  },

  // FIX: Match the route guard (750)
  {
    id: "creat",
    title: "06. Creational Patterns",
    path: "/swe/creational-patterns",
    reqXp: 750,
  },
  {
    id: "arch",
    title: "07. Architecture Components",
    path: "/swe/architecture-components",
    reqXp: 950,
  },
  {
    id: "micro",
    title: "08. Deployment Architectures",
    path: "/swe/microservices",
    reqXp: 1150,
  },
];

export default function SWEPage() {
  const [mounted, setMounted] = useState(false);
  const xp = useStore((state) => state.sweXp) ?? 0;

  useEffect(() => setMounted(true), []);

  return (
    <div className="h-full w-full overflow-y-auto p-8 text-white bg-slate-950">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 border-b border-amber-900/50 pb-6">
          <h1 className="text-4xl font-black text-amber-500 flex items-center gap-4">
            <Component className="h-10 w-10" /> Software Engineering
          </h1>
          <p className="mt-2 text-slate-400">
            Architecture, patterns, and deployment.
          </p>
        </header>

        <div className="grid gap-4">
          {MODULES.map((mod) => {
            const isUnlocked = mounted && xp >= mod.reqXp;
            return (
              <div
                key={mod.id}
                className={`flex items-center justify-between rounded-xl border p-5 transition-all ${isUnlocked ? "border-amber-800/50 bg-slate-900/50 hover:border-amber-500" : "border-slate-800 bg-slate-950/50 opacity-60"}`}
              >
                <h2 className="text-lg font-bold text-slate-200">
                  {mod.title}
                </h2>
                {isUnlocked ? (
                  <Link
                    href={mod.path}
                    className="flex items-center gap-2 rounded bg-amber-600 px-4 py-2 text-sm font-bold text-white hover:bg-amber-500"
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
