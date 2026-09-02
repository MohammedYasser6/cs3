import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "Which Structural Pattern allows you to attach new behaviors to objects dynamically by placing them inside special wrapper objects?",
    options: [
      "Facade Pattern",
      "Adapter Pattern",
      "Decorator Pattern",
      "Proxy Pattern",
    ],
    correctAnswer: 2,
  },
  {
    question: "What is the primary purpose of the Facade Pattern?",
    options: [
      "To provide a simplified, high-level interface to a complex subsystem of classes.",
      "To convert the interface of one class into another interface clients expect.",
      "To ensure a class only has one instance.",
      "To define a family of algorithms and make them interchangeable.",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "If you have an old, legacy billing system and you want to use it with a new modern UI that expects different method names, which pattern should you use?",
    options: [
      "Bridge Pattern",
      "Adapter Pattern",
      "Composite Pattern",
      "Flyweight Pattern",
    ],
    correctAnswer: 1,
  },
];

export default function StructuralQuizPage() {
  return (
    <QuizEngine
      title="Level 4 • Structural Patterns Exam"
      moduleId="structural-patterns"
      track="swe"
      xpReward={150}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/swe"
      nextModulePath="/swe/behavioral-patterns"
    />
  );
}
