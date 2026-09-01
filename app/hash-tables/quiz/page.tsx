import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "What is the primary purpose of a 'Hash Function' in a Hash Table?",
    options: [
      "To compress the data into a smaller file size.",
      "To convert a given key (like a string) into a specific integer index for an array.",
      "To encrypt passwords securely so they cannot be read.",
      "To randomly shuffle the elements in the array.",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is a 'Hash Collision'?",
    options: [
      "When the hash table runs out of memory and crashes.",
      "When two identical keys are entered into the database.",
      "When the hash function assigns two completely different keys to the exact same array index.",
      "When you try to delete an item that doesn't exist.",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "Assuming a well-designed hash function and enough memory, what is the average time complexity for searching, inserting, and deleting in a Hash Table?",
    options: [
      "O(1) - Constant time",
      "O(n) - Linear time",
      "O(log n) - Logarithmic time",
      "O(n^2) - Quadratic time",
    ],
    correctAnswer: 0,
  },
];

export default function HashTablesQuizPage() {
  return (
    <QuizEngine
      title="Tier 3 • Hash Tables Exam"
      moduleId="hash-tables"
      track="cs"
      xpReward={150}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cs"
      nextModulePath="/trees"
    />
  );
}
