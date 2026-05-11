// Loader integration + sitemap integrity tests for the Careers Hub Wave 3
// programmatic cells (RIN-473) — `/:lang/careers/:track/:city`.

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

import { loader as cellLoader } from "../app/routes/$lang.careers.$track.$city";
import { ALL_CAREER_TRACKS } from "../app/lib/careers/categories";
import { CITIES } from "../app/lib/cities/registry";
import {
  isRelevant as isCareerRelevant,
  relevantCities as careerRelevantCities,
} from "../app/lib/careers/relevance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

describe("cell loader — happy path", () => {
  it("loads tech × tel-aviv successfully", async () => {
    const data = await cellLoader(
      fakeArgs({
        lang: "he",
        track: "tech",
        city: "tel-aviv",
      }),
    );
    expect(data.track.slug).toBe("tech");
    expect(data.city.slug).toBe("tel-aviv");
    expect(data.cityNameLocal).toBe("תל אביב");
    expect(data.cityOverviewLocal.length).toBeGreaterThan(50);
  });

  it("returns relevant bootcamps for tech × beer-sheva", async () => {
    const data = await cellLoader(
      fakeArgs({
        lang: "he",
        track: "tech",
        city: "beer-sheva",
      }),
    );
    // ENP Tech-Career has beer-sheva in cities[].
    expect(data.cellBootcamps.find((b) => b.slug === "enp-tech-career")).toBeDefined();
  });

  it("returns relevant rights × city for public-sector × jerusalem", async () => {
    const data = await cellLoader(
      fakeArgs({
        lang: "he",
        track: "public-sector",
        city: "jerusalem",
      }),
    );
    // public-sector-representation is community-cities scoped — jerusalem is
    // in COMMUNITY_CITIES so the right cell exists.
    expect(
      data.cellRights.find((r) => r.slug === "public-sector-representation"),
    ).toBeDefined();
  });

  it("returns cross-link suggestions (other cities + other tracks)", async () => {
    const data = await cellLoader(
      fakeArgs({
        lang: "he",
        track: "tech",
        city: "tel-aviv",
      }),
    );
    expect(data.otherCitiesForTrack.find((c) => c.slug === "haifa")).toBeDefined();
    // tech does not include haifa-only tracks → just check at least one
    // other track is present.
    expect(data.otherTracksInCity.length).toBeGreaterThan(0);
  });

  it("emits the thinFallback flag when sections are zero", async () => {
    // Pick a community-cities track in a city with no relevant rights or
    // bootcamps. retail-services × afula has zero bootcamps (only TA),
    // zero professionals in track, and zero relevant employment rights —
    // ideal thin candidate.
    const data = await cellLoader(
      fakeArgs({
        lang: "he",
        track: "retail-services",
        city: "afula",
      }),
    );
    // Either we shipped real content or the fallback flag is set.
    if (
      data.cellBootcamps.length === 0 &&
      data.cellProfessionals.length === 0 &&
      data.cellRights.length === 0
    ) {
      expect(data.thinFallback).toBe(true);
    } else {
      expect(data.thinFallback).toBe(false);
    }
  });
});

describe("cell loader — error paths", () => {
  it("404s when track is invalid", async () => {
    await expect(
      cellLoader(fakeArgs({ lang: "he", track: "bogus", city: "tel-aviv" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });

  it("404s when city is unknown", async () => {
    await expect(
      cellLoader(fakeArgs({ lang: "he", track: "tech", city: "atlantis" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });

  it("404s when (track, city) is not relevant", async () => {
    // tech is list-scoped; afula is not in the list → 404.
    await expect(
      cellLoader(fakeArgs({ lang: "he", track: "tech", city: "afula" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });

  it("404s when params are missing", async () => {
    await expect(
      cellLoader(fakeArgs({ lang: "he", track: undefined, city: "tel-aviv" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });
});

describe("cell loader — locale fallback", () => {
  it("falls back to HE when lang is unknown", async () => {
    const data = await cellLoader(
      fakeArgs({
        lang: "xx",
        track: "tech",
        city: "tel-aviv",
      }),
    );
    expect(data.locale).toBe("he");
  });

  it("renders for EN/AM as well", async () => {
    const en = await cellLoader(
      fakeArgs({
        lang: "en",
        track: "tech",
        city: "tel-aviv",
      }),
    );
    const am = await cellLoader(
      fakeArgs({
        lang: "am",
        track: "tech",
        city: "tel-aviv",
      }),
    );
    expect(en.cityNameLocal).toBe("Tel Aviv");
    expect(am.cityNameLocal).toMatch(/.+/);
  });
});

describe("cell coverage — every relevant pair loads", () => {
  it("sample-loads ~10 cells across tracks without throwing", async () => {
    // Smoke test — load 1 cell per track at the first relevant city to
    // confirm the loader handles the full distribution.
    for (const track of ALL_CAREER_TRACKS) {
      const cities = careerRelevantCities(track, CITIES);
      if (cities.length === 0) continue;
      const city = cities[0]!;
      const data = await cellLoader(
        fakeArgs({
          lang: "he",
          track,
          city: city.slug,
        }),
      );
      expect(data.track.slug).toBe(track);
      expect(data.city.slug).toBe(city.slug);
    }
  });
});

describe("relevance ↔ sitemap parity", () => {
  it("every cell URL emitted by the sitemap loader corresponds to a relevant pair", () => {
    // Don't import the sitemap loader (it does its own env validation);
    // re-derive the URL set the same way and check parity.
    const urls: string[] = [];
    for (const track of ALL_CAREER_TRACKS) {
      for (const city of careerRelevantCities(track, CITIES)) {
        urls.push(`/careers/${track}/${city.slug}`);
        // Each pair must satisfy isRelevant — that's the gate.
        expect(isCareerRelevant(track, city.slug)).toBe(true);
      }
    }
    expect(urls.length).toBeGreaterThanOrEqual(80);
    // Sanity: also bounded — guards against an accidental "all" scope flip.
    expect(urls.length).toBeLessThanOrEqual(200);
  });
});
