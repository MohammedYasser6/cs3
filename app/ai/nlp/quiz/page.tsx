import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question: "What is Tokenization?",
    options: [
      "Encrypting a password.",
      "Splitting raw text strings into numeric tokens (words or sub-words) that the AI can read.",
      "Compressing a text file.",
      "Translating English to Spanish.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "What makes Word Embeddings (Word2Vec) superior to older TF-IDF methods?",
    options: [
      "It is older and more stable.",
      "It maps words into a physical vector space where words with similar meanings cluster together.",
      "It uses less RAM.",
      "It deletes adjectives.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Because Embeddings plot language as coordinates in space, you can...",
    options: [
      "Only process numbers.",
      "Literally do math with language (e.g., King - Man + Woman = Queen).",
      "Bypass tokenization.",
      "Prevent overfitting entirely.",
    ],
    correctAnswer: 1,
  },
];

export default function NLPQuiz() {
  return (
    <QuizEngine
      title="Level 8 • NLP Exam"
      moduleId="nlp"
      track="ai"
      xpReward={200}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/ai"
      nextModulePath="/ai/transformers"
    />
  );
}
