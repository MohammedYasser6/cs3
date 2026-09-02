"use client";

import { useState, useEffect } from "react";
import { Server, Box, CloudLightning, Activity, Database } from "lucide-react";

export default function MicroservicesVisualizer() {
  const [architecture, setArchitecture] = useState<
    "monolith" | "microservices" | "serverless"
  >("monolith");
  const [isSimulating, setIsSimulating] = useState(false);

  const triggerTraffic = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 2500);
  };

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      {/* Control Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6 z-10">
        <div>
          <h3 className="mb-1 text-sm font-bold tracking-wider text-amber-500 uppercase">
            Deployment Architectures
          </h3>
          <p className="text-xs text-slate-400">
            Compare how different systems handle a massive traffic spike to the
            "Billing" feature.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
            <button
              onClick={() => {
                setArchitecture("monolith");
                setIsSimulating(false);
              }}
              className={`px-4 py-2 text-xs font-bold transition-all ${architecture === "monolith" ? "bg-amber-600 text-white" : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"}`}
            >
              Monolith
            </button>
            <button
              onClick={() => {
                setArchitecture("microservices");
                setIsSimulating(false);
              }}
              className={`px-4 py-2 text-xs font-bold transition-all ${architecture === "microservices" ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"}`}
            >
              Microservices
            </button>
            <button
              onClick={() => {
                setArchitecture("serverless");
                setIsSimulating(false);
              }}
              className={`px-4 py-2 text-xs font-bold transition-all ${architecture === "serverless" ? "bg-purple-600 text-white" : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"}`}
            >
              Serverless
            </button>
          </div>

          <button
            onClick={triggerTraffic}
            disabled={isSimulating}
            className="flex items-center gap-2 rounded bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500 disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(225,29,72,0.3)]"
          >
            <Activity className="h-4 w-4" /> Spike Billing Traffic
          </button>
        </div>
      </div>

      <div className="relative flex-1 bg-black p-8 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 800 400" className="w-full h-full max-h-[400px]">
          {architecture === "monolith" && (
            <g className="animate-fade-in">
              <text
                x="400"
                y="40"
                fill="#94a3b8"
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
              >
                Single Unified Codebase & Server
              </text>

              {/* Monolith Box */}
              <rect
                x="250"
                y="80"
                width="300"
                height="200"
                rx="16"
                fill="#1e293b"
                stroke={isSimulating ? "#f43f5e" : "#3b82f6"}
                strokeWidth="4"
                className="transition-colors duration-300"
              />

              {/* Internal Modules */}
              <rect
                x="280"
                y="110"
                width="240"
                height="40"
                rx="4"
                fill="#0f172a"
                stroke="#475569"
                strokeWidth="2"
              />
              <text
                x="400"
                y="135"
                fill="#94a3b8"
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
              >
                UI Component
              </text>

              <rect
                x="280"
                y="160"
                width="240"
                height="40"
                rx="4"
                fill="#0f172a"
                stroke="#475569"
                strokeWidth="2"
              />
              <text
                x="400"
                y="185"
                fill="#94a3b8"
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
              >
                Auth Logic
              </text>

              {/* Billing Module gets hit */}
              <rect
                x="280"
                y="210"
                width="240"
                height="40"
                rx="4"
                fill={isSimulating ? "#4c0519" : "#0f172a"}
                stroke={isSimulating ? "#f43f5e" : "#475569"}
                strokeWidth="2"
                className="transition-colors duration-300"
              />
              <text
                x="400"
                y="235"
                fill={isSimulating ? "#fb7185" : "#94a3b8"}
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
              >
                Billing Logic
              </text>

              {/* Shared Database */}
              <rect
                x="350"
                y="320"
                width="100"
                height="60"
                rx="8"
                fill="#1e293b"
                stroke="#f59e0b"
                strokeWidth="2"
              />
              <Database className="h-6 w-6 text-amber-400" x="388" y="330" />
              <path d="M 400 280 L 400 320" stroke="#f59e0b" strokeWidth="3" />

              {/* Scaling Outline */}
              {isSimulating && (
                <rect
                  x="230"
                  y="60"
                  width="340"
                  height="240"
                  rx="16"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  className="animate-pulse"
                />
              )}

              {isSimulating && (
                <text
                  x="400"
                  y="395"
                  fill="#f43f5e"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                >
                  Inefficient: The ENTIRE app must scale up just for Billing.
                </text>
              )}
            </g>
          )}

          {architecture === "microservices" && (
            <g className="animate-fade-in">
              <text
                x="400"
                y="40"
                fill="#94a3b8"
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
              >
                Independent Services Communicating via Network (REST)
              </text>

              {/* UI Service */}
              <rect
                x="150"
                y="120"
                width="120"
                height="80"
                rx="8"
                fill="#1e293b"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <text
                x="210"
                y="165"
                fill="#60a5fa"
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
              >
                UI Service
              </text>

              {/* Auth Service */}
              <rect
                x="340"
                y="120"
                width="120"
                height="80"
                rx="8"
                fill="#1e293b"
                stroke="#10b981"
                strokeWidth="2"
              />
              <text
                x="400"
                y="165"
                fill="#34d399"
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
              >
                Auth Service
              </text>
              <rect
                x="370"
                y="220"
                width="60"
                height="40"
                rx="4"
                fill="#064e3b"
                stroke="#10b981"
                strokeWidth="2"
              />
              <path d="M 400 200 L 400 220" stroke="#10b981" strokeWidth="2" />

              {/* Billing Service */}
              <rect
                x="530"
                y="120"
                width="120"
                height="80"
                rx="8"
                fill={isSimulating ? "#4c0519" : "#1e293b"}
                stroke={isSimulating ? "#f43f5e" : "#f59e0b"}
                strokeWidth={isSimulating ? "4" : "2"}
                className="transition-all duration-300"
              />
              <text
                x="590"
                y="165"
                fill={isSimulating ? "#fb7185" : "#fbbf24"}
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
              >
                Billing Service
              </text>
              <rect
                x="560"
                y="220"
                width="60"
                height="40"
                rx="4"
                fill="#1e293b"
                stroke="#f59e0b"
                strokeWidth="2"
              />
              <path d="M 590 200 L 590 220" stroke="#f59e0b" strokeWidth="2" />

              {/* Network Lines */}
              <path
                d="M 270 160 L 340 160"
                stroke="#475569"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 460 160 L 530 160"
                stroke="#475569"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Scaling Clones */}
              {isSimulating && (
                <g className="animate-fade-in">
                  <rect
                    x="540"
                    y="100"
                    width="120"
                    height="80"
                    rx="8"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <rect
                    x="550"
                    y="80"
                    width="120"
                    height="80"
                    rx="8"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <text
                    x="400"
                    y="320"
                    fill="#34d399"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    Efficient: ONLY the Billing service scales horizontally.
                    Auth and UI remain untouched.
                  </text>
                </g>
              )}
            </g>
          )}

          {architecture === "serverless" && (
            <g className="animate-fade-in">
              <text
                x="400"
                y="40"
                fill="#94a3b8"
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
              >
                Functions-as-a-Service (FaaS)
              </text>

              {/* Cloud Provider Boundary */}
              <rect
                x="150"
                y="80"
                width="500"
                height="240"
                rx="24"
                fill="#0f172a"
                stroke="#6366f1"
                strokeWidth="2"
                strokeDasharray="10 10"
              />
              <CloudLightning
                className="h-8 w-8 text-indigo-500"
                x="170"
                y="100"
              />
              <text
                x="220"
                y="125"
                fill="#818cf8"
                fontSize="14"
                fontWeight="bold"
              >
                Cloud Provider (AWS/GCP)
              </text>

              {!isSimulating ? (
                <text
                  x="400"
                  y="200"
                  fill="#64748b"
                  textAnchor="middle"
                  fontSize="14"
                  fontStyle="italic"
                >
                  Zero servers running. Zero cost.
                </text>
              ) : (
                <g>
                  {/* Event Trigger */}
                  <path
                    d="M 50 200 L 250 200"
                    stroke="#f43f5e"
                    strokeWidth="4"
                    className="animate-[dash_1s_linear_infinite]"
                    strokeDasharray="10 5"
                  />
                  <text
                    x="120"
                    y="180"
                    fill="#f43f5e"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    Billing Event
                  </text>

                  {/* Lambda Functions spinning up */}
                  <rect
                    x="280"
                    y="160"
                    width="100"
                    height="40"
                    rx="8"
                    fill="#4c1d95"
                    stroke="#a855f7"
                    strokeWidth="2"
                    className="animate-bounce"
                  />
                  <text
                    x="330"
                    y="185"
                    fill="#d8b4fe"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    Func (Billing)
                  </text>

                  <rect
                    x="420"
                    y="160"
                    width="100"
                    height="40"
                    rx="8"
                    fill="#4c1d95"
                    stroke="#a855f7"
                    strokeWidth="2"
                    className="animate-bounce"
                    style={{ animationDelay: "100ms" }}
                  />
                  <text
                    x="470"
                    y="185"
                    fill="#d8b4fe"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    Func (Billing)
                  </text>

                  <rect
                    x="560"
                    y="160"
                    width="100"
                    height="40"
                    rx="8"
                    fill="#4c1d95"
                    stroke="#a855f7"
                    strokeWidth="2"
                    className="animate-bounce"
                    style={{ animationDelay: "200ms" }}
                  />
                  <text
                    x="610"
                    y="185"
                    fill="#d8b4fe"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    Func (Billing)
                  </text>

                  <text
                    x="400"
                    y="280"
                    fill="#c084fc"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    Provider provisions exactly 3 functions for 3 events,
                    executes, then destroys them.
                  </text>
                </g>
              )}
            </g>
          )}
        </svg>

        <style
          dangerouslySetInnerHTML={{
            __html: `@keyframes dash { to { stroke-dashoffset: -30; } }`,
          }}
        />
      </div>
    </div>
  );
}
