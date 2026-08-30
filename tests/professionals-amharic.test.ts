// TED-136 — Amharic-speaker filter + landing.
//
// Guards three things:
//   1. Seed integrity: every slot carries an explicit `languages` claim, and
//      listed (real) professionals mirror their own claim exactly.
//   2. The owner-question guard: אורלי מנדפרו must NOT be marked as an
//      Amharic speaker until the owner confirms (open question, 2026-08-26).
//   3. The /professionals/amharic landing loader + sitemap surface.

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
  listAmharicSpeaking,
  listProfessionals,
} from "../app/lib/db/queries/professionals.server";
import { AMHARIC_LANG, speaksAmharic } from "../app/lib/professionals/categories";
import { PROFESSIONALS } from "../app/lib/professionals/professionals.server";
import { loader as amharicLoader } from "../app/routes/$lang.professionals.amharic";
import { loader as sitemapLoader } from "../app/routes/sitemap-content[.]xml";

// The one profile with an OPEN owner question about Amharic. Do not add
// "am" to this entry (or flip this test) without explicit owner confirmation.
const ORLY_SLUG = "real-estate-agent-jerusalem-north-jerusalem";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

describe("seed language claims (TED-136)", () => {
  it("every slot has a non-empty languages array of known codes", () => {
    const known = new Set(["he", "en", "am", "ti", "ru", "ar", "fr"]);
    for (const e of PROFESSIONALS) {
      expect(e.languages.length, `${e.slug} has no languages`).toBeGreaterThan(0);
      for (const code of e.languages) {
        expect(known.has(code), `${e.slug} → unknown language "${code}"`).toBe(true);
      }
    }
  });

  it("listed (real) professionals mirror their own language claim exactly", () => {
    for (const e of PROFESSIONALS) {
      if (!e.listedProfessional) continue;
      expect(e.languages, e.slug).toEqual(e.listedProfessional.languages);
    }
  });

  it("anonymous slots all carry the Amharic claim their titles make", () => {
    for (const e of PROFESSIONALS) {
      if (e.listedProfessional) continue;
      expect(speaksAmharic(e.languages), e.slug).toBe(true);
    }
  });

  it("אורלי מנדפרו is NOT marked Amharic-speaking (open owner question)", () => {
    const orly = PROFESSIONALS.find((e) => e.slug === ORLY_SLUG);
    expect(orly, `seed entry ${ORLY_SLUG} disappeared — update this guard`).toBeDefined();
    expect(orly?.languages).toEqual(["he"]);
    expect(orly?.languages.includes(AMHARIC_LANG)).toBe(false);
  });
});

describe("listAmharicSpeaking", () => {
  it("returns only entries whose languages include am", () => {
    const out = listAmharicSpeaking("he");
    expect(out.length).toBeGreaterThan(0);
    for (const s of out) expect(s.languages).toContain(AMHARIC_LANG);
  });

  it("excludes אורלי מנדפרו and nothing else", () => {
    const out = listAmharicSpeaking("he");
    const slugs = new Set(out.map((s) => s.slug));
    expect(slugs.has(ORLY_SLUG)).toBe(false);
    expect(out.length).toBe(PROFESSIONALS.length - 1);
  });

  it("includes the listed Amharic-speaking professionals", () => {
    const slugs = new Set(listAmharicSpeaking("he").map((s) => s.slug));
    expect(slugs.has("real-estate-agent-jerusalem-buy-rent")).toBe(true); // מניאלה מולה
    expect(slugs.has("lawyer-jerusalem-general-practice")).toBe(true); // דוד אבבה
  });

  it("summaries carry languages in every locale", () => {
    for (const locale of ["he", "en", "am"] as const) {
      for (const s of listProfessionals(locale)) {
        expect(Array.isArray(s.languages), s.slug).toBe(true);
      }
    }
  });
});

describe("/:lang/professionals/amharic loader", () => {
  it("returns only Amharic-speaking slots", async () => {
    const data = await amharicLoader(fakeArgs({ lang: "he" }));
    expect(data.locale).toBe("he");
    expect(data.slots.length).toBe(PROFESSIONALS.length - 1);
    for (const s of data.slots) expect(s.languages).toContain(AMHARIC_LANG);
  });

  it("falls back to the default locale for an unknown lang", async () => {
    const data = await amharicLoader(fakeArgs({ lang: "fr" }));
    expect(data.locale).toBe("he");
  });

  it("serves localized titles per locale", async () => {
    const he = await amharicLoader(fakeArgs({ lang: "he" }));
    const am = await amharicLoader(fakeArgs({ lang: "am" }));
    expect(he.slots.some((s) => /[֐-׿]/.test(s.title))).toBe(true);
    expect(am.slots.some((s) => /[ሀ-፿]/.test(s.title))).toBe(true);
  });
});

describe("sitemap", () => {
  it("content sitemap lists /professionals/amharic in all locales", async () => {
    const res = sitemapLoader();
    const xml = await res.text();
    for (const lang of ["he", "en", "am"]) {
      expect(xml).toContain(`/${lang}/professionals/amharic`);
    }
  });
});
