"use client";

import { useState, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

export default function RegressionVisualizer() {
  const [points, setPoints] = useState<Point[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  // Calculate Best Fit Line (Least Squares Method)
  let m = 0; // slope (Weight)
  let b = 50; // intercept (Bias) - default center

  if (points.length > 1) {
    let sumX = 0,
      sumY = 0,
      sumXY = 0,
      sumXX = 0;
    const n = points.length;

    points.forEach((p) => {
      sumX += p.x;
      sumY += p.y;
      sumXY += p.x * p.y;
      sumXX += p.x * p.x;
    });

    const denominator = n * sumXX - sumX * sumX;
    if (denominator !== 0) {
      m = (n * sumXY - sumX * sumY) / denominator;
      b = (sumY - m * sumX) / n;
    }
  }

  const handleSVGClick = (e: React.MouseEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPoints([...points, { x, y }]);
  };

  const getLineCoordinates = () => {
    const y1 = m * 0 + b;
    const y2 = m * 100 + b;
    return { y1, y2 };
  };

  const { y1, y2 } = getLineCoordinates();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-950 p-6">
      <div className="mb-4 flex w-full justify-between px-4 font-mono text-sm">
        <div className="text-cyan-400">Data Points: {points.length}</div>
        <div className="text-purple-400">
          Weight (m): {m.toFixed(2)} | Bias (b): {(100 - b).toFixed(2)}
        </div>
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        onClick={handleSVGClick}
        className="h-full max-h-[400px] w-full cursor-crosshair rounded-xl border border-slate-700 bg-slate-900 shadow-2xl"
      >
        {/* Grid Background */}
        {Array.from({ length: 10 }).map((_, i) => (
          <g key={i}>
            <line
              x1={0}
              y1={i * 10}
              x2={100}
              y2={i * 10}
              stroke="#334155"
              strokeWidth="0.5"
            />
            <line
              x1={i * 10}
              y1={0}
              x2={i * 10}
              y2={100}
              stroke="#334155"
              strokeWidth="0.5"
            />
          </g>
        ))}

        {/* Best Fit Line */}
        {points.length > 1 && (
          <line
            x1={0}
            y1={y1}
            x2={100}
            y2={y2}
            stroke="#c084fc"
            strokeWidth="1.5"
            className="transition-all duration-300 ease-out"
          />
        )}

        {/* Data Points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="2"
            fill="#22d3ee"
            className="animate-in zoom-in"
          />
        ))}
      </svg>
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => setPoints([])}
          className="rounded border border-slate-700 px-3 py-1 text-xs text-slate-400 hover:bg-slate-800"
        >
          Clear Data
        </button>
        <span className="text-xs text-slate-500 mt-1">
          Click anywhere on the grid to plot data.
        </span>
      </div>
    </div>
  );
}
