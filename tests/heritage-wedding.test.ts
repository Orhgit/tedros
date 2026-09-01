// Seed integrity + verified-source policy + JSON-LD + loader tests for the
// Ethiopian wedding & henna hub and supplier directory (TED-143).
//
// The load-bearing test in this file is "every supplier carries a source URL
// and a check date". Three separate fabrication incidents on this site — eight
// scholarships pointing at organisations that do not exist, retired phone
// numbers, and an invented grant — are the reason it exists. A supplier
// directory is the highest-risk shape of content on the site: an invented
// entry means someone dials a business that isn't there.

import { beforeAll, describe, expect, it } from "vitest";

beforeAll(() => {
  process.env.NODE_ENV = "test";
  process.env.PORT = process.env.PORT ?? "3000";
  process.env.PUBLIC_URL = process.env.PUBLIC_URL ?? "https://tedros.co.il";
  process.env.DATABASE_URL =
    process.env.DATABASE_URL ??
    "postgres://tedros:tedros_test@localhost:5432/tedros_test";
  process.env.AUTH_SECRET = process.env.AUTH_SECRET ?? "x".repeat(32);
  process.env.AUTH_TRUST_HOST = process.env.AUTH_TRUST_HOST ?? "true";
  process.env.EMAIL_FROM = process.env.EMAIL_FROM ?? "no-reply@tedros.local";
});

import { CITIES } from "../app/lib/cities/registry";
import {
  marriagePath,
  weddingJoinPath,
  weddingPath,
  weddingSupplierCategoryPath,
  weddingSupplierCityPath,
} from "../app/lib/heritage/links";
import { breadcrumbJsonLd, supplierItemListJsonLd } from "../app/lib/heritage/schema";
import {
  ALL_WEDDING_SUPPLIER_CATEGORIES,
  isWeddingSupplierCategory,
  isWeddingSupplierProfession,
  weddingSupplierProfession,
} from "../app/lib/heritage/wedding-categories";
import {
  BETA_ISRAEL_TERMS,
  HABESHA_TERMS,
  WEDDING_BODY,
  WEDDING_COPY,
  WEDDING_FAQ,
  WEDDING_SOURCES,
  WEDDING_STAGES,
  WEDDING_SUBTITLE,
  WEDDING_TITLE,
} from "../app/lib/heritage/wedding.server";
import {
  CATEGORY_INTROS,
  CATEGORY_NAMES,
  WEDDING_SUPPLIERS,
  citiesForCategory,
  suppliersByCategory,
  suppliersByCategoryCity,
  weddingSupplierCells,
} from "../app/lib/heritage/wedding-suppliers.server";
import { professionalApplicationSchema } from "../app/lib/professional-applications/validation";

import { loader as hubLoader } from "../app/routes/$lang.heritage.wedding._index";
import { loader as joinLoader } from "../app/routes/$lang.heritage.wedding.join";
import { loader as categoryLoader } from "../app/routes/$lang.heritage.wedding.suppliers.$category";
import { loader as cityLoader } from "../app/routes/$lang.heritage.wedding.suppliers.$category.$city";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

const LOCALES = ["he", "en", "am"] as const;
const ctx = { publicUrl: "https://tedros.co.il", locale: "he" as const };

// ---------------------------------------------------------------------------
// The verification policy — the reason this file exists
// ---------------------------------------------------------------------------

