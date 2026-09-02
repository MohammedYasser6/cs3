import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question: "What does the 'C' in the CIA Triad stand for?",
    options: [
      "Cybersecurity",
      "Confidentiality (keeping data secret)",
      "Cryptography",
      "Control (managing access rights)",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Which of the following best describes a Cryptographic Hash (like SHA-256)?",
    options: [
      "A two-way function where data is locked with a public key and unlocked with a private key.",
      "A fast encryption method used for bulk data transfer.",
      "A one-way mathematical function that scrambles data into a fixed-length string, guaranteeing data integrity.",
      "A firewall rule that blocks malicious packets.",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "If you encrypt a file using Symmetric Encryption (like AES), what do you need to decrypt it?",
    options: [
      "A randomly generated public key.",
      "A SHA-256 hash.",
      "A digital signature.",
      "The exact same secret key that was used to encrypt it.",
    ],
    correctAnswer: 3,
  },
];

export default function CryptographyQuiz() {
  return (
    <QuizEngine
      title="Level 1 • Cryptography Exam"
      moduleId="cryptography"
      track="cyber"
      xpReward={150}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cyber"
      nextModulePath="/cyber/network-analysis"
    />
  );
}
