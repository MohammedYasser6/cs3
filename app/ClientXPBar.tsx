"use client";

import { useEffect, useState } from "react";
import { useStore } from "../store/useStore"; // Adjust path as needed

export default function ClientXPBar() {
  const { xp, level } = useStore();
  const [mounted, setMounted] = useState(false);

  // Wait until mounted to show real Zustand data
  useEffect(() => {
    setMounted(true);
  }, []);

  // Safe fallback values for the server render to prevent hydration mismatches
  const displayXp = mounted ? xp : 0;
  const displayLevel = mounted ? level : 1;

  return (
    <div className="flex items-center gap-3 px-4 py-1.5 bg-slate-900/50 border border-slate-700/50 rounded-full shadow-inner mr-4">
      <div className="flex items-center gap-1.5">
        <span className="text-yellow-400 text-sm">⭐</span>
        <span className="text-white font-bold text-sm">{displayXp}</span>
        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">
          XP
        </span>
      </div>

      <div className="w-[1px] h-4 bg-slate-700"></div>

      <div className="flex items-center gap-1.5">
        <span className="text-cyan-400 font-bold text-sm">
          Lvl {displayLevel}
        </span>
      </div>
    </div>
  );
}
