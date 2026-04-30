// Client-safe org-profile runtime helpers — categories + glyphs only.
// Splits out the small runtime bits used by route components from the
// large seed (`orgs.server.ts`), so the seed never ends up in the
// client bundle.

export type OrgCategory = "education" | "legal" | "health" | "community";

export const ORG_CATEGORY_TO_TAG: Record<OrgCategory, string> = {
  education: "scholarship",
  legal: "legal",
  health: "health",
  community: "community",
};

const ORG_CATEGORY_GLYPH: Record<OrgCategory, string> = {
  education: "🎓",
  legal: "⚖️",
  health: "🏥",
  community: "🤝",
};

export function glyphForOrgCategory(category: OrgCategory): string {
  return ORG_CATEGORY_GLYPH[category];
}
