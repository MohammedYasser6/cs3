"use client";

import Link from "next/link";
import RuleBasedVisualizer from "@/components/canvas/RuleBasedVisualizer";

export default function WhatIsAIPage() {
  return (
    <section className="flex h-full w-full overflow-hidden text-slate-200">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0 mb-6">
          <p className="text-cyan-500 font-bold tracking-widest uppercase text-sm mb-1">
            AI Track • Level 0
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            The Learning Paradigm
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="text-white font-bold mb-2 text-lg">
                Traditional Programming:
              </h3>
              <p>
                In standard computer science, you write explicit rules (code) to
                process data and produce answers.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="text-white font-bold mb-2 text-lg">
                Machine Learning:
              </h3>
              <p>
                Artificial Intelligence inverses this paradigm. You feed the
                machine the <strong className="text-cyan-400">Data</strong> and
                the <strong className="text-purple-400">Answers</strong>, and
                the machine calculates the{" "}
                <strong className="text-cyan-400">Rules</strong> itself.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden flex items-center justify-center">
          <RuleBasedVisualizer />
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            Paradigm Shift Visualizer
          </p>
          <Link
            href="/ai/what-is-ai/quiz"
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take Assessment (+100 AI XP)
          </Link>
        </div>
      </div>
    </section>
  );
}
