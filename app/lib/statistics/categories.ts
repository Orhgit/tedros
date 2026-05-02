// Client-safe statistics topic helpers — categories + glyphs.
// Mirrors `lib/orgs/categories.ts` shape.

export type StatTopicSlug =
  | "demographics"
  | "education"
  | "housing"
  | "health"
  | "language"
  | "immigration"
  | "family"
  | "civic-participation";

export const ALL_STAT_TOPICS: StatTopicSlug[] = [
  "demographics",
  "education",
  "housing",
  "health",
  "language",
  "immigration",
  "family",
  "civic-participation",
];

const TOPIC_GLYPH: Record<StatTopicSlug, string> = {
  demographics: "👥",
  education: "🎓",
  housing: "🏠",
  health: "🏥",
  language: "🗣️",
  immigration: "✈️",
  family: "👨‍👩‍👧",
  "civic-participation": "🗳️",
};

export function glyphForStatTopic(slug: StatTopicSlug): string {
  return TOPIC_GLYPH[slug];
}

export function isStatTopic(value: string): value is StatTopicSlug {
  return (ALL_STAT_TOPICS as string[]).includes(value);
}
