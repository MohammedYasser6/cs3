"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

const PRINCIPLES = [
  {
    id: "S",
    title: "Single Responsibility",
    desc: "A class should have only one reason to change. High cohesion, low coupling.",
  },
  {
    id: "O",
    title: "Open-Closed",
    desc: "Software entities should be open for extension (polymorphism), but closed for modification.",
  },
  {
    id: "L",
    title: "Liskov Substitution",
    desc: "Derived classes must be completely substitutable for their base classes without breaking functionality.",
  },
  {
    id: "I",
    title: "Interface Segregation",
    desc: "Do not force clients to depend on interfaces they don't use. Favor many small interfaces over one fat interface.",
  },
  {
    id: "D",
    title: "Dependency Inversion",
    desc: "High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces).",
  },
];

export default function SolidVisualizer() {
  const [activeTab, setActiveTab] = useState("S");
  const [isGoodDesign, setIsGoodDesign] = useState(true);

  const renderDiagram = () => {
    switch (activeTab) {
      case "S":
        return isGoodDesign ? (
          <g className="animate-fade-in text-xs font-bold">
            <rect
              x="250"
              y="40"
              width="120"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text x="310" y="65" fill="#60a5fa" textAnchor="middle">
              UserAuth
            </text>

            <rect
              x="100"
              y="160"
              width="120"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#10b981"
              strokeWidth="2"
            />
            <text x="160" y="185" fill="#34d399" textAnchor="middle">
              EmailService
            </text>

            <rect
              x="400"
              y="160"
              width="120"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#f59e0b"
              strokeWidth="2"
            />
            <text x="460" y="185" fill="#fbbf24" textAnchor="middle">
              UserRepository
            </text>

            <path
              d="M 310 80 L 160 160"
              stroke="#475569"
              strokeWidth="2"
              strokeDasharray="5 5"
            />
            <path
              d="M 310 80 L 460 160"
              stroke="#475569"
              strokeWidth="2"
              strokeDasharray="5 5"
            />

            <text x="310" y="240" fill="#94a3b8" textAnchor="middle">
              Decoupled: Changes to DB don't affect Email logic.
            </text>
          </g>
        ) : (
          <g className="animate-fade-in text-xs">
            <rect
              x="200"
              y="60"
              width="220"
              height="140"
              rx="8"
              fill="#4c0519"
              stroke="#e11d48"
              strokeWidth="2"
            />
            <text
              x="310"
              y="90"
              fill="#f43f5e"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
            >
              GodUser Class
            </text>
            <text x="310" y="120" fill="#fda4af" textAnchor="middle">
              - AuthenticateUser()
            </text>
            <text x="310" y="140" fill="#fda4af" textAnchor="middle">
              - SendWelcomeEmail()
            </text>
            <text x="310" y="160" fill="#fda4af" textAnchor="middle">
              - SaveToSQLDatabase()
            </text>
            <text x="310" y="180" fill="#fda4af" textAnchor="middle">
              - GeneratePDFReports()
            </text>

            <text
              x="310"
              y="240"
              fill="#fca5a5"
              textAnchor="middle"
              fontWeight="bold"
            >
              Tightly Coupled: Touching one method risks breaking everything.
            </text>
          </g>
        );
      case "O":
        return isGoodDesign ? (
          <g className="animate-fade-in text-xs font-bold">
            <rect
              x="250"
              y="40"
              width="120"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#a855f7"
              strokeWidth="2"
            />
            <text x="310" y="65" fill="#c084fc" textAnchor="middle">
              «IPayment»
            </text>

            <rect
              x="100"
              y="140"
              width="100"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text x="150" y="165" fill="#60a5fa" textAnchor="middle">
              PayPal
            </text>

            <rect
              x="260"
              y="140"
              width="100"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text x="310" y="165" fill="#60a5fa" textAnchor="middle">
              Stripe
            </text>

            <rect
              x="420"
              y="140"
              width="100"
              height="40"
              rx="4"
              fill="#064e3b"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <text x="470" y="165" fill="#34d399" textAnchor="middle">
              + Crypto
            </text>

            <path d="M 310 80 L 150 140" stroke="#a855f7" strokeWidth="2" />
            <path d="M 310 80 L 310 140" stroke="#a855f7" strokeWidth="2" />
            <path
              d="M 310 80 L 470 140"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            <text x="310" y="240" fill="#94a3b8" textAnchor="middle">
              Extension via Polymorphism: Add Crypto without changing core code.
            </text>
          </g>
        ) : (
          <g className="animate-fade-in text-xs font-mono">
            <rect
              x="200"
              y="60"
              width="220"
              height="140"
              rx="8"
              fill="#4c0519"
              stroke="#e11d48"
              strokeWidth="2"
            />
            <text
              x="310"
              y="90"
              fill="#f43f5e"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
            >
              PaymentProcessor
            </text>
            <text x="310" y="120" fill="#fda4af" textAnchor="middle">
              if (type == "paypal") doX();
            </text>
            <text x="310" y="140" fill="#fda4af" textAnchor="middle">
              else if (type == "stripe") doY();
            </text>
            <text x="310" y="160" fill="#fda4af" textAnchor="middle">
              else if (type == "apple") doZ();
            </text>
            <text
              x="310"
              y="180"
              fill="#fca5a5"
              textAnchor="middle"
              fontWeight="bold"
            >
              else if (type == "crypto") ... // Modifying existing class!
            </text>
          </g>
        );
      case "L":
        return isGoodDesign ? (
          <g className="animate-fade-in text-xs font-bold">
            <rect
              x="250"
              y="40"
              width="120"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text x="310" y="65" fill="#60a5fa" textAnchor="middle">
              «IFlyingBird»
            </text>

            <rect
              x="180"
              y="140"
              width="120"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#10b981"
              strokeWidth="2"
            />
            <text x="240" y="165" fill="#34d399" textAnchor="middle">
              Eagle
            </text>

            <rect
              x="320"
              y="140"
              width="120"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#10b981"
              strokeWidth="2"
            />
            <text x="380" y="165" fill="#34d399" textAnchor="middle">
              Sparrow
            </text>

            <rect
              x="250"
              y="210"
              width="120"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#f59e0b"
              strokeWidth="2"
            />
            <text x="310" y="235" fill="#fbbf24" textAnchor="middle">
              Penguin (Flightless)
            </text>

            <path d="M 310 80 L 240 140" stroke="#3b82f6" strokeWidth="2" />
            <path d="M 310 80 L 380 140" stroke="#3b82f6" strokeWidth="2" />

            <text x="310" y="280" fill="#94a3b8" textAnchor="middle">
              Correct Abstraction: Penguins don't implement IFlyingBird.
            </text>
          </g>
        ) : (
          <g className="animate-fade-in text-xs font-bold">
            <rect
              x="250"
              y="40"
              width="120"
              height="40"
              rx="4"
              fill="#4c0519"
              stroke="#e11d48"
              strokeWidth="2"
            />
            <text x="310" y="65" fill="#f43f5e" textAnchor="middle">
              Bird (Base)
            </text>
            <text x="310" y="85" fill="#fda4af" textAnchor="middle">
              fly()
            </text>

            <rect
              x="180"
              y="150"
              width="120"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text x="240" y="175" fill="#60a5fa" textAnchor="middle">
              Eagle.fly() ✓
            </text>

            <rect
              x="320"
              y="150"
              width="120"
              height="40"
              rx="4"
              fill="#4c0519"
              stroke="#e11d48"
              strokeWidth="2"
            />
            <text x="380" y="175" fill="#f43f5e" textAnchor="middle">
              Penguin.fly()
            </text>

            <path d="M 310 95 L 240 150" stroke="#475569" strokeWidth="2" />
            <path d="M 310 95 L 380 150" stroke="#e11d48" strokeWidth="2" />

            <text x="310" y="240" fill="#fca5a5" textAnchor="middle">
              Violation: Penguin throws UnsupportedOperationException()
            </text>
          </g>
        );
      case "I":
        return isGoodDesign ? (
          <g className="animate-fade-in text-xs font-bold">
            {/* Small Segregated Interfaces */}
            <rect
              x="100"
              y="40"
              width="100"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text x="150" y="65" fill="#60a5fa" textAnchor="middle">
              «IWorkable»
            </text>

            <rect
              x="260"
              y="40"
              width="100"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#10b981"
              strokeWidth="2"
            />
            <text x="310" y="65" fill="#34d399" textAnchor="middle">
              «IEatable»
            </text>

            <rect
              x="420"
              y="40"
              width="100"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#f59e0b"
              strokeWidth="2"
            />
            <text x="470" y="65" fill="#fbbf24" textAnchor="middle">
              «ISleepable»
            </text>

            {/* Implementations */}
            <rect
              x="180"
              y="150"
              width="120"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text x="240" y="175" fill="#60a5fa" textAnchor="middle">
              HumanWorker
            </text>

            <rect
              x="10"
              y="150"
              width="120"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text x="70" y="175" fill="#60a5fa" textAnchor="middle">
              RobotWorker
            </text>

            <path d="M 150 80 L 240 150" stroke="#3b82f6" strokeWidth="2" />
            <path d="M 310 80 L 240 150" stroke="#10b981" strokeWidth="2" />

            <path d="M 150 80 L 70 150" stroke="#3b82f6" strokeWidth="2" />

            <text x="310" y="240" fill="#94a3b8" textAnchor="middle">
              Robot only implements IWorkable. It isn't forced to eat().
            </text>
          </g>
        ) : (
          <g className="animate-fade-in text-xs font-bold">
            <rect
              x="230"
              y="40"
              width="160"
              height="80"
              rx="4"
              fill="#4c0519"
              stroke="#e11d48"
              strokeWidth="2"
            />
            <text x="310" y="65" fill="#f43f5e" textAnchor="middle">
              «IFatWorker»
            </text>
            <text x="310" y="85" fill="#fda4af" textAnchor="middle">
              work(), eat(), sleep()
            </text>

            <rect
              x="150"
              y="160"
              width="120"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text x="210" y="185" fill="#60a5fa" textAnchor="middle">
              HumanWorker
            </text>

            <rect
              x="350"
              y="160"
              width="120"
              height="40"
              rx="4"
              fill="#4c0519"
              stroke="#e11d48"
              strokeWidth="2"
            />
            <text x="410" y="185" fill="#f43f5e" textAnchor="middle">
              RobotWorker
            </text>

            <path d="M 310 120 L 210 160" stroke="#475569" strokeWidth="2" />
            <path d="M 310 120 L 410 160" stroke="#e11d48" strokeWidth="2" />

            <text x="310" y="240" fill="#fca5a5" textAnchor="middle">
              Violation: Robot is forced to implement eat() and sleep().
            </text>
          </g>
        );
      case "D":
        return isGoodDesign ? (
          <g className="animate-fade-in text-xs font-bold">
            <rect
              x="250"
              y="30"
              width="120"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text x="310" y="55" fill="#60a5fa" textAnchor="middle">
              OrderService
            </text>

            <rect
              x="250"
              y="110"
              width="120"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#a855f7"
              strokeWidth="2"
            />
            <text x="310" y="135" fill="#c084fc" textAnchor="middle">
              «IDatabase»
            </text>

            <rect
              x="150"
              y="190"
              width="120"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#10b981"
              strokeWidth="2"
            />
            <text x="210" y="215" fill="#34d399" textAnchor="middle">
              MySQL (Impl)
            </text>

            <rect
              x="350"
              y="190"
              width="120"
              height="40"
              rx="4"
              fill="#1e293b"
              stroke="#10b981"
              strokeWidth="2"
            />
            <text x="410" y="215" fill="#34d399" textAnchor="middle">
              MongoDB (Impl)
            </text>

            <path
              d="M 310 70 L 310 110"
              stroke="#475569"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
            <path
              d="M 210 190 L 280 150"
              stroke="#a855f7"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M 410 190 L 340 150"
              stroke="#a855f7"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            <text x="310" y="260" fill="#94a3b8" textAnchor="middle">
              Inversion: High-level OrderService depends on Abstraction, not
              SQL.
            </text>
          </g>
        ) : (
          <g className="animate-fade-in text-xs font-bold">
            <rect
              x="250"
              y="60"
              width="120"
              height="40"
              rx="4"
              fill="#4c0519"
              stroke="#e11d48"
              strokeWidth="2"
            />
            <text x="310" y="85" fill="#f43f5e" textAnchor="middle">
              OrderService
            </text>

            <rect
              x="250"
              y="160"
              width="120"
              height="40"
              rx="4"
              fill="#4c0519"
              stroke="#e11d48"
              strokeWidth="2"
            />
            <text x="310" y="185" fill="#f43f5e" textAnchor="middle">
              MySQLDatabase
            </text>

            <path
              d="M 310 100 L 310 160"
              stroke="#e11d48"
              strokeWidth="3"
              markerEnd="url(#arrow-red)"
            />

            <text x="310" y="240" fill="#fca5a5" textAnchor="middle">
              Tight Coupling: High-level module depends directly on low-level
              detail.
            </text>
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      {/* Top Controller */}
      <div className="flex w-full flex-col gap-6 border-b border-slate-800 bg-slate-900/50 p-6 z-20 shadow-xl">
        <h3 className="text-sm font-bold tracking-wider text-amber-500 uppercase">
          Architecture Inspector
        </h3>

        <div className="flex gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
          {PRINCIPLES.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              className={`flex-1 rounded py-2 text-lg font-black transition-all ${activeTab === p.id ? "bg-amber-500 text-white shadow-lg scale-105" : "text-slate-500 hover:text-slate-300"}`}
            >
              {p.id}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
          <h4 className="text-lg font-black text-white mb-1">
            {PRINCIPLES.find((p) => p.id === activeTab)?.title}
          </h4>
          <p className="text-sm text-slate-300">
            {PRINCIPLES.find((p) => p.id === activeTab)?.desc}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setIsGoodDesign(true)}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg border p-3 font-bold transition-all ${isGoodDesign ? "border-emerald-500 bg-emerald-950/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "border-slate-700 bg-slate-800 text-slate-400"}`}
          >
            <CheckCircle2 className="h-5 w-5" /> Clean Architecture
          </button>
          <button
            onClick={() => setIsGoodDesign(false)}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg border p-3 font-bold transition-all ${!isGoodDesign ? "border-rose-500 bg-rose-950/30 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]" : "border-slate-700 bg-slate-800 text-slate-400"}`}
          >
            <XCircle className="h-5 w-5" /> Code Smell
          </button>
        </div>
      </div>

      {/* SVG Canvas Workspace */}
      <div className="relative flex flex-1 items-center justify-center bg-black p-4 min-h-[400px]">
        <svg
          viewBox="0 0 620 300"
          className="w-full h-full max-h-[400px] overflow-visible"
        >
          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L9,3 z" fill="#475569" />
            </marker>
            <marker
              id="arrow-red"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L9,3 z" fill="#e11d48" />
            </marker>
          </defs>
          {renderDiagram()}
        </svg>
      </div>
    </div>
  );
}
