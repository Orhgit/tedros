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
  | "hiv"
  | "sickle-cell"
  | "tuberculosis"
  | "ptsd-migration"
  | "depression"
  | "cardiovascular"
  | "iron-deficiency-anemia"
  | "vitamin-d-deficiency"
  | "obesity"
  // Wave 2
  | "asthma"
  | "weight-management"
  | "anemia-iron"
  | "tuberculosis-screening"
  | "hiv-update-2026"
  | "oral-dental-health"
  | "eye-vision-health"
  | "nutrition-adaptation"
  | "anxiety-depression"
  | "ptsd-immigration-trauma"
  | "addiction-alcohol-drugs"
  | "domestic-violence-health"
  | "youth-mental-health"
  | "postpartum-maternal-health"
  | "migraine-chronic-headache"
  | "heart-vascular-disease"
  | "bone-osteoporosis-health"
  | "kidney-urinary-health";

// Wave 1 (14 conditions with full data in conditions.server.ts)
export const ALL_HEALTH_CONDITIONS: HealthConditionSlug[] = [
  "diabetes",
  "hypertension",
  "stroke",
  "mental-health",
  "brca2",
  "hiv",
  "sickle-cell",
  "tuberculosis",
  "ptsd-migration",
  "depression",
  "cardiovascular",
  "iron-deficiency-anemia",
  "vitamin-d-deficiency",
  "obesity",
];

const HEALTH_CONDITION_GLYPH: Record<HealthConditionSlug, string> = {
  diabetes: "🩸",
  hypertension: "❤️",
  stroke: "🧠",
  "mental-health": "🌿",
  brca2: "🎗️",
  hiv: "🔴",
  "sickle-cell": "🧬",
  tuberculosis: "🫁",
  "ptsd-migration": "🕊️",
  depression: "💙",
  cardiovascular: "🫀",
  "iron-deficiency-anemia": "💊",
  "vitamin-d-deficiency": "☀️",
  obesity: "⚖️",
  // Wave 2
  asthma: "💨",
  "weight-management": "⚖️",
  "anemia-iron": "💊",
  "tuberculosis-screening": "🫁",
  "hiv-update-2026": "🔴",
  "oral-dental-health": "🦷",
  "eye-vision-health": "👁️",
  "nutrition-adaptation": "🥗",
  "anxiety-depression": "💙",
  "ptsd-immigration-trauma": "🕊️",
  "addiction-alcohol-drugs": "🚫",
  "domestic-violence-health": "🏠",
  "youth-mental-health": "🌱",
  "postpartum-maternal-health": "🤱",
  "migraine-chronic-headache": "🧠",
  "heart-vascular-disease": "🫀",
  "bone-osteoporosis-health": "🦴",
  "kidney-urinary-health": "🫘",
};

export function glyphForCondition(slug: HealthConditionSlug): string {
  return HEALTH_CONDITION_GLYPH[slug];
}

export function isHealthCondition(value: string): value is HealthConditionSlug {
  return (ALL_HEALTH_CONDITIONS as string[]).includes(value);
}
