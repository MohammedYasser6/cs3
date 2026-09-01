import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "In a Binary Search Tree (BST), where are all values LESS than the parent node placed?",
    options: [
      "In the Right Child",
      "In the Left Child",
      "At the Root",
      "In a linked list attached to the node",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "What is the time complexity to search for a value in a perfectly balanced Binary Search Tree?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    correctAnswer: 2,
  },
  {
    question:
      "Which graph traversal algorithm uses a Queue to explore neighbor nodes level-by-level (like rings expanding in a pond)?",
    options: [
      "Depth-First Search (DFS)",
      "Breadth-First Search (BFS)",
      "Binary Search",
      "Quick Sort",
    ],
    correctAnswer: 1,
  },
];

export default function TreesGraphsQuizPage() {
  return (
    <QuizEngine
      title="Tier 5 • Trees & Graphs Exam"
      moduleId="trees-and-graphs"
      track="cs"
      xpReward={250}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cs"
      nextModulePath="/graphs" // Final module, no next path needed
    />
  );
}
