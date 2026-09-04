import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "Why do traditional Signature-Based firewalls and antiviruses fail against Zero-Day exploits?",
    options: [
      "Because they process data too slowly.",
      "Because Zero-Days have never been seen before, meaning they have no known signature in the firewall's database.",
      "Because Zero-Days are always encrypted with AES-256.",
      "Because firewalls cannot inspect HTTP traffic.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "How does Machine Learning (Anomaly Detection) catch brand-new attacks?",
    options: [
      "By manually sending the request to a security engineer for approval.",
      "By connecting to Google Search to look up the payload.",
      "By learning the statistical baseline of 'normal' traffic, and blocking requests whose behavior deviates significantly from that baseline.",
      "By blocking all traffic originating from foreign countries.",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "What is 'Adversarial Machine Learning' in the context of cybersecurity?",
    options: [
      "Two ML models playing chess against each other.",
      "Attackers using AI techniques to slightly modify their exploits, attempting to trick the defending ML model into classifying the attack as 'normal' traffic.",
      "A firewall that blocks ChatGPT from the corporate network.",
      "Using AI to write firewall rules.",
    ],
    correctAnswer: 1,
  },
];

export default function MLDefenseQuiz() {
  return (
    <QuizEngine
      title="Level 10 • ML Defense Exam"
      moduleId="ml-defense"
      track="cyber"
      xpReward={300}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cyber"
      nextModulePath="/profile"
    />
  );
}
