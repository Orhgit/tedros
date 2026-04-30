// Pull the "How to apply" numbered list out of a right's body markdown so
// the detail route can emit a Schema.org `HowTo` JSON-LD block alongside
// the existing GovernmentService payload. Pure function; no DOM, no I/O.
//
// The seed bodies are authored in HE/EN/AM with these locale-specific
// "how to apply" headings — list them once here so the parser can find
// the right block regardless of which locale the page renders.

import type { Locale } from "../i18n/config";

const HEADINGS: Record<Locale, string[]> = {
  he: [
    "## איך מגישים?",
    "## איך מגישים",
    "## איך מצטרפים?",
    "## איך מצטרפים",
    "## איך מתחילים?",
    "## איך מתחילים",
    "## איך פונים?",
    "## איך פונים",
    "## איך מבקשים?",
    "## איך מבקשים",
    "## איך מתחילים בלי סכנה?",
    "## תהליך",
    "## הליך",
  ],
  en: [
    "## How to apply",
    "## How to start",
    "## How to join",
    "## How to reach Tebeka",
    "## How to reach out",
    "## How to claim",
    "## How to register",
    "## Process",
    "## How to start safely?",
  ],
  am: [
    "## እንዴት ማመልከት ይቻላል",
    "## እንዴት ማመልከት ይቻላል?",
    "## እንዴት መጀመር ይቻላል",
    "## እንዴት መጀመር ይቻላል?",
    "## እንዴት መቀላቀል ይቻላል",
    "## እንዴት መድረስ ይቻላል",
    "## እንዴት ማግኘት ይቻላል",
    "## ሂደት",
    "## በደህንነት እንዴት መጀመር ይቻላል",
  ],
};

// Strip light markdown decoration from a step text — we want the rich
// content for human readers but JSON-LD wants plain prose.
function stripMd(s: string): string {
  return s
    .replace(/\*\*([^*]+)\*\*/g, "$1") // bold
    .replace(/\*([^*]+)\*/g, "$1") // italic
    .replace(/`([^`]+)`/g, "$1") // inline code
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)") // links → "label (url)"
    .trim();
}

export function extractApplicationSteps(body: string, locale: Locale): string[] {
  const lines = body.split(/\r?\n/);
  const headings = HEADINGS[locale] ?? HEADINGS.he;

  // Find the section heading.
  let i = 0;
  while (i < lines.length) {
    const line = (lines[i] ?? "").trim();
    if (headings.some((h) => line.startsWith(h))) break;
    i += 1;
  }
  if (i >= lines.length) return [];
  i += 1; // skip the heading line

  // Skip blank lines.
  while (i < lines.length && (lines[i] ?? "").trim() === "") i += 1;

  // Collect consecutive numbered list items.
  const steps: string[] = [];
  while (i < lines.length) {
    const line = (lines[i] ?? "").trim();
    const match = /^\d+\.\s+(.*)$/.exec(line);
    if (!match) break;
    steps.push(stripMd(match[1] ?? ""));
    i += 1;
  }
  return steps;
}
