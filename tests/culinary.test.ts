// Seed integrity + verified-source policy + JSON-LD + loader tests for
// the Culinary vertical (TED-146).

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
import { culinaryPath, culinaryShoppingCityPath, sigdMenuPath } from "../app/lib/culinary/links";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  shopItemListJsonLd,
  webPageJsonLd,
} from "../app/lib/culinary/schema";
import {
  CITY_SHOPPING,
  ONLINE_SELLERS,
  findCityShopping,
} from "../app/lib/culinary/shops.server";
import { SIGD_MENU_GUIDE, sigdMenuBody } from "../app/lib/culinary/sigd-menu.server";
import {
  CULINARY_STAPLES,
  findStaple,
  stapleBody,
} from "../app/lib/culinary/staples.server";
import { HERITAGE_EVENTS } from "../app/lib/heritage/events.server";

import { loader as pillarLoader } from "../app/routes/$lang.culinary._index";
import { loader as cityLoader } from "../app/routes/$lang.culinary.shopping.$city";
import { loader as sigdMenuLoader } from "../app/routes/$lang.culinary.sigd-menu";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

const ctx = { publicUrl: "https://tedros.co.il", locale: "he" as const };
const LOCALES = ["he", "en", "am"] as const;

describe("CULINARY_STAPLES seed shape", () => {
  it("contains the 4 staples + the teff health section", () => {
    expect(CULINARY_STAPLES.map((s) => s.slug)).toEqual([
      "injera-teff",
      "berbere",
      "dabo",
      "buna",
      "teff-gluten-free",
    ]);
    expect(CULINARY_STAPLES.filter((s) => s.kind === "health")).toHaveLength(1);
  });

  it("every staple has HE/EN/AM bodies non-empty", () => {
    for (const s of CULINARY_STAPLES) {
      expect(s.body.he.length).toBeGreaterThan(200);
      expect(s.body.en.length).toBeGreaterThan(200);
      expect(s.body.am.length).toBeGreaterThan(80);
    }
  });

  it("every staple body cites at least one source link", () => {
    for (const s of CULINARY_STAPLES) {
      // HE + EN carry an explicit sources line; AM mirrors are condensed.
      expect(s.body.he).toMatch(/\*\*מקורות\*\*/);
      expect(s.body.en).toMatch(/\*\*Sources\*\*/);
    }
  });

  it("bodies never contain recipe framing (positioning guard)", () => {
    // The research doc rules out competing on recipes. Guard the obvious
    // recipe markers in HE bodies.
    for (const s of CULINARY_STAPLES) {
      expect(s.body.he).not.toMatch(/מצרכים:|אופן ההכנה|שלב 1/);
    }
  });

  it("findStaple + body fallback work", () => {
    const buna = findStaple("buna");
    expect(buna).toBeDefined();
    expect(findStaple("nope")).toBeUndefined();
    // @ts-expect-error — intentionally probe fallback
    expect(stapleBody(buna!, "xx")).toBe(buna!.body.he);
  });
});

