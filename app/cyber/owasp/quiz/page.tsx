import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question: "What is the root cause of a SQL Injection (SQLi) vulnerability?",
    options: [
      "Using a database that is too old.",
      "Directly concatenating raw, untrusted user input into backend database query strings.",
      "Forgetting to hash the passwords in the database.",
      "Hosting the website on an HTTP connection.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "How does the classic payload `' OR 1=1 --` bypass a login system?",
    options: [
      "It deletes the entire user table.",
      "It guesses the admin's password via brute force.",
      "It closes the username string early, forces the WHERE clause to evaluate to True, and comments out the password check.",
      "It crashes the server, forcing it to reboot in safe mode.",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "What is the industry-standard defense to prevent SQL Injection in your code?",
    options: [
      "Using Prepared Statements (Parameterized Queries).",
      "Blocking IP addresses that use single quotes.",
      "Encrypting the SQL database.",
      "Using a NoSQL database.",
    ],
    correctAnswer: 0,
  },
];

export default function OWASPQuiz() {
  return (
    <QuizEngine
      title="Level 3 • OWASP Exam"
      moduleId="owasp"
      track="cyber"
      xpReward={250}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cyber"
      nextModulePath="/cyber/mobile-sec"
    />
  );
}
