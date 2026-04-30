import { describe, expect, it } from "vitest";

import {
  allOrgSlugs,
  getOrgEntry,
  listOrgs,
  relatedOrgs,
} from "../app/lib/db/queries/orgs.server";
import { ORGS } from "../app/lib/orgs/orgs";

describe("orgs seed integrity", () => {
  it("has at least 12 orgs", () => {
    expect(ORGS.length).toBeGreaterThanOrEqual(12);
  });

  it("every org has unique slug", () => {
    const slugs = ORGS.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every slug is Latin kebab-case", () => {
    for (const e of ORGS) {
      expect(e.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("every org has HE/EN/AM name + shortDescription + body", () => {
    for (const e of ORGS) {
      expect(e.name.he).toBeTruthy();
      expect(e.name.en).toBeTruthy();
      expect(e.name.am).toBeTruthy();
      expect(e.shortDescription.he).toBeTruthy();
      expect(e.shortDescription.en).toBeTruthy();
      expect(e.shortDescription.am).toBeTruthy();
      expect(e.bodies.he.length).toBeGreaterThan(100);
      expect(e.bodies.en.length).toBeGreaterThan(100);
      expect(e.bodies.am.length).toBeGreaterThan(100);
    }
  });

  it("every org has a foundedYear in a sane range", () => {
    for (const e of ORGS) {
      expect(e.foundedYear).toBeGreaterThanOrEqual(1900);
      expect(e.foundedYear).toBeLessThanOrEqual(new Date().getFullYear());
    }
  });

  it("every org's websiteUrl is https", () => {
    for (const e of ORGS) {
      expect(e.websiteUrl).toMatch(/^https:\/\//);
    }
  });

  it("relatedOrgs point at valid slugs", () => {
    const slugs = new Set(allOrgSlugs());
    for (const e of ORGS) {
      for (const r of e.relatedOrgs) {
        expect(slugs.has(r), `${e.slug} → ${r}`).toBe(true);
      }
    }
  });
});

describe("listOrgs", () => {
  it("returns all orgs in the requested locale", () => {
    expect(listOrgs("he").length).toBe(ORGS.length);
    expect(listOrgs("en").length).toBe(ORGS.length);
    expect(listOrgs("am").length).toBe(ORGS.length);
  });

  it("sorts alphabetically per locale", () => {
    const en = listOrgs("en");
    const enNames = en.map((e) => e.name);
    const sorted = [...enNames].sort((a, b) => a.localeCompare(b, "en"));
    expect(enNames).toEqual(sorted);
  });
});

describe("getOrgEntry", () => {
  it("returns full detail for known slug", () => {
    const tene = getOrgEntry("tene-briut", "he");
    expect(tene).not.toBeNull();
    expect(tene?.name).toMatch(/טנא בריאות/);
    expect(tene?.body).toContain("טנא בריאות");
    expect(tene?.websiteUrl).toMatch(/tene-briut/);
  });

  it("returns null for unknown slug", () => {
    expect(getOrgEntry("does-not-exist", "he")).toBeNull();
  });

  it("falls back to HE body when locale missing (defensive)", () => {
    const en = getOrgEntry("tebeka", "en");
    expect(en?.body.length).toBeGreaterThan(50);
  });
});

describe("relatedOrgs", () => {
  it("returns up to N curated related orgs", () => {
    const out = relatedOrgs("tene-briut", "he", 3);
    expect(out.length).toBeLessThanOrEqual(3);
    // Tene Briut's curated relatedOrgs include jdc-ashalim and enp.
    const slugs = out.map((r) => r.slug);
    expect(slugs).toContain("jdc-ashalim");
  });

  it("self never appears", () => {
    for (const e of ORGS) {
      const out = relatedOrgs(e.slug, "he", 5);
      expect(out.find((r) => r.slug === e.slug)).toBeUndefined();
    }
  });

  it("returns empty array for unknown slug", () => {
    expect(relatedOrgs("nope", "he")).toEqual([]);
  });
});
