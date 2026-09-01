"use client";

import { useState } from "react";
import Link from "next/link";
import { Activity, ShieldCheck, AlertTriangle } from "lucide-react";

function OverfittingVisualizer() {
  const [complexity, setComplexity] = useState<number>(5);
  const [regularization, setRegularization] = useState<boolean>(false);

  // If regularization is on, it "clamps" the effective complexity, preventing overfitting
  const effectiveComplexity = regularization
    ? Math.min(complexity, 5)
    : complexity;

  // Calculate simulated losses
  // Training loss always goes down as complexity increases
  const trainLoss = Math.max(2, 40 - effectiveComplexity * 3.5);
  // Validation loss forms a U-shape (lowest around complexity 5)
  const valLoss =
    effectiveComplexity <= 5
      ? 45 - effectiveComplexity * 5
      : 20 + Math.pow(effectiveComplexity - 5, 2) * 2;

  // Generate the SVG path based on effective complexity
  const getPath = () => {
    if (effectiveComplexity <= 3) {
      // Underfit: Straight line missing most points
      return "M 0 80 L 100 30";
    } else if (effectiveComplexity <= 6) {
      // Optimal: Smooth curve capturing the trend
      return "M 0 90 Q 25 70 50 50 T 100 20";
    } else {
      // Overfit: Wild spikes attempting to pass through every single training point exactly
      return "M 0 90 L 15 85 L 20 20 L 45 75 L 55 10 L 75 80 L 85 15 L 100 30";
    }
  };

  const getStatusColor = () => {
    if (effectiveComplexity <= 3)
      return "text-cyan-400 border-cyan-500 bg-cyan-500/10";
    if (effectiveComplexity <= 6)
      return "text-emerald-400 border-emerald-500 bg-emerald-500/10";
    return "text-rose-400 border-rose-500 bg-rose-500/10";
  };

  const getStatusText = () => {
    if (effectiveComplexity <= 3) return "Underfitting (High Bias)";
    if (effectiveComplexity <= 6) return "Optimal Fit";
    return "Overfitting (High Variance)";
  };

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
        {/* Controls & Metrics */}
        <div className="flex flex-col gap-6 border-b border-slate-800 bg-slate-900/50 p-6 lg:border-b-0 lg:border-r">
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wider text-purple-400 uppercase">
              Hyperparameters
            </h3>

            <div className="space-y-6">
              <div>
                <div className="mb-2 flex justify-between font-mono text-xs">
                  <span className="text-slate-300">
                    Model Capacity (Epochs/Nodes)
                  </span>
                  <span className="text-purple-400 font-bold">
                    {complexity}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={complexity}
                  onChange={(e) => setComplexity(parseInt(e.target.value))}
                  className="w-full accent-purple-500"
                />
                <p className="mt-1 text-[10px] text-slate-500">
                  More capacity = ability to learn more complex patterns.
                </p>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                <div>
                  <span className="block text-sm font-bold text-slate-200">
                    Apply Regularization
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Dropout / L2 Penalty
                  </span>
                </div>
                <button
                  onClick={() => setRegularization(!regularization)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${regularization ? "bg-emerald-500" : "bg-slate-600"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${regularization ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>
            </div>
          </div>

          <hr className="border-slate-800" />

          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wider text-purple-400 uppercase">
              Live Metrics
            </h3>
            <div className="space-y-4 font-mono text-xs">
              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-slate-400">Training Loss</span>
                  <span className="text-cyan-400">{trainLoss.toFixed(2)}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full bg-cyan-500 transition-all duration-300"
                    style={{ width: `${Math.min(100, trainLoss * 2)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-slate-400">Validation (Test) Loss</span>
                  <span
                    className={
                      valLoss > 30
                        ? "text-rose-400 font-bold"
                        : "text-emerald-400"
                    }
                  >
                    {valLoss.toFixed(2)}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full transition-all duration-300 ${valLoss > 30 ? "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" : "bg-emerald-500"}`}
                    style={{ width: `${Math.min(100, valLoss * 2)}%` }}
                  />
                </div>
              </div>
            </div>

            {valLoss > 30 && !regularization && (
              <div className="mt-4 flex items-start gap-2 rounded border border-rose-900/50 bg-rose-950/30 p-3 text-xs text-rose-300">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <p>
                  Validation loss is spiking while training loss drops! The
                  model is memorizing noise.
                </p>
              </div>
            )}
            {regularization && (
              <div className="mt-4 flex items-start gap-2 rounded border border-emerald-900/50 bg-emerald-950/30 p-3 text-xs text-emerald-300">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <p>
                  Regularization is forcing the model to generalize, preventing
                  overfitting despite high capacity.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Visualizer Canvas */}
        <div className="relative flex flex-col items-center justify-center p-8 lg:col-span-2">
          <div
            className={`absolute top-6 flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold transition-colors ${getStatusColor()}`}
          >
            <Activity className="h-4 w-4" />
            {getStatusText()}
          </div>

          <svg
            viewBox="0 0 100 100"
            className="h-full max-h-[400px] w-full rounded-xl border border-slate-700 bg-black shadow-2xl overflow-visible"
          >
            {/* Grid lines */}
            <g stroke="#1e293b" strokeWidth="0.5">
              {[20, 40, 60, 80].map((line) => (
                <g key={line}>
                  <line x1="0" y1={line} x2="100" y2={line} />
                  <line x1={line} y1="0" x2={line} y2="100" />
                </g>
              ))}
            </g>

            {/* The Model's Prediction Curve */}
            <path
              d={getPath()}
              fill="none"
              stroke={
                effectiveComplexity <= 3
                  ? "#0ea5e9"
                  : effectiveComplexity <= 6
                    ? "#10b981"
                    : "#e11d48"
              }
              strokeWidth="1.5"
              className="transition-all duration-500"
            />

            {/* Training Data Points (Blue) - Model SEES these */}
            <g fill="#38bdf8">
              <circle cx="15" cy="85" r="2" />
              <circle cx="45" cy="75" r="2" />
              <circle cx="75" cy="80" r="2" />
              <circle cx="85" cy="15" r="2" />
              <circle cx="20" cy="20" r="2" />
              <circle cx="55" cy="10" r="2" />
            </g>

            {/* Validation Data Points (Orange) - Model DOES NOT SEE these during training */}
            <g fill="#fb923c">
              <circle cx="25" cy="65" r="2" />
              <circle cx="50" cy="45" r="2" />
              <circle cx="80" cy="40" r="2" />
              <circle cx="35" cy="30" r="2" />
            </g>
          </svg>

          <div className="mt-6 flex gap-6 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#38bdf8]" /> Training
              Data
            </span>
            <span className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#fb923c]" /> Unseen
              Validation Data
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OverfittingPage() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden text-slate-200">
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 xl:grid-cols-2">
          <section className="flex flex-col rounded-xl border border-purple-900/30 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-sm">
            <div className="mb-2 text-sm font-bold tracking-widest text-purple-500 uppercase">
              AI Track • Level 4
            </div>
            <h1 className="mb-6 text-4xl font-extrabold text-slate-100">
              Overfitting & Regularization
            </h1>

            <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
              <p>
                As neural networks gain more capacity (nodes/layers), they gain
                the ability to learn incredibly complex patterns. However, if
                they have <em>too much</em> capacity relative to the amount of
                data, they will simply{" "}
                <strong className="text-rose-400">memorize</strong> the
                dataset—including all its random noise.
              </p>

              <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                <h3 className="mb-2 font-bold text-slate-100">
                  The Validation Gap
                </h3>
                <p className="mb-2">
                  The true test of an AI is not how well it scores on data it
                  has already seen (Training Loss), but how well it generalizes
                  to data it has never seen (Validation Loss).
                </p>
                <p className="border-l-2 border-rose-500 pl-3 italic text-slate-400">
                  If Training Loss goes down, but Validation Loss goes UP, your
                  model is overfitting.
                </p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                <h3 className="mb-2 font-bold text-slate-100">
                  The Solution: Regularization
                </h3>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <strong className="text-emerald-400">Dropout:</strong>{" "}
                    Randomly turning off neurons during training forces the
                    network to distribute learning evenly instead of relying on
                    a few nodes to memorize points.
                  </li>
                  <li>
                    <strong className="text-emerald-400">L2 Penalty:</strong>{" "}
                    Mathematically punishing the model for using weights that
                    are too large, forcing the curve to stay smooth.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/ai/overfitting/quiz"
                className="inline-flex w-fit items-center rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:bg-purple-500"
              >
                Take Assessment (+200 AI XP)
              </Link>
            </div>
          </section>

          <section className="relative flex min-h-[550px] items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-black shadow-2xl xl:col-span-1">
            <OverfittingVisualizer />
          </section>
        </div>
      </main>
    </div>
  );
}
