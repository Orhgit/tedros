// TED-137 — street-stop guide: topic integrity + loader + sitemap wiring.

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

import { loader as streetStopLoader } from "../app/routes/$lang.voice.street-stop";
import { loader as coreSitemapLoader } from "../app/routes/sitemap-core[.]xml";
import { loader as rightsSitemapLoader } from "../app/routes/sitemap-rights[.]xml";
import {
  STREET_STOP_TOPIC,
  STREET_STOP_FAQS,
  STREET_STOP_AM_SUMMARY,
} from "../app/lib/voice/street-stop.server";
import { ALL_VOICE_TOPICS } from "../app/lib/voice/topics.server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

describe("street-stop topic integrity (TED-137)", () => {
  it("is registered in ALL_VOICE_TOPICS with a unique slug", () => {
    const slugs = ALL_VOICE_TOPICS.map((t) => t.slug);
    expect(slugs).toContain("street-stop");
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("carries full HE/EN/AM title, subtitle and body", () => {
    for (const locale of ["he", "en", "am"] as const) {
      expect((STREET_STOP_TOPIC.title[locale] ?? "").length).toBeGreaterThan(5);
      expect((STREET_STOP_TOPIC.subtitle[locale] ?? "").length).toBeGreaterThan(20);
      expect((STREET_STOP_TOPIC.body[locale] ?? "").length).toBeGreaterThan(500);
    }
  });

  it("HE body states the verified statutory facts and the disclaimer", () => {
    const he = STREET_STOP_TOPIC.body.he;
    // 3-hour cap per the 1996 arrests law (verified via Kol Zchut + police
    // procedure) and the MAHASH complaint channel.
    expect(he).toContain("שלוש שעות");
    expect(he).toContain('מח"ש');
    expect(he).toContain("הבהרה משפטית");
    // Expungement-law cross-promo names the statute's cutoff date.
    expect(he).toContain("31.12.2020");
  });

  it("ships a full Amharic summary (rendered in every locale)", () => {
    expect(STREET_STOP_AM_SUMMARY.length).toBeGreaterThanOrEqual(6);
    for (const line of STREET_STOP_AM_SUMMARY) {
      // Every line contains Ethiopic-script characters.
      expect(line).toMatch(/[ሀ-፿]/);
    }
  });

  it("has trilingual FAQs including the expungement question", () => {
    expect(STREET_STOP_FAQS.length).toBeGreaterThanOrEqual(4);
    for (const faq of STREET_STOP_FAQS) {
      for (const locale of ["he", "en", "am"] as const) {
        expect((faq.question[locale] ?? "").length).toBeGreaterThan(5);
        expect((faq.answer[locale] ?? "").length).toBeGreaterThan(20);
      }
    }
    expect(STREET_STOP_FAQS.some((f) => f.answer.he?.includes("31.12.2020"))).toBe(true);
  });

  it("resources include Tebeka's phone line and the MAHASH unit", () => {
    const names = STREET_STOP_TOPIC.resources.map((r) => r.name).join(" ");
    expect(names).toContain("טבקה");
    expect(names).toContain('מח"ש');
    expect(STREET_STOP_TOPIC.resources.some((r) => r.phone === "072-2424622")).toBe(true);
  });
});

describe("street-stop loader (TED-137)", () => {
  it("returns localized content per locale", async () => {
    const he = await streetStopLoader(fakeArgs({ lang: "he" }));
    const en = await streetStopLoader(fakeArgs({ lang: "en" }));
    const am = await streetStopLoader(fakeArgs({ lang: "am" }));
    expect(he.title).toMatch(/[֐-׿]/);
    expect(en.title).toMatch(/Stopped/);
    expect(am.title).toMatch(/[ሀ-፿]/);
    expect(he.title).not.toBe(en.title);
  });

  it("falls back to HE for an unknown locale", async () => {
    const out = await streetStopLoader(fakeArgs({ lang: "xx" }));
    expect(out.locale).toBe("he");
  });

  it("emits Article + FAQPage JSON-LD with matching entity counts", async () => {
    const out = await streetStopLoader(fakeArgs({ lang: "he" }));
    expect(out.article["@type"]).toBe("Article");
    expect(out.webPage["@type"]).toBe("WebPage");
    expect(out.breadcrumb["@type"]).toBe("BreadcrumbList");
    expect(out.faqPage["@type"]).toBe("FAQPage");
    const mainEntity = out.faqPage.mainEntity as unknown[];
    expect(mainEntity).toHaveLength(STREET_STOP_FAQS.length);
    expect(out.amSummary).toEqual(STREET_STOP_AM_SUMMARY);
  });
});

describe("sitemap wiring (TED-137)", () => {
  it("core sitemap lists /voice/street-stop", async () => {
    const res = coreSitemapLoader();
    const xml = await res.text();
    expect(xml).toContain("/he/voice/street-stop");
  });

  it("rights sitemap lists the expungement right with no city cells", async () => {
    const res = rightsSitemapLoader();
    const xml = await res.text();
    expect(xml).toContain("/rights/criminal-record-expungement<");
    expect(xml).not.toMatch(/criminal-record-expungement\//);
  });
});
