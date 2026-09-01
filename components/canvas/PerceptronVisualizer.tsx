"use client";

import { useState } from "react";

export default function PerceptronVisualizer() {
  const [x1, setX1] = useState<number>(1.0);
  const [x2, setX2] = useState<number>(0.5);
  const [w1, setW1] = useState<number>(0.8);
  const [w2, setW2] = useState<number>(-0.4);
  const [bias, setBias] = useState<number>(-0.2);
  const [activationType, setActivationType] = useState<"relu" | "sigmoid">(
    "sigmoid",
  );

  // Calculations
  const weightedSum = x1 * w1 + x2 * w2 + bias;

  const output =
    activationType === "sigmoid"
      ? 1 / (1 + Math.exp(-weightedSum))
      : Math.max(0, weightedSum);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-950 p-6 text-slate-200">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Controls Column */}
        <div className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="font-bold text-purple-400">Neuron Parameters</h3>

          <div className="space-y-3 text-sm">
            <div>
              <div className="flex justify-between">
                <span>Input (x1): {x1}</span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={x1}
                onChange={(e) => setX1(parseFloat(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <span>Weight (w1): {w1}</span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={w1}
                onChange={(e) => setW1(parseFloat(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
            <hr className="border-slate-800" />
            <div>
              <div className="flex justify-between">
                <span>Input (x2): {x2}</span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={x2}
                onChange={(e) => setX2(parseFloat(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <span>Weight (w2): {w2}</span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={w2}
                onChange={(e) => setW2(parseFloat(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>
            <hr className="border-slate-800" />
            <div>
              <div className="flex justify-between">
                <span>Bias (b): {bias}</span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={bias}
                onChange={(e) => setBias(parseFloat(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>
          </div>

          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setActivationType("sigmoid")}
              className={`flex-1 rounded py-1.5 text-xs font-bold transition-all ${activationType === "sigmoid" ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"}`}
            >
              Sigmoid
            </button>
            <button
              onClick={() => setActivationType("relu")}
              className={`flex-1 rounded py-1.5 text-xs font-bold transition-all ${activationType === "relu" ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"}`}
            >
              ReLU
            </button>
          </div>
        </div>

        {/* Visualizer Schematic Column */}
        <div className="col-span-2 flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 p-6 relative">
          <div className="absolute top-4 left-4 font-mono text-xs text-slate-500">
            Live Architecture Diagram
          </div>

          <div className="flex items-center justify-between w-full max-w-md my-auto gap-8">
            {/* Inputs */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 rounded-lg border border-purple-800 bg-slate-950 p-3 font-mono text-xs">
                <span>x1: {x1}</span>
                <span className="text-purple-400">× w1({w1})</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-cyan-800 bg-slate-950 p-3 font-mono text-xs">
                <span>x2: {x2}</span>
                <span className="text-cyan-400">× w2({w2})</span>
              </div>
            </div>

            {/* Neuron Node */}
            <div className="flex flex-col items-center justify-center h-32 w-32 rounded-full border-2 border-purple-500 bg-purple-950/30 shadow-[0_0_30px_rgba(147,51,234,0.2)] text-center p-4">
              <span className="text-xs font-bold text-purple-300">
                Sum + Activation
              </span>
              <span className="mt-1 font-mono text-lg font-black text-white">
                {output.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Metrics Footer */}
          <div className="mt-6 flex w-full justify-around rounded-lg bg-slate-950 p-3 font-mono text-xs border border-slate-800">
            <div>
              Weighted Sum (z):{" "}
              <strong className="text-cyan-400">
                {weightedSum.toFixed(2)}
              </strong>
            </div>
            <div>
              Final Activation:{" "}
              <strong className="text-purple-400">{output.toFixed(4)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
