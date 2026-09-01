import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question: "What is the primary characteristic of the Waterfall model?",
    options: [
      "It emphasizes rapid prototyping and continuous client feedback.",
      "It is a strict, linear sequential approach where each phase must be completed before the next begins.",
      "It allows developers to skip the design phase to write code faster.",
      "It randomly assigns tasks to team members every two weeks.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Why is the Waterfall model considered risky for modern software development?",
    options: [
      "It requires too many servers to run.",
      "It produces messy, unreadable code.",
      "It assumes requirements will not change, making it incredibly expensive and difficult to fix design errors discovered late in testing.",
      "It forces developers to use outdated programming languages.",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "How does the 'Agile' methodology attempt to solve the problems of the Waterfall model?",
    options: [
      "By forcing the client to sign a contract preventing them from changing their mind.",
      "By eliminating the testing phase completely.",
      "By breaking development into small, iterative cycles (Sprints) to deliver working software quickly and adapt to changing requirements.",
      "By outsourcing the development to AI.",
    ],
    correctAnswer: 2,
  },
];

export default function SDLCQuizPage() {
  return (
    <QuizEngine
      title="Level 1 • SDLC & Waterfall Exam"
      moduleId="sdlc-models"
      track="swe" // Crucial: uses the new amber SWE theme and saves to sweXp
      xpReward={100}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/swe"
      nextModulePath="/swe/srs-requirements" // Points to your next SWE module
    />
  );
}
