// TED-137 — record-expungement right: seed integrity + wizard semantics.
//
// The wizard mirrors חוק מחיקת רישומים פליליים ומשטרתיים של יוצאי אתיופיה,
// התשפ"ד-2024 (statute text verified on Wikisource/Nevo): Ethiopian origin
// (self or parent), a schedule public-order offense, committed until
// 31.12.2020, no actual imprisonment, no additional record. These tests pin
// the wizard to the statute so a future edit can't silently loosen or
// tighten eligibility.

import { describe, expect, it } from "vitest";

import { getRightBySlug } from "../app/lib/db/queries/rights.server";
import { PRIORITY_RIGHTS } from "../app/lib/db/seeds/rights";
import { CITIES } from "../app/lib/cities/registry";
import { isRelevant, relevantCities } from "../app/lib/rights/relevance";
import { evaluate, type Answers } from "../app/lib/rights/wizard-engine";

const SLUG = "criminal-record-expungement";

const seed = PRIORITY_RIGHTS.find((r) => r.slug.he === SLUG);

// A fully-eligible answer set per the statute.
const ELIGIBLE: Answers = {
  ethiopianOrigin: "true",
  offenseType: "public-order",
  offenseBefore2021: "true",
  sentencedToPrison: "false",
  hasOtherRecords: "false",
};

describe("expungement right — seed integrity (TED-137)", () => {
  it("exists with the same slug in all locales", () => {
    expect(seed).toBeDefined();
    expect(seed?.slug.en).toBe(SLUG);
    expect(seed?.slug.am).toBe(SLUG);
  });

  it("carries HE/EN/AM bodies with sources and a legal disclaimer", () => {
    expect(seed).toBeDefined();
    if (!seed) return;
    for (const locale of ["he", "en", "am"] as const) {
      const body = seed.bodies[locale];
      expect(body.length, `${locale} body too short`).toBeGreaterThan(500);
      // Every locale cites the statute text and gov.il verification channel.
      expect(body).toContain("he.wikisource.org");
      expect(body).toContain(
        "gov.il/he/service/request-for-criminal-information-certificate",
      );
    }
    // Disclaimer + Tebeka referral (HE source of truth).
    expect(seed.bodies.he).toContain("הבהרה משפטית");
    expect(seed.bodies.he).toContain("טבקה");
    expect(seed.bodies.he).toContain("03-5103538");
    // The statutory cutoff date is stated, not paraphrased.
    expect(seed.bodies.he).toContain("31 בדצמבר 2020");
  });

  it("is served by the rights query layer with its wizard", () => {
    const right = getRightBySlug(SLUG, "he");
    expect(right).not.toBeNull();
    expect(right?.wizard).not.toBeNull();
    expect(right?.tags).toContain("legal");
    expect(right?.govUrl.startsWith("https://www.gov.il/")).toBe(true);
  });

  it("ships no city cells — a national statute has zero local variance", () => {
    expect(relevantCities(SLUG, CITIES)).toEqual([]);
    for (const city of CITIES) {
      expect(isRelevant(SLUG, city.slug)).toBe(false);
    }
  });
});

describe("expungement wizard — statute semantics (TED-137)", () => {
  const wizard = seed?.wizard;

  it("asks exactly the five statutory questions", () => {
    expect(wizard).toBeDefined();
    expect(wizard?.questions.map((q) => q.id)).toEqual([
      "ethiopianOrigin",
      "offenseType",
      "offenseBefore2021",
      "sentencedToPrison",
      "hasOtherRecords",
    ]);
    // Every question + rule reason is fully trilingual.
    for (const q of wizard?.questions ?? []) {
      expect(q.label.he).toBeTruthy();
      expect(q.label.en).toBeTruthy();
      expect(q.label.am).toBeTruthy();
    }
    for (const rule of wizard?.rules ?? []) {
      expect(rule.reason.he).toBeTruthy();
      expect(rule.reason.en).toBeTruthy();
      expect(rule.reason.am).toBeTruthy();
    }
  });

  it("accepts the fully-eligible path", () => {
    expect(wizard).toBeDefined();
    if (!wizard) return;
    expect(evaluate(wizard, ELIGIBLE)).toEqual({ eligible: true });
  });

  const disqualifiers: Array<[string, Answers]> = [
    ["not of Ethiopian origin", { ...ELIGIBLE, ethiopianOrigin: "false" }],
    ["assault of a police officer", { ...ELIGIBLE, offenseType: "police-assault" }],
    ["another offense type", { ...ELIGIBLE, offenseType: "other" }],
    ["offense after 31.12.2020", { ...ELIGIBLE, offenseBefore2021: "false" }],
    ["actual imprisonment imposed", { ...ELIGIBLE, sentencedToPrison: "true" }],
    ["additional record exists", { ...ELIGIBLE, hasOtherRecords: "true" }],
  ];

  for (const [label, answers] of disqualifiers) {
    it(`rejects with exactly one reason when ${label}`, () => {
      expect(wizard).toBeDefined();
      if (!wizard) return;
      const result = evaluate(wizard, answers);
      expect(result.eligible).toBe(false);
      if (!result.eligible) {
        expect(result.reasons).toHaveLength(1);
        expect(result.reasons[0]?.he).toBeTruthy();
      }
    });
  }

  it("treats unanswered questions as not-yet-eligible", () => {
    expect(wizard).toBeDefined();
    if (!wizard) return;
    const result = evaluate(wizard, {});
    expect(result.eligible).toBe(false);
  });
});
