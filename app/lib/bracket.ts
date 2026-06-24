// FIFA World Cup 2026 — knockout bracket data.
// Round of 32 fixtures + team IDs sourced from live FotMob data (league 77), as of 2026-06-24.
// New 48-team format: 32 teams reach the knockout stage (Round of 32).

export type Team = {
  id: string; // FotMob team id -> crest image
  code: string; // 3-letter display code
  name: string;
};

// id, code, name  (id powers the crest: images.fotmob.com/.../teamlogo/<id>.png)
export const TEAMS: Record<string, Team> = {
  GER: { id: "8570", code: "GER", name: "Germany" },
  PAR: { id: "6724", code: "PAR", name: "Paraguay" },
  FRA: { id: "6723", code: "FRA", name: "France" },
  SWE: { id: "8520", code: "SWE", name: "Sweden" },
  KOR: { id: "7804", code: "KOR", name: "South Korea" },
  SUI: { id: "6717", code: "SUI", name: "Switzerland" },
  NED: { id: "6708", code: "NED", name: "Netherlands" },
  MAR: { id: "6262", code: "MAR", name: "Morocco" },
  POR: { id: "8361", code: "POR", name: "Portugal" },
  GHA: { id: "6714", code: "GHA", name: "Ghana" },
  ESP: { id: "6720", code: "ESP", name: "Spain" },
  AUT: { id: "8255", code: "AUT", name: "Austria" },
  USA: { id: "6713", code: "USA", name: "USA" },
  ALG: { id: "6317", code: "ALG", name: "Algeria" },
  EGY: { id: "10255", code: "EGY", name: "Egypt" },
  CZE: { id: "8496", code: "CZE", name: "Czechia" },
  BRA: { id: "8256", code: "BRA", name: "Brazil" },
  JPN: { id: "6715", code: "JPN", name: "Japan" },
  CIV: { id: "6709", code: "CIV", name: "Ivory Coast" },
  NOR: { id: "8492", code: "NOR", name: "Norway" },
  MEX: { id: "6710", code: "MEX", name: "Mexico" },
  SCO: { id: "8498", code: "SCO", name: "Scotland" },
  ENG: { id: "8491", code: "ENG", name: "England" },
  CPV: { id: "5888", code: "CPV", name: "Cape Verde" },
  ARG: { id: "6706", code: "ARG", name: "Argentina" },
  URU: { id: "5796", code: "URU", name: "Uruguay" },
  AUS: { id: "6716", code: "AUS", name: "Australia" },
  IRN: { id: "6711", code: "IRN", name: "Iran" },
  CAN: { id: "5810", code: "CAN", name: "Canada" },
  BEL: { id: "8263", code: "BEL", name: "Belgium" },
  COL: { id: "8258", code: "COL", name: "Colombia" },
  CRO: { id: "10155", code: "CRO", name: "Croatia" },
};

export type Round = "R32" | "R16" | "QF" | "SF" | "FINAL" | "BRONZE";

export const ROUND_LABEL: Record<Round, string> = {
  R32: "Round of 32",
  R16: "Round of 16",
  QF: "Quarter-final",
  SF: "Semi-final",
  FINAL: "Final",
  BRONZE: "Bronze-final",
};

// A match slot is fed either by a fixed team (R32) or by the winner/loser of another match.
export type Feed = { team: string } | { from: string; take: "winner" | "loser" };

export type Match = {
  id: string;
  round: Round;
  side: "L" | "R" | "C";
  date: string;
  a: Feed;
  b: Feed;
};

const t = (code: string): Feed => ({ team: code });
const w = (from: string): Feed => ({ from, take: "winner" });
const l = (from: string): Feed => ({ from, take: "loser" });

