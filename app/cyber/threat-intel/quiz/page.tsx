import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question: "What is the primary purpose of a Honeypot?",
    options: [
      "To securely store the company's most sensitive database backups.",
      "To act as a decoy system to lure in attackers, allowing defenders to study their techniques and capture their IP addresses.",
      "To speed up web traffic for legitimate users.",
      "To automatically mine cryptocurrency during downtime.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Why is analyzing traffic on a Honeypot much easier than analyzing traffic on a real production server?",
    options: [
      "Because honeypots generate their own traffic.",
      "Because there is no legitimate traffic on a honeypot. Every single connection is guaranteed to be hostile or unauthorized.",
      "Because honeypots use older, simpler operating systems.",
      "Because honeypots don't require an internet connection.",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is an Indicator of Compromise (IoC)?",
    options: [
      "A piece of forensic evidence (like a malicious IP address or file hash) that identifies potentially malicious activity on a system.",
      "A bug in the source code.",
      "A pop-up window indicating a successful login.",
      "A warning that a password is too weak.",
    ],
    correctAnswer: 0,
  },
];

export default function ThreatIntelQuiz() {
  return (
    <QuizEngine
      title="Level 9 • Threat Intel Exam"
      moduleId="threat-intel"
      track="cyber"
      xpReward={350}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cyber"
      nextModulePath="/cyber/ml-defense"
    />
  );
}
