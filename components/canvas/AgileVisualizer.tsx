"use client";

import { useState, useEffect } from "react";
import { Play, RotateCcw, CheckCircle2, FastForward } from "lucide-react";

type Ticket = {
  id: number;
  title: string;
  status: "backlog" | "progress" | "review" | "done";
  color: string;
  progressRate: number;
};

export default function AgileVisualizer() {
  const [day, setDay] = useState(0);
  const [sprintComplete, setSprintComplete] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      title: "Auth API",
      status: "backlog",
      color: "bg-rose-500",
      progressRate: 2,
    },
    {
      id: 2,
      title: "UI Layout",
      status: "backlog",
      color: "bg-blue-500",
      progressRate: 3,
    },
    {
      id: 3,
      title: "DB Schema",
      status: "backlog",
      color: "bg-emerald-500",
      progressRate: 1,
    },
    {
      id: 4,
      title: "Payment",
      status: "backlog",
      color: "bg-amber-500",
      progressRate: 4,
    },
  ]);

  const advanceDay = () => {
    if (sprintComplete) return;

    setDay((prev) => prev + 1);

    setTickets((prev) => {
      // FIX: Explicitly declare the return type as ': Ticket'
      const updated = prev.map((t): Ticket => {
        if (t.status === "done") return t;

        const randomPush = Math.random() * 10;
        if (t.status === "backlog" && randomPush > 3)
          return { ...t, status: "progress" };
        if (t.status === "progress" && randomPush > t.progressRate * 1.5)
          return { ...t, status: "review" };
        if (t.status === "review" && randomPush > 2)
          return { ...t, status: "done" };

        return t;
      });
      return updated;
    });
  };
  useEffect(() => {
    if (tickets.every((t) => t.status === "done")) {
      setSprintComplete(true);
    }
  }, [tickets]);

  const resetSprint = () => {
    setDay(0);
    setSprintComplete(false);
    setTickets(tickets.map((t) => ({ ...t, status: "backlog" })));
  };

  const COLUMNS: { id: Ticket["status"]; label: string; border: string }[] = [
    { id: "backlog", label: "Sprint Backlog", border: "border-slate-700" },
    { id: "progress", label: "In Progress", border: "border-blue-500/50" },
    { id: "review", label: "Code Review", border: "border-purple-500/50" },
    { id: "done", label: "Done", border: "border-emerald-500/50" },
  ];

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      {/* Top Control Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6">
        <div>
          <h3 className="text-sm font-bold tracking-wider text-amber-500 uppercase">
            Agile Scrum Board
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Iterative development cycle. Adapt to changes rapidly.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Sprint Timeline
            </span>
            <span className="text-2xl font-black text-cyan-400">
              Day {day} / 14
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={advanceDay}
              disabled={sprintComplete || day >= 14}
              className="flex items-center gap-2 rounded bg-amber-600 px-4 py-2 text-sm font-bold text-white shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:bg-amber-500 disabled:opacity-50 transition-all"
            >
              <FastForward className="h-4 w-4" /> Next Day
            </button>
            <button
              onClick={resetSprint}
              className="flex items-center gap-2 rounded border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-bold text-slate-300 hover:bg-slate-700 transition-all"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 bg-black p-6">
        {sprintComplete && (
          <div className="mb-6 flex items-center justify-center gap-3 rounded-lg border border-emerald-900/50 bg-emerald-950/30 py-4 text-emerald-400 animate-slide-up">
            <CheckCircle2 className="h-6 w-6" />
            <span className="font-bold">
              Sprint Successful! Features are ready to be shipped to the client
              for immediate feedback.
            </span>
          </div>
        )}

        <div className="grid h-[400px] grid-cols-4 gap-4">
          {COLUMNS.map((col) => (
            <div
              key={col.id}
              className={`flex flex-col rounded-xl border-2 bg-slate-900/30 p-4 transition-colors ${col.border}`}
            >
              <h4 className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
                {col.label} ({tickets.filter((t) => t.status === col.id).length}
                )
              </h4>

              <div className="flex flex-col gap-3">
                {tickets
                  .filter((t) => t.status === col.id)
                  .map((ticket) => (
                    <div
                      key={ticket.id}
                      className="relative animate-fade-in rounded-lg border border-slate-700 bg-slate-800 p-4 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div
                        className={`absolute top-0 left-0 h-full w-1.5 rounded-l-lg ${ticket.color}`}
                      />
                      <div className="ml-2">
                        <span className="text-xs font-mono text-slate-500">
                          CS3-{ticket.id}
                        </span>
                        <h5 className="font-bold text-white mt-1">
                          {ticket.title}
                        </h5>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
