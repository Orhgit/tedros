// TED-142 — Soldiers & Families hub: content integrity, loaders, wizard
// semantics, and sitemap wiring.
//
// The content assertions deliberately pin the facts that were hardest to
// verify and easiest to get wrong — the corrected statistic framing, the
// closed prisons, and the exclusions we committed to.

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

import { loader as detentionLoader } from "../app/routes/$lang.family.soldiers.detention";
import { loader as loneSoldierLoader } from "../app/routes/$lang.family.soldiers.lone-soldier";
import { loader as hubLoader } from "../app/routes/$lang.family.soldiers._index";
import { loader as coreSitemapLoader } from "../app/routes/sitemap-core[.]xml";
import { loader as rightsSitemapLoader } from "../app/routes/sitemap-rights[.]xml";
import {
  DETENTION_AM_SUMMARY,
  DETENTION_CHROME,
  DETENTION_FAQS,
  DETENTION_TOPIC,
  HUB_CHROME,
  LONE_SOLDIER_CHROME,
} from "../app/lib/family/soldiers.server";
import {
  LONE_SOLDIER_AM_SUMMARY,
  LONE_SOLDIER_FAQS,
  LONE_SOLDIER_TOPIC,
} from "../app/lib/family/lone-soldier.server";
import { PRIORITY_RIGHTS } from "../app/lib/db/seeds/rights";
import { evaluate } from "../app/lib/rights/wizard-engine";
import { relevanceFor } from "../app/lib/rights/relevance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

const LOCALES = ["he", "en", "am"] as const;

describe("soldiers hub — content integrity (TED-142)", () => {
  it("both topics carry full HE/EN/AM title, subtitle and body", () => {
    for (const topic of [DETENTION_TOPIC, LONE_SOLDIER_TOPIC]) {
      for (const locale of LOCALES) {
        expect((topic.title[locale] ?? "").length).toBeGreaterThan(5);
        expect((topic.subtitle[locale] ?? "").length).toBeGreaterThan(20);
        expect((topic.body[locale] ?? "").length).toBeGreaterThan(1000);
      }
    }
  });

  it("every FAQ is trilingual on both guides", () => {
    for (const faqs of [DETENTION_FAQS, LONE_SOLDIER_FAQS]) {
      expect(faqs.length).toBeGreaterThanOrEqual(5);
      for (const faq of faqs) {
        for (const locale of LOCALES) {
          expect((faq.question[locale] ?? "").length).toBeGreaterThan(5);
          expect((faq.answer[locale] ?? "").length).toBeGreaterThan(20);
        }
      }
    }
  });

  it("ships a full Amharic summary for parents on both guides", () => {
    for (const summary of [DETENTION_AM_SUMMARY, LONE_SOLDIER_AM_SUMMARY]) {
      expect(summary.length).toBeGreaterThanOrEqual(8);
      for (const line of summary) {
        // Every line actually contains Ethiopic script.
        expect(line).toMatch(/[ሀ-፿]/);
      }
    }
  });

  it("carries the legal disclaimer in every locale on both guides", () => {
    expect(DETENTION_TOPIC.body.he).toContain("הבהרה משפטית");
    expect(DETENTION_TOPIC.body.en).toContain("Legal note");
    expect(LONE_SOLDIER_TOPIC.body.he).toContain("הבהרה");
    expect(LONE_SOLDIER_TOPIC.body.en).toContain("Note:");
  });
});

