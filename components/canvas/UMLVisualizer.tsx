"use client";

import { useState } from "react";
import { User, Server, Database, MousePointerClick } from "lucide-react";

type Connection = { actor: string; useCase: string };

export default function UMLVisualizer() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedActor, setSelectedActor] = useState<string | null>(null);

  const ACTORS = [
    { id: "customer", label: "Customer", icon: User },
    { id: "admin", label: "Sys Admin", icon: Server },
  ];

  const USE_CASES = [
    { id: "browse", label: "Browse Products" },
    { id: "checkout", label: "Checkout & Pay" },
    { id: "manage_users", label: "Manage User Roles" },
    { id: "backup", label: "Database Backup" },
  ];

  const handleActorClick = (id: string) => {
    setSelectedActor(id === selectedActor ? null : id);
  };

  const handleUseCaseClick = (id: string) => {
    if (!selectedActor) return;

    const connectionExists = connections.some(
      (c) => c.actor === selectedActor && c.useCase === id,
    );
    if (connectionExists) {
      setConnections(
        connections.filter(
          (c) => !(c.actor === selectedActor && c.useCase === id),
        ),
      );
    } else {
      setConnections([...connections, { actor: selectedActor, useCase: id }]);
    }
    setSelectedActor(null);
  };

  const clearConnections = () => setConnections([]);

  // Verify if it's visually complete (just a fun mini-game check)
  const isComplete = connections.length >= 4;

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      {/* Header Info */}
      <div className="border-b border-slate-800 bg-slate-900/50 p-6">
        <h3 className="mb-2 text-sm font-bold tracking-wider text-amber-500 uppercase flex items-center gap-2">
          <MousePointerClick className="h-4 w-4" /> Interactive UML Use Case
          Diagram
        </h3>
        <p className="text-sm text-slate-400">
          Connect the <strong className="text-cyan-400">Actors</strong> on the
          left to the <strong className="text-purple-400">Use Cases</strong>{" "}
          inside the system boundary. Select an actor, then click a use case to
          draw the relationship.
        </p>
        <button
          onClick={clearConnections}
          className="mt-4 text-xs text-rose-400 hover:text-rose-300 transition-colors"
        >
          Reset Diagram
        </button>
      </div>

      {/* SVG & HTML Canvas */}
      <div className="relative flex-1 p-8 bg-black overflow-hidden flex items-center justify-center min-h-[400px]">
        {/* Dynamic SVG for Lines */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none z-0">
          {connections.map((conn, idx) => {
            // Hardcoding coordinates for simplicity of the visualizer layout
            const y1 = conn.actor === "customer" ? "30%" : "70%";
            let y2 = "";
            if (conn.useCase === "browse") y2 = "20%";
            if (conn.useCase === "checkout") y2 = "40%";
            if (conn.useCase === "manage_users") y2 = "60%";
            if (conn.useCase === "backup") y2 = "80%";

            return (
              <line
                key={idx}
                x1="20%"
                y1={y1}
                x2="60%"
                y2={y2}
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="5 5"
                className="animate-[dash_1s_linear_infinite]"
              />
            );
          })}
        </svg>

        <div className="relative z-10 w-full max-w-2xl flex justify-between">
          {/* Actors Column */}
          <div className="flex flex-col justify-around h-full gap-16 py-8">
            {ACTORS.map((actor) => {
              const Icon = actor.icon;
              const isSelected = selectedActor === actor.id;
              return (
                <button
                  key={actor.id}
                  onClick={() => handleActorClick(actor.id)}
                  className={`flex flex-col items-center gap-2 transition-all p-4 rounded-xl border ${isSelected ? "border-cyan-500 bg-cyan-900/30" : "border-transparent hover:bg-slate-900"}`}
                >
                  <Icon
                    className={`h-12 w-12 ${isSelected ? "text-cyan-400" : "text-slate-400"}`}
                  />
                  <span className="font-bold text-sm text-slate-300">
                    {actor.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* System Boundary */}
          <div className="w-[60%] border-2 border-slate-700 rounded-xl bg-slate-900/50 p-6 flex flex-col items-center shadow-2xl relative">
            <div className="absolute -top-3 left-4 bg-slate-950 px-2 text-xs font-bold text-slate-500 tracking-wider">
              System Boundary (E-Commerce App)
            </div>

            <div className="flex w-full flex-col gap-6 mt-4">
              {USE_CASES.map((uc) => {
                const isTargeted = selectedActor !== null;
                return (
                  <button
                    key={uc.id}
                    onClick={() => handleUseCaseClick(uc.id)}
                    disabled={!selectedActor}
                    className={`w-full rounded-full border-2 py-4 px-6 text-sm font-bold text-center transition-all ${isTargeted ? "border-purple-500 hover:bg-purple-900/30 cursor-crosshair text-purple-200" : "border-slate-600 bg-slate-800 text-slate-400 cursor-default"}`}
                  >
                    {uc.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {isComplete && (
          <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded bg-emerald-950/80 px-4 py-2 border border-emerald-900 text-sm font-bold text-emerald-400 animate-slide-up backdrop-blur-sm">
            <Database className="h-4 w-4" /> System architecture successfully
            mapped!
          </div>
        )}

        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes dash { to { stroke-dashoffset: -20; } }
        `,
          }}
        />
      </div>
    </div>
  );
}
