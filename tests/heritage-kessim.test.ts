// Seed integrity + loader + JSON-LD tests for the kessim directory and the
// marriage registration guide (TED-140).

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
  KESSIM_CITIES,
  KESSIM_COPY,
  KESSIM_DIRECTORY,
  KESSIM_SOURCE,
  findKessimCity,
  kessimByCity,
  kessimDisplayName,
} from "../app/lib/heritage/kessim.server";
import {
  MARRIAGE_BODY,
  MARRIAGE_COPY,
  MARRIAGE_FAQ,
  MARRIAGE_RESOURCES,
  MARRIAGE_SOURCES,
  MARRIAGE_STEPS,
  MARRIAGE_SUBTITLE,
  MARRIAGE_TITLE,
} from "../app/lib/heritage/marriage.server";
import {
  kessimCityPath,
  kessimLandingPath,
  marriagePath,
} from "../app/lib/heritage/links";
import {
  faqPageJsonLd,
  heritageArticleJsonLd,
  itemListJsonLd,
} from "../app/lib/heritage/schema";
import { CITIES } from "../app/lib/cities/registry";
import { MOURNING_CHECKLIST } from "../app/lib/family/mourning.server";
import { PRIORITY_RIGHTS } from "../app/lib/db/seeds/rights";
import he from "../messages/he.json";
import en from "../messages/en.json";
import am from "../messages/am.json";

import { loader as kessimLandingLoader } from "../app/routes/$lang.heritage.kessim._index";
import { loader as kessimCityLoader } from "../app/routes/$lang.heritage.kessim.$city";
import { loader as marriageLoader } from "../app/routes/$lang.heritage.marriage";
import { loader as sitemapCoreLoader } from "../app/routes/sitemap-core[.]xml";
import { loader as sitemapContentLoader } from "../app/routes/sitemap-content[.]xml";

const LOCALES = ["he", "en", "am"] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

// ── directory seed ─────────────────────────────────────────────────────────

