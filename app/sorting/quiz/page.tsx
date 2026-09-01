import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "Which sorting algorithm is notoriously inefficient for large datasets, operating by repeatedly swapping adjacent elements and having a time complexity of O(n^2)?",
    options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Radix Sort"],
    correctAnswer: 2,
  },
  {
    question:
      "Which sorting algorithm heavily relies on the 'Divide and Conquer' recursive strategy by picking a 'Pivot' element and partitioning the array around it?",
    options: ["Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort"],
    correctAnswer: 3,
  },
  {
    question:
      "How does Merge Sort achieve its highly consistent O(n log n) time complexity?",
    options: [
      "By randomly shuffling the array until it happens to be sorted.",
      "By continuously splitting the array in half until sizes are 1, then merging them back together in order.",
      "By finding the absolute minimum value and moving it to the front, one by one.",
      "By using a hash table to count the occurrences of each number.",
    ],
    correctAnswer: 1,
  },
];

export default function SortingQuizPage() {
  return (
    <QuizEngine
      title="Tier 5 • Sorting Exam"
      moduleId="sorting" // Ensure this matches your CS dashboard id for this module
      track="cs"
      xpReward={350}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cs"
      nextModulePath="/search"
    />
  );
}
