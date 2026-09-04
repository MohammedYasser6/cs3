import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "What does putting a network card into 'Promiscuous Mode' allow a hacker to do?",
    options: [
      "Bypass a computer's antivirus software.",
      "Capture and read all packets passing through the network, even those not addressed to their machine.",
      "Make their own IP address invisible.",
      "Speed up their download speeds.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Why is submitting a login form over HTTP considered a critical vulnerability?",
    options: [
      "The server will reject the request.",
      "It causes a database crash.",
      "The credentials are sent in raw plaintext, allowing anyone sniffing the network to read the password.",
      "HTTP uses up too much bandwidth.",
    ],
    correctAnswer: 2,
  },
  {
    question: "If a hacker intercepts an HTTPS packet, what do they see?",
    options: [
      "The user's plaintext password.",
      "Unreadable encrypted gibberish, because the payload is protected by TLS/SSL.",
      "Nothing, HTTPS packets are invisible to sniffers.",
      "The source code of the backend server.",
    ],
    correctAnswer: 1,
  },
];

export default function NetworkQuiz() {
  return (
    <QuizEngine
      title="Level 2 • Network Exam"
      moduleId="network-analysis"
      track="cyber"
      xpReward={200}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cyber"
      nextModulePath="/cyber/owasp"
    />
  );
}
