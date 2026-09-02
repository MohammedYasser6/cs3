"use client";

import { useState } from "react";
import { Map, Car, Footprints, Plane } from "lucide-react";

export default function BehavioralVisualizer() {
  const [strategy, setStrategy] = useState<"walk" | "drive" | "fly">("drive");

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200 lg:flex-row overflow-hidden">
      <div className="flex w-full flex-col gap-6 border-b border-slate-800 bg-slate-900/50 p-6 lg:w-80 lg:border-b-0 lg:border-r">
        <div>
          <h3 className="mb-2 text-sm font-bold tracking-wider text-amber-500 uppercase">
            Behavioral • Strategy
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            The <strong className="text-white">Route Context</strong> remains
            the same, but we hot-swap the internal pathfinding algorithm at
            runtime.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setStrategy("walk")}
              className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${strategy === "walk" ? "border-emerald-500 bg-emerald-950/30 text-emerald-400" : "border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700"}`}
            >
              <Footprints className="h-5 w-5" /> WalkingStrategy
            </button>
            <button
              onClick={() => setStrategy("drive")}
              className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${strategy === "drive" ? "border-blue-500 bg-blue-950/30 text-blue-400" : "border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700"}`}
            >
              <Car className="h-5 w-5" /> DrivingStrategy
            </button>
            <button
              onClick={() => setStrategy("fly")}
              className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${strategy === "fly" ? "border-purple-500 bg-purple-950/30 text-purple-400" : "border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700"}`}
            >
              <Plane className="h-5 w-5" /> FlyingStrategy
            </button>
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center bg-black p-8">
        <svg viewBox="0 0 500 400" className="w-full h-full max-h-[400px]">
          {/* Map Grid */}
          <g stroke="#1e293b" strokeWidth="2">
            <line x1="100" y1="100" x2="400" y2="100" />
            <line x1="100" y1="200" x2="400" y2="200" />
            <line x1="100" y1="300" x2="400" y2="300" />
            <line x1="200" y1="50" x2="200" y2="350" />
            <line x1="300" y1="50" x2="300" y2="350" />
          </g>

          {/* Start and End Nodes */}
          <circle cx="100" cy="300" r="10" fill="#f43f5e" />
          <text x="70" y="305" fill="#f43f5e" fontSize="14" fontWeight="bold">
            A
          </text>

          <circle cx="400" cy="100" r="10" fill="#10b981" />
          <text x="420" y="105" fill="#10b981" fontSize="14" fontWeight="bold">
            B
          </text>

          {/* Strategy Paths */}
          {strategy === "walk" && (
            <path
              d="M 100 300 L 100 200 L 200 200 L 200 100 L 400 100"
              fill="none"
              stroke="#10b981"
              strokeWidth="6"
              strokeDasharray="8 8"
              className="animate-[dash_2s_linear_infinite]"
            />
          )}
          {strategy === "drive" && (
            <path
              d="M 100 300 L 400 300 L 400 100"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="6"
              className="animate-[dash_1s_linear_infinite] drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
            />
          )}
          {strategy === "fly" && (
            <path
              d="M 100 300 L 400 100"
              fill="none"
              stroke="#a855f7"
              strokeWidth="6"
              strokeDasharray="15 10"
              className="animate-[dash_0.5s_linear_infinite]"
            />
          )}
        </svg>

        <style
          dangerouslySetInnerHTML={{
            __html: `@keyframes dash { to { stroke-dashoffset: -40; } }`,
          }}
        />
      </div>
    </div>
  );
}
