import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "Unlike arrays, Linked Lists do not store elements in contiguous memory. How do they keep track of the sequence?",
    options: [
      "They use a mathematical formula to calculate the next position.",
      "Each node stores its data AND a pointer (memory address) to the next node.",
      "The operating system keeps a separate registry of all elements.",
      "They are stored in a database table.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "What is the time complexity of inserting a new node at the HEAD (beginning) of a Singly Linked List?",
    options: [
      "O(1) - Constant Time",
      "O(N) - Linear Time",
      "O(log N)",
      "O(N^2)",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "What happens if you accidentally delete the pointer to the 'Head' node of a linked list in a language without garbage collection (like C++)?",
    options: [
      "The list automatically resets itself.",
      "The memory addresses are reassigned to the next variable.",
      "A memory leak occurs because the entire list is orphaned in RAM and cannot be accessed or freed.",
      "The compiler prevents the code from running.",
    ],
    correctAnswer: 2,
  },
];

export default function LinkedListsQuizPage() {
  return (
    <QuizEngine
      title="Tier 2 • Linked Lists Exam"
      moduleId="linked-lists"
      track="cs"
      xpReward={100}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cs"
      nextModulePath="/stacks-queues" // Update if your folder name differs
    />
  );
}
