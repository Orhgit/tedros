// Seed integrity + links tests for Health Hub Wave 2 (RIN-656/657).

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
  HEALTH_SERVICES,
  serviceName,
  serviceDescription,
} from "../app/lib/health/services.server";
import {
  HEALTH_RIGHTS,
  rightTitle,
  rightBody,
  rightLegalBasis,
} from "../app/lib/health/rights.server";
import { servicesPath, rightsPath } from "../app/lib/health/links";

// ── HEALTH_SERVICES ───────────────────────────────────────────────────────────

describe("HEALTH_SERVICES seed shape", () => {
  it("contains exactly 7 entries", () => {
    expect(HEALTH_SERVICES).toHaveLength(7);
  });

  it("every entry has a unique slug", () => {
    const slugs = HEALTH_SERVICES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every entry has non-empty HE/EN/AM name", () => {
    for (const s of HEALTH_SERVICES) {
      expect(s.name.he.length).toBeGreaterThan(0);
      expect(s.name.en?.length ?? 0).toBeGreaterThan(0);
      expect(s.name.am?.length ?? 0).toBeGreaterThan(0);
    }
  });

  it("every entry has non-empty HE/EN/AM description", () => {
    for (const s of HEALTH_SERVICES) {
      expect(s.description.he.length).toBeGreaterThan(0);
      expect(s.description.en?.length ?? 0).toBeGreaterThan(0);
      expect(s.description.am?.length ?? 0).toBeGreaterThan(0);
    }
  });

  it("every entry has a valid category", () => {
    const VALID_CATEGORIES = [
      "translation",
      "crisis",
      "mental-health",
      "emergency",
      "rights",
    ];
    for (const s of HEALTH_SERVICES) {
      expect(VALID_CATEGORIES).toContain(s.category);
    }
  });

  it("isFree is boolean", () => {
    for (const s of HEALTH_SERVICES) {
      expect(typeof s.isFree).toBe("boolean");
    }
  });

  it("serviceName falls back to HE for unknown locale", () => {
    const s = HEALTH_SERVICES[0]!;
    // @ts-expect-error — testing fallback behaviour
    expect(serviceName(s, "xx")).toBe(s.name.he);
  });

  it("serviceDescription falls back to HE for unknown locale", () => {
    const s = HEALTH_SERVICES[0]!;
    // @ts-expect-error — testing fallback behaviour
    expect(serviceDescription(s, "xx")).toBe(s.description.he);
  });

  it("Tene Briut entry has phone and url", () => {
    const tene = HEALTH_SERVICES.find((s) => s.slug === "tene-briut");
    expect(tene).toBeDefined();
    expect(tene?.phone).toBeTruthy();
    expect(tene?.url).toBeTruthy();
  });

  it("ERAN 1201 entry has phone '1201'", () => {
    const eran = HEALTH_SERVICES.find((s) => s.slug === "eran-1201");
    expect(eran?.phone).toBe("1201");
  });

  it("MDA entry has phone '101'", () => {
    const mda = HEALTH_SERVICES.find((s) => s.slug === "mda-101");
    expect(mda?.phone).toBe("101");
  });
});

// ── HEALTH_RIGHTS ─────────────────────────────────────────────────────────────

describe("HEALTH_RIGHTS seed shape", () => {
  it("contains exactly 7 entries", () => {
    expect(HEALTH_RIGHTS).toHaveLength(7);
  });

  it("every entry has a unique slug", () => {
    const slugs = HEALTH_RIGHTS.map((r) => r.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every entry has non-empty HE/EN/AM title", () => {
    for (const r of HEALTH_RIGHTS) {
      expect(r.title.he.length).toBeGreaterThan(0);
      expect(r.title.en?.length ?? 0).toBeGreaterThan(0);
      expect(r.title.am?.length ?? 0).toBeGreaterThan(0);
    }
  });

  it("every entry has HE body >= 100 words", () => {
    for (const r of HEALTH_RIGHTS) {
      const wordCount = r.body.he.split(/\s+/).filter(Boolean).length;
      expect(wordCount).toBeGreaterThanOrEqual(100);
    }
  });

  it("every entry has EN body >= 70 words", () => {
    for (const r of HEALTH_RIGHTS) {
      const wordCount = (r.body.en ?? "").split(/\s+/).filter(Boolean).length;
      expect(wordCount).toBeGreaterThanOrEqual(70);
    }
  });

  it("every entry has non-empty AM body > 50 chars", () => {
    for (const r of HEALTH_RIGHTS) {
      expect((r.body.am ?? "").length).toBeGreaterThan(50);
    }
  });

  it("lastReviewed is a valid ISO date string", () => {
    for (const r of HEALTH_RIGHTS) {
      expect(r.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(new Date(r.lastReviewed).toISOString()).toBeTruthy();
    }
  });

  it("all lastReviewed values are '2026-05-11'", () => {
    for (const r of HEALTH_RIGHTS) {
      expect(r.lastReviewed).toBe("2026-05-11");
    }
  });

  it("entries with legalBasis have non-empty HE citation referencing real Israeli law", () => {
    for (const r of HEALTH_RIGHTS) {
      if (r.legalBasis) {
        // At minimum, legalBasis should reference a year (law citation)
        expect(r.legalBasis.he).toMatch(/\d{4}/);
        expect(r.legalBasis.he.length).toBeGreaterThan(10);
      }
    }
  });

  it("right-to-translation entry references חוק זכויות החולה 1996", () => {
    const r = HEALTH_RIGHTS.find((e) => e.slug === "right-to-translation");
    expect(r).toBeDefined();
    expect(r?.legalBasis?.he).toContain("חוק זכויות החולה");
    expect(r?.legalBasis?.he).toContain("1996");
  });

  it("mental-health-hospitalization entry references חוק טיפול בחולי נפש", () => {
    const r = HEALTH_RIGHTS.find((e) => e.slug === "mental-health-hospitalization");
    expect(r).toBeDefined();
    expect(r?.legalBasis?.he).toContain("חוק טיפול בחולי נפש");
  });

  it("rightTitle falls back to HE for unknown locale", () => {
    const r = HEALTH_RIGHTS[0]!;
    // @ts-expect-error — testing fallback behaviour
    expect(rightTitle(r, "xx")).toBe(r.title.he);
  });

  it("rightBody falls back to HE for unknown locale", () => {
    const r = HEALTH_RIGHTS[0]!;
    // @ts-expect-error — testing fallback behaviour
    expect(rightBody(r, "xx")).toBe(r.body.he);
  });

  it("rightLegalBasis returns undefined when legalBasis absent", () => {
    // Find an entry without legalBasis (defensive)
    const noLegal = HEALTH_RIGHTS.find((r) => !r.legalBasis);
    if (noLegal) {
      expect(rightLegalBasis(noLegal, "he")).toBeUndefined();
    }
  });
});

// ── links ─────────────────────────────────────────────────────────────────────

describe("health links — Wave 2 path helpers", () => {
  it("servicesPath returns '/health/services'", () => {
    expect(servicesPath()).toBe("/health/services");
  });

  it("rightsPath returns '/health/rights'", () => {
    expect(rightsPath()).toBe("/health/rights");
  });
});
