"use client";

import Link from "next/link";
import WaterfallVisualizer from "@/components/canvas/Waterfall3DVisualizer";

export default function SDLCModelsPage() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden text-slate-200">
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 xl:grid-cols-2">
          <section className="flex flex-col rounded-xl border border-amber-900/30 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-sm">
            <div className="mb-2 text-sm font-bold tracking-widest text-amber-500 uppercase">
              SWE Track • Level 1
            </div>
            <h1 className="mb-6 text-4xl font-extrabold text-slate-100">
              SDLC Models: The Waterfall
            </h1>

            <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
              <p>
                The{" "}
                <strong className="text-amber-400">
                  Software Development Life Cycle (SDLC)
                </strong>{" "}
                is the process used by the software industry to design, develop,
                and test high-quality software.
              </p>

              <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                <h3 className="mb-2 font-bold text-slate-100">
                  The Traditional Approach: Waterfall
                </h3>
                <p className="mb-3 text-xs text-slate-400">
                  Pioneered in the 1970s, Waterfall treats software like
                  manufacturing a physical bridge. You complete one phase
                  entirely before moving to the next. You never go backward.
                </p>

                <h4 className="font-bold text-rose-400 mt-4 mb-1">
                  The Fatal Flaw
                </h4>
                <p className="text-xs text-slate-400 border-l-2 border-rose-500 pl-3">
                  If you discover a fundamental design error during the
                  "Testing" phase, flowing "back up" the waterfall to the
                  "Design" phase is incredibly expensive. It assumes
                  requirements never change. Use the{" "}
                  <strong>Simulate Bug</strong> button in the visualizer to see
                  this.
                </p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                <h3 className="mb-2 font-bold text-slate-100">
                  The Modern Solution: Agile
                </h3>
                <p className="text-xs text-slate-400">
                  Instead of one massive 2-year waterfall, Agile methodologies
                  (like Scrum) break development into 2-week "Sprints." The team
                  runs tiny waterfalls rapidly, releasing small features and
                  getting immediate client feedback so they can pivot easily.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/swe/sdlc-models/quiz"
                className="inline-flex w-fit items-center rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:bg-amber-500 transition-all"
              >
                Take Assessment (+100 SWE XP)
              </Link>
            </div>
          </section>

          <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-black shadow-2xl xl:col-span-1">
            <WaterfallVisualizer />
          </section>
        </div>
      </main>
    </div>
  );
}
