// The Ge'ez syllabary (ፊደል / fidel) — client-safe data for the interactive
// alphabet on /education/amharic (TED-147).
//
// ── Why this module is allowed in the client bundle (ADR-020) ──────────────
// ADR-020 says long-form content lives in `.server` modules because prose is
// paid for three times over (he/en/am). This module is the opposite shape and
// is deliberately client-side:
//
//   * It is **script data, not prose** — the glyphs are the same characters in
//     every locale, so there is no ×3 locale cost to pay.
//   * The 238 syllable glyphs are *generated* from 34 base code points rather
//     than listed, so the whole table costs ~34 numbers and ~34 short Latin
//     strings. Spelling the grid out literally would cost ~1.5 kB of UTF-8
//     for the glyphs alone.
//   * The alphabet is the one genuinely interactive element on the page, so
//     the data has to reach the browser. Everything else on the hub (prose,
//     phrases, course descriptions) stays in `amharic.server.ts`.
//
// ── How the Ge'ez block is laid out ───────────────────────────────────────
// Ethiopic is an *abugida*: each character is a consonant + vowel pair, not a
// bare letter. Unicode lays the block out systematically — every consonant
// occupies eight consecutive code points, and the first seven are the seven
// vowel "orders" in their traditional sequence. So the whole grid is:
//
//     char(row, order) = String.fromCodePoint(row.base + order)
//
// This holds for all 34 base consonants listed below. It does **not** hold for
// the labialised series (ቈ U+1248, ኈ U+1288, ኰ U+12B0, ጐ U+1310 …), which have
// a five-member pattern with gaps — those are deliberately excluded here, as
// is standard for a learner's fidel chart.
//
// Romanisation follows the common scholarly transliteration used in Ethio-
// Semitic linguistics (ə for the sixth order, ʾ/ʿ for the glottal series).

/** One consonant row of the chart. */
export interface FidelRow {
  /** Unicode code point of the first-order (ግዕዝ) form. */
  base: number;
  /** Romanised consonant, without a vowel. */
  latin: string;
}

/** One vowel order (column) of the chart. */
export interface FidelOrder {
  /** Traditional Ge'ez name of the order. */
  geez: string;
  /** Romanised name of the order. */
  latin: string;
  /** The vowel this order adds to the consonant. */
  vowel: string;
}

/**
 * The seven vowel orders, in traditional sequence. The order names are Ge'ez
 * words, so they are the same text in every locale — no `Record<Locale, …>`.
 */
export const FIDEL_ORDERS: FidelOrder[] = [
  { geez: "ግዕዝ", latin: "gəʿəz", vowel: "ä" },
  { geez: "ካዕብ", latin: "kaʿəb", vowel: "u" },
  { geez: "ሣልስ", latin: "śaləs", vowel: "i" },
  { geez: "ራብዕ", latin: "rabəʿ", vowel: "a" },
  { geez: "ኃምስ", latin: "ḫaməs", vowel: "e" },
  { geez: "ሳድስ", latin: "sadəs", vowel: "ə" },
  { geez: "ሳብዕ", latin: "sabəʿ", vowel: "o" },
];

/**
 * The 34 base consonants of the Amharic fidel, in traditional chart order.
 * `base` is the ግዕዝ (first-order) code point; orders 2–7 follow it directly.
 */
export const FIDEL_ROWS: FidelRow[] = [
  { base: 0x1200, latin: "h" },
  { base: 0x1208, latin: "l" },
  { base: 0x1210, latin: "ḥ" },
  { base: 0x1218, latin: "m" },
  { base: 0x1220, latin: "ś" },
  { base: 0x1228, latin: "r" },
  { base: 0x1230, latin: "s" },
  { base: 0x1238, latin: "š" },
  { base: 0x1240, latin: "q" },
  { base: 0x1260, latin: "b" },
  { base: 0x1268, latin: "v" },
  { base: 0x1270, latin: "t" },
  { base: 0x1278, latin: "č" },
  { base: 0x1280, latin: "ḫ" },
  { base: 0x1290, latin: "n" },
  { base: 0x1298, latin: "ñ" },
  { base: 0x12a0, latin: "ʾ" },
  { base: 0x12a8, latin: "k" },
  { base: 0x12b8, latin: "x" },
  { base: 0x12c8, latin: "w" },
  { base: 0x12d0, latin: "ʿ" },
  { base: 0x12d8, latin: "z" },
  { base: 0x12e0, latin: "ž" },
  { base: 0x12e8, latin: "y" },
  { base: 0x12f0, latin: "d" },
  { base: 0x1300, latin: "j" },
  { base: 0x1308, latin: "g" },
  { base: 0x1320, latin: "ṭ" },
  { base: 0x1328, latin: "č̣" },
  { base: 0x1330, latin: "p̣" },
  { base: 0x1338, latin: "ṣ" },
  { base: 0x1340, latin: "ḍ" },
  { base: 0x1348, latin: "f" },
  { base: 0x1350, latin: "p" },
];

/** Number of vowel orders per consonant. */
export const FIDEL_ORDER_COUNT = FIDEL_ORDERS.length;

/** The syllable glyph at (row, order) — e.g. `fidelChar(FIDEL_ROWS[3], 0)` → መ. */
export function fidelChar(row: FidelRow, order: number): string {
  return String.fromCodePoint(row.base + order);
}

/** Romanised syllable at (row, order) — e.g. `m` + `a` → `ma`. */
export function fidelLatin(row: FidelRow, order: number): string {
  return `${row.latin}${FIDEL_ORDERS[order]!.vowel}`;
}

/** Total syllables in the chart — 34 × 7 = 238. */
export const FIDEL_SYLLABLE_COUNT = FIDEL_ROWS.length * FIDEL_ORDER_COUNT;
