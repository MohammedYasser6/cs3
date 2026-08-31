"use client";

import Link from "next/link";
import VectorSpaceVisualizer from "@/components/canvas/VectorSpaceVisualizer";

export default function VectorsAndMatricesPage() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden text-slate-200">
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-8 xl:grid-cols-2">
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
                  Data Representation
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-cyan-400">Scalars (0D):</strong> A
                    single number (e.g.,{" "}
                    <code className="bg-slate-800 px-1 rounded">25</code>{" "}
                    representing age).
                  </li>
                  <li>
                    <strong className="text-cyan-400">Vectors (1D):</strong> A
                    list of numbers. In Natural Language Processing, the word
                    &quot;King&quot; might be represented as an embedding
                    vector:{" "}
                    <code className="bg-slate-800 px-1 rounded">
                      [0.9, -0.2, 0.4]
                    </code>
                    .
                  </li>
                  <li>
                    <strong className="text-cyan-400">Matrices (2D):</strong> A
                    grid of numbers. A 28x28 pixel grayscale image is fed into a
                    neural network as a 2D matrix of pixel intensities ranging
                    from 0 to 255.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-slate-950 p-4 border border-slate-800">
                <h3 className="font-bold text-slate-100 mb-2">
                  Transformations (The &quot;Learning&quot;)
                </h3>
                <p className="text-sm mb-2">
                  When data passes through a neural network layer, the input
                  vector is multiplied by a{" "}
                  <strong className="text-purple-400">Weight Matrix</strong>.
                  Matrix multiplication physically rotates, scales, or shears
                  the data in mathematical space to find boundaries between
                  different categories (like separating images of cats from
                  dogs).
                </p>
                <p className="text-sm border-l-2 border-purple-500 pl-3 italic">
                  &quot;Training an AI&quot; is simply the process of slowly
                  adjusting the numbers inside these matrices until they
                  transform the input data into the correct output answers.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/ai/vectors-and-matrices/quiz"
                className="inline-flex w-fit items-center rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-all hover:bg-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.3)]"
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
