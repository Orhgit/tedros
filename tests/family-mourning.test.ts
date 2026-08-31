// Seed integrity + loader + JSON-LD tests for the Beta Israel mourning &
// funeral guide (TED-138) — /:lang/family/mourning.

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
  MOURNING_CHECKLIST,
  MOURNING_GUEST_TIPS,
  MOURNING_SOURCES,
  MOURNING_TOPIC,
} from "../app/lib/family/mourning.server";
import { getFamilyTopic } from "../app/lib/family/topics.server";
import { mourningPath } from "../app/lib/family/links";
import { articleJsonLd } from "../app/lib/family/schema";
import { PRIORITY_RIGHTS } from "../app/lib/db/seeds/rights";
import he from "../messages/he.json";
import en from "../messages/en.json";
import am from "../messages/am.json";

import { loader as mourningLoader } from "../app/routes/$lang.family.mourning";
import { loader as sitemapCoreLoader } from "../app/routes/sitemap-core[.]xml";

const LOCALES = ["he", "en", "am"] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

describe("mourning topic seed shape", () => {
  it("is registered in FAMILY_TOPICS under the 'mourning' slug", () => {
    expect(getFamilyTopic("mourning")).toBe(MOURNING_TOPIC);
  });

  it("has a substantial body in every locale — the Amharic mirror must be full, not a stub", () => {
    for (const locale of LOCALES) {
      expect(MOURNING_TOPIC.title[locale].length).toBeGreaterThan(10);
      expect(MOURNING_TOPIC.subtitle[locale].length).toBeGreaterThan(30);
      expect(
        MOURNING_TOPIC.body[locale].length,
        `body[${locale}] too short`,
      ).toBeGreaterThan(1500);
    }
  });

  it("uses the verified memorial terminology (tezkar) in each locale", () => {
    expect(MOURNING_TOPIC.body.he).toContain("תזכר");
    expect(MOURNING_TOPIC.body.en.toLowerCase()).toContain("tezkar");
    expect(MOURNING_TOPIC.body.am).toContain("ተዝካር");
  });

  it("never uses the unattested spelling from the issue brief", () => {
    // TED-138 asked to verify the term "חסקה" — it was not attested in any
    // source; the guide must use תזכר / אזכרה only.
    const everything = JSON.stringify([
      MOURNING_TOPIC,
      MOURNING_CHECKLIST,
      MOURNING_GUEST_TIPS,
    ]);
    expect(everything).not.toContain("חסקה");
  });

  it("every resource has an https URL (when present) and all-locale descriptions", () => {
    expect(MOURNING_TOPIC.resources.length).toBeGreaterThanOrEqual(4);
    for (const r of MOURNING_TOPIC.resources) {
      if (r.url) expect(r.url).toMatch(/^https:\/\//);
      for (const locale of LOCALES) {
        expect(r.description[locale].length, `${r.name} [${locale}]`).toBeGreaterThan(10);
      }
    }
  });
});

describe("mourning checklist", () => {
  it("covers the full path from death notification to inheritance", () => {
    const ids = MOURNING_CHECKLIST.map((s) => s.id);
    expect(ids).toEqual([
      "death-notification",
      "chevra-kadisha",
      "shiva-das",
      "death-certificate",
      "btl-rights",
      "azkara-tezkar",
      "inheritance",
    ]);
  });

  it("localizes every step in all three locales", () => {
    for (const step of MOURNING_CHECKLIST) {
      for (const locale of LOCALES) {
        expect(step.title[locale].length, `${step.id} title [${locale}]`).toBeGreaterThan(
          3,
        );
        expect(
          step.detail[locale].length,
          `${step.id} detail [${locale}]`,
        ).toBeGreaterThan(30);
        if (step.officialUrl) {
          expect(step.officialLabel?.[locale], `${step.id} officialLabel`).toBeTruthy();
        }
        if (step.internalPath) {
          expect(step.internalLabel?.[locale], `${step.id} internalLabel`).toBeTruthy();
        }
      }
    }
  });

  it("official links point only to government domains", () => {
    for (const step of MOURNING_CHECKLIST) {
      if (!step.officialUrl) continue;
      expect(
        /^https:\/\/(www\.)?(gov\.il|btl\.gov\.il)\//.test(step.officialUrl),
        `${step.id}: ${step.officialUrl}`,
      ).toBe(true);
    }
  });

  it("internal links resolve to a rights slug or a known non-rights page", () => {
    const rightsSlugs = new Set(PRIORITY_RIGHTS.map((r) => r.slug.he));
    // Non-rights internal targets the checklist is allowed to link to.
    // Keep this list explicit so a typo still fails the build.
    const allowedOtherPaths = new Set(["/heritage/kessim"]);

    for (const step of MOURNING_CHECKLIST) {
      if (!step.internalPath) continue;
      const slug = step.internalPath.match(/^\/rights\/([a-z0-9-]+)$/)?.[1];
      if (slug) {
        expect(
          rightsSlugs.has(slug),
          `${step.id}: /rights/${slug} does not exist in the rights seed`,
        ).toBe(true);
        continue;
      }
      expect(
        allowedOtherPaths.has(step.internalPath),
        `${step.id}: unexpected internalPath ${step.internalPath}`,
      ).toBe(true);
    }
  });
});

describe("mourning guest tips + sources", () => {
  it("has at least 5 guest tips, localized in all locales", () => {
    expect(MOURNING_GUEST_TIPS.length).toBeGreaterThanOrEqual(5);
    for (const tip of MOURNING_GUEST_TIPS) {
      for (const locale of LOCALES) {
        expect(tip.title[locale].length, `${tip.id} [${locale}]`).toBeGreaterThan(3);
        expect(tip.detail[locale].length, `${tip.id} [${locale}]`).toBeGreaterThan(30);
      }
    }
  });

  it("cites both custom sources and government sources", () => {
    expect(MOURNING_SOURCES.length).toBeGreaterThanOrEqual(4);
    const urls = MOURNING_SOURCES.map((s) => s.url);
    for (const url of urls) expect(url).toMatch(/^https:\/\//);
    expect(urls.some((u) => u.includes("btl.gov.il"))).toBe(true);
    expect(
      urls.some((u) => u.includes("israeliana.org") || u.includes("wikipedia.org")),
    ).toBe(true);
  });
});

describe("route loader", () => {
  it("returns localized content for each locale", async () => {
    for (const locale of LOCALES) {
      const data = await mourningLoader(fakeArgs({ lang: locale }));
      expect(data.locale).toBe(locale);
      expect(data.title).toBe(MOURNING_TOPIC.title[locale]);
      expect(data.checklist).toHaveLength(MOURNING_CHECKLIST.length);
      expect(data.guestTips).toHaveLength(MOURNING_GUEST_TIPS.length);
      expect(data.sources).toHaveLength(MOURNING_SOURCES.length);
      expect(data.publicUrl).toBeTruthy();
    }
  });

  it("falls back to the default locale on an unknown lang param", async () => {
    const data = await mourningLoader(fakeArgs({ lang: "fr" }));
    expect(data.locale).toBe("he");
  });
});

describe("Article JSON-LD", () => {
  it("emits a well-formed Article for the guide", () => {
    const ld = articleJsonLd(
      { publicUrl: "https://tedros.co.il", locale: "he" },
      {
        path: mourningPath(),
        headline: MOURNING_TOPIC.title.he,
        description: MOURNING_TOPIC.subtitle.he,
        datePublished: "2026-08-30",
      },
    );
    expect(ld["@type"]).toBe("Article");
    expect(ld.url).toBe("https://tedros.co.il/he/family/mourning");
    expect(ld.headline).toBe(MOURNING_TOPIC.title.he);
    expect(ld.inLanguage).toBe("he");
    expect(ld.datePublished).toBe("2026-08-30");
    expect(ld.dateModified).toBe("2026-08-30");
    expect((ld.publisher as { name: string }).name).toBe("Tedros");
  });
});

describe("sitemap + i18n wiring", () => {
  it("sitemap-core includes /family/mourning for every locale", async () => {
    const res = sitemapCoreLoader();
    const xml = await res.text();
    for (const locale of LOCALES) {
      expect(xml).toContain(`/${locale}/family/mourning`);
    }
  });

  it("family index card keys exist in all three message files", () => {
    const dictionaries: Array<[string, Record<string, string>]> = [
      ["he", he],
      ["en", en],
      ["am", am],
    ];
    for (const key of ["family_mourning_title", "family_mourning_subtitle"]) {
      for (const [locale, dict] of dictionaries) {
        expect(dict[key], `${key} missing from messages/${locale}.json`).toBeTruthy();
      }
    }
  });
});
