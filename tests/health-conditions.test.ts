// Tests for Health Hub Wave 1 (RIN-653/654/655).
// Validates: condition count, body completeness, source URL integrity,
// lastReviewed format, and path helper outputs.

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
  ALL_HEALTH_CONDITIONS,
  isHealthCondition,
  glyphForCondition,
} from "../app/lib/health/categories";
import { CONDITIONS } from "../app/lib/health/conditions.server";
import {
  conditionPath,
  conditionsPath,
  healthPath,
  mentalHealthPath,
} from "../app/lib/health/links";

// ── categories ─────────────────────────────────────────────────────────────

describe("ALL_HEALTH_CONDITIONS", () => {
  it("contains exactly 14 entries", () => {
    expect(ALL_HEALTH_CONDITIONS).toHaveLength(28);
  });

  it("contains the expected slugs", () => {
    expect(ALL_HEALTH_CONDITIONS).toContain("diabetes");
    expect(ALL_HEALTH_CONDITIONS).toContain("hypertension");
    expect(ALL_HEALTH_CONDITIONS).toContain("stroke");
    expect(ALL_HEALTH_CONDITIONS).toContain("mental-health");
    expect(ALL_HEALTH_CONDITIONS).toContain("brca2");
    expect(ALL_HEALTH_CONDITIONS).toContain("hiv");
  });

  it("slugs are unique", () => {
    const ids = ALL_HEALTH_CONDITIONS;
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("isHealthCondition", () => {
  it("returns true for valid slugs", () => {
    for (const slug of ALL_HEALTH_CONDITIONS) {
      expect(isHealthCondition(slug)).toBe(true);
    }
  });

  it("returns false for invalid slugs", () => {
    expect(isHealthCondition("unknown")).toBe(false);
    expect(isHealthCondition("")).toBe(false);
    expect(isHealthCondition("DIABETES")).toBe(false);
  });
});

describe("glyphForCondition", () => {
  it("returns a non-empty string for every valid slug", () => {
    for (const slug of ALL_HEALTH_CONDITIONS) {
      const glyph = glyphForCondition(slug);
      expect(typeof glyph).toBe("string");
      expect(glyph.length).toBeGreaterThan(0);
    }
  });
});

// ── conditions seed integrity ───────────────────────────────────────────────

describe("CONDITIONS seed", () => {
  it("has exactly 14 entries", () => {
    expect(CONDITIONS).toHaveLength(28);
  });

  it("every condition has a non-empty HE body (length > 100)", () => {
    for (const c of CONDITIONS) {
      expect((c.body.he ?? "").length).toBeGreaterThan(100);
    }
  });

  it("every condition has a non-empty EN body (length > 150)", () => {
    for (const c of CONDITIONS) {
      expect((c.body.en ?? "").length).toBeGreaterThan(150);
    }
  });

  it("every condition has a non-empty AM body (length > 80)", () => {
    for (const c of CONDITIONS) {
      expect((c.body.am ?? "").length).toBeGreaterThan(80);
    }
  });

  it("every condition has at least 1 figure", () => {
    for (const c of CONDITIONS) {
      expect(c.figures.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("every figure has a valid source URL (starts with https://)", () => {
    for (const c of CONDITIONS) {
      for (const fig of c.figures) {
        expect(fig.source.url.startsWith("https://")).toBe(true);
      }
    }
  });

  it("every figure has unique id within its condition", () => {
    for (const c of CONDITIONS) {
      const ids = c.figures.map((f) => f.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("lastReviewed is a valid ISO date string (YYYY-MM-DD)", () => {
    const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
    for (const c of CONDITIONS) {
      expect(ISO_DATE_RE.test(c.lastReviewed)).toBe(true);
      expect(isNaN(Date.parse(c.lastReviewed))).toBe(false);
    }
  });

  it("lastReviewed matches ISO date format on all entries", () => {
    const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
    for (const c of CONDITIONS) {
      expect(c.lastReviewed).toMatch(ISO_DATE_RE);
    }
  });

  it("every condition has at least 1 warning", () => {
    for (const c of CONDITIONS) {
      expect(c.warnings.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("every warning has non-empty HE, EN, AM text", () => {
    for (const c of CONDITIONS) {
      for (const w of c.warnings) {
        expect((w.he ?? "").length).toBeGreaterThan(10);
        expect((w.en ?? "").length).toBeGreaterThan(10);
        expect((w.am ?? "").length).toBeGreaterThan(10);
      }
    }
  });

  it("slugs match ALL_HEALTH_CONDITIONS list", () => {
    const seedSlugs = CONDITIONS.map((c) => c.slug).sort();
    const categorySlugs = [...ALL_HEALTH_CONDITIONS].sort();
    expect(seedSlugs).toEqual(categorySlugs);
  });
});

// ── path helpers ───────────────────────────────────────────────────────────

describe("path helpers", () => {
  it("healthPath returns /health", () => {
    expect(healthPath()).toBe("/health");
  });

  it("conditionsPath returns /health/conditions", () => {
    expect(conditionsPath()).toBe("/health/conditions");
  });

  it("mentalHealthPath returns /health/mental-health", () => {
    expect(mentalHealthPath()).toBe("/health/mental-health");
  });

  it("conditionPath returns correct path for each slug", () => {
    for (const slug of ALL_HEALTH_CONDITIONS) {
      expect(conditionPath(slug)).toBe(`/health/conditions/${slug}`);
    }
  });
});

// ── route loaders ──────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

import { loader as healthLandingLoader } from "../app/routes/$lang.health._index";
import { loader as conditionsLandingLoader } from "../app/routes/$lang.health.conditions._index";
import { loader as conditionDetailLoader } from "../app/routes/$lang.health.conditions.$condition";
import { loader as mentalHealthLoader } from "../app/routes/$lang.health.mental-health";

describe("health landing loader", () => {
  it("loads in HE/EN/AM with all 14 conditions", async () => {
    for (const lang of ["he", "en", "am"]) {
      const data = await healthLandingLoader(fakeArgs({ lang }));
      expect(data.locale).toBe(lang);
      expect(data.conditions).toHaveLength(28);
    }
  });

  it("each condition card has name + shortDescription + glyph", async () => {
    const data = await healthLandingLoader(fakeArgs({ lang: "he" }));
    for (const c of data.conditions) {
      expect(c.name.length).toBeGreaterThan(2);
      expect(c.shortDescription.length).toBeGreaterThan(10);
      expect(c.glyph.length).toBeGreaterThan(0);
    }
  });
});

describe("conditions landing loader", () => {
  it("loads in HE/EN/AM with 14 conditions", async () => {
    for (const lang of ["he", "en", "am"]) {
      const data = await conditionsLandingLoader(fakeArgs({ lang }));
      expect(data.conditions).toHaveLength(28);
    }
  });
});

describe("condition detail loader", () => {
  it("loads every condition in every locale", async () => {
    for (const slug of ALL_HEALTH_CONDITIONS) {
      for (const lang of ["he", "en", "am"]) {
        const data = await conditionDetailLoader(fakeArgs({ lang, condition: slug }));
        expect(data.condition.slug).toBe(slug);
        expect(data.condition.body.length).toBeGreaterThan(80);
        expect(data.condition.figures.length).toBeGreaterThanOrEqual(1);
        expect(data.condition.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
  });

  it("404s on invalid slug", async () => {
    await expect(
      conditionDetailLoader(fakeArgs({ lang: "he", condition: "unknown-condition" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });

  it("404s on missing slug", async () => {
    await expect(
      conditionDetailLoader(fakeArgs({ lang: "he", condition: undefined })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });
});

describe("mental health loader", () => {
  it("loads in HE/EN/AM with 4 FAQs", async () => {
    for (const lang of ["he", "en", "am"]) {
      const data = await mentalHealthLoader(fakeArgs({ lang }));
      expect(data.locale).toBe(lang);
      expect(data.faqs).toHaveLength(4);
    }
  });

  it("each FAQ has non-empty question + answer", async () => {
    const data = await mentalHealthLoader(fakeArgs({ lang: "he" }));
    for (const faq of data.faqs) {
      expect(faq.question.length).toBeGreaterThan(5);
      expect(faq.answer.length).toBeGreaterThan(20);
    }
  });

  it("loads 3 resources", async () => {
    const data = await mentalHealthLoader(fakeArgs({ lang: "he" }));
    expect(data.resources).toHaveLength(3);
    for (const r of data.resources) {
      expect(r.url.startsWith("https://")).toBe(true);
    }
  });
});
