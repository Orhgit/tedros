// Client-safe professionals runtime helpers — profession enums + glyphs + tone.
// Mirrors the glossary/orgs split: the seed lives in `professionals.server.ts`
// (server-only) and never reaches the client bundle.

export type Profession =
  | "lawyer"
  | "psychologist"
  | "doctor"
  | "accountant"
  | "social-worker"
  | "mortgage-advisor"
  | "career-counselor"
  | "real-estate-agent";

export const ALL_PROFESSIONS: Profession[] = [
  "lawyer",
  "psychologist",
  "doctor",
  "accountant",
  "social-worker",
  "mortgage-advisor",
  "career-counselor",
  "real-estate-agent",
];

// Tone reused from `lib/rights/categories.ts` — keeps a single palette.
export const PROFESSION_TO_TAG: Record<Profession, string> = {
  lawyer: "legal",
  psychologist: "mental_health",
  doctor: "health",
  accountant: "tax_relief",
  "social-worker": "family",
  "mortgage-advisor": "mortgage",
  "career-counselor": "mentorship",
  "real-estate-agent": "housing",
};

const PROFESSION_GLYPH: Record<Profession, string> = {
  lawyer: "⚖️",
  psychologist: "🧠",
  doctor: "🩺",
  accountant: "📊",
  "social-worker": "🤲",
  "mortgage-advisor": "🏦",
  "career-counselor": "💼",
  "real-estate-agent": "🏠",
};

export function glyphForProfession(profession: Profession): string {
  return PROFESSION_GLYPH[profession];
}

export function isProfession(slug: string): slug is Profession {
  return (ALL_PROFESSIONS as string[]).includes(slug);
}

// Paraglide message IDs must be valid JS identifiers (no hyphens), but our
// profession slugs are kebab-case (URL-friendly). Translation: replace `-`
// with `_` for the message-key lookup only.
export function professionMessageKey(p: Profession): string {
  return `profession_${p.replace(/-/g, "_")}`;
}
