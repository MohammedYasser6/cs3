"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import MatrixVisualizer from "../../components/canvas/MatrixVisualizer";
import CodeViewer from "../../components/ui/CodeViewer";

const MATRIX_CODE = {
  "C++": `// Declare a 3x4 Matrix (3 Rows, 4 Columns)\nint matrix[3][4] = {\n    {10, 24, 32, 45},\n    {11, 29, 39, 41},\n    {15, 27, 34, 48}\n};\n\n// Nested Loops for Traversal (Row-Major Order)\nfor (int r = 0; r < 3; r++) {\n    for (int c = 0; c < 4; c++) {\n        int current = matrix[r][c];\n    }\n}`,
  Java: `// Declare a 3x4 Matrix\nint[][] matrix = {\n    {10, 24, 32, 45},\n    {11, 29, 39, 41},\n    {15, 27, 34, 48}\n};\n\n// Nested Loops for Traversal\nfor (int r = 0; r < matrix.length; r++) {\n    for (int c = 0; c < matrix[r].length; c++) {\n        int current = matrix[r][c];\n    }\n}`,
  Kotlin: `// Declare a 3x4 Matrix\nval matrix = arrayOf(\n    intArrayOf(10, 24, 32, 45),\n    intArrayOf(11, 29, 39, 41),\n    intArrayOf(15, 27, 34, 48)\n)\n\n// Nested Loops for Traversal\nfor (r in matrix.indices) {\n    for (c in matrix[r].indices) {\n        val current = matrix[r][c]\n    }\n}`,
  Python: `# Declare a 3x4 Matrix (List of Lists)\nmatrix = [\n    [10, 24, 32, 45],\n    [11, 29, 39, 41],\n    [15, 27, 34, 48]\n]\n\n# Nested Loops for Traversal\nfor r in range(len(matrix)):\n    for c in range(len(matrix[r])):\n        current = matrix[r][c]`,
};

// Fixed 3x4 grid for hydration safety
const INITIAL_MATRIX = [
  [10, 24, 32, 45],
  [11, 29, 39, 41],
  [15, 27, 34, 48],
];

export default function TwoDArraysPage() {
  const [matrix, setMatrix] = useState<number[][]>(INITIAL_MATRIX);
  const [activeCell, setActiveCell] = useState<[number, number] | null>(null);
  const [isTraversing, setIsTraversing] = useState(false);
  const [actionLog, setActionLog] = useState<string>(
    "3x4 Matrix loaded in memory.",
  );
  const [activeTab, setActiveTab] = useState<"theory" | "code">("theory");

  // State Machine for the nested loop
  const [r, setR] = useState(0);
  const [c, setC] = useState(0);

  const startTraversal = () => {
    setIsTraversing(true);
    setR(0);
    setC(0);
    setActiveCell([0, 0]);
    setActionLog(
      `Starting Nested Loop.\nReading Row 0, Column 0: matrix[0][0] = ${matrix[0][0]}`,
    );
  };

  const nextStep = () => {
    let nextC = c + 1;
    let nextR = r;

    // If we hit the end of the column, wrap to the next row
    if (nextC >= matrix[0].length) {
      nextC = 0;
      nextR = r + 1;
    }

    // If we hit the end of the rows, the traversal is complete
    if (nextR >= matrix.length) {
      setIsTraversing(false);
      setActiveCell(null);
      setActionLog(
        `Traversal Complete! Read all ${matrix.length * matrix[0].length} elements.`,
      );
      return;
    }

    setR(nextR);
    setC(nextC);
    setActiveCell([nextR, nextC]);
    setActionLog(
      `Reading Row ${nextR}, Column ${nextC}:\nmatrix[${nextR}][${nextC}] = ${matrix[nextR][nextC]}`,
    );
  };

  const randomizeMatrix = () => {
    const newMat = Array(3)
      .fill(0)
      .map(() =>
        Array(4)
          .fill(0)
          .map(() => Math.floor(Math.random() * 90) + 10),
      );
    setMatrix(newMat);
    setActiveCell(null);
    setIsTraversing(false);
    setActionLog("New matrix generated.");
  };

  return (
    <section className="flex h-full w-full overflow-hidden">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0">
          <p className="text-pink-500 font-bold tracking-widest uppercase text-sm mb-1">
            Tier 1 • Module 4
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            2D Arrays
          </h2>

          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 mb-6">
            <button
              onClick={() => setActiveTab("theory")}
              className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${activeTab === "theory" ? "bg-slate-800 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
            >
              Theory
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${activeTab === "code" ? "bg-pink-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
            >
              Implementation
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0 flex flex-col">
          {activeTab === "theory" ? (
            <>
              <div className="space-y-6 flex-1 animate-fade-in">
                <div>
                  <h3 className="text-white font-bold mb-2 text-lg">
                    Arrays of Arrays:
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    A 2D array is just a standard array where every element is
                    *another* array. They are perfect for rendering grids, game
                    boards (like Chess), or pixels on a screen.
                  </p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                  <h4 className="text-pink-400 font-bold mb-2 text-sm">
                    Key Concepts:
                  </h4>
                  <ul className="text-slate-300 text-sm space-y-2 list-disc pl-4">
                    <li>
                      <strong>[Row][Col]:</strong> You always access the
                      vertical row first (Y-axis), then the horizontal column
                      (X-axis).
                    </li>
                    <li>
                      <strong>Nested Loops:</strong> To read every item, you
                      need an outer loop for the rows, and an inner loop for the
                      columns.
                    </li>
                    <li>
                      <strong>Row-Major Order:</strong> In RAM, a 2D array is
                      actually flattened into a single 1D line. The computer
                      reads row by row.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 bg-slate-950 border border-pink-500/30 p-4 rounded-lg shadow-[0_0_15px_rgba(236,72,153,0.1)]">
                <p className="text-xs text-pink-500 font-bold uppercase tracking-widest mb-2">
                  Loop Execution Log
                </p>
                <pre className="text-sm text-white font-mono leading-relaxed whitespace-pre-wrap">
                  {actionLog}
                </pre>
              </div>
            </>
          ) : (
            <CodeViewer
              snippets={MATRIX_CODE}
              explanation="Notice how a nested loop works: The inner loop (c) must completely finish counting from 0 to 3 before the outer loop (r) increments by 1."
            />
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={1.2} />
              <MatrixVisualizer matrix={matrix} activeCell={activeCell} />
              <OrbitControls enableDamping minDistance={3} maxDistance={20} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8">
          <div className="flex gap-4">
            {!isTraversing ? (
              <button
                onClick={startTraversal}
                className="px-6 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded font-medium transition active:scale-95 shadow-md"
              >
                Start Nested Loop
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition active:scale-95 shadow-md"
              >
                Next Step →
              </button>
            )}
            <button
              onClick={randomizeMatrix}
              disabled={isTraversing}
              className="px-6 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded font-medium transition active:scale-95 disabled:opacity-50"
            >
              New Matrix
            </button>
          </div>
          <Link
            href="/2d-arrays/quiz"
            className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition"
          >
            Take the Exam →
          </Link>
        </div>
      </div>
    </section>
  );
}
