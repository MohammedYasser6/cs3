"use client";

import Link from "next/link";
import AdvancedNeuralNetworkVisualizer from "@/components/canvas/AdvancedNeuralNetworkVisualizer";

export default function DeepLearningPage() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden text-slate-200">
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 xl:grid-cols-2">
          <section className="flex flex-col rounded-xl border border-purple-900/30 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-sm">
            <div className="mb-2 text-sm font-bold tracking-widest text-purple-500 uppercase">
              AI Track • Level 3
            </div>
            <h1 className="mb-6 text-4xl font-extrabold text-slate-100">
              Neural Networks
            </h1>
            <div className="space-y-6 text-slate-300 leading-relaxed text-sm">
              <p>
                Multi-layer perceptrons connect inputs through hidden node
                matrices. Each connection line represents a weighted tensor
                multiplication.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/ai/deep-learning/quiz"
                className="inline-flex w-fit items-center rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:bg-purple-500"
              >
                Take Assessment (+400 AI XP)
              </Link>
            </div>
          </section>
          <section className="relative flex min-h-[550px] items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-black shadow-2xl xl:col-span-1">
            <div className="absolute inset-0 transform scale-[0.8] origin-center lg:scale-100">
              <AdvancedNeuralNetworkVisualizer />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