describe("WEDDING_SUPPLIERS verified-source policy", () => {
  it("every supplier carries a source URL, a source label and a check date", () => {
    expect(WEDDING_SUPPLIERS.length).toBeGreaterThan(0);
    for (const s of WEDDING_SUPPLIERS) {
      expect(s.name.length, `${s.name}: empty name`).toBeGreaterThan(1);
      expect(s.sourceUrl, `${s.name}: sourceUrl`).toMatch(/^https:\/\//);
      expect(s.sourceLabel.he.length, `${s.name}: sourceLabel.he`).toBeGreaterThan(3);
      // ISO date, so a reviewer can see at a glance how stale the check is.
      expect(s.checkedAt, `${s.name}: checkedAt`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(["current", "dated"]).toContain(s.confidence);
    }
  });

  it("every supplier has a non-empty offers + area description in all locales", () => {
    for (const s of WEDDING_SUPPLIERS) {
      for (const locale of LOCALES) {
        expect(s.offers[locale], `${s.name}: offers.${locale}`).toBeTruthy();
        expect(s.area[locale], `${s.name}: area.${locale}`).toBeTruthy();
      }
    }
  });

  it("sourceYear, when present, is a plausible year", () => {
    for (const s of WEDDING_SUPPLIERS) {
      if (s.sourceYear === undefined) continue;
      expect(s.sourceYear, `${s.name}`).toBeGreaterThanOrEqual(2010);
      expect(s.sourceYear, `${s.name}`).toBeLessThanOrEqual(2026);
    }
  });

  it("a 'current' supplier has recent evidence; anything older is 'dated'", () => {
    for (const s of WEDDING_SUPPLIERS) {
      if (s.confidence === "current" && s.sourceYear !== undefined) {
        expect(s.sourceYear, `${s.name} claims current`).toBeGreaterThanOrEqual(2024);
      }
    }
  });

  it("a dated supplier explains itself with a note", () => {
    // A "call ahead" badge with no reason is not useful. Every dated entry
    // says what the evidence actually was.
    for (const s of WEDDING_SUPPLIERS) {
      if (s.confidence === "dated") {
        expect(s.note, `${s.name}: dated entries need a note`).toBeDefined();
        expect(s.note!.he.length).toBeGreaterThan(20);
      }
    }
  });

  it("stores no phone numbers — the source link is the only contact route", () => {
    // Retired numbers are a recurring failure mode on this site (TED-155).
    // The directory sidesteps it entirely by never holding a number.
    const blob = JSON.stringify(WEDDING_SUPPLIERS);
    // Digit boundaries on both sides, so a Facebook numeric page id inside a
    // source URL is not mistaken for a phone number.
    expect(blob).not.toMatch(/(?<!\d)0\d{1,2}-\d{7}(?!\d)/); // 03-1234567
    expect(blob).not.toMatch(/(?<!\d)05\d-?\d{7}(?!\d)/); // 052-1234567 / 0521234567
    expect(blob).not.toMatch(/tel:/);
  });

  it("citySlug, when set, is a real registry city", () => {
    for (const s of WEDDING_SUPPLIERS) {
      if (!s.citySlug) continue;
      expect(
        CITIES.some((c) => c.slug === s.citySlug),
        `${s.name}: ${s.citySlug} missing from CITIES`,
      ).toBe(true);
    }
  });

  it("every supplier belongs to at least one known category", () => {
    for (const s of WEDDING_SUPPLIERS) {
      expect(s.categories.length, `${s.name}`).toBeGreaterThan(0);
      for (const c of s.categories) {
        expect(ALL_WEDDING_SUPPLIER_CATEGORIES).toContain(c);
      }
    }
  });

  it("source URLs are unique — the same page is never listed twice", () => {
    const urls = WEDDING_SUPPLIERS.map((s) => s.sourceUrl);
    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe("empty categories are left empty, not padded", () => {
  it("photography has no suppliers, and the page says so", () => {
    // The only candidate found was a lead-generation aggregator with no
    // identifiable photographer behind it. If this ever fails because a real
    // studio was found, that is good news — update the assertion. It must
    // never fail because one was invented.
    expect(suppliersByCategory("photography")).toHaveLength(0);
    for (const locale of LOCALES) {
      expect(WEDDING_COPY.emptyCategory![locale].length).toBeGreaterThan(30);
    }
  });

  it("music is not empty — the suppliers are just not on the marketplaces", () => {
    // This category was nearly shipped as empty on the strength of two
    // searches that found nothing. A third, wider one found bookable DJs with
    // 2026-dated wedding work. Kept as a standing reminder that "we found
    // nothing" is a claim about the search, not about the world.
    expect(suppliersByCategory("music").length).toBeGreaterThan(0);
  });

  it("every category still has a name and an intro in all locales", () => {
    for (const category of ALL_WEDDING_SUPPLIER_CATEGORIES) {
      for (const locale of LOCALES) {
        expect(CATEGORY_NAMES[category][locale]).toBeTruthy();
        expect(CATEGORY_INTROS[category][locale]!.length).toBeGreaterThan(40);
      }
    }
  });
});

describe("category × city cells", () => {
  it("a cell exists only where a supplier states that city itself", () => {
    for (const cell of weddingSupplierCells()) {
      expect(
        suppliersByCategoryCity(cell.category, cell.citySlug).length,
        `${cell.category}/${cell.citySlug}`,
      ).toBeGreaterThan(0);
    }
  });

  it("cities with no supplier get no cell", () => {
    for (const category of ALL_WEDDING_SUPPLIER_CATEGORIES) {
      const covered = citiesForCategory(category);
      for (const city of CITIES) {
        if (covered.includes(city.slug)) continue;
        expect(suppliersByCategoryCity(category, city.slug)).toHaveLength(0);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Guide content
// ---------------------------------------------------------------------------

describe("wedding guide content", () => {
  it("has title, subtitle and body in all three locales", () => {
    for (const locale of LOCALES) {
      expect(WEDDING_TITLE[locale].length).toBeGreaterThan(10);
      expect(WEDDING_SUBTITLE[locale].length).toBeGreaterThan(40);
      expect(WEDDING_BODY[locale].length).toBeGreaterThan(200);
    }
  });

  it("covers the stages the guide promises, in order", () => {
    expect(WEDDING_STAGES.map((s) => s.id)).toEqual([
      "shlichim",
      "ij-menshiya",
      "kal-kidan",
      "henna",
      "chuppah",
      "after",
    ]);
    for (const stage of WEDDING_STAGES) {
      for (const locale of LOCALES) {
        expect(stage.title[locale]).toBeTruthy();
        expect(stage.timing[locale]).toBeTruthy();
        expect(stage.detail[locale]!.length).toBeGreaterThan(80);
      }
    }
  });

  it("links the chuppah stage to the marriage-registration guide", () => {
    const chuppah = WEDDING_STAGES.find((s) => s.id === "chuppah")!;
    expect(chuppah.internalPath).toBe(marriagePath());
  });

  it("keeps the Beta Israel and habesha vocabularies in separate lists", () => {
    // Conflating them is the single most common error in web content on this
    // subject, and the whole reason the guide has two term sections.
    const betaIsrael = JSON.stringify(BETA_ISRAEL_TERMS);
    for (const habeshaOnly of ["melse", "Telosh", "Shimagile", "Gursha", "Shuruba"]) {
      expect(betaIsrael.toLowerCase()).not.toContain(habeshaOnly.toLowerCase());
    }
    expect(HABESHA_TERMS.length).toBeGreaterThanOrEqual(5);
    for (const locale of LOCALES) {
      expect(WEDDING_COPY.habeshaTermsNote![locale].length).toBeGreaterThan(60);
    }
  });

  it("never invents a price", () => {
    // The research found no documented cost for anything here. The FAQ says
    // so out loud; this guards the whole module against a shekel figure
    // creeping back in.
    const blob = JSON.stringify([WEDDING_STAGES, WEDDING_FAQ, WEDDING_BODY]);
    expect(blob).not.toMatch(/₪/);
    expect(blob).not.toMatch(/\bשקלים\b/);
  });

  it("does not claim the kes can register a marriage", () => {
    const kesFaq = WEDDING_FAQ.find((f) => f.id === "kes")!;
    expect(kesFaq.answer.he).toContain("הרבנות הראשית");
    expect(kesFaq.answer.en).toContain("Chief Rabbinate");
  });

  it("FAQ items are complete in all locales", () => {
    expect(WEDDING_FAQ.length).toBeGreaterThanOrEqual(6);
    for (const item of WEDDING_FAQ) {
      for (const locale of LOCALES) {
        expect(item.question[locale]).toBeTruthy();
        expect(item.answer[locale]!.length).toBeGreaterThan(40);
      }
    }
  });

  it("cites the peer-reviewed anchor source plus corroborating press", () => {
    expect(WEDDING_SOURCES.length).toBeGreaterThanOrEqual(5);
    for (const s of WEDDING_SOURCES) {
      expect(s.url).toMatch(/^https:\/\//);
      for (const locale of LOCALES) expect(s.name[locale]).toBeTruthy();
    }
    expect(WEDDING_SOURCES.some((s) => s.url.includes("ybz.org.il"))).toBe(true);
    expect(WEDDING_SOURCES.some((s) => s.url.includes("ynet.co.il"))).toBe(true);
  });

  it("every copy key is filled in all three locales", () => {
    for (const [key, value] of Object.entries(WEDDING_COPY)) {
      for (const locale of LOCALES) {
        expect(value[locale], `${key}.${locale}`).toBeTruthy();
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Links, categories, intake
// ---------------------------------------------------------------------------

describe("links + category helpers", () => {
  it("path helpers are stable", () => {
    expect(weddingPath()).toBe("/heritage/wedding");
    expect(weddingJoinPath()).toBe("/heritage/wedding/join");
    expect(weddingSupplierCategoryPath("catering")).toBe(
      "/heritage/wedding/suppliers/catering",
    );
    expect(weddingSupplierCityPath("catering", "yavne")).toBe(
      "/heritage/wedding/suppliers/catering/yavne",
    );
  });

  it("isWeddingSupplierCategory guards the route param", () => {
    expect(isWeddingSupplierCategory("catering")).toBe(true);
    expect(isWeddingSupplierCategory("lawyer")).toBe(false);
  });
});

describe("supplier intake shares the applications pipeline without polluting it", () => {
  it("namespaces the supplier profession value", () => {
    expect(weddingSupplierProfession("dress")).toBe("wedding-dress");
    expect(isWeddingSupplierProfession("wedding-dress")).toBe(true);
    expect(isWeddingSupplierProfession("wedding-nope")).toBe(false);
    // A licensed profession must never be mistaken for a supplier category.
    expect(isWeddingSupplierProfession("lawyer")).toBe(false);
  });

  it("the shared application schema accepts a supplier submission", () => {
    const parsed = professionalApplicationSchema.safeParse({
      name: "עסק לדוגמה",
      profession: weddingSupplierProfession("henna-styling"),
      phone: "050-0000000",
      primaryRegions: ["netivot"],
      languages: ["he"],
      bio: "הפקת חינה — https://example.com",
      consentToPublish: "on",
      locale: "he",
    });
    expect(parsed.success).toBe(true);
  });

  it("still rejects an unknown profession value", () => {
    const parsed = professionalApplicationSchema.safeParse({
      name: "עסק לדוגמה",
      profession: "wedding-astrologer",
      phone: "050-0000000",
      primaryRegions: ["netivot"],
      languages: ["he"],
      consentToPublish: "on",
    });
    expect(parsed.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

describe("supplierItemListJsonLd", () => {
  it("emits ItemList of LocalBusiness with 1-indexed positions", () => {
    const out = supplierItemListJsonLd(ctx, {
      path: weddingSupplierCategoryPath("catering"),
      name: "x",
      description: "y",
      suppliers: [
        { name: "א", url: "https://a.example", cityName: "יבנה", area: "מרכז" },
        { name: "ב", url: "https://b.example" },
      ],
    });
    expect(out["@type"]).toBe("ItemList");
    expect(out["numberOfItems"]).toBe(2);
    const items = out["itemListElement"] as Array<Record<string, unknown>>;
    expect(items[0]?.position).toBe(1);
    const first = items[0]?.item as Record<string, unknown>;
    expect(first["@type"]).toBe("LocalBusiness");
    const addr = first["address"] as Record<string, unknown>;
    expect(addr["addressLocality"]).toBe("יבנה");
    // No address is emitted for a business whose page states no location.
    const second = items[1]?.item as Record<string, unknown>;
    expect(second["address"]).toBeUndefined();
  });

  it("breadcrumbJsonLd is 1-indexed", () => {
    const out = breadcrumbJsonLd(ctx, [
      { name: "Home", path: "/" },
      { name: "Wedding", path: weddingPath() },
    ]);
    const items = out["itemListElement"] as Array<Record<string, unknown>>;
    expect(items[1]?.position).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// Loaders
// ---------------------------------------------------------------------------

describe("hub loader", () => {
  it("returns the guide plus every category in every locale", async () => {
    for (const lang of LOCALES) {
      const data = await hubLoader(fakeArgs({ lang }));
      expect(data.locale).toBe(lang);
      expect(data.stages).toHaveLength(WEDDING_STAGES.length);
      expect(data.faq).toHaveLength(WEDDING_FAQ.length);
      expect(data.categories).toHaveLength(ALL_WEDDING_SUPPLIER_CATEGORIES.length);
      expect(data.sources.length).toBeGreaterThanOrEqual(5);
      for (const c of data.categories) expect(c.countLabel.length).toBeGreaterThan(3);
    }
  });

  it("falls back to the default locale on a bad lang param", async () => {
    const data = await hubLoader(fakeArgs({ lang: "xx" }));
    expect(data.locale).toBe("he");
  });
});

describe("category loader", () => {
  it("loads every category in every locale, empty ones included", async () => {
    for (const category of ALL_WEDDING_SUPPLIER_CATEGORIES) {
      for (const lang of LOCALES) {
        const data = await categoryLoader(fakeArgs({ lang, category }));
        expect(data.category).toBe(category);
        expect(data.suppliers).toHaveLength(suppliersByCategory(category).length);
        expect(data.title.length).toBeGreaterThan(5);
        expect(data.description.length).toBeGreaterThan(20);
      }
    }
  });

  it("404s on an unknown or missing category", async () => {
    for (const category of ["lawyer", "atlantis", undefined]) {
      await expect(
        categoryLoader(fakeArgs({ lang: "he", category })),
      ).rejects.toMatchObject({ init: { status: 404 } });
    }
  });
});

describe("category × city loader", () => {
  it("loads every populated cell in every locale", async () => {
    const cells = weddingSupplierCells();
    expect(cells.length).toBeGreaterThan(0);
    for (const cell of cells) {
      for (const lang of LOCALES) {
        const data = await cityLoader(
          fakeArgs({ lang, category: cell.category, city: cell.citySlug }),
        );
        expect(data.citySlug).toBe(cell.citySlug);
        expect(data.suppliers.length).toBeGreaterThan(0);
      }
    }
  });

  it("404s on a cell with no verified supplier", async () => {
    // Never an empty city page — that is the invitation to pad it.
    await expect(
      cityLoader(fakeArgs({ lang: "he", category: "music", city: "netanya" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
    await expect(
      cityLoader(fakeArgs({ lang: "he", category: "catering", city: "jerusalem" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
    await expect(
      cityLoader(fakeArgs({ lang: "he", category: "catering", city: "atlantis" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });
});

describe("join loader", () => {
  it("resolves form labels for every category in every locale", async () => {
    for (const lang of LOCALES) {
      const data = await joinLoader(fakeArgs({ lang }));
      expect(data.title.length).toBeGreaterThan(5);
      for (const category of ALL_WEDDING_SUPPLIER_CATEGORIES) {
        expect(data.labels.categoryNames[category]).toBeTruthy();
      }
      // The hint is what keeps the directory verifiable — it must never be
      // silently dropped from a locale.
      expect(data.labels.descriptionHint.length).toBeGreaterThan(40);
    }
  });
});
