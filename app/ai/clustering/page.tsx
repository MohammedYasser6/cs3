"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Play, RotateCcw, MousePointer2 } from "lucide-react";

type Point = { id: number; x: number; y: number; cluster: number };
type Centroid = { id: number; x: number; y: number; color: string };

const CLUSTER_COLORS = ["#e11d48", "#0ea5e9", "#a855f7", "#10b981", "#f59e0b"];

function KMeansVisualizer() {
  const [points, setPoints] = useState<Point[]>([]);
  const [centroids, setCentroids] = useState<Centroid[]>([]);
  const [k, setK] = useState(3);
  const [step, setStep] = useState(0); // 0 = Assign, 1 = Move
  const [inertia, setInertia] = useState<number>(0);
  const svgRef = useRef<SVGSVGElement>(null);

  // Initialize random centroids based on K
  const initCentroids = () => {
    const newCentroids: Centroid[] = [];
    for (let i = 0; i < k; i++) {
      newCentroids.push({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        color: CLUSTER_COLORS[i % CLUSTER_COLORS.length],
      });
    }
    setCentroids(newCentroids);
    setPoints(points.map((p) => ({ ...p, cluster: -1 })));
    setStep(0);
    setInertia(0);
  };

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPoints([...points, { id: Date.now(), x, y, cluster: -1 }]);
  };

  const calculateInertia = (
    currentPoints: Point[],
    currentCentroids: Centroid[],
  ) => {
    let totalInertia = 0;
    currentPoints.forEach((p) => {
      if (p.cluster !== -1) {
        const c = currentCentroids.find((cent) => cent.id === p.cluster);
        if (c) {
          totalInertia += Math.pow(c.x - p.x, 2) + Math.pow(c.y - p.y, 2);
        }
      }
    });
    setInertia(totalInertia);
  };

  const stepAlgorithm = () => {
    if (centroids.length === 0) initCentroids();

    if (step === 0) {
      // Step 1: Assign points to nearest centroid
      const newPoints = points.map((p) => {
        let minDist = Infinity;
        let closestCluster = -1;
        centroids.forEach((c) => {
          const dist = Math.sqrt(
            Math.pow(c.x - p.x, 2) + Math.pow(c.y - p.y, 2),
          );
          if (dist < minDist) {
            minDist = dist;
            closestCluster = c.id;
          }
        });
        return { ...p, cluster: closestCluster };
      });
      setPoints(newPoints);
      calculateInertia(newPoints, centroids);
      setStep(1);
    } else {
      // Step 2: Move centroids to average position of assigned points
      const newCentroids = centroids.map((c) => {
        const assigned = points.filter((p) => p.cluster === c.id);
        if (assigned.length === 0) return c;
        const avgX =
          assigned.reduce((sum, p) => sum + p.x, 0) / assigned.length;
        const avgY =
          assigned.reduce((sum, p) => sum + p.y, 0) / assigned.length;
        return { ...c, x: avgX, y: avgY };
      });
      setCentroids(newCentroids);
      calculateInertia(points, newCentroids);
      setStep(0);
    }
  };

  const clearCanvas = () => {
    setPoints([]);
    setCentroids([]);
    setInertia(0);
    setStep(0);
  };

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200 lg:flex-row overflow-hidden rounded-xl">
      {/* Control Panel */}
      <div className="flex w-full flex-col gap-6 border-b border-slate-800 bg-slate-900/50 p-6 lg:w-72 lg:border-b-0 lg:border-r overflow-y-auto">
        <div>
          <h3 className="mb-4 text-sm font-bold tracking-wider text-purple-400 uppercase">
            Algorithm Setup
          </h3>

          <div className="space-y-4">
            <div>
              <div className="mb-2 flex justify-between font-mono text-xs">
                <span>Clusters (K)</span>
                <span className="text-cyan-400 font-bold">{k}</span>
              </div>
              <input
                type="range"
                min="2"
                max="5"
                step="1"
                value={k}
                onChange={(e) => {
                  setK(parseInt(e.target.value));
                  setCentroids([]);
                }}
                className="w-full accent-cyan-500"
              />
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={stepAlgorithm}
                disabled={points.length === 0}
                className="flex items-center justify-center gap-2 rounded bg-purple-600 py-2.5 text-sm font-bold text-white shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:bg-purple-500 disabled:opacity-50"
              >
                <Play className="h-4 w-4" />
                {centroids.length === 0
                  ? "Start K-Means"
                  : step === 0
                    ? "1. Assign Points"
                    : "2. Update Centroids"}
              </button>

              <div className="flex gap-2">
                <button
                  onClick={initCentroids}
                  disabled={points.length === 0}
                  className="flex-1 rounded border border-slate-700 bg-slate-800 py-2 text-xs font-bold hover:bg-slate-700 disabled:opacity-50"
                >
                  Reseed
                </button>
                <button
                  onClick={clearCanvas}
                  className="flex flex-1 items-center justify-center gap-1 rounded border border-rose-900/50 bg-rose-950/30 py-2 text-xs font-bold text-rose-400 hover:bg-rose-900/50"
                >
                  <RotateCcw className="h-3 w-3" /> Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-800" />

        <div>
          <h3 className="mb-2 text-sm font-bold tracking-wider text-purple-400 uppercase">
            Live Metrics
          </h3>
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono">
            <div className="text-xs text-slate-500">Inertia (Loss)</div>
            <div className="text-2xl font-black text-emerald-400">
              {inertia === 0 ? "---" : inertia.toFixed(0)}
            </div>
            <p className="mt-2 text-[10px] text-slate-500 leading-tight">
              Sum of squared distances from points to their assigned cluster
              centers. Lower is better.
            </p>
          </div>
        </div>
      </div>

      {/* SVG Canvas Workspace */}
      <div className="relative flex-1 bg-black p-4 flex items-center justify-center min-h-[500px]">
        {points.length === 0 && (
          <div className="absolute flex flex-col items-center text-slate-500 pointer-events-none gap-2">
            <MousePointer2 className="h-8 w-8 animate-bounce text-cyan-500/50" />
            <p className="font-mono text-sm text-center">
              Click anywhere on the canvas to drop data points
            </p>
          </div>
        )}

        <svg
          ref={svgRef}
          onClick={handleCanvasClick}
          viewBox="0 0 100 100"
          className="h-full max-h-[500px] w-full max-w-[500px] cursor-crosshair rounded-xl border border-slate-800 bg-slate-900/30 shadow-2xl overflow-visible"
        >
          {/* Distance Lines */}
          {points.map((p) => {
            if (p.cluster === -1) return null;
            const target = centroids.find((c) => c.id === p.cluster);
            if (!target) return null;
            return (
              <line
                key={`line-${p.id}`}
                x1={p.x}
                y1={p.y}
                x2={target.x}
                y2={target.y}
                stroke={target.color}
                strokeWidth="0.2"
                strokeOpacity="0.5"
                className="transition-all duration-300"
              />
            );
          })}

          {/* Data Points */}
          {points.map((p) => {
            const color =
              p.cluster === -1
                ? "#64748b"
                : centroids.find((c) => c.id === p.cluster)?.color;
            return (
              <circle
                key={`pt-${p.id}`}
                cx={p.x}
                cy={p.y}
                r="1.5"
                fill={color}
                className="transition-colors duration-300"
              />
            );
          })}

          {/* Centroids */}
          {centroids.map((c) => (
            <g
              key={`cent-${c.id}`}
              className="transition-all duration-700 ease-in-out"
              style={{ transform: `translate(${c.x}px, ${c.y}px)` }}
            >
              <rect
                x="-3"
                y="-3"
                width="6"
                height="6"
                fill="transparent"
                stroke={c.color}
                strokeWidth="1"
                className="animate-spin-slow"
              />
              <rect x="-1.5" y="-1.5" width="3" height="3" fill={c.color} />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export default function ClusteringPage() {
  return (
    <div className="flex h-full w-full flex-col overflow-x-hidden text-slate-200">
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        
        {/* NEW LAYOUT: Pure Vertical Stack (flex-col). No side-by-side columns. */}
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          
          {/* TOP: Theory Section (Takes full width of the max-w-6xl container) */}
          <section className="flex w-full flex-col rounded-xl border border-purple-900/30 bg-slate-900/50 p-6 md:p-8 shadow-2xl backdrop-blur-sm">
            <div className="mb-2 text-sm font-bold tracking-widest text-purple-500 uppercase">
              AI Track • Level 5
            </div>
            <h1 className="mb-6 text-3xl font-extrabold text-slate-100 md:text-4xl">
              Unsupervised Clustering
            </h1>

            <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
              <p>
                Everything we have learned so far has been{" "}
                <strong>Supervised Learning</strong>—where we know the correct
                answer (labels) and teach the model to predict it by adjusting
                weights to minimize error.
              </p>
              <p>
                In <strong>Unsupervised Learning</strong>, the data has no
                labels. We feed raw data into an algorithm and ask it to find
                hidden structures, categories, or anomalies entirely on its own.
              </p>

              <div className="rounded-lg border border-slate-800 bg-slate-950 p-5">
                <h3 className="mb-2 font-bold text-slate-100">
                  The K-Means Algorithm
                </h3>
                <p className="mb-3 text-xs text-slate-400">
                  K-Means mathematically groups data into 'K' distinct clusters
                  through a repetitive, two-step process:
                </p>
                <ul className="list-decimal space-y-2 pl-5 text-purple-200 text-xs">
                  <li>
                    <strong>Initialize:</strong> Drop <em>K</em> number of
                    "Centroids" (anchors) onto the dataset.
                  </li>
                  <li>
                    <strong>Assign:</strong> Measure the distance from every
                    data point to every centroid. Assign each point to its
                    closest centroid.
                  </li>
                  <li>
                    <strong>Update:</strong> Calculate the exact physical center
                    (mean) of all points belonging to a cluster, and move the
                    centroid to that location.
                  </li>
                  <li>
                    Repeat the Assign and Update steps until the centroids stop
                    moving (Convergence).
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex justify-start">
              <Link
                href="/ai/clustering/quiz"
                className="inline-flex w-fit items-center justify-center rounded-lg bg-purple-600 px-8 py-3 font-semibold text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:bg-purple-500 transition-all"
              >
                Take Assessment (+200 AI XP)
              </Link>
            </div>
          </section>

          {/* BOTTOM: Visualizer Section (Full width, massive interactive area) */}
          <section className="relative flex min-h-[650px] w-full flex-col overflow-hidden rounded-xl border border-slate-800 bg-black shadow-2xl">
            <KMeansVisualizer />
          </section>
          
        </div>
      </main>
    </div>
  );
}