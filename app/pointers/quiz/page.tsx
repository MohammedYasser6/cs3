import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question: "What exactly does a Pointer variable store?",
    options: [
      "A floating-point decimal number.",
      "A raw string of text.",
      "The physical memory address of another variable.",
      "A backup copy of the operating system.",
    ],
    correctAnswer: 2,
  },
  {
    question: "In C/C++, what is the 'Dereference' operator (*) used for?",
    options: [
      "To multiply two variables.",
      "To access or modify the actual value stored at the memory address the pointer is pointing to.",
      "To delete the pointer from memory.",
      "To create a new array.",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is a 'Segmentation Fault' (Segfault)?",
    options: [
      "When the hard drive runs out of storage space.",
      "An error caused by a program attempting to access a restricted memory address or a null pointer.",
      "A syntax error caused by forgetting a semicolon.",
      "When the internet disconnects during a download.",
    ],
    correctAnswer: 1,
  },
];

export default function PointersQuizPage() {
  return (
    <QuizEngine
      title="Tier 1 • Pointers Exam"
      moduleId="pointers"
      track="cs"
      xpReward={50}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cs"
      nextModulePath="/arrays" // Hands off perfectly to the 2D Arrays module
    />
  );
}