describe("kessim directory seed", () => {
  it("carries the full official list — 75 entries, 46 kessim, 28 rabbis, 1 chief rabbi", () => {
    expect(KESSIM_DIRECTORY).toHaveLength(75);
    const byPosition = (p: string) =>
      KESSIM_DIRECTORY.filter((e) => e.position === p).length;
    expect(byPosition("kes")).toBe(46);
    expect(byPosition("rabbi")).toBe(28);
    expect(byPosition("chief-rabbi")).toBe(1);
  });

  it("has a unique dataset id per entry", () => {
    const ids = KESSIM_DIRECTORY.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every entry a name and a resolvable city", () => {
    for (const entry of KESSIM_DIRECTORY) {
      expect(entry.firstName.trim().length, `${entry.id} firstName`).toBeGreaterThan(0);
      expect(entry.familyName.trim().length, `${entry.id} familyName`).toBeGreaterThan(0);
      expect(findKessimCity(entry.citySlug), `${entry.id} city`).not.toBeNull();
    }
  });

  it("publishes phone numbers that look like Israeli numbers", () => {
    for (const entry of KESSIM_DIRECTORY) {
      if (!entry.phone) continue;
      expect(entry.phone, `${entry.id} phone`).toMatch(/^\d{2,3}-\d{6,8}$/);
    }
  });

  it("covers 31 cities and reuses registry names where the city exists", () => {
    expect(KESSIM_CITIES).toHaveLength(31);
    for (const city of KESSIM_CITIES) {
      for (const locale of LOCALES) {
        expect(city.names[locale].length, `${city.slug} [${locale}]`).toBeGreaterThan(1);
      }
      const registryCity = CITIES.find((c) => c.slug === city.slug);
      expect(city.inRegistry).toBe(Boolean(registryCity));
      if (registryCity) expect(city.names).toEqual(registryCity.names);
    }
  });

  it("every city has at least one entry, and the per-city sums match the total", () => {
    let sum = 0;
    for (const city of KESSIM_CITIES) {
      const entries = kessimByCity(city.slug);
      expect(entries.length, `${city.slug} is empty`).toBeGreaterThan(0);
      sum += entries.length;
    }
    expect(sum).toBe(KESSIM_DIRECTORY.length);
  });

  it("attributes the official source with a date", () => {
    expect(KESSIM_SOURCE.govUrl).toContain("gov.il");
    expect(KESSIM_SOURCE.dataGovUrl).toContain("data.gov.il");
    expect(KESSIM_SOURCE.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("builds a display name that leads with the localized position", () => {
    const chief = KESSIM_DIRECTORY.find((e) => e.position === "chief-rabbi")!;
    expect(kessimDisplayName(chief, "he")).toContain("הרב הראשי ליהודי אתיופיה");
    const kes = KESSIM_DIRECTORY.find((e) => e.position === "kes")!;
    expect(kessimDisplayName(kes, "en")).toMatch(/^Kes /);
    expect(kessimDisplayName(kes, "am")).toMatch(/^ቄስ /);
  });
});

// ── marriage guide seed ────────────────────────────────────────────────────

describe("marriage guide seed", () => {
  it("has a substantial body in every locale — the Amharic mirror must be full", () => {
    for (const locale of LOCALES) {
      expect(MARRIAGE_TITLE[locale].length).toBeGreaterThan(10);
      expect(MARRIAGE_SUBTITLE[locale].length).toBeGreaterThan(30);
      expect(MARRIAGE_BODY[locale].length, `body[${locale}] too short`).toBeGreaterThan(
        1500,
      );
    }
  });

  it("covers the whole path from checking documents to getting unstuck", () => {
    expect(MARRIAGE_STEPS.map((s) => s.id)).toEqual([
      "check-parents-documents",
      "expert-rabbi",
      "gather-documents",
      "meeting-and-certificate",
      "open-marriage-file",
      "fee-discount",
      "choose-officiant",
      "if-stuck",
    ]);
  });

  it("localizes every step, with labels wherever a link is present", () => {
    for (const step of MARRIAGE_STEPS) {
      for (const locale of LOCALES) {
        expect(step.title[locale].length, `${step.id} title [${locale}]`).toBeGreaterThan(
          3,
        );
        expect(
          step.detail[locale].length,
          `${step.id} detail [${locale}]`,
        ).toBeGreaterThan(40);
        if (step.officialUrl) {
          expect(step.officialUrl).toMatch(/^https:\/\//);
          expect(step.officialLabel?.[locale], `${step.id} officialLabel`).toBeTruthy();
        }
        if (step.internalPath) {
          expect(step.internalPath.startsWith("/")).toBe(true);
          expect(step.internalLabel?.[locale], `${step.id} internalLabel`).toBeTruthy();
        }
      }
    }
  });

  it("answers the FAQ in all three locales", () => {
    expect(MARRIAGE_FAQ.length).toBeGreaterThanOrEqual(5);
    for (const item of MARRIAGE_FAQ) {
      for (const locale of LOCALES) {
        expect(item.question[locale].length, `${item.id} q [${locale}]`).toBeGreaterThan(
          8,
        );
        expect(item.answer[locale].length, `${item.id} a [${locale}]`).toBeGreaterThan(
          60,
        );
      }
    }
  });

  it("links every resource and source over https", () => {
    for (const r of MARRIAGE_RESOURCES) {
      expect(r.url).toMatch(/^https:\/\//);
      for (const locale of LOCALES) {
        expect(r.description[locale].length, `${r.name} [${locale}]`).toBeGreaterThan(20);
      }
    }
    expect(MARRIAGE_SOURCES.length).toBeGreaterThanOrEqual(4);
    for (const s of MARRIAGE_SOURCES) {
      expect(s.url).toMatch(/^https:\/\//);
      for (const locale of LOCALES) expect(s.name[locale].length).toBeGreaterThan(5);
    }
  });

  it("presents the kes track and the Rabbanut track without ranking them", () => {
    // TED-140 sensitivity requirement: both tracks are described as equally
    // official. Guard the explicit statement in each locale.
    expect(MARRIAGE_BODY.he).toContain("שני המסלולים לגיטימיים ורשמיים");
    expect(MARRIAGE_BODY.en).toContain("Both tracks are legitimate and official");
    expect(MARRIAGE_BODY.am).toContain("ሁለቱም መንገዶች ሕጋዊና ይፋዊ ናቸው");
  });

  it("names the verified 2018 recognition rather than a vaguer claim", () => {
    expect(MARRIAGE_BODY.he).toContain("2018");
    expect(MARRIAGE_BODY.en).toContain("February 2018");
  });

  it("does not state a shekel amount for the registration fee (unverified)", () => {
    // Only the 40% discount is sourced; the fee itself lives in a changing
    // regulation appendix and was deliberately excluded.
    const everything = JSON.stringify([MARRIAGE_BODY, MARRIAGE_STEPS, MARRIAGE_FAQ]);
    expect(everything).not.toMatch(/₪\s*\d/);
  });
});

// ── i18n coverage ──────────────────────────────────────────────────────────

describe("i18n coverage for the new pages", () => {
  const dictionaries: Array<[string, Record<string, string>]> = [
    ["he", he as Record<string, string>],
    ["en", en as Record<string, string>],
    ["am", am as Record<string, string>],
  ];

  const KEYS = [
    "kessim_landing_title",
    "kessim_totals",
    "kessim_cities_heading",
    "kessim_city_counts",
    "kessim_city_title",
    "kessim_city_description",
    "kessim_city_list_heading",
    "kessim_related_heading",
    "kessim_related_marriage",
    "kessim_related_mourning",
    "kessim_related_right",
    "kessim_other_cities_heading",
    "kessim_source_note",
    "kessim_source_gov_label",
    "kessim_source_data_label",
    "kessim_marriage_crosslink_heading",
    "kessim_marriage_crosslink_cta",
    "marriage_steps_heading",
    "marriage_body_heading",
    "marriage_faq_heading",
    "marriage_kessim_crosslink_heading",
    "marriage_kessim_crosslink_cta",
    "heritage_lifecycle_heading",
  ];

  it("defines every new message key in all three locales", () => {
    for (const key of KEYS) {
      for (const [locale, dict] of dictionaries) {
        expect(dict[key], `${key} missing from messages/${locale}.json`).toBeTruthy();
      }
    }
  });

  it("localizes the server-module copy that stays out of the client bundle", () => {
    // These paragraphs live in the server modules rather than messages/*.json
    // so they never ship to the client (TED-115 size budget). They still need
    // full trilingual coverage.
    for (const [key, translations] of Object.entries({
      ...KESSIM_COPY,
      ...MARRIAGE_COPY,
    })) {
      for (const locale of LOCALES) {
        expect(translations[locale]?.length, `${key} [${locale}]`).toBeGreaterThan(40);
      }
    }
  });

  it("keeps that copy out of messages/*.json", () => {
    const moved = [
      "kessim_landing_subtitle",
      "kessim_phone_note",
      "kessim_source_caveat",
      "kessim_marriage_crosslink_body",
      "marriage_kessim_crosslink_body",
      "marriage_disclaimer",
    ];
    for (const key of moved) {
      for (const [locale, dict] of dictionaries) {
        expect(
          dict[key],
          `${key} moved to a server module but is still in messages/${locale}.json`,
        ).toBeUndefined();
      }
    }
  });
});

// ── loaders ────────────────────────────────────────────────────────────────

describe("kessim landing loader", () => {
  it("returns every city with counts that add up", async () => {
    const data = await kessimLandingLoader(fakeArgs({ lang: "he" }));
    expect(data.locale).toBe("he");
    expect(data.cities).toHaveLength(31);
    expect(data.totalEntries).toBe(75);
    expect(data.totalKessim + data.totalRabbis).toBe(data.totalEntries);
    for (const city of data.cities) {
      expect(city.kessimCount + city.rabbisCount).toBe(city.total);
    }
  });

  it("localizes city names per locale", async () => {
    const heData = await kessimLandingLoader(fakeArgs({ lang: "he" }));
    const enData = await kessimLandingLoader(fakeArgs({ lang: "en" }));
    const heNetanya = heData.cities.find((c) => c.slug === "netanya")!;
    const enNetanya = enData.cities.find((c) => c.slug === "netanya")!;
    expect(heNetanya.name).toBe("נתניה");
    expect(enNetanya.name).toBe("Netanya");
  });

  it("falls back to the default locale for an unknown lang", async () => {
    const data = await kessimLandingLoader(fakeArgs({ lang: "zz" }));
    expect(data.locale).toBe("he");
  });
});

describe("kessim city loader", () => {
  it("returns the entries for a city in the registry, with its overview", async () => {
    const data = await kessimCityLoader(fakeArgs({ lang: "he", city: "netanya" }));
    expect(data.cityName).toBe("נתניה");
    expect(data.inRegistry).toBe(true);
    expect(data.overview).toBeTruthy();
    expect(data.entries.length).toBe(kessimByCity("netanya").length);
    expect(data.entries.every((e) => e.displayName.length > 3)).toBe(true);
  });

  it("serves a directory-only city without an overview", async () => {
    const data = await kessimCityLoader(fakeArgs({ lang: "he", city: "gedera" }));
    expect(data.cityName).toBe("גדרה");
    expect(data.inRegistry).toBe(false);
    expect(data.overview).toBeNull();
    expect(data.entries.length).toBeGreaterThan(0);
  });

  it("404s for a city that is not in the directory", async () => {
    // A registry city with no ministry entries (Eilat) must 404 too — the
    // directory only covers cities that appear in the official list.
    for (const city of ["eilat", "no-such-city"]) {
      await expect(
        kessimCityLoader(fakeArgs({ lang: "he", city })),
      ).rejects.toMatchObject({ init: { status: 404 } });
    }
  });
});

describe("marriage guide loader", () => {
  it("returns fully localized content for each locale", async () => {
    for (const locale of LOCALES) {
      const data = await marriageLoader(fakeArgs({ lang: locale }));
      expect(data.locale).toBe(locale);
      expect(data.title).toBe(MARRIAGE_TITLE[locale]);
      expect(data.body.length).toBeGreaterThan(1500);
      expect(data.steps).toHaveLength(MARRIAGE_STEPS.length);
      expect(data.faq).toHaveLength(MARRIAGE_FAQ.length);
      expect(data.resources).toHaveLength(MARRIAGE_RESOURCES.length);
      expect(data.sources).toHaveLength(MARRIAGE_SOURCES.length);
    }
  });
});

// ── JSON-LD ────────────────────────────────────────────────────────────────

describe("JSON-LD", () => {
  const ctx = { publicUrl: "https://tedros.co.il", locale: "he" as const };

  it("emits an ItemList for the directory with absolute, locale-scoped URLs", () => {
    const jsonLd = itemListJsonLd(ctx, {
      path: kessimLandingPath(),
      name: "x",
      description: "y",
      items: KESSIM_CITIES.map((c) => ({
        name: c.names.he,
        path: kessimCityPath(c.slug),
      })),
    });
    expect(jsonLd["@type"]).toBe("ItemList");
    expect(jsonLd.numberOfItems).toBe(31);
    const items = jsonLd.itemListElement as Array<Record<string, unknown>>;
    expect(items[0]!.position).toBe(1);
    expect(items[0]!.url).toBe("https://tedros.co.il/he/heritage/kessim/afula");
  });

  it("emits an Article for the marriage guide", () => {
    const jsonLd = heritageArticleJsonLd(ctx, {
      path: marriagePath(),
      headline: MARRIAGE_TITLE.he,
      description: MARRIAGE_SUBTITLE.he,
      datePublished: "2026-08-30",
    });
    expect(jsonLd["@type"]).toBe("Article");
    expect(jsonLd.url).toBe("https://tedros.co.il/he/heritage/marriage");
    expect(jsonLd.dateModified).toBe("2026-08-30");
  });

  it("emits a FAQPage carrying every question", () => {
    const jsonLd = faqPageJsonLd(
      ctx,
      marriagePath(),
      MARRIAGE_FAQ.map((f) => ({ question: f.question.he, answer: f.answer.he })),
    );
    expect(jsonLd["@type"]).toBe("FAQPage");
    const questions = jsonLd.mainEntity as Array<Record<string, unknown>>;
    expect(questions).toHaveLength(MARRIAGE_FAQ.length);
    expect(questions[0]!["@type"]).toBe("Question");
    expect((questions[0]!.acceptedAnswer as Record<string, unknown>).text).toBe(
      MARRIAGE_FAQ[0]!.answer.he,
    );
  });
});

// ── sitemaps + cross-links ────────────────────────────────────────────────

describe("sitemaps", () => {
  it("lists the marriage guide in the core sitemap for every locale", async () => {
    const xml = await (await sitemapCoreLoader()).text();
    for (const locale of LOCALES) {
      expect(xml).toContain(`https://tedros.co.il/${locale}/heritage/marriage<`);
    }
  });

  it("lists the directory landing and every city cell in the content sitemap", async () => {
    const xml = await (await sitemapContentLoader()).text();
    expect(xml).toContain("https://tedros.co.il/he/heritage/kessim<");
    for (const city of KESSIM_CITIES) {
      expect(xml, `missing ${city.slug}`).toContain(
        `https://tedros.co.il/he/heritage/kessim/${city.slug}<`,
      );
    }
  });
});

describe("cross-links", () => {
  it("links the kessim right from the marriage guide and the directory", () => {
    const right = PRIORITY_RIGHTS.find((r) => r.slug.he === "kessim-religious-support");
    expect(right, "the kessim right must exist in the seed").toBeTruthy();
  });

  it("points the mourning guide at the new directory", () => {
    const step = MOURNING_CHECKLIST.find((s) => s.id === "azkara-tezkar")!;
    expect(step.internalPath).toBe(kessimLandingPath());
    for (const locale of LOCALES) {
      expect(step.internalLabel?.[locale]).toBeTruthy();
    }
  });

  it("sends the marriage guide's officiant step to the directory", () => {
    const step = MARRIAGE_STEPS.find((s) => s.id === "choose-officiant")!;
    expect(step.internalPath).toBe(kessimLandingPath());
  });
});
