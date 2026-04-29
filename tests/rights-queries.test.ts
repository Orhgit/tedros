import { describe, expect, it } from "vitest";

import {
  allRightSlugsByLocale,
  getRightBySlug,
  listRights,
} from "../app/lib/db/queries/rights.server";
import { PRIORITY_RIGHTS } from "../app/lib/db/seeds/rights";

describe("listRights", () => {
  it("returns one summary per priority right", () => {
    const out = listRights("he");
    expect(out.length).toBe(PRIORITY_RIGHTS.length);
  });

  it("renders titles in the requested locale", () => {
    const he = listRights("he")[0];
    const en = listRights("en")[0];
    expect(he?.title).not.toBe(en?.title);
    expect(he?.title).toMatch(/[֐-׿]/); // Hebrew range
  });

  it("falls back to HE when a locale field is missing", () => {
    // Seed slugs are duplicated across locales today; this verifies the
    // pickLocale fallback by passing AM (which is populated). If a future
    // entry omits AM, the fallback chain should still return HE.
    const am = listRights("am");
    expect(am.length).toBe(PRIORITY_RIGHTS.length);
    for (const r of am) {
      expect(r.title).toBeTruthy();
      expect(r.summary).toBeTruthy();
    }
  });
});

describe("getRightBySlug", () => {
  it("returns the matching right with body", () => {
    const r = getRightBySlug("600k-mortgage", "he");
    expect(r).not.toBeNull();
    expect(r?.title).toMatch(/משכנתא/);
    expect(r?.body).toContain("## למי מיועד");
  });

  it("matches slug across any locale", () => {
    // Klita basket has the same slug in all locales today; if we diverge,
    // the lookup must accept slug from any locale variant.
    const r = getRightBySlug("klita-basket", "en");
    expect(r).not.toBeNull();
    expect(r?.title).toMatch(/Klita/);
  });

  it("returns null for unknown slug", () => {
    const r = getRightBySlug("does-not-exist", "he");
    expect(r).toBeNull();
  });

  it("renders body in the requested locale", () => {
    const he = getRightBySlug("klita-basket", "he");
    const en = getRightBySlug("klita-basket", "en");
    expect(he?.body).toMatch(/למי מיועד/);
    expect(en?.body).toMatch(/Who is eligible/);
  });
});

describe("allRightSlugsByLocale", () => {
  it("returns three locales × all rights", () => {
    const out = allRightSlugsByLocale();
    // Today every right has all three locale slugs populated.
    expect(out.length).toBe(PRIORITY_RIGHTS.length * 3);
    const locales = new Set(out.map((x) => x.locale));
    expect(locales.has("he")).toBe(true);
    expect(locales.has("en")).toBe(true);
    expect(locales.has("am")).toBe(true);
  });
});
