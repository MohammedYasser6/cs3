import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "Why is it dangerous to put a third-party API key inside your Android app's strings.xml file?",
    options: [
      "It makes the app run slower.",
      "An APK is easily decompiled, allowing attackers to extract the API key in plain text.",
      "The Google Play Store prohibits string files.",
      "It causes a memory leak on older devices.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      'What does setting an Android Activity to `android:exported="true"` do?',
    options: [
      "It encrypts the activity.",
      "It exports the code to a remote server for debugging.",
      "It allows other applications on the user's phone to launch that specific screen directly.",
      "It forces the app to request camera permissions.",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "Which of the following is true about storing sensitive data in Android SharedPreferences?",
    options: [
      "It is perfectly secure because Android isolates app data.",
      "It is stored in plaintext; if the device is rooted, attackers can read it.",
      "It is encrypted with AES-256 by default.",
      "It deletes itself automatically when the app is closed.",
    ],
    correctAnswer: 1,
  },
];

export default function MobileSecQuiz() {
  return (
    <QuizEngine
      title="Level 4 • Mobile Sec Exam"
      moduleId="mobile-sec"
      track="cyber"
      xpReward={250}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cyber"
      nextModulePath="/cyber/iam"
    />
  );
}
