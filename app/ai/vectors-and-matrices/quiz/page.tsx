"use client";

import { useState, useRef } from "react";
import Link from "next/link";

function VectorSpaceVisualizer() {
  const [vector, setVector] = useState({ x: 3, y: 4 });
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

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
        <line
          x1={0}
          y1={0}
          x2={vector.x}
          y2={-vector.y}
          stroke="#22d3ee"
          strokeWidth="0.3"
          markerEnd="url(#arrow-cyan)"
        />
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

export default function VectorsAndMatricesPage() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden text-slate-200">
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 xl:grid-cols-2">
          <section className="flex flex-col rounded-xl border border-purple-900/30 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-sm">
            <div className="mb-2 text-sm font-bold tracking-widest text-purple-500 uppercase">
              AI Track • Level 1
            </div>
            <h1 className="mb-6 text-4xl font-extrabold text-slate-100">
              The Language of AI
            </h1>
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                Machine learning models do not understand text, images, or
                audio. They exclusively understand arrays of numbers, known as{" "}
                <strong className="text-purple-400">Tensors</strong>.
              </p>
              <div className="rounded-lg bg-slate-950 p-4 border border-slate-800">
                <h3 className="font-bold text-slate-100 mb-2">
                  Transformations
                </h3>
                <p className="text-sm border-l-2 border-purple-500 pl-3 italic">
                  &quot;Training an AI&quot; is simply the process of slowly
                  adjusting the numbers inside matrices until they transform the
                  input data into the correct output answers.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <Link
                href="/ai/vectors-and-matrices/quiz"
                className="inline-flex w-fit items-center rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:bg-purple-500"
              >
                Take Assessment (+150 AI XP)
              </Link>
            </div>
          </section>
          <section className="relative flex min-h-[550px] items-center justify-center rounded-xl border border-slate-800 bg-black overflow-hidden shadow-2xl">
            <VectorSpaceVisualizer />
          </section>
        </div>
      </main>
    </div>
  );
}
