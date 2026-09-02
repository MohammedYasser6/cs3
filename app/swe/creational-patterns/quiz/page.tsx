import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "What is the primary danger or 'anti-pattern' associated with the Singleton Pattern?",
    options: [
      "It uses too much CPU power.",
      "It essentially introduces a Global State into your application, making unit testing very difficult.",
      "It requires multiple servers to run.",
      "It deletes objects automatically.",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Which pattern is used to construct complex objects step-by-step, allowing you to produce different types and representations of an object using the same construction code (e.g., configuring a custom PC)?",
    options: [
      "Factory Method",
      "Prototype Pattern",
      "Abstract Factory",
      "Builder Pattern",
    ],
    correctAnswer: 3,
  },
  {
    question: "What problem does the Factory Method solve?",
    options: [
      "It prevents a class from ever being instantiated.",
      "It provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created, hiding the 'new' keyword.",
      "It creates exactly one instance of a database connection.",
      "It clones existing objects to save memory.",
    ],
    correctAnswer: 1,
  },
];

export default function CreationalQuizPage() {
  return (
    <QuizEngine
      title="Level 6 • Creational Patterns Exam"
      moduleId="creational-patterns"
      track="swe"
      xpReward={200}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/swe"
      nextModulePath="/architecture-components" 
    />
  );
}