describe("detention guide — the verified claims (TED-142)", () => {
  const he = DETENTION_TOPIC.body.he;

  it("states the free 24/7 military defender and its phone number", () => {
    expect(he).toContain("הסנגוריה הצבאית");
    expect(he).toContain("073-310-3300");
    expect(DETENTION_TOPIC.resources.some((r) => r.phone === "073-310-3300")).toBe(true);
  });

  it("uses the CORRECTED statistic framing, not the inverted one", () => {
    // The brief's "11-15% of Ethiopian soldiers are jailed" is the inverse
    // statistic (share of jailed soldiers who are Ethiopian-Israeli, 2017).
    // The rate figure is the Comptroller's 53% vs 25% IDF-wide for 2010.
    expect(he).toContain("53%");
    expect(he).toContain("25%");
    expect(he).toContain("מבקר המדינה");
    // The 2017 disproportion must be stated as a share OF JAILED soldiers.
    expect(he).toContain("15.07%");
    expect(he).toContain("10.78%");
    // And must never claim 11-15% of Ethiopian soldiers are jailed.
    expect(he).not.toMatch(/11%\s*מהחיילים\s*נשלחים/);
  });

  it("names the documented economic cause of AWOL", () => {
    expect(he).toContain("מרכז המחקר והמידע של הכנסת");
    expect(he).toContain("לסייע בפרנסת המשפחה");
  });

  it("corrects the closed-prison error rather than repeating it", () => {
    expect(he).toContain("נווה צדק");
    expect(he).toContain("נסגרו לצמיתות");
  });

  it("flags the AWOL policy as wartime policy, not a permanent rule", () => {
    expect(he).toContain("תקופת המלחמה");
    expect(he).toContain("30 יום");
  });

  it("teaches the sealed-envelope channel and the commissioner's limits", () => {
    expect(he).toContain("545");
    expect(he).toContain("מבלי לפותחה");
    expect(he).toContain("אינו מוסמך לטפל בעניינים משמעתיים");
  });

  it("states the visiting-hours exclusion instead of inventing hours", () => {
    expect(he).toContain("לא מצאנו מקור רשמי");
    // No invented visiting day or hour range may appear.
    expect(he).not.toMatch(/ימי ראשון ורביעי|09:00-12:00/);
  });

  it("does not list Tebeka, which has no military-criminal practice", () => {
    const names = DETENTION_TOPIC.resources.map((r) => r.name).join(" ");
    expect(names).not.toContain("טבקה");
  });

  it("links only the live ufis.org.il domain, never awis.org.il", () => {
    const urls = [...DETENTION_TOPIC.resources, ...LONE_SOLDIER_TOPIC.resources]
      .map((r) => r.url ?? "")
      .join(" ");
    expect(urls).not.toContain("awis.org.il");
    expect(urls).not.toContain("aka.idf.il");
  });
});

