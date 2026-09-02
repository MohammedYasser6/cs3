import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "What architectural feature allows RNNs to process sequential data like sentences?",
    options: [
      "Max Pooling",
      "A Hidden State (Memory) that is passed from one time-step to the next.",
      "A 3x3 Kernel.",
      "A relational database.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "What fatal flaw do standard RNNs suffer from when reading long sequences?",
    options: [
      "Memory Leaks",
      "The Vanishing Gradient Problem (forgetting early inputs).",
      "Overfitting to the padding.",
      "Syntax Errors",
    ],
    correctAnswer: 1,
  },
  {
    question: "How do LSTMs solve the forgetting problem?",
    options: [
      "By using a conveyor belt 'Cell State' protected by mathematical gates (Forget, Input, Output).",
      "By increasing the learning rate.",
      "By flattening the sequence.",
      "By deleting the hidden state.",
    ],
    correctAnswer: 0,
  },
];

export default function RNNQuiz() {
  return (
    <QuizEngine
      title="Level 7 • Sequence Exam"
      moduleId="rnns-lstms"
      track="ai"
      xpReward={300}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/ai"
      nextModulePath="/ai/nlp"
    />
  );
}
