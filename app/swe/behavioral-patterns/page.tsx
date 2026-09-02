"use client";

import { useState } from "react";
import Link from "next/link";
import BehavioralVisualizer from "@/components/canvas/BehavioralVisualizer";
import CodeViewer from "@/components/ui/CodeViewer";

const STRATEGY_CODE = {
  "C++": `class IStrategy {
public:
    virtual void buildRoute(string a, string b) = 0;
};

class WalkStrategy : public IStrategy {
public:
    void buildRoute(string a, string b) override {
        cout << "Walking route from " << a << " to " << b;
    }
};

// The Context class
class Navigator {
private:
    IStrategy* strategy;
public:
    void setStrategy(IStrategy* s) { strategy = s; }
    void execute(string a, string b) { 
        strategy->buildRoute(a, b); 
    }
};`,
  Java: `interface RouteStrategy {
    void buildRoute(String a, String b);
}

class WalkingStrategy implements RouteStrategy {
    public void buildRoute(String a, String b) {
        System.out.println("Walking path...");
    }
}

class DrivingStrategy implements RouteStrategy {
    public void buildRoute(String a, String b) {
        System.out.println("Highway path...");
    }
}

class Navigator {
    private RouteStrategy strategy;
    public void setStrategy(RouteStrategy s) { this.strategy = s; }
    public void execute(String a, String b) {
        strategy.buildRoute(a, b); 
    }
}`,
  Kotlin: `// Kotlin can use higher-order functions instead of classes for Strategies!
class Navigator(var strategy: (String, String) -> Unit) {
    fun execute(a: String, b: String) {
        strategy(a, b) // Executes whatever function is currently injected
    }
}

fun main() {
    // Injecting the strategy as a simple lambda function
    val walkStrategy = { a: String, b: String -> println("Walking $a to $b") }
    
    val nav = Navigator(walkStrategy)
    nav.execute("Home", "Work")
}`,
  Python: `class RouteStrategy:
    def build_route(self, a, b): pass

class WalkingStrategy(RouteStrategy):
    def build_route(self, a, b):
        print("Walking path...")

class DrivingStrategy(RouteStrategy):
    def build_route(self, a, b):
        print("Highway path...")

class Navigator:
    def __init__(self, strategy: RouteStrategy):
        self.strategy = strategy
        
    def set_strategy(self, strategy: RouteStrategy):
        self.strategy = strategy
        
    def execute(self, a, b):
        self.strategy.build_route(a, b)`,
};

export default function BehavioralPage() {
  const [activeTab, setActiveTab] = useState<"theory" | "code" | "uml">(
    "theory",
  );

  return (
    <section className="flex h-full w-full overflow-hidden">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0">
          <p className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-1">
            SWE Track • Module 5
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Behavioral Patterns
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
                  Behavioral patterns define the communication architectures
                  between objects. Instead of hardcoding logic flows, they
                  utilize{" "}
                  <strong className="text-amber-400">
                    delegation and state inversion
                  </strong>{" "}
                  to make run-time execution flexible.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-amber-400 font-bold mb-2 text-sm">
                  The Strategy Pattern
                </h4>
                <p className="text-xs text-slate-400">
                  Eliminates massive conditionals (`if/else`) inside a Context
                  class. By extracting algorithms into separate classes
                  implementing an `IStrategy` interface, the Context can
                  hot-swap behavior at runtime purely via composition.
                </p>
              </div>
            </div>
          )}

          {activeTab === "code" && (
            <div className="animate-fade-in">
              <CodeViewer
                snippets={STRATEGY_CODE}
                explanation="The Navigator (Context) has zero knowledge of how routing actually works. It just calls strategy.buildRoute(), trusting the injected object."
              />
            </div>
          )}

          {activeTab === "uml" && (
            <div className="animate-fade-in flex flex-col items-center justify-center gap-6 pt-8">
              <div className="flex gap-12 w-full justify-center">
                <div className="border-2 border-blue-500 rounded bg-slate-900 w-36 text-center shadow-lg">
                  <div className="bg-blue-900/40 p-2 font-bold border-b border-blue-500 text-blue-300">
                    Context
                  </div>
                  <div className="p-2 text-xs font-mono text-slate-300">
                    - strategy
                    <br />+ execute()
                  </div>
                </div>

                <div className="border-2 border-purple-500 rounded bg-slate-900 w-40 text-center shadow-lg">
                  <div className="bg-purple-900/40 p-2 font-bold border-b border-purple-500 text-purple-300">
                    «interface»
                    <br />
                    IStrategy
                  </div>
                  <div className="p-2 text-xs font-mono text-slate-300">
                    + buildRoute()
                  </div>
                </div>
              </div>

              <div className="flex gap-4 ml-[120px]">
                <div className="border-2 border-emerald-500 rounded bg-slate-900 w-32 text-center shadow-lg">
                  <div className="bg-emerald-900/40 p-2 font-bold border-b border-emerald-500 text-emerald-300">
                    WalkStrategy
                  </div>
                  <div className="p-2 text-xs font-mono text-slate-300">
                    + buildRoute()
                  </div>
                </div>
                <div className="border-2 border-emerald-500 rounded bg-slate-900 w-32 text-center shadow-lg">
                  <div className="bg-emerald-900/40 p-2 font-bold border-b border-emerald-500 text-emerald-300">
                    DriveStrategy
                  </div>
                  <div className="p-2 text-xs font-mono text-slate-300">
                    + buildRoute()
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <BehavioralVisualizer />
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            Algorithm Swapping via Strategy
          </p>
          <Link
            href="/swe/behavioral-patterns/quiz"
            className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take the Exam →
          </Link>
        </div>
      </div>
    </section>
  );
}
