"use client";

import { useState, useEffect } from "react";
import {
  Play,
  RotateCcw,
  ArrowRight,
  Cpu,
  KeyRound,
  Sparkles,
  LayoutGrid,
  Network,
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
  const [viewMode, setViewMode] = useState<"matrix" | "pipeline">("matrix");

  const [stateMatrix, setStateMatrix] = useState<number[][]>([]);
  const [roundKey, setRoundKey] = useState<number[][]>([]);

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

  const stepForward = () => {
    if (stage === "init") {
      setStateMatrix((prev) =>
        prev.map((row) => row.map((byte) => (byte * 31 + 17) % 256)),
      );
      setStage("subBytes");
    } else if (stage === "subBytes") {
      setStateMatrix((prev) => [
        [...prev[0]],
        [prev[1][1], prev[1][2], prev[1][3], prev[1][0]],
        [prev[2][2], prev[2][3], prev[2][0], prev[2][1]],
        [prev[3][3], prev[3][0], prev[3][1], prev[3][2]],
      ]);
      setStage("shiftRows");
    } else if (stage === "shiftRows") {
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
          title: `Round ${currentRound}: Initial State`,
          detail:
            "Plaintext 16 bytes loaded into a 4x4 matrix column-by-column.",
          tag: "Plaintext Ready",
          tagColor: "border-slate-700 bg-slate-800 text-slate-300",
        };
      case "subBytes":
        return {
          title: "Step 1: SubBytes",
          detail:
            "Each byte is replaced with a value from the Rijndael S-Box lookup table.",
          tag: "Confusion Phase",
          tagColor: "border-emerald-500 bg-emerald-950/60 text-emerald-300",
        };
      case "shiftRows":
        return {
          title: "Step 2: ShiftRows",
          detail:
            "Bytes in each row are shifted left cyclically by an offset matching the row index.",
          tag: "Diffusion Phase",
          tagColor: "border-cyan-500 bg-cyan-950/60 text-cyan-300",
        };
      case "mixColumns":
        return {
          title: "Step 3: MixColumns",
          detail:
            "Each column is transformed using matrix multiplication over GF(2^8).",
          tag: "Avalanche Mixing",
          tagColor: "border-blue-500 bg-blue-950/60 text-blue-300",
        };
      case "addRoundKey":
        return {
          title: "Step 4: AddRoundKey",
          detail:
            "The 128-bit state matrix is bitwise XORed with the derived subkey for this round.",
          tag: "Key Schedule Injection",
          tagColor: "border-amber-500 bg-amber-950/60 text-amber-300",
        };
      case "completed":
        return {
          title: "Ciphertext Finalized",
          detail:
            "All rounds complete. The original plaintext is completely diffused.",
          tag: "Encrypted State",
          tagColor: "border-purple-500 bg-purple-950/60 text-purple-300",
        };
    }
  };

  const info = getStageDescription();
  const currentHexFlat = stateMatrix.flat().map(toHex).join(" ");

  const pipelineStages: { id: Stage; label: string; color: string }[] = [
    {
      id: "init",
      label: "Input Block",
      color: "text-slate-400 border-slate-500",
    },
    {
      id: "subBytes",
      label: "SubBytes",
      color: "text-emerald-400 border-emerald-500",
    },
    {
      id: "shiftRows",
      label: "ShiftRows",
      color: "text-cyan-400 border-cyan-500",
    },
    {
      id: "mixColumns",
      label: "MixColumns",
      color: "text-blue-400 border-blue-500",
    },
    {
      id: "addRoundKey",
      label: "AddRoundKey",
      color: "text-amber-400 border-amber-500",
    },
    {
      id: "completed",
      label: "Ciphertext",
      color: "text-purple-400 border-purple-500",
    },
  ];

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      {/* Top Controller */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-900/50 p-4 z-10 gap-4">
        <div>
          <h3 className="text-sm font-bold tracking-wider text-emerald-500 uppercase flex items-center gap-2">
            <Cpu className="h-4 w-4" /> AES-128 Engine
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Visualize the mathematical rounds transforming plaintext into
            ciphertext.
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setViewMode("matrix")}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded transition-colors ${viewMode === "matrix" ? "bg-slate-800 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
          >
            <LayoutGrid className="h-4 w-4" /> Matrix View
          </button>
          <button
            onClick={() => setViewMode("pipeline")}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded transition-colors ${viewMode === "pipeline" ? "bg-slate-800 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
          >
            <Network className="h-4 w-4" /> Pipeline Flow
          </button>
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
            className="flex items-center gap-2 rounded bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-all disabled:opacity-50"
          >
            <ArrowRight className="h-4 w-4" /> Step
          </button>
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`flex items-center gap-2 rounded px-4 py-2 text-xs font-bold transition-all ${isAutoPlaying ? "bg-amber-600 text-white" : "border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
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

      {/* Main Workspace (FIXED LAYOUT) */}
      <div className="relative flex-1 bg-black p-6 flex flex-col items-center overflow-hidden">
        {/* Stage Status Badge (Now safely in normal flow) */}
        <div className="flex flex-col items-center text-center max-w-xl animate-fade-in z-20 mt-2 mb-6 min-h-[100px]">
          <span
            className={`px-4 py-1 rounded-full border text-xs font-bold uppercase tracking-widest mb-2 ${info.tagColor}`}
          >
            {info.tag}
          </span>
          <h4 className="text-xl font-black text-white">{info.title}</h4>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed bg-black/50 px-4 py-1 rounded-full backdrop-blur-sm">
            {info.detail}
          </p>
        </div>

        {/* View Container (Centers remaining content perfectly) */}
        <div className="flex-1 w-full flex items-center justify-center">
          {/* MATRIX VIEW */}
          {viewMode === "matrix" && (
            <div className="flex flex-col items-center justify-center w-full animate-fade-in">
              <div className="flex flex-wrap items-center justify-center gap-8 z-20">
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
                      row.map((byte, cIdx) => (
                        <div
                          key={`matrix-${rIdx}-${cIdx}`}
                          className={`h-14 w-14 rounded-lg border flex flex-col items-center justify-center transition-all duration-300 ${stage === "subBytes" ? "border-emerald-500 bg-emerald-950/40 text-emerald-300 scale-105" : stage === "shiftRows" ? "border-cyan-500 bg-cyan-950/40 text-cyan-300" : stage === "mixColumns" ? "border-blue-500 bg-blue-950/40 text-blue-300 scale-105" : stage === "addRoundKey" ? "border-amber-500 bg-amber-950/40 text-amber-300 scale-105" : stage === "completed" ? "border-purple-500 bg-purple-950/40 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.4)]" : "border-slate-800 bg-slate-950 text-slate-300"}`}
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
                      )),
                    )}
                  </div>
                </div>

                {stage === "addRoundKey" && (
                  <div className="flex flex-col items-center justify-center animate-pulse mx-4">
                    <span className="text-3xl font-black text-amber-400 font-mono">
                      ⊕
                    </span>
                    <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">
                      XOR
                    </span>
                  </div>
                )}

                {stage === "addRoundKey" && (
                  <div className="flex flex-col items-center animate-fade-in">
                    <div className="flex items-center gap-2 mb-2 px-1 text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                      <KeyRound className="h-3 w-3" /> Round {currentRound}{" "}
                      Subkey
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

              <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between z-20 mt-12">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
                    Resulting 128-Bit Hex Stream
                  </span>
                  <span className="font-mono text-xs text-emerald-400 break-all font-bold">
                    {currentHexFlat}
                  </span>
                </div>
                {stage === "completed" && (
                  <div className="flex items-center gap-1.5 text-xs text-purple-400 font-bold bg-purple-950/40 px-3 py-1.5 rounded-lg border border-purple-800/50">
                    <Sparkles className="h-4 w-4" /> Ready to Transmit
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PIPELINE VIEW */}
          {viewMode === "pipeline" && (
            <div className="flex items-center justify-center w-full animate-fade-in pb-12">
              <div className="flex flex-col items-center justify-center w-full max-w-6xl relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 -z-10" />
                <div className="flex items-center justify-between w-full relative z-10 px-4">
                  {pipelineStages.map((pipeStage, idx) => {
                    const isActive = stage === pipeStage.id;
                    const isPast =
                      pipelineStages.findIndex((s) => s.id === stage) > idx;

                    return (
                      <div
                        key={pipeStage.id}
                        className="flex flex-col items-center gap-4 relative"
                      >
                        <span
                          className={`text-[10px] uppercase font-bold tracking-widest ${isActive ? pipeStage.color.split(" ")[0] : "text-slate-500"}`}
                        >
                          {pipeStage.label}
                        </span>
                        <div
                          className={`relative flex items-center justify-center h-24 w-32 rounded-xl border-2 bg-slate-900 shadow-2xl transition-all duration-500 ${isActive ? `${pipeStage.color.split(" ")[1]} scale-110 shadow-[0_0_20px_rgba(255,255,255,0.1)]` : isPast ? "border-slate-700 bg-slate-900/50 opacity-60" : "border-slate-800 bg-black/50 opacity-40"}`}
                        >
                          {isActive && (
                            <div className="absolute flex flex-col items-center justify-center text-center animate-fade-in px-2">
                              <span className="text-[8px] font-mono text-slate-400 mb-1">
                                DATA CHUNK
                              </span>
                              <span
                                className={`text-xs font-mono font-bold leading-tight tracking-tighter ${pipeStage.color.split(" ")[0]} text-center break-words max-w-[100px]`}
                              >
                                {currentHexFlat.substring(0, 17)}...
                              </span>
                            </div>
                          )}
                          {isPast && !isActive && (
                            <span className="text-slate-600 font-black">✓</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="absolute -bottom-16 text-xs text-slate-500 font-mono text-center px-4">
                  The 16-byte data block travels linearly through the algorithm,
                  changing its hex signature completely at each isolated
                  transformation step.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
