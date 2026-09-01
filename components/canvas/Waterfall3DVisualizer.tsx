"use client";

import { useState } from "react";
import { ArrowRight, RotateCcw, AlertTriangle, Bug } from "lucide-react";

const STAGES = [
  {
    id: 0,
    title: "Requirements",
    color: "#f43f5e",
    textClass: "text-rose-500",
    desc: "Gathering all system and software requirements in a massive document (SRS) before any code is written.",
  },
  {
    id: 1,
    title: "System Design",
    color: "#f97316",
    textClass: "text-orange-500",
    desc: "Architecting the system, creating database schemas, and planning UI layouts based strictly on the requirements.",
  },
  {
    id: 2,
    title: "Implementation",
    color: "#f59e0b",
    textClass: "text-amber-500",
    desc: "Developers finally write the code. This stage is completely isolated from the clients.",
  },
  {
    id: 3,
    title: "Testing (QA)",
    color: "#10b981",
    textClass: "text-emerald-500",
    desc: "QA teams test the finished software to find bugs. If a core requirement was wrong, it is very expensive to fix here.",
  },
  {
    id: 4,
    title: "Deployment",
    color: "#06b6d4",
    textClass: "text-cyan-500",
    desc: "The software is delivered to the customer and pushed to production servers.",
  },
  {
    id: 5,
    title: "Maintenance",
    color: "#3b82f6",
    textClass: "text-blue-500",
    desc: "Fixing ongoing bugs and patching software. The longest phase of the lifecycle.",
  },
];

