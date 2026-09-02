"use client";

import { useState } from "react";
import Link from "next/link";
import NLPVisualizer from "@/components/canvas/NLPVisualizer";

const LSTM_CODE = {
  "Python": `import torch.nn as nn

class LSTMModel(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(LSTMModel, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        out, _ = self.lstm(x)
        return self.fc(out[:, -1, :])`,
  "C++": `struct LSTMModel : torch::nn::Module {
    torch::nn::LSTM lstm{nullptr};
    torch::nn::Linear fc{nullptr};
    
    LSTMModel(int in, int hidden, int out) {
        lstm = register_module("lstm", torch::nn::LSTM(in, hidden));
        fc = register_module("fc", torch::nn::Linear(hidden, out));
    }
};`,
  "Java": `MultiLayerConfiguration conf = new NeuralNetConfiguration.Builder()
    .list()
    .layer(new LSTM.Builder().nIn(inputSize).nOut(hiddenSize).build())
    .layer(new RnnOutputLayer.Builder().nIn(hiddenSize).nOut(outputSize).build())
    .build();`,
  "Kotlin": `val conf = NeuralNetConfiguration.Builder()
    .list()
    .layer(LSTM.Builder().nIn(inputSize).nOut(hiddenSize).build())
    .layer(RnnOutputLayer.Builder().nIn(hiddenSize).nOut(outputSize).build())
    .build()`
};

export default function NLPPage() {
  const [activeTab, setActiveTab] = useState<"theory" | "math">("theory");

  return (
    <section className="flex h-full w-full overflow-hidden text-slate-200">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0 mb-6">
          <p className="text-purple-500 font-bold tracking-widest uppercase text-sm mb-1">AI Track • Level 9</p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">Natural Language Processing</h2>

          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button onClick={() => setActiveTab("theory")} className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "theory" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"}`}>Text to Vectors</button>
            <button onClick={() => setActiveTab("math")} className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "math" ? "bg-purple-600 text-white" : "text-slate-500 hover:text-slate-300"}`}>Embeddings</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          {activeTab === "theory" ? (
            <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
              <div>
                <p>AI models only understand numbers. NLP is the science of translating human language into mathematical structures (vectors) that an AI can process, without losing the semantic meaning of the words.</p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-purple-400 font-bold mb-2 text-sm">Step 1: Tokenization</h4>
                <p className="text-xs text-slate-400">
                  You cannot feed a raw string into an AI. We split text into "tokens" (words or sub-words).<br/><br/>
                  <code className="text-cyan-400">"I love coding" - ["I", "love", "coding"] - [23, 104, 891]</code>
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-purple-400 font-bold mb-2 text-sm">Step 2: TF-IDF vs Word2Vec</h4>
                <ul className="list-disc space-y-3 pl-4 text-xs text-slate-400">
                  <li><strong className="text-white">TF-IDF:</strong> (Term Frequency) An older method that counts how often a word appears. Fails to capture meaning (treats "happy" and "joyful" as totally unrelated).</li>
                  <li><strong className="text-cyan-400">Word Embeddings (Word2Vec):</strong> Maps words into a 300-dimensional space. Words with similar meanings cluster together physically in the vector space.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in text-sm text-slate-300">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-purple-400 font-bold mb-4 text-sm">Embedding Mathematics</h4>
                <p className="text-xs text-slate-400 mb-4">Because embeddings plot words as coordinates, you can literally do math with language!</p>
                <div className="text-center font-mono bg-slate-900 border border-slate-700 p-4 rounded text-xs w-full text-cyan-400">
                  King - Man + Woman = Queen
                </div>
                <p className="text-xs text-slate-400 mt-4">
                  The physical distance (vector) representing gender is consistent across the entire coordinate space.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <NLPVisualizer />
        </div>
        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">Word Vector Space 3D</p>
          <Link href="/ai/nlp/quiz" className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition shadow-md">Take Assessment (+200 AI XP)</Link>
        </div>
      </div>
    </section>
  );
}