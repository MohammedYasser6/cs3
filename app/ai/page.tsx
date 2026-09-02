"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import { Lock, Unlock, Brain } from "lucide-react";

const MODULES = [
  {
    id: "intro",
    title: "00. The Learning Paradigm",
    path: "/ai/what-is-ai",
    reqXp: 0,
  },
  {
    id: "vec",
    title: "01. Vectors & Matrices",
    path: "/ai/vectors-and-matrices",
    reqXp: 100,
  },
  {
    id: "lin",
    title: "02. Linear Regression",
    path: "/ai/linear-regression",
    reqXp: 250,
  },
  {
    id: "dl",
    title: "03. Neural Networks",
    path: "/ai/deep-learning",
    reqXp: 400,
  },
  {
    id: "ovr",
    title: "04. Overfitting & Reg.",
    path: "/ai/overfitting",
    reqXp: 800,
  },
  {
    id: "clu",
    title: "05. Clustering (K-Means)",
    path: "/ai/clustering",
    reqXp: 1000,
  },
  {
    id: "cv",
    title: "06. Computer Vision (CNNs)",
    path: "/ai/computer-vision",
    reqXp: 1200,
  },
  {
    id: "rnn",
    title: "07. Sequence Models (RNN & LSTM)",
    path: "/ai/rnns-lstms",
    reqXp: 1500,
  },
  {
    id: "nlp",
    title: "08. Natural Language Processing",
    path: "/ai/nlp",
    reqXp: 1800,
  },
  {
    id: "trn",
    title: "09. Transformers & Attention",
    path: "/ai/transformers",
    reqXp: 2000,
  },
  {
    id: "gen",
    title: "10. Generative AI",
    path: "/ai/generative-ai",
    reqXp: 2300,
  },
];

export default function AIPage() {
  const [mounted, setMounted] = useState(false);
  const xp = useStore((state) => state.aiXp) ?? 0;

  useEffect(() => setMounted(true), []);

  return (
    <div className="h-full w-full overflow-y-auto p-8 text-white bg-slate-950">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 border-b border-purple-900/50 pb-6">
          <h1 className="text-4xl font-black text-purple-400 flex items-center gap-4">
            <Brain className="h-10 w-10" /> Artificial Intelligence
          </h1>
          <p className="mt-2 text-slate-400">
            Machine learning, neural networks, and vision.
          </p>
        </header>

        <div className="grid gap-4">
          {MODULES.map((mod) => {
            const isUnlocked = mounted && xp >= mod.reqXp;
            return (
              <div
                key={mod.id}
                className={`flex items-center justify-between rounded-xl border p-5 transition-all ${isUnlocked ? "border-purple-800/50 bg-slate-900/50 hover:border-purple-500" : "border-slate-800 bg-slate-950/50 opacity-60"}`}
              >
                <h2 className="text-lg font-bold text-slate-200">
                  {mod.title}
                </h2>
                {isUnlocked ? (
                  <Link
                    href={mod.path}
                    className="flex items-center gap-2 rounded bg-purple-600 px-4 py-2 text-sm font-bold text-white hover:bg-purple-500"
                  >
                    <Unlock className="h-4 w-4" /> Enter
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex items-center gap-2 rounded bg-slate-800 px-4 py-2 text-sm font-bold text-slate-500"
                  >
                    <Lock className="h-4 w-4" /> {mod.reqXp} XP
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