export const MATCHES: Match[] = [
  // ---- LEFT — Round of 32 ----
  { id: "L1", round: "R32", side: "L", date: "Jun 30", a: t("GER"), b: t("PAR") },
  { id: "L2", round: "R32", side: "L", date: "Jul 1", a: t("FRA"), b: t("SWE") },
  { id: "L3", round: "R32", side: "L", date: "Jun 28", a: t("KOR"), b: t("SUI") },
  { id: "L4", round: "R32", side: "L", date: "Jun 30", a: t("NED"), b: t("MAR") },
  { id: "L5", round: "R32", side: "L", date: "Jul 3", a: t("POR"), b: t("GHA") },
  { id: "L6", round: "R32", side: "L", date: "Jul 2", a: t("ESP"), b: t("AUT") },
  { id: "L7", round: "R32", side: "L", date: "Jul 2", a: t("USA"), b: t("ALG") },
  { id: "L8", round: "R32", side: "L", date: "Jul 1", a: t("EGY"), b: t("CZE") },
  // ---- LEFT — Round of 16 ----
  { id: "LA", round: "R16", side: "L", date: "Jul 5", a: w("L1"), b: w("L2") },
  { id: "LB", round: "R16", side: "L", date: "Jul 6", a: w("L3"), b: w("L4") },
  { id: "LC", round: "R16", side: "L", date: "Jul 5", a: w("L5"), b: w("L6") },
  { id: "LD", round: "R16", side: "L", date: "Jul 7", a: w("L7"), b: w("L8") },
  // ---- LEFT — Quarter-finals ----
  { id: "LQ1", round: "QF", side: "L", date: "Jul 9", a: w("LA"), b: w("LB") },
  { id: "LQ2", round: "QF", side: "L", date: "Jul 10", a: w("LC"), b: w("LD") },
  // ---- LEFT — Semi-final ----
  { id: "LS", round: "SF", side: "L", date: "Jul 14", a: w("LQ1"), b: w("LQ2") },

  // ---- RIGHT — Round of 32 ----
  { id: "R1", round: "R32", side: "R", date: "Jun 29", a: t("BRA"), b: t("JPN") },
  { id: "R2", round: "R32", side: "R", date: "Jun 30", a: t("CIV"), b: t("NOR") },
  { id: "R3", round: "R32", side: "R", date: "Jul 1", a: t("MEX"), b: t("SCO") },
  { id: "R4", round: "R32", side: "R", date: "Jul 1", a: t("ENG"), b: t("CPV") },
  { id: "R5", round: "R32", side: "R", date: "Jul 4", a: t("ARG"), b: t("URU") },
  { id: "R6", round: "R32", side: "R", date: "Jul 3", a: t("AUS"), b: t("IRN") },
  { id: "R7", round: "R32", side: "R", date: "Jul 3", a: t("CAN"), b: t("BEL") },
  { id: "R8", round: "R32", side: "R", date: "Jul 4", a: t("COL"), b: t("CRO") },
  // ---- RIGHT — Round of 16 ----
  { id: "RA", round: "R16", side: "R", date: "Jul 5", a: w("R1"), b: w("R2") },
  { id: "RB", round: "R16", side: "R", date: "Jul 6", a: w("R3"), b: w("R4") },
  { id: "RC", round: "R16", side: "R", date: "Jul 7", a: w("R5"), b: w("R6") },
  { id: "RD", round: "R16", side: "R", date: "Jul 7", a: w("R7"), b: w("R8") },
  // ---- RIGHT — Quarter-finals ----
  { id: "RQ1", round: "QF", side: "R", date: "Jul 11", a: w("RA"), b: w("RB") },
  { id: "RQ2", round: "QF", side: "R", date: "Jul 12", a: w("RC"), b: w("RD") },
  // ---- RIGHT — Semi-final ----
  { id: "RS", round: "SF", side: "R", date: "Jul 15", a: w("RQ1"), b: w("RQ2") },

  // ---- CENTER ----
  { id: "F", round: "FINAL", side: "C", date: "Jul 19", a: w("LS"), b: w("RS") },
  { id: "B", round: "BRONZE", side: "C", date: "Jul 18", a: l("LS"), b: l("RS") },
];

export const MATCH_BY_ID: Record<string, Match> = Object.fromEntries(
  MATCHES.map((m) => [m.id, m]),
);

export const crestUrl = (teamCode: string): string => {
  const id = TEAMS[teamCode]?.id;
  return id ? `https://images.fotmob.com/image_resources/logo/teamlogo/${id}.png` : "";
};

