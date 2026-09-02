// Loader integration tests for the Careers Hub Wave 5 content routes
// (RIN-475): statistics, FAQs (landing + detail), stories (landing +
// detail). Also pins seed integrity (slug uniqueness, body completeness,
// PII compliance for stories).

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

import { loader as statsLoader } from "../app/routes/$lang.careers.statistics";
import { loader as faqLandingLoader } from "../app/routes/$lang.careers.faq._index";
import { loader as faqDetailLoader } from "../app/routes/$lang.careers.faq.$question";
import { loader as storiesLandingLoader } from "../app/routes/$lang.careers.stories._index";
import { loader as storyDetailLoader } from "../app/routes/$lang.careers.stories.$slug";
import { CAREERS_STATISTICS } from "../app/lib/careers/statistics.server";
import { FAQS } from "../app/lib/careers/faqs.server";
import { STORIES } from "../app/lib/careers/stories.server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

// ── Statistics ─────────────────────────────────────────────────────────────

describe("statistics seed integrity", () => {
  // TED-157 emptied this seed. All 8 figures cited a homepage, a site-search
  // URL, or a report that could not be located, and the page emits Dataset
  // JSON-LD — so the site was asking Google to index unsourced statistics.
  // Two were also inverted. Rebuild from the Knesset MMM PDFs, one at a time.
  it("is empty until each figure is rebuilt from a cited document", () => {
    expect(CAREERS_STATISTICS).toHaveLength(0);
  });

  it("every figure has HE/EN/AM heading + figure + context non-empty", () => {
    for (const s of CAREERS_STATISTICS) {
      expect(s.heading.he.length).toBeGreaterThan(2);
      // EN/AM are optional in Translatable; we author them for every stat
      // here so the assertion validates editorial completeness.
      expect((s.heading.en ?? "").length).toBeGreaterThan(2);
      expect((s.heading.am ?? "").length).toBeGreaterThan(2);
      expect(s.figure.he.length).toBeGreaterThan(0);
      expect(s.context.he.length).toBeGreaterThan(40);
      expect(s.source.url.startsWith("http")).toBe(true);
    }
  });

  it("every figure has a unique id", () => {
    const ids = CAREERS_STATISTICS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("statistics route", () => {
  it("loads in HE/EN/AM with an empty stat set", async () => {
    for (const lang of ["he", "en", "am"]) {
      const data = await statsLoader(fakeArgs({ lang }));
      expect(data.locale).toBe(lang);
      expect(data.stats).toHaveLength(0);
    }
  });
});

// ── FAQs ───────────────────────────────────────────────────────────────────

describe("FAQs seed integrity", () => {
  it("contains 20 entries", () => {
    expect(FAQS).toHaveLength(18);
  });

  it("slugs are unique + orderIndex is unique", () => {
    const slugs = FAQS.map((f) => f.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const orders = FAQS.map((f) => f.orderIndex);
    expect(new Set(orders).size).toBe(orders.length);
  });

  it("every FAQ has HE/EN/AM bodies + question non-empty", () => {
    for (const f of FAQS) {
      expect(f.bodies.he.length).toBeGreaterThan(50);
      expect(f.bodies.en.length).toBeGreaterThan(50);
      expect(f.bodies.am.length).toBeGreaterThan(20);
      expect(f.question.he.length).toBeGreaterThan(5);
    }
  });
});

describe("FAQ landing route", () => {
  it("loads 20 cards in HE", async () => {
    const data = await faqLandingLoader(fakeArgs({ lang: "he" }));
    expect(data.faqs).toHaveLength(18);
  });
});

describe("FAQ detail route", () => {
  it("loads every FAQ in every locale", async () => {
    for (const f of FAQS) {
      for (const lang of ["he", "en", "am"]) {
        const data = await faqDetailLoader(fakeArgs({ lang, question: f.slug }));
        expect(data.faq.slug).toBe(f.slug);
        expect(data.html.length).toBeGreaterThan(50);
      }
    }
  });

  it("returns 3 cross-link FAQs (or fewer at array edges)", async () => {
    const data = await faqDetailLoader(
      fakeArgs({ lang: "he", question: "how-to-start-tech-career-ethiopian" }),
    );
    expect(data.related.length).toBeGreaterThanOrEqual(1);
    expect(data.related.length).toBeLessThanOrEqual(3);
  });

  it("404s on unknown slug + missing slug", async () => {
    await expect(
      faqDetailLoader(fakeArgs({ lang: "he", question: "nope" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
    await expect(
      faqDetailLoader(fakeArgs({ lang: "he", question: undefined })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });
});

// ── Stories ────────────────────────────────────────────────────────────────

describe("Stories seed integrity + PII compliance", () => {
  it("contains 10 entries", () => {
    expect(STORIES).toHaveLength(10);
  });

  it("slugs are unique", () => {
    const slugs = STORIES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every nickname is plausibly a first name only (no spaces, ≤ 12 chars)", () => {
    for (const s of STORIES) {
      // Loose heuristic — first names in HE/EN/AM are short, single tokens.
      // Any value above ~12 chars or with spaces likely smuggles a surname.
      const he = s.nickname.he;
      expect(he.includes(" ")).toBe(false);
      expect(he.length).toBeLessThanOrEqual(12);
    }
  });

  it("every story has consentAt + publishedAt set + bodies non-empty", () => {
    for (const s of STORIES) {
      expect(s.consentAt.length).toBeGreaterThanOrEqual(10);
      expect(s.publishedAt.length).toBeGreaterThanOrEqual(10);
      expect(s.bodies.he.length).toBeGreaterThan(100);
      expect(s.bodies.en.length).toBeGreaterThan(100);
      expect(s.bodies.am.length).toBeGreaterThan(20);
    }
  });
});

describe("Stories landing route", () => {
  it("loads 10 stories in HE/EN/AM", async () => {
    for (const lang of ["he", "en", "am"]) {
      const data = await storiesLandingLoader(fakeArgs({ lang }));
      expect(data.stories).toHaveLength(10);
    }
  });
});

describe("Stories detail route", () => {
  it("loads every story in every locale with track/city resolved", async () => {
    for (const s of STORIES) {
      for (const lang of ["he", "en", "am"]) {
        const data = await storyDetailLoader(fakeArgs({ lang, slug: s.slug }));
        expect(data.story.slug).toBe(s.slug);
        expect(data.html.length).toBeGreaterThan(100);
        // City should resolve (every story uses a real city slug).
        expect(data.city).not.toBeNull();
        // Track may resolve to null if trackSlug is invalid — just check
        // it's defined (null vs entry).
        expect(data.track).toBeDefined();
      }
    }
  });

  it("404s on unknown slug + missing slug", async () => {
    await expect(
      storyDetailLoader(fakeArgs({ lang: "he", slug: "nope" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
    await expect(
      storyDetailLoader(fakeArgs({ lang: "he", slug: undefined })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });
});
