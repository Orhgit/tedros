// Loader tests for `/:lang/careers/:track/:city` (RIN-473 cells).
//
// TED-132 (owner decision, 26.8): the ~408 cells rendered bodies identical
// to their parent track page — duplicate content — so while
// CITY_CELLS_ENABLED is false every cell 301s to its track page. The
// original happy-path tests (bootcamps/rights/cross-links per cell) live in
// git history (pre-TED-132) — restore them when the flag flips back on.

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

async function loaderResponse(params: Record<string, string | undefined>) {
  try {
    await cellLoader(fakeArgs(params));
    throw new Error("loader did not throw");
  } catch (thrown) {
    return thrown as Response;
  }
}

describe("cell loader — 301 to the track page (TED-132)", () => {
  it("redirects a valid (track, city) pair to the track page", async () => {
    const res = await loaderResponse({ lang: "he", track: "tech", city: "tel-aviv" });
    expect(res.status).toBe(301);
    expect(res.headers.get("Location")).toBe("/he/careers/tech");
  });

  it("keeps the locale in the redirect target", async () => {
    for (const lang of ["he", "en", "am"]) {
      const res = await loaderResponse({ lang, track: "law", city: "jerusalem" });
      expect(res.status).toBe(301);
      expect(res.headers.get("Location")).toBe(`/${lang}/careers/law`);
    }
  });

  it("redirects every track's city URLs, not just a sample", async () => {
    for (const track of ALL_CAREER_TRACKS) {
      const res = await loaderResponse({ lang: "he", track, city: "netanya" });
      expect(res.status).toBe(301);
      expect(res.headers.get("Location")).toBe(`/he/careers/${track}`);
    }
  });

  it("still 404s for an unknown track", async () => {
    await expect(
      cellLoader(fakeArgs({ lang: "he", track: "imaginary", city: "tel-aviv" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });

  it("404s when params are missing", async () => {
    await expect(
      cellLoader(fakeArgs({ lang: "he", track: undefined, city: undefined })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });
});
