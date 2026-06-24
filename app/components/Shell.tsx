"use client";

import { useState } from "react";
import Bracket from "./Bracket";
import Groups from "./Groups";

const DEAD = ["News", "Transfers", "About", "TV schedules"];
type View = "bracket" | "standings";
const TABS: { key: View; label: string }[] = [
  { key: "bracket", label: "Knockout" },
  { key: "standings", label: "Group tables" },
];

export default function Shell() {
  const [view, setView] = useState<View>("bracket");

  return (
    <div className="flex min-h-[100dvh] w-full flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-12 w-full items-center gap-2 border-b border-line bg-background px-3 sm:gap-4 sm:px-8">
        <span className="text-base font-extrabold tracking-tight text-foreground sm:text-lg">
          GOAL<span className="text-accent">CHARTS</span>
        </span>

        <nav className="flex items-center gap-1 rounded-full bg-card2 p-0.5">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setView(t.key)}
              className={[
                "rounded-full px-2.5 py-1 text-xs font-semibold transition-colors sm:px-3",
                view === t.key ? "bg-foreground text-background" : "text-muted hover:text-foreground",
              ].join(" ")}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <nav className="ml-auto hidden items-center gap-5 text-sm text-foreground/70 lg:flex">
          {DEAD.map((n) => (
            <span key={n} className="whitespace-nowrap hover:text-foreground">
              {n}
            </span>
          ))}
        </nav>
      </header>

      <main className="w-full flex-1">{view === "bracket" ? <Bracket /> : <Groups />}</main>
    </div>
  );
}
