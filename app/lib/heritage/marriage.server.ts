// Marriage registration guide for Ethiopian-Israelis (TED-140).
//
// The Rabbanut track step by step: opening a marriage file, when a birur
// yahadut (Jewish-status verification) is required, which documents to
// bring, the role of the kes, and where to get free help.
//
// HE is the source-of-truth locale (CLAUDE.md). EN + AM are full mirrors —
// the Amharic summary is deliberately complete, since older community
// members rely on it.
//
// Every claim below is traceable to an official or primary source:
// - kolzchut.org.il — "בירור יהדות ליוצאי אתיופיה": who must undergo the
//   process, the designated expert-rabbi track, the form, ~1 month to a
//   decision, no fee, escalation to the Chief Rabbi of Ethiopian Jewry.
// - kolzchut.org.il — "בירור יהדות": file opened at the regional rabbinical
//   court (yahadut@rbc.gov.il, *5889), investigator meeting, dayan hearing,
//   free of charge, 30-day appeal to the Supreme Rabbinical Court.
// - kolzchut.org.il — "הנחה בתשלום אגרת רישום נישואין ברבנות": 40% fee
//   discount for soldiers, national service, students under 30, olim in
//   their first two years, and other listed groups.
// - Religious council of Rishon LeZion (mdrl.org.il) — registration window
//   (3 months to 45 days before the wedding), the document list, edei
//   ravakut, and the referral of olim to the rabbinical court.
// - itim.org.il — Interior-Ministry registration alone does not prove
//   Jewish status at the Rabbanut; Itim's free helpline (*8083).
// - Government decision of 19.02.2018 (reported by Ynet) — recognition of
//   the kessim, their integration into religious councils, and their
//   authority to officiate weddings.
//
// Deliberately EXCLUDED as unverifiable at the time of writing: the exact
// shekel amount of the marriage-registration fee (published only in a
// regulation appendix that changes), any per-city list of designated
// verification rabbis (the count changes between publications), and any
// claim about how long a specific religious council takes.
//
// Tone note (TED-140): the kes track and the Rabbanut track are presented
// side by side, factually and without ranking one above the other.
//
// Server-only module — do not import in client bundles.

import type { Locale } from "../i18n/config";

/** First published — bump `dateModified` in the route on substantive edits. */
export const MARRIAGE_PUBLISHED_AT = "2026-08-30";

export interface MarriageGuideStep {
  id: string;
  title: Record<Locale, string>;
  detail: Record<Locale, string>;
  /** Official (gov / kol-zchut) link for this step, if any. */
  officialUrl?: string;
  officialLabel?: Record<Locale, string>;
  /** Locale-relative internal path, e.g. "/heritage/kessim". */
  internalPath?: string;
  internalLabel?: Record<Locale, string>;
}

export interface MarriageFaqItem {
  id: string;
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
}

export interface MarriageResource {
  name: string;
  phone?: string;
  url: string;
  description: Record<Locale, string>;
}

export interface MarriageSource {
  name: Record<Locale, string>;
  url: string;
}

export const MARRIAGE_TITLE: Record<Locale, string> = {
  he: "רישום נישואין ליוצאי אתיופיה — מדריך שלב-אחר-שלב",
  en: "Marriage Registration for Ethiopian-Israelis — A Step-by-Step Guide",
  am: "ለኢትዮጵያ-እስራኤላውያን የጋብቻ ምዝገባ — ደረጃ በደረጃ መመሪያ",
};

export const MARRIAGE_SUBTITLE: Record<Locale, string> = {
  he: "פתיחת תיק נישואין ברבנות, מתי נדרש בירור יהדות ואיך הוא מתנהל, אילו מסמכים להביא, מה תפקידו של הקס — ואיפה מקבלים עזרה חינם.",
  en: "Opening a marriage file at the Rabbanut, when a birur yahadut is required and how it works, which documents to bring, the role of the kes — and where to get free help.",
  am: "በረቢነት የጋብቻ መዝገብ መክፈት፣ የይሁዲነት ማጣራት (ቢሩር የሁዱት) መቼ እንደሚያስፈልግና እንዴት እንደሚካሄድ፣ የትኞቹን ሰነዶች ማምጣት እንዳለብዎ፣ የቄሱ ሚና — እና ነፃ እርዳታ የት እንደሚያገኙ።",
};
