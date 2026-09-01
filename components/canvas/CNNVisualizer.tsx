"use client";

import { useState } from "react";
import { MousePointer2 } from "lucide-react";

// Pre-defined 3x3 Kernels
const KERNELS = {
  edge: {
    name: "Edge Detection",
    matrix: [
      [-1, -1, -1],
      [-1, 8, -1],
      [-1, -1, -1],
    ],
  },
  sharpen: {
    name: "Sharpen",
    matrix: [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0],
    ],
  },
  blur: {
    name: "Box Blur",
    matrix: [
      [0.11, 0.11, 0.11],
      [0.11, 0.11, 0.11],
      [0.11, 0.11, 0.11],
    ],
  },
};

type KernelKey = keyof typeof KERNELS;

export default function CNNVisualizer() {
  const GRID_SIZE = 6;
  const KERNEL_SIZE = 3;
  const OUT_SIZE = GRID_SIZE - KERNEL_SIZE + 1; // 4x4 output (No Padding, Stride 1)

  // Initialize a 6x6 grid with a simple drawn shape (e.g., a diagonal line)
  const [grid, setGrid] = useState<number[][]>(() => {
    const initial = Array(GRID_SIZE)
      .fill(0)
      .map(() => Array(GRID_SIZE).fill(0));
    for (let i = 1; i < 5; i++) initial[i][i] = 1;
    initial[1][2] = 1;
    initial[2][3] = 1;
    initial[3][4] = 1;
    return initial;
  });

  const [activeKernel, setActiveKernel] = useState<KernelKey>("edge");
  const [hoverPos, setHoverPos] = useState<{ r: number; c: number } | null>(
    null,
  );

  const togglePixel = (r: number, c: number) => {
    const newGrid = [...grid.map((row) => [...row])];
    newGrid[r][c] = newGrid[r][c] === 1 ? 0 : 1;
    setGrid(newGrid);
  };

  const clearGrid = () => {
    setGrid(
      Array(GRID_SIZE)
        .fill(0)
        .map(() => Array(GRID_SIZE).fill(0)),
    );
  };

  const currentKernel = KERNELS[activeKernel].matrix;

  // Calculate the output Feature Map
  const featureMap = Array(OUT_SIZE)
    .fill(0)
    .map(() => Array(OUT_SIZE).fill(0));
  let minVal = Infinity;
  let maxVal = -Infinity;

  for (let r = 0; r < OUT_SIZE; r++) {
    for (let c = 0; c < OUT_SIZE; c++) {
      let sum = 0;
      for (let kr = 0; kr < KERNEL_SIZE; kr++) {
        for (let kc = 0; kc < KERNEL_SIZE; kc++) {
          sum += grid[r + kr][c + kc] * currentKernel[kr][kc];
        }
      }
      featureMap[r][c] = sum;
      if (sum < minVal) minVal = sum;
      if (sum > maxVal) maxVal = sum;
    }
  }

  // Normalize feature map for coloring
  const getOutputColor = (val: number) => {
    if (val === 0) return "#0f172a"; // slate-950
    const intensity = Math.max(
      0.2,
      Math.min(
        1,
        Math.abs(val) / Math.max(0.1, Math.abs(maxVal), Math.abs(minVal)),
      ),
    );
    return val > 0
      ? `rgba(16, 185, 129, ${intensity})`
      : `rgba(244, 63, 94, ${intensity})`;
  };

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200 lg:flex-row overflow-hidden">
      {/* Controls */}
      <div className="flex w-full flex-col gap-6 border-b border-slate-800 bg-slate-900/50 p-6 lg:w-72 lg:border-b-0 lg:border-r overflow-y-auto">
        <div>
          <h3 className="mb-4 text-sm font-bold tracking-wider text-purple-400 uppercase">
            CNN Filters
          </h3>
          <div className="flex flex-col gap-2">
            {(Object.keys(KERNELS) as KernelKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setActiveKernel(k)}
                className={`rounded-lg p-3 text-left transition-all ${activeKernel === k ? "border-purple-500 bg-purple-900/30 text-purple-300 border shadow-[0_0_15px_rgba(147,51,234,0.3)]" : "border border-slate-700 bg-slate-800 text-slate-400 hover:border-purple-500/50"}`}
              >
                <div className="font-bold">{KERNELS[k].name}</div>
                <div className="mt-2 grid grid-cols-3 gap-1 font-mono text-[10px]">
                  {KERNELS[k].matrix.map((row, i) =>
                    row.map((val, j) => (
                      <div
                        key={`${i}-${j}`}
                        className="flex items-center justify-center rounded bg-slate-950 py-1"
                      >
                        {val}
                      </div>
                    )),
                  )}
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={clearGrid}
            className="mt-4 w-full rounded border border-rose-900/50 bg-rose-950/30 py-2 text-xs font-bold text-rose-400 hover:bg-rose-900/50"
          >
            Clear Image
          </button>
        </div>
      </div>

      {/* Visualizer Canvas */}
      <div className="relative flex flex-1 flex-col items-center justify-center bg-black p-8">
        <div className="absolute top-6 flex items-center gap-2 font-mono text-xs text-slate-500">
          <MousePointer2 className="h-4 w-4" /> Click the input grid to draw
          features. Hover the output to see the sliding window.
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Input Image */}
          <div className="flex flex-col items-center">
            <h4 className="mb-4 font-mono text-sm text-cyan-400">
              Input Image (6x6)
            </h4>
            <div className="grid grid-cols-6 gap-1 p-2 border-2 border-slate-800 rounded-lg bg-slate-900">
              {grid.map((row, r) =>
                row.map((val, c) => {
                  const isHovered =
                    hoverPos &&
                    r >= hoverPos.r &&
                    r < hoverPos.r + KERNEL_SIZE &&
                    c >= hoverPos.c &&
                    c < hoverPos.c + KERNEL_SIZE;
                  return (
                    <div
                      key={`in-${r}-${c}`}
                      onClick={() => togglePixel(r, c)}
                      className={`h-8 w-8 lg:h-10 lg:w-10 cursor-pointer rounded transition-all flex items-center justify-center
                      ${val === 1 ? "bg-cyan-500" : "bg-slate-950"} 
                      ${isHovered ? "ring-2 ring-purple-500 ring-offset-1 ring-offset-slate-900" : ""}`}
                    >
                      {isHovered && val === 1 && (
                        <span className="text-[10px] text-slate-900 font-bold opacity-50">
                          X
                        </span>
                      )}
                    </div>
                  );
                }),
              )}
            </div>
          </div>

          <div className="text-2xl text-slate-600 font-black">⊗</div>

          {/* Output Feature Map */}
          <div className="flex flex-col items-center">
            <h4 className="mb-4 font-mono text-sm text-purple-400">
              Feature Map (4x4)
            </h4>
            <div className="grid grid-cols-4 gap-1 p-2 border-2 border-slate-800 rounded-lg bg-slate-900">
              {featureMap.map((row, r) =>
                row.map((val, c) => (
                  <div
                    key={`out-${r}-${c}`}
                    onMouseEnter={() => setHoverPos({ r, c })}
                    onMouseLeave={() => setHoverPos(null)}
                    className="flex h-12 w-12 lg:h-14 lg:w-14 cursor-crosshair items-center justify-center rounded text-xs font-mono font-bold transition-all"
                    style={{ backgroundColor: getOutputColor(val) }}
                  >
                    {val.toFixed(1)}
                  </div>
                )),
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-6 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-emerald-500" /> Positive
            Activation (Match)
          </span>
          <span className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-rose-500" /> Negative Activation
            (Inverse)
          </span>
        </div>
      </div>
    </div>
  );
}
