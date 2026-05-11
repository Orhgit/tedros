// Client-safe health condition runtime helpers — categories + glyphs.
// Mirrors `lib/careers/categories.ts`. Splits the small runtime bits used by
// route components from the large seed (`conditions.server.ts`), so the
// seed never ends up in the client bundle.

export type HealthConditionSlug =
  | "diabetes"
  | "hypertension"
  | "stroke"
  | "mental-health"
  | "brca2"
  | "hiv";

export const ALL_HEALTH_CONDITIONS: HealthConditionSlug[] = [
  "diabetes",
  "hypertension",
  "stroke",
  "mental-health",
  "brca2",
  "hiv",
];

const HEALTH_CONDITION_GLYPH: Record<HealthConditionSlug, string> = {
  diabetes: "🩸",
  hypertension: "❤️",
  stroke: "🧠",
  "mental-health": "🌿",
  brca2: "🎗️",
  hiv: "🔴",
};

export function glyphForCondition(slug: HealthConditionSlug): string {
  return HEALTH_CONDITION_GLYPH[slug];
}

export function isHealthCondition(value: string): value is HealthConditionSlug {
  return (ALL_HEALTH_CONDITIONS as string[]).includes(value);
}
