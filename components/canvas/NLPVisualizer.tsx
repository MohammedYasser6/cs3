"use client";

import { useState } from "react";
import { Zap, Target } from "lucide-react";

export default function NLPVisualizer() {
  const [showMath, setShowMath] = useState(false);

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6 z-10">
        <div>
          <h3 className="mb-1 text-sm font-bold tracking-wider text-purple-500 uppercase">Word2Vec Embedding Space</h3>
          <p className="text-xs text-slate-400">Words are coordinates. Similar meanings are grouped together.</p>
        </div>
        <button onClick={() => setShowMath(!showMath)} className="flex items-center gap-2 rounded bg-purple-600 px-6 py-2 text-sm font-bold text-white hover:bg-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all">
          <Zap className="h-4 w-4" /> {showMath ? "Hide Vector Math" : "Show Vector Math"}
        </button>
      </div>

      <div className="relative flex-1 bg-black p-8 flex items-center justify-center overflow-hidden">
        {showMath && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-purple-500 px-6 py-3 rounded-xl shadow-2xl z-20 flex items-center gap-4 text-sm font-mono text-purple-300">
            <Target className="h-5 w-5 text-cyan-400" />
            <span>[King] - [Man] + [Woman] = <strong className="text-emerald-400">[Queen]</strong></span>
          </div>
        )}

        <svg viewBox="0 0 600 400" className="w-full h-full max-h-[400px]">
          {/* Axes */}
          <line x1="50" y1="350" x2="550" y2="350" stroke="#334155" strokeWidth="2" />
          <line x1="50" y1="350" x2="50" y2="50" stroke="#334155" strokeWidth="2" />
          <text x="300" y="380" fill="#64748b" textAnchor="middle" fontSize="12">Gender Dimension</text>
          <text x="20" y="200" fill="#64748b" textAnchor="middle" fontSize="12" transform="rotate(-90 20 200)">Royalty Dimension</text>

          {/* Plot Points */}
          <g className="transition-all duration-700">
            {/* Man / Woman */}
            <circle cx="200" cy="300" r="6" fill="#3b82f6" />
            <text x="200" y="320" fill="#93c5fd" textAnchor="middle" fontSize="14" fontWeight="bold">Man</text>
            
            <circle cx="450" cy="300" r="6" fill="#ec4899" />
            <text x="450" y="320" fill="#fbcfe8" textAnchor="middle" fontSize="14" fontWeight="bold">Woman</text>

            {/* King / Queen */}
            <circle cx="200" cy="100" r="6" fill="#3b82f6" />
            <text x="200" y="85" fill="#93c5fd" textAnchor="middle" fontSize="14" fontWeight="bold">King</text>
            
            <circle cx="450" cy="100" r="6" fill="#ec4899" />
            <text x="450" y="85" fill="#fbcfe8" textAnchor="middle" fontSize="14" fontWeight="bold" className={showMath ? "animate-pulse" : ""}>Queen</text>
          </g>

          {/* Vector Math Vectors */}
          {showMath && (
            <g className="animate-fade-in">
              <path d="M 200 100 L 200 300" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 6" markerEnd="url(#arrow)" />
              <text x="180" y="200" fill="#fbbf24" fontSize="12">- Man</text>

              <path d="M 200 300 L 450 300" stroke="#10b981" strokeWidth="3" strokeDasharray="6 6" markerEnd="url(#arrow)" />
              <text x="325" y="290" fill="#34d399" fontSize="12">+ Woman</text>

              <path d="M 450 300 L 450 110" stroke="#a855f7" strokeWidth="4" markerEnd="url(#arrow)" />
              <text x="465" y="200" fill="#c084fc" fontSize="12" fontWeight="bold">= Queen</text>
            </g>
          )}

          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
}