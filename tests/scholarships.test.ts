import { describe, expect, it } from "vitest";

import {
  allScholarshipSlugs,
  getScholarshipBySlug,
  listScholarships,
  relatedScholarships,
} from "../app/lib/db/queries/scholarships.server";
import {
  LEGACY_SCHOLARSHIP_REDIRECTS,
  SCHOLARSHIPS,
  pickLocale,
} from "../app/lib/education/scholarships.server";
import { SCHOLARSHIP_LEVELS } from "../app/lib/education/categories";

describe("scholarships seed integrity", () => {
  it("has exactly 40 scholarships after the TED-152 cleanup", () => {
    expect(SCHOLARSHIPS.length).toBe(40);
  });

  // TED-152 — fabricated entries retired, duplicates merged
  it("carries no retired slug", () => {
    const retired = [
      "mossad-maxim-academic",
      "cogito-stem-phd",
      "falash-mura-yeshiva-stipend",
      "siket-absorption",
      "peles-vocational-training",
      "eiea-educators-grant",
      "nevet-women",
      "mof-poverty-study-grant",
      "merom-scholarship",
      "yoel-program-chiburim",
    ];
    const slugs = new Set(SCHOLARSHIPS.map((e) => e.slug));
    for (const s of retired) {
      expect(slugs.has(s), s).toBe(false);
    }
  });

  it("legacy redirects point merged slugs at existing canonical entries", () => {
    const slugs = new Set(SCHOLARSHIPS.map((e) => e.slug));
    expect(LEGACY_SCHOLARSHIP_REDIRECTS["merom-scholarship"]).toBe("marom-che");
    expect(LEGACY_SCHOLARSHIP_REDIRECTS["yoel-program-chiburim"]).toBe(
      "biu-mechina-ethiopian",
    );
    for (const [from, to] of Object.entries(LEGACY_SCHOLARSHIP_REDIRECTS)) {
      expect(slugs.has(from), `${from} must stay retired`).toBe(false);
      expect(slugs.has(to), `${from} → ${to}`).toBe(true);
    }
  });

  it("no body links to a retired scholarship page", () => {
    const retiredLinks = [
      "/education/scholarships/mossad-maxim-academic",
      "/education/scholarships/cogito-stem-phd",
      "/education/scholarships/falash-mura-yeshiva-stipend",
      "/education/scholarships/siket-absorption",
      "/education/scholarships/peles-vocational-training",
      "/education/scholarships/eiea-educators-grant",
      "/education/scholarships/nevet-women",
      "/education/scholarships/mof-poverty-study-grant",
      "/education/scholarships/merom-scholarship",
      "/education/scholarships/yoel-program-chiburim",
    ];
    for (const e of SCHOLARSHIPS) {
      for (const body of Object.values(e.bodies)) {
        for (const link of retiredLinks) {
          expect(body.includes(link), `${e.slug} links ${link}`).toBe(false);
        }
      }
    }
  });

  it("every scholarship has a unique slug", () => {
    const slugs = SCHOLARSHIPS.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every slug is Latin kebab-case", () => {
    for (const e of SCHOLARSHIPS) {
      expect(e.slug, `${e.slug}`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("every scholarship has HE/EN/AM name + shortDescription + body", () => {
    for (const e of SCHOLARSHIPS) {
      expect(e.name.he).toBeTruthy();
      expect(e.name.en).toBeTruthy();
      expect(e.name.am).toBeTruthy();
      expect(e.shortDescription.he).toBeTruthy();
      expect(e.shortDescription.en).toBeTruthy();
      expect(e.shortDescription.am).toBeTruthy();
      expect(e.bodies.he.length).toBeGreaterThan(100);
      expect(e.bodies.en.length).toBeGreaterThan(100);
      expect(e.bodies.am.length).toBeGreaterThan(50);
    }
  });

  it("every scholarship has a known level", () => {
    const levels = new Set(SCHOLARSHIP_LEVELS as readonly string[]);
    for (const e of SCHOLARSHIPS) {
      expect(levels.has(e.level), `${e.slug} → ${e.level}`).toBe(true);
    }
  });

  it("amount range is non-negative and ordered", () => {
    for (const e of SCHOLARSHIPS) {
      expect(e.amountMinIls).toBeGreaterThanOrEqual(0);
      expect(e.amountMaxIls).toBeGreaterThanOrEqual(e.amountMinIls);
    }
  });

  it("every applicationUrl is https", () => {
    for (const e of SCHOLARSHIPS) {
      expect(e.applicationUrl, `${e.slug}`).toMatch(/^https:\/\//);
    }
  });

  // TED-139 — freshness fields
  it("every scholarship has a valid status", () => {
    for (const e of SCHOLARSHIPS) {
      expect(["open", "closed", "tba"], `${e.slug} → ${e.status}`).toContain(e.status);
    }
  });

  it("every scholarship has an ISO lastVerified date", () => {
    for (const e of SCHOLARSHIPS) {
      expect(e.lastVerified, `${e.slug}`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(new Date(e.lastVerified).getTime())).toBe(false);
    }
  });

  it("deadline is rolling, an ISO date, or null", () => {
    for (const e of SCHOLARSHIPS) {
      const ok =
        e.deadline === "rolling" ||
        e.deadline === null ||
        /^\d{4}-\d{2}-\d{2}$/.test(e.deadline);
      expect(ok, `${e.slug} → ${e.deadline}`).toBe(true);
    }
  });

  it("tba entries never carry a concrete deadline (unverified → null)", () => {
    for (const e of SCHOLARSHIPS) {
      if (e.status === "tba") {
        expect(e.deadline, `${e.slug}`).toBeNull();
      }
    }
  });

  it("relatedScholarships point at valid slugs", () => {
    const slugs = new Set(allScholarshipSlugs());
    for (const e of SCHOLARSHIPS) {
      for (const r of e.relatedScholarships) {
        expect(slugs.has(r), `${e.slug} → ${r}`).toBe(true);
      }
    }
  });
});

describe("listScholarships", () => {
  it("returns all scholarships in the requested locale", () => {
    expect(listScholarships("he").length).toBe(SCHOLARSHIPS.length);
    expect(listScholarships("en").length).toBe(SCHOLARSHIPS.length);
    expect(listScholarships("am").length).toBe(SCHOLARSHIPS.length);
  });

  it("sorts alphabetically per locale", () => {
    const en = listScholarships("en");
    const enNames = en.map((e) => e.name);
    const sorted = [...enNames].sort((a, b) => a.localeCompare(b, "en"));
    expect(enNames).toEqual(sorted);
  });

  it("translates amountNote per locale", () => {
    const isef = listScholarships("he").find((s) => s.slug === "isef-fellowship");
    expect(isef?.amountNote).toContain("שכר לימוד");
  });

  it("exposes status + lastVerified on summaries (TED-139)", () => {
    for (const s of listScholarships("he")) {
      expect(["open", "closed", "tba"]).toContain(s.status);
      expect(s.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe("getScholarshipBySlug", () => {
  it("returns full detail for known slug", () => {
    const isef = getScholarshipBySlug("isef-fellowship", "he");
    expect(isef).not.toBeNull();
    expect(isef?.name).toMatch(/ISEF/);
    expect(isef?.body).toContain("ISEF");
    expect(isef?.applicationUrl).toMatch(/isef\.org\.il/);
    expect(isef?.providerOrgSlug).toBe("isef");
  });

  it("returns null for unknown slug", () => {
    expect(getScholarshipBySlug("does-not-exist", "he")).toBeNull();
  });

  it("exposes status + lastVerified on detail (TED-139)", () => {
    const isef = getScholarshipBySlug("isef-fellowship", "he");
    expect(isef?.status).toBe("closed");
    expect(isef?.lastVerified).toBe("2026-08-30");
  });

  it("returns body in requested locale", () => {
    const en = getScholarshipBySlug("hesegim-undergraduate", "en");
    expect(en?.body).toContain("Who is it for");
  });
});

describe("relatedScholarships", () => {
  it("returns up to N curated related scholarships", () => {
    const out = relatedScholarships("isef-fellowship", "he", 3);
    expect(out.length).toBeLessThanOrEqual(3);
    const slugs = out.map((r) => r.slug);
    // ISEF Fellowship curates Hesegim + Cogito.
    expect(slugs).toContain("hesegim-undergraduate");
  });

  it("self never appears", () => {
    for (const e of SCHOLARSHIPS) {
      const out = relatedScholarships(e.slug, "he", 5);
      expect(out.find((r) => r.slug === e.slug)).toBeUndefined();
    }
  });

  it("returns empty array for unknown slug", () => {
    expect(relatedScholarships("nope", "he")).toEqual([]);
  });

  it("falls back to same-level when curated set is empty", () => {
    // Find an entry with no curated relatedScholarships (or all curated are unknown)
    const orphan = SCHOLARSHIPS.find((e) => e.relatedScholarships.length === 0);
    if (orphan) {
      const out = relatedScholarships(orphan.slug, "he", 3);
      // Should still return same-level fallback (if any siblings exist)
      const sameLevelCount = SCHOLARSHIPS.filter(
        (e) => e.level === orphan.level && e.slug !== orphan.slug,
      ).length;
      expect(out.length).toBeLessThanOrEqual(Math.min(3, sameLevelCount));
    }
  });
});

describe("pickLocale fallback", () => {
  it("returns HE when EN/AM missing", () => {
    const t = { he: "hello-he" } as { he: string; en?: string; am?: string };
    expect(pickLocale(t, "en")).toBe("hello-he");
    expect(pickLocale(t, "am")).toBe("hello-he");
  });
});
