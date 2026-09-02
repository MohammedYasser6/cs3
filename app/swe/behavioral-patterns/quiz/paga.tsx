import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "Which Behavioral Pattern lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable at runtime (e.g., swapping routing algorithms in a GPS)?",
    options: [
      "Observer Pattern",
      "Strategy Pattern",
      "Command Pattern",
      "State Pattern",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "The Observer Pattern is heavily used in modern UI frameworks (like React). How does it work?",
    options: [
      "A 'Subject' maintains a list of 'Observers' and automatically notifies them of any state changes, usually by calling one of their methods.",
      "It constantly checks a database in an infinite loop to look for changes.",
      "It logs every action the user takes into a text file.",
      "It intercepts requests before they hit the server.",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "Which pattern turns a request into a stand-alone object containing all information about the request, allowing you to delay, queue, or reverse (Undo) the operation?",
    options: [
      "Command Pattern",
      "Iterator Pattern",
      "Mediator Pattern",
      "Memento Pattern",
    ],
    correctAnswer: 0,
  },
];

export default function BehavioralQuizPage() {
  return (
    <QuizEngine
      title="Level 5 • Behavioral Patterns Exam"
      moduleId="behavioral-patterns"
      track="swe"
      xpReward={200}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/swe"
      nextModulePath="/swe/creational-patterns"
    />
  );
}
