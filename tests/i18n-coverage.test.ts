// TED-117 — CI guard: every dynamically-constructed message key
// (t(locale, `rights_tag_${tag}`) etc.) must exist in all three message
// files. Raw keys like "rights_tag_army" reached production because the
// rights seed grew tags no one mirrored into messages/*.json.

import { describe, expect, it } from "vitest";
import { PRIORITY_RIGHTS } from "../app/lib/db/seeds/rights";
import { ALL_NEWS_TAGS } from "../app/lib/news/categories";
import { glyphForTag } from "../app/lib/rights/categories";
import he from "../messages/he.json";
import en from "../messages/en.json";
import am from "../messages/am.json";

const dictionaries: Array<[string, Record<string, string>]> = [
  ["he", he],
  ["en", en],
  ["am", am],
];

const rightsTags = Array.from(new Set(PRIORITY_RIGHTS.flatMap((r) => r.tags))).sort();

describe("dynamic i18n key coverage (TED-117)", () => {
  it("every rights-seed tag has a rights_tag_* message in all locales", () => {
    for (const tag of rightsTags) {
      for (const [locale, dict] of dictionaries) {
        expect(
          dict[`rights_tag_${tag}`],
          `rights_tag_${tag} missing from messages/${locale}.json`,
        ).toBeTruthy();
      }
    }
  });

  it("every rights-seed tag has a real glyph (no • fallback)", () => {
    for (const tag of rightsTags) {
      expect(glyphForTag(tag), `TAG_GLYPH missing "${tag}"`).not.toBe("•");
    }
  });

  it("every news tag has a news_tag_* message in all locales", () => {
    for (const tag of ALL_NEWS_TAGS) {
      for (const [locale, dict] of dictionaries) {
        expect(
          dict[`news_tag_${tag}`],
          `news_tag_${tag} missing from messages/${locale}.json`,
        ).toBeTruthy();
      }
    }
  });

  it("has no empty message values in any locale", () => {
    for (const [locale, dict] of dictionaries) {
      for (const [key, value] of Object.entries(dict)) {
        if (key.startsWith("$")) continue;
        expect(String(value).trim(), `${locale}:${key} is empty`).not.toBe("");
      }
    }
  });
});
