import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "What is the primary difference between Supervised and Unsupervised learning?",
    options: [
      "Supervised learning requires humans to write explicit if/else code.",
      "Unsupervised learning uses labeled data, while Supervised learning does not.",
      "Supervised learning trains on data with known labels/answers, while Unsupervised learning finds patterns in unlabeled data.",
      "Unsupervised learning can only be run on quantum computers.",
    ],
    correctAnswer: 2,
  },
  {
    question: "In the K-Means algorithm, what does 'K' represent?",
    options: [
      "The learning rate of the algorithm.",
      "The number of clusters (centroids) the algorithm will attempt to find.",
      "The number of dimensions in the tensor.",
      "A constant math variable equal to 1000.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "During the update step of K-Means clustering, how do the centroids move?",
    options: [
      "They move completely randomly.",
      "They move to the exact physical average (mean) center of all the data points assigned to them.",
      "They repel each other until they hit the edges of the graph.",
      "They delete data points that are too far away.",
    ],
    correctAnswer: 1,
  },
];

export default function ClusteringQuiz() {
  return (
    <QuizEngine
      title="Level 4 • Unsupervised Clustering Exam"
      moduleId="clustering"
      track="ai"
      xpReward={200}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/ai"
      nextModulePath="/ai/deep-learning"
    />
  );
}
