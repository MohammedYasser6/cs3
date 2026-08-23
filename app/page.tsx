"use client";

import Link from "next/link";
import { useStore } from "../store/useStore";
import { useEffect, useState } from "react";

// The unified architecture blueprint for our curriculum
const COURSES = [
  {
    id: "fundamentals",
    title: "1. CS Fundamentals",
    description:
      "How computers actually think, store, and process data at the hardware level.",
    theme: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    modules: [
      {
        id: "hardware",
        title: "Hardware & RAM",
        path: "/hardware",
        available: true,
        reqLevel: 1,
      },
      // FIX THIS LINE:
      {
        id: "binary",
        title: "Binary & Bitwise",
        path: "/binary",
        available: true,
        reqLevel: 1,
      },
      {
        id: "pointers",
        title: "Pointers & Memory",
        path: "/pointers",
        available: true,
        reqLevel: 1,
      },
    ],
  },
  {
    id: "linear",
    title: "2. Linear Data Structures",
    description: "Storing and sequentially accessing data in memory.",
    theme: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    modules: [
      {
        id: "arrays",
        title: "1D Arrays",
        path: "/arrays",
        available: true,
        reqLevel: 1,
      },
      {
        id: "2d-arrays",
        title: "2D Arrays & Matrices",
        path: "/2d-arrays",
        available: true,
        reqLevel: 2,
      },
      {
        id: "linked-lists",
        title: "Linked Lists",
        path: "/linked-lists",
        available: true,
        reqLevel: 2,
      },
      {
        id: "stacks-queues",
        title: "Stacks & Queues",
        path: "/stacks-queues",
        available: true,
        reqLevel: 2,
      },
      {
        id: "hash-tables",
        title: "Hash Tables",
        path: "/hash-tables",
        available: true,
        reqLevel: 2,
      },
    ],
  },
  {
    id: "nonlinear",
    title: "3. Non-Linear Structures",
    description: "Branching architectures for complex relational data.",
    theme: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    modules: [
      {
        id: "trees",
        title: "AVL Trees",
        path: "/trees",
        available: true,
        reqLevel: 3,
      },
      {
        id: "graphs",
        title: "Graphs & Networks",
        path: "/graphs",
        available: true,
        reqLevel: 3,
      },
    ],
  },
  {
    id: "algorithms",
    title: "4. Algorithms & Logic",
    description: "Manipulating, sorting, and searching data efficiently.",
    theme: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    modules: [
      {
        id: "recursion",
        title: "Recursion & Call Stack",
        path: "/recursion",
        available: true,
        reqLevel: 4,
      },
      {
        id: "sorting",
        title: "Bubble Sort",
        path: "/sorting",
        available: true,
        reqLevel: 4,
      },
      {
        id: "search",
        title: "Binary Search",
        path: "/search",
        available: true,
        reqLevel: 4,
      },
    ],
  },
];

export default function Dashboard() {
  const { completedModules, level } = useStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null; // Prevent hydration mismatch

  return (
    <div className="h-full w-full overflow-y-auto custom-scrollbar bg-slate-950 p-8 md:p-12 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Dashboard Header */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Welcome back, <span className="text-blue-500">Mohammed</span>.
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Select a module below to launch the 3D learning environment.
            Concepts unlock as you level up and master the fundamentals.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {COURSES.map((course) => {
            // Calculate progress for this specific course
            const totalAvailable = course.modules.filter(
              (m) => m.available,
            ).length;
            const completedInCourse = course.modules.filter((m) =>
              completedModules.includes(m.id),
            ).length;
            const progress =
              totalAvailable === 0
                ? 0
                : Math.round((completedInCourse / totalAvailable) * 100);

            return (
              <div
                key={course.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xl hover:border-slate-700 transition duration-300 animate-slide-up"
              >
                {/* Course Header */}
                <div className={`p-6 border-b border-slate-800 ${course.bg}`}>
                  <h2 className={`text-xl font-bold mb-2 ${course.theme}`}>
                    {course.title}
                  </h2>
                  <p className="text-sm text-slate-300 min-h-[40px]">
                    {course.description}
                  </p>

                  {/* Mini Progress Bar */}
                  <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wide">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${course.theme.replace("text-", "bg-")} transition-all duration-1000`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Module List */}
                <div className="p-4 flex-1 flex flex-col gap-2">
                  {course.modules.map((mod) => {
                    const isCompleted = completedModules.includes(mod.id);
                    const isLocked = level < mod.reqLevel;

                    if (!mod.available) {
                      return (
                        <div
                          key={mod.id}
                          className="p-3 rounded-lg border border-slate-800/50 bg-slate-900/50 text-slate-600 text-sm font-medium flex justify-between items-center cursor-not-allowed"
                        >
                          <span>{mod.title}</span>
                          <span className="text-xs px-2 py-1 bg-slate-800 rounded-md">
                            Coming Soon
                          </span>
                        </div>
                      );
                    }

                    if (isLocked) {
                      return (
                        <div
                          key={mod.id}
                          className="p-3 rounded-lg border border-slate-800/50 bg-slate-900/50 text-slate-500 text-sm font-medium flex justify-between items-center cursor-not-allowed"
                        >
                          <span>{mod.title}</span>
                          <span>🔒 Lv.{mod.reqLevel}</span>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={mod.id}
                        href={mod.path}
                        className={`p-3 rounded-lg border transition group flex justify-between items-center ${isCompleted ? `bg-slate-950 ${course.border} ${course.theme}` : "border-transparent bg-slate-800 hover:bg-slate-700 text-slate-200"}`}
                      >
                        <span className="font-medium text-sm group-hover:translate-x-1 transition-transform">
                          {mod.title}
                        </span>
                        {isCompleted && <span>✓</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
