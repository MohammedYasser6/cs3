import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question: "In the equation y = mx + b, what does the Weight (m) represent?",
    options: [
      "The y-intercept.",
      "The slope, determining how heavily the input influences the output.",
      "The error rate.",
      "The learning rate.",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is the 'Loss' (or Error) in Machine Learning?",
    options: [
      "The time it takes to compile.",
      "The physical size of the dataset.",
      "The distance between the actual data points and the model's predicted line.",
      "A memory leak.",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "During training, what exactly is the algorithm adjusting to minimize the Loss?",
    options: [
      "The input data itself.",
      "The Weights and Biases.",
      "The amount of RAM.",
      "The user's database.",
    ],
    correctAnswer: 1,
  },
];

export default function LinearRegressionQuiz() {
  return (
    <QuizEngine
      title="Level 2 • Regression Exam"
      moduleId="linear-regression"
      track="ai"
      xpReward={150}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/ai"
      nextModulePath="/ai/deep-learning"
    />
  );
}
