"use client";

import { useState, useEffect } from "react";
import {
  Server,
  Database,
  HardDrive,
  Share2,
  Zap,
  Activity,
  AlertTriangle,
} from "lucide-react";

type RequestPacket = {
  id: number;
  target: "cache" | "db" | "queue";
  status: "active" | "done";
};

export default function ArchitectureVisualizer() {
  const [hasLB, setHasLB] = useState(false);
  const [hasCache, setHasCache] = useState(false);
  const [hasQueue, setHasQueue] = useState(false);
  const [requests, setRequests] = useState<RequestPacket[]>([]);
  const [isOverloaded, setIsOverloaded] = useState(false);
  const [dbLoad, setDbLoad] = useState(0);

  // Auto-clear requests and manage load
  useEffect(() => {
    if (requests.length === 0) return;

    const timer = setTimeout(() => {
      setRequests((prev) => prev.slice(1));
      if (dbLoad > 0) setDbLoad((prev) => prev - 1);
    }, 800);

    return () => clearTimeout(timer);
  }, [requests, dbLoad]);

  useEffect(() => {
    if (dbLoad > 5 && !hasCache) {
      setIsOverloaded(true);
    } else {
      setIsOverloaded(false);
    }
  }, [dbLoad, hasCache]);

  const fireRequest = () => {
    const id = Date.now();
    let target: "cache" | "db" | "queue" = "db";

    if (hasCache && Math.random() > 0.3) target = "cache";
    else if (hasQueue && Math.random() > 0.7) target = "queue";

    if (target === "db") setDbLoad((prev) => prev + 2);

    setRequests((prev) => [...prev, { id, target, status: "active" }]);
  };

  const simulateTrafficSpike = () => {
    for (let i = 0; i < 8; i++) {
      setTimeout(fireRequest, i * 200);
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      {/* Control Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6 z-10">
        <div>
          <h3 className="mb-1 text-sm font-bold tracking-wider text-amber-500 uppercase">
            System Architecture
          </h3>
          <p className="text-xs text-slate-400">
            Scale the system to handle traffic spikes without the database
            crashing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setHasLB(!hasLB)}
            className={`flex items-center gap-2 rounded border px-3 py-1.5 text-xs font-bold transition-all ${hasLB ? "border-blue-500 bg-blue-950/40 text-blue-400" : "border-slate-700 bg-slate-800 text-slate-400"}`}
          >
            <Share2 className="h-4 w-4" /> Load Balancer
          </button>
          <button
            onClick={() => setHasCache(!hasCache)}
            className={`flex items-center gap-2 rounded border px-3 py-1.5 text-xs font-bold transition-all ${hasCache ? "border-emerald-500 bg-emerald-950/40 text-emerald-400" : "border-slate-700 bg-slate-800 text-slate-400"}`}
          >
            <Zap className="h-4 w-4" /> Redis Cache
          </button>
          <button
            onClick={() => setHasQueue(!hasQueue)}
            className={`flex items-center gap-2 rounded border px-3 py-1.5 text-xs font-bold transition-all ${hasQueue ? "border-purple-500 bg-purple-950/40 text-purple-400" : "border-slate-700 bg-slate-800 text-slate-400"}`}
          >
            <HardDrive className="h-4 w-4" /> Message Queue
          </button>

          <div className="w-px h-8 bg-slate-800 mx-2" />

          <button
            onClick={fireRequest}
            className="flex items-center gap-2 rounded bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-500 transition-all"
          >
            1x Request
          </button>
          <button
            onClick={simulateTrafficSpike}
            className="flex items-center gap-2 rounded bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500 transition-all shadow-[0_0_15px_rgba(225,29,72,0.3)]"
          >
            <Activity className="h-4 w-4" /> Traffic Spike
          </button>
        </div>
      </div>

      <div className="relative flex-1 bg-black p-8 flex items-center justify-center overflow-hidden">
        {isOverloaded && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full px-6 py-2 text-sm font-bold border border-rose-500 bg-rose-950/80 text-rose-400 shadow-xl animate-bounce z-20">
            <AlertTriangle className="h-5 w-5" /> Database Overloaded! Add a
            Cache.
          </div>
        )}

        <svg viewBox="0 0 800 400" className="w-full h-full max-h-[400px]">
          {/* Base Layout Lines */}
          <path
            d="M 100 200 L 250 200"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <path
            d="M 290 200 L 450 200"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <path
            d="M 490 200 L 650 200"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* CLIENT */}
          <g transform="translate(40, 160)">
            <rect
              x="0"
              y="0"
              width="80"
              height="80"
              rx="8"
              fill="#1e293b"
              stroke="#94a3b8"
              strokeWidth="2"
            />
            <text
              x="40"
              y="45"
              fill="#f8fafc"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
            >
              Clients
            </text>
          </g>

          {/* LOAD BALANCER */}
          <g
            transform="translate(250, 160)"
            className={`transition-opacity duration-500 ${hasLB ? "opacity-100" : "opacity-20"}`}
          >
            <rect
              x="0"
              y="0"
              width="40"
              height="80"
              rx="4"
              fill="#1e3a8a"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text
              x="20"
              y="45"
              fill="#93c5fd"
              textAnchor="middle"
              fontSize="10"
              transform="rotate(-90 20 45)"
              fontWeight="bold"
            >
              Load Balancer
            </text>
          </g>

          {/* API SERVERS */}
          <g transform="translate(410, 120)">
            <rect
              x="0"
              y="0"
              width="80"
              height="160"
              rx="8"
              fill="#1e293b"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <Server className="h-6 w-6 text-blue-400" x="28" y="20" />
            <Server className="h-6 w-6 text-blue-400" x="28" y="65" />
            <Server className="h-6 w-6 text-blue-400" x="28" y="110" />
            <text
              x="40"
              y="180"
              fill="#60a5fa"
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
            >
              App Servers
            </text>
          </g>

          {/* CACHE */}
          <g
            transform="translate(560, 60)"
            className={`transition-opacity duration-500 ${hasCache ? "opacity-100" : "opacity-20"}`}
          >
            <path
              d="M 450 160 L 560 100"
              stroke="#334155"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <rect
              x="0"
              y="0"
              width="80"
              height="60"
              rx="8"
              fill="#064e3b"
              stroke="#10b981"
              strokeWidth="2"
            />
            <text
              x="40"
              y="35"
              fill="#34d399"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
            >
              Redis
            </text>
          </g>

          {/* DATABASE */}
          <g transform="translate(650, 160)">
            <rect
              x="0"
              y="0"
              width="80"
              height="80"
              rx="8"
              fill={isOverloaded ? "#4c0519" : "#1e293b"}
              stroke={isOverloaded ? "#e11d48" : "#f59e0b"}
              strokeWidth="2"
              className="transition-colors duration-300"
            />
            <Database
              className={`h-8 w-8 ${isOverloaded ? "text-rose-500 animate-pulse" : "text-amber-400"}`}
              x="24"
              y="15"
            />
            <text
              x="40"
              y="65"
              fill={isOverloaded ? "#f43f5e" : "#fbbf24"}
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
            >
              PostgreSQL
            </text>
          </g>

          {/* MESSAGE QUEUE */}
          <g
            transform="translate(560, 280)"
            className={`transition-opacity duration-500 ${hasQueue ? "opacity-100" : "opacity-20"}`}
          >
            <path
              d="M 450 240 L 560 310"
              stroke="#334155"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <rect
              x="0"
              y="0"
              width="120"
              height="50"
              rx="8"
              fill="#4c1d95"
              stroke="#a855f7"
              strokeWidth="2"
            />
            <text
              x="60"
              y="30"
              fill="#c084fc"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
            >
              Kafka Queue
            </text>
          </g>

          {/* ANIMATED PACKETS */}
          {requests.map((req, i) => {
            const isCache = req.target === "cache";
            const isQueue = req.target === "queue";
            const color = isCache ? "#10b981" : isQueue ? "#a855f7" : "#fbbf24";

            // Animation path based on target
            const animationClass = isCache
              ? "animate-[slideCache_0.8s_ease-out_forwards]"
              : isQueue
                ? "animate-[slideQueue_0.8s_ease-out_forwards]"
                : "animate-[slideDb_0.8s_ease-out_forwards]";

            return (
              <circle
                key={req.id}
                cx="120"
                cy="200"
                r="6"
                fill={color}
                className={animationClass}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            );
          })}
        </svg>

        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes slideDb {
            0% { transform: translate(0,0); opacity: 1; }
            40% { transform: translate(300px, 0); }
            100% { transform: translate(530px, 0); opacity: 0; }
          }
          @keyframes slideCache {
            0% { transform: translate(0,0); opacity: 1; }
            40% { transform: translate(300px, 0); }
            100% { transform: translate(460px, -100px); opacity: 0; }
          }
          @keyframes slideQueue {
            0% { transform: translate(0,0); opacity: 1; }
            40% { transform: translate(300px, 0); }
            100% { transform: translate(460px, 100px); opacity: 0; }
          }
        `,
          }}
        />
      </div>
    </div>
  );
}