export default function WaterfallVisualizer() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showFlaw, setShowFlaw] = useState(false);

  const nextStep = () => {
    if (activeStep < STAGES.length - 1) {
      setActiveStep(activeStep + 1);
      setShowFlaw(false);
    }
  };

  const reset = () => {
    setActiveStep(0);
    setShowFlaw(false);
  };

  const triggerFlaw = () => {
    setShowFlaw(true);
  };

  const activeStageData = STAGES[activeStep];

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200 lg:flex-row overflow-hidden">
      {/* Left Control Panel */}
      <div className="flex w-full flex-col gap-6 border-b border-slate-800 bg-slate-900/50 p-6 lg:w-80 lg:border-b-0 lg:border-r overflow-y-auto">
        <div>
          <h3 className="mb-4 text-sm font-bold tracking-wider text-amber-500 uppercase">
            SDLC Flow Control
          </h3>

          <div className="flex flex-col gap-3 mb-6">
            <button
              onClick={nextStep}
              disabled={activeStep === STAGES.length - 1}
              className="flex w-full items-center justify-center gap-2 rounded bg-amber-600 py-3 text-sm font-bold text-white shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:bg-amber-500 disabled:opacity-50 transition-all"
            >
              Advance to Next Phase <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={reset}
              className="flex w-full items-center justify-center gap-2 rounded border border-slate-700 bg-slate-800 py-3 text-sm font-bold text-slate-300 hover:bg-slate-700 transition-all"
            >
              <RotateCcw className="h-4 w-4" /> Restart Process
            </button>
          </div>

          <hr className="border-slate-800 mb-6" />

          {/* Dynamic Phase Info */}
          <div className="animate-fade-in rounded-xl border border-slate-700 bg-slate-800 p-5 shadow-xl">
            <div
              className={`mb-2 font-mono text-xs font-bold uppercase tracking-widest ${activeStageData.textClass}`}
            >
              Phase {activeStep + 1} of 6
            </div>
            <h4 className="text-xl font-black text-white mb-3">
              {activeStageData.title}
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {activeStageData.desc}
            </p>
          </div>

          {/* Flaw Demonstration (Unlocks at Testing) */}
          <div
            className={`mt-6 transition-all duration-500 ${activeStep >= 3 ? "opacity-100" : "opacity-30 pointer-events-none"}`}
          >
            <h3 className="mb-3 text-xs font-bold tracking-wider text-rose-500 uppercase flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> The Waterfall Flaw
            </h3>
            <button
              onClick={triggerFlaw}
              className="flex w-full items-center justify-center gap-2 rounded border border-rose-900/50 bg-rose-950/40 py-3 text-sm font-bold text-rose-400 hover:bg-rose-900/60 transition-all"
            >
              <Bug className="h-4 w-4" /> Simulate Bug in {STAGES[3].title}
            </button>
            {showFlaw && (
              <p className="mt-3 text-xs text-rose-300 animate-slide-up">
                A core requirement was wrong! In Waterfall, you must flow all
                the way back up to Phase 1, destroying months of design and
                code.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right SVG Canvas */}
      <div className="relative flex flex-1 items-center justify-center bg-black p-4 lg:p-8">
        <svg
          viewBox="0 0 800 600"
          className="h-full max-h-[600px] w-full rounded-xl border border-slate-800 bg-slate-900/30 shadow-2xl overflow-visible"
        >
          <defs>
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="8" stdDeviation="4" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Grid lines for aesthetic */}
          <g stroke="#1e293b" strokeWidth="1" opacity="0.5">
            {[100, 200, 300, 400, 500, 600, 700].map((line) => (
              <line key={`v-${line}`} x1={line} y1="0" x2={line} y2="600" />
            ))}
            {[100, 200, 300, 400, 500].map((line) => (
              <line key={`h-${line}`} x1="0" y1={line} x2="800" y2={line} />
            ))}
          </g>

          {/* Connection Lines (The Water Flow) */}
          {STAGES.map((stage, i) => {
            if (i === STAGES.length - 1) return null; // No line after last step
            const x1 = 120 + i * 100;
            const y1 = 100 + i * 80;
            const x2 = x1 + 100;
            const y2 = y1 + 80;

            const isActiveFlow = i < activeStep;

            return (
              <g key={`flow-${stage.id}`}>
                {/* Background Track */}
                <path
                  d={`M ${x1} ${y1} L ${x1} ${y2} L ${x2} ${y2}`}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                {/* Animated Active Flow */}
                {isActiveFlow && (
                  <path
                    d={`M ${x1} ${y1} L ${x1} ${y2} L ${x2} ${y2}`}
                    fill="none"
                    stroke={STAGES[i + 1].color}
                    strokeWidth="4"
                    strokeLinejoin="round"
                    strokeDasharray="10 5"
                    className="animate-[dash_1s_linear_infinite]"
                  />
                )}
              </g>
            );
          })}

          {/* The Flaw / Backflow Line */}
          {showFlaw && (
            <g className="animate-fade-in">
              <path
                d="M 470 340 L 530 340 L 530 60 L 120 60 L 120 100"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="4"
                strokeLinejoin="round"
                strokeDasharray="8 8"
                className="animate-[dash_1s_linear_infinite_reverse]"
              />
              <circle cx="120" cy="100" r="6" fill="#f43f5e" />
            </g>
          )}

          {/* Blocks */}
          {STAGES.map((stage, i) => {
            const x = 20 + i * 100;
            const y = 60 + i * 80;
            const width = 200;
            const height = 60;

            const isPast = i < activeStep;
            const isCurrent = i === activeStep;

            // Base colors
            let fill = "#1e293b"; // slate-800
            let stroke = "#334155"; // slate-700
            let textColor = "#94a3b8"; // slate-400

            if (isCurrent) {
              fill = stage.color;
              stroke = "#ffffff";
              textColor = "#ffffff";
            } else if (isPast) {
              fill = "#0f172a"; // slate-950
              stroke = stage.color;
              textColor = stage.color;
            }

            return (
              <g
                key={`block-${stage.id}`}
                style={{ transition: "all 0.5s ease" }}
              >
                {/* 3D Depth Layer */}
                <rect
                  x={x}
                  y={y + 8}
                  width={width}
                  height={height}
                  rx="8"
                  fill={isCurrent ? "#000000" : "#020617"}
                  opacity="0.6"
                />

                {/* Main Block */}
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  rx="8"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isCurrent ? "2" : "1"}
                  filter="url(#shadow)"
                  className="transition-colors duration-500"
                />

                {/* Text */}
                <text
                  x={x + 100}
                  y={y + 35}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={textColor}
                  className="font-sans text-sm font-bold tracking-wide transition-colors duration-500"
                >
                  {stage.title}
                </text>

                {/* Highlight Glow for Current Step */}
                {isCurrent && (
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    rx="8"
                    fill="none"
                    stroke={stage.color}
                    strokeWidth="6"
                    opacity="0.4"
                    className="animate-pulse"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Global animation styles for the flowing water */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes dash { to { stroke-dashoffset: -30; } }
          @keyframes dash_reverse { to { stroke-dashoffset: 30; } }
        `,
          }}
        />
      </div>
    </div>
  );
}
