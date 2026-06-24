"use client";

import { useState } from "react";
import { GROUP_TABLES, crestForName, qualMark, type Qual } from "../lib/groups";

function FormDot({ c }: { c: string }) {
  const color = c === "W" ? "bg-accent" : c === "L" ? "bg-red-500" : "bg-line";
  return (
    <span
      className={`grid size-4 place-items-center rounded-sm text-[8px] font-bold text-black/80 ${color}`}
    >
      {c}
    </span>
  );
}

function markStyle(q: Qual) {
  if (q === "q") return "border-l-2 border-accent";
  if (q === "p") return "border-l-2 border-gold";
  return "border-l-2 border-transparent";
}

export default function Groups() {
  const [key, setKey] = useState(GROUP_TABLES[0].key);
  const table = GROUP_TABLES.find((g) => g.key === key) ?? GROUP_TABLES[0];

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-8">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Group standings</h2>
        <select
          aria-label="Select group"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="rounded-md border border-line bg-card2 px-3 py-1.5 text-sm font-medium text-foreground outline-none focus:border-accent"
        >
          {GROUP_TABLES.map((g) => (
            <option key={g.key} value={g.key}>
              {g.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
       <div className="min-w-[460px] overflow-hidden rounded-xl border border-line bg-card">
        {/* header */}
        <div className="grid grid-cols-[28px_1fr_28px_28px_28px_28px_44px_36px_auto] items-center gap-1 border-b border-line bg-black/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-muted">
          <span>#</span>
          <span>Team</span>
          <span className="text-center">PL</span>
          <span className="text-center">W</span>
          <span className="text-center">D</span>
          <span className="text-center">L</span>
          <span className="text-center">+/-</span>
          <span className="text-center">PTS</span>
          <span className="pl-2">Form</span>
        </div>

        {/* rows */}
        {table.rows.map((row, i) => {
          const q = qualMark(table, i);
          const crest = crestForName(row.name);
          const gd = row.gf - row.ga;
          return (
            <div
              key={`${row.name}-${i}`}
              className={`grid grid-cols-[28px_1fr_28px_28px_28px_28px_44px_36px_auto] items-center gap-1 px-3 py-2 text-xs ${markStyle(q)} ${
                i % 2 ? "bg-white/[0.015]" : ""
              }`}
            >
              <span className="text-muted">{i + 1}</span>
              <span className="flex items-center gap-2 truncate font-semibold">
                {crest ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={crest} alt="" width={18} height={18} className="size-[18px] shrink-0 object-contain" />
                ) : (
                  <span className="size-[18px] shrink-0 rounded-full bg-line/60" />
                )}
                <span className="truncate">{row.name}</span>
              </span>
              <span className="text-center text-muted">{row.pl}</span>
              <span className="text-center">{row.w}</span>
              <span className="text-center">{row.d}</span>
              <span className="text-center">{row.l}</span>
              <span className="text-center text-muted">
                {gd > 0 ? `+${gd}` : gd}
              </span>
              <span className="text-center font-bold">{row.pts}</span>
              <span className="flex items-center gap-1 pl-2">
                {row.form.split("").map((c, j) => (
                  <FormDot key={j} c={c} />
                ))}
              </span>
            </div>
          );
        })}
       </div>
      </div>

      {/* legend */}
      <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-0.5 bg-accent" /> Qualified (top 2)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-0.5 bg-gold" /> Possible (best 3rd)
        </span>
        <span className="ml-auto">GF&minus;GA shown as +/-. Group stage after 2 of 3 matches.</span>
      </div>
    </section>
  );
}
