"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MATCH_BY_ID,
  TEAMS,
  ROUND_LABEL,
  GROUPS,
  crestUrl,
  teamGroup,
  seedLabel,
  resolveSlot,
  winnerCode,
  champion,
  type Picks,
  type Round,
  type R32Override,
} from "../lib/bracket";

const LINE = "var(--line)";
const BOX_W = 152;
const CONN_W = 40;
const STORAGE = "wc2026-bracket-v1";

const ORDER: Round[] = ["R32", "R16", "QF", "SF", "FINAL"];
const idx = (r: Round) => ORDER.indexOf(r);

const LEFT = {
  R32: ["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"],
  R16: ["LA", "LB", "LC", "LD"],
  QF: ["LQ1", "LQ2"],
  SF: ["LS"],
};
const RIGHT = {
  SF: ["RS"],
  QF: ["RQ1", "RQ2"],
  R16: ["RA", "RB", "RC", "RD"],
  R32: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"],
};
const R32_IDS = [...LEFT.R32, ...RIGHT.R32];
const GROUP_LETTERS = "ABCDEFGHIJKL".split("");

function Crest({ code, size = 18 }: { code: string | null; size?: number }) {
  if (!code) {
    return <span className="inline-block shrink-0 rounded-full bg-line/60" style={{ width: size, height: size }} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={crestUrl(code)}
      alt={code}
      width={size}
      height={size}
      className="shrink-0 object-contain"
      style={{ width: size, height: size }}
      onError={(e) => {
        e.currentTarget.style.visibility = "hidden";
      }}
    />
  );
}

function MatchBox({
  id,
  picks,
  onPick,
  showGroup,
  r32,
  fresh,
  onSlotOpen,
  onUnassign,
}: {
  id: string;
  picks: Picks;
  onPick: (matchId: string, team: string) => void;
  showGroup?: boolean;
  r32?: R32Override;
  fresh?: boolean;
  onSlotOpen?: (slotKey: string) => void;
  onUnassign?: (slotKey: string) => void;
}) {
  const m = MATCH_BY_ID[id];
  const isR32 = m.round === "R32";
  const winner = winnerCode(id, picks, r32);

  const Row = ({ slot }: { slot: "a" | "b" }) => {
    const code = resolveSlot(id, slot, picks, r32);
    const empty = !code;
    const slotKey = `${id}.${slot}`;

    // fresh build mode: empty Round-of-32 slot -> "add team"
    if (fresh && isR32 && empty) {
      return (
        <button
          type="button"
          onClick={() => onSlotOpen?.(slotKey)}
          className="flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-muted transition-colors hover:bg-white/[0.06] hover:text-foreground"
        >
          <span className="grid size-[18px] place-items-center rounded-full border border-dashed border-muted text-[11px] leading-none">+</span>
          <span className="flex-1 truncate text-xs italic">Add team</span>
        </button>
      );
    }

    const isWinner = winner != null && code === winner;
    const isLoser = winner != null && code !== winner && code != null;
    const grp = showGroup ? teamGroup(code) : "";
    const seed = empty ? seedLabel(id, slot) : "";
    return (
      <div className="group/row relative flex items-center">
        <button
          type="button"
          disabled={empty}
          onClick={() => code && onPick(id, code)}
          className={[
            "flex w-full items-center gap-2 px-2.5 py-1.5 text-left transition-colors",
            empty ? "cursor-default" : "cursor-pointer hover:bg-white/[0.06]",
            isWinner ? "bg-accent/[0.07] text-white" : isLoser ? "text-muted/55" : "text-foreground/90",
          ].join(" ")}
        >
          <Crest code={code} size={18} />
          <span
            className={[
              "flex-1 truncate text-xs tracking-wide",
              isWinner ? "font-bold" : "font-semibold",
              isLoser ? "line-through decoration-muted/40" : "",
              empty ? "font-medium text-muted" : "",
            ].join(" ")}
          >
            {code ?? (seed || "—")}
          </span>
          {grp && <span className="rounded bg-line/50 px-1 text-[9px] font-bold text-muted">{grp}</span>}
          {isWinner && (
            <svg viewBox="0 0 20 20" className="size-3 shrink-0 fill-accent" aria-hidden>
              <path d="M7.6 14.2 3.4 10l1.4-1.4 2.8 2.8 6-6L15 6.8z" />
            </svg>
          )}
        </button>
        {fresh && isR32 && code && (
          <button
            type="button"
            onClick={() => onUnassign?.(slotKey)}
            aria-label="Remove team"
            className="absolute right-1 hidden size-4 place-items-center rounded-full bg-line/70 text-[10px] text-foreground group-hover/row:grid"
          >
            ×
          </button>
        )}
      </div>
    );
  };

  return (
    <div
      className="overflow-hidden rounded-xl border border-line bg-card2 shadow-sm transition-all hover:border-white/20 hover:shadow-md"
      style={{ width: BOX_W }}
    >
      <Row slot="a" />
      <div className="h-px bg-line/70" />
      <Row slot="b" />
      <div className="border-t border-line/50 bg-black/20 px-2 py-1 text-center text-[10px] font-medium text-muted">
        {m.date}
      </div>
    </div>
  );
}

