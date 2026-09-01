import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "What absolute prerequisite condition must be met before you can use Binary Search on an array?",
    options: [
      "The array must contain only positive numbers.",
      "The array must be completely sorted.",
      "The array must have an even number of elements.",
      "The array must not contain any duplicate values.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "How does Binary Search find a target value so quickly compared to Linear Search?",
    options: [
      "It skips every other element to save time.",
      "It checks the middle element, and eliminates half of the remaining search space based on whether the target is higher or lower.",
      "It runs on the GPU instead of the CPU.",
      "It uses a built-in language library that automatically knows the answer.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "What is the worst-case time complexity of finding an element in a sorted array using Binary Search?",
    options: ["O(1)", "O(n)", "O(n log n)", "O(log n)"],
    correctAnswer: 3,
  },
];

export default function SearchingQuizPage() {
  return (
    <QuizEngine
      title="Tier 5 • Searching Exam"
      moduleId="searching" // Ensure this matches your CS dashboard id for this module
      track="cs"
      xpReward={400}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cs"
      nextModulePath="" // Final module!
    />
  );
}
