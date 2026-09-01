import QuizEngine from "@/components/quiz/QuizEngine";

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
    correctAnswer: 1,
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
    correctAnswer: 1,
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
    correctAnswer: 2,
  },
];

export default function OverfittingQuiz() {
  return (
    <QuizEngine
      title="Level 3 • Overfitting & Regularization Exam"
      moduleId="overfitting"
      track="ai"
      xpReward={200}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/ai"
      nextModulePath="/ai/clustering"
    />
  );
}
