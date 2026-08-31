"use client";

import { useState, useRef, useEffect } from "react";

export default function VectorSpaceVisualizer() {
  const [vector, setVector] = useState({ x: 3, y: 4 });
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // A simple transformation matrix (e.g., a shear transformation)
  // [ 1   0.5 ]
  // [ 0   1   ]
  const matrix = [
    [1, 0.5],
    [0, 1],
  ];

  const transformedVector = {
    x: matrix[0][0] * vector.x + matrix[0][1] * vector.y,
    y: matrix[1][0] * vector.x + matrix[1][1] * vector.y,
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    // Map pixel coordinates to our 20x20 SVG coordinate system (-10 to 10)
    const x = ((e.clientX - rect.left) / rect.width) * 20 - 10;
    const y = -(((e.clientY - rect.top) / rect.height) * 20 - 10);

    setVector({
      x: Math.max(-10, Math.min(10, x)),
      y: Math.max(-10, Math.min(10, y)),
    });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-950 p-6 text-slate-200">
      <div className="mb-4 flex gap-8 font-mono text-sm">
        <div className="flex flex-col items-center rounded-lg border border-cyan-800 bg-slate-900 p-3">
          <span className="mb-2 text-cyan-400">Input Vector [x, y]</span>
          <span>
            [{vector.x.toFixed(1)}, {vector.y.toFixed(1)}]
          </span>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-purple-800 bg-slate-900 p-3">
          <span className="mb-2 text-purple-400">Transformed Output</span>
          <span>
            [{transformedVector.x.toFixed(1)}, {transformedVector.y.toFixed(1)}]
          </span>
        </div>
      </div>

      <svg
        ref={svgRef}
        viewBox="-10 -10 20 20"
        className="h-full max-h-[350px] w-full cursor-crosshair rounded-xl border border-slate-700 bg-slate-900 shadow-2xl touch-none"
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        onPointerLeave={() => setIsDragging(false)}
        onPointerMove={handlePointerMove}
      >
        {/* Grid Lines */}
        {Array.from({ length: 21 }).map((_, i) => (
          <g key={i}>
            <line
              x1={-10}
              y1={i - 10}
              x2={10}
              y2={i - 10}
              stroke="#334155"
              strokeWidth="0.05"
            />
            <line
              x1={i - 10}
              y1={-10}
              x2={i - 10}
              y2={10}
              stroke="#334155"
              strokeWidth="0.05"
            />
          </g>
        ))}
        {/* Axes */}
        <line
          x1={-10}
          y1={0}
          x2={10}
          y2={0}
          stroke="#64748b"
          strokeWidth="0.1"
        />
        <line
          x1={0}
          y1={-10}
          x2={0}
          y2={10}
          stroke="#64748b"
          strokeWidth="0.1"
        />

        {/* Original Vector */}
        <line
          x1={0}
          y1={0}
          x2={vector.x}
          y2={-vector.y}
          stroke="#22d3ee"
          strokeWidth="0.3"
          markerEnd="url(#arrow-cyan)"
        />

        {/* Transformed Vector */}
        <line
          x1={0}
          y1={0}
          x2={transformedVector.x}
          y2={-transformedVector.y}
          stroke="#c084fc"
          strokeWidth="0.3"
          markerEnd="url(#arrow-purple)"
          strokeDasharray="0.5 0.5"
        />

        <defs>
          <marker
            id="arrow-cyan"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
          </marker>
          <marker
            id="arrow-purple"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#c084fc" />
          </marker>
        </defs>

        {/* Draggable Handle */}
        <circle
          cx={vector.x}
          cy={-vector.y}
          r="0.8"
          fill="transparent"
          stroke="#22d3ee"
          strokeWidth="0.1"
          className="hover:fill-cyan-500/20"
        />
      </svg>
      <p className="mt-4 text-xs text-slate-500">
        Drag the cyan handle to alter the input vector.
      </p>
    </div>
  );
}