function RoundCol({
  ids,
  label,
  roundKey,
  focus,
  onFocus,
  ...box
}: {
  ids: string[];
  label: string;
  roundKey: Round;
  focus: Round | null;
  onFocus: (r: Round) => void;
  picks: Picks;
  onPick: (m: string, t: string) => void;
  showGroup?: boolean;
  r32?: R32Override;
  fresh?: boolean;
  onSlotOpen?: (k: string) => void;
  onUnassign?: (k: string) => void;
}) {
  const active = focus === roundKey;
  return (
    <div className="relative flex h-full flex-col">
      <button
        type="button"
        onClick={() => onFocus(roundKey)}
        className={[
          "absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest transition-colors",
          active ? "bg-accent text-black" : "text-muted hover:bg-card2 hover:text-foreground",
        ].join(" ")}
      >
        {label}
      </button>
      {ids.map((id) => (
        <div key={id} className="flex flex-1 items-center justify-center">
          <MatchBox id={id} {...box} />
        </div>
      ))}
    </div>
  );
}

function Connector({ count, side }: { count: number; side: "L" | "R" }) {
  const inSide = side === "L" ? { left: 0 } : { right: 0 };
  const outSide = side === "L" ? { right: 0 } : { left: 0 };
  return (
    <div className="flex h-full flex-col" style={{ width: CONN_W }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative flex-1">
          <span className="absolute border-t-2" style={{ ...inSide, top: "25%", width: "50%", borderColor: LINE }} />
          <span className="absolute border-t-2" style={{ ...inSide, top: "75%", width: "50%", borderColor: LINE }} />
          <span className="absolute border-l-2" style={{ left: "50%", top: "25%", height: "50%", borderColor: LINE }} />
          <span className="absolute border-t-2" style={{ ...outSide, top: "50%", width: "50%", borderColor: LINE }} />
        </div>
      ))}
    </div>
  );
}

function StraightLink() {
  return (
    <div className="relative h-full" style={{ width: CONN_W }}>
      <span className="absolute left-0 w-full border-t-2" style={{ top: "50%", borderColor: LINE }} />
    </div>
  );
}

function Trophy({ champ }: { champ: string | null }) {
  const name = champ ? TEAMS[champ]?.name || champ : null;
  return (
    <div className="flex flex-col items-center gap-2 px-2">
      <svg viewBox="0 0 24 24" className="size-12 fill-gold drop-shadow" aria-hidden>
        <path d="M18 4V2H6v2H2v4a4 4 0 0 0 4 4 6 6 0 0 0 5 4.9V20H8v2h8v-2h-3v-1.1A6 6 0 0 0 18 12a4 4 0 0 0 4-4V4h-4ZM6 10a2 2 0 0 1-2-2V6h2v4Zm14-2a2 2 0 0 1-2 2V6h2v2Z" />
      </svg>
      {champ ? (
        <div className="flex flex-col items-center gap-1">
          <Crest code={champ} size={30} />
          <span className="text-sm font-bold text-gold">{name}</span>
          <span className="text-[10px] uppercase tracking-widest text-muted">Champion</span>
        </div>
      ) : (
        <span className="text-[10px] uppercase tracking-widest text-muted">Champion</span>
      )}
    </div>
  );
}