describe("lone-soldier guide — the verified claims (TED-142)", () => {
  const he = LONE_SOLDIER_TOPIC.body.he;

  it("gives the three recognized categories and the order number", () => {
    expect(he).toContain("35.0808");
    expect(he).toContain("בודד מובהק");
    expect(he).toContain("חסר עורף משפחתי");
    expect(he).toContain("יתום");
  });

  it("busts the 'lone soldier by choice' myth", () => {
    expect(he).toContain('"חייל בודד מבחירה" אינו מעמד קיים');
  });

  it("names both forms and the documentation asymmetry", () => {
    expect(he).toContain("7304");
    expect(he).toContain("טופס 62");
    expect(he).toContain("אין צורך בתיעוד כלל");
  });

  it("states the Ethiopian-specific MOIA entitlement without inventing a number", () => {
    expect(he).toContain("11.186");
    expect(he).toContain("אוכלוסייה ייחודית");
    expect(he).toContain("2994");
    // The conflicting 10-vs-15-year windows must not be asserted.
    expect(he).not.toMatch(/15 שנים|10 שנים/);
  });

  it("quotes no shekel amounts anywhere in any locale", () => {
    for (const locale of LOCALES) {
      const body = LONE_SOLDIER_TOPIC.body[locale] ?? "";
      expect(body).not.toMatch(/₪\s*\d/);
      expect(body).not.toMatch(/\d+\s*ש"ח/);
    }
  });
});

describe('ת"ש wizard semantics (TED-142)', () => {
  const right = PRIORITY_RIGHTS.find((r) => r.slug.he === "idf-family-support");

  it("is seeded with a wizard and a trilingual body", () => {
    expect(right).toBeDefined();
    expect(right!.wizard).toBeDefined();
    for (const locale of LOCALES) {
      expect((right!.bodies[locale] ?? "").length).toBeGreaterThan(800);
    }
  });

  it("every question and rule reason is trilingual", () => {
    const w = right!.wizard!;
    for (const q of w.questions) {
      for (const locale of LOCALES) {
        expect((q.label[locale] ?? "").length).toBeGreaterThan(5);
      }
      if (q.type === "radio") {
        for (const opt of q.options) {
          for (const locale of LOCALES) {
            expect((opt.label[locale] ?? "").length).toBeGreaterThan(1);
          }
        }
      }
    }
    for (const rule of w.rules) {
      for (const locale of LOCALES) {
        expect((rule.reason[locale] ?? "").length).toBeGreaterThan(20);
      }
    }
  });

  it("a conscript whose family is in financial hardship may apply", () => {
    const out = evaluate(right!.wizard!, {
      serviceType: "conscript",
      financialHardship: true,
      noParentalSupport: false,
      hasDependents: false,
    });
    expect(out.eligible).toBe(true);
  });

  it("a pre-recruit with no parental support may apply", () => {
    const out = evaluate(right!.wizard!, {
      serviceType: "pre-enlist",
      financialHardship: false,
      noParentalSupport: true,
      hasDependents: false,
    });
    expect(out.eligible).toBe(true);
  });

  it("dependents alone open the route", () => {
    const out = evaluate(right!.wizard!, {
      serviceType: "conscript",
      financialHardship: false,
      noParentalSupport: false,
      hasDependents: true,
    });
    expect(out.eligible).toBe(true);
  });

  it("career service is excluded and says why, citing the order", () => {
    const out = evaluate(right!.wizard!, {
      serviceType: "career",
      financialHardship: true,
      noParentalSupport: false,
      hasDependents: false,
    });
    expect(out.eligible).toBe(false);
    if (!out.eligible) {
      expect(out.reasons[0]?.he).toContain("35.0210");
    }
  });

  it("a conscript with no qualifying situation is not routed to apply", () => {
    const out = evaluate(right!.wizard!, {
      serviceType: "conscript",
      financialHardship: false,
      noParentalSupport: false,
      hasDependents: false,
    });
    expect(out.eligible).toBe(false);
  });

  it("body promises no amount and no income threshold", () => {
    expect(right!.bodies.he).toContain("לא פירטנו סכומים");
    expect(right!.bodies.he).toContain("לא פירטנו תנאי סף כלכליים");
  });

  it("ships no city cells — the order applies army-wide", () => {
    expect(relevanceFor("idf-family-support")).toEqual({
      kind: "list",
      cities: [],
    });
  });
});

describe("loaders (TED-142)", () => {
  it("detention loader localizes and emits all four JSON-LD blocks", async () => {
    const he = await detentionLoader(fakeArgs({ lang: "he" }));
    const en = await detentionLoader(fakeArgs({ lang: "en" }));
    const am = await detentionLoader(fakeArgs({ lang: "am" }));

    expect(he.title).toMatch(/[֐-׿]/);
    expect(en.title).toMatch(/Detained/);
    expect(am.title).toMatch(/[ሀ-፿]/);
    expect(he.title).not.toBe(en.title);

    expect(he.webPage["@type"]).toBe("WebPage");
    expect(he.article["@type"]).toBe("Article");
    expect(he.faqPage["@type"]).toBe("FAQPage");
    expect(he.breadcrumb["@type"]).toBe("BreadcrumbList");
    expect(he.faqPage.mainEntity as unknown[]).toHaveLength(DETENTION_FAQS.length);
  });

  it("lone-soldier loader localizes and emits all four JSON-LD blocks", async () => {
    const he = await loneSoldierLoader(fakeArgs({ lang: "he" }));
    const en = await loneSoldierLoader(fakeArgs({ lang: "en" }));
    expect(he.title).not.toBe(en.title);
    expect(he.faqPage.mainEntity as unknown[]).toHaveLength(LONE_SOLDIER_FAQS.length);
    expect(he.breadcrumb["@type"]).toBe("BreadcrumbList");
  });

  it("hub loader returns three cards pointing at the right paths", async () => {
    const he = await hubLoader(fakeArgs({ lang: "he" }));
    expect(he.cards).toHaveLength(3);
    const tos = he.cards.map((c) => c.to);
    expect(tos).toContain("/he/family/soldiers/detention");
    expect(tos).toContain("/he/family/soldiers/lone-soldier");
    expect(tos).toContain("/he/rights/idf-family-support");
  });

  it("all three loaders fall back to HE for an unknown locale", async () => {
    for (const loader of [detentionLoader, loneSoldierLoader, hubLoader]) {
      const out = await loader(fakeArgs({ lang: "xx" }));
      expect(out.locale).toBe("he");
    }
  });

  it("passes only the active locale's chrome, never a Record", async () => {
    const he = await detentionLoader(fakeArgs({ lang: "he" }));
    // ADR-020: the component receives resolved strings, not Record<Locale,…>.
    expect(typeof he.chrome.glanceTitle).toBe("string");
    expect(he.chrome).toEqual(DETENTION_CHROME.he);
  });
});

describe("chrome completeness (TED-142)", () => {
  it("both guide chromes and the hub chrome cover all three locales", () => {
    for (const locale of LOCALES) {
      expect(DETENTION_CHROME[locale].glanceItems.length).toBeGreaterThanOrEqual(5);
      expect(LONE_SOLDIER_CHROME[locale].glanceItems.length).toBeGreaterThanOrEqual(5);
      expect(HUB_CHROME[locale].cards).toHaveLength(3);
      expect(HUB_CHROME[locale].title.length).toBeGreaterThan(5);
      expect(HUB_CHROME[locale].intro.length).toBeGreaterThan(80);
    }
  });
});

describe("sitemap wiring (TED-142)", () => {
  it("core sitemap lists the hub and both guides", async () => {
    const res = coreSitemapLoader();
    const xml = await res.text();
    expect(xml).toContain("/he/family/soldiers");
    expect(xml).toContain("/he/family/soldiers/detention");
    expect(xml).toContain("/he/family/soldiers/lone-soldier");
  });

  it('rights sitemap lists the ת"ש right with no city cells', async () => {
    const res = rightsSitemapLoader();
    const xml = await res.text();
    expect(xml).toContain("/rights/idf-family-support<");
    expect(xml).not.toMatch(/idf-family-support\//);
  });
});
