"use client";

import { useStore } from "../store/useStore"; // Adjust path if needed
import { useEffect, useState } from "react";

export default function ClientXPBar() {
  const { xp, level } = useStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevents hydration mismatch

  return (
    <div className="hidden sm:flex flex-col items-end mr-6">
      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
        Level {level}
      </span>
      <div className="flex items-center gap-3">
        <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000 ease-out"
            style={{ width: `${xp % 100}%` }}
          />
        </div>
        <span className="text-sm font-black text-cyan-400 w-12 text-right">
          {xp} XP
        </span>
      </div>
    </div>
  );
}
