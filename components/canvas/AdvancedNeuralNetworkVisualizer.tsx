"use client";

import { useState } from "react";

type ActivationFunction = "relu" | "sigmoid" | "tanh";

export default function AdvancedNeuralNetworkVisualizer() {
  const [inputs, setInputs] = useState<[number, number]>([1.0, -0.5]);

  // Weights: [from I1 to H1, from I1 to H2]
  const [wI1, setWI1] = useState<[number, number]>([0.8, -0.4]);
  // Weights: [from I2 to H1, from I2 to H2]
  const [wI2, setWI2] = useState<[number, number]>([-0.2, 0.9]);

  // Weights from Hidden to Output
  const [wOut, setWOut] = useState<[number, number]>([1.2, -1.1]);

  const [activation, setActivation] = useState<ActivationFunction>("sigmoid");

  const activate = (val: number, fn: ActivationFunction) => {
    switch (fn) {
      case "sigmoid":
        return 1 / (1 + Math.exp(-val));
      case "tanh":
        return Math.tanh(val);
      case "relu":
      default:
        return Math.max(0, val);
    }
  };

  // Math: Forward Pass
  const zH1 = inputs[0] * wI1[0] + inputs[1] * wI2[0];
  const aH1 = activate(zH1, activation);

  const zH2 = inputs[0] * wI1[1] + inputs[1] * wI2[1];
  const aH2 = activate(zH2, activation);

  const zOut = aH1 * wOut[0] + aH2 * wOut[1];
  const finalOutput = activate(zOut, activation);

  // Helper to generate the small activation curve SVG path
  const getActivationPath = () => {
    if (activation === "relu") return "M 0 40 L 40 40 L 80 0";
    if (activation === "sigmoid") return "M 0 40 C 30 40, 50 0, 80 0";
    if (activation === "tanh") return "M 0 50 C 30 50, 50 -10, 80 -10";
    return "";
  };

  return (
    <div className="flex h-full w-full flex-col lg:flex-row bg-slate-950 text-slate-200 overflow-hidden">
      {/* Control Panel */}
      <div className="flex w-full flex-col gap-6 border-b border-slate-800 bg-slate-900/80 p-6 lg:w-80 lg:border-b-0 lg:border-r lg:overflow-y-auto">
        <div>
          <h3 className="mb-4 text-sm font-bold tracking-wider text-purple-400 uppercase">
            Input Layer
          </h3>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex justify-between font-mono text-xs text-cyan-400">
                <span>Feature X₁</span>
                <span>{inputs[0].toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.1"
                value={inputs[0]}
                onChange={(e) =>
                  setInputs([parseFloat(e.target.value), inputs[1]])
                }
                className="w-full accent-cyan-500"
              />
            </div>
            <div>
              <div className="mb-1 flex justify-between font-mono text-xs text-cyan-400">
                <span>Feature X₂</span>
                <span>{inputs[1].toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.1"
                value={inputs[1]}
                onChange={(e) =>
                  setInputs([inputs[0], parseFloat(e.target.value)])
                }
                className="w-full accent-cyan-500"
              />
            </div>
          </div>
        </div>

        <hr className="border-slate-800" />

        <div>
          <h3 className="mb-4 text-sm font-bold tracking-wider text-purple-400 uppercase">
            Hidden Matrices
          </h3>
          <div className="space-y-4 font-mono text-xs text-purple-300">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="mb-1 block">W(x₁→h₁)</span>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={wI1[0]}
                  onChange={(e) => setWI1([parseFloat(e.target.value), wI1[1]])}
                  className="w-full accent-purple-500"
                />
              </div>
              <div>
                <span className="mb-1 block">W(x₁→h₂)</span>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={wI1[1]}
                  onChange={(e) => setWI1([wI1[0], parseFloat(e.target.value)])}
                  className="w-full accent-purple-500"
                />
              </div>
              <div>
                <span className="mb-1 block">W(x₂→h₁)</span>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={wI2[0]}
                  onChange={(e) => setWI2([parseFloat(e.target.value), wI2[1]])}
                  className="w-full accent-purple-500"
                />
              </div>
              <div>
                <span className="mb-1 block">W(x₂→h₂)</span>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={wI2[1]}
                  onChange={(e) => setWI2([wI2[0], parseFloat(e.target.value)])}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-800" />

        <div>
          <h3 className="mb-4 text-sm font-bold tracking-wider text-purple-400 uppercase">
            Activation
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {(["sigmoid", "tanh", "relu"] as ActivationFunction[]).map((fn) => (
              <button
                key={fn}
                onClick={() => setActivation(fn)}
                className={`rounded py-2 text-xs font-bold uppercase transition-all ${activation === fn ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}
              >
                {fn}
              </button>
            ))}
          </div>

          {/* Live Activation Graph Mini-View */}
          <div className="mt-4 flex items-center gap-4 rounded-lg border border-slate-700 bg-slate-950 p-3">
            <svg
              viewBox="-10 -10 100 60"
              className="h-10 w-16 overflow-visible"
            >
              <line
                x1="0"
                y1="40"
                x2="80"
                y2="40"
                stroke="#334155"
                strokeWidth="2"
              />
              <line
                x1="40"
                y1="0"
                x2="40"
                y2="80"
                stroke="#334155"
                strokeWidth="2"
              />
              <path
                d={getActivationPath()}
                fill="none"
                stroke="#c084fc"
                strokeWidth="3"
                className="transition-all duration-300"
              />
            </svg>
            <div className="text-xs text-slate-400">
              <span className="block font-bold text-slate-200">f(z) Curve</span>
              Maps linear output to non-linear activation.
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Network Graph */}
      <div className="relative flex-1 bg-black p-4">
        {/* CSS for animated data flow */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes dataFlow {
            from { stroke-dashoffset: 20; }
            to { stroke-dashoffset: 0; }
          }
          .animate-flow {
            animation: dataFlow 0.8s linear infinite;
          }
        `,
          }}
        />

        <div className="absolute top-6 left-6 flex items-center gap-2 font-mono text-xs text-slate-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />{" "}
          Live Forward Pass
        </div>

        {/* Pure SVG Graph */}
        <svg
          className="h-full w-full"
          viewBox="0 0 800 500"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* --- EDGES (Connections) --- */}
          {/* Function to render an edge with color based on weight sign, thickness based on magnitude, and dashed flow */}
          {[
            // Input to Hidden
            { x1: 150, y1: 150, x2: 450, y2: 150, w: wI1[0] },
            { x1: 150, y1: 150, x2: 450, y2: 350, w: wI1[1] },
            { x1: 150, y1: 350, x2: 450, y2: 150, w: wI2[0] },
            { x1: 150, y1: 350, x2: 450, y2: 350, w: wI2[1] },
            // Hidden to Output
            { x1: 450, y1: 150, x2: 700, y2: 250, w: wOut[0] },
            { x1: 450, y1: 350, x2: 700, y2: 250, w: wOut[1] },
          ].map((edge, i) => {
            const isPositive = edge.w >= 0;
            const color = isPositive ? "#0ea5e9" : "#e11d48"; // Sky Blue vs Rose
            const width = Math.max(1, Math.abs(edge.w) * 4);
            const midX = (edge.x1 + edge.x2) / 2;
            const midY = (edge.y1 + edge.y2) / 2;

            return (
              <g key={`edge-${i}`}>
                {/* Background line for structure */}
                <line
                  x1={edge.x1}
                  y1={edge.y1}
                  x2={edge.x2}
                  y2={edge.y2}
                  stroke="#1e293b"
                  strokeWidth="4"
                />
                {/* Animated data flow line */}
                <line
                  x1={edge.x1}
                  y1={edge.y1}
                  x2={edge.x2}
                  y2={edge.y2}
                  stroke={color}
                  strokeWidth={width}
                  strokeOpacity="0.8"
                  strokeDasharray="8 6"
                  className="animate-flow"
                />
                {/* Weight Label Bubble */}
                <rect
                  x={midX - 16}
                  y={midY - 10}
                  width="32"
                  height="20"
                  rx="4"
                  fill="#0f172a"
                  stroke={color}
                  strokeWidth="1"
                />
                <text
                  x={midX}
                  y={midY + 4}
                  textAnchor="middle"
                  fill="#f8fafc"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {edge.w.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* --- NODES --- */}
          {/* Inputs */}
          <g transform="translate(150, 150)">
            <circle r="40" fill="#020617" stroke="#22d3ee" strokeWidth="3" />
            <text
              y="-10"
              textAnchor="middle"
              fill="#22d3ee"
              fontSize="14"
              fontFamily="monospace"
            >
              X₁
            </text>
            <text
              y="15"
              textAnchor="middle"
              fill="#f8fafc"
              fontSize="18"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {inputs[0].toFixed(2)}
            </text>
          </g>
          <g transform="translate(150, 350)">
            <circle r="40" fill="#020617" stroke="#22d3ee" strokeWidth="3" />
            <text
              y="-10"
              textAnchor="middle"
              fill="#22d3ee"
              fontSize="14"
              fontFamily="monospace"
            >
              X₂
            </text>
            <text
              y="15"
              textAnchor="middle"
              fill="#f8fafc"
              fontSize="18"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {inputs[1].toFixed(2)}
            </text>
          </g>

          {/* Hidden Layer Nodes */}
          {/* Note: Fill opacity scales with activation value so it physically "lights up" */}
          <g transform="translate(450, 150)">
            <circle
              r="45"
              fill={`rgba(147, 51, 234, ${0.1 + aH1 * 0.5})`}
              stroke="#a855f7"
              strokeWidth="3"
            />
            <text
              y="-12"
              textAnchor="middle"
              fill="#c084fc"
              fontSize="14"
              fontFamily="monospace"
            >
              H₁
            </text>
            <text
              y="12"
              textAnchor="middle"
              fill="#f8fafc"
              fontSize="20"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {aH1.toFixed(2)}
            </text>
            <text
              y="30"
              textAnchor="middle"
              fill="#64748b"
              fontSize="10"
              fontFamily="monospace"
            >
              z: {zH1.toFixed(2)}
            </text>
          </g>
          <g transform="translate(450, 350)">
            <circle
              r="45"
              fill={`rgba(147, 51, 234, ${0.1 + aH2 * 0.5})`}
              stroke="#a855f7"
              strokeWidth="3"
            />
            <text
              y="-12"
              textAnchor="middle"
              fill="#c084fc"
              fontSize="14"
              fontFamily="monospace"
            >
              H₂
            </text>
            <text
              y="12"
              textAnchor="middle"
              fill="#f8fafc"
              fontSize="20"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {aH2.toFixed(2)}
            </text>
            <text
              y="30"
              textAnchor="middle"
              fill="#64748b"
              fontSize="10"
              fontFamily="monospace"
            >
              z: {zH2.toFixed(2)}
            </text>
          </g>

          {/* Output Node */}
          <g transform="translate(700, 250)">
            <circle
              r="55"
              fill={`rgba(16, 185, 129, ${0.1 + finalOutput * 0.6})`}
              stroke="#10b981"
              strokeWidth="4"
            />
            <text
              y="-15"
              textAnchor="middle"
              fill="#34d399"
              fontSize="14"
              fontFamily="monospace"
            >
              Output (ŷ)
            </text>
            <text
              y="15"
              textAnchor="middle"
              fill="#f8fafc"
              fontSize="24"
              fontWeight="black"
              fontFamily="monospace"
            >
              {finalOutput.toFixed(3)}
            </text>
            <text
              y="35"
              textAnchor="middle"
              fill="#64748b"
              fontSize="11"
              fontFamily="monospace"
            >
              z: {zOut.toFixed(2)}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
