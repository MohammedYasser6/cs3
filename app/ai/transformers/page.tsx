"use client";

import { useState } from "react";
import Link from "next/link";
import TransformerVisualizer from "@/components/canvas/TransformerVisualizer";
const TRANSFORMER_CODE = {
  Python: `import torch.nn as nn
import torch.nn.functional as F

class SelfAttention(nn.Module):
    def __init__(self, embed_size):
        super().__init__()
        self.queries = nn.Linear(embed_size, embed_size)
        self.keys = nn.Linear(embed_size, embed_size)
        self.values = nn.Linear(embed_size, embed_size)

    def forward(self, x):
        # 1. Generate Q, K, V matrices
        Q, K, V = self.queries(x), self.keys(x), self.values(x)
        
        # 2. Score = Q dot K-transpose
        scores = torch.matmul(Q, K.transpose(-2, -1))
        
        # 3. Softmax to get probabilities (attention weights)
        weights = F.softmax(scores, dim=-1)
        
        # 4. Multiply weights by Values
        return torch.matmul(weights, V)`,
  "C++": `// PyTorch C++ API
torch::Tensor self_attention(torch::Tensor x, torch::nn::Linear q, torch::nn::Linear k, torch::nn::Linear v) {
    auto Q = q->forward(x);
    auto K = k->forward(x);
    auto V = v->forward(x);
    
    auto scores = torch::matmul(Q, K.transpose(-2, -1));
    auto weights = torch::softmax(scores, -1);
    
    return torch::matmul(weights, V);
}`,
  Java: `// Conceptually:
public Matrix selfAttention(Matrix x) {
    Matrix q = queryLayer.forward(x);
    Matrix k = keyLayer.forward(x);
    Matrix v = valueLayer.forward(x);
    
    Matrix scores = q.dot(k.transpose());
    Matrix weights = MathUtils.softmax(scores);
    
    return weights.dot(v);
}`,
  Kotlin: `fun selfAttention(x: Tensor): Tensor {
    val q = queries.forward(x)
    val k = keys.forward(x)
    val v = values.forward(x)
    
    val scores = q.matmul(k.transpose())
    val weights = softmax(scores)
    
    return weights.matmul(v)
}`,
};

export default function TransformersPage() {
  const [activeTab, setActiveTab] = useState<"theory" | "attention">("theory");

  return (
    <section className="flex h-full w-full overflow-hidden text-slate-200">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0 mb-6">
          <p className="text-cyan-500 font-bold tracking-widest uppercase text-sm mb-1">
            AI Track • Level 10
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Transformers
          </h2>

          <div className="flex bg-slate-950 p-1 rounded-lg border border-cyan-900/50">
            <button
              onClick={() => setActiveTab("theory")}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "theory" ? "bg-cyan-600 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              Architecture
            </button>
            <button
              onClick={() => setActiveTab("attention")}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "attention" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              Self-Attention
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          {activeTab === "theory" ? (
            <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
              <div>
                <p>
                  Introduced by Google in 2017 ("Attention is All You Need"),
                  Transformers completely rendered RNNs obsolete and paved the
                  way for ChatGPT.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-cyan-400 font-bold mb-2 text-sm">
                  Parallelization
                </h4>
                <p className="text-xs text-slate-400">
                  RNNs must read a paragraph one word at a time, making training
                  incredibly slow. Transformers read the{" "}
                  <strong className="text-white">
                    entire paragraph at once
                  </strong>{" "}
                  in parallel, utilizing modern GPUs to train on massive
                  web-scale datasets.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-cyan-400 font-bold mb-2 text-sm">
                  Positional Encoding
                </h4>
                <p className="text-xs text-slate-400">
                  Because Transformers read everything simultaneously, they
                  inherently lose word order. Positional Encoding injects a
                  mathematical signal (sine/cosine waves) into the word vectors
                  so the model knows the exact position of every word.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in text-sm text-slate-300">
              <div className="bg-slate-950 border border-cyan-900/40 p-4 rounded-lg">
                <h4 className="text-cyan-400 font-bold mb-3 text-sm">
                  The Self-Attention Mechanism
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  When reading the word "bank", does it mean a river bank or a
                  financial bank? Self-attention looks at surrounding words to
                  figure out the context.
                </p>
                <ul className="list-disc space-y-3 pl-4 text-xs">
                  <li>
                    <strong className="text-white">Query (Q):</strong> What am I
                    looking for?
                  </li>
                  <li>
                    <strong className="text-white">Key (K):</strong> What do I
                    possess?
                  </li>
                  <li>
                    <strong className="text-white">Value (V):</strong> The
                    actual underlying data.
                  </li>
                </ul>
                <p className="text-[10px] text-slate-500 mt-4 italic">
                  It multiplies Q and K to generate a "score" of how much
                  attention two words should pay to each other.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <TransformerVisualizer />
        </div>
        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            Multi-Head Attention Weights
          </p>
          <Link
            href="/ai/transformers/quiz"
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take Assessment (+300 AI XP)
          </Link>
        </div>
      </div>
    </section>
  );
}
