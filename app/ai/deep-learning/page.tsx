"use client";

import Link from "next/link";
import AdvancedNeuralNetworkVisualizer from "@/components/canvas/AdvancedNeuralNetworkVisualizer";

export default function DeepLearningPage() {
  return (
    <section className="flex h-full w-full overflow-hidden text-slate-200">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0 mb-6">
          <p className="text-purple-500 font-bold tracking-widest uppercase text-sm mb-1">
            AI Track • Level 3
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            Neural Networks
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-slate-100">
                Multi-Layer Perceptrons
              </h3>
              <p className="text-xs text-slate-400">
                Neural networks connect inputs through hidden node matrices.
                Each connection line represents a weighted tensor
                multiplication. By stacking these layers, the network can
                approximate incredibly complex, non-linear functions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden flex items-center justify-center">
          <div className="transform scale-[0.8] lg:scale-100 w-full h-full">
            <AdvancedNeuralNetworkVisualizer />
          </div>
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            Tensor Flow Architecture
          </p>
          <Link
            href="/ai/deep-learning/quiz"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take Assessment (+400 AI XP)
          </Link>
        </div>
      </div>
    </section>
  );
}
