// Client-safe comparison runtime helpers — categories + glyphs + tone.
// Mirrors the glossary/orgs/professionals split: seed lives in `.server.ts`,
// runtime helpers live here so route components don't pull the seed into the
// client bundle.

export type ComparisonCategory =
  | "education"
  | "health"
  | "legal"
  | "housing"
  | "absorption"
  | "heritage";

export const ALL_COMPARISON_CATEGORIES: ComparisonCategory[] = [
  "education",
  "health",
  "legal",
  "housing",
  "absorption",
  "heritage",
];

// Tones reused from `lib/rights/categories.ts` for palette consistency.
export const COMPARISON_CATEGORY_TO_TAG: Record<ComparisonCategory, string> = {
  education: "scholarship",
  health: "health",
  legal: "legal",
  housing: "housing",
  absorption: "new_immigrant",
  heritage: "sigd",
};

const COMPARISON_CATEGORY_GLYPH: Record<ComparisonCategory, string> = {
  education: "🎓",
  health: "🏥",
  legal: "⚖️",
  housing: "🏠",
  absorption: "✈️",
  heritage: "🕯️",
};

export function glyphForComparisonCategory(category: ComparisonCategory): string {
  return COMPARISON_CATEGORY_GLYPH[category];
}
