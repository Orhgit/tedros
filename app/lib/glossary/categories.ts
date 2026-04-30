// Client-safe glossary runtime helpers — categories + glyphs only.
// Splits out the small runtime bits used by route components from the
// large seed (`glossary.server.ts`), so the seed never ends up in the
// client bundle.

export type GlossaryCategory =
  | "tradition"
  | "history"
  | "identity"
  | "organization"
  | "program";

// Each glossary category maps to a tone (tag) reused from
// `lib/rights/categories.ts` — keeps a single palette across the site.
export const CATEGORY_TO_TAG: Record<GlossaryCategory, string> = {
  tradition: "sigd",
  history: "community",
  identity: "new_immigrant",
  organization: "legal",
  program: "scholarship",
};

const CATEGORY_GLYPH: Record<GlossaryCategory, string> = {
  tradition: "🕯️",
  history: "📜",
  identity: "🌿",
  organization: "🏛️",
  program: "🎓",
};

export function glyphForCategory(category: GlossaryCategory): string {
  return CATEGORY_GLYPH[category];
}