// Group-stage group each qualified team came from (12 groups, A–L).
// Matches the real WC2026 group standings.
export const GROUPS: Record<string, string> = {
  MEX: "A", KOR: "A", CZE: "A",
  CAN: "B", SUI: "B",
  BRA: "C", MAR: "C", SCO: "C",
  USA: "D", AUS: "D", PAR: "D",
  GER: "E", CIV: "E",
  NED: "F", JPN: "F", SWE: "F",
  EGY: "G", IRN: "G", BEL: "G",
  ESP: "H", URU: "H", CPV: "H",
  FRA: "I", NOR: "I",
  ARG: "J", AUT: "J", ALG: "J",
  COL: "K", POR: "K",
  ENG: "L", GHA: "L", CRO: "L",
};

export const teamGroup = (code: string | null): string => (code ? GROUPS[code] ?? "" : "");

export type Picks = Record<string, string>; // matchId -> winning team code

// --- Resolver: self-pruning. A stored winner stays valid only while it is still
// one of the two teams currently feeding that match. Change an upstream pick and
// every dependent pick downstream silently invalidates. ---

// Optional live override: replaces the fixed Round-of-32 team feeds with codes
// pulled from a live data source (keyed by R32 slot id, e.g. L1, R8).
export type R32Override = Record<string, { a: string; b: string }>;

export function resolveSlot(
  matchId: string,
  slot: "a" | "b",
  picks: Picks,
  r32?: R32Override,
): string | null {
  const m = MATCH_BY_ID[matchId];
  if (!m) return null;
  if (r32 && m.round === "R32" && r32[matchId]) return r32[matchId][slot];
  const feed = m[slot];
  if ("team" in feed) return feed.team;
  return feed.take === "loser" ? loserCode(feed.from, picks, r32) : winnerCode(feed.from, picks, r32);
}

export function winnerCode(matchId: string, picks: Picks, r32?: R32Override): string | null {
  const a = resolveSlot(matchId, "a", picks, r32);
  const b = resolveSlot(matchId, "b", picks, r32);
  const p = picks[matchId];
  return p && (p === a || p === b) ? p : null;
}

export function loserCode(matchId: string, picks: Picks, r32?: R32Override): string | null {
  const a = resolveSlot(matchId, "a", picks, r32);
  const b = resolveSlot(matchId, "b", picks, r32);
  const p = picks[matchId];
  if (!p || (p !== a && p !== b)) return null;
  return p === a ? b : a;
}

export const champion = (picks: Picks, r32?: R32Override): string | null =>
  winnerCode("F", picks, r32);

// Make a team win every match it currently appears in — walks it as far as the bracket allows.
export function autoAdvance(teamCode: string, picks: Picks, r32?: R32Override): Picks {
  const next: Picks = { ...picks };
  let changed = true;
  while (changed) {
    changed = false;
    for (const m of MATCHES) {
      const a = resolveSlot(m.id, "a", next, r32);
      const b = resolveSlot(m.id, "b", next, r32);
      if ((a === teamCode || b === teamCode) && next[m.id] !== teamCode) {
        next[m.id] = teamCode;
        changed = true;
      }
    }
  }
  return next;
}

// Deepest round a team reaches given current picks (for the "how far do they go" readout).
const DEPTH: Round[] = ["R32", "R16", "QF", "SF", "FINAL"];
export function teamProgress(
  teamCode: string,
  picks: Picks,
  r32?: R32Override,
): { round: Round; isChampion: boolean } | null {
  let best = -1;
  for (const m of MATCHES) {
    if (m.round === "BRONZE") continue;
    const a = resolveSlot(m.id, "a", picks, r32);
    const b = resolveSlot(m.id, "b", picks, r32);
    if (a === teamCode || b === teamCode) {
      const d = DEPTH.indexOf(m.round);
      if (d > best) best = d;
    }
  }
  if (best < 0) return null;
  return { round: DEPTH[best], isChampion: champion(picks, r32) === teamCode };
}
