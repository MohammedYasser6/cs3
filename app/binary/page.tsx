"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import BinaryVisualizer from "../../components/canvas/BinaryVisualizer";
import CodeViewer from "../../components/ui/CodeViewer";

const BINARY_CODE = {
  "C++": `int main() {\n    unsigned char byte = 13; // 00001101\n\n    // Shift Left (Multiplies by 2)\n    byte = byte << 1; // 00011010 (26)\n\n    // Shift Right (Divides by 2)\n    byte = byte >> 1; // 00001101 (13)\n\n    // Bitwise AND (&), OR (|), XOR (^)\n    unsigned char mask = 1; // 00000001\n    bool isOdd = (byte & mask) == 1;\n}`,
  Java: `public void bitwiseDemo() {\n    int b = 13; // 00001101\n\n    // Shift Left (Multiplies by 2)\n    b = b << 1; // 00011010 (26)\n\n    // Shift Right (Divides by 2)\n    b = b >> 1; // 00001101 (13)\n\n    // Bitwise AND\n    int mask = 1;\n    boolean isOdd = (b & mask) == 1;\n}`,
  Kotlin: `fun bitwiseDemo() {\n    var b = 13 // 00001101\n\n    // Kotlin uses explicit infix functions for shifts\n    b = b shl 1 // Shift Left (26)\n    b = b shr 1 // Shift Right (13)\n\n    // Bitwise AND\n    val isOdd = (b and 1) == 1\n}`,
  Python: `def bitwise_demo():\n    b = 13 # 00001101\n\n    # Shift Left (Multiplies by 2)\n    b = b << 1 # 00011010 (26)\n\n    # Shift Right (Divides by 2)\n    b = b >> 1 # 00001101 (13)\n\n    # Bitwise AND\n    is_odd = (b & 1) == 1`
};

export default function BinaryPage() {
  // State holds a number from 0 to 255 (1 Byte)
  const [value, setValue] = useState(13);
  const [activeTab, setActiveTab] = useState<"theory" | "code">("theory");
  const [actionLog, setActionLog] = useState<string>("8-bit byte initialized.");

  // Generate an array of 8 bits for the toggle buttons
  const binaryString = value.toString(2).padStart(8, '0');
  const bits = binaryString.split('').map(Number);

  const toggleBit = (index: number) => {
    // 0 is the most significant bit (128), 7 is the least (1)
    const power = Math.pow(2, 7 - index);
    const bitIsCurrentlyOne = bits[index] === 1;
    
    let newValue;
    if (bitIsCurrentlyOne) {
      newValue = value - power;
      setActionLog(`Flipped bit at position ${index} to 0. Subtracting ${power}.`);
    } else {
      newValue = value + power;
      setActionLog(`Flipped bit at position ${index} to 1. Adding ${power}.`);
    }
    setValue(newValue);
  };

  const shiftLeft = () => {
    const newValue = (value << 1) & 255; // Keep it bounded to 8 bits
    setValue(newValue);
    setActionLog("Bitwise Shift Left (<< 1). Everything multiplied by 2.");
  };

  const shiftRight = () => {
    const newValue = value >> 1;
    setValue(newValue);
    setActionLog("Bitwise Shift Right (>> 1). Everything divided by 2 (truncated).");
  };

  const getAsciiChar = () => {
    if (value >= 32 && value <= 126) return String.fromCharCode(value);
    return "N/A (Control/Extended)";
  };

  return (
    <section className="flex h-full w-full overflow-hidden">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0">
          <p className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-1">
            Tier 1 • Module 2
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Binary & Bitwise
          </h2>

          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 mb-4">
            <button
              onClick={() => setActiveTab("theory")}
              className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${activeTab === "theory" ? "bg-slate-800 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
            >
              Theory
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${activeTab === "code" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
            >
              Implementation
            </button>
          </div>

          <div className="flex justify-between items-center bg-slate-950 p-4 rounded-lg border border-slate-800 mb-6">
            <div>
              <p className="text-sm font-bold text-slate-400">Decimal Value</p>
              {/* <p className="text-3xl font-bold text-white">{value}</p> */}
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-400">ASCII Char</p>
              {/* <p className="text-3xl font-bold text-blue-400">
                {getAsciiChar()}
              </p> */}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0 flex flex-col">
          {activeTab === "theory" ? (
            <>
              <div className="space-y-6 flex-1 animate-fade-in">
                <div>
                  <h3 className="text-white font-bold mb-2 text-lg">
                    Base-2 Counting:
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Computers only understand physical electricity (On or Off).
                    Everything—numbers, text, and images—is stored as
                    combinations of 1s and 0s.
                  </p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                  <h4 className="text-blue-400 font-bold mb-2 text-sm">
                    Key Concepts:
                  </h4>
                  <ul className="text-slate-300 text-sm space-y-2 list-disc pl-4">
                    <li>
                      <strong>Bit:</strong> A single 0 or 1.
                    </li>
                    <li>
                      <strong>Byte:</strong> 8 Bits grouped together. It can
                      hold 256 different values (0 to 255).
                    </li>
                    <li>
                      <strong>Bitwise Shift:</strong> Shifting bits left `﹤﹤`
                      multiplies the number by 2. Shifting right `﹥﹥` divides
                      it by 2. It is exponentially faster than standard math.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 bg-slate-950 border border-blue-500/30 p-4 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <p className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-2">
                  Hardware Execution Log
                </p>
                <p className="text-sm text-white font-mono leading-relaxed">
                  {actionLog}
                </p>
              </div>
            </>
          ) : (
            <CodeViewer
              snippets={BINARY_CODE}
              explanation="Low-level bitwise manipulation is crucial in embedded systems, cryptography, and network engineering to optimize performance."
            />
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={1.2} />
              <BinaryVisualizer decimalValue={value} />
              <OrbitControls enableDamping minDistance={3} maxDistance={20} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        <div className="h-32 border-t border-slate-800 bg-slate-900 flex flex-col justify-center px-8 gap-3">
          <div className="flex justify-between w-full">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Manual Bit Toggles
            </p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Bitwise Operators
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            {/* The 8 Toggle Buttons */}
            <div className="flex gap-2">
              {bits.map((bit, index) => (
                <button
                  key={index}
                  onClick={() => toggleBit(index)}
                  className={`w-10 h-10 rounded font-bold transition active:scale-95 ${bit === 1 ? "bg-green-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}
                >
                  {bit}
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={shiftLeft}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition active:scale-95 shadow-md"
              >
                Shift Left (&lt;&lt;)
              </button>
              <button
                onClick={shiftRight}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition active:scale-95 shadow-md"
              >
                Shift Right (&gt;&gt;)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}