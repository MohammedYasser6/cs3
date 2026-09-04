"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore, Track } from "@/store/useStore";
import confetti from "canvas-confetti";
import {
  Brain,
  Code2,
  Shield,
  Component,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizEngineProps {
  title: string;
  moduleId: string;
  track: Track;
  xpReward: number;
  passingScore: number;
  questions: QuizQuestion[];
  returnPath: string;
  nextModulePath?: string;
}

export default function QuizEngine({
  title,
  moduleId,
  track,
  xpReward,
  passingScore,
  questions,
  returnPath,
  nextModulePath,
}: QuizEngineProps) {
  const router = useRouter();
  const { completeModule, completedModules } = useStore();
  const isAlreadyCompleted = completedModules?.includes(moduleId) ?? false;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isShake, setIsShake] = useState(false);

  // 1. Audio Cache: Reuses single audio instances to prevent memory leaks
  const soundsRef = useRef<{ [key: string]: HTMLAudioElement }>({});

  useEffect(() => {
    soundsRef.current = {
      click: new Audio("/sounds/click.mp3"),
      correct: new Audio("/sounds/correct.mp3"),
      wrong: new Audio("/sounds/wrong.mp3"),
    };

    // Cleanup confetti canvas if user navigates away
    return () => {
      confetti.reset();
    };
  }, []);

  const playSound = (type: "click" | "correct" | "wrong") => {
    const audio = soundsRef.current[type];
    if (audio) {
      audio.currentTime = 0; // Rewind to start immediately
      audio.volume = type === "correct" ? 0.6 : 0.4;
      audio.play().catch(() => {});
    }
  };

  // Dynamic Theme Mapping
  const theme = {
    cs: {
      color: "blue",
      text: "text-blue-400",
      bg: "bg-blue-600",
      hover: "hover:bg-blue-500",
      border: "border-blue-500",
      Icon: Code2,
      confetti: ["#3b82f6", "#06b6d4"],
    },
    ai: {
      color: "purple",
      text: "text-purple-400",
      bg: "bg-purple-600",
      hover: "hover:bg-purple-500",
      border: "border-purple-500",
      Icon: Brain,
      confetti: ["#a855f7", "#c084fc"],
    },
    cyber: {
      color: "emerald",
      text: "text-emerald-400",
      bg: "bg-emerald-600",
      hover: "hover:bg-emerald-500",
      border: "border-emerald-500",
      Icon: Shield,
      confetti: ["#10b981", "#34d399"],
    },
    swe: {
      color: "amber",
      text: "text-amber-500",
      bg: "bg-amber-600",
      hover: "hover:bg-amber-500",
      border: "border-amber-500",
      Icon: Component,
      confetti: ["#f59e0b", "#fbbf24"],
    },
  }[track];

  const Icon = theme.Icon;
  const currentQ = questions[currentIndex];

  // 2. High-performance Confetti (50 particles, 80 ticks = ~1 second burst, then auto-cleans)
  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      ticks: 80, // Ends physics loop 60% faster
      origin: { y: 0.7 },
      colors: theme.confetti,
      disableForReducedMotion: true,
    });
  };

  const checkAnswer = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQ.correctAnswer;

    if (isCorrect) {
      setScore((s) => s + 1);
      playSound("correct");
    } else {
      playSound("wrong");
      setIsShake(true);
      setTimeout(() => setIsShake(false), 400);
    }

    setIsAnswerChecked(true);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsFinished(true);
      const finalScore =
        score + (selectedOption === currentQ.correctAnswer ? 1 : 0);

      if (finalScore >= passingScore) {
        triggerConfetti();
        if (!isAlreadyCompleted) {
          completeModule(moduleId, xpReward, track);
        }
      }
    }
  };

  const handleRetake = () => {
    confetti.reset();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const passed = score >= passingScore;
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-slate-200">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center shadow-2xl">
          <h2 className="mb-4 text-3xl font-bold text-white">Exam Complete!</h2>
          <p className="mb-6 text-6xl">{passed ? "🎉" : "❌"}</p>
          <p className="mb-2 text-xl text-slate-300">
            You scored:{" "}
            <span className="font-bold text-white">
              {score} / {questions.length}
            </span>
          </p>

          {passed ? (
            isAlreadyCompleted ? (
              <p className="mb-8 font-semibold text-slate-500">
                XP already claimed previously.
              </p>
            ) : (
              <p
                className={`mb-8 font-bold ${theme.text} text-xl animate-bounce`}
              >
                +{xpReward} {track.toUpperCase()} XP Awarded!
              </p>
            )
          ) : (
            <p className="mb-8 font-bold text-rose-400">
              You need {passingScore} correct to pass.
            </p>
          )}

          <div className="flex flex-col gap-3">
            {!passed && (
              <button
                onClick={handleRetake}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 py-3 font-bold text-white transition hover:bg-slate-700"
              >
                <RotateCcw className="h-4 w-4" /> Retake Exam
              </button>
            )}
            {passed && nextModulePath && (
              <Link
                href={nextModulePath}
                className={`block w-full rounded-lg py-3 font-bold text-white transition ${theme.bg} ${theme.hover} shadow-lg`}
              >
                Next Module →
              </Link>
            )}
            <Link
              href={returnPath}
              className="block w-full rounded-lg border border-slate-700 bg-slate-800 py-3 font-bold text-white transition hover:bg-slate-700"
            >
              Return to Track Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-slate-200">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex items-end justify-between">
          <div className="flex items-center gap-3">
            <Icon className={`h-6 w-6 ${theme.text}`} />
            <h1 className="text-xl font-bold text-slate-100">{title}</h1>
          </div>
          <p className="font-mono text-sm font-medium text-slate-500">
            Q {currentIndex + 1} / {questions.length}
          </p>
        </div>

        <div
          className={`mb-6 rounded-2xl border p-8 transition-all duration-300 ${
            isShake
              ? "animate-shake border-rose-500 bg-rose-950/20 shadow-[0_0_30px_rgba(244,63,94,0.2)]"
              : "border-slate-800 bg-slate-900 shadow-xl"
          }`}
        >
          <h2 className="mb-8 text-xl font-bold text-white leading-relaxed">
            {currentQ.question}
          </h2>
          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = index === currentQ.correctAnswer;

              let btnClass =
                "w-full text-left p-4 rounded-xl border-2 transition-all font-medium ";

              if (!isAnswerChecked) {
                btnClass += isSelected
                  ? `${theme.border} bg-${theme.color}-500/10 text-white`
                  : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500 hover:bg-slate-700";
              } else {
                if (isCorrect)
                  btnClass +=
                    "border-emerald-500 bg-emerald-500/10 text-emerald-400";
                else if (isSelected)
                  btnClass += "border-rose-500 bg-rose-500/10 text-rose-400";
                else
                  btnClass +=
                    "border-slate-800 bg-slate-900 text-slate-600 opacity-50";
              }

              return (
                <button
                  key={index}
                  disabled={isAnswerChecked}
                  onClick={() => {
                    setSelectedOption(index);
                    playSound("click");
                  }}
                  className={btnClass}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 pt-6">
          {isAnswerChecked ? (
            <span
              className={`font-bold ${
                selectedOption === currentQ.correctAnswer
                  ? "text-emerald-400"
                  : "text-rose-400"
              }`}
            >
              {selectedOption === currentQ.correctAnswer
                ? "Correct!"
                : "Incorrect."}
            </span>
          ) : (
            <span />
          )}

          {!isAnswerChecked ? (
            <button
              onClick={checkAnswer}
              disabled={selectedOption === null}
              className="rounded-lg bg-slate-200 px-8 py-3 font-bold text-slate-900 transition hover:bg-white disabled:opacity-50"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className={`flex items-center gap-2 rounded-lg px-8 py-3 font-bold text-white transition ${theme.bg} ${theme.hover}`}
            >
              {currentIndex === questions.length - 1
                ? "Finish Exam"
                : "Next Question"}{" "}
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
