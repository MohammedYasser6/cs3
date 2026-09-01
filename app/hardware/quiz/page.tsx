import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "What is the primary difference in function between the CPU and RAM?",
    options: [
      "The CPU stores files permanently, while RAM executes instructions.",
      "The CPU executes mathematical and logical instructions, while RAM acts as fast, temporary storage for data currently in use.",
      "RAM renders graphics, while the CPU connects to the internet.",
      "There is no difference; they are interchangeable parts.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Because RAM is 'Volatile' memory, what happens to the data stored in it when the computer loses power?",
    options: [
      "It is safely saved to the hard drive.",
      "It is compressed into a zip file.",
      "It is permanently lost.",
      "It uploads to the cloud.",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "Inside the CPU, what is the role of the ALU (Arithmetic Logic Unit)?",
    options: [
      "To cool down the processor.",
      "To perform all mathematical calculations and boolean logic operations.",
      "To manage power distribution.",
      "To store the operating system.",
    ],
    correctAnswer: 1,
  },
];

export default function HardwareQuizPage() {
  return (
    <QuizEngine
      title="Tier 0 • Hardware Exam"
      moduleId="hardware" // Check your CS dashboard for exact ID
      track="cs"
      xpReward={50}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cs"
      nextModulePath="/binary"
    />
  );
}
