import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question: "In the equation y = mx + b, what does the weight (m) represent?",
    options: [
      "The y-intercept",
      "The slope or steepness of the best-fit line",
      "The error rate",
      "The learning rate",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is the primary purpose of the bias term (b)?",
    options: [
      "To shift the line up or down the y-axis to better fit data",
      "To randomly scramble inputs",
      "To increase computational speed",
      "To convert numbers to text",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "What metric is typically minimized during linear regression training?",
    options: [
      "Matrix Dimensions",
      "Screen Resolution",
      "Mean Squared Error (Loss)",
      "Data File Size",
    ],
    correctAnswer: 2,
  },
];

export default function LinearRegressionQuiz() {
  return (
    <QuizEngine
      title="Level 2 • Linear Regression Exam"
      moduleId="linear-regression"
      track="ai"
      xpReward={250}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/ai"
      nextModulePath="/ai/overfitting"
    />
  );
}
