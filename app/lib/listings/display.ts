// Display-layer data-quality helpers for real-estate listings (TED-129).
//
// Listings are synced from merkaz-h.co.il by an external worker, so some
// source-data problems (mislabelled deal types, "4.0 חדרים" titles, duplicate
// rows) cannot be fixed at the root in this repo. These pure helpers are the
// shared safety net used by the listing queries and card/detail views.

/**
 * Deal-type guard: the merkaz-h.co.il sync sometimes labels rentals as
 * "sale". A residential *sale* in Israel is never priced below ₪100,000,
 * while monthly rents (₪2,000–₪20,000) always are — so a "sale" with a
 * price in that band is almost certainly a rental. Treat it as rent for
 * display (badge label + URL segment) until the source data is corrected
 * upstream (root cause lives in the external sync, not in this repo).
 */
export const RENT_PRICE_HEURISTIC_MAX_ILS = 100_000;

export function effectiveListingType<T extends string>(
  type: T,
  price: number | null,
): T | "rent" {
  if (
    type === "sale" &&
    price !== null &&
    price > 0 &&
    price < RENT_PRICE_HEURISTIC_MAX_ILS
  ) {
    return "rent";
  }
  return type;
}

/**
 * Israeli convention allows half rooms ("3.5 חדרים") but never "4.0".
 * Returns a display string — integer when whole, one decimal for halves —
 * or `null` when the count is missing/zero (callers omit the rooms part).
 */
export function formatRooms(rooms: unknown): string | null {
  if (typeof rooms !== "number" || !Number.isFinite(rooms) || rooms <= 0) {
    return null;
  }
  // Snap to the nearest half room (source data occasionally carries noise).
  const snapped = Math.round(rooms * 2) / 2;
  if (snapped <= 0) return null;
  return Number.isInteger(snapped) ? String(snapped) : snapped.toFixed(1);
}

/**
 * Clean up synced titles like "דירה — 4.0 חדרים" / "משרדים — 0.0 חדרים":
 * - a "0 rooms" suffix is meaningless — drop the whole rooms segment;
 * - whole room counts lose the trailing ".0" ("4.0 חדרים" → "4 חדרים").
 */
export function cleanListingTitle(title: string): string {
  return title
    .replace(/\s*[-–—]?\s*(?<![\d.])0(?:\.0)?\s*(?:חדרים|חד['׳]?|rooms?)/gi, "")
    .replace(/(\d+)\.0(\s*(?:חדרים|חד['׳]?|rooms?))/gi, "$1$2")
    .replace(/\s{2,}/g, " ")
    .replace(/\s*[-–—]\s*$/, "")
    .trim();
}

// --- De-duplication ---------------------------------------------------------

export type DedupableListing = {
  price: number | null;
  attributes: Record<string, unknown>;
};

/**
 * Stable identity for a synced listing: the external source id/URL when the
 * sync provided one, otherwise address+rooms. `null` means "no usable key" —
 * such rows are never merged.
 */
export function listingDedupeKey(listing: DedupableListing): string | null {
  const a = listing.attributes;
  const external = a.externalId ?? a.sourceId ?? a.externalSourceUrl;
  if (
    (typeof external === "string" && external.length > 0) ||
    typeof external === "number"
  ) {
    return `ext:${external}`;
  }
  const address = typeof a.address === "string" ? a.address.trim() : "";
  if (!address) return null;
  const rooms = typeof a.rooms === "number" ? a.rooms : "";
  return `addr:${address.toLowerCase()}|${rooms}`;
}

/**
 * Drop duplicate listings (same property synced twice — typically once with
 * a price and once without). The first occurrence keeps its position in the
 * result; when a later duplicate *has* a price and the kept one does not,
 * the priced record wins.
 */
export function dedupeListings<T extends DedupableListing>(items: T[]): T[] {
  const indexByKey = new Map<string, number>();
  const out: T[] = [];
  for (const item of items) {
    const key = listingDedupeKey(item);
    if (key === null) {
      out.push(item);
      continue;
    }
    const existingIndex = indexByKey.get(key);
    if (existingIndex === undefined) {
      indexByKey.set(key, out.length);
      out.push(item);
      continue;
    }
    const kept = out[existingIndex];
    if (kept !== undefined && kept.price === null && item.price !== null) {
      out[existingIndex] = item;
    }
  }
  return out;
}
