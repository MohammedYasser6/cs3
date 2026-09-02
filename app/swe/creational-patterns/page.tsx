"use client";

import { useState } from "react";
import Link from "next/link";
import CreationalVisualizer from "@/components/canvas/CreationalVisualizer";
import CodeViewer from "@/components/ui/CodeViewer";

const BUILDER_CODE = {
  "C++": `class Computer {
public:
    bool cpu = false, ram = false, gpu = false;
};

class Builder {
private:
    Computer pc;
public:
    // Returning references allows for Method Chaining
    Builder& buildCPU() { pc.cpu = true; return *this; }
    Builder& buildRAM() { pc.ram = true; return *this; }
    Builder& buildGPU() { pc.gpu = true; return *this; }
    
    Computer build() { return pc; }
};

// Usage: 
// Computer myPC = Builder().buildCPU().buildRAM().build();`,
  Java: `class Computer {
    public boolean hasGPU, hasRAM, hasCPU;
}

interface Builder {
    void buildCPU();
    void buildRAM();
    void buildGPU();
    Computer getResult();
}

class GamingPCBuilder implements Builder {
    private Computer pc = new Computer();
    
    public void buildCPU() { pc.hasCPU = true; }
    public void buildRAM() { pc.hasRAM = true; }
    public void buildGPU() { pc.hasGPU = true; }
    
    public Computer getResult() { return pc; }
}`,
  Kotlin: `class Computer(
    var cpu: Boolean = false,
    var ram: Boolean = false,
    var gpu: Boolean = false
)

fun main() {
    // Kotlin solves the Builder pattern natively using named arguments 
    // and the '.apply' scope function! No extra classes needed.
    val pc = Computer().apply {
        cpu = true
        ram = true
        gpu = true
    }
}`,
  Python: `class Computer:
    def __init__(self):
        self.gpu = self.ram = self.cpu = False

class GamingPCBuilder:
    def __init__(self):
        self.pc = Computer()
        
    # Returning 'self' allows for method chaining
    def build_cpu(self): 
        self.pc.cpu = True
        return self
        
    def build_ram(self): 
        self.pc.ram = True
        return self
    
    def get_result(self): 
        return self.pc`,
};

export default function CreationalPage() {
  const [activeTab, setActiveTab] = useState<"theory" | "code" | "uml">(
    "theory",
  );

  return (
    <section className="flex h-full w-full overflow-hidden">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0">
          <p className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-1">
            SWE Track • Module 6
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Creational Patterns
          </h2>

          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 mb-6">
            <button
              onClick={() => setActiveTab("theory")}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "theory" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              Theory
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "code" ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              Code
            </button>
            <button
              onClick={() => setActiveTab("uml")}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "uml" ? "bg-purple-600 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              UML Diagram
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          {activeTab === "theory" && (
            <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
              <div>
                <p>
                  Using the `new` keyword everywhere creates tight coupling.
                  Creational patterns abstract the instantiation process, hiding
                  messy logic and separating construction from representation.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-amber-400 font-bold mb-2 text-sm">
                  The Builder Pattern
                </h4>
                <p className="text-xs text-slate-400">
                  Solves the{" "}
                  <strong className="text-rose-400">
                    "Telescoping Constructor"
                  </strong>{" "}
                  problem where a class requires 10 optional parameters. The
                  Builder isolates object construction into discrete steps
                  (`buildCPU()`, `buildRAM()`), returning the final object only
                  when `getResult()` is called.
                </p>
              </div>
            </div>
          )}

          {activeTab === "code" && (
            <div className="animate-fade-in">
              <CodeViewer
                snippets={BUILDER_CODE}
                explanation="The Director dictates the sequence of building steps, but the Concrete Builder handles the actual construction logic. This prevents your core code from being cluttered with instantiation details."
              />
            </div>
          )}

          {activeTab === "uml" && (
            <div className="animate-fade-in flex flex-col items-center justify-center gap-6 pt-8">
              <div className="flex gap-8 w-full justify-center">
                <div className="border-2 border-blue-500 rounded bg-slate-900 w-32 text-center shadow-lg">
                  <div className="bg-blue-900/40 p-2 font-bold border-b border-blue-500 text-blue-300">
                    Director
                  </div>
                  <div className="p-2 text-xs font-mono text-slate-300">
                    + construct()
                  </div>
                </div>

                <div className="border-2 border-purple-500 rounded bg-slate-900 w-44 text-center shadow-lg">
                  <div className="bg-purple-900/40 p-2 font-bold border-b border-purple-500 text-purple-300">
                    «interface»
                    <br />
                    IBuilder
                  </div>
                  <div className="p-2 text-xs font-mono text-slate-300">
                    + buildCPU()
                    <br />+ buildRAM()
                    <br />+ getResult()
                  </div>
                </div>
              </div>

              <div className="flex gap-8 ml-[100px]">
                <div className="border-2 border-emerald-500 rounded bg-slate-900 w-40 text-center shadow-lg">
                  <div className="bg-emerald-900/40 p-2 font-bold border-b border-emerald-500 text-emerald-300">
                    GamingBuilder
                  </div>
                  <div className="p-2 text-xs font-mono text-slate-300">
                    + buildCPU()
                    <br />+ getResult()
                  </div>
                </div>
                <div className="border-2 border-slate-500 rounded bg-slate-900 w-32 text-center shadow-lg border-dashed">
                  <div className="bg-slate-800 p-2 font-bold border-b border-slate-500 text-slate-300">
                    Computer
                  </div>
                  <div className="p-2 text-xs font-mono text-slate-400">
                    The Product
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <CreationalVisualizer />
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            Step-by-step Construction via Builder
          </p>
          <Link
            href="/swe/creational-patterns/quiz"
            className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take Final Exam →
          </Link>
        </div>
      </div>
    </section>
  );
}
