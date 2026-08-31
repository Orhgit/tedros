// TED-148 — absorption-basket and Lamerchak seed accuracy.
//
// These entries previously carried figures that no primary source supports:
// a "cultural adjustment grant unique to immigrants from Africa", a furniture
// grant, 500 free ulpan hours, ₪12,000 vocational vouchers, a 12-month
// payment schedule, and a "*5454" ministry hotline. All of it was removed
// against https://www.gov.il/he/Departments/General/absorption_basket.
//
// The point of this file is that the removal stays removed. A future content
// wave that reintroduces a plausible-looking shekel figure — the exact
// failure mode TED-152 documented for the retired scholarships — fails here
// rather than shipping.

import { describe, expect, it } from "vitest";

import { getRightBySlug } from "../app/lib/db/queries/rights.server";
import { PRIORITY_RIGHTS } from "../app/lib/db/seeds/rights";
import { evaluate, type Answers } from "../app/lib/rights/wizard-engine";

const LOCALES = ["he", "en", "am"] as const;

const bySlug = (slug: string) => PRIORITY_RIGHTS.find((r) => r.slug.he === slug);

describe("absorption basket — no unsourced figures survive", () => {
  // Phrases that only ever appeared in the fabricated version. Matched across
  // every right in the seed, not just the two that carried them, so the same
  // claim cannot reappear under a different slug.
  const BANNED = [
    "מענק הסתגלות תרבותית",
    "cultural adjustment grant",
    "מענק ריהוט",
    "furniture grant",
    "500 שעות לימוד עברית",
    "500 Hebrew study hours",
  ];

  // The corrected copy names these grants in order to debunk them, so a bare
  // substring ban would flag our own warning. A banned phrase is allowed only
  // inside a paragraph that also says it is not in the official tables.
  const DEBUNK = ["אינם מופיעים", "do not appear"];

  it("no right reintroduces a fabricated basket component as a claim", () => {
    for (const right of PRIORITY_RIGHTS) {
      for (const locale of LOCALES) {
        for (const paragraph of right.bodies[locale].split("\n\n")) {
          const hit = BANNED.find((p) => paragraph.includes(p));
          if (!hit) continue;
          expect(
            DEBUNK.some((d) => paragraph.includes(d)),
            `${right.slug.he} (${locale}) asserts "${hit}" outside a debunking paragraph`,
          ).toBe(true);
        }
      }
    }
  });

  it("nothing in the seed still prints the wrong ministry hotline", () => {
    for (const right of PRIORITY_RIGHTS) {
      for (const locale of LOCALES) {
        expect(right.bodies[locale], `${right.slug.he} (${locale})`).not.toContain(
          "5454",
        );
      }
    }
  });
});

describe("klita-basket — matches the ministry's published structure", () => {
  const seed = bySlug("klita-basket");

  it("exists and points at the page the figures came from", () => {
    expect(seed).toBeDefined();
    expect(seed?.govUrl).toBe(
      "https://www.gov.il/he/Departments/General/absorption_basket",
    );
  });

  it("describes six monthly payments, not twelve", () => {
    expect(seed).toBeDefined();
    if (!seed) return;
    expect(seed.bodies.he).toContain("6 תשלומים חודשיים");
    expect(seed.bodies.en).toContain("6 further monthly payments");
    // The old copy claimed a year of monthly payments.
    expect(seed.bodies.he).not.toContain("12 תשלומים");
  });

  it("states the official eligibility conditions", () => {
    expect(seed).toBeDefined();
    if (!seed) return;
    // 24-month prior-residence rule and the one-year claim window.
    expect(seed.bodies.he).toContain("24 חודשים");
    expect(seed.bodies.he).toContain("בתוך שנה");
    // Eligibility is explicitly income-independent on the official page.
    expect(seed.bodies.he).toContain("אינה תלויה בגובה ההכנסה");
  });

  it("gives the corrected hotline in all three locales", () => {
    expect(seed).toBeDefined();
    if (!seed) return;
    for (const locale of LOCALES) {
      expect(seed.bodies[locale], locale).toContain("2994");
    }
  });

  it("gates the wizard on prior residence rather than on ulpan enrolment", () => {
    const right = getRightBySlug("klita-basket", "he");
    expect(right?.wizard).toBeDefined();
    const ids = right?.wizard?.questions.map((q) => q.id) ?? [];
    expect(ids).toContain("under24MonthsPriorResidence");
    // Ulpan enrolment is not a published condition of payment.
    expect(ids).not.toContain("enrolledInUlpan");

    const eligible: Answers = {
      registeredWithin12Months: "true",
      hasOlehId: "true",
      under24MonthsPriorResidence: "true",
    };
    expect(evaluate(right!.wizard!, eligible).eligible).toBe(true);
    expect(
      evaluate(right!.wizard!, {
        ...eligible,
        under24MonthsPriorResidence: "false",
      }).eligible,
    ).toBe(false);
  });
});

