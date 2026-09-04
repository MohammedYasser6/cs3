import QuizEngine from "@/components/quiz/QuizEngine";

const QUESTIONS = [
  {
    question:
      "When a user deletes a file and empties the recycling bin, what actually happens on the hard drive?",
    options: [
      "The hard drive physically scrambles that sector.",
      "The file is encrypted so no one can read it.",
      "The file's raw data remains on the disk, but the OS deletes the pointer and marks the space as 'unallocated'.",
      "The data is immediately overwritten with zeroes.",
    ],
    correctAnswer: 2,
  },
  {
    question: "What are 'Magic Bytes' (File Signatures)?",
    options: [
      "A specific sequence of hexadecimal bytes at the beginning of a file that identifies the file type (e.g., PDF or PNG).",
      "A malicious payload hidden in an image.",
      "The RAM allocation size of a program.",
      "A password required to open a ZIP file.",
    ],
    correctAnswer: 0,
  },
  {
    question: "What is 'File Carving' in Digital Forensics?",
    options: [
      "Compressing a large file into smaller pieces.",
      "Scanning raw disk space to extract files based on their magic byte signatures, even without a file system map.",
      "Cutting the ethernet cable to stop an active breach.",
      "Installing an antivirus program.",
    ],
    correctAnswer: 1,
  },
];

export default function ForensicsQuiz() {
  return (
    <QuizEngine
      title="Level 6 • Forensics Exam"
      moduleId="forensics"
      track="cyber"
      xpReward={300}
      passingScore={2}
      questions={QUESTIONS}
      returnPath="/cyber"
      nextModulePath="/cyber/pentesting"
    />
  );
}
