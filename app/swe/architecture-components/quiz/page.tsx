import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "Your database is crashing because thousands of users are requesting the exact same homepage data simultaneously. Which component should you introduce to fix this?",
    options: [
      "A Message Queue (like RabbitMQ) to process the requests slower.",
      "A Load Balancer to route traffic to the database.",
      "A Cache (like Redis) to store the homepage data in RAM and serve it instantly without querying the database.",
      "Vertical Scaling by rewriting the code in Assembly.",
    ],
    correctAnswer: 2,
  },
  {
    question: "What is the primary function of a Load Balancer?",
    options: [
      "To encrypt passwords before saving them.",
      "To evenly distribute incoming network traffic across a group of backend servers.",
      "To store user session tokens permanently on disk.",
      "To automatically write database schemas.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "When a user uploads a large video, the server takes 5 minutes to compress it. Which architectural pattern prevents the user from having to stare at a loading screen for 5 minutes?",
    options: [
      "Drop the compression task into a Message Queue (Async Processing) and immediately return a 'Processing...' response to the user.",
      "Store the video in a Redis Cache.",
      "Add a Load Balancer to make the compression faster.",
      "Use the Singleton Design Pattern.",
    ],
    correctAnswer: 0,
  },
];

export default function ArchitectureQuizPage() {
  return (
    <QuizEngine
      title="Level 7 • Architecture Components Exam"
      moduleId="architecture-components"
      track="swe"
      xpReward={200}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/swe/microservices"
      nextModulePath=""
    />
  );
}
