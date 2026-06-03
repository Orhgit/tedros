// Client-safe heritage event runtime helpers — event types + glyphs.
// Mirrors `lib/orgs/categories.ts` shape. The seed
// (`lib/heritage/events.server.ts`) is server-only.

export type HeritageEventSlug =
  | "sigd"
  | "genna"
  | "aliyah-day"
  | "beta-israel"
  // Culture article slugs (Wave 4 — culture.server.ts)
  | "sigd-meaning"
  | "beta-israel-history"
  | "operation-solomon-1991"
  | "operation-moses-1984"
  | "kessim-priests"
  | "orit-holy-book"
  | "geez-sacred-language"
  | "ethiopian-israeli-music"
  | "ethiopian-cuisine-recipes"
  | "coffee-ceremony"
  | "traditional-dress"
  | "ethiopian-wedding"
  | "20-sivan-memorial"
  | "aliyah-day-june"
  | "notable-ethiopian-israelis"
  | "second-generation-identity"
  | "traditional-crafts"
  | "ethiopian-athletes"
  | "digital-diaspora"
  | "amharic-learning"
  | "amharic-proverbs"
  | "blood-affair-1996"
  | "media-representation"
  | "heritage-center"
  | "festivals-holagav"
  | "literature-creativity"
  | "olympic-athletes"
  | "visual-artists"
  | "famous-musicians"
  | "israel-ethiopia-relations";

// Only includes slugs that have full event data in events.server.ts
export const ALL_HERITAGE_EVENT_SLUGS: HeritageEventSlug[] = [
  "sigd",
  "genna",
  "aliyah-day",
  "beta-israel",
];

const EVENT_GLYPH: Record<HeritageEventSlug, string> = {
  sigd: "🕯️",
  genna: "✝️",
  "aliyah-day": "✈️",
  "beta-israel": "✡️",
  // Culture articles — generic glyph
  "sigd-meaning": "🕯️",
  "beta-israel-history": "✡️",
  "operation-solomon-1991": "✈️",
  "operation-moses-1984": "✈️",
  "kessim-priests": "📖",
  "orit-holy-book": "📖",
  "geez-sacred-language": "📜",
  "ethiopian-israeli-music": "🎵",
  "ethiopian-cuisine-recipes": "🍽️",
  "coffee-ceremony": "☕",
  "traditional-dress": "👘",
  "ethiopian-wedding": "💍",
  "20-sivan-memorial": "🕯️",
  "aliyah-day-june": "✈️",
  "notable-ethiopian-israelis": "⭐",
  "second-generation-identity": "🌍",
  "traditional-crafts": "🧵",
  "ethiopian-athletes": "🏃",
  "digital-diaspora": "💻",
  "amharic-learning": "📝",
  "amharic-proverbs": "💬",
  "blood-affair-1996": "🕯️",
  "media-representation": "📺",
  "heritage-center": "🏛️",
  "festivals-holagav": "🎉",
  "literature-creativity": "📚",
  "olympic-athletes": "🏅",
  "visual-artists": "🎨",
  "famous-musicians": "🎤",
  "israel-ethiopia-relations": "🤝",
};

export function glyphForHeritageEvent(slug: HeritageEventSlug): string {
  return EVENT_GLYPH[slug];
}

export function isHeritageEvent(value: string): value is HeritageEventSlug {
  return (ALL_HERITAGE_EVENT_SLUGS as string[]).includes(value);
}
