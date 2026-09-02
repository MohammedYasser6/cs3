import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question: "How does Generative AI differ from Discriminative AI?",
    options: [
      "It predicts labels (e.g., 'Dog').",
      "It learns the mathematical distribution of data to synthesize entirely new, fake data.",
      "It runs only on CPUs.",
      "It relies on rule-based programming.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "How do Diffusion Models (like Midjourney/DALL-E) learn to generate images?",
    options: [
      "By copying and pasting from Google Images.",
      "By learning to reverse the process of adding static noise to an image.",
      "By using two networks that fight each other.",
      "By flattening the image into a 1D vector.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "At a fundamental mathematical level, what is an LLM (like ChatGPT) doing?",
    options: [
      "Searching an internal SQL database of facts.",
      "Connecting directly to Google Search to pull answers.",
      "Calculating the probability distribution to predict the most logical next token, one word at a time.",
      "Copying Wikipedia articles verbatim.",
    ],
    correctAnswer: 2,
  },
];

export default function GenerativeAIQuiz() {
  return (
    <QuizEngine
      title="Level 10 • GenAI Exam"
      moduleId="generative-ai"
      track="ai"
      xpReward={400}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/ai"
      nextModulePath="/profile"
    />
  );
}
