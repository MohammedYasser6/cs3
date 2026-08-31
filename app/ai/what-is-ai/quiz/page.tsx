"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { Brain, CheckCircle, XCircle } from "lucide-react";

export default function WhatIsAIQuiz() {
  const router = useRouter();
  const { completeModule, completedModules } = useStore();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const moduleId = "what-is-ai";
  const isAlreadyCompleted = completedModules?.includes(moduleId);

  // The conceptual quiz question
  const question =
    "In the Machine Learning paradigm, what do you provide to the algorithm so it can generate the rules?";
  const options = [
    "Explicit code and if/else statements",
    "Data and the desired Answers",
    "A pre-compiled database schema",
    "Only raw Data without any labels",
  ];

  const correctAnswerIndex = 1; // "Data and the desired Answers"

  const handleSubmit = () => {
    setIsSubmitted(true);

    if (selectedAnswer === correctAnswerIndex && !isAlreadyCompleted) {
      // Award 100 XP specifically to the AI track
      completeModule(moduleId, 100, "ai");

      // Redirect back to the AI dashboard after a short delay
      setTimeout(() => {
        router.push("/ai");
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-slate-200">
      <div className="w-full max-w-2xl rounded-2xl border border-purple-900/50 bg-slate-900 p-8 shadow-2xl">
        <div className="mb-6 flex items-center gap-3 border-b border-slate-800 pb-4">
          <Brain className="h-6 w-6 text-purple-400" />
          <h1 className="text-xl font-bold text-slate-100">
            Assessment: The Learning Paradigm
          </h1>
        </div>

        {isAlreadyCompleted ? (
          <div className="flex flex-col items-center py-8 text-center">
            <CheckCircle className="mb-4 h-16 w-16 text-emerald-500" />
            <h2 className="text-2xl font-bold text-slate-100">
              Module Completed
            </h2>
            <p className="mt-2 text-slate-400">
              You have already earned the XP for this module.
            </p>
            <button
              onClick={() => router.push("/ai")}
              className="mt-6 rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-purple-500"
            >
              Return to AI Track
            </button>
          </div>
        ) : (
          <>
            <p className="mb-8 text-lg font-medium text-slate-300">
              {question}
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                let btnStyle =
                  "border-slate-700 bg-slate-800 hover:border-purple-500 hover:bg-slate-800/80";

                if (isSubmitted) {
                  if (index === correctAnswerIndex)
                    btnStyle =
                      "border-emerald-500 bg-emerald-500/20 text-emerald-300";
                  else if (isSelected)
                    btnStyle = "border-rose-500 bg-rose-500/20 text-rose-300";
                  else btnStyle = "border-slate-800 bg-slate-900 opacity-50";
                } else if (isSelected) {
                  btnStyle =
                    "border-purple-500 bg-purple-900/30 text-purple-300 shadow-[0_0_15px_rgba(147,51,234,0.3)]";
                }

                return (
                  <button
                    key={index}
                    disabled={isSubmitted}
                    onClick={() => setSelectedAnswer(index)}
                    className={`w-full rounded-xl border p-4 text-left font-medium transition-all ${btnStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-slate-800 pt-6">
              {isSubmitted && selectedAnswer === correctAnswerIndex && (
                <span className="flex items-center gap-2 font-bold text-emerald-400 animate-pulse">
                  <CheckCircle className="h-5 w-5" /> +100 AI XP Earned!
                  Redirecting...
                </span>
              )}
              {isSubmitted && selectedAnswer !== correctAnswerIndex && (
                <span className="flex items-center gap-2 font-bold text-rose-400">
                  <XCircle className="h-5 w-5" /> Incorrect. Try again.
                </span>
              )}

              <button
                disabled={
                  selectedAnswer === null ||
                  (isSubmitted && selectedAnswer === correctAnswerIndex)
                }
                onClick={
                  isSubmitted ? () => setIsSubmitted(false) : handleSubmit
                }
                className="ml-auto rounded-lg bg-cyan-600 px-8 py-3 font-bold text-white transition-colors hover:bg-cyan-500 disabled:opacity-50"
              >
                {isSubmitted ? "Retry" : "Submit"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
