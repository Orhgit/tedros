import { describe, expect, it } from "vitest";

import { findNeighborhoodBySlug } from "../app/lib/urban-renewal/registry";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  governmentServiceJsonLd,
  itemListJsonLd,
  placeJsonLd,
  type SchemaContext,
} from "../app/lib/urban-renewal/schema";

const ctx: SchemaContext = { publicUrl: "https://tedros.co.il", locale: "he" };
const dora = findNeighborhoodBySlug("dora-netanya")!;

describe("breadcrumbJsonLd", () => {
  it("produces a BreadcrumbList with 1-indexed positions and locale-aware URLs", () => {
    const out = breadcrumbJsonLd(ctx, [
      { name: "ראשי", path: "/" },
      { name: "נתניה", path: "/cities/netanya" },
      { name: "דורה", path: "/urban-renewal/dora-netanya" },
    ]);
    expect(out["@type"]).toBe("BreadcrumbList");
    const items = out["itemListElement"] as Array<Record<string, unknown>>;
    expect(items).toHaveLength(3);
    expect(items[0]?.position).toBe(1);
    expect(items[2]?.item).toBe("https://tedros.co.il/he/urban-renewal/dora-netanya");
  });
});

describe("placeJsonLd", () => {
  it("emits @type=Place with containedInPlace City and no geo", () => {
    const out = placeJsonLd(ctx, dora, "נתניה");
    expect(out["@type"]).toBe("Place");
    expect(out["name"]).toBe("דורה");
    const contained = out["containedInPlace"] as Record<string, unknown>;
    expect(contained["@type"]).toBe("City");
    expect(contained["name"]).toBe("נתניה");
    expect(out["geo"]).toBeUndefined();
  });

  it("respects locale for name", () => {
    const out = placeJsonLd({ ...ctx, locale: "en" }, dora, "Netanya");
    expect(out["name"]).toBe("Dora");
  });
});

describe("governmentServiceJsonLd", () => {
  it("emits @type=GovernmentService with provider from the authority field", () => {
    const out = governmentServiceJsonLd(ctx, dora, "נתניה");
    expect(out["@type"]).toBe("GovernmentService");
    expect(out["description"]).toBe(dora.status.he);
    const provider = out["provider"] as Record<string, unknown>;
    expect(provider["@type"]).toBe("GovernmentOrganization");
    expect(provider["name"]).toBe(dora.authority.he);
  });
});

describe("itemListJsonLd", () => {
  it("emits an ItemList with 1-indexed ListItems and locale-aware URLs (TED-94)", () => {
    const out = itemListJsonLd(ctx, [
      { name: "דורה", path: "/urban-renewal/dora-netanya" },
      { name: "נאות שקד", path: "/urban-renewal/neot-shaked-netanya" },
    ]);
    expect(out["@type"]).toBe("ItemList");
    expect(out["numberOfItems"]).toBe(2);
    const items = out["itemListElement"] as Array<Record<string, unknown>>;
    expect(items).toHaveLength(2);
    expect(items[0]?.position).toBe(1);
    expect(items[0]?.url).toBe("https://tedros.co.il/he/urban-renewal/dora-netanya");
    expect(items[1]?.position).toBe(2);
    expect(items[1]?.name).toBe("נאות שקד");
  });

  it("handles an empty list", () => {
    const out = itemListJsonLd(ctx, []);
    expect(out["numberOfItems"]).toBe(0);
    expect(out["itemListElement"]).toEqual([]);
  });
});

describe("faqJsonLd", () => {
  it("emits an FAQPage with localized Q&As", () => {
    const out = faqJsonLd(ctx, [
      {
        question: { he: "שאלה?", en: "Question?", am: "ጥያቄ?" },
        answer: { he: "תשובה.", en: "Answer.", am: "መልስ።" },
      },
    ]);
    expect(out["@type"]).toBe("FAQPage");
    const entities = out["mainEntity"] as Array<Record<string, unknown>>;
    expect(entities).toHaveLength(1);
    expect(entities[0]?.name).toBe("שאלה?");
    const answer = entities[0]?.acceptedAnswer as Record<string, unknown>;
    expect(answer["text"]).toBe("תשובה.");
  });
});
