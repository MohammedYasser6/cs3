"use client";

import { useStore } from "../../store/useStore";
import { useEffect, useState } from "react";
import Link from "next/link";

// Mapping module IDs to display names and colors for the badges
const BADGE_MAP: Record<
  string,
  { title: string; color: string; icon: string }
> = {
  hardware: {
    title: "Hardware & RAM",
    color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    icon: "💾",
  },
  binary: {
    title: "Binary & Bitwise",
    color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    icon: "🔢",
  },
  pointers: {
    title: "Pointers & Memory",
    color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    icon: "🎯",
  },
  arrays: {
    title: "1D Arrays",
    color: "text-pink-400 border-pink-500/30 bg-pink-500/10",
    icon: "📦",
  },
  "2d-arrays": {
    title: "2D Arrays",
    color: "text-pink-400 border-pink-500/30 bg-pink-500/10",
    icon: "🍱",
  },
  "linked-lists": {
    title: "Linked Lists",
    color: "text-pink-400 border-pink-500/30 bg-pink-500/10",
    icon: "🔗",
  },
  "stacks-queues": {
    title: "Stacks & Queues",
    color: "text-pink-400 border-pink-500/30 bg-pink-500/10",
    icon: "🥞",
  },
  "hash-tables": {
    title: "Hash Tables",
    color: "text-pink-400 border-pink-500/30 bg-pink-500/10",
    icon: "🗄️",
  },
  trees: {
    title: "AVL Trees",
    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    icon: "🌳",
  },
  graphs: {
    title: "Graphs & Networks",
    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    icon: "🕸️",
  },
  sorting: {
    title: "Bubble Sort",
    color: "text-orange-400 border-orange-500/30 bg-orange-500/10",
    icon: "🔄",
  },
  search: {
    title: "Binary Search",
    color: "text-orange-400 border-orange-500/30 bg-orange-500/10",
    icon: "🔍",
  },
  recursion: {
    title: "Recursion",
    color: "text-orange-400 border-orange-500/30 bg-orange-500/10",
    icon: "🔁",
  },
};

export default function ProfilePage() {
  const { xp, level, completedModules } = useStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null; // Prevent hydration errors

  const xpProgress = xp % 100;
  const xpNeeded = 100 - xpProgress;

  return (
    <div className="h-full w-full overflow-y-auto custom-scrollbar bg-slate-950 p-8 md:p-12 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-[0_0_30px_rgba(37,99,235,0.3)] border-4 border-slate-900">
              MY
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">
                Mohammed Yasser
              </h1>
              <p className="text-slate-400 text-lg mt-1">
                Software Engineering Student
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold transition border border-slate-700"
          >
            ← Back to Hub
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Level Card */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-2">
              Current Level
            </p>
            <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {level}
            </p>
          </div>

          {/* XP Progress Card */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl md:col-span-2 flex flex-col justify-center">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-1">
                  Total Experience
                </p>
                <p className="text-3xl font-bold text-white">
                  {xp} <span className="text-blue-500 text-xl">XP</span>
                </p>
              </div>
              <p className="text-slate-500 font-medium text-sm">
                <span className="text-blue-400 font-bold">{xpNeeded} XP</span>{" "}
                to Level {level + 1}
              </p>
            </div>
            <div className="h-4 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-4">
            Unlocked Badges ({completedModules.length})
          </h2>

          {completedModules.length === 0 ? (
            <div className="bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl p-12 text-center">
              <p className="text-4xl mb-4">🎓</p>
              <h3 className="text-xl font-bold text-white mb-2">
                No Badges Yet
              </h3>
              <p className="text-slate-400 max-w-md mx-auto">
                Complete modules and pass exams to earn XP and unlock badges for
                your profile.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {completedModules.map((moduleId) => {
                const badge = BADGE_MAP[moduleId] || {
                  title: moduleId,
                  color: "text-slate-400 border-slate-700 bg-slate-800",
                  icon: "🏆",
                };
                return (
                  <div
                    key={moduleId}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-3 transition hover:scale-105 shadow-lg ${badge.color}`}
                  >
                    <span className="text-3xl">{badge.icon}</span>
                    <span className="font-bold text-sm">{badge.title}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
