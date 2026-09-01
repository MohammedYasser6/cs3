import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "What is the defining physical characteristic of an Array in computer memory?",
    options: [
      "The elements are scattered randomly across the RAM.",
      "The elements are stored in contiguous (side-by-side) memory addresses.",
      "It can only store strings.",
      "It automatically encrypts its data.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Why are array indices strictly 'zero-based' (starting at 0) in languages like C++ and Java?",
    options: [
      "Because zero is the first number in mathematics.",
      "Because the index represents the mathematical offset (distance) from the memory address of the very first element.",
      "To confuse new programmers.",
      "Because keyboards start with 0.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "What is the time complexity of instantly accessing an array element if you already know its index (e.g., myArray[4])?",
    options: [
      "O(1) - Constant Time",
      "O(N) - Linear Time",
      "O(log N) - Logarithmic",
      "O(N^2) - Quadratic",
    ],
    correctAnswer: 0,
  },
];

export default function ArraysQuizPage() {
  return (
    <QuizEngine
      title="Tier 1 • Arrays Exam"
      moduleId="arrays"
      track="cs"
      xpReward={50}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cs"
      nextModulePath="/2d-arrays"
    />
  );
}
