// Tests for Health Hub Wave 3 (RIN-658/659).
// Validates: traditional-medicine + nutrition data integrity,
// path helpers, and route loaders.

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

import { TRADITIONAL_PRACTICES } from "../app/lib/health/traditional-medicine.server";
import { NUTRITION_TIPS } from "../app/lib/health/nutrition.server";
import { traditionalMedicinePath, nutritionPath } from "../app/lib/health/links";

// ── TRADITIONAL_PRACTICES seed integrity ────────────────────────────────────

describe("TRADITIONAL_PRACTICES seed", () => {
  it("has exactly 5 entries", () => {
    expect(TRADITIONAL_PRACTICES).toHaveLength(5);
  });

  it("slugs are unique", () => {
    const slugs = TRADITIONAL_PRACTICES.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("expected slugs are present", () => {
    const slugs = TRADITIONAL_PRACTICES.map((p) => p.slug);
    expect(slugs).toContain("debtera");
    expect(slugs).toContain("herbal-remedies");
    expect(slugs).toContain("zar-ceremony");
    expect(slugs).toContain("bone-setting");
    expect(slugs).toContain("fasting");
  });

  it("every entry has a non-empty HE body (> 100 chars)", () => {
    for (const p of TRADITIONAL_PRACTICES) {
      expect((p.body.he ?? "").length).toBeGreaterThan(100);
    }
  });

  it("every entry has a non-empty EN body (> 100 chars)", () => {
    for (const p of TRADITIONAL_PRACTICES) {
      expect((p.body.en ?? "").length).toBeGreaterThan(100);
    }
  });

  it("every entry has a non-empty AM body (> 60 chars)", () => {
    for (const p of TRADITIONAL_PRACTICES) {
      expect((p.body.am ?? "").length).toBeGreaterThan(60);
    }
  });

  it("every entry has a valid ISO date lastReviewed (YYYY-MM-DD)", () => {
    const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
    for (const p of TRADITIONAL_PRACTICES) {
      expect(ISO_DATE_RE.test(p.lastReviewed)).toBe(true);
      expect(isNaN(Date.parse(p.lastReviewed))).toBe(false);
    }
  });

  it("every entry has lastReviewed = 2026-05-11", () => {
    for (const p of TRADITIONAL_PRACTICES) {
      expect(p.lastReviewed).toBe("2026-05-11");
    }
  });

  it("every entry has a valid safetyLevel", () => {
    const VALID: string[] = ["complementary", "consult-doctor", "caution"];
    for (const p of TRADITIONAL_PRACTICES) {
      expect(VALID).toContain(p.safetyLevel);
    }
  });

  it("debtera is complementary, bone-setting is caution", () => {
    const debtera = TRADITIONAL_PRACTICES.find((p) => p.slug === "debtera");
    const boneSetting = TRADITIONAL_PRACTICES.find((p) => p.slug === "bone-setting");
    expect(debtera?.safetyLevel).toBe("complementary");
    expect(boneSetting?.safetyLevel).toBe("caution");
  });

  it("every entry has non-empty name and description in HE/EN/AM", () => {
    for (const p of TRADITIONAL_PRACTICES) {
      expect((p.name.he ?? "").length).toBeGreaterThan(2);
      expect((p.name.en ?? "").length).toBeGreaterThan(2);
      expect((p.name.am ?? "").length).toBeGreaterThan(2);
      expect((p.description.he ?? "").length).toBeGreaterThan(10);
      expect((p.description.en ?? "").length).toBeGreaterThan(10);
      expect((p.description.am ?? "").length).toBeGreaterThan(10);
    }
  });
});

// ── NUTRITION_TIPS seed integrity ───────────────────────────────────────────

describe("NUTRITION_TIPS seed", () => {
  it("has exactly 5 entries", () => {
    expect(NUTRITION_TIPS).toHaveLength(5);
  });

  it("slugs are unique", () => {
    const slugs = NUTRITION_TIPS.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("expected slugs are present", () => {
    const slugs = NUTRITION_TIPS.map((t) => t.slug);
    expect(slugs).toContain("injera-benefits");
    expect(slugs).toContain("legumes-lentils");
    expect(slugs).toContain("limit-processed-food");
    expect(slugs).toContain("fasting-medication");
    expect(slugs).toContain("dietary-transition");
  });

  it("every entry has a non-empty HE body (> 100 chars)", () => {
    for (const tip of NUTRITION_TIPS) {
      expect((tip.body.he ?? "").length).toBeGreaterThan(100);
    }
  });

  it("every entry has a non-empty EN body (> 100 chars)", () => {
    for (const tip of NUTRITION_TIPS) {
      expect((tip.body.en ?? "").length).toBeGreaterThan(100);
    }
  });

  it("every entry has a non-empty AM body (> 60 chars)", () => {
    for (const tip of NUTRITION_TIPS) {
      expect((tip.body.am ?? "").length).toBeGreaterThan(60);
    }
  });

  it("every entry has a valid ISO date lastReviewed (YYYY-MM-DD)", () => {
    const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
    for (const tip of NUTRITION_TIPS) {
      expect(ISO_DATE_RE.test(tip.lastReviewed)).toBe(true);
      expect(isNaN(Date.parse(tip.lastReviewed))).toBe(false);
    }
  });

  it("every entry has lastReviewed = 2026-05-11", () => {
    for (const tip of NUTRITION_TIPS) {
      expect(tip.lastReviewed).toBe("2026-05-11");
    }
  });

  it("every entry has a valid category", () => {
    const VALID: string[] = ["preserve", "limit", "transition"];
    for (const tip of NUTRITION_TIPS) {
      expect(VALID).toContain(tip.category);
    }
  });

  it("exactly 2 preserve, 1 limit, 2 transition tips", () => {
    const preserveCount = NUTRITION_TIPS.filter((t) => t.category === "preserve").length;
    const limitCount = NUTRITION_TIPS.filter((t) => t.category === "limit").length;
    const transitionCount = NUTRITION_TIPS.filter(
      (t) => t.category === "transition",
    ).length;
    expect(preserveCount).toBe(2);
    expect(limitCount).toBe(1);
    expect(transitionCount).toBe(2);
  });

  it("every entry has non-empty HE/EN/AM title", () => {
    for (const tip of NUTRITION_TIPS) {
      expect((tip.title.he ?? "").length).toBeGreaterThan(2);
      expect((tip.title.en ?? "").length).toBeGreaterThan(2);
      expect((tip.title.am ?? "").length).toBeGreaterThan(2);
    }
  });
});

// ── path helpers ─────────────────────────────────────────────────────────────

describe("traditionalMedicinePath", () => {
  it("returns /health/traditional-medicine", () => {
    expect(traditionalMedicinePath()).toBe("/health/traditional-medicine");
  });
});

describe("nutritionPath", () => {
  it("returns /health/nutrition", () => {
    expect(nutritionPath()).toBe("/health/nutrition");
  });
});

// ── route loaders ─────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

import { loader as traditionalMedicineLoader } from "../app/routes/$lang.health.traditional-medicine";
import { loader as nutritionLoader } from "../app/routes/$lang.health.nutrition";

describe("traditional medicine loader", () => {
  it("loads in HE/EN/AM with 5 practices", async () => {
    for (const lang of ["he", "en", "am"]) {
      const data = await traditionalMedicineLoader(fakeArgs({ lang }));
      expect(data.locale).toBe(lang);
      expect(data.practices).toHaveLength(5);
    }
  });

  it("each practice has name + description + safetyLevel + body", async () => {
    const data = await traditionalMedicineLoader(fakeArgs({ lang: "he" }));
    for (const p of data.practices) {
      expect(p.name.length).toBeGreaterThan(2);
      expect(p.description.length).toBeGreaterThan(10);
      expect(p.body.length).toBeGreaterThan(100);
      expect(["complementary", "consult-doctor", "caution"]).toContain(p.safetyLevel);
    }
  });

  it("returns 3 FAQs", async () => {
    const data = await traditionalMedicineLoader(fakeArgs({ lang: "he" }));
    expect(data.faqs).toHaveLength(3);
    for (const faq of data.faqs) {
      expect(faq.question.length).toBeGreaterThan(5);
      expect(faq.answer.length).toBeGreaterThan(20);
    }
  });

  it("returns faqSchema and breadcrumb JSON-LD objects", async () => {
    const data = await traditionalMedicineLoader(fakeArgs({ lang: "he" }));
    expect(data.faqSchema).toHaveProperty("@type", "FAQPage");
    expect(data.breadcrumb).toHaveProperty("@type", "BreadcrumbList");
  });

  it("falls back to DEFAULT_LOCALE for unknown lang", async () => {
    const data = await traditionalMedicineLoader(fakeArgs({ lang: "xx" }));
    expect(data.locale).toBe("he");
  });
});

describe("nutrition loader", () => {
  it("loads in HE/EN/AM with 3 category groups", async () => {
    for (const lang of ["he", "en", "am"]) {
      const data = await nutritionLoader(fakeArgs({ lang }));
      expect(data.locale).toBe(lang);
      expect(data.tipsByCategory).toHaveLength(3);
    }
  });

  it("total tips across categories equals 5", async () => {
    const data = await nutritionLoader(fakeArgs({ lang: "he" }));
    const total = data.tipsByCategory.reduce((sum, group) => sum + group.tips.length, 0);
    expect(total).toBe(5);
  });

  it("each tip has title + body + lastReviewed", async () => {
    const data = await nutritionLoader(fakeArgs({ lang: "he" }));
    for (const group of data.tipsByCategory) {
      for (const tip of group.tips) {
        expect(tip.title.length).toBeGreaterThan(2);
        expect(tip.body.length).toBeGreaterThan(100);
        expect(tip.lastReviewed).toBe("2026-05-11");
      }
    }
  });

  it("returns webPage and breadcrumb JSON-LD objects", async () => {
    const data = await nutritionLoader(fakeArgs({ lang: "he" }));
    expect(data.webPage).toHaveProperty("@type", "WebPage");
    expect(data.breadcrumb).toHaveProperty("@type", "BreadcrumbList");
  });

  it("falls back to DEFAULT_LOCALE for unknown lang", async () => {
    const data = await nutritionLoader(fakeArgs({ lang: "zz" }));
    expect(data.locale).toBe("he");
  });
});
