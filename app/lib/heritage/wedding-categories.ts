// Client-safe runtime helpers for the Ethiopian wedding & henna supplier
// directory (TED-143). Mirrors `professionals/categories.ts` and
// `heritage/categories.ts`: the enum + glyphs live here so routes, `meta`
// and links can reach them; the seed (`wedding-suppliers.server.ts`) is
// server-only and never enters the client bundle (ADR-020).

export type WeddingSupplierCategory =
  | "catering"
  | "dress"
  | "music"
  | "henna-styling"
  | "photography";

export const ALL_WEDDING_SUPPLIER_CATEGORIES: WeddingSupplierCategory[] = [
  "catering",
  "dress",
  "music",
  "henna-styling",
  "photography",
];

const CATEGORY_GLYPH: Record<WeddingSupplierCategory, string> = {
  catering: "🍽️",
  dress: "👗",
  music: "🥁",
  "henna-styling": "💛",
  photography: "📷",
};

export function glyphForWeddingCategory(category: WeddingSupplierCategory): string {
  return CATEGORY_GLYPH[category];
}

export function isWeddingSupplierCategory(
  value: string,
): value is WeddingSupplierCategory {
  return (ALL_WEDDING_SUPPLIER_CATEGORIES as string[]).includes(value);
}

/**
 * Namespaced value stored in `professional_applications.profession` for a
 * wedding-supplier submission. The prefix keeps supplier intake out of the
 * licensed-professionals directory, which only ever reads `Profession`
 * values — see the PR for TED-143 for the reasoning.
 */
export const WEDDING_SUPPLIER_PROFESSION_PREFIX = "wedding-";

export function weddingSupplierProfession(category: WeddingSupplierCategory): string {
  return `${WEDDING_SUPPLIER_PROFESSION_PREFIX}${category}`;
}

export function isWeddingSupplierProfession(value: string): boolean {
  if (!value.startsWith(WEDDING_SUPPLIER_PROFESSION_PREFIX)) return false;
  return isWeddingSupplierCategory(
    value.slice(WEDDING_SUPPLIER_PROFESSION_PREFIX.length),
  );
}
