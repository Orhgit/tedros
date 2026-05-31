// Seed integrity + relevance + JSON-LD + loader tests for the Heritage
// events vertical (RIN-422).

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

import {
  ALL_HERITAGE_EVENT_SLUGS,
  glyphForHeritageEvent,
  isHeritageEvent,
} from "../app/lib/heritage/categories";
import {
  HERITAGE_EVENTS,
  findHeritageEvent,
  heritageEventBody,
  nextDate,
} from "../app/lib/heritage/events.server";
import {
  COMMUNITY_CITIES,
  isRelevant,
  relevanceFor,
  relevantCities,
} from "../app/lib/heritage/relevance";
import { breadcrumbJsonLd, heritageEventJsonLd } from "../app/lib/heritage/schema";
import { CITIES } from "../app/lib/cities/registry";

import { loader as landingLoader } from "../app/routes/$lang.heritage.events._index";
import { loader as detailLoader } from "../app/routes/$lang.heritage.events.$event";
import { loader as cellLoader } from "../app/routes/$lang.heritage.events.$event.$city";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

const ctx = { publicUrl: "https://tedros.co.il", locale: "he" as const };

describe("HERITAGE_EVENTS seed shape", () => {
  it("contains 4 events", () => {
    expect(HERITAGE_EVENTS).toHaveLength(4);
  });

  it("every event slug is on the canonical list", () => {
    for (const e of HERITAGE_EVENTS) {
      expect(ALL_HERITAGE_EVENT_SLUGS.includes(e.slug)).toBe(true);
    }
  });

  it("every event has HE/EN/AM bodies non-empty", () => {
    for (const e of HERITAGE_EVENTS) {
      expect(e.bodies.he.length).toBeGreaterThan(100);
      expect(e.bodies.en.length).toBeGreaterThan(100);
      expect(e.bodies.am.length).toBeGreaterThan(40);
    }
  });

  it("every event has at least 3 future-leaning upcoming dates", () => {
    for (const e of HERITAGE_EVENTS) {
      expect(e.upcomingDates.length).toBeGreaterThanOrEqual(3);
      for (const d of e.upcomingDates) {
        expect(d).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
  });
});

describe("categories", () => {
  it("isHeritageEvent narrows correctly", () => {
    expect(isHeritageEvent("sigd")).toBe(true);
    expect(isHeritageEvent("not-an-event")).toBe(false);
  });

  it("every event has a glyph", () => {
    for (const slug of ALL_HERITAGE_EVENT_SLUGS) {
      expect(glyphForHeritageEvent(slug)).toMatch(/.+/);
    }
  });
});

describe("relevance", () => {
  it("Sigd is community-cities scoped", () => {
    expect(relevanceFor("sigd")).toEqual({ kind: "community-cities" });
    expect(isRelevant("sigd", "netanya")).toBe(true);
    expect(isRelevant("sigd", "eilat")).toBe(false);
  });

  it("Genna is list-scoped to 3 church cities", () => {
    const r = relevanceFor("genna");
    expect(r.kind).toBe("list");
    expect(isRelevant("genna", "jerusalem")).toBe(true);
    expect(isRelevant("genna", "haifa")).toBe(true);
    expect(isRelevant("genna", "beer-sheva")).toBe(true);
    expect(isRelevant("genna", "netanya")).toBe(false);
  });

  it("Aliyah Day is community-cities scoped", () => {
    expect(relevanceFor("aliyah-day")).toEqual({ kind: "community-cities" });
  });

  it("relevantCities returns the COMMUNITY_CITIES intersection for sigd", () => {
    const out = relevantCities("sigd", CITIES);
    for (const c of out) expect(COMMUNITY_CITIES).toContain(c.slug);
  });

  it("relevantCities returns 3 for Genna", () => {
    expect(relevantCities("genna", CITIES)).toHaveLength(3);
  });
});

describe("nextDate", () => {
  it("returns the next future date", () => {
    const sigd = findHeritageEvent("sigd")!;
    // Pin to a known date in the past — should return the first upcoming.
    expect(nextDate(sigd, new Date("2026-01-01"))).toBe(sigd.upcomingDates[0]);
  });

  it("returns null when all upcomingDates are past", () => {
    const sigd = findHeritageEvent("sigd")!;
    expect(nextDate(sigd, new Date("2099-01-01"))).toBeNull();
  });
});

describe("JSON-LD generators", () => {
  const sigd = findHeritageEvent("sigd")!;

  it("heritageEventJsonLd emits @type=Event with localized fields", () => {
    const out = heritageEventJsonLd(ctx, {
      slug: sigd.slug,
      name: sigd.name,
      description: sigd.shortDescription,
      startDate: "2026-11-19",
    });
    expect(out["@type"]).toBe("Event");
    expect(out["name"]).toBe("סיגד");
    expect(out["startDate"]).toBe("2026-11-19");
    expect(out["url"]).toBe("https://tedros.co.il/he/heritage/events/sigd");
  });

  it("city-scoped Event uses the cell URL + locality address", () => {
    const out = heritageEventJsonLd(ctx, {
      slug: sigd.slug,
      name: sigd.name,
      description: sigd.shortDescription,
      startDate: "2026-11-19",
      location: { name: "נתניה", addressLocality: "נתניה" },
      citySlug: "netanya",
    });
    expect(out["url"]).toBe("https://tedros.co.il/he/heritage/events/sigd/netanya");
    const loc = out["location"] as Record<string, unknown>;
    expect(loc["@type"]).toBe("Place");
  });

  it("breadcrumbJsonLd emits 1-indexed positions", () => {
    const out = breadcrumbJsonLd(ctx, [
      { name: "Home", path: "/" },
      { name: "Events", path: "/heritage/events" },
    ]);
    const items = out["itemListElement"] as Array<Record<string, unknown>>;
    expect(items[0]?.position).toBe(1);
    expect(items[1]?.position).toBe(2);
  });
});

describe("body fallback", () => {
  it("heritageEventBody falls back to HE for unknown locales", () => {
    const sigd = findHeritageEvent("sigd")!;
    // @ts-expect-error — intentionally probe fallback
    expect(heritageEventBody(sigd, "xx")).toBe(sigd.bodies.he);
  });
});

describe("landing loader", () => {
  it("returns 4 events with HE/EN/AM names", async () => {
    for (const lang of ["he", "en", "am"]) {
      const data = await landingLoader(fakeArgs({ lang }));
      expect(data.events).toHaveLength(4);
    }
  });
});

describe("event detail loader", () => {
  it("loads every event in every locale", async () => {
    for (const slug of ALL_HERITAGE_EVENT_SLUGS) {
      for (const lang of ["he", "en", "am"]) {
        const data = await detailLoader(fakeArgs({ lang, event: slug }));
        expect(data.event.slug).toBe(slug);
        expect(data.html.length).toBeGreaterThan(50);
      }
    }
  });

  it("404s on unknown event + missing param", async () => {
    await expect(
      detailLoader(fakeArgs({ lang: "he", event: "nope" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
    await expect(
      detailLoader(fakeArgs({ lang: "he", event: undefined })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });

  it("Sigd hub surfaces sigd-funding right + sigd term", async () => {
    const data = await detailLoader(fakeArgs({ lang: "he", event: "sigd" }));
    expect(data.relatedRights.find((r) => r.slug === "sigd-funding")).toBeDefined();
    expect(data.relatedTerms.find((g) => g.slug === "sigd")).toBeDefined();
  });
});

describe("event × city cell loader", () => {
  it("loads sigd × netanya in HE/EN/AM", async () => {
    for (const lang of ["he", "en", "am"]) {
      const data = await cellLoader(fakeArgs({ lang, event: "sigd", city: "netanya" }));
      expect(data.event.slug).toBe("sigd");
      expect(data.city.slug).toBe("netanya");
      expect(data.cityNameLocal.length).toBeGreaterThan(0);
    }
  });

  it("404s when (event, city) is not relevant", async () => {
    // genna is list-scoped to 3 cities; netanya is not on the list.
    await expect(
      cellLoader(fakeArgs({ lang: "he", event: "genna", city: "netanya" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });

  it("404s on unknown event + unknown city + missing params", async () => {
    await expect(
      cellLoader(fakeArgs({ lang: "he", event: "bogus", city: "tel-aviv" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
    await expect(
      cellLoader(fakeArgs({ lang: "he", event: "sigd", city: "atlantis" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
    await expect(
      cellLoader(fakeArgs({ lang: "he", event: undefined, city: "netanya" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });
});
