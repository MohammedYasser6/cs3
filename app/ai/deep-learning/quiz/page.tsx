import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "Why are activation functions (like Sigmoid or ReLU) required in hidden layers?",
    options: [
      "To speed up training time",
      "To allow the network to learn non-linear patterns",
      "To prevent the GPU from overheating",
      "To convert data into SQL tables",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is Backpropagation?",
    options: [
      "The process of moving data backwards to calculate error gradients and update weights",
      "The forward pass of input data",
      "A type of activation function",
      "Deleting old training data",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "If a neural network has an input layer, two hidden layers, and an output layer, how many layers deep is it considered?",
    options: [
      "1 layer",
      "2 layers",
      "3 layers (Input isn't counted in depth)",
      "4 layers",
    ],
    correctAnswer: 2,
  },
];

export default function DeepLearningQuiz() {
  return (
    <QuizEngine
      title="Level 5 • Deep Learning Exam"
      moduleId="deep-learning"
      track="ai"
      xpReward={400}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/ai"
      nextModulePath="/ai/computer-vision"
    />
  );
}
