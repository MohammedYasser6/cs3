import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "Which of the following is an example of a Non-Functional Requirement?",
    options: [
      "The system must allow admins to delete user comments.",
      "The web page must load completely in under 1.5 seconds.",
      "The system must send a confirmation receipt after a purchase.",
      "The user must be able to upload a profile picture.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "In a UML Use Case diagram, what does the large rectangle box represent?",
    options: [
      "A database table.",
      "The System Boundary, separating external actors from internal system functions.",
      "The server hardware.",
      "A software bug.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Why is the Software Requirements Specification (SRS) document so critical to the SDLC?",
    options: [
      "It acts as a binding contract and blueprint so developers know exactly what to build and QA knows exactly what to test.",
      "It automatically generates the database schema.",
      "It writes the front-end HTML code for the designers.",
      "It is required by law for all websites.",
    ],
    correctAnswer: 0,
  },
];

export default function SRSQuizPage() {
  return (
    <QuizEngine
      title="Level 2 • Requirements & UML Exam"
      moduleId="srs-requirements"
      track="swe"
      xpReward={150}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/swe"
      nextModulePath="/swe/solid-principles"
    />
  );
}
