"use client";

import Link from "next/link";
import SolidVisualizer from "@/components/canvas/SolidVisualizer";

export default function SolidPage() {
  return (
    <section className="flex h-full w-full overflow-hidden">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0">
          <p className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-1">
            SWE Track • Module 3
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            The SOLID Principles
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
            <div>
              <p>
                In object-oriented architecture, writing code that works is
                easy. Writing code that is{" "}
                <strong className="text-amber-400">
                  highly cohesive and loosely coupled
                </strong>
                —meaning it can scale for years without breaking—is the real
                challenge.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h4 className="text-amber-400 font-bold mb-2 text-sm">S.O.L.</h4>
              <ul className="space-y-3 list-none text-xs text-slate-300">
                <li>
                  <strong className="text-cyan-400 text-sm block">
                    Single Responsibility:
                  </strong>
                  A class should only manage one domain. If a `User` class
                  authenticates credentials AND connects to the database,
                  changing the database risks breaking authentication.
                </li>
                <li>
                  <strong className="text-cyan-400 text-sm block">
                    Open-Closed:
                  </strong>
                  Achieved via Polymorphism. Instead of massive `switch`
                  statements to handle new behaviors, depend on an interface and
                  add new classes implementing it.
                </li>
                <li>
                  <strong className="text-cyan-400 text-sm block">
                    Liskov Substitution:
                  </strong>
                  If a function expects a `List`, you should be able to pass an
                  `ArrayList` or `LinkedList` without the program crashing.
                  Avoid forcing subclasses to throw `NotImplementedException`.
                </li>
              </ul>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h4 className="text-amber-400 font-bold mb-2 text-sm">
                I.D. (The Interface Rules)
              </h4>
              <ul className="space-y-3 list-none text-xs text-slate-300">
                <li>
                  <strong className="text-purple-400 text-sm block">
                    Interface Segregation:
                  </strong>
                  Don't build massive "God Interfaces." Break `IMachine` into
                  `IPrinter` and `IScanner` so classes aren't forced to
                  implement blank methods they don't need.
                </li>
                <li>
                  <strong className="text-purple-400 text-sm block">
                    Dependency Inversion:
                  </strong>
                  Core business logic should NEVER instantiate (`new`) low-level
                  details like databases. Inject dependencies via abstractions
                  (Dependency Injection).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <SolidVisualizer />
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            Use the inspector to view architectural state
          </p>
          <Link
            href="/swe/solid-principles/quiz"
            className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take the Exam →
          </Link>
        </div>
      </div>
    </section>
  );
}
