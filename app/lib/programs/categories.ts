// Client-safe programs runtime helpers — track + glyphs + tone.

export type ProgramTrack =
  | "education"
  | "career"
  | "health"
  | "community"
  | "legal"
  | "funding";

export const ALL_PROGRAM_TRACKS: ProgramTrack[] = [
  "education",
  "career",
  "health",
  "community",
  "legal",
  "funding",
];

export const PROGRAM_TRACK_TO_TAG: Record<ProgramTrack, string> = {
  education: "scholarship",
  career: "mentorship",
  health: "health",
  community: "community",
  legal: "legal",
  funding: "grants",
};

const PROGRAM_TRACK_GLYPH: Record<ProgramTrack, string> = {
  education: "📚",
  career: "💼",
  health: "🏥",
  community: "🤝",
  legal: "⚖️",
  funding: "💰",
};

export function glyphForProgramTrack(track: ProgramTrack): string {
  return PROGRAM_TRACK_GLYPH[track];
}
