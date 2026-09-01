import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question: "What is the absolute most critical component every recursive function MUST have to prevent crashing your program?",
    options: [
      "A 'while' loop",
      "A Base Case (an exit condition)",
      "Global variables",
      "A return value of 0"
    ],
    correctAnswer: 1,
  },
  {
    question: "When a recursive function calls itself infinitely, what specific error does it cause?",
    options: ["Null Pointer Exception", "Stack Overflow Error", "Segmentation Fault", "Index Out Of Bounds"],
    correctAnswer: 1,
  },
  {
    question: "Which sorting algorithm embodies the 'Divide and Conquer' recursive strategy by partitioning an array around a 'pivot'?",
    options: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"],
    correctAnswer: 2,
  },
];

export default function AlgoRecursionQuizPage() {
  return (
    <QuizEngine
      title="Tier 4 • Algorithms & Recursion Exam"
      moduleId="algorithms-and-recursion"
      track="cs"
      xpReward={200}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cs"
      nextModulePath="/sorting"
    />
  );
}