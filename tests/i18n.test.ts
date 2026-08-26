import { describe, expect, it } from "vitest";
import {
  DEFAULT_LOCALE,
  LOCALE_DIRECTION,
  LOCALE_HTML_LANG,
  SUPPORTED_LOCALES,
  isLocale,
} from "../app/lib/i18n/config";
import { t } from "../app/lib/i18n/messages";
import he from "../messages/he.json";
import en from "../messages/en.json";
import am from "../messages/am.json";

describe("i18n config", () => {
  it("has he as default and supports the three locales", () => {
    expect(DEFAULT_LOCALE).toBe("he");
    expect(SUPPORTED_LOCALES).toEqual(["he", "en", "am"]);
  });

  it("has direction + html-lang for every supported locale", () => {
    for (const loc of SUPPORTED_LOCALES) {
      expect(LOCALE_DIRECTION[loc]).toMatch(/^(rtl|ltr)$/);
      expect(LOCALE_HTML_LANG[loc]).toBeTruthy();
    }
  });

  it("isLocale rejects unknown values and accepts known ones", () => {
    expect(isLocale("he")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("am")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
    expect(isLocale("")).toBe(false);
  });
});

describe("i18n messages parity (HE = source per CLAUDE.md)", () => {
  const sourceKeys = Object.keys(he).filter((k) => !k.startsWith("$"));

  it("EN has the same keys as HE", () => {
    const enKeys = new Set(Object.keys(en));
    for (const k of sourceKeys) expect(enKeys.has(k)).toBe(true);
  });

  it("AM has the same keys as HE", () => {
    const amKeys = new Set(Object.keys(am));
    for (const k of sourceKeys) expect(amKeys.has(k)).toBe(true);
  });
});

describe("t() interpolation", () => {
  it("substitutes {var} placeholders", () => {
    expect(t("he", "dashboard_welcome", { name: "אור" })).toContain("אור");
    expect(t("en", "dashboard_welcome", { name: "Or" })).toContain("Or");
  });

  it("falls back to HE when the requested locale lacks the key", () => {
    expect(t("en", "homepage_title")).toBeTruthy();
    expect(t("am", "homepage_title")).toBeTruthy();
  });

  it("humanizes a key that does not exist anywhere (TED-117)", () => {
    // Never render a raw snake_case key to users — drop the namespace
    // segment and space out the rest as a last resort.
    expect(t("he", "totally_unknown_key")).toBe("unknown key");
    expect(t("he", "rights_tag_some_new_tag")).toBe("some new tag");
  });
});
