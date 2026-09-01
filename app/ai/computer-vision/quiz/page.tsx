import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "Why are Convolutional Neural Networks (CNNs) preferred over standard Dense Neural Networks for image processing?",
    options: [
      "CNNs are older and more heavily tested.",
      "Dense networks destroy spatial relationships by flattening images, while CNNs process images in 2D grids to preserve spatial structure.",
      "CNNs don't require training data.",
      "Dense networks cannot process colored pixels.",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is the primary function of a Kernel (or Filter) in a CNN?",
    options: [
      "To increase the resolution of the image.",
      "To slide across the image matrix and mathematically extract specific features like edges or textures.",
      "To convert the image into natural language text.",
      "To securely encrypt the image data before processing.",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is the purpose of a 'Max Pooling' layer?",
    options: [
      "To add more layers to the neural network.",
      "To increase the file size of the image.",
      "To downsample (shrink) the feature map, keeping only the most important features to reduce computational cost.",
      "To combine multiple images into a single video file.",
    ],
    correctAnswer: 2,
  },
];

export default function CNNQuiz() {
  return (
    <QuizEngine
      title="Level 6 • Computer Vision Exam"
      moduleId="computer-vision"
      track="ai"
      xpReward={300}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/ai"
      nextModulePath="/ai/nlp-rnns" // Links to the next module when you build it
    />
  );
}
