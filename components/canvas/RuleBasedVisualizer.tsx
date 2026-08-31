"use client";

import { useState, useEffect } from "react";

export default function RuleBasedVisualizer() {
  const [isAI, setIsAI] = useState(false);
  const [flow, setFlow] = useState(0);

  // Simple animation loop driving the data packets
  useEffect(() => {
    const interval = setInterval(() => {
      setFlow((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-slate-950 p-6 text-slate-200">
      {/* Toggle Switch */}
      <div className="absolute top-6 flex space-x-4 rounded-lg bg-slate-900 p-1 shadow-md border border-slate-800">
        <button
          onClick={() => setIsAI(false)}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition-all ${
            !isAI
              ? "bg-cyan-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.5)]"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Classical Programming
        </button>
        <button
          onClick={() => setIsAI(true)}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition-all ${
            isAI
              ? "bg-purple-600 text-white shadow-[0_0_10px_rgba(147,51,234,0.5)]"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Machine Learning
        </button>
      </div>

      {/* Visualization Canvas */}
      <div className="relative mt-12 flex w-full max-w-lg items-center justify-between">
        {/* Inputs */}
        <div className="flex flex-col space-y-12">
          <div className="flex h-16 w-32 items-center justify-center rounded-lg border-2 border-slate-700 bg-slate-800 font-mono shadow-lg">
            Data
          </div>
          <div
            className={`flex h-16 w-32 items-center justify-center rounded-lg border-2 font-mono shadow-lg transition-colors ${
              isAI
                ? "border-purple-500/50 bg-purple-900/20 text-purple-300"
                : "border-cyan-500/50 bg-cyan-900/20 text-cyan-300"
            }`}
          >
            {isAI ? "Answers" : "Rules"}
          </div>
        </div>

        {/* The Machine (Processing) */}
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-slate-600 bg-slate-900 shadow-[0_0_30px_rgba(0,0,0,0.5)] z-10">
          <span className="font-bold tracking-wider text-slate-300">
            {isAI ? "LEARN" : "EXECUTE"}
          </span>

          {/* Incoming Data Packets */}
          <div
            className={`absolute left-[-60px] top-4 h-2 w-2 rounded-full ${isAI ? "bg-purple-400" : "bg-cyan-400"}`}
            style={{
              transform: `translateX(${flow * 1.2}px)`,
              opacity: flow > 50 ? 0 : 1,
            }}
          />
          <div
            className={`absolute left-[-60px] bottom-4 h-2 w-2 rounded-full ${isAI ? "bg-purple-400" : "bg-cyan-400"}`}
            style={{
              transform: `translateX(${flow * 1.2}px)`,
              opacity: flow > 50 ? 0 : 1,
            }}
          />
        </div>

        {/* Output */}
        <div className="relative flex flex-col items-center">
          <div
            className={`flex h-16 w-32 items-center justify-center rounded-lg border-2 font-mono shadow-lg transition-colors z-10 ${
              isAI
                ? "border-cyan-500 bg-cyan-900/40 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                : "border-purple-500 bg-purple-900/40 text-purple-200 shadow-[0_0_15px_rgba(147,51,234,0.4)]"
            }`}
          >
            {isAI ? "Rules" : "Answers"}
          </div>

          {/* Outgoing Data Packet */}
          <div
            className={`absolute left-[-60px] top-7 h-2 w-2 rounded-full ${isAI ? "bg-cyan-400" : "bg-purple-400"}`}
            style={{
              transform: `translateX(${(flow - 50) * 1.2}px)`,
              opacity: flow < 50 ? 0 : 1,
            }}
          />
        </div>

        {/* Connecting Lines */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none -z-10">
          <path
            d="M 128 48 L 220 90"
            stroke="#334155"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 4"
          />
          <path
            d="M 128 176 L 220 134"
            stroke="#334155"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 4"
          />
          <path
            d="M 290 112 L 380 112"
            stroke="#334155"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 4"
          />
        </svg>
      </div>
    </div>
  );
}
