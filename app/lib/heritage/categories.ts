// Client-safe heritage event runtime helpers — event types + glyphs.
// Mirrors `lib/orgs/categories.ts` shape. The seed
// (`lib/heritage/events.server.ts`) is server-only.

export type HeritageEventSlug =
  | "sigd"
  | "genna"
  | "aliyah-day";

export const ALL_HERITAGE_EVENT_SLUGS: HeritageEventSlug[] = [
  "sigd",
  "genna",
  "aliyah-day",
];

const EVENT_GLYPH: Record<HeritageEventSlug, string> = {
  sigd: "🕯️",
  genna: "✝️",
  "aliyah-day": "✈️",
};

export function glyphForHeritageEvent(slug: HeritageEventSlug): string {
  return EVENT_GLYPH[slug];
}

export function isHeritageEvent(value: string): value is HeritageEventSlug {
  return (ALL_HERITAGE_EVENT_SLUGS as string[]).includes(value);
}
