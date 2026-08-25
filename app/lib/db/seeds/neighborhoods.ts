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

  // TED-93 — 9 new neighborhoods added alongside the T3 template upgrade.
  // See `app/lib/urban-renewal/registry.ts` for the SEO-page content and
  // sources (this file only seeds the DB `neighborhoods` table used as a
  // listings FK target — see ADR-016 §D2 for the split rationale).
  {
    citySlugHe: "netanya",
    name: { he: "שכונת סלע", en: "Sela", am: "ሴላ" },
    slug: { he: "sela", en: "sela", am: "sela" },
  },
  {
    citySlugHe: "kiryat-gat",
    name: { he: "רובע הנביאים", en: "Rova HaNevi'im", am: "ሮቫ ሃነቢኢም" },
    slug: { he: "rova-hanevim", en: "rova-hanevim", am: "rova-hanevim" },
  },
  {
    citySlugHe: "kiryat-gat",
    name: { he: "שכונת שבט ישראל", en: "Shevet Israel", am: "ሸቬት እስራኤል" },
    slug: { he: "shvat-israel", en: "shvat-israel", am: "shvat-israel" },
  },
  {
    citySlugHe: "kiryat-malakhi",
    name: { he: "מתחם קיבוץ גלויות", en: "Kibbutz Galuyot", am: "ኪቡትስ ጋሉዮት" },
    slug: { he: "kibbutz-galuyot", en: "kibbutz-galuyot", am: "kibbutz-galuyot" },
  },
  {
    citySlugHe: "kiryat-malakhi",
    name: { he: "מתחם משה שרת", en: "Moshe Sharet", am: "ሞሼ ሻሬት" },
    slug: { he: "moshe-sharet", en: "moshe-sharet", am: "moshe-sharet" },
  },
  {
    citySlugHe: "kiryat-malakhi",
    name: { he: 'שכונת חב"ד', en: "Chabad", am: "ቻባድ" },
    slug: { he: "chabad", en: "chabad", am: "chabad" },
  },
  {
    citySlugHe: "kiryat-malakhi",
    name: { he: "מתחם הרצל", en: "Herzl", am: "ሄርዝል" },
    slug: { he: "herzl", en: "herzl", am: "herzl" },
  },
  {
    citySlugHe: "lod",
    name: { he: "רמת אשכול", en: "Ramat Ashkol", am: "ራማት አሽኮል" },
    slug: { he: "ramat-ashkol", en: "ramat-ashkol", am: "ramat-ashkol" },
  },
  {
    citySlugHe: "beer-sheva",
    name: { he: "שכונה ד'", en: "Shchuna Dalet", am: "ሽኩና ዳሌት" },
    slug: { he: "shchuna-dalet", en: "shchuna-dalet", am: "shchuna-dalet" },
  },
];
