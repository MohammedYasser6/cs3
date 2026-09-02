"use client";

import { useState } from "react";
import { Play, Activity } from "lucide-react";

export default function LSTMVisualizer() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prev) => (prev >= 4 ? 0 : prev + 1));
  };

  const getStepDescription = () => {
    switch (step) {
      case 0:
        return "Waiting for input token (xₜ)";
      case 1:
        return "Forget Gate: Erases irrelevant data from the Cell State";
      case 2:
        return "Input Gate: Adds new relevant data to the Cell State";
      case 3:
        return "Update: Cell State conveyor belt moves forward";
      case 4:
        return "Output Gate: Filters Cell State to create the new Hidden State (hₜ)";
      default:
        return "";
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6 z-10">
        <div>
          <h3 className="mb-1 text-sm font-bold tracking-wider text-purple-500 uppercase">
            LSTM Cell Internal Architecture
          </h3>
          <p className="text-xs text-slate-400">
            Step through the mathematical gates that protect long-term memory.
          </p>
        </div>
        <button
          onClick={nextStep}
          className="flex items-center gap-2 rounded bg-purple-600 px-6 py-2 text-sm font-bold text-white hover:bg-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all"
        >
          <Play className="h-4 w-4" /> {step === 4 ? "Reset" : "Next Gate"}
        </button>
      </div>

      <div className="relative flex-1 bg-black p-8 flex items-center justify-center overflow-hidden">
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-purple-500 bg-purple-950/80 px-6 py-2 text-sm font-bold text-purple-300 shadow-xl z-20">
          <Activity className="h-4 w-4" /> {getStepDescription()}
        </div>

        <svg viewBox="0 0 800 400" className="w-full h-full max-h-[400px]">
          {/* Main LSTM Box */}
          <rect
            x="200"
            y="80"
            width="400"
            height="240"
            rx="16"
            fill="#1e293b"
            stroke="#6366f1"
            strokeWidth="3"
          />

          {/* Cell State (The Conveyor Belt) */}
          <path
            d="M 100 120 L 700 120"
            stroke={step >= 3 ? "#10b981" : "#475569"}
            strokeWidth="8"
            className="transition-colors duration-500"
          />
          <text
            x="400"
            y="105"
            fill={step >= 3 ? "#34d399" : "#94a3b8"}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
          >
            Cell State (Cₜ)
          </text>

          {/* Previous Hidden State */}
          <path d="M 100 280 L 250 280" stroke="#a855f7" strokeWidth="4" />
          <text x="130" y="270" fill="#c084fc" fontSize="12" fontWeight="bold">
            Prev hₜ₋₁
          </text>

          {/* Current Input */}
          <path d="M 300 380 L 300 300" stroke="#3b82f6" strokeWidth="4" />
          <text x="315" y="370" fill="#60a5fa" fontSize="12" fontWeight="bold">
            Input xₜ
          </text>

          {/* Forget Gate */}
          <g
            className={`transition-opacity duration-500 ${step === 1 ? "opacity-100" : "opacity-20"}`}
          >
            <rect
              x="280"
              y="180"
              width="40"
              height="40"
              rx="4"
              fill="#4c0519"
              stroke="#f43f5e"
              strokeWidth="2"
            />
            <text
              x="300"
              y="205"
              fill="#fb7185"
              textAnchor="middle"
              fontSize="16"
              fontWeight="bold"
            >
              X
            </text>
            <path
              d="M 300 280 L 300 220"
              stroke="#f43f5e"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path d="M 300 180 L 300 120" stroke="#f43f5e" strokeWidth="2" />
          </g>

          {/* Input Gate */}
          <g
            className={`transition-opacity duration-500 ${step === 2 ? "opacity-100" : "opacity-20"}`}
          >
            <rect
              x="400"
              y="180"
              width="40"
              height="40"
              rx="4"
              fill="#064e3b"
              stroke="#10b981"
              strokeWidth="2"
            />
            <text
              x="420"
              y="205"
              fill="#34d399"
              textAnchor="middle"
              fontSize="16"
              fontWeight="bold"
            >
              +
            </text>
            <path
              d="M 420 280 L 420 220"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path d="M 420 180 L 420 120" stroke="#10b981" strokeWidth="2" />
          </g>

          {/* Output Gate */}
          <g
            className={`transition-opacity duration-500 ${step === 4 ? "opacity-100" : "opacity-20"}`}
          >
            <rect
              x="520"
              y="180"
              width="40"
              height="40"
              rx="4"
              fill="#1e3a8a"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text
              x="540"
              y="205"
              fill="#60a5fa"
              textAnchor="middle"
              fontSize="16"
              fontWeight="bold"
            >
              tanh
            </text>
            <path
              d="M 540 120 L 540 180"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path d="M 540 220 L 540 280" stroke="#3b82f6" strokeWidth="2" />
            <path d="M 540 280 L 700 280" stroke="#3b82f6" strokeWidth="4" />
            <text
              x="630"
              y="270"
              fill="#60a5fa"
              fontSize="12"
              fontWeight="bold"
            >
              New hₜ
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
