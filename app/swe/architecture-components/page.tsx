"use client";

import { useState } from "react";
import Link from "next/link";
import ArchitectureVisualizer from "@/components/canvas/ArchitectureVisualizer";

export default function ArchitectureComponentsPage() {
  const [activeTab, setActiveTab] = useState<"theory" | "definitions">(
    "theory",
  );

  return (
    <section className="flex h-full w-full overflow-hidden">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0">
          <p className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-1">
            SWE Track • Module 7
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Architecture Components
          </h2>

          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 mb-6">
            <button
              onClick={() => setActiveTab("theory")}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "theory" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              System Scale
            </button>
            <button
              onClick={() => setActiveTab("definitions")}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "definitions" ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              Core Components
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          {activeTab === "theory" && (
            <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
              <div>
                <p>
                  As applications grow from 10 users to 1,000,000 users, a
                  simple backend server and database will collapse under the
                  load. We scale systems by introducing specialized architecture
                  components to distribute traffic and decouple heavy tasks.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-amber-400 font-bold mb-2 text-sm">
                  Horizontal vs Vertical Scaling
                </h4>
                <ul className="space-y-2 list-disc pl-4 text-xs text-slate-400">
                  <li>
                    <strong className="text-white">
                      Vertical Scaling (Scale Up):
                    </strong>{" "}
                    Upgrading your existing server with more RAM/CPU. Has a hard
                    hardware limit.
                  </li>
                  <li>
                    <strong className="text-white">
                      Horizontal Scaling (Scale Out):
                    </strong>{" "}
                    Adding *more* servers to a pool. Requires a Load Balancer,
                    but scales infinitely.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "definitions" && (
            <div className="space-y-4 animate-fade-in text-sm text-slate-300">
              <div className="border-l-2 border-blue-500 pl-3">
                <h4 className="font-bold text-blue-400">1. Load Balancer</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Sits in front of your App Servers. It distributes incoming
                  client requests across multiple servers evenly so no single
                  server gets overwhelmed.
                </p>
              </div>

              <div className="border-l-2 border-emerald-500 pl-3">
                <h4 className="font-bold text-emerald-400">
                  2. Cache (e.g., Redis)
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Databases are slow because they read from disk. A Cache stores
                  frequent database queries in ultra-fast RAM. If data is in the
                  cache (Cache Hit), the database is spared the load.
                </p>
              </div>

              <div className="border-l-2 border-purple-500 pl-3">
                <h4 className="font-bold text-purple-400">
                  3. Message Queue (Kafka/RabbitMQ)
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Handles slow, asynchronous tasks (like sending emails or
                  processing video). Instead of forcing the user to wait, the
                  server drops a message in the queue and immediately returns a
                  success response.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <ArchitectureVisualizer />
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            System Traffic Simulator
          </p>
          <Link
            href="/swe/architecture-components/quiz"
            className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take the Exam →
          </Link>
        </div>
      </div>
    </section>
  );
}
