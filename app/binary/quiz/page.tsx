import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "Why do modern computers fundamentally use the Binary (Base-2) number system?",
    options: [
      "Because 1s and 0s perfectly represent the physical On/Off states of microscopic electrical transistors.",
      "Because binary is easier for humans to read than decimal.",
      "Because Alan Turing patented the Base-2 system.",
      "Because it takes up less physical space on a screen.",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "What is the decimal (Base-10) equivalent of the binary number '1010'?",
    options: ["8", "10", "12", "14"],
    correctAnswer: 1,
  },
  {
    question: "How many distinct values can a single Byte (8 bits) represent?",
    options: ["8", "16", "128", "256"],
    correctAnswer: 3,
  },
];

export default function BinaryQuizPage() {
  return (
    <QuizEngine
      title="Tier 0 • Binary Exam"
      moduleId="binary"
      track="cs"
      xpReward={50}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cs"
      nextModulePath="/arrays"
    />
  );
}
