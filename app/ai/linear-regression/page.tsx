"use client";

import Link from "next/link";
import RegressionVisualizer from "@/components/canvas/RegressionVisualizer";

export default function LinearRegressionPage() {
  return (
    <section className="flex h-full w-full overflow-hidden text-slate-200">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0 mb-6">
          <p className="text-purple-500 font-bold tracking-widest uppercase text-sm mb-1">
            AI Track • Level 2
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            Linear Regression
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
            <div>
              <p>
                Linear regression is the simplest form of machine learning. It
                attempts to model the relationship between variables by fitting
                a linear equation to observed data.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-slate-100">
                The Equation: <code className="text-cyan-400">y = mx + b</code>
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-xs">
                <li>
                  <strong className="text-purple-400">Weight (m):</strong> The
                  slope of the line. It determines how heavily the input data
                  influences the prediction.
                </li>
                <li>
                  <strong className="text-purple-400">Bias (b):</strong> The
                  y-intercept. It allows the model to shift the line up or down
                  to better fit the data.
                </li>
              </ul>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-slate-100">How it "Learns"</h3>
              <p className="text-xs">
                The algorithm calculates the distance between the actual data
                points and its predicted line. This distance is called the{" "}
                <strong>Loss</strong> (or Mean Squared Error). During training,
                the algorithm mathematically adjusts the Weight and Bias to make
                this error as close to zero as possible.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <RegressionVisualizer />
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            Interactive Gradient Descent
          </p>
          <Link
            href="/ai/linear-regression/quiz"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take Assessment (+150 AI XP)
          </Link>
        </div>
      </div>
    </section>
  );
}
