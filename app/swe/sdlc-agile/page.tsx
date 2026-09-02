"use client";

import { useState } from "react";
import Link from "next/link";
import WaterfallVisualizer from "@/components/canvas/Waterfall3DVisualizer";
import AgileVisualizer from "@/components/canvas/AgileVisualizer";

export default function SDLCPage() {
  const [activeTab, setActiveTab] = useState<"waterfall" | "agile">("agile");

  return (
    <section className="flex h-full w-full overflow-hidden">
      {/* LEFT COLUMN: Docked Theory Sidebar */}
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0">
          <p className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-1">
            SWE Track • Module 1
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            SDLC & Agile
          </h2>

          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 mb-6">
            <button
              onClick={() => setActiveTab("agile")}
              className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${
                activeTab === "agile"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Agile (Scrum)
            </button>
            <button
              onClick={() => setActiveTab("waterfall")}
              className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${
                activeTab === "waterfall"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Waterfall
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          {activeTab === "agile" ? (
            <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
              <div>
                <h3 className="text-white font-bold mb-2 text-lg">
                  Iterative Sprint Cycles:
                </h3>
                <p>
                  Agile breaks monolithic projects into 2-week iterations called
                  <strong> Sprints</strong>. Teams build small vertical slices,
                  test them, and deploy them for immediate user feedback.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-amber-400 font-bold mb-2 text-sm">
                  Scrum Board Workflow:
                </h4>
                <ul className="space-y-2 list-disc pl-4 text-slate-300">
                  <li>
                    <strong>Backlog:</strong> Prioritized pool of user stories.
                  </li>
                  <li>
                    <strong>In Progress:</strong> Active development limit per
                    engineer.
                  </li>
                  <li>
                    <strong>Code Review:</strong> Peer verification and CI
                    testing.
                  </li>
                  <li>
                    <strong className="text-emerald-400">Done:</strong> Shipped
                    to staging/production.
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
              <div>
                <h3 className="text-white font-bold mb-2 text-lg">
                  Sequential Waterfall:
                </h3>
                <p>
                  A linear model where each phase must finish 100% before the
                  next begins (Requirements → Design → Code → QA → Ops).
                </p>
              </div>

              <div className="bg-slate-950 border border-rose-950/60 p-4 rounded-lg">
                <h4 className="text-rose-400 font-bold mb-2 text-sm">
                  The Late-Testing Flaw:
                </h4>
                <p className="text-xs text-slate-400">
                  Verification happens at the very end. Finding a fundamental
                  requirement error during QA forces a costly rewrite of all
                  intervening phases.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Full Viewport Visualizer */}
      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          {activeTab === "agile" ? (
            <AgileVisualizer />
          ) : (
            <WaterfallVisualizer />
          )}
        </div>

        {/* Bottom Action Bar */}
        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            Mode:{" "}
            {activeTab === "agile" ? "Scrum Simulation" : "Waterfall Flow"}
          </p>
          <Link
            href="/swe/sdlc-agile/quiz"
            className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take the Exam →
          </Link>
        </div>
      </div>
    </section>
  );
}
