"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import {
  Brain,
  CheckCircle,
  XCircle,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

const QUESTIONS = [
  {
    question:
      "What exactly happens when a machine learning model 'overfits' the data?",
    options: [
      "It becomes too simple and fails to learn any patterns at all.",
      "It memorizes the training data, including random noise, causing it to fail on new, unseen data.",
      "It deletes old training data to make room for new data.",
      "It runs too quickly, skipping important calculations.",
    ],
    correct: 1,
  },
  {
    question:
      "If a model performs poorly on BOTH its training data AND the test data, what is it likely suffering from?",
    options: [
      "Overfitting (High Variance)",
      "Underfitting (High Bias)",
      "Optimal Fit",
      "Regularization",
    ],
    correct: 1,
  },
  {
    question:
      "Which of the following is a common Regularization technique used to prevent overfitting in neural networks?",
    options: [
      "Increasing the learning rate infinitely",
      "Using a smaller dataset",
      "Dropout (randomly turning off neurons during training)",
      "Removing the activation functions entirely",
    ],
    correct: 2,
  },
];

export default function OverfittingQuiz() {
  const router = useRouter();
  const { completeModule, completedModules } = useStore();
  const moduleId = "overfitting";
  const isAlreadyCompleted = completedModules?.includes(moduleId) ?? false;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQ = QUESTIONS[currentIndex];
  const passingScore = 2;

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    if (selected === currentQ.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentIndex + 1 < QUESTIONS.length) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      setFinished(true);
      const finalScore = score + (selected === currentQ.correct ? 1 : 0);
      if (finalScore >= passingScore && !isAlreadyCompleted) {
        completeModule(moduleId, 200, "ai");
      }
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setSelected(null);
    setSubmitted(false);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-slate-200">
      <div className="w-full max-w-2xl rounded-2xl border border-purple-900/50 bg-slate-900 p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-purple-400" />
            <h1 className="text-xl font-bold text-slate-100">
              Overfitting & Regularization Exam
            </h1>
          </div>
          {!finished && (
            <span className="font-mono text-xs text-slate-400">
              Q {currentIndex + 1} / {QUESTIONS.length}
            </span>
          )}
        </div>

        {finished ? (
          <div className="flex flex-col items-center py-6 text-center">
            {score >= passingScore ? (
              <>
                <CheckCircle className="mb-4 h-16 w-16 text-emerald-500" />
                <h2 className="text-2xl font-bold text-slate-100">
                  Exam Passed!
                </h2>
                <p className="mt-2 text-slate-400">
                  Score: {score}/{QUESTIONS.length}
                </p>
                {isAlreadyCompleted ? (
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    XP already claimed previously.
                  </p>
                ) : (
                  <p className="mt-2 font-bold text-purple-400">
                    +200 AI XP Earned!
                  </p>
                )}
              </>
            ) : (
              <>
                <XCircle className="mb-4 h-16 w-16 text-rose-500" />
                <h2 className="text-2xl font-bold text-slate-100">
                  Exam Failed
                </h2>
                <p className="mt-2 text-slate-400">
                  Score: {score}/{QUESTIONS.length}. You need {passingScore} to
                  pass.
                </p>
              </>
            )}
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleRetake}
                className="flex items-center gap-2 rounded-lg bg-slate-800 px-6 py-2 font-semibold text-slate-200 hover:bg-slate-700"
              >
                <RotateCcw className="h-4 w-4" /> Retake
              </button>
              <button
                onClick={() => router.push("/ai")}
                className="rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white hover:bg-purple-500"
              >
                Back to Track
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="mb-6 text-lg font-medium text-slate-300">
              {currentQ.question}
            </p>
            <div className="flex flex-col gap-3 mb-6">
              {currentQ.options.map((opt, i) => {
                let style =
                  "border-slate-700 bg-slate-800 hover:border-purple-500";
                if (submitted) {
                  if (i === currentQ.correct)
                    style =
                      "border-emerald-500 bg-emerald-500/20 text-emerald-300";
                  else if (selected === i)
                    style = "border-rose-500 bg-rose-500/20 text-rose-300";
                  else style = "opacity-50 border-slate-800 bg-slate-900";
                } else if (selected === i) {
                  style = "border-purple-500 bg-purple-900/30 text-purple-300";
                }
                return (
                  <button
                    key={i}
                    disabled={submitted}
                    onClick={() => setSelected(i)}
                    className={`w-full rounded-xl border p-4 text-left font-medium transition-all ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
              {submitted ? (
                <span
                  className={`font-bold ${selected === currentQ.correct ? "text-emerald-400" : "text-rose-400"}`}
                >
                  {selected === currentQ.correct ? "Correct!" : "Incorrect."}
                </span>
              ) : (
                <span />
              )}
              {!submitted ? (
                <button
                  disabled={selected === null}
                  onClick={handleSubmit}
                  className="rounded-lg bg-cyan-600 px-8 py-3 font-bold text-white hover:bg-cyan-500 disabled:opacity-50"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 rounded-lg bg-purple-600 px-8 py-3 font-bold text-white hover:bg-purple-500"
                >
                  {currentIndex + 1 === QUESTIONS.length ? "Finish" : "Next"}{" "}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
