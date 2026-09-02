"use client";

import Link from "next/link";
import OverfittingVisualizer from "@/components/canvas/OverfittingVisualizer";

export default function OverfittingPage() {
  return (
    <section className="flex h-full w-full overflow-hidden text-slate-200">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0 mb-6">
          <p className="text-purple-500 font-bold tracking-widest uppercase text-sm mb-1">
            AI Track • Level 4
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            Overfitting & Regularization
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
            <div>
              <p>
                As neural networks gain more capacity (nodes/layers), they gain
                the ability to learn incredibly complex patterns. However, if
                they have <em>too much</em> capacity relative to the amount of
                data, they will simply{" "}
                <strong className="text-rose-400">memorize</strong> the
                dataset—including all its random noise.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-slate-100">
                The Validation Gap
              </h3>
              <p className="mb-2 text-xs">
                The true test of an AI is not how well it scores on data it has
                already seen (Training Loss), but how well it generalizes to
                data it has never seen (Validation Loss).
              </p>
              <p className="border-l-2 border-rose-500 pl-3 italic text-xs text-slate-400">
                If Training Loss goes down, but Validation Loss goes UP, your
                model is overfitting.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-slate-100">
                The Solution: Regularization
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-xs">
                <li>
                  <strong className="text-emerald-400">Dropout:</strong>{" "}
                  Randomly turning off neurons during training forces the
                  network to distribute learning evenly instead of relying on a
                  few nodes to memorize points.
                </li>
                <li>
                  <strong className="text-emerald-400">L2 Penalty:</strong>{" "}
                  Mathematically punishing the model for using weights that are
                  too large, forcing the curve to stay smooth.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <OverfittingVisualizer />
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            Hyperparameter Tuning
          </p>
          <Link
            href="/ai/overfitting/quiz"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take Assessment (+200 AI XP)
          </Link>
        </div>
      </div>
    </section>
  );
}