describe("CITY_SHOPPING verified-source policy", () => {
  it("has 5-8 city pages", () => {
    expect(CITY_SHOPPING.length).toBeGreaterThanOrEqual(5);
    expect(CITY_SHOPPING.length).toBeLessThanOrEqual(8);
  });

  it("every city slug exists in the cities registry", () => {
    for (const entry of CITY_SHOPPING) {
      expect(
        CITIES.some((c) => c.slug === entry.citySlug),
        `${entry.citySlug} missing from CITIES`,
      ).toBe(true);
    }
  });

  it("every shop carries a real source URL + label + year", () => {
    for (const entry of CITY_SHOPPING) {
      expect(entry.shops.length).toBeGreaterThanOrEqual(1);
      for (const shop of entry.shops) {
        expect(shop.name.length).toBeGreaterThan(1);
        expect(shop.sourceUrl).toMatch(/^https?:\/\//);
        expect(shop.sourceLabel.he.length).toBeGreaterThan(3);
        expect(shop.sourceYear).toBeGreaterThanOrEqual(2010);
        expect(["current", "dated"]).toContain(shop.confidence);
      }
    }
  });

  it("a city with no current-confidence shop is marked partial", () => {
    for (const entry of CITY_SHOPPING) {
      const hasCurrent = entry.shops.some((s) => s.confidence === "current");
      if (!hasCurrent) {
        expect(entry.status, `${entry.citySlug} must be partial`).toBe("partial");
      }
    }
  });

  it("dated shops are older sources; current shops are recent", () => {
    for (const entry of CITY_SHOPPING) {
      for (const shop of entry.shops) {
        if (shop.confidence === "current") {
          expect(shop.sourceYear).toBeGreaterThanOrEqual(2024);
        }
      }
    }
  });

  it("every entry has a verifiedAt date and localized intro", () => {
    for (const entry of CITY_SHOPPING) {
      expect(entry.verifiedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      for (const locale of LOCALES) {
        expect(entry.intro[locale].length).toBeGreaterThan(40);
      }
    }
  });

  it("online sellers all have https sources", () => {
    expect(ONLINE_SELLERS.length).toBeGreaterThanOrEqual(2);
    for (const s of ONLINE_SELLERS) {
      expect(s.url).toMatch(/^https:\/\//);
    }
  });

  it("findCityShopping finds covered cities and misses dropped ones", () => {
    expect(findCityShopping("netanya")).toBeDefined();
    // Ashdod + Kiryat Gat yielded no verifiable groceries — deliberately dropped.
    expect(findCityShopping("ashdod")).toBeUndefined();
    expect(findCityShopping("kiryat-gat")).toBeUndefined();
  });
});

describe("Sigd menu guide", () => {
  it("has non-empty bodies in all locales", () => {
    for (const locale of LOCALES) {
      expect(SIGD_MENU_GUIDE.body[locale].length).toBeGreaterThan(400);
    }
  });

  it("cross-links the heritage Sigd pages in every locale", () => {
    for (const locale of LOCALES) {
      expect(sigdMenuBody(locale)).toContain(`/${locale}/heritage/events/sigd`);
      expect(sigdMenuBody(locale)).toContain(`/${locale}/culinary`);
    }
  });

  it("carries the Sigd 2026 date consistent with the heritage module", () => {
    const sigd = HERITAGE_EVENTS.find((e) => e.slug === "sigd")!;
    expect(sigd.upcomingDates).toContain("2026-11-19");
    expect(SIGD_MENU_GUIDE.body.he).toContain("19 בנובמבר 2026");
    expect(SIGD_MENU_GUIDE.body.en).toContain("19 November 2026");
  });

  it("heritage Sigd bodies link back to the menu guide", () => {
    const sigd = HERITAGE_EVENTS.find((e) => e.slug === "sigd")!;
    for (const locale of LOCALES) {
      expect(sigd.bodies[locale]).toContain(`/${locale}/culinary/sigd-menu`);
    }
  });
});

describe("links", () => {
  it("path helpers are stable", () => {
    expect(culinaryPath()).toBe("/culinary");
    expect(culinaryShoppingCityPath("netanya")).toBe("/culinary/shopping/netanya");
    expect(sigdMenuPath()).toBe("/culinary/sigd-menu");
  });
});

describe("JSON-LD generators", () => {
  it("webPageJsonLd emits WebPage", () => {
    const out = webPageJsonLd(ctx, {
      path: culinaryPath(),
      name: "x",
      description: "y",
    });
    expect(out["@type"]).toBe("WebPage");
    expect(out["url"]).toBe("https://tedros.co.il/he/culinary");
  });

  it("articleJsonLd emits Article with dates", () => {
    const out = articleJsonLd(ctx, {
      path: sigdMenuPath(),
      headline: "x",
      description: "y",
      datePublished: "2026-08-30",
    });
    expect(out["@type"]).toBe("Article");
    expect(out["dateModified"]).toBe("2026-08-30");
  });

  it("shopItemListJsonLd emits ItemList of GroceryStore with 1-indexed positions", () => {
    const out = shopItemListJsonLd(ctx, {
      path: culinaryShoppingCityPath("netanya"),
      name: "x",
      description: "y",
      shops: [
        { name: "א", cityName: "נתניה", area: "שוק" },
        { name: "ב", cityName: "נתניה" },
      ],
    });
    expect(out["@type"]).toBe("ItemList");
    expect(out["numberOfItems"]).toBe(2);
    const items = out["itemListElement"] as Array<Record<string, unknown>>;
    expect(items[0]?.position).toBe(1);
    const first = items[0]?.item as Record<string, unknown>;
    expect(first["@type"]).toBe("GroceryStore");
    const addr = first["address"] as Record<string, unknown>;
    expect(addr["addressLocality"]).toBe("נתניה");
  });

  it("breadcrumbJsonLd emits 1-indexed positions", () => {
    const out = breadcrumbJsonLd(ctx, [
      { name: "Home", path: "/" },
      { name: "Culinary", path: culinaryPath() },
    ]);
    const items = out["itemListElement"] as Array<Record<string, unknown>>;
    expect(items[1]?.position).toBe(2);
  });
});

describe("pillar loader", () => {
  it("returns staples + shopping cities in every locale", async () => {
    for (const lang of LOCALES) {
      const data = await pillarLoader(fakeArgs({ lang }));
      expect(data.staples).toHaveLength(CULINARY_STAPLES.length);
      expect(data.shoppingCities).toHaveLength(CITY_SHOPPING.length);
      expect(data.onlineSellers.length).toBeGreaterThan(0);
      for (const s of data.staples) {
        expect(s.html.length).toBeGreaterThan(100);
      }
    }
  });
});

describe("city shopping loader", () => {
  it("loads every covered city in every locale", async () => {
    for (const entry of CITY_SHOPPING) {
      for (const lang of LOCALES) {
        const data = await cityLoader(fakeArgs({ lang, city: entry.citySlug }));
        expect(data.citySlug).toBe(entry.citySlug);
        expect(data.shops.length).toBe(entry.shops.length);
        expect(data.title.length).toBeGreaterThan(5);
      }
    }
  });

  it("404s on dropped/unknown cities + missing param", async () => {
    for (const city of ["ashdod", "kiryat-gat", "atlantis", undefined]) {
      await expect(cityLoader(fakeArgs({ lang: "he", city }))).rejects.toMatchObject({
        init: { status: 404 },
      });
    }
  });
});

describe("sigd menu loader", () => {
  it("loads in every locale with next observance + city cells", async () => {
    for (const lang of LOCALES) {
      const data = await sigdMenuLoader(fakeArgs({ lang }));
      expect(data.html.length).toBeGreaterThan(500);
      expect(data.next).toBe("2026-11-19");
      expect(data.sigdCities.length).toBeGreaterThan(0);
    }
  });
});
