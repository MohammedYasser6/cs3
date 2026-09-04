import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "What is the difference between Authentication (AuthN) and Authorization (AuthZ)?",
    options: [
      "AuthN handles databases, AuthZ handles UI.",
      "AuthN proves who you are (login); AuthZ verifies what you are allowed to do (permissions).",
      "AuthN is for admins, AuthZ is for regular users.",
      "There is no difference; they mean the exact same thing.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Is the Payload section of a standard JSON Web Token (JWT) encrypted?",
    options: [
      "Yes, it is encrypted with AES-256.",
      "Yes, but only if the user is an admin.",
      "No, it is only Base64 encoded, meaning anyone who intercepts it can easily decode and read the data.",
      "No, it is sent in raw plaintext without any encoding.",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "If the payload of a JWT is readable by anyone, what prevents a user from changing their role from 'user' to 'admin'?",
    options: [
      "The browser will refuse to save the token.",
      "The server's firewall.",
      "The JWT Signature. Tampering with the payload invalidates the signature unless the attacker knows the server's secret signing key.",
      "The database automatically reverts it.",
    ],
    correctAnswer: 2,
  },
];

export default function IAMQuiz() {
  return (
    <QuizEngine
      title="Level 5 • IAM Exam"
      moduleId="iam"
      track="cyber"
      xpReward={250}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cyber"
      nextModulePath="/cyber/forensics"
    />
  );
}
