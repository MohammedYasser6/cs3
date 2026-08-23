"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import CallStackVisualizer, {
  StackFrame,
} from "../../components/canvas/CallStackVisualizer";
import CodeViewer from "../../components/ui/CodeViewer";

const RECURSION_CODE = {
  "C++": `int factorial(int n) {\n    // 1. The Base Case (Stops the recursion)\n    if (n <= 1) {\n        return 1;\n    }\n    \n    // 2. The Recursive Step\n    return n * factorial(n - 1);\n}`,
  Java: `public int factorial(int n) {\n    // 1. The Base Case (Stops the recursion)\n    if (n <= 1) {\n        return 1;\n    }\n    \n    // 2. The Recursive Step\n    return n * factorial(n - 1);\n}`,
  Kotlin: `fun factorial(n: Int): Int {\n    // 1. The Base Case\n    if (n <= 1) return 1\n    \n    // 2. The Recursive Step\n    return n * factorial(n - 1)\n}`,
  Python: `def factorial(n):\n    # 1. The Base Case\n    if n <= 1:\n        return 1\n        \n    # 2. The Recursive Step\n    return n * factorial(n - 1)`,
};

export default function RecursionPage() {
  const [frames, setFrames] = useState<StackFrame[]>([]);
  const [activeTab, setActiveTab] = useState<"theory" | "code">("theory");
  const [actionLog, setActionLog] = useState<string>(
    "Ready. Click 'Call factorial(5)' to begin.",
  );
  const [step, setStep] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const startRecursion = () => {
    setIsActive(true);
    setStep(1);
    setFrames([
      {
        id: 5,
        n: 5,
        label: "factorial(5)",
        state: "calling",
        returnValue: null,
        expression: "return 5 * factorial(4)",
      },
    ]);
    setActionLog(
      "Invoked factorial(5).\nSince n=5 (not <= 1), we skip the base case.\nIt needs to calculate '5 * factorial(4)', but factorial(4) is unknown!\n\nExecution PAUSES and is added to the Call Stack.",
    );
  };

  const nextStep = () => {
    let newFrames = [...frames];
    let log = "";

    // Pushing to the stack (Calling down to 2)
    if (step >= 1 && step < 4) {
      const currentN = 5 - step; // 4, 3, 2
      newFrames.push({
        id: currentN,
        n: currentN,
        label: `factorial(${currentN})`,
        state: "calling",
        returnValue: null,
        expression: `return ${currentN} * factorial(${currentN - 1})`,
      });
      log = `Invoked factorial(${currentN}).\nSince n=${currentN} (not <= 1), it needs to calculate '${currentN} * factorial(${currentN - 1})'.\n\nfactorial(${currentN}) PAUSES and is pushed onto the stack.`;
      setStep(step + 1);
    }
    // Hitting the Base Case (n = 1)
    else if (step === 4) {
      newFrames.push({
        id: 1,
        n: 1,
        label: `factorial(1)`,
        state: "returning",
        returnValue: 1,
        expression: "return 1 (Base Case Reached!)",
      });
      log = `Invoked factorial(1).\n🎯 BASE CASE REACHED! Since n=1, it immediately returns 1 without calling any more functions.\n\nThe Call Stack can finally start unpausing and resolving upwards!`;
      setStep(step + 1);
    }
    // Popping off the stack (Resolving back up)
    else if (step >= 5 && step <= 8) {
      const resolvingIndex = 9 - step; // 4, 3, 2, 1
      const childFrame = newFrames[resolvingIndex];
      const parentFrame = newFrames[resolvingIndex - 1];

      // Resolve the child that just finished
      childFrame.state = "resolved";

      // Update parent frame with the actual math now that it has the child's answer
      parentFrame.state = "returning";
      parentFrame.returnValue = parentFrame.n * childFrame.returnValue!;
      parentFrame.expression = `return ${parentFrame.n} * ${childFrame.returnValue} = ${parentFrame.returnValue}`;

      log = `factorial(${childFrame.n}) returned ${childFrame.returnValue}.\n\nNow factorial(${parentFrame.n}) can unpause and finish its math:\n${parentFrame.n} * ${childFrame.returnValue} = ${parentFrame.returnValue}.`;

      if (step === 8) {
        log += `\n\n🎉 Recursion Complete! The original call to factorial(5) evaluates to 120.`;
        setIsActive(false);
      }
      setStep(step + 1);
    }

    setFrames(newFrames);
    setActionLog(log);
  };

  const reset = () => {
    setFrames([]);
    setStep(0);
    setIsActive(false);
    setActionLog("Ready. Click 'Call factorial(5)' to begin.");
  };

  return (
    <section className="flex h-full w-full overflow-hidden">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0">
          <p className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-1">
            Tier 4 • Module 10
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Recursion
          </h2>

          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 mb-6">
            <button
              onClick={() => setActiveTab("theory")}
              className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${activeTab === "theory" ? "bg-slate-800 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
            >
              Theory
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${activeTab === "code" ? "bg-orange-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
            >
              Implementation
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0 flex flex-col">
          {activeTab === "theory" ? (
            <>
              <div className="space-y-6 flex-1 animate-fade-in">
                <div>
                  <h3 className="text-white font-bold mb-2 text-lg">
                    Functions Calling Functions:
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Recursion happens when a function calls itself to solve a
                    smaller piece of a problem. But computers can't do this
                    infinitely—they use a physical memory structure called the{" "}
                    <strong>Call Stack</strong> to remember where they paused.
                  </p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                  <h4 className="text-orange-400 font-bold mb-2 text-sm">
                    Key Concepts:
                  </h4>
                  <ul className="text-slate-300 text-sm space-y-2 list-disc pl-4">
                    <li>
                      <strong>The Paused State:</strong> When a function calls
                      itself, the original function pauses and waits for the new
                      one to finish.
                    </li>
                    <li>
                      <strong>The Base Case:</strong> The condition that stops
                      the recursion (e.g., `if (n == 1)`). It provides a
                      concrete answer so the paused functions can finish their
                      math.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 bg-slate-950 border border-orange-500/30 p-4 rounded-lg shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                <p className="text-xs text-orange-500 font-bold uppercase tracking-widest mb-2">
                  Stack Execution Log
                </p>
                <pre className="text-sm text-white font-mono leading-relaxed whitespace-pre-wrap">
                  {actionLog}
                </pre>
              </div>
            </>
          ) : (
            <CodeViewer
              snippets={RECURSION_CODE}
              explanation="Every recursive function must have two parts: a base case that returns a concrete value, and a recursive step that brings the function closer to the base case."
            />
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 1, 11], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={1.2} />
              <CallStackVisualizer frames={frames} />
              <OrbitControls enableDamping minDistance={3} maxDistance={20} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8">
          <div className="flex gap-4">
            {!isActive && step === 0 ? (
              <button
                onClick={startRecursion}
                className="px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded font-medium transition active:scale-95 shadow-md"
              >
                Call factorial(5)
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={step > 8}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition active:scale-95 shadow-md disabled:opacity-50"
              >
                Next Step →
              </button>
            )}
            <button
              onClick={reset}
              className="px-6 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded font-medium transition active:scale-95"
            >
              Reset
            </button>
          </div>
          <Link
            href="/recursion/quiz"
            className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition"
          >
            Take the Exam →
          </Link>
        </div>
      </div>
    </section>
  );
}
