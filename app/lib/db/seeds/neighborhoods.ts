// Phase-3 seed: priority urban-renewal neighborhoods (TED-21).
// One row per (city slug, neighborhood slug) — translations follow ADR-002.

import type { Translatable } from "../columns";

export const PHASE_3_NEIGHBORHOODS: Array<{
  citySlugHe: string;
  name: Translatable;
  slug: Translatable;
}> = [
  {
    citySlugHe: "rehovot",
    name: { he: "קרית משה", en: "Kiryat Moshe", am: "ቅርያት ሞሼ" },
    slug: { he: "kiryat-moshe", en: "kiryat-moshe", am: "kiryat-moshe" },
  },
  {
    citySlugHe: "rishon-lezion",
    name: { he: "רמת אליהו", en: "Ramat Eliyahu", am: "ራማት ኤልያሁ" },
    slug: { he: "ramat-eliyahu", en: "ramat-eliyahu", am: "ramat-eliyahu" },
  },
  {
    citySlugHe: "netanya",
    name: { he: "דורה", en: "Dora", am: "ዶራ" },
    slug: { he: "dora", en: "dora", am: "dora" },
  },
  {
    citySlugHe: "netanya",
    name: { he: "נאות שקד", en: "Neot Shaked", am: "ኔኦት ሻቄድ" },
    slug: { he: "neot-shaked", en: "neot-shaked", am: "neot-shaked" },
  },
  {
    citySlugHe: "netanya",
    name: { he: "קריית נורדאו", en: "Kiryat Nordau", am: "ቅርያት ኖርዳው" },
    slug: { he: "kiryat-nordau", en: "kiryat-nordau", am: "kiryat-nordau" },
  },
];
