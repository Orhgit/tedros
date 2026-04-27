import { describe, expect, it } from "vitest";
import {
  parseListingAttributes,
  parseListingIntake,
  listingAttributesSchema,
} from "../app/lib/validation/listings";

const baseSale = {
  address: "רחוב הרצל 12, נתניה",
  currency: "ILS",
  areaM2: 95,
  rooms: 4,
  bedrooms: 3,
  bathrooms: 2,
  amenities: ["מעלית"],
};

describe("parseListingAttributes", () => {
  it("accepts a valid sale payload", () => {
    const out = parseListingAttributes("sale", baseSale);
    expect(out.type).toBe("sale");
    if (out.type === "sale") {
      expect(out.priceIncludesVat).toBe(true); // default
      expect(out.areaM2).toBe(95);
    }
  });

  it("rejects negative areaM2", () => {
    expect(() =>
      parseListingAttributes("sale", { ...baseSale, areaM2: -10 }),
    ).toThrow();
  });

  it("rejects rooms that aren't a multiple of 0.5", () => {
    expect(() =>
      parseListingAttributes("sale", { ...baseSale, rooms: 3.7 }),
    ).toThrow();
  });

  it("rejects unknown listing types via discriminated union", () => {
    expect(() =>
      listingAttributesSchema.parse({ ...baseSale, type: "yacht" }),
    ).toThrow();
  });

  it("requires programKind on urban_renewal", () => {
    expect(() =>
      parseListingAttributes("urban_renewal", { ...baseSale }),
    ).toThrow();
    const ok = parseListingAttributes("urban_renewal", {
      ...baseSale,
      programKind: "pinui_binui",
    });
    expect(ok.type).toBe("urban_renewal");
  });

  it("requires programCode on gov_program and defaults unitsAvailable", () => {
    const ok = parseListingAttributes("gov_program", {
      ...baseSale,
      programCode: "mehir-lemishtaken-2026",
    });
    if (ok.type === "gov_program") {
      expect(ok.programCode).toBe("mehir-lemishtaken-2026");
      expect(ok.unitsAvailable).toBe(1);
    }
  });

  it("requires commercialKind on commercial", () => {
    expect(() =>
      parseListingAttributes("commercial", { ...baseSale }),
    ).toThrow();
    const ok = parseListingAttributes("commercial", {
      ...baseSale,
      commercialKind: "office",
    });
    expect(ok.type).toBe("commercial");
  });
});

describe("parseListingIntake", () => {
  const cityId = "11111111-1111-1111-1111-111111111111";
  const agencyId = "22222222-2222-2222-2222-222222222222";

  it("validates top-level + attributes together", () => {
    const out = parseListingIntake({
      agencyId,
      type: "rent",
      title: { he: "דירת 3 חדרים" },
      price: "5400", // string — coerced
      cityId,
      attributes: {
        rooms: 3,
        depositMonths: 2,
        furnishedLevel: "partial",
      },
    });
    expect(out.price).toBe(5400);
    expect(out.attributes.type).toBe("rent");
    if (out.attributes.type === "rent") {
      expect(out.attributes.depositMonths).toBe(2);
    }
  });

  it("defaults status to draft", () => {
    const out = parseListingIntake({
      agencyId,
      type: "sale",
      title: { he: "דירה" },
      cityId,
      attributes: { rooms: 4 },
    });
    expect(out.status).toBe("draft");
  });

  it("rejects an HE title shorter than 2 chars", () => {
    expect(() =>
      parseListingIntake({
        agencyId,
        type: "sale",
        title: { he: "א" },
        cityId,
        attributes: {},
      }),
    ).toThrow();
  });
});
