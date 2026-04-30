// Visual mapping from a right's tags to a "tone" — a small set of background +
// border + text Tailwind class triplets drawn from the existing earth + flag
// palette in `app/app.css`. Used by the Rights Hub (RIN-328) so each right
// reads visually distinct without us hand-styling 8+ pages individually.
//
// First-tag wins (the seed orders tags by relevance). The mapping is
// deliberately small — 6 tones, drawn from the design tokens already
// committed in ADR-008 / `tokens.json`. Adding new tags without an explicit
// mapping falls through to `earth` (the brand default).

export type Tone = "earth" | "green" | "gold" | "red" | "sigd" | "ink";

export interface ToneClasses {
  // Solid color block (for the page hero accent stripe).
  accentBg: string;
  // Soft tint for tag chips + asides (~10% saturation of the accent).
  softBg: string;
  // Border + text used together with softBg.
  border: string;
  text: string;
  // Hover variant for clickable chips.
  hoverBg: string;
}

const TONES: Record<Tone, ToneClasses> = {
  earth: {
    accentBg: "bg-earth-700",
    softBg: "bg-earth-100",
    border: "border-earth-300",
    text: "text-earth-900",
    hoverBg: "hover:bg-earth-200",
  },
  green: {
    accentBg: "bg-accent-green",
    softBg: "bg-accent-green/10",
    border: "border-accent-green/30",
    text: "text-accent-green",
    hoverBg: "hover:bg-accent-green/20",
  },
  gold: {
    accentBg: "bg-accent-yellow",
    softBg: "bg-accent-yellow/20",
    border: "border-accent-yellow/40",
    text: "text-earth-900",
    hoverBg: "hover:bg-accent-yellow/30",
  },
  red: {
    accentBg: "bg-accent-red",
    softBg: "bg-accent-red/10",
    border: "border-accent-red/30",
    text: "text-accent-red",
    hoverBg: "hover:bg-accent-red/20",
  },
  sigd: {
    accentBg: "bg-accent-sigd",
    softBg: "bg-accent-sigd/10",
    border: "border-accent-sigd/30",
    text: "text-accent-sigd",
    hoverBg: "hover:bg-accent-sigd/20",
  },
  ink: {
    accentBg: "bg-ink-700",
    softBg: "bg-ink-100",
    border: "border-ink-300",
    text: "text-ink-700",
    hoverBg: "hover:bg-ink-200",
  },
};

const TAG_TO_TONE: Record<string, Tone> = {
  housing: "earth",
  mortgage: "gold",
  grants: "green",
  new_immigrant: "green",
  monthly_payment: "earth",
  employment: "sigd",
  public_sector: "earth",
  affirmative_action: "red",
  education: "sigd",
  scholarship: "gold",
  student: "earth",
  family: "red",
  subsidy: "green",
  welfare: "earth",
  legal: "ink",
  advocacy: "red",
  anchor_partner: "sigd",
  falash_mura: "earth",
  current_program: "green",
  // RIN-336 expansion (10 → 18 rights, more category breadth):
  senior: "earth",
  mentorship: "sigd",
  mental_health: "sigd",
  tax_relief: "gold",
  small_business: "earth",
  entrepreneurship: "gold",
  civic_service: "ink",
  urban_renewal: "earth",
  youth: "green",
  health: "red",
};

export function toneForTag(tag: string): Tone {
  return TAG_TO_TONE[tag] ?? "earth";
}

export function classesForTag(tag: string): ToneClasses {
  return TONES[toneForTag(tag)];
}

// Tag chip — soft background + matching border. Used on both landing cards
// and detail headers.
export function tagChipClasses(tag: string): string {
  const c = TONES[toneForTag(tag)];
  return `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition ${c.softBg} ${c.border} ${c.text} ${c.hoverBg}`;
}

// One small Unicode glyph per tag — keeps the tone+icon scheme tight without
// pulling in an icon library or per-page SVGs. Safe across HE/EN/AM bidi.
const TAG_GLYPH: Record<string, string> = {
  housing: "🏠",
  mortgage: "🏦",
  grants: "🎁",
  new_immigrant: "✈️",
  monthly_payment: "💰",
  employment: "💼",
  public_sector: "🏛️",
  affirmative_action: "⚖️",
  education: "📚",
  scholarship: "🎓",
  student: "📖",
  family: "👨‍👩‍👧",
  subsidy: "🤝",
  welfare: "🛟",
  legal: "⚖️",
  advocacy: "📣",
  anchor_partner: "⭐",
  falash_mura: "🕊️",
  current_program: "🆕",
  // RIN-336 expansion:
  senior: "🧓",
  mentorship: "🤲",
  mental_health: "🧠",
  tax_relief: "💸",
  small_business: "🏪",
  entrepreneurship: "🚀",
  civic_service: "🎖️",
  urban_renewal: "🏗️",
  youth: "🌱",
  health: "🏥",
};

export function glyphForTag(tag: string): string {
  return TAG_GLYPH[tag] ?? "•";
}
