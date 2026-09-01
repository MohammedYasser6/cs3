import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "Which acronym perfectly describes how a Stack data structure operates?",
    options: [
      "FIFO (First In, First Out)",
      "LIFO (Last In, First Out)",
      "FILO (First In, Last Out)",
      "Both B and C",
    ],
    correctAnswer: 3,
  },
  {
    question: "Which of these real-world scenarios is best modeled by a Queue?",
    options: [
      "The 'Undo' button in a text editor.",
      "A web browser's back button history.",
      "Cars waiting at a drive-thru window.",
      "Checking matching parentheses in a math equation.",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "If you push A, B, and C onto a Stack (in that order), and then pop once, what value do you get?",
    options: ["A", "B", "C", "Error"],
    correctAnswer: 2,
  },
];

export default function StacksQueuesQuizPage() {
  return (
    <QuizEngine
      title="Tier 3 • Stacks & Queues Exam"
      moduleId="stacks-and-queues"
      track="cs"
      xpReward={150}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cs"
      nextModulePath="/hash-tables"
    />
  );
}
