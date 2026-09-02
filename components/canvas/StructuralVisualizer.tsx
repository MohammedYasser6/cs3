"use client";

import { useState } from "react";
import { Plug, Unplug, AlertOctagon, CheckCircle2 } from "lucide-react";

export default function StructuralVisualizer() {
  const [hasAdapter, setHasAdapter] = useState(false);

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      {/* Control Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6 z-10">
        <div>
          <h3 className="mb-1 text-sm font-bold tracking-wider text-amber-500 uppercase">
            The Adapter Pattern
          </h3>
          <p className="text-xs text-slate-400">
            Translates incompatible interfaces so they can work together without
            rewriting code.
          </p>
        </div>

        <button
          onClick={() => setHasAdapter(!hasAdapter)}
          className={`flex items-center gap-2 rounded-lg px-6 py-3 font-bold transition-all ${
            hasAdapter
              ? "bg-rose-950/40 border border-rose-900 text-rose-400 hover:bg-rose-900/60"
              : "bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:bg-emerald-500"
          }`}
        >
          {hasAdapter ? (
            <>
              <Unplug className="h-5 w-5" /> Remove Adapter
            </>
          ) : (
            <>
              <Plug className="h-5 w-5" /> Insert Adapter Class
            </>
          )}
        </button>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="relative flex-1 bg-black flex items-center justify-center p-8 overflow-hidden">
        {/* Status indicator */}
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold border bg-slate-950 shadow-xl transition-colors duration-500 z-20"
          style={{
            borderColor: hasAdapter ? "#10b981" : "#e11d48",
            color: hasAdapter ? "#34d399" : "#fb7185",
          }}
        >
          {hasAdapter ? (
            <>
              <CheckCircle2 className="h-4 w-4" /> System Integration Successful
            </>
          ) : (
            <>
              <AlertOctagon className="h-4 w-4" /> Incompatible Interfaces
              (Crash)
            </>
          )}
        </div>

        <svg viewBox="0 0 800 400" className="w-full h-full max-h-[400px]">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* LEFT: Modern JSON Client */}
          <g transform="translate(100, 120)">
            <rect
              x="0"
              y="0"
              width="160"
              height="160"
              rx="16"
              fill="#1e293b"
              stroke="#3b82f6"
              strokeWidth="3"
            />
            <text
              x="80"
              y="70"
              fill="#60a5fa"
              textAnchor="middle"
              fontSize="18"
              fontWeight="bold"
            >
              Modern App
            </text>
            <text
              x="80"
              y="100"
              fill="#94a3b8"
              textAnchor="middle"
              fontSize="12"
            >
              (Sends JSON)
            </text>

            {/* The "Square" output shape */}
            <rect
              x="140"
              y="60"
              width="40"
              height="40"
              fill="#0f172a"
              stroke="#3b82f6"
              strokeWidth="2"
            />
          </g>

          {/* RIGHT: Legacy XML API */}
          <g transform="translate(540, 120)">
            <rect
              x="0"
              y="0"
              width="160"
              height="160"
              rx="16"
              fill="#1e293b"
              stroke="#f59e0b"
              strokeWidth="3"
            />
            <text
              x="80"
              y="70"
              fill="#fbbf24"
              textAnchor="middle"
              fontSize="18"
              fontWeight="bold"
            >
              Legacy API
            </text>
            <text
              x="80"
              y="100"
              fill="#94a3b8"
              textAnchor="middle"
              fontSize="12"
            >
              (Requires XML)
            </text>

            {/* The "Triangle" input shape */}
            <polygon
              points="-20,80 20,60 20,100"
              fill="#0f172a"
              stroke="#f59e0b"
              strokeWidth="2"
            />
          </g>

          {/* MIDDLE: The Connection / Adapter */}
          {hasAdapter ? (
            <g className="animate-fade-in" transform="translate(320, 140)">
              {/* Adapter Block */}
              <rect
                x="0"
                y="0"
                width="160"
                height="120"
                rx="8"
                fill="#064e3b"
                stroke="#10b981"
                strokeWidth="3"
                filter="url(#glow)"
              />
              <text
                x="80"
                y="45"
                fill="#34d399"
                textAnchor="middle"
                fontSize="16"
                fontWeight="bold"
              >
                Adapter Class
              </text>
              <text
                x="80"
                y="70"
                fill="#6ee7b7"
                textAnchor="middle"
                fontSize="10"
              >
                JSON ➔ XML Translator
              </text>

              {/* Connectors matching the endpoints */}
              <rect x="-20" y="40" width="20" height="40" fill="#10b981" />
              <polygon points="160,40 180,60 160,80" fill="#10b981" />

              {/* Success Data Flow Animation */}
              <circle
                cx="-60"
                cy="60"
                r="6"
                fill="#3b82f6"
                className="animate-[slideRight_1.5s_linear_infinite]"
              />
              <circle
                cx="220"
                cy="60"
                r="6"
                fill="#f59e0b"
                className="animate-[slideRight_1.5s_linear_infinite]"
              />
            </g>
          ) : (
            <g className="animate-fade-in">
              {/* Broken connection wires */}
              <path
                d="M 280 200 L 380 200"
                stroke="#e11d48"
                strokeWidth="4"
                strokeDasharray="10 5"
              />
              <path
                d="M 420 200 L 520 200"
                stroke="#e11d48"
                strokeWidth="4"
                strokeDasharray="10 5"
              />
              <path d="M 380 180 L 400 220 L 420 180 Z" fill="#e11d48" />

              {/* Failing Data Packet */}
              <rect
                x="270"
                y="192"
                width="16"
                height="16"
                fill="#3b82f6"
                className="animate-[crash_1.5s_ease-in_infinite]"
              />
            </g>
          )}
        </svg>

        {/* Global animations for the SVG */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes slideRight {
            0% { transform: translateX(0); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateX(60px); opacity: 0; }
          }
          @keyframes crash {
            0% { transform: translateX(0); opacity: 1; }
            45% { transform: translateX(110px); opacity: 1; }
            50% { transform: translateX(120px) scale(1.5); opacity: 0; }
            100% { opacity: 0; }
          }
        `,
          }}
        />
      </div>
    </div>
  );
}
