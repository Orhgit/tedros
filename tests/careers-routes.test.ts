// Loader integration tests for the Careers Hub Wave 1 routes (RIN-471).
//
// We invoke the route loaders directly. Each loader is synchronous and
// pure aside from `getEnv()`, which validates `DATABASE_URL` /
// `AUTH_SECRET` / `PUBLIC_URL` at the module boundary — the test
// satisfies it with a hand-crafted env in `beforeAll`.

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

// Imports must come AFTER `beforeAll` mutates env, but at module scope —
// vitest hoists `beforeAll` to run before module evaluation of dependents.
// `env.server` caches the parse on first call, so the test suite has to be
// the first thing to hit it; if any prior test imported it with a bad env,
// `vi.resetModules()` would be required. Currently safe.
import { loader as pillarLoader } from "../app/routes/$lang.careers._index";
import { loader as trackLoader } from "../app/routes/$lang.careers.$track";
import { ALL_CAREER_TRACKS } from "../app/lib/careers/categories";

// The loader only touches `params`; everything else is unused by the
// careers hub. Each route generates its own `Info` type via React
// Router's typegen, so we cast through `unknown` at the call site to
// satisfy whichever loader we're calling.
//
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

describe("careers pillar loader", () => {
  it("returns 10 tracks sorted by priority for HE", async () => {
    const data = await pillarLoader(fakeArgs({ lang: "he" }));
    expect(data.locale).toBe("he");
    expect(data.tracks).toHaveLength(10);
    const priorities = data.tracks.map((t) => t.priority);
    const sorted = [...priorities].sort((a, b) => a - b);
    expect(priorities).toEqual(sorted);
  });

  it("falls back to HE when lang param is unknown", async () => {
    const data = await pillarLoader(fakeArgs({ lang: "xx" }));
    expect(data.locale).toBe("he");
  });

  it("renders for EN and AM as well", async () => {
    const en = await pillarLoader(fakeArgs({ lang: "en" }));
    const am = await pillarLoader(fakeArgs({ lang: "am" }));
    expect(en.locale).toBe("en");
    expect(am.locale).toBe("am");
    expect(en.tracks).toHaveLength(10);
    expect(am.tracks).toHaveLength(10);
  });
});

describe("careers track loader — happy path", () => {
  it("loads every track in every locale without throwing", async () => {
    for (const slug of ALL_CAREER_TRACKS) {
      for (const lang of ["he", "en", "am"]) {
        const data = await trackLoader(fakeArgs({ lang, track: slug }));
        expect(data.entry.slug).toBe(slug);
        expect(data.locale).toBe(lang);
        expect(data.html.length).toBeGreaterThan(50);
      }
    }
  });

  it("resolves cross-vertical refs through the query layer", async () => {
    const data = await trackLoader(fakeArgs({ lang: "he", track: "law" }));
    // Law track references tebeka org + tebeka-legal-aid right + tebeka term.
    expect(data.relatedOrgs.find((o) => o.slug === "tebeka")).toBeDefined();
    expect(
      data.relatedRights.find((r) => r.slug === "tebeka-legal-aid"),
    ).toBeDefined();
    expect(data.relatedTerms.find((g) => g.slug === "tebeka")).toBeDefined();
  });

  it("returns top cities matching the relevance scope", async () => {
    const tech = await trackLoader(fakeArgs({ lang: "he", track: "tech" }));
    // tech is list-scoped to 5 metro hubs.
    expect(tech.topCities.length).toBeLessThanOrEqual(5);
    expect(tech.topCities.find((c) => c.slug === "tel-aviv")).toBeDefined();

    const trades = await trackLoader(fakeArgs({ lang: "he", track: "trades" }));
    // trades is community-cities scoped → strictly more than tech's 5.
    expect(trades.topCities.length).toBeGreaterThan(5);
  });
});

describe("careers track loader — error paths", () => {
  it("404s when the track param is missing", async () => {
    await expect(
      trackLoader(fakeArgs({ lang: "he", track: undefined })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });

  it("404s when the track param is not a real CareerTrack", async () => {
    await expect(
      trackLoader(fakeArgs({ lang: "he", track: "imaginary" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });
});