describe("klita-basket-ethiopia — the 2026 table, and an honest framing", () => {
  const seed = bySlug("klita-basket-ethiopia");

  it("carries the official 2026 totals verbatim", () => {
    expect(seed).toBeDefined();
    if (!seed) return;
    // Single / single-parent / couple totals from the ministry table.
    for (const total of ["21,694", "35,071", "41,359"]) {
      expect(seed.bodies.he, `HE missing ${total}`).toContain(total);
      expect(seed.bodies.en, `EN missing ${total}`).toContain(total);
    }
    // Per-payment figures.
    expect(seed.bodies.he).toContain("3,150");
    expect(seed.bodies.he).toContain("5,806");
  });

  it("says when the figures were checked, so staleness is visible", () => {
    expect(seed?.bodies.he).toContain("אוגוסט 2026");
    expect(seed?.bodies.en).toContain("August 2026");
  });

  it("no longer claims an origin-dependent extended basket", () => {
    expect(seed).toBeDefined();
    if (!seed) return;
    expect(seed.bodies.he).toContain("מכל מדינות העולם");
    expect(seed.bodies.en).toContain("from every country in the world");
    expect(seed.bodies.he).not.toContain("סל קליטה **מורחב**");
    expect(seed.bodies.en).not.toContain("**extended** klita basket");
  });

  it("routes the community-specific claims to the entries that own them", () => {
    expect(seed).toBeDefined();
    if (!seed) return;
    for (const slug of [
      "falash-mura-direct-absorption",
      "housing-grant-klita-centers",
      "student-absorption-basket",
    ]) {
      expect(seed.bodies.he, `HE missing link to ${slug}`).toContain(
        `/he/rights/${slug}`,
      );
      // And the target actually exists.
      expect(bySlug(slug), `${slug} not in seed`).toBeDefined();
    }
  });
});

describe("lamerchak — sourced from the participant-facing gov.il guide", () => {
  const seed = bySlug("lamerchak");
  const GOV =
    "https://www.gov.il/he/Departments/Guides/special-populations-employment";

  it("points at the guide page rather than the operator briefing", () => {
    expect(seed).toBeDefined();
    expect(seed?.govUrl).toBe(GOV);
    for (const locale of LOCALES) {
      expect(seed?.bodies[locale], locale).toContain(GOV);
    }
  });

  it("uses the primary source's age band, not Kol-Zchut's", () => {
    expect(seed).toBeDefined();
    if (!seed) return;
    expect(seed.bodies.he).toContain("18 עד 45");
    expect(seed.bodies.en).toContain("18 to 45");
    // Kol-Zchut's 20-44 is the secondary source and loses.
    expect(seed.bodies.he).not.toContain("20 עד 44");
  });

  it("names both operating bodies", () => {
    expect(seed?.bodies.he).toContain("זרוע העבודה");
    expect(seed?.bodies.he).toContain("ג'וינט ישראל");
    expect(seed?.bodies.en).toContain("JDC Israel");
  });

  it("warns that the official coordinator list is dated 2020", () => {
    expect(seed?.bodies.he).toContain("2020");
    expect(seed?.bodies.en).toContain("2020");
  });

  it("keeps the no-published-figures warning", () => {
    expect(seed).toBeDefined();
    if (!seed) return;
    // No shekel figure may appear in this entry — none is published.
    expect(seed.bodies.he).not.toMatch(/\d[\d,]*\s*₪/);
    expect(seed.bodies.en).not.toMatch(/₪\s*\d/);
  });
});
