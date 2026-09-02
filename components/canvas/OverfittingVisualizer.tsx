"use client";

import { useState } from "react";
import { Activity, ShieldCheck, AlertTriangle } from "lucide-react";

export default function OverfittingVisualizer() {
  const [complexity, setComplexity] = useState<number>(5);
  const [regularization, setRegularization] = useState<boolean>(false);

  // If regularization is on, it "clamps" the effective complexity, preventing overfitting
  const effectiveComplexity = regularization
    ? Math.min(complexity, 5)
    : complexity;

  // Calculate simulated losses
  const trainLoss = Math.max(2, 40 - effectiveComplexity * 3.5);
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
      // Overfit: Wild spikes attempting to pass through every single point
      return "M 0 90 L 15 85 L 20 20 L 45 75 L 55 10 L 75 80 L 85 15 L 100 30";
    }
  };

  const getStatusColor = () => {
    if (effectiveComplexity <= 3)
      return "text-cyan-400 border-cyan-500 bg-cyan-950/50";
    if (effectiveComplexity <= 6)
      return "text-emerald-400 border-emerald-500 bg-emerald-950/50";
    return "text-rose-400 border-rose-500 bg-rose-950/50";
  };

  const getStatusText = () => {
    if (effectiveComplexity <= 3) return "Underfitting (High Bias)";
    if (effectiveComplexity <= 6) return "Optimal Fit";
    return "Overfitting (High Variance)";
  };

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      {/* Top Control Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6 z-10 gap-6">
        <div>
          <h3 className="mb-1 text-sm font-bold tracking-wider text-purple-500 uppercase">
            Model Hyperparameters
          </h3>
          <p className="text-xs text-slate-400">
            Adjust capacity and observe the effect on the validation gap.
          </p>
        </div>

        <div className="flex flex-1 max-w-xl items-center gap-8">
          {/* Capacity Slider */}
          <div className="flex-1">
            <div className="mb-2 flex justify-between font-mono text-xs">
              <span className="text-slate-300">
                Model Capacity (Epochs/Nodes)
              </span>
              <span className="text-purple-400 font-bold">{complexity}/10</span>
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
          </div>

          <div className="w-px h-10 bg-slate-800" />

          {/* Regularization Toggle */}
          <div className="flex flex-col items-center">
            <span className="mb-2 text-xs font-bold text-slate-300">
              Regularization (Dropout/L2)
            </span>
            <button
              onClick={() => setRegularization(!regularization)}
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${regularization ? "bg-emerald-500" : "bg-slate-700"}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${regularization ? "translate-x-7" : "translate-x-1"}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="relative flex-1 bg-black p-8 flex flex-col items-center justify-center overflow-hidden">
        {/* Alerts Overlay */}
        <div className="absolute top-6 right-6 flex flex-col gap-3 z-20 w-72">
          {valLoss > 30 && !regularization && (
            <div className="flex items-start gap-3 rounded-lg border border-rose-500/50 bg-rose-950/80 p-4 shadow-xl backdrop-blur-md animate-slide-up">
              <AlertTriangle className="h-5 w-5 shrink-0 text-rose-400" />
              <p className="text-xs text-rose-200">
                <strong className="text-rose-400 block mb-1">
                  Memorizing Noise!
                </strong>
                Validation loss is spiking while training loss drops. The model
                is failing to generalize.
              </p>
            </div>
          )}
          {regularization && complexity > 6 && (
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/50 bg-emerald-950/80 p-4 shadow-xl backdrop-blur-md animate-slide-up">
              <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400" />
              <p className="text-xs text-emerald-200">
                <strong className="text-emerald-400 block mb-1">
                  L2 Penalty Active
                </strong>
                Regularization is forcing the curve to stay smooth, preventing
                overfitting despite high capacity.
              </p>
            </div>
          )}

          {/* Live Metrics Panel */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/90 p-4 shadow-2xl backdrop-blur-md mt-2">
            <h4 className="mb-4 text-xs font-bold tracking-wider text-slate-400 uppercase">
              Live Loss Metrics
            </h4>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-slate-400">Training Loss</span>
                  <span className="text-cyan-400">{trainLoss.toFixed(2)}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-950">
                  <div
                    className="h-full bg-cyan-500 transition-all duration-300"
                    style={{ width: `${Math.min(100, trainLoss * 2)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-slate-400">Validation Loss</span>
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
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-950">
                  <div
                    className={`h-full transition-all duration-300 ${valLoss > 30 ? "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" : "bg-emerald-500"}`}
                    style={{ width: `${Math.min(100, valLoss * 2)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The SVG Canvas */}
        <div className="relative w-full max-w-3xl h-[60%] min-h-[350px]">
          <div
            className={`absolute -top-12 left-0 flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold transition-colors shadow-lg ${getStatusColor()}`}
          >
            <Activity className="h-4 w-4" />
            {getStatusText()}
          </div>

          <svg
            viewBox="0 0 100 100"
            className="h-full w-full rounded-xl border border-slate-800 bg-slate-900/30 shadow-2xl overflow-visible"
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
              style={{
                filter: "drop-shadow(0px 0px 4px rgba(255,255,255,0.2))",
              }}
            />

            {/* Training Data Points (Blue) - Model SEES these */}
            <g fill="#38bdf8">
              <circle cx="15" cy="85" r="2.5" />
              <circle cx="45" cy="75" r="2.5" />
              <circle cx="75" cy="80" r="2.5" />
              <circle cx="85" cy="15" r="2.5" />
              <circle cx="20" cy="20" r="2.5" />
              <circle cx="55" cy="10" r="2.5" />
            </g>

            {/* Validation Data Points (Orange) - Model DOES NOT SEE these during training */}
            <g fill="#fb923c">
              <circle cx="25" cy="65" r="2.5" />
              <circle cx="50" cy="45" r="2.5" />
              <circle cx="80" cy="40" r="2.5" />
              <circle cx="35" cy="30" r="2.5" />
            </g>
          </svg>

          {/* Legend */}
          <div className="absolute -bottom-10 left-0 flex gap-6 text-xs text-slate-400 font-mono">
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
