import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question: "What makes Transformers vastly faster to train than RNNs?",
    options: [
      "They are written in Rust.",
      "They process entire paragraphs at once in parallel, fully utilizing GPU architecture.",
      "They use less layers.",
      "They skip the embedding phase.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Because Transformers read everything simultaneously, how do they keep track of word order?",
    options: [
      "They rely on alphabetical order.",
      "Through Positional Encoding (injecting sine/cosine waves into the vectors).",
      "They don't; word order is ignored.",
      "By using a SQL index.",
    ],
    correctAnswer: 1,
  },
  {
    question: "What does the Self-Attention mechanism do?",
    options: [
      "Calculates a score of how much surrounding words should influence the context of the current word.",
      "Alerts the user when training is done.",
      "Randomly drops neurons.",
      "Checks spelling.",
    ],
    correctAnswer: 0,
  },
];

export default function TransformersQuiz() {
  return (
    <QuizEngine
      title="Level 9 • Transformers Exam"
      moduleId="transformers"
      track="ai"
      xpReward={300}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/ai"
      nextModulePath="/ai/generative-ai"
    />
  );
}
