// Client-safe education runtime helpers — scholarship levels, glyphs.
// Splits the small runtime bits used by route components from the seed
// (`scholarships.server.ts`), so the seed never reaches the client bundle.

export type ScholarshipLevel =
  | "high-school"
  | "pre-academic"
  | "undergrad"
  | "masters"
  | "phd"
  | "vocational";

export const SCHOLARSHIP_LEVELS: ScholarshipLevel[] = [
  "high-school",
  "pre-academic",
  "undergrad",
  "masters",
  "phd",
  "vocational",
];

const SCHOLARSHIP_LEVEL_GLYPH: Record<ScholarshipLevel, string> = {
  "high-school": "🎒",
  "pre-academic": "📚",
  undergrad: "🎓",
  masters: "📜",
  phd: "🔬",
  vocational: "🛠️",
};

export function glyphForScholarshipLevel(level: ScholarshipLevel): string {
  return SCHOLARSHIP_LEVEL_GLYPH[level];
}

// Map a scholarship level to a Rights tag so the chip palette stays
// consistent with the rest of the portal (uses `classesForTag`).
export const SCHOLARSHIP_LEVEL_TO_TAG: Record<ScholarshipLevel, string> = {
  "high-school": "education",
  "pre-academic": "education",
  undergrad: "scholarship",
  masters: "scholarship",
  phd: "scholarship",
  vocational: "vocational",
};
