"use client";

import Link from "next/link";
import RegressionVisualizer from "@/components/canvas/RegressionVisualizer";

export default function LinearRegressionPage() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden text-slate-200">
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 xl:grid-cols-2">
          <section className="flex flex-col rounded-xl border border-purple-900/30 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-sm">
            <div className="mb-2 text-sm font-bold tracking-widest text-purple-500 uppercase">
              AI Track • Level 2
            </div>
            <h1 className="mb-6 text-4xl font-extrabold text-slate-100">
              Linear Regression
            </h1>

            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                Linear regression is the simplest form of machine learning. It
                attempts to model the relationship between variables by fitting
                a linear equation to observed data.
              </p>

              <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                <h3 className="mb-2 font-bold text-slate-100">
                  The Equation:{" "}
                  <code className="text-cyan-400">y = mx + b</code>
                </h3>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <strong className="text-purple-400">Weight (m):</strong> The
                    slope of the line. It determines how heavily the input data
                    influences the prediction.
                  </li>
                  <li>
                    <strong className="text-purple-400">Bias (b):</strong> The
                    y-intercept. It allows the model to shift the line up or
                    down to better fit the data.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                <h3 className="mb-2 font-bold text-slate-100">
                  How it "Learns"
                </h3>
                <p className="text-sm">
                  The algorithm calculates the distance between the actual data
                  points and its predicted line. This distance is called the{" "}
                  <strong>Loss</strong> (or Mean Squared Error). During
                  training, the algorithm mathematically adjusts the Weight and
                  Bias to make this error as close to zero as possible.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/ai/linear-regression/quiz"
                className="inline-flex w-fit items-center rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all hover:bg-purple-500"
              >
                Take Assessment (+150 AI XP)
              </Link>
            </div>
          </section>

          <section className="relative flex min-h-[550px] items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-black shadow-2xl">
            <RegressionVisualizer />
          </section>
        </div>
      </main>
    </div>
  );
}
