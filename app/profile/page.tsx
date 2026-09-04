"use client";

import { useStore } from "@/store/useStore";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Trophy,
  Shield,
  Cpu,
  Code2,
  Award,
  Zap,
  Target,
  Braces,
  Terminal,
  Brain,
  Server,
  Flame,
  Star,
  LogOut,
  Component,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    csXp = 0,
    sweXp = 0,
    aiXp = 0,
    cyberXp = 0,
    completedModules,
    resetSession,
  } = useStore();

  // Protect route if not logged in
  if (!session) {
    router.push("/login");
    return null;
  }

  // Calculate global progression dynamically to guarantee accuracy
  const totalXp = csXp + sweXp + aiXp + cyberXp;
  const currentLevel = Math.floor(totalXp / 500) + 1;
  const levelProgress = ((totalXp % 500) / 500) * 100;

  // Max XP per track for progress bars
  const MAX_CS_XP = 2000;
  const MAX_SWE_XP = 2000;
  const MAX_AI_XP = 2300;
  const MAX_CYBER_XP = 2300;

  const userName = session.user?.name || "Student";
  const userEmail = session.user?.email || "";
  const avatarUrl =
    session.user?.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=0ea5e9&color=fff&size=256&font-size=0.4&bold=true`;

  const handleLogout = async () => {
    resetSession(); // Wipe local Zustand state
    await signOut({ callbackUrl: "/login" }); // Destroy NextAuth session
  };

  // --- SCALABLE BADGE SYSTEM ---
  const BADGES = [
    // Global Milestones
    {
      id: "g1",
      title: "First Steps",
      req: "500 Total XP",
      unlocked: totalXp >= 500,
      icon: <Award className="h-6 w-6" />,
      color: "cyan",
    },
    {
      id: "g2",
      title: "Relentless",
      req: "2500 Total XP",
      unlocked: totalXp >= 2500,
      icon: <Flame className="h-6 w-6" />,
      color: "cyan",
    },
    {
      id: "g3",
      title: "Polymath",
      req: "5000 Total XP",
      unlocked: totalXp >= 5000,
      icon: <Star className="h-6 w-6" />,
      color: "cyan",
    },
    {
      id: "g4",
      title: "Grandmaster",
      req: "8000 Total XP",
      unlocked: totalXp >= 8000,
      icon: <Trophy className="h-6 w-6" />,
      color: "cyan",
    },

    // Track Milestones
    {
      id: "cs1",
      title: "Logic Seeker",
      req: "500 CS XP",
      unlocked: csXp >= 500,
      icon: <Code2 className="h-6 w-6" />,
      color: "blue",
    },
    {
      id: "cs2",
      title: "Algorithm Master",
      req: "1500 CS XP",
      unlocked: csXp >= 1500,
      icon: <Braces className="h-6 w-6" />,
      color: "blue",
    },
    {
      id: "swe1",
      title: "Code Monkey",
      req: "500 SWE XP",
      unlocked: sweXp >= 500,
      icon: <Terminal className="h-6 w-6" />,
      color: "amber",
    },
    {
      id: "swe2",
      title: "System Architect",
      req: "1500 SWE XP",
      unlocked: sweXp >= 1500,
      icon: <Server className="h-6 w-6" />,
      color: "amber",
    },
    {
      id: "ai1",
      title: "Data Wrangler",
      req: "500 AI XP",
      unlocked: aiXp >= 500,
      icon: <Cpu className="h-6 w-6" />,
      color: "purple",
    },
    {
      id: "ai2",
      title: "Model Maestro",
      req: "1500 AI XP",
      unlocked: aiXp >= 1500,
      icon: <Brain className="h-6 w-6" />,
      color: "purple",
    },
    {
      id: "cyb1",
      title: "Script Kiddie",
      req: "500 Cyber XP",
      unlocked: cyberXp >= 500,
      icon: <Terminal className="h-6 w-6" />,
      color: "emerald",
    },
    {
      id: "cyb2",
      title: "Zero-Day Hunter",
      req: "1500 Cyber XP",
      unlocked: cyberXp >= 1500,
      icon: <Shield className="h-6 w-6" />,
      color: "emerald",
    },
  ];

  const getBadgeColors = (color: string, unlocked: boolean) => {
    if (!unlocked)
      return {
        border: "bg-slate-900/50 border-slate-800 opacity-50 grayscale",
        icon: "bg-slate-800 text-slate-500",
      };
    switch (color) {
      case "cyan":
        return {
          border:
            "bg-slate-900 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]",
          icon: "bg-cyan-900/50 text-cyan-400",
        };
      case "blue":
        return {
          border:
            "bg-slate-900 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]",
          icon: "bg-blue-900/50 text-blue-400",
        };
      case "amber":
        return {
          border:
            "bg-slate-900 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
          icon: "bg-amber-900/50 text-amber-400",
        };
      case "purple":
        return {
          border:
            "bg-slate-900 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]",
          icon: "bg-purple-900/50 text-purple-400",
        };
      case "emerald":
        return {
          border:
            "bg-slate-900 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
          icon: "bg-emerald-900/50 text-emerald-400",
        };
      default:
        return {
          border: "bg-slate-900 border-slate-500/50",
          icon: "bg-slate-800 text-white",
        };
    }
  };

return (
  <div className="h-[calc(100vh-80px)] w-full bg-slate-950 text-slate-200 p-4 md:p-8 overflow-y-auto">
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-6 z-10 w-full md:w-auto">
          <div className="h-20 w-20 shrink-0 rounded-full border-2 border-cyan-500 bg-slate-800 flex items-center justify-center shadow-xl relative overflow-hidden group">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 bg-cyan-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-t-md border-t border-cyan-400 z-20 w-full text-center">
              Lv. {currentLevel}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-start">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100">
                {userName}
              </h1>
              <button
                onClick={handleLogout}
                className="md:hidden p-2 rounded-lg bg-rose-900/20 text-rose-400 border border-rose-900/50 hover:bg-rose-900/40 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
            <p className="text-slate-400 text-sm mt-1">{userEmail}</p>

            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs font-bold">
              <span className="bg-slate-950 px-3 py-1 rounded-full border border-slate-800 text-cyan-400 flex items-center gap-1">
                <Zap className="h-3 w-3" /> {totalXp} Total XP
              </span>
              <span className="bg-slate-950 px-3 py-1 rounded-full border border-slate-800 text-emerald-400 flex items-center gap-1">
                <Target className="h-3 w-3" /> {completedModules?.length || 0}{" "}
                Modules
              </span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-72 flex flex-col gap-4 z-10">
          <div className="hidden md:flex justify-end w-full mb-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-900/20 text-rose-400 border border-rose-900/50 hover:bg-rose-900/40 transition-colors text-xs font-bold"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
              <span>
                Global Level {currentLevel} &rarr; {currentLevel + 1}
              </span>
              <span className="text-cyan-400">{totalXp % 500} / 500 XP</span>
            </div>
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-cyan-600 to-blue-400 transition-all duration-1000"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Track Progress Grid */}
      <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-12 mb-4">
        <Target className="h-5 w-5 text-cyan-500" /> Track Milestones
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Computer Science */}
        <div className="bg-slate-900/50 border border-blue-900/30 p-6 rounded-xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
          <div className="mb-4 flex items-center gap-3 border-b border-slate-800 pb-4 relative z-10">
            <Code2 className="h-6 w-6 text-blue-500" />
            <h3 className="text-lg font-bold text-slate-200">
              Computer Science
            </h3>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Braces className="h-24 w-24 text-blue-500" />
          </div>
          <p className="text-3xl font-black text-blue-400 relative z-10 mb-6">
            {csXp}{" "}
            <span className="text-sm font-medium text-slate-500">
              / {MAX_CS_XP}
            </span>
          </p>
          <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden relative z-10">
            <div
              className="h-full bg-blue-500 transition-all duration-1000"
              style={{ width: `${Math.min(100, (csXp / MAX_CS_XP) * 100)}%` }}
            />
          </div>
          <Link
            href="/cs"
            className="mt-6 text-xs font-bold text-blue-500 hover:text-blue-400 block relative z-10"
          >
            Resume Track →
          </Link>
        </div>

        {/* Software Engineering */}
        <div className="bg-slate-900/50 border border-amber-900/30 p-6 rounded-xl relative overflow-hidden group hover:border-amber-500/50 transition-colors">
          <div className="mb-4 flex items-center gap-3 border-b border-slate-800 pb-4 relative z-10">
            <Component className="h-6 w-6 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-200">Software Eng.</h3>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Code2 className="h-24 w-24 text-amber-500" />
          </div>
          <p className="text-3xl font-black text-amber-400 relative z-10 mb-6">
            {sweXp}{" "}
            <span className="text-sm font-medium text-slate-500">
              / {MAX_SWE_XP}
            </span>
          </p>
          <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden relative z-10">
            <div
              className="h-full bg-amber-500 transition-all duration-1000"
              style={{
                width: `${Math.min(100, (sweXp / MAX_SWE_XP) * 100)}%`,
              }}
            />
          </div>
          <Link
            href="/swe"
            className="mt-6 text-xs font-bold text-amber-500 hover:text-amber-400 block relative z-10"
          >
            Resume Track →
          </Link>
        </div>

        {/* Artificial Intelligence */}
        <div className="bg-slate-900/50 border border-purple-900/30 p-6 rounded-xl relative overflow-hidden group hover:border-purple-500/50 transition-colors">
          <div className="mb-4 flex items-center gap-3 border-b border-slate-800 pb-4 relative z-10">
            <Brain className="h-6 w-6 text-purple-500" />
            <h3 className="text-lg font-bold text-slate-200">
              AI & Machine Learning
            </h3>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Cpu className="h-24 w-24 text-purple-500" />
          </div>
          <p className="text-3xl font-black text-purple-400 relative z-10 mb-6">
            {aiXp}{" "}
            <span className="text-sm font-medium text-slate-500">
              / {MAX_AI_XP}
            </span>
          </p>
          <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden relative z-10">
            <div
              className="h-full bg-purple-500 transition-all duration-1000"
              style={{ width: `${Math.min(100, (aiXp / MAX_AI_XP) * 100)}%` }}
            />
          </div>
          <Link
            href="/ai"
            className="mt-6 text-xs font-bold text-purple-500 hover:text-purple-400 block relative z-10"
          >
            Resume Track →
          </Link>
        </div>

        {/* Cybersecurity */}
        <div className="bg-slate-900/50 border border-emerald-900/30 p-6 rounded-xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <div className="mb-4 flex items-center gap-3 border-b border-slate-800 pb-4 relative z-10">
            <Shield className="h-6 w-6 text-emerald-500" />
            <h3 className="text-lg font-bold text-slate-200">Cybersecurity</h3>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Shield className="h-24 w-24 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-emerald-400 relative z-10 mb-6">
            {cyberXp}{" "}
            <span className="text-sm font-medium text-slate-500">
              / {MAX_CYBER_XP}
            </span>
          </p>
          <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden relative z-10">
            <div
              className="h-full bg-emerald-500 transition-all duration-1000"
              style={{
                width: `${Math.min(100, (cyberXp / MAX_CYBER_XP) * 100)}%`,
              }}
            />
          </div>
          <Link
            href="/cyber"
            className="mt-6 text-xs font-bold text-emerald-500 hover:text-emerald-400 block relative z-10"
          >
            Resume Track →
          </Link>
        </div>
      </div>

      {/* Dynamic Badges Section */}
      <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-12 mb-4">
        <Trophy className="h-5 w-5 text-amber-400" /> Badges & Achievements
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {BADGES.map((badge) => {
          const styles = getBadgeColors(badge.color, badge.unlocked);
          return (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all ${styles.border}`}
            >
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center mb-3 transition-colors ${styles.icon}`}
              >
                {badge.icon}
              </div>
              <h4 className="text-xs font-bold text-white mb-1">
                {badge.title}
              </h4>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider">
                {badge.req}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
}
