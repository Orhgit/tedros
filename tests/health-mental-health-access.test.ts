// Tests for the TED-144 mental-health access guides.
// Validates: seed integrity (3 pages, trilingual mirrors, verified anchors —
// *5144, appeal timelines, free legal aid), path helpers, article JSON-LD,
// and the three route loaders.

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
  ALL_MENTAL_HEALTH_ACCESS_SLUGS,
  MENTAL_HEALTH_ACCESS_PAGES,
  mentalHealthAccessPageBySlug,
  localizeAccessText,
} from "../app/lib/health/mental-health-access.server";
import { mentalHealthAccessPath } from "../app/lib/health/links";
import { articleJsonLd } from "../app/lib/health/schema";

// ── seed integrity ──────────────────────────────────────────────────────────

describe("MENTAL_HEALTH_ACCESS_PAGES seed", () => {
  it("has exactly 3 pages with the expected slugs", () => {
    expect(MENTAL_HEALTH_ACCESS_PAGES).toHaveLength(3);
    const slugs = MENTAL_HEALTH_ACCESS_PAGES.map((p) => p.slug);
    expect(slugs).toEqual(ALL_MENTAL_HEALTH_ACCESS_SLUGS);
    expect(slugs).toContain("interpreter");
    expect(slugs).toContain("hospitalization-rights");
    expect(slugs).toContain("culturally-competent-care");
  });

  it("slugs are unique", () => {
    const slugs = MENTAL_HEALTH_ACCESS_PAGES.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every page has at least 4 sections and 3 FAQs", () => {
    for (const page of MENTAL_HEALTH_ACCESS_PAGES) {
      expect(page.sections.length).toBeGreaterThanOrEqual(4);
      expect(page.faqs.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("section and FAQ ids are unique within each page", () => {
    for (const page of MENTAL_HEALTH_ACCESS_PAGES) {
      const sectionIds = page.sections.map((s) => s.id);
      const faqIds = page.faqs.map((f) => f.id);
      expect(new Set(sectionIds).size).toBe(sectionIds.length);
      expect(new Set(faqIds).size).toBe(faqIds.length);
    }
  });

  it("every section has trilingual body (HE > 100, EN > 100, AM > 60 chars)", () => {
    for (const page of MENTAL_HEALTH_ACCESS_PAGES) {
      for (const section of page.sections) {
        expect((section.body.he ?? "").length).toBeGreaterThan(100);
        expect((section.body.en ?? "").length).toBeGreaterThan(100);
        expect((section.body.am ?? "").length).toBeGreaterThan(60);
        expect((section.heading.he ?? "").length).toBeGreaterThan(2);
        expect((section.heading.en ?? "").length).toBeGreaterThan(2);
        expect((section.heading.am ?? "").length).toBeGreaterThan(2);
      }
    }
  });

  it("every FAQ has trilingual question and answer", () => {
    for (const page of MENTAL_HEALTH_ACCESS_PAGES) {
      for (const faq of page.faqs) {
        for (const lang of ["he", "en", "am"] as const) {
          expect((faq.question[lang] ?? "").length).toBeGreaterThan(5);
          expect((faq.answer[lang] ?? "").length).toBeGreaterThan(20);
        }
      }
    }
  });

  it("every page has a substantial standalone Amharic summary (> 300 chars)", () => {
    for (const page of MENTAL_HEALTH_ACCESS_PAGES) {
      expect(page.amharicSummary.length).toBeGreaterThan(300);
    }
  });

  it("every page has 3+ sources, all https, incl. at least one gov.il/health primary", () => {
    for (const page of MENTAL_HEALTH_ACCESS_PAGES) {
      expect(page.sources.length).toBeGreaterThanOrEqual(3);
      for (const source of page.sources) {
        expect(source.url).toMatch(/^https:\/\//);
        expect(source.name.length).toBeGreaterThan(5);
      }
      const hasPrimary = page.sources.some(
        (s) => s.url.includes("gov.il") || s.url.includes("health.gov.il"),
      );
      expect(hasPrimary).toBe(true);
    }
  });

  it("every page has a valid ISO lastReviewed of 2026-08-30", () => {
    for (const page of MENTAL_HEALTH_ACCESS_PAGES) {
      expect(page.lastReviewed).toBe("2026-08-30");
      expect(isNaN(Date.parse(page.lastReviewed))).toBe(false);
    }
  });

  it("only hospitalization-rights carries the legal disclaimer", () => {
    for (const page of MENTAL_HEALTH_ACCESS_PAGES) {
      expect(page.legalDisclaimer).toBe(page.slug === "hospitalization-rights");
    }
  });
});

// ── verified factual anchors ────────────────────────────────────────────────

describe("verified factual anchors", () => {
  it("interpreter page carries *5144 (MoH interpretation center) in HE and AM", () => {
    const page = mentalHealthAccessPageBySlug("interpreter");
    expect(page).toBeDefined();
    const heText = page!.sections.map((s) => s.body.he).join("\n");
    expect(heText).toContain("5144");
    expect(heText).toContain("04-6331877"); // Tene Briut Kol La'Briut
    expect(page!.amharicSummary).toContain("5144");
    expect(page!.amharicSummary).toContain("1201"); // ERAN in the Amharic summary
  });

  it("hospitalization page carries the appeal timelines and free legal aid", () => {
    const page = mentalHealthAccessPageBySlug("hospitalization-rights");
    expect(page).toBeDefined();
    const heText = page!.sections.map((s) => s.body.he).join("\n");
    expect(heText).toContain("5 ימים"); // committee must hear within 5 days
    expect(heText).toContain("45 יום"); // district court appeal window
    expect(heText).toContain("48 שעות"); // hospital director limit
    expect(heText).toContain("הסיוע המשפטי"); // free legal representation
    expect(heText).toContain('התשנ"א-1991'); // the law
  });

  it("culturally-competent-care page cites the ynet-documented figures", () => {
    const page = mentalHealthAccessPageBySlug("culturally-competent-care");
    expect(page).toBeDefined();
    const heText = page!.sections.map((s) => s.body.he).join("\n");
    expect(heText).toContain("637");
    expect(page!.sources.some((s) => s.url.includes("ynet.co.il"))).toBe(true);
  });
});

// ── helpers ─────────────────────────────────────────────────────────────────

describe("mentalHealthAccessPath", () => {
  it("builds /health/mental-health/<slug>", () => {
    expect(mentalHealthAccessPath("interpreter")).toBe(
      "/health/mental-health/interpreter",
    );
    expect(mentalHealthAccessPath("hospitalization-rights")).toBe(
      "/health/mental-health/hospitalization-rights",
    );
  });
});

describe("mentalHealthAccessPageBySlug", () => {
  it("returns undefined for unknown slug", () => {
    expect(mentalHealthAccessPageBySlug("nope")).toBeUndefined();
  });
});

describe("localizeAccessText", () => {
  it("falls back to HE when a mirror is missing", () => {
    expect(localizeAccessText({ he: "עברית" }, "en")).toBe("עברית");
    expect(localizeAccessText({ he: "עברית", am: "አማርኛ" }, "am")).toBe("አማርኛ");
  });
});

// ── article JSON-LD ─────────────────────────────────────────────────────────

describe("articleJsonLd", () => {
  it("produces a schema.org Article with url, headline, and dateModified", () => {
    const jsonLd = articleJsonLd(
      { publicUrl: "https://tedros.co.il", locale: "he" },
      {
        path: "/health/mental-health/interpreter",
        headline: "כותרת",
        description: "תיאור",
        lastReviewed: "2026-08-30",
      },
    );
    expect(jsonLd).toHaveProperty("@type", "Article");
    expect(jsonLd).toHaveProperty(
      "url",
      "https://tedros.co.il/he/health/mental-health/interpreter",
    );
    expect(jsonLd).toHaveProperty("headline", "כותרת");
    expect(jsonLd).toHaveProperty("dateModified", "2026-08-30");
    expect(jsonLd).toHaveProperty("inLanguage", "he");
  });
});

// ── route loaders ───────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

import { loader as interpreterLoader } from "../app/routes/$lang.health.mental-health_.interpreter";
import { loader as hospitalizationLoader } from "../app/routes/$lang.health.mental-health_.hospitalization-rights";
import { loader as culturalLoader } from "../app/routes/$lang.health.mental-health_.culturally-competent-care";

const LOADERS = [
  ["interpreter", interpreterLoader],
  ["hospitalization-rights", hospitalizationLoader],
  ["culturally-competent-care", culturalLoader],
] as const;

describe("mental-health access loaders", () => {
  it("load in HE/EN/AM with localized sections, faqs, and title", async () => {
    for (const [slug, loader] of LOADERS) {
      for (const lang of ["he", "en", "am"]) {
        const data = await loader(fakeArgs({ lang }));
        expect(data.locale).toBe(lang);
        expect(data.slug).toBe(slug);
        expect(data.title.length).toBeGreaterThan(5);
        expect(data.subtitle.length).toBeGreaterThan(10);
        expect(data.sections.length).toBeGreaterThanOrEqual(4);
        expect(data.faqs.length).toBeGreaterThanOrEqual(3);
        for (const section of data.sections) {
          expect(section.heading.length).toBeGreaterThan(2);
          expect(section.body.length).toBeGreaterThan(60);
        }
      }
    }
  });

  it("returns Article + FAQPage + BreadcrumbList JSON-LD objects", async () => {
    for (const [, loader] of LOADERS) {
      const data = await loader(fakeArgs({ lang: "he" }));
      expect(data.article).toHaveProperty("@type", "Article");
      expect(data.faqSchema).toHaveProperty("@type", "FAQPage");
      expect(data.breadcrumb).toHaveProperty("@type", "BreadcrumbList");
    }
  });

  it("breadcrumb has 4 levels ending at the guide page", async () => {
    const data = await interpreterLoader(fakeArgs({ lang: "he" }));
    const items = (data.breadcrumb as { itemListElement: unknown[] }).itemListElement;
    expect(items).toHaveLength(4);
  });

  it("every page returns related internal links with locale-relative paths", async () => {
    for (const [, loader] of LOADERS) {
      const data = await loader(fakeArgs({ lang: "he" }));
      expect(data.related.length).toBeGreaterThanOrEqual(3);
      for (const link of data.related) {
        expect(link.path.startsWith("/")).toBe(true);
        expect(link.label.length).toBeGreaterThan(2);
      }
    }
  });

  it("culturally-competent-care links to /professionals/amharic", async () => {
    const data = await culturalLoader(fakeArgs({ lang: "he" }));
    expect(data.related.some((l) => l.path === "/professionals/amharic")).toBe(true);
  });

  it("falls back to DEFAULT_LOCALE for unknown lang", async () => {
    const data = await interpreterLoader(fakeArgs({ lang: "xx" }));
    expect(data.locale).toBe("he");
  });
});
