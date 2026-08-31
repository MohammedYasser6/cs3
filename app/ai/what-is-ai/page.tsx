"use client";

import Header from "@/app/Header";
import Link from "next/link";
// We will build this canvas component next
// import RuleBasedVisualizer from "@/components/canvas/RuleBasedVisualizer";

export default function WhatIsAIPage() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-slate-950 text-white">
      <Header />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Theory Section */}
          <section className="flex flex-col justify-center rounded-xl border border-cyan-900/30 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-sm">
            <div className="mb-2 text-sm font-bold tracking-widest text-cyan-500 uppercase">
              AI Track • Level 0
            </div>
            <h1 className="mb-6 text-4xl font-extrabold text-slate-100">
              The Learning Paradigm
            </h1>
            <p className="mb-6 text-lg leading-relaxed text-slate-300">
              In standard computer science, you write explicit rules (code) to
              process data and produce answers.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-slate-300">
              Artificial Intelligence inverses this paradigm. You feed the
              machine the{" "}
              <span className="font-semibold text-cyan-400">Data</span> and the{" "}
              <span className="font-semibold text-cyan-400">Answers</span>, and
              the machine calculates the{" "}
              <span className="font-semibold text-cyan-400">Rules</span> itself.
            </p>

            <Link
              href="/ai/what-is-ai/quiz"
              className="inline-flex w-fit items-center rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition-all hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              Take Assessment (+100 AI XP)
            </Link>
          </section>

          {/* Visualizer Section */}
          <section className="relative flex min-h-[500px] items-center justify-center rounded-xl border border-slate-800 bg-black overflow-hidden shadow-2xl">
            <span className="font-mono text-sm text-cyan-700 animate-pulse">
              [ Canvas: RuleBasedVisualizer mounting... ]
            </span>
            {/* <RuleBasedVisualizer /> */}
          </section>
        </div>
      </main>
    </div>
  );
}
