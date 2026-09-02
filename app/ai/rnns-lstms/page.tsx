"use client";

import { useState } from "react";
import Link from "next/link";
import CodeViewer from "@/components/ui/CodeViewer";
import RNNVisualizer from "@/components/canvas/RNNVisualizer";

const LSTM_CODE = {
  Python: `import torch.nn as nn

class LSTMModel(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(LSTMModel, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        out, _ = self.lstm(x)
        # Return only the final time step's output
        return self.fc(out[:, -1, :])`,

  "C++": `// Using LibTorch (PyTorch C++ API)
struct LSTMModel : torch::nn::Module {
    torch::nn::LSTM lstm{nullptr};
    torch::nn::Linear fc{nullptr};
    
    LSTMModel(int in, int hidden, int out) {
        lstm = register_module("lstm", torch::nn::LSTM(in, hidden));
        fc = register_module("fc", torch::nn::Linear(hidden, out));
    }
};`,

  Java: `// Using Deeplearning4j (DL4J)
MultiLayerConfiguration conf = new NeuralNetConfiguration.Builder()
    .list()
    .layer(new LSTM.Builder().nIn(inputSize).nOut(hiddenSize).build())
    .layer(new RnnOutputLayer.Builder().nIn(hiddenSize).nOut(outputSize).build())
    .build();`,

  Kotlin: `// Using KotlinDL or DL4J
val conf = NeuralNetConfiguration.Builder()
    .list()
    .layer(LSTM.Builder().nIn(inputSize).nOut(hiddenSize).build())
    .layer(RnnOutputLayer.Builder().nIn(hiddenSize).nOut(outputSize).build())
    .build()`,
};

export default function RNNPage() {
  const [activeTab, setActiveTab] = useState<"theory" | "code">("theory");

  return (
    <section className="flex h-full w-full overflow-hidden text-slate-200">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0 mb-6">
          <p className="text-purple-500 font-bold tracking-widest uppercase text-sm mb-1">
            AI Track • Level 8
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Sequence Models
          </h2>

          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab("theory")}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "theory" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              Theory
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "code" ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              PyTorch Code
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          {activeTab === "theory" ? (
            <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
              <div>
                <p>
                  Standard networks and CNNs process fixed-size inputs (like a
                  256x256 image). But how do you process video, stock prices, or
                  sentences of varying lengths? You need a network with{" "}
                  <strong className="text-purple-400">Memory</strong>.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-purple-400 font-bold mb-2 text-sm">
                  Recurrent Neural Networks (RNNs)
                </h4>
                <p className="text-xs text-slate-400">
                  RNNs process data sequentially. When looking at data point #3,
                  an RNN passes a "Hidden State" (memory) from steps #1 and #2
                  into the calculation. <br />
                  <br />
                  <strong className="text-rose-400">The Problem:</strong>{" "}
                  Vanishing Gradients. In long sequences, RNNs "forget" the
                  earliest inputs because the gradients shrink to zero during
                  backpropagation.
                </p>
              </div>

              <div className="bg-slate-950 border border-emerald-900/50 p-4 rounded-lg">
                <h4 className="text-emerald-400 font-bold mb-2 text-sm">
                  Long Short-Term Memory (LSTM)
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                  LSTMs solve the forgetting problem by introducing a "Cell
                  State" (a conveyor belt of long-term memory) and three
                  mathematical gates:
                </p>
                <ul className="list-disc space-y-2 pl-4 text-xs">
                  <li>
                    <strong>Forget Gate:</strong> Decides what irrelevant past
                    memory to wipe.
                  </li>
                  <li>
                    <strong>Input Gate:</strong> Decides what new current
                    information to store.
                  </li>
                  <li>
                    <strong>Output Gate:</strong> Decides what part of the
                    memory to output to the next step.
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <CodeViewer
              snippets={LSTM_CODE}
              explanation="PyTorch handles the complex unrolling of the LSTM across time automatically. You just feed it a sequence tensor (Batch, TimeSteps, Features)."
            />
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <RNNVisualizer />
        </div>
        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            LSTM Gate Architecture
          </p>
          <Link
            href="/ai/rnns-lstms/quiz"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take Assessment (+300 AI XP)
          </Link>
        </div>
      </div>
    </section>
  );
}
