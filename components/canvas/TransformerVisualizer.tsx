"use client";

import { useState } from "react";
import { Eye } from "lucide-react";

export default function TransformerVisualizer() {
  const [activeWord, setActiveWord] = useState<number>(1);
  const sentence = ["The", "bank", "of", "the", "river"];

  // Attention weights for "bank" (index 1) vs others
  const getWeight = (index: number) => {
    if (activeWord !== 1) return 0.1;
    if (index === 1) return 1.0; // Self
    if (index === 4) return 0.8; // River (High Context)
    if (index === 2) return 0.4; // of
    return 0.1; // The
  };

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6 z-10">
        <div>
          <h3 className="mb-1 text-sm font-bold tracking-wider text-cyan-500 uppercase">
            Self-Attention Mechanism
          </h3>
          <p className="text-xs text-slate-400">
            Hover over a word to see what other words it "attends" to for
            context.
          </p>
        </div>
      </div>

      <div className="relative flex-1 bg-black p-8 flex flex-col items-center justify-center overflow-hidden">
        <div className="flex gap-4 mb-16 z-20">
          {sentence.map((word, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveWord(i)}
              className={`px-6 py-3 rounded-lg text-lg font-bold cursor-pointer transition-all ${activeWord === i ? "bg-cyan-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-110" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}
            >
              {word}
            </div>
          ))}
        </div>

        <svg
          viewBox="0 0 600 200"
          className="w-full max-h-[200px] overflow-visible absolute top-1/2"
        >
          {activeWord === 1 &&
            sentence.map(
              (_, i) =>
                i !== 1 && (
                  <path
                    key={i}
                    d={`M ${1 * 110 + 70} 0 Q 300 100 ${i * 110 + 70} 0`}
                    fill="none"
                    stroke={`rgba(6, 182, 212, ${getWeight(i)})`}
                    strokeWidth={getWeight(i) * 10}
                    className="transition-all duration-300"
                  />
                ),
            )}
        </svg>

        {activeWord === 1 && (
          <div className="mt-12 bg-cyan-950/40 border border-cyan-900 p-4 rounded-lg flex items-center gap-4 text-sm max-w-lg z-20 animate-fade-in">
            <Eye className="h-6 w-6 text-cyan-400" />
            <p className="text-cyan-100">
              The model attends heavily to{" "}
              <strong className="text-cyan-400">"river"</strong> to understand
              that <strong className="text-white">"bank"</strong> refers to
              water, not a financial institution.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
