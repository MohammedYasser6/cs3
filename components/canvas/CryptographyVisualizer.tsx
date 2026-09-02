"use client";

import { useState, useEffect } from "react";
import {
  Play,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Cpu,
  KeyRound,
  Sparkles,
} from "lucide-react";

type Stage =
  | "init"
  | "subBytes"
  | "shiftRows"
  | "mixColumns"
  | "addRoundKey"
  | "completed";

export default function CryptographyVisualizer() {
  const [inputText, setInputText] = useState("ATTACK AT DAWN!");
  const [currentRound, setCurrentRound] = useState(1);
  const [stage, setStage] = useState<Stage>("init");
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // 4x4 State Matrix of bytes (stored as numbers 0-255)
  const [stateMatrix, setStateMatrix] = useState<number[][]>([]);
  // 4x4 Round Key
  const [roundKey, setRoundKey] = useState<number[][]>([]);

  // Initialize 4x4 Matrix from string
  const initializeState = (text: string) => {
    const padded = (text + "                ").slice(0, 16);
    const matrix: number[][] = Array.from({ length: 4 }, () =>
      Array(4).fill(0),
    );
    const keyMatrix: number[][] = Array.from({ length: 4 }, () =>
      Array(4).fill(0),
    );

    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 4; row++) {
        const charIdx = col * 4 + row;
        matrix[row][col] = padded.charCodeAt(charIdx);
        // Deterministic pseudo-round key bytes
        keyMatrix[row][col] = (charIdx * 37 + 101) % 256;
      }
    }
    setStateMatrix(matrix);
    setRoundKey(keyMatrix);
    setStage("init");
    setCurrentRound(1);
  };

  useEffect(() => {
    initializeState(inputText);
  }, [inputText]);

  // Step to next AES operation
  const stepForward = () => {
    if (stage === "init") {
      // 1. SubBytes: non-linear substitution
      setStateMatrix((prev) =>
        prev.map((row) => row.map((byte) => (byte * 31 + 17) % 256)),
      );
      setStage("subBytes");
    } else if (stage === "subBytes") {
      // 2. ShiftRows: Row 0 shifted 0, Row 1 shifted 1, Row 2 shifted 2, Row 3 shifted 3
      setStateMatrix((prev) => [
        [...prev[0]],
        [prev[1][1], prev[1][2], prev[1][3], prev[1][0]],
        [prev[2][2], prev[2][3], prev[2][0], prev[2][1]],
        [prev[3][3], prev[3][0], prev[3][1], prev[3][2]],
      ]);
      setStage("shiftRows");
    } else if (stage === "shiftRows") {
      // 3. MixColumns: Linear diffusion across columns
      setStateMatrix((prev) => {
        const next = Array.from({ length: 4 }, () => Array(4).fill(0));
        for (let c = 0; c < 4; c++) {
          next[0][c] = (prev[0][c] ^ prev[1][c] ^ prev[2][c]) % 256;
          next[1][c] = (prev[1][c] ^ prev[2][c] ^ prev[3][c]) % 256;
          next[2][c] = (prev[2][c] ^ prev[3][c] ^ prev[0][c]) % 256;
          next[3][c] = (prev[3][c] ^ prev[0][c] ^ prev[1][c]) % 256;
        }
        return next;
      });
      setStage("mixColumns");
    } else if (stage === "mixColumns") {
      // 4. AddRoundKey: XOR with round key
      setStateMatrix((prev) =>
        prev.map((row, r) => row.map((byte, c) => byte ^ roundKey[r][c])),
      );
      setStage("addRoundKey");
    } else if (stage === "addRoundKey") {
      if (currentRound < 3) {
        setCurrentRound((r) => r + 1);
        setStage("init");
      } else {
        setStage("completed");
        setIsAutoPlaying(false);
      }
    } else {
      initializeState(inputText);
    }
  };

  // Auto-play loop
  useEffect(() => {
    if (!isAutoPlaying || stage === "completed") return;
    const interval = setTimeout(() => {
      stepForward();
    }, 900);
    return () => clearTimeout(interval);
  }, [isAutoPlaying, stage, currentRound]);

  const toHex = (num: number) =>
    num.toString(16).padStart(2, "0").toUpperCase();

  const getStageDescription = () => {
    switch (stage) {
      case "init":
        return {
          title: `Round ${currentRound}: Initial State Matrix`,
          detail:
            "Plaintext 16 bytes loaded into a 4x4 matrix column-by-column.",
          tag: "Plaintext Ready",
          tagColor: "border-slate-700 bg-slate-800 text-slate-300",
        };
      case "subBytes":
        return {
          title: "Step 1: SubBytes (S-Box Substitution)",
          detail:
            "Each byte is replaced with a value from the Rijndael S-Box lookup table, adding non-linearity to prevent linear cryptanalysis.",
          tag: "Confusion Phase",
          tagColor: "border-emerald-500 bg-emerald-950/60 text-emerald-300",
        };
      case "shiftRows":
        return {
          title: "Step 2: ShiftRows (Row Permutation)",
          detail:
            "Bytes in each row are shifted left cyclically by an offset matching the row index (Row 0: 0, Row 1: 1, Row 2: 2, Row 3: 3).",
          tag: "Diffusion Phase",
          tagColor: "border-cyan-500 bg-cyan-950/60 text-cyan-300",
        };
      case "mixColumns":
        return {
          title: "Step 3: MixColumns (Galois Field Multiplication)",
          detail:
            "Each column is transformed using matrix multiplication over GF(2^8), spreading each input byte's influence across the entire 4-byte column.",
          tag: "Avalanche Mixing",
          tagColor: "border-blue-500 bg-blue-950/60 text-blue-300",
        };
      case "addRoundKey":
        return {
          title: "Step 4: AddRoundKey (XOR Mixing)",
          detail:
            "The 128-bit state matrix is bitwise XORed with the derived subkey for this round.",
          tag: "Key Schedule Injection",
          tagColor: "border-amber-500 bg-amber-950/60 text-amber-300",
        };
      case "completed":
        return {
          title: "Ciphertext Block Finalized",
          detail:
            "All rounds complete. The original plaintext is completely diffused and irreversible without the private symmetric key.",
          tag: "Encrypted State",
          tagColor: "border-purple-500 bg-purple-950/60 text-purple-300",
        };
    }
  };

  const info = getStageDescription();

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      {/* Top Controller */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6 z-10 gap-4">
        <div>
          <h3 className="text-sm font-bold tracking-wider text-emerald-500 uppercase flex items-center gap-2">
            <Cpu className="h-4 w-4" /> AES-128 Encryption Engine
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Visualize the inner mathematical rounds transforming plaintext into
            ciphertext.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            maxLength={16}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="16-char plaintext"
            className="w-44 bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
          />

          <button
            onClick={stepForward}
            disabled={isAutoPlaying}
            className="flex items-center gap-2 rounded bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-50"
          >
            <ArrowRight className="h-4 w-4" /> Step
          </button>

          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`flex items-center gap-2 rounded px-4 py-2 text-xs font-bold transition-all ${
              isAutoPlaying
                ? "bg-amber-600 text-white"
                : "border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Play className="h-4 w-4" /> {isAutoPlaying ? "Pause" : "Auto-Run"}
          </button>

          <button
            onClick={() => initializeState(inputText)}
            className="flex items-center justify-center rounded border border-slate-700 bg-slate-800 p-2 text-slate-400 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="relative flex-1 bg-black p-6 flex flex-col items-center justify-center overflow-hidden gap-6">
        {/* Stage Status Badge */}
        <div className="flex flex-col items-center text-center max-w-xl animate-fade-in">
          <span
            className={`px-4 py-1 rounded-full border text-xs font-bold uppercase tracking-widest mb-2 ${info.tagColor}`}
          >
            {info.tag}
          </span>
          <h4 className="text-xl font-black text-white">{info.title}</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {info.detail}
          </p>
        </div>

        {/* Matrix Comparison Container */}
        <div className="flex flex-wrap items-center justify-center gap-8 z-20">
          {/* Active State 4x4 Matrix */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-2 px-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                State Matrix ($4 \times 4$)
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                {stage === "completed"
                  ? "Ciphertext Output"
                  : `Round ${currentRound}/3`}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 bg-slate-900/80 border-2 border-slate-800 p-3 rounded-xl shadow-2xl backdrop-blur-md">
              {stateMatrix.map((row, rIdx) =>
                row.map((byte, cIdx) => {
                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className={`h-14 w-14 rounded-lg border flex flex-col items-center justify-center transition-all duration-300 ${
                        stage === "subBytes"
                          ? "border-emerald-500 bg-emerald-950/40 text-emerald-300 scale-105"
                          : stage === "shiftRows"
                            ? "border-cyan-500 bg-cyan-950/40 text-cyan-300"
                            : stage === "mixColumns"
                              ? "border-blue-500 bg-blue-950/40 text-blue-300 scale-105"
                              : stage === "addRoundKey"
                                ? "border-amber-500 bg-amber-950/40 text-amber-300 scale-105"
                                : stage === "completed"
                                  ? "border-purple-500 bg-purple-950/40 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                                  : "border-slate-800 bg-slate-950 text-slate-300"
                      }`}
                    >
                      <span className="font-mono text-base font-bold">
                        {toHex(byte)}
                      </span>
                      <span className="font-mono text-[9px] text-slate-500 truncate max-w-[48px]">
                        {byte >= 32 && byte <= 126
                          ? String.fromCharCode(byte)
                          : `b${byte}`}
                      </span>
                    </div>
                  );
                }),
              )}
            </div>
          </div>

          {/* Math Operator Indicator */}
          {stage === "addRoundKey" && (
            <div className="flex flex-col items-center justify-center animate-pulse">
              <span className="text-3xl font-black text-amber-400 font-mono">
                ⊕
              </span>
              <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">
                XOR
              </span>
            </div>
          )}

          {/* Round Key 4x4 Matrix (Shown during AddRoundKey) */}
          {stage === "addRoundKey" && (
            <div className="flex flex-col items-center animate-fade-in">
              <div className="flex items-center gap-2 mb-2 px-1 text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                <KeyRound className="h-3 w-3" /> Round {currentRound} Subkey
              </div>

              <div className="grid grid-cols-4 gap-2 bg-amber-950/20 border border-amber-900/60 p-3 rounded-xl">
                {roundKey.map((row, rIdx) =>
                  row.map((byte, cIdx) => (
                    <div
                      key={`key-${rIdx}-${cIdx}`}
                      className="h-14 w-14 rounded-lg border border-amber-800/50 bg-slate-950/80 flex items-center justify-center font-mono text-sm font-bold text-amber-400"
                    >
                      {toHex(byte)}
                    </div>
                  )),
                )}
              </div>
            </div>
          )}
        </div>

        {/* Live Ciphertext Bar */}
        <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between z-20">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
              Resulting 128-Bit Hex Stream
            </span>
            <span className="font-mono text-xs text-emerald-400 break-all font-bold">
              {stateMatrix.flat().map(toHex).join(" ")}
            </span>
          </div>

          {stage === "completed" && (
            <div className="flex items-center gap-1.5 text-xs text-purple-400 font-bold bg-purple-950/40 px-3 py-1.5 rounded-lg border border-purple-800/50">
              <Sparkles className="h-4 w-4" /> Ready to Transmit
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
