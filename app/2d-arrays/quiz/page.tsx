import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "When accessing an element in a standard 2D Array like matrix[2][3], what do the numbers represent?",
    options: [
      "Column 2, Row 3",
      "Row 2, Column 3",
      "X-coordinate 2, Y-coordinate 3",
      "Depth 2, Width 3",
    ],
    correctAnswer: 1,
  },
  {
    question: "How is a 2D Array actually stored in physical RAM?",
    options: [
      "As a literal grid inside the memory chips",
      "As multiple separate arrays linked by pointers",
      "It is flattened into a single, contiguous 1D line of memory (Row-Major order)",
      "It is stored in the CPU cache",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "To traverse every element in a 2D array, you typically use nested loops. How do they execute?",
    options: [
      "They run at the exact same time simultaneously",
      "The inner loop (columns) completes entirely before the outer loop (rows) increments by 1",
      "The outer loop completes entirely before the inner loop starts",
      "They alternate checking rows and columns randomly",
    ],
    correctAnswer: 1,
  },
];

export default function TwoDArraysQuizPage() {
  return (
    <QuizEngine
      title="Tier 1 • 2D Arrays Exam"
      moduleId="2d-arrays"
      track="cs"
      xpReward={50}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cs" // Goes to CS Dashboard
      nextModulePath="/linked-lists" // Root level Next Module
    />
  );
}
