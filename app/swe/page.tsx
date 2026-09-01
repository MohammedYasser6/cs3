"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";
import { Lock, Unlock, Component } from "lucide-react";

const SWE_MODULES = [
  {
    id: "sdlc-agile",
    title: "01. SDLC & Agile Workspaces",
    desc: "Software lifecycles, Scrum, and managing complex workspace applications.",
    path: "/swe/sdlc-agile",
    reqXp: 0,
  },
  {
    id: "srs-requirements",
    title: "02. Software Requirements (SRS)",
    desc: "Writing specifications, use cases, and diagramming system architectures.",
    path: "/swe/srs-requirements",
    reqXp: 100,
  },
  {
    id: "solid-principles",
    title: "03. The SOLID Principles",
    desc: "Building maintainable Object-Oriented architectures.",
    path: "/swe/solid-principles",
    reqXp: 250,
  },
  {
    id: "structural-patterns",
    title: "04. Structural Patterns",
    desc: "Implementing Decorator, Bridge, and Composite patterns.",
    path: "/swe/structural-patterns",
    reqXp: 400,
  },
  {
    id: "behavioral-patterns",
    title: "05. Behavioral Patterns",
    desc: "Mastering Strategy, Observer, and State patterns for dynamic logic.",
    path: "/swe/behavioral-patterns",
    reqXp: 600,
  },
  {
    id: "creational-patterns",
    title: "06. Creational Patterns & Factories",
    desc: "Abstract Factories, Builders, and Singletons in production.",
    path: "/swe/creational-patterns",
    reqXp: 800,
  },
];

export default function SWETrackDashboard() {
  const sweXp = useStore((state) => state.sweXp) || 0;

  return (
    <div className="h-full w-full overflow-y-auto p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 border-b border-amber-900/50 pb-6">
          <h1 className="text-4xl font-black tracking-tight text-amber-500 flex items-center gap-4">
            <Component className="h-10 w-10" /> Software Engineering Curriculum
          </h1>
          <p className="mt-2 text-slate-400">
            Design, architect, and deploy robust enterprise software
            applications.
          </p>
        </header>

        <div className="grid gap-6">
          {SWE_MODULES.map((mod) => {
            const isUnlocked = sweXp >= mod.reqXp;
            return (
              <div
                key={mod.id}
                className={`relative flex items-center justify-between rounded-xl border p-6 transition-all ${
                  isUnlocked
                    ? "border-amber-800/50 bg-slate-900/50 hover:border-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]"
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
                      Requires {mod.reqXp} SWE XP
                    </span>
                  )}
                  {isUnlocked ? (
                    <Link
                      href={mod.path}
                      className="flex items-center gap-2 rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-500"
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
