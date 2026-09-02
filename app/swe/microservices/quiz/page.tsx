import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "Which of the following best describes a Monolithic Architecture?",
    options: [
      "The application is broken into independent services that communicate via REST.",
      "The entire application is built as a single, unified unit where all components share the same codebase and resource pool.",
      "Code only runs when triggered by an event and costs nothing when idle.",
      "A database that stores data in RAM instead of a hard drive.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "In a true Microservices Architecture, how is data typically managed?",
    options: [
      "Every microservice reads and writes to one massive, centralized SQL database.",
      "Data is hardcoded into the source files.",
      "Each independent service manages its own database, ensuring loose coupling.",
      "The user's browser stores all the data via LocalStorage.",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "What is the primary billing and execution advantage of Serverless Architecture (FaaS)?",
    options: [
      "You pay a flat monthly fee to rent a dedicated physical server.",
      "Code only runs when triggered by an event, meaning you only pay for the exact execution time, and the cloud provider handles all scaling.",
      "It allows you to mine cryptocurrency in the background.",
      "It completely eliminates the need for frontend developers.",
    ],
    correctAnswer: 1,
  },
];

export default function MicroservicesQuizPage() {
  return (
    <QuizEngine
      title="Level 8 • Architectures Exam"
      moduleId="microservices"
      track="swe"
      xpReward={200}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/swe"
      nextModulePath=""
    />
  );
}
