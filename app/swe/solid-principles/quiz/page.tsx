import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question: "What does the 'S' in SOLID stand for, and what does it mean?",
    options: [
      "Static Typing: All variables must be strictly typed.",
      "Single Responsibility Principle: A class should have one, and only one, reason to change.",
      "Synchronous Execution: Code must run in top-to-bottom order.",
      "Security First: All data must be encrypted.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "According to the Open-Closed Principle (O), software entities should be open for ________ but closed for ________.",
    options: [
      "Extension ; Modification",
      "Testing ; Deployment",
      "Modification ; Extension",
      "Public access ; Private access",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "Which principle states that you should not force a client to depend on interfaces they do not use?",
    options: [
      "Dependency Inversion",
      "Liskov Substitution",
      "Interface Segregation",
      "Single Responsibility",
    ],
    correctAnswer: 2,
  },
];

export default function SolidQuizPage() {
  return (
    <QuizEngine
      title="Level 3 • SOLID Principles Exam"
      moduleId="solid-principles"
      track="swe"
      xpReward={150}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/swe"
      nextModulePath="/swe/structural-patterns"
    />
  );
}
