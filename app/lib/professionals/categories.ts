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

// --- Languages (TED-136) ----------------------------------------------------
// Client-safe: card badges + filters check the summary's language codes.

/** BCP-47 code for Amharic — the filter/landing/badge language. */
export const AMHARIC_LANG = "am";

export function speaksAmharic(languages: string[]): boolean {
  return languages.includes(AMHARIC_LANG);
}

// Per-profession hero images (TED-129). Previously every profession hero
// hardcoded a single medical photo, which looked wrong on lawyer/accountant/
// real-estate pages. All URLs below are already used elsewhere in the repo
// (Unsplash, Ethiopian-community photography — same `fm=webp&q=70&w=1200`
// pattern). A medical photo is used for `doctor` ONLY.
const NEUTRAL_PROFESSIONAL_HERO =
  // Professional Ethiopian woman — Samuel Tsegaye, Addis Ababa
  "https://images.unsplash.com/photo-1691820776176-fcfbd25096c9?fm=webp&q=70&w=1200&fit=crop";

const PROFESSION_HERO_IMAGE: Record<Profession, string> = {
  // Professional portrait — neutral office feel (law)
  lawyer: NEUTRAL_PROFESSIONAL_HERO,
  // Calm portrait — Gift Habeshaw (mental health, non-clinical)
  psychologist:
    "https://images.unsplash.com/photo-1625255178547-44af3d0718c3?fm=webp&q=70&w=1200&fit=crop",
  // Medical setting — appropriate for doctors only
  doctor:
    "https://images.unsplash.com/photo-1666887360742-974c8fce8e6b?fm=webp&q=70&w=1200&fit=crop",
  // Urban scene — Addis Ababa (finance/business tone)
  accountant:
    "https://images.unsplash.com/photo-1642505368560-f8b8efd2e722?fm=webp&q=70&w=1200&fit=crop",
  // Community gathering — Gift Habeshaw (social work)
  "social-worker":
    "https://images.unsplash.com/photo-1662894310962-d62a3f7f3334?fm=webp&q=70&w=1200&fit=crop",
  // Addis Ababa cityscape (housing/finance)
  "mortgage-advisor":
    "https://images.unsplash.com/photo-1734865934450-719ef6f59a37?fm=webp&q=70&w=1200&fit=crop",
  // Professional portrait (careers/mentorship)
  "career-counselor": NEUTRAL_PROFESSIONAL_HERO,
  // Addis Ababa cityscape (real estate)
  "real-estate-agent":
    "https://images.unsplash.com/photo-1734865934450-719ef6f59a37?fm=webp&q=70&w=1200&fit=crop",
};

export function heroImageForProfession(profession: Profession): string {
  return PROFESSION_HERO_IMAGE[profession] ?? NEUTRAL_PROFESSIONAL_HERO;
}

// Paraglide message IDs must be valid JS identifiers (no hyphens), but our
// profession slugs are kebab-case (URL-friendly). Translation: replace `-`
// with `_` for the message-key lookup only.
export function professionMessageKey(p: Profession): string {
  return `profession_${p.replace(/-/g, "_")}`;
}
