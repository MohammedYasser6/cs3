import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "In a neural network, what mathematical operation physically rotates, scales, or shears input data vectors?",
    options: [
      "Scalar Addition",
      "Matrix Multiplication",
      "Boolean Logic",
      "String Concatenation",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "How is a standard grayscale image typically represented when fed into an AI model?",
    options: [
      "As a 0D Scalar",
      "As a 1D String",
      "As a 2D Matrix of pixel intensities",
      "As a SQL table",
    ],
    correctAnswer: 2,
  },
  {
    question: "What is a Tensor?",
    options: [
      "A hardware cooling fan",
      "An N-dimensional mathematical array of numbers",
      "A web framework",
      "A string formatting tool",
    ],
    correctAnswer: 1,
  },
];

export default function VectorsQuiz() {
  return (
    <QuizEngine
      title="Level 1 • Vectors Exam"
      moduleId="vectors-and-matrices"
      track="ai"
      xpReward={150}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/ai"
      nextModulePath="/ai/linear-regression"
    />
  );
}
