// Client-safe news tag helpers + glyphs.
// Mirrors `lib/orgs/categories.ts` shape.

export type NewsTag =
  | "announcement"
  | "holiday"
  | "policy"
  | "education"
  | "employment"
  | "civic"
  | "immigration"
  | "housing"
  | "health"
  | "community"
  | "family"
  | "cities"
  | "rights";

export const ALL_NEWS_TAGS: NewsTag[] = [
  "announcement",
  "holiday",
  "policy",
  "education",
  "employment",
  "civic",
  "immigration",
  "housing",
  "health",
  "community",
  "family",
  "cities",
  "rights",
];

const TAG_GLYPH: Record<NewsTag, string> = {
  announcement: "📣",
  holiday: "🕯️",
  policy: "📋",
  education: "🎓",
  employment: "💼",
  civic: "⚖️",
  immigration: "✈️",
  housing: "🏠",
  health: "🏥",
  community: "🤝",
  family: "👨‍👩‍👧",
  cities: "🏙️",
  rights: "⚖️",
};

export function glyphForNewsTag(tag: NewsTag): string {
  return TAG_GLYPH[tag];
}

export function isNewsTag(value: string): value is NewsTag {
  return (ALL_NEWS_TAGS as string[]).includes(value);
}
