"use client";

import { useState } from "react";
import Link from "next/link";
import MicroservicesVisualizer from "@/components/canvas/MicroservicesVisualizer";

export default function MicroservicesPage() {
  const [activeTab, setActiveTab] = useState<"monolith" | "serverless">(
    "monolith",
  );

  return (
    <section className="flex h-full w-full overflow-hidden">
      {/* LEFT COLUMN: Docked Theory Sidebar */}
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0">
          <p className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-1">
            SWE Track • Module 8
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Deployment Architectures
          </h2>

          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 mb-6">
            <button
              onClick={() => setActiveTab("monolith")}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "monolith" ? "bg-amber-600 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              Monolith vs Microservices
            </button>
            <button
              onClick={() => setActiveTab("serverless")}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "serverless" ? "bg-purple-600 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              Serverless
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          {activeTab === "monolith" ? (
            <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-amber-400 font-bold mb-2 text-sm">
                  Monolithic Architecture
                </h4>
                <p className="text-xs text-slate-400">
                  The entire application is built as a single, unified unit. All
                  components (UI, business logic, and database access) share the
                  same codebase and resource pool.
                  <br />
                  <br />
                  <strong className="text-rose-400">Drawback:</strong> If the
                  billing module gets heavy traffic, you must clone the entire
                  massive application across multiple servers to handle it.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-blue-400 font-bold mb-2 text-sm">
                  Microservices Architecture
                </h4>
                <p className="text-xs text-slate-400">
                  The application is broken down into a collection of small,
                  independent services. Each service runs its own process,
                  manages its own database, and communicates over a network
                  (usually via HTTP/REST or message queues).
                  <br />
                  <br />
                  <strong className="text-emerald-400">Advantage:</strong> Teams
                  can develop, deploy, and scale the `Billing` service
                  completely independently of the `Auth` service.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
              <div>
                <p>
                  While Microservices require you to provision and manage
                  servers (or Docker containers) that run 24/7 waiting for
                  traffic,{" "}
                  <strong className="text-purple-400">Serverless</strong>{" "}
                  changes the billing and execution model entirely.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-purple-400 font-bold mb-2 text-sm">
                  Serverless (FaaS)
                </h4>
                <p className="text-xs text-slate-400">
                  Code only runs when triggered by an event (like an HTTP
                  request or a file upload). The cloud provider (AWS Lambda,
                  Google Cloud Functions) automatically provisions the
                  underlying infrastructure instantly.
                  <br />
                  <br />
                  <strong className="text-emerald-400">The Magic:</strong> If
                  nobody uses your app today, you pay $0. You only pay for the
                  exact milliseconds your code executes.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Full Viewport Visualizer */}
      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <MicroservicesVisualizer />
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            Infrastructure Scaling Simulator
          </p>
          <Link
            href="/swe/microservices/quiz"
            className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take the Exam →
          </Link>
        </div>
      </div>
    </section>
  );
}
