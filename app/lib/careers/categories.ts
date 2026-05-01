// Client-safe career-track runtime helpers — categories + glyphs.
// Mirrors `lib/orgs/categories.ts`. Splits the small runtime bits used by
// route components from the large seed (`careers.server.ts`), so the
// seed never ends up in the client bundle.

export type CareerTrack =
  | "tech"
  | "healthcare"
  | "education"
  | "public-sector"
  | "entrepreneurship"
  | "finance"
  | "social-work"
  | "law"
  | "trades"
  | "retail-services";

export const ALL_CAREER_TRACKS: CareerTrack[] = [
  "tech",
  "healthcare",
  "education",
  "public-sector",
  "entrepreneurship",
  "finance",
  "social-work",
  "law",
  "trades",
  "retail-services",
];

// Tag mapped to each track for tone styling and category lookups.
// Values reuse the existing rights tag vocabulary so a track page can
// reuse `lib/rights/categories.ts` tone+chip classes without a parallel
// palette. Each value here is a key in `TAG_TO_TONE` / `TAG_GLYPH`.
export const CAREER_TRACK_TO_TAG: Record<CareerTrack, string> = {
  tech: "tech",
  healthcare: "health",
  education: "education",
  "public-sector": "public_sector",
  entrepreneurship: "entrepreneurship",
  finance: "tax_relief",
  "social-work": "community",
  law: "legal",
  trades: "small_business",
  "retail-services": "small_business",
};

const CAREER_TRACK_GLYPH: Record<CareerTrack, string> = {
  tech: "💻",
  healthcare: "🏥",
  education: "🎓",
  "public-sector": "🏛️",
  entrepreneurship: "🚀",
  finance: "📊",
  "social-work": "🤝",
  law: "⚖️",
  trades: "🔧",
  "retail-services": "🛍️",
};

export function glyphForCareerTrack(track: CareerTrack): string {
  return CAREER_TRACK_GLYPH[track];
}

export function isCareerTrack(value: string): value is CareerTrack {
  return (ALL_CAREER_TRACKS as string[]).includes(value);
}
