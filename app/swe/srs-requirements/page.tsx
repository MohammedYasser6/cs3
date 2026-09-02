"use client";

import Link from "next/link";
import UMLVisualizer from "@/components/canvas/UMLVisualizer";

export default function SRSPage() {
  return (
    <section className="flex h-full w-full overflow-hidden">
      {/* LEFT COLUMN: Docked Theory Sidebar */}
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0">
          <p className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-1">
            SWE Track • Module 2
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Software Requirements (SRS)
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
            <div>
              <h3 className="text-white font-bold mb-2 text-lg">
                The Technical Contract:
              </h3>
              <p>
                Before coding begins, engineers translate vague client requests
                into a strict{" "}
                <strong className="text-amber-400">
                  Software Requirements Specification (SRS)
                </strong>
                .
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h4 className="text-amber-400 font-bold mb-2 text-sm">
                Functional vs Non-Functional:
              </h4>
              <ul className="space-y-2 list-disc pl-4 text-slate-300">
                <li>
                  <strong className="text-cyan-400">Functional:</strong> What it
                  MUST DO (e.g., "Users can reset passwords").
                </li>
                <li>
                  <strong className="text-purple-400">Non-Functional:</strong>{" "}
                  How well it performs (e.g., "Page loads in &lt; 2s").
                </li>
              </ul>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h4 className="text-amber-400 font-bold mb-2 text-sm">
                UML Use Case Diagrams:
              </h4>
              <p className="text-xs text-slate-400">
                Maps out the <strong>Actors</strong> (Users, APIs) and what
                actions they can perform inside the{" "}
                <strong>System Boundary</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Full Viewport Visualizer */}
      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <UMLVisualizer />
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            Interactive UML Builder
          </p>
          <Link
            href="/swe/srs-requirements/quiz"
            className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take the Exam →
          </Link>
        </div>
      </div>
    </section>
  );
}
