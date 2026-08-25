"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "../../../store/useStore"; // Adjust path to store

const QUIZ_QUESTIONS = [
  {
    question:
      "Why do computers use Base-2 (Binary) instead of Base-10 (Decimal)?",
    options: [
      "Because Base-2 is easier for humans to read.",
      "Because computer hardware is built on electrical switches that only have two states: On (1) and Off (0).",
      "Because Base-2 takes up less space on a hard drive.",
      "Because Base-10 cannot represent negative numbers.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "If you have the binary number 00001101 (Decimal 13) and you apply a Bitwise Shift Left (<< 1), what happens to the decimal value?",
    options: [
      "It is divided by 2 (becomes 6)",
      "It remains the same",
      "It is multiplied by 2 (becomes 26)",
      "It is converted to a string",
    ],
    correctAnswer: 2,
  },
  {
    question: "What does a Bitwise Shift Right (>> 1) do to an integer?",
    options: [
      "Multiplies it by 10",
      "Divides it by 2 (and truncates decimals)",
      "Deletes the number from RAM",
      "Adds 1 to the total",
    ],
    correctAnswer: 1,
  },
];

export default function BinaryQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const completeModule = useStore((state) => state.completeModule);

  const checkAnswer = () => {
    if (selectedOption === null) return;
    if (selectedOption === QUIZ_QUESTIONS[currentQuestion].correctAnswer)
      setScore(score + 1);
    setIsAnswerChecked(true);
  };

 const nextQuestion = () => {
   if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
     setCurrentQuestion(currentQuestion + 1);
     setSelectedOption(null);
     setIsAnswerChecked(false);
   } else {
     setIsQuizFinished(true);
     // Changed from 50 to 0 XP to protect your level logic!
     if (score >= 2) completeModule("binary", 0);
   }
 };

  if (isQuizFinished) {
    const passed = score >= 2;
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 p-6 animate-fade-in">
        <div className="bg-slate-900 border border-slate-800 p-10 rounded-2xl max-w-md w-full text-center shadow-2xl animate-slide-up">
          <h2 className="text-3xl font-bold text-white mb-4">Exam Complete!</h2>
          <p className="text-6xl mb-6">{passed ? "🎉" : "❌"}</p>
          <p className="text-xl text-slate-300 mb-2">
            You scored:{" "}
            <span className="font-bold text-white">
              {score} / {QUIZ_QUESTIONS.length}
            </span>
          </p>
          {passed ? (
            <p className="text-green-400 font-bold mb-8">+50 XP Awarded!</p>
          ) : (
            <p className="text-red-400 font-bold mb-8">
              You need at least 2 correct to pass.
            </p>
          )}

          <div className="flex flex-col gap-3">
            {passed && (
              <Link
                href="/pointers"
                className="block w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold transition"
              >
                Next Module (Pointers) →
              </Link>
            )}
            <Link
              href="/"
              className="block w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold transition border border-slate-700"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[currentQuestion];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 p-6 animate-fade-in">
      <div className="max-w-2xl w-full animate-slide-up">
        <div className="mb-8 flex justify-between items-end">
          <p className="text-blue-500 font-bold tracking-widest uppercase text-sm">
            Tier 1 • Binary Exam
          </p>
          <p className="text-slate-500 font-medium">
            Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl mb-6">
          <h2 className="text-2xl font-bold text-white mb-8">{q.question}</h2>
          <div className="space-y-3">
            {q.options.map((option, index) => {
              let btnClass =
                "w-full text-left p-4 rounded-lg border transition font-medium ";
              if (!isAnswerChecked)
                btnClass +=
                  selectedOption === index
                    ? "border-blue-500 bg-blue-500/10 text-white"
                    : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500 hover:bg-slate-700";
              else if (index === q.correctAnswer)
                btnClass += "border-green-500 bg-green-500/20 text-green-400";
              else if (index === selectedOption)
                btnClass += "border-red-500 bg-red-500/20 text-red-400";
              else
                btnClass +=
                  "border-slate-800 bg-slate-900 text-slate-600 opacity-50";
              return (
                <button
                  key={index}
                  onClick={() => !isAnswerChecked && setSelectedOption(index)}
                  className={btnClass}
                  disabled={isAnswerChecked}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex justify-end">
          {!isAnswerChecked ? (
            <button
              onClick={checkAnswer}
              disabled={selectedOption === null}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold disabled:bg-slate-800 transition"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-8 py-3 bg-white hover:bg-slate-200 text-slate-900 rounded font-bold transition"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