export default function Bracket() {
  const [picks, setPicks] = useState<Picks>({});
  const [focus, setFocus] = useState<Round | null>(null);
  const [mode, setMode] = useState<"preset" | "fresh">("preset");
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) {
        const d = JSON.parse(raw);
        if (d.picks) setPicks(d.picks);
        if (d.mode) setMode(d.mode);
        if (d.assignments) setAssignments(d.assignments);
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE, JSON.stringify({ picks, mode, assignments }));
  }, [picks, mode, assignments, loaded]);

  const r32: R32Override | undefined = useMemo(() => {
    if (mode !== "fresh") return undefined;
    const o: R32Override = {};
    for (const id of R32_IDS) o[id] = { a: assignments[`${id}.a`] || "", b: assignments[`${id}.b`] || "" };
    return o;
  }, [mode, assignments]);

  const onPick = (matchId: string, team: string) =>
    setPicks((p) => {
      const next = { ...p };
      if (next[matchId] === team) delete next[matchId];
      else next[matchId] = team;
      return next;
    });

  const placed = useMemo(() => new Set(Object.values(assignments)), [assignments]);
  const assignTeam = (code: string) => {
    if (!activeSlot) return;
    setAssignments((a) => {
      const next = { ...a };
      for (const k in next) if (next[k] === code) delete next[k]; // no duplicates
      next[activeSlot] = code;
      return next;
    });
    setActiveSlot(null);
  };
  const unassign = (slotKey: string) =>
    setAssignments((a) => {
      const n = { ...a };
      delete n[slotKey];
      return n;
    });

  const onFocus = (r: Round) => setFocus((cur) => (cur === r ? null : r));
  const show = (r: Round) => focus === null || idx(r) >= idx(focus);

  const champ = champion(picks, r32);
  const hasPicks = Object.keys(picks).length > 0;
  const placedCount = Object.keys(assignments).length;

  const box = {
    picks,
    onPick,
    r32,
    fresh: mode === "fresh",
    onSlotOpen: (k: string) => setActiveSlot(k),
    onUnassign: unassign,
  };
  const colProps = { focus, onFocus, ...box };

  return (
    <div className="relative w-full">
      {/* mode bar */}
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap border-b border-line px-4 py-1.5 sm:px-8">
        <div className="flex shrink-0 rounded-full bg-card2 p-0.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMode("preset")}
            className={`rounded-full px-3 py-1 transition-colors ${mode === "preset" ? "bg-foreground text-background" : "text-muted hover:text-foreground"}`}
          >
            As it stands
          </button>
          <button
            type="button"
            onClick={() => setMode("fresh")}
            className={`rounded-full px-3 py-1 transition-colors ${mode === "fresh" ? "bg-accent text-black" : "text-muted hover:text-foreground"}`}
          >
            Build your own
          </button>
        </div>
        {mode === "fresh" && (
          <>
            <span className="text-[11px] font-medium text-muted">{placedCount}/32 placed</span>
            {placedCount > 0 && (
              <button
                type="button"
                onClick={() => setAssignments({})}
                className="text-[11px] font-medium text-muted underline-offset-2 hover:text-foreground hover:underline"
              >
                Clear teams
              </button>
            )}
          </>
        )}
        {hasPicks && (
          <button
            type="button"
            onClick={() => setPicks({})}
            className="ml-auto shrink-0 rounded-md border border-line bg-card2 px-2.5 py-1 text-[11px] font-medium text-muted hover:text-foreground"
          >
            Reset picks
          </button>
        )}
      </div>

      <div className="bracket-scroll flex h-[calc(100dvh-3rem-2.75rem)] w-full overflow-auto px-4 py-8 sm:px-8">
        <div className="m-auto flex h-full min-h-[440px] w-max items-stretch">
          {show("R32") && (
            <>
              <RoundCol ids={LEFT.R32} label={ROUND_LABEL.R32} roundKey="R32" showGroup {...colProps} />
              <Connector count={4} side="L" />
            </>
          )}
          {show("R16") && (
            <>
              <RoundCol ids={LEFT.R16} label={ROUND_LABEL.R16} roundKey="R16" {...colProps} />
              <Connector count={2} side="L" />
            </>
          )}
          {show("QF") && (
            <>
              <RoundCol ids={LEFT.QF} label={ROUND_LABEL.QF} roundKey="QF" {...colProps} />
              <Connector count={1} side="L" />
            </>
          )}
          {show("SF") && (
            <>
              <RoundCol ids={LEFT.SF} label={ROUND_LABEL.SF} roundKey="SF" {...colProps} />
              <StraightLink />
            </>
          )}

          {/* CENTER */}
          <div
            className="grid h-full items-center justify-items-center gap-2 px-1"
            style={{ gridTemplateRows: "1fr auto 1fr", width: BOX_W + 24 }}
          >
            <div className="flex flex-col items-center justify-end gap-2 pb-2">
              <Trophy champ={champ} />
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">Final</span>
              <MatchBox id="F" {...box} />
            </div>
            <div className="flex flex-col items-center justify-start gap-1.5 pt-2">
              <MatchBox id="B" {...box} />
              <span className="text-[10px] font-medium uppercase tracking-widest text-muted">Bronze-final</span>
            </div>
          </div>

          {/* RIGHT */}
          {show("SF") && (
            <>
              <StraightLink />
              <RoundCol ids={RIGHT.SF} label={ROUND_LABEL.SF} roundKey="SF" {...colProps} />
            </>
          )}
          {show("QF") && (
            <>
              <Connector count={1} side="R" />
              <RoundCol ids={RIGHT.QF} label={ROUND_LABEL.QF} roundKey="QF" {...colProps} />
            </>
          )}
          {show("R16") && (
            <>
              <Connector count={2} side="R" />
              <RoundCol ids={RIGHT.R16} label={ROUND_LABEL.R16} roundKey="R16" {...colProps} />
            </>
          )}
          {show("R32") && (
            <>
              <Connector count={4} side="R" />
              <RoundCol ids={RIGHT.R32} label={ROUND_LABEL.R32} roundKey="R32" showGroup {...colProps} />
            </>
          )}
        </div>
      </div>

      {/* team picker overlay */}
      {activeSlot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setActiveSlot(null)}
        >
          <div
            className="max-h-[80dvh] w-full max-w-lg overflow-auto rounded-2xl border border-line bg-card p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">Pick a team</h3>
              <button
                type="button"
                onClick={() => setActiveSlot(null)}
                className="rounded-md px-2 py-1 text-xs text-muted hover:text-foreground"
              >
                Close
              </button>
            </div>
            <div className="space-y-3">
              {GROUP_LETTERS.map((g) => {
                const teams = Object.values(TEAMS).filter((t) => GROUPS[t.code] === g);
                if (!teams.length) return null;
                return (
                  <div key={g}>
                    <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted">
                      Group {g}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {teams.map((t) => {
                        const used = placed.has(t.code);
                        return (
                          <button
                            key={t.code}
                            type="button"
                            disabled={used}
                            onClick={() => assignTeam(t.code)}
                            className={[
                              "flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs font-semibold transition-colors",
                              used
                                ? "cursor-not-allowed border-line bg-card2 text-muted/40"
                                : "border-line bg-card2 text-foreground hover:border-accent hover:bg-accent/10",
                            ].join(" ")}
                          >
                            <Crest code={t.code} size={16} />
                            {t.code}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
