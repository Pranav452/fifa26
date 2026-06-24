import { TEAMS, crestUrl } from "./bracket";

export type GroupRow = {
  name: string;
  pl: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  pts: number;
  form: string; // e.g. "WD"
};
export type GroupTable = { key: string; label: string; rows: GroupRow[]; best3?: boolean };

// name -> crest (only the qualified teams carry FotMob ids; others render crest-less)
const NAME_CODE: Record<string, string> = (() => {
  const m: Record<string, string> = {};
  for (const t of Object.values(TEAMS)) m[t.name.toLowerCase()] = t.code;
  return m;
})();
export const crestForName = (n: string): string => {
  const c = NAME_CODE[n.trim().toLowerCase()];
  return c ? crestUrl(c) : "";
};

const r = (name: string, w: number, d: number, l: number, gf: number, ga: number, form: string): GroupRow => ({
  name,
  pl: w + d + l,
  w,
  d,
  l,
  gf,
  ga,
  pts: w * 3 + d,
  form,
});

export const GROUP_TABLES: GroupTable[] = [
  {
    key: "A",
    label: "Group A",
    rows: [
      r("Mexico", 2, 0, 0, 3, 0, "WW"),
      r("South Korea", 1, 0, 1, 2, 2, "WL"),
      r("Czechia", 0, 1, 1, 2, 3, "LD"),
      r("South Africa", 0, 1, 1, 1, 3, "LD"),
    ],
  },
  {
    key: "B",
    label: "Group B",
    rows: [
      r("Canada", 1, 1, 0, 7, 1, "DW"),
      r("Switzerland", 1, 1, 0, 5, 2, "DW"),
      r("Bosnia and Herzegovina", 0, 1, 1, 2, 5, "DL"),
      r("Qatar", 0, 1, 1, 1, 7, "DL"),
    ],
  },
  {
    key: "C",
    label: "Group C",
    rows: [
      r("Brazil", 1, 1, 0, 4, 1, "DW"),
      r("Morocco", 1, 1, 0, 2, 1, "DW"),
      r("Scotland", 1, 0, 1, 1, 1, "WL"),
      r("Haiti", 0, 0, 2, 0, 4, "LL"),
    ],
  },
  {
    key: "D",
    label: "Group D",
    rows: [
      r("USA", 2, 0, 0, 6, 1, "WW"),
      r("Australia", 1, 0, 1, 2, 2, "WL"),
      r("Paraguay", 1, 0, 1, 2, 4, "LW"),
      r("Turkiye", 0, 0, 2, 0, 3, "LL"),
    ],
  },
  {
    key: "E",
    label: "Group E",
    rows: [
      r("Germany", 2, 0, 0, 9, 2, "WW"),
      r("Ivory Coast", 1, 0, 1, 2, 2, "WL"),
      r("Ecuador", 0, 1, 1, 0, 1, "LD"),
      r("Curacao", 0, 1, 1, 1, 7, "LD"),
    ],
  },
  {
    key: "F",
    label: "Group F",
    rows: [
      r("Netherlands", 1, 1, 0, 7, 3, "DW"),
      r("Japan", 1, 1, 0, 6, 2, "DW"),
      r("Sweden", 1, 0, 1, 6, 6, "WL"),
      r("Tunisia", 0, 0, 2, 1, 9, "LL"),
    ],
  },
  {
    key: "G",
    label: "Group G",
    rows: [
      r("Egypt", 1, 1, 0, 4, 2, "DW"),
      r("Iran", 0, 2, 0, 2, 2, "DD"),
      r("Belgium", 0, 2, 0, 1, 1, "DD"),
      r("New Zealand", 0, 1, 1, 3, 5, "DL"),
    ],
  },
  {
    key: "H",
    label: "Group H",
    rows: [
      r("Spain", 1, 1, 0, 4, 0, "DW"),
      r("Uruguay", 0, 2, 0, 3, 3, "DD"),
      r("Cape Verde", 0, 2, 0, 2, 2, "DD"),
      r("Saudi Arabia", 0, 1, 1, 1, 5, "DL"),
    ],
  },
  {
    key: "I",
    label: "Group I",
    rows: [
      r("France", 2, 0, 0, 6, 1, "WW"),
      r("Norway", 2, 0, 0, 7, 3, "WW"),
      r("Senegal", 0, 0, 2, 3, 6, "LL"),
      r("Iraq", 0, 0, 2, 1, 7, "LL"),
    ],
  },
  {
    key: "J",
    label: "Group J",
    rows: [
      r("Argentina", 2, 0, 0, 5, 0, "WW"),
      r("Austria", 1, 0, 1, 3, 3, "WL"),
      r("Algeria", 1, 0, 1, 2, 4, "LW"),
      r("Jordan", 0, 0, 2, 2, 5, "LL"),
    ],
  },
  {
    key: "K",
    label: "Group K",
    rows: [
      r("Colombia", 2, 0, 0, 4, 1, "WW"),
      r("Portugal", 1, 1, 0, 6, 1, "DW"),
      r("DR Congo", 0, 1, 1, 1, 2, "DL"),
      r("Uzbekistan", 0, 0, 2, 1, 8, "LL"),
    ],
  },
  {
    key: "L",
    label: "Group L",
    rows: [
      r("England", 1, 1, 0, 4, 2, "WD"),
      r("Ghana", 1, 1, 0, 1, 0, "WD"),
      r("Croatia", 1, 0, 1, 3, 4, "LW"),
      r("Panama", 0, 0, 2, 0, 2, "LL"),
    ],
  },
  {
    key: "3RD",
    label: "Best 3rd-placed",
    best3: true,
    rows: [
      r("Sweden", 1, 0, 1, 6, 6, "WL"),
      r("Scotland", 1, 0, 1, 1, 1, "WL"),
      r("Croatia", 1, 0, 1, 3, 4, "LW"),
      r("Algeria", 1, 0, 1, 2, 4, "LW"),
      r("Paraguay", 1, 0, 1, 2, 4, "LW"),
      r("Cape Verde", 0, 2, 0, 2, 2, "DD"),
      r("Belgium", 0, 2, 0, 1, 1, "DD"),
      r("Czechia", 0, 1, 1, 2, 3, "LD"),
      r("DR Congo", 0, 1, 1, 1, 2, "DL"),
      r("Ecuador", 0, 1, 1, 0, 1, "LD"),
      r("Bosnia and Herzegovina", 0, 1, 1, 2, 5, "DL"),
      r("Senegal", 0, 0, 2, 3, 6, "LL"),
    ],
  },
];

export type Qual = "q" | "p" | null; // qualified | possible | out
export function qualMark(table: GroupTable, index: number): Qual {
  if (table.best3) return index < 8 ? "q" : null; // top 8 thirds advance
  if (index < 2) return "q"; // top 2 advance
  if (index === 2) return "p"; // 3rd: possible via best-third
  return null;
}
