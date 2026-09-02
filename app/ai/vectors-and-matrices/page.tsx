"use client";

import { useState } from "react";
import Link from "next/link";
import VectorsVisualizer from "@/components/canvas/VectorSpaceVisualizer"; // Ensure you have this component!
import CodeViewer from "@/components/ui/CodeViewer";

const TENSOR_CODE = {
  Python: `import numpy as np

# 1D Vector (e.g., a single image's RGB values flattened)
inputs = np.array([1.5, 2.0, 3.1])

# 2D Matrix (Neural Network Weights)
weights = np.array([
    [0.2, 0.8, -0.5],
    [0.1, -0.9, 1.0]
])

# Matrix Multiplication (Dot Product)
# Transforms a 3D input vector into a 2D output vector
output = np.dot(weights, inputs)

print(output) # Output shape: (2,)`,
  "C++": `#include <iostream>
#include <vector>

// Without external libraries like Eigen or PyTorch's LibTorch,
// C++ requires manual iteration for Tensor operations.
std::vector<double> dotProduct(const std::vector<std::vector<double>>& W, const std::vector<double>& X) {
    std::vector<double> out(W.size(), 0.0);
    for(size_t i = 0; i < W.size(); i++) {
        for(size_t j = 0; j < X.size(); j++) {
            out[i] += W[i][j] * X[j];
        }
    }
    return out;
}`,
  Java: `public class TensorMath {
    // Java typically relies on libraries like ND4J for AI,
    // but the raw math looks like this:
    public static double[] dot(double[][] w, double[] x) {
        double[] out = new double[w.length];
        
        for(int i = 0; i < w.length; i++) {
            for(int j = 0; j < x.length; j++) {
                out[i] += w[i][j] * x[j];
            }
        }
        return out;
    }
}`,
  Kotlin: `// Kotlin raw array implementation
fun dotProduct(w: Array<DoubleArray>, x: DoubleArray): DoubleArray {
    val out = DoubleArray(w.size)
    
    for (i in w.indices) {
        for (j in x.indices) {
            out[i] += w[i][j] * x[j]
        }
    }
    return out
}`,
};

export default function VectorsAndMatricesPage() {
  const [activeTab, setActiveTab] = useState<"theory" | "code" | "math">(
    "theory",
  );

  return (
    <section className="flex h-full w-full overflow-hidden text-slate-200">
      {/* LEFT COLUMN: Docked Sidebar */}
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0 mb-6">
          <p className="text-purple-500 font-bold tracking-widest uppercase text-sm mb-1">
            AI Track • Level 1
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Vectors & Matrices
          </h2>

          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab("theory")}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "theory" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              Theory
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "code" ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              Code
            </button>
            <button
              onClick={() => setActiveTab("math")}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "math" ? "bg-purple-600 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              Math
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          {activeTab === "theory" && (
            <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
              <div>
                <p>
                  To a computer, a picture of a cat isn't a picture. It's a
                  massive grid of numbers representing pixel intensities.
                  Machine learning is fundamentally the science of manipulating
                  these massive grids, known as{" "}
                  <strong className="text-purple-400">Tensors</strong>.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-purple-400 font-bold mb-2 text-sm">
                  The Dimensions of Data
                </h4>
                <ul className="space-y-2 list-none text-xs text-slate-400">
                  <li>
                    <strong className="text-white block">0D: Scalar</strong> A
                    single number (e.g., `42`).
                  </li>
                  <li>
                    <strong className="text-white block">1D: Vector</strong> A
                    list of numbers (e.g., `[1.5, 3.2]`). Represents a point in
                    space.
                  </li>
                  <li>
                    <strong className="text-white block">2D: Matrix</strong> A
                    grid of numbers (rows and columns). Used for images or
                    datasets.
                  </li>
                  <li>
                    <strong className="text-white block">3D+: Tensor</strong>{" "}
                    Stacks of matrices. Used for video or complex neural network
                    weights.
                  </li>
                </ul>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-purple-400 font-bold mb-2 text-sm">
                  Matrix Multiplication
                </h4>
                <p className="text-xs text-slate-400">
                  The absolute core of AI. When a neural network processes data,
                  it multiplies an Input Vector by a Weight Matrix. Physically,
                  this operation{" "}
                  <strong className="text-cyan-400">
                    rotates, scales, and shears
                  </strong>{" "}
                  the data point in N-dimensional space to find patterns.
                </p>
              </div>
            </div>
          )}

          {activeTab === "code" && (
            <div className="animate-fade-in">
              <CodeViewer
                snippets={TENSOR_CODE}
                explanation="Python's NumPy library handles matrix math at the C/Fortran hardware level, making it millions of times faster than looping through arrays in pure Java or standard C++."
              />
            </div>
          )}

          {activeTab === "math" && (
            <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex flex-col items-center">
                <h4 className="text-purple-400 font-bold mb-4 text-sm self-start">
                  The Dot Product
                </h4>
                <div className="text-center font-mono bg-slate-900 border border-slate-700 p-4 rounded text-xs w-full overflow-x-auto">
                  [ a, b ] • [ c, d ] = (a × c) + (b × d)
                </div>
                <p className="text-xs text-slate-400 mt-4 self-start">
                  The dot product multiplies matching elements across two
                  sequences and sums them up. It tells the AI how "similar" two
                  vectors are.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex flex-col items-center">
                <h4 className="text-purple-400 font-bold mb-4 text-sm self-start">
                  Neural Network Equation
                </h4>
                <div className="text-center font-mono bg-slate-900 border border-slate-700 p-4 rounded text-xs w-full overflow-x-auto text-cyan-400">
                  y = Wx + b
                </div>
                <p className="text-xs text-slate-400 mt-4 self-start">
                  <strong className="text-white">W</strong> = Weight Matrix
                  <br />
                  <strong className="text-white">x</strong> = Input Vector
                  <br />
                  <strong className="text-white">b</strong> = Bias Vector
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Full Viewport Visualizer */}
      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          {/* Ensure you have a VectorsVisualizer component created, otherwise this will throw an import error */}
          <VectorsVisualizer />
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            Interactive Vector Transformations
          </p>
          <Link
            href="/ai/vectors-and-matrices/quiz"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take Assessment (+150 AI XP)
          </Link>
        </div>
      </div>
    </section>
  );
}
