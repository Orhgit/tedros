// Display-layer data-quality helpers for synced listings (TED-129).
import { describe, expect, it } from "vitest";

import {
  cleanListingTitle,
  dedupeListings,
  effectiveListingType,
  formatRooms,
  listingDedupeKey,
} from "../app/lib/listings/display";

describe("effectiveListingType", () => {
  it("treats a 'sale' with a monthly-rent-sized price as rent", () => {
    expect(effectiveListingType("sale", 4300)).toBe("rent");
    expect(effectiveListingType("sale", 5600)).toBe("rent");
    expect(effectiveListingType("sale", 16000)).toBe("rent");
    expect(effectiveListingType("sale", 99999)).toBe("rent");
  });

  it("keeps a real sale price as sale", () => {
    expect(effectiveListingType("sale", 100_000)).toBe("sale");
    expect(effectiveListingType("sale", 1_850_000)).toBe("sale");
  });

  it("never reclassifies when the price is missing or zero", () => {
    expect(effectiveListingType("sale", null)).toBe("sale");
    expect(effectiveListingType("sale", 0)).toBe("sale");
  });

  it("leaves non-sale types untouched", () => {
    expect(effectiveListingType("rent", 4300)).toBe("rent");
    expect(effectiveListingType("commercial", 5000)).toBe("commercial");
    expect(effectiveListingType("urban_renewal", 900)).toBe("urban_renewal");
  });
});

describe("formatRooms", () => {
  it("formats whole room counts as integers", () => {
    expect(formatRooms(4)).toBe("4");
    expect(formatRooms(4.0)).toBe("4");
  });

  it("keeps half rooms", () => {
    expect(formatRooms(3.5)).toBe("3.5");
  });

  it("snaps noisy values to the nearest half", () => {
    expect(formatRooms(3.499999)).toBe("3.5");
    expect(formatRooms(4.01)).toBe("4");
  });

  it("returns null for 0, negatives, and non-numbers", () => {
    expect(formatRooms(0)).toBeNull();
    expect(formatRooms(-1)).toBeNull();
    expect(formatRooms(null)).toBeNull();
    expect(formatRooms(undefined)).toBeNull();
    expect(formatRooms("4")).toBeNull();
    expect(formatRooms(NaN)).toBeNull();
  });
});

describe("cleanListingTitle", () => {
  it("drops the trailing .0 from whole room counts", () => {
    expect(cleanListingTitle("דירה — 4.0 חדרים")).toBe("דירה — 4 חדרים");
  });

  it("keeps half rooms untouched", () => {
    expect(cleanListingTitle("דירה — 3.5 חדרים")).toBe("דירה — 3.5 חדרים");
  });

  it("removes a meaningless 0-rooms segment entirely", () => {
    expect(cleanListingTitle("משרדים — 0.0 חדרים")).toBe("משרדים");
    expect(cleanListingTitle("משרדים — 0 חדרים")).toBe("משרדים");
  });

  it("does not mangle double-digit room counts", () => {
    expect(cleanListingTitle("וילה — 10 חדרים")).toBe("וילה — 10 חדרים");
  });

  it("leaves clean titles alone", () => {
    expect(cleanListingTitle("דירת 4 חדרים מרווחת בקריית נורדאו")).toBe(
      "דירת 4 חדרים מרווחת בקריית נורדאו",
    );
  });
});

describe("listingDedupeKey", () => {
  it("prefers the external source id/url", () => {
    expect(
      listingDedupeKey({
        price: null,
        attributes: { externalSourceUrl: "https://merkaz-h.co.il/p/123" },
      }),
    ).toBe("ext:https://merkaz-h.co.il/p/123");
  });

  it("falls back to address+rooms", () => {
    expect(
      listingDedupeKey({
        price: 100,
        attributes: { address: "הרצל 10, נתניה", rooms: 4 },
      }),
    ).toBe("addr:הרצל 10, נתניה|4");
  });

  it("returns null when there is nothing to key on", () => {
    expect(listingDedupeKey({ price: null, attributes: {} })).toBeNull();
  });
});

describe("dedupeListings", () => {
  const ext = (id: string, price: number | null, tag?: string) => ({
    price,
    attributes: { externalSourceUrl: id },
    tag,
  });

  it("keeps the priced record when the same property appears twice", () => {
    const priceless = ext("p/1", null, "priceless");
    const priced = ext("p/1", 1_200_000, "priced");
    expect(dedupeListings([priceless, priced])).toEqual([{ ...priced }]);
    // ...and also when the priced one comes first.
    expect(dedupeListings([priced, priceless])).toEqual([{ ...priced }]);
  });

  it("dedupes by address+rooms when no external id exists", () => {
    const a = { price: null, attributes: { address: "הרצל 10", rooms: 3 } };
    const b = { price: 4300, attributes: { address: "הרצל 10", rooms: 3 } };
    expect(dedupeListings([a, b])).toEqual([b]);
  });

  it("keeps distinct listings and preserves order", () => {
    const items = [ext("p/1", 100), ext("p/2", null), ext("p/3", 300)];
    expect(dedupeListings(items)).toEqual(items);
  });

  it("never merges rows without any dedupe key", () => {
    const a = { price: null, attributes: {} };
    const b = { price: null, attributes: {} };
    expect(dedupeListings([a, b])).toHaveLength(2);
  });
});
