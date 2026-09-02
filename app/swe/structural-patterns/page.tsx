"use client";

import { useState } from "react";
import Link from "next/link";
import StructuralVisualizer from "@/components/canvas/StructuralVisualizer";
import CodeViewer from "@/components/ui/CodeViewer"; // Assuming your path from earlier

const DECORATOR_CODE = {
  "C++": `class Notifier {
public:
    virtual void send(string msg) = 0;
};

class BaseNotifier : public Notifier {
public:
    void send(string msg) override { cout << "Email: " << msg; }
};

class Decorator : public Notifier {
protected:
    Notifier* wrappee;
public:
    Decorator(Notifier* n) : wrappee(n) {}
    void send(string msg) override { wrappee->send(msg); }
};

class SlackDecorator : public Decorator {
public:
    SlackDecorator(Notifier* n) : Decorator(n) {}
    void send(string msg) override {
        Decorator::send(msg); // Fire wrapped logic
        cout << "Slack: " << msg; // Add new behavior
    }
};`,
  Java: `interface Notifier {
    void send(String msg);
}

class BaseNotifier implements Notifier {
    public void send(String msg) { System.out.println("Email: " + msg); }
}

abstract class Decorator implements Notifier {
    protected Notifier wrappee;
    public Decorator(Notifier n) { this.wrappee = n; }
    public void send(String msg) { wrappee.send(msg); }
}

class SlackDecorator extends Decorator {
    public SlackDecorator(Notifier n) { super(n); }
    public void send(String msg) {
        super.send(msg);
        System.out.println("Slack: " + msg);
    }
}`,
  Kotlin: `interface Notifier {
    fun send(msg: String)
}

class BaseNotifier : Notifier {
    override fun send(msg: String) = println("Email: $msg")
}

// Kotlin has built-in Decorator support via the 'by' keyword!
class SlackDecorator(private val wrappee: Notifier) : Notifier by wrappee {
    override fun send(msg: String) {
        wrappee.send(msg) // Original behavior
        println("Slack: $msg") // Added behavior
    }
}`,
  Python: `class Notifier:
    def send(self, msg): pass

class BaseNotifier(Notifier):
    def send(self, msg):
        print(f"Email: {msg}")

class Decorator(Notifier):
    def __init__(self, wrappee: Notifier):
        self.wrappee = wrappee
    def send(self, msg):
        self.wrappee.send(msg)

class SlackDecorator(Decorator):
    def send(self, msg):
        super().send(msg)
        print(f"Slack: {msg}")`,
};

export default function StructuralPage() {
  const [activeTab, setActiveTab] = useState<"theory" | "code" | "uml">(
    "theory",
  );

  return (
    <section className="flex h-full w-full overflow-hidden">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0">
          <p className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-1">
            SWE Track • Module 4
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Structural Patterns
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
                  Structural patterns deal with object composition. They solve
                  the problem of assembling classes into larger structures
                  without hardcoding them, preventing the dreaded{" "}
                  <strong className="text-rose-400">"Class Explosion"</strong>{" "}
                  anti-pattern.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-amber-400 font-bold mb-2 text-sm">
                  The Decorator Pattern
                </h4>
                <p className="text-xs text-slate-400 mb-2">
                  If you have a `Notifier` class, and you want SMS, Slack, and
                  Email notifications, inheritance forces you to build
                  `SmsSlackNotifier`, `EmailSmsNotifier`, etc.
                </p>
                <p className="text-xs text-slate-400">
                  <strong className="text-emerald-400">Solution:</strong>{" "}
                  Implement a Decorator that wraps the original object,
                  implementing the exact same interface, but injecting new
                  behavior before delegating to the wrapped object.
                </p>
              </div>
            </div>
          )}

          {activeTab === "code" && (
            <div className="animate-fade-in">
              <CodeViewer
                snippets={DECORATOR_CODE}
                explanation="Notice how SlackDecorator calls super.send(msg) first. We aren't altering the BaseNotifier; we are wrapping it like layers of an onion."
              />
            </div>
          )}

          {activeTab === "uml" && (
            <div className="animate-fade-in flex flex-col items-center justify-center gap-6 pt-8">
              <div className="border-2 border-purple-500 rounded bg-slate-900 w-48 text-center shadow-lg">
                <div className="bg-purple-900/40 p-2 font-bold border-b border-purple-500 text-purple-300">
                  «interface»
                  <br />
                  Notifier
                </div>
                <div className="p-2 text-xs font-mono text-slate-300">
                  + send(msg)
                </div>
              </div>

              <div className="flex gap-4">
                <div className="border-2 border-blue-500 rounded bg-slate-900 w-32 text-center shadow-lg">
                  <div className="bg-blue-900/40 p-2 font-bold border-b border-blue-500 text-blue-300">
                    BaseNotifier
                  </div>
                  <div className="p-2 text-xs font-mono text-slate-300">
                    + send()
                  </div>
                </div>

                <div className="border-2 border-emerald-500 rounded bg-slate-900 w-48 text-center relative shadow-lg">
                  <div className="bg-emerald-900/40 p-2 font-bold border-b border-emerald-500 text-emerald-300">
                    Decorator Base
                  </div>
                  <div className="p-2 text-xs font-mono text-slate-300">
                    - wrappee: Notifier
                    <br />+ send()
                  </div>
                </div>
              </div>

              <div className="border-2 border-emerald-500 rounded bg-slate-900 w-48 text-center shadow-lg ml-[130px]">
                <div className="bg-emerald-900/40 p-2 font-bold border-b border-emerald-500 text-emerald-300">
                  SlackDecorator
                </div>
                <div className="p-2 text-xs font-mono text-slate-300">
                  + send()
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <StructuralVisualizer />
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            Structural Composition Explorer
          </p>
          <Link
            href="/swe/structural-patterns/quiz"
            className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take the Exam →
          </Link>
        </div>
      </div>
    </section>
  );
}
