"use client";

import { useState } from "react";
import { Sparkles, Image as ImageIcon } from "lucide-react";

export default function GenerativeAIVisualizer() {
  const [step, setStep] = useState(0);

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6 z-10">
        <div>
          <h3 className="mb-1 text-sm font-bold tracking-wider text-purple-500 uppercase">
            Diffusion Model Denoising
          </h3>
          <p className="text-xs text-slate-400">
            Generative AI slowly removes static noise to reveal an image based
            on a prompt.
          </p>
        </div>
        <div className="bg-slate-950 border border-slate-700 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-mono">
          <span className="text-purple-400">Prompt:</span> "A futuristic glowing
          AI brain"
        </div>
      </div>

      <div className="relative flex-1 bg-black p-8 flex flex-col items-center justify-center overflow-hidden gap-8">
        {/* Fake Image Box representing diffusion steps */}
        <div className="relative w-64 h-64 rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden shadow-2xl flex items-center justify-center">
          {/* The "Generated Image" hidden beneath noise */}
          <div className="absolute inset-0 bg-purple-900 flex items-center justify-center">
            <Sparkles className="w-32 h-32 text-purple-300 drop-shadow-[0_0_20px_rgba(216,180,254,0.8)]" />
          </div>

          {/* The CSS Noise Layer that fades out */}
          <div
            className="absolute inset-0 z-10 transition-opacity duration-300 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              opacity: 1 - step / 100,
            }}
          />
        </div>

        {/* Denoising Slider */}
        <div className="w-full max-w-md bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl">
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">
            <span>Pure Noise</span>
            <span>Denoising...</span>
            <span className="text-purple-400">Final Image</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>
      </div>
    </div>
  );
}
