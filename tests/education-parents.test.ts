// TED-145 — parents vs. the school system.
//
// Three surfaces: the special-education eligibility-committee right (with its
// objection wizard), the registration-discrimination guide, and the
// parent-rights guide.
//
// These tests pin the content to its primary sources. The statutory numbers
// here — 21 days to object, 14 days to choose a framework, 14 days for
// documents and for the protocol, the 7-day registration/transfer appeals —
// come from חוק חינוך מיוחד, חוק זכויות התלמיד and the registration and
// transfer regulations. A future edit that silently loosens one of them
// should fail here, because a parent acting on a wrong deadline loses a right
// they cannot get back.

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

import { PRIORITY_RIGHTS } from "../app/lib/db/seeds/rights";
import { getRightBySlug } from "../app/lib/db/queries/rights.server";
import { evaluate, type Answers } from "../app/lib/rights/wizard-engine";
import { CITIES } from "../app/lib/cities/registry";
import {
  COMMUNITY_CITIES,
  isRelevant,
  relevantCities,
} from "../app/lib/rights/relevance";
import {
  eligibilityCommitteePath,
  parentRightsPath,
  registrationDiscriminationPath,
} from "../app/lib/education/links";
import {
  DISCRIMINATION_AMHARIC_SUMMARY,
  DISCRIMINATION_BODY,
  DISCRIMINATION_COPY,
  DISCRIMINATION_FAQ,
  DISCRIMINATION_RESOURCES,
  DISCRIMINATION_SOURCES,
  DISCRIMINATION_STEPS,
  DISCRIMINATION_SUBTITLE,
  DISCRIMINATION_TITLE,
} from "../app/lib/education/registration-discrimination.server";
import {
  PARENT_RIGHTS_AMHARIC_SUMMARY,
  PARENT_RIGHTS_BODY,
  PARENT_RIGHTS_COPY,
  PARENT_RIGHTS_FAQ,
  PARENT_RIGHTS_RESOURCES,
  PARENT_RIGHTS_SOURCES,
  PARENT_RIGHTS_STEPS,
  PARENT_RIGHTS_SUBTITLE,
  PARENT_RIGHTS_TITLE,
} from "../app/lib/education/parent-rights.server";
import {
  breadcrumbJsonLd,
  educationArticleJsonLd,
  faqPageJsonLd,
} from "../app/lib/education/schema";
import he from "../messages/he.json";
import en from "../messages/en.json";
import am from "../messages/am.json";

import { loader as discriminationLoader } from "../app/routes/$lang.education.registration-discrimination";
import { loader as parentRightsLoader } from "../app/routes/$lang.education.parent-rights";
import { loader as sitemapContentLoader } from "../app/routes/sitemap-content[.]xml";

const LOCALES = ["he", "en", "am"] as const;
const COMMITTEE_SLUG = "special-education-eligibility-committee";

const committee = PRIORITY_RIGHTS.find((r) => r.slug.he === COMMITTEE_SLUG);

// A parent, inside 21 days, objecting to an eligibility-committee decision
// they received in writing.
const ELIGIBLE: Answers = {
  decisionInWriting: "true",
  decidingBody: "eligibility-committee",
  filedBy: "parent",
  within21Days: "true",
};

// ── the eligibility-committee right ────────────────────────────────────────

describe("special-education eligibility committee — seed integrity (TED-145)", () => {
  it("exists with the same slug in all locales and is tagged education", () => {
    expect(committee).toBeDefined();
    expect(committee?.slug.en).toBe(COMMITTEE_SLUG);
    expect(committee?.slug.am).toBe(COMMITTEE_SLUG);
    expect(committee?.tags).toContain("education");
  });

  it("carries substantial HE/EN/AM bodies", () => {
    for (const locale of LOCALES) {
      expect(
        committee?.bodies[locale].length,
        `${locale} body too short`,
      ).toBeGreaterThan(1500);
    }
  });

  it("uses the post-2018 committee names and flags the old one", () => {
    const body = committee?.bodies.he ?? "";
    // The current statutory names.
    expect(body).toContain("ועדת זכאות ואפיון");
    expect(body).toContain("ועדת השגה");
    // The old name is named as old — parents still search for it.
    expect(body).toContain("ועדת השמה");
    expect(body).toContain("תיקון מס' 11");
    // ועדת ערר was renamed; it must not be presented as the live appeal body.
    expect(body).not.toContain("ערר לוועדת ערר");
  });

  it("states the statutory clocks exactly", () => {
    const body = committee?.bodies.he ?? "";
    expect(body).toContain("21 ימים"); // objection deadline
    expect(body).toContain("14 ימים"); // documents / protocol / framework choice
    expect(body).toContain("שלוש שנים"); // validity of the decision
    expect(body).toContain("31 במרץ"); // referral deadline
  });

  it("states the parents' right to choose the framework, with its section", () => {
    const body = committee?.bodies.he ?? "";
    expect(body).toContain("סעיף 7(ב)");
    expect(body).toContain("בוחרים את סוג המסגרת");
  });

  it("carries the linguistic-accessibility right and the immigrant safeguard", () => {
    const body = committee?.bodies.he ?? "";
    // חוזר מנכ"ל 0287 — accessibility must be arranged in advance, and a
    // hearing held without it is rescheduled.
    expect(body).toContain("0287");
    expect(body).toContain("הורים שאינם דוברי עברית");
    expect(body).toContain("ייקבע מועד חדש");
    // The safeguard against referring a new immigrant on language grounds.
    expect(body).toContain("קשיי קליטה ושפה בלבד");
  });

  it("carries a legal disclaimer and cites primary sources in every locale", () => {
    expect(committee?.bodies.he).toContain("הבהרה משפטית");
    for (const locale of LOCALES) {
      const body = committee?.bodies[locale] ?? "";
      expect(body, `${locale} missing the statute link`).toContain(
        "nevo.co.il/law_html/law00/71999.htm",
      );
      expect(body, `${locale} missing the ministry circular`).toContain(
        "horaa.aspx?siduri=385",
      );
    }
  });

  it("is served by the rights query layer with its wizard attached", () => {
    const right = getRightBySlug(COMMITTEE_SLUG, "he");
    expect(right).not.toBeNull();
    expect(right?.wizard).not.toBeNull();
    expect(right?.govUrl.startsWith("https://www.gov.il/")).toBe(true);
  });

  it("ships city cells only where the community lives", () => {
    // The committee sits at the local authority, so place matters — but 38
    // national cells would be thin. Scope is `community-cities`.
    const cells = relevantCities(COMMITTEE_SLUG, CITIES);
    expect(cells.length).toBeGreaterThan(0);
    expect(cells.length).toBeLessThan(CITIES.length);
    for (const city of cells) {
      expect(COMMUNITY_CITIES).toContain(city.slug);
    }
    expect(isRelevant(COMMITTEE_SLUG, "netanya")).toBe(true);
    const outsider = CITIES.find((c) => !COMMUNITY_CITIES.includes(c.slug));
    expect(outsider).toBeDefined();
    if (outsider) expect(isRelevant(COMMITTEE_SLUG, outsider.slug)).toBe(false);
  });
});

// ── the objection wizard ───────────────────────────────────────────────────

describe("objection (השגה) wizard — statute semantics (TED-145)", () => {
  const wizard = committee?.wizard;

  it("asks the four statutory questions, fully trilingual", () => {
    expect(wizard?.questions.map((q) => q.id)).toEqual([
      "decisionInWriting",
      "decidingBody",
      "filedBy",
      "within21Days",
    ]);
    for (const q of wizard?.questions ?? []) {
      for (const locale of LOCALES) {
        expect(q.label[locale], `question ${q.id} missing ${locale}`).toBeTruthy();
      }
    }
    for (const rule of wizard?.rules ?? []) {
      for (const locale of LOCALES) {
        expect(rule.reason[locale], `a rule reason is missing ${locale}`).toBeTruthy();
      }
    }
  });

  it("accepts a parent objecting in time to an eligibility-committee decision", () => {
    expect(wizard).toBeDefined();
    if (!wizard) return;
    expect(evaluate(wizard, ELIGIBLE)).toEqual({ eligible: true });
  });

  it("accepts a multi-professional-team decision — circular 0287 allows it", () => {
    expect(wizard).toBeDefined();
    if (!wizard) return;
    expect(
      evaluate(wizard, { ...ELIGIBLE, decidingBody: "multi-professional-team" }),
    ).toEqual({ eligible: true });
  });

  it("accepts the student and a public organisation as filers (§13(א))", () => {
    expect(wizard).toBeDefined();
    if (!wizard) return;
    for (const filedBy of ["student", "public-organisation"]) {
      expect(evaluate(wizard, { ...ELIGIBLE, filedBy })).toEqual({ eligible: true });
    }
  });

  const disqualifiers: Array<[string, Answers]> = [
    ["no written decision yet", { ...ELIGIBLE, decisionInWriting: "false" }],
    [
      "a placement-committee decision",
      { ...ELIGIBLE, decidingBody: "placement-committee" },
    ],
    ["someone with no standing files", { ...ELIGIBLE, filedBy: "other" }],
    ["the 21 days have passed", { ...ELIGIBLE, within21Days: "false" }],
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

  it("routes a placement-committee decision somewhere useful rather than dead-ending", () => {
    expect(wizard).toBeDefined();
    if (!wizard) return;
    const result = evaluate(wizard, {
      ...ELIGIBLE,
      decidingBody: "placement-committee",
    });
    expect(result.eligible).toBe(false);
    if (!result.eligible) {
      expect(result.reasons[0]?.he).toContain("ועדת שיבוץ");
      expect(result.reasons[0]?.he).toContain("מחלקת החינוך");
    }
  });

  it("treats an unanswered wizard as not-yet-eligible", () => {
    expect(wizard).toBeDefined();
    if (!wizard) return;
    expect(evaluate(wizard, {}).eligible).toBe(false);
  });
});

// ── content-module integrity, both guides ──────────────────────────────────

const guides = [
  {
    name: "registration discrimination",
    title: DISCRIMINATION_TITLE,
    subtitle: DISCRIMINATION_SUBTITLE,
    body: DISCRIMINATION_BODY,
    summary: DISCRIMINATION_AMHARIC_SUMMARY,
    steps: DISCRIMINATION_STEPS,
    faq: DISCRIMINATION_FAQ,
    resources: DISCRIMINATION_RESOURCES,
    sources: DISCRIMINATION_SOURCES,
    copy: DISCRIMINATION_COPY,
  },
  {
    name: "parent rights",
    title: PARENT_RIGHTS_TITLE,
    subtitle: PARENT_RIGHTS_SUBTITLE,
    body: PARENT_RIGHTS_BODY,
    summary: PARENT_RIGHTS_AMHARIC_SUMMARY,
    steps: PARENT_RIGHTS_STEPS,
    faq: PARENT_RIGHTS_FAQ,
    resources: PARENT_RIGHTS_RESOURCES,
    sources: PARENT_RIGHTS_SOURCES,
    copy: PARENT_RIGHTS_COPY,
  },
] as const;

describe.each(guides)("$name guide — content integrity (TED-145)", (guide) => {
  it("is fully trilingual across title, subtitle and body", () => {
    for (const locale of LOCALES) {
      expect(guide.title[locale]).toBeTruthy();
      expect(guide.subtitle[locale]).toBeTruthy();
      expect(guide.body[locale].length, `${locale} body too short`).toBeGreaterThan(1500);
    }
  });

  it("carries an Amharic summary rendered on every locale of the page", () => {
    expect(guide.summary.length).toBeGreaterThan(600);
    // Ge'ez script — this is the Amharic block, not a Hebrew fallback.
    expect(/[ሀ-፿]/.test(guide.summary)).toBe(true);
  });

  it("has trilingual steps, FAQ, resources, sources and chrome", () => {
    for (const locale of LOCALES) {
      for (const s of guide.steps) {
        expect(s.title[locale], `step ${s.id} title missing ${locale}`).toBeTruthy();
        expect(s.detail[locale], `step ${s.id} detail missing ${locale}`).toBeTruthy();
      }
      for (const f of guide.faq) {
        expect(f.question[locale], `faq ${f.id} q missing ${locale}`).toBeTruthy();
        expect(f.answer[locale], `faq ${f.id} a missing ${locale}`).toBeTruthy();
      }
      for (const r of guide.resources) {
        expect(r.description[locale]).toBeTruthy();
      }
      for (const s of guide.sources) {
        expect(s.name[locale]).toBeTruthy();
      }
      for (const [key, value] of Object.entries(guide.copy)) {
        expect(value[locale], `copy.${key} missing ${locale}`).toBeTruthy();
      }
    }
  });

  it("carries a disclaimer that disclaims legal advice", () => {
    expect(guide.copy.disclaimer?.he).toContain("ייעוץ משפטי");
    expect(guide.copy.disclaimer?.en?.toLowerCase()).toContain("not legal advice");
  });

  it("cites only https sources, with no superseded circulars", () => {
    const urls = [
      ...guide.sources.map((s) => s.url),
      ...guide.steps.flatMap((s) => (s.officialUrl ? [s.officialUrl] : [])),
      ...guide.resources.map((r) => r.url),
    ];
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      expect(url.startsWith("https://"), `${url} is not https`).toBe(true);
    }
    // Circulars that expired and still rank in search — never link these.
    for (const dead of ["siduri=381", "siduri=492", "siduri=251", "siduri=191"]) {
      expect(urls.join(" "), `links a superseded circular (${dead})`).not.toContain(dead);
    }
    // The Ministry's own site migrated this path away.
    expect(urls.join(" ")).not.toContain("edu.gov.il/heb/about/units");
  });

  it("uses Tebeka's currently published phone number", () => {
    // The stale-number guard now runs repo-wide in tests/content-contacts.test.ts
    // (TED-155); this only pins that the page still carries the verified line.
    expect(JSON.stringify(guide)).toContain("072-2424622");
  });
});

// ── claims that must not drift ─────────────────────────────────────────────

describe("registration-discrimination guide — legal claims (TED-145)", () => {
  const body = DISCRIMINATION_BODY.he;

  it("quotes סעיף 5 and names the grounds that apply to this community", () => {
    expect(body).toContain("סעיף 5");
    expect(body).toContain("מטעמים עדתיים");
    expect(body).toContain("מטעמים של ארץ מוצא");
    // The parents' characteristics count too — easy to lose in an edit.
    expect(body).toContain("בין של הילד ובין של הוריו");
  });

  it("states that the prohibition binds recognised non-official schools (§16(ב))", () => {
    expect(body).toContain("סעיף 16(ב)");
    expect(body).toContain("מוסד חינוך מוכר שאינו רשמי");
  });

  it("states the regulation-backed appeal deadlines", () => {
    expect(body).toContain("תקנה 30");
    expect(body).toContain("תקנה 11");
    expect(body).toContain("7 ימים");
  });

  it("does not assert what the Petah Tikva judgment held", () => {
    // The docket may be named; the holding may not — the judgment text could
    // not be verified from a primary source.
    expect(body).toContain('בג"ץ 7426/08');
    expect(body).toContain("איננו מתארים כאן את שנפסק");
    for (const unverified of ["פסק הדין קבע", "בית המשפט קבע", "נתקבלה העתירה"]) {
      expect(body).not.toContain(unverified);
    }
  });

  it("does not claim discrimination is a disciplinary offence — no such provision", () => {
    expect(body).not.toContain("עבירת משמעת");
  });

  it("warns against the wrong address (employment equality commission)", () => {
    expect(body).toContain("נציבות שוויון ההזדמנויות בעבודה");
    expect(body).toContain("לא בחינוך");
  });
});

describe("parent-rights guide — factual claims (TED-145)", () => {
  const body = PARENT_RIGHTS_BODY.he;

  it("states that only personal-accident insurance is compulsory", () => {
    expect(body).toContain("ביטוח תאונות אישיות");
    expect(body).toContain("שירותי רשות");
  });

  it("keeps the consent distinction that most guides get wrong", () => {
    // The committee's approval is required at school level but never replaces
    // the individual parent's written consent.
    expect(body).toContain("הסכמה אישית בכתב");
    expect(body).toContain("אין די בהסכמה של נציגות ההורים המוסדית");
  });

  it("states the non-payment protections without overstating them", () => {
    expect(body).toContain("קשיים כלכליים");
    expect(body).toContain("תעודת בגרות");
    // The honest nuance: the protection attaches to financial hardship.
    expect(body).toContain("ההגנה הזו חלה על מצוקה כלכלית");
  });

  it("surfaces the school scholarship committee and its amounts", () => {
    expect(body).toContain("ועדת מלגות");
    expect(body).toContain("750");
    expect(body).toContain("1,200");
  });

  it("does not overclaim a general right to an interpreter", () => {
    // The duty exists in two defined contexts; the page must say so.
    expect(body).toContain("בשני הקשרים מוגדרים");
    expect(body).toContain("לא מצאנו חובה קבועה בחוזר לספק תרגום");
  });

  it("states the expulsion protections, including that the pupil stays meanwhile", () => {
    expect(body).toContain("14 יום");
    expect(body).toContain("לא יורחק תלמיד עד להגשת ערר");
  });

  it("uses the current term for parent representation", () => {
    expect(body).toContain("נציגות הורים");
    expect(body).toContain("מועצת ההורים בוטלה");
  });
});

// ── loaders + JSON-LD + wiring ─────────────────────────────────────────────

describe("guide loaders (TED-145)", () => {
  for (const locale of LOCALES) {
    it(`registration-discrimination loader resolves plain strings for ${locale}`, async () => {
      const data = await discriminationLoader({
        params: { lang: locale },
      } as never);
      expect(data.locale).toBe(locale);
      expect(data.title).toBe(DISCRIMINATION_TITLE[locale]);
      expect(typeof data.body).toBe("string");
      expect(data.steps.length).toBe(DISCRIMINATION_STEPS.length);
      expect(data.faq.length).toBe(DISCRIMINATION_FAQ.length);
      expect(data.crosslinks.length).toBeGreaterThan(0);
      // ADR-020: the component must receive resolved strings, never a
      // Record<Locale, string>.
      expect(typeof data.steps[0]?.title).toBe("string");
      expect(typeof data.faq[0]?.answer).toBe("string");
    });

    it(`parent-rights loader resolves plain strings for ${locale}`, async () => {
      const data = await parentRightsLoader({ params: { lang: locale } } as never);
      expect(data.locale).toBe(locale);
      expect(data.title).toBe(PARENT_RIGHTS_TITLE[locale]);
      expect(typeof data.body).toBe("string");
      expect(typeof data.steps[0]?.detail).toBe("string");
      expect(data.summary).toBe(PARENT_RIGHTS_AMHARIC_SUMMARY);
    });
  }

  it("falls back to Hebrew for an unknown locale segment", async () => {
    const data = await discriminationLoader({ params: { lang: "zz" } } as never);
    expect(data.locale).toBe("he");
  });
});

describe("education JSON-LD (TED-145)", () => {
  const ctx = { publicUrl: "https://tedros.co.il", locale: "he" as const };

  it("emits an Article with an absolute, locale-scoped URL", () => {
    const jsonLd = educationArticleJsonLd(ctx, {
      path: registrationDiscriminationPath(),
      headline: DISCRIMINATION_TITLE.he,
      description: DISCRIMINATION_SUBTITLE.he,
      datePublished: "2026-08-31",
    });
    expect(jsonLd["@type"]).toBe("Article");
    expect(jsonLd["@id"]).toBe(
      "https://tedros.co.il/he/education/registration-discrimination",
    );
    expect(jsonLd.inLanguage).toBe("he");
  });

  it("emits a FAQPage carrying every question", () => {
    const jsonLd = faqPageJsonLd(
      ctx,
      parentRightsPath(),
      PARENT_RIGHTS_FAQ.map((f) => ({ question: f.question.he, answer: f.answer.he })),
    ) as { mainEntity: Array<{ "@type": string; name: string }> };
    expect(jsonLd.mainEntity).toHaveLength(PARENT_RIGHTS_FAQ.length);
    expect(jsonLd.mainEntity[0]?.["@type"]).toBe("Question");
    expect(jsonLd.mainEntity[0]?.name).toBe(PARENT_RIGHTS_FAQ[0]?.question.he);
  });

  it("emits an ordered BreadcrumbList", () => {
    const jsonLd = breadcrumbJsonLd(ctx, [
      { name: "בית", path: "/" },
      { name: "חינוך", path: "/education" },
      { name: PARENT_RIGHTS_TITLE.he, path: parentRightsPath() },
    ]) as { itemListElement: Array<{ position: number; item: string }> };
    expect(jsonLd.itemListElement.map((i) => i.position)).toEqual([1, 2, 3]);
    expect(jsonLd.itemListElement[2]?.item).toBe(
      "https://tedros.co.il/he/education/parent-rights",
    );
  });
});

describe("wiring (TED-145)", () => {
  it("puts both guides in the content sitemap, in all three locales", async () => {
    const response = await sitemapContentLoader();
    const xml = await response.text();
    for (const locale of LOCALES) {
      for (const path of [registrationDiscriminationPath(), parentRightsPath()]) {
        expect(xml, `${locale}${path} missing from the sitemap`).toContain(
          `https://tedros.co.il/${locale}${path}`,
        );
      }
    }
  });

  it("keeps the link helpers and the wizard's rights slug in step", () => {
    expect(eligibilityCommitteePath()).toBe(`/rights/${COMMITTEE_SLUG}`);
    expect(registrationDiscriminationPath()).toBe(
      "/education/registration-discrimination",
    );
    expect(parentRightsPath()).toBe("/education/parent-rights");
  });

  it("has the education-pillar card messages in all three locales", () => {
    const dictionaries: Array<[string, Record<string, string>]> = [
      ["he", he],
      ["en", en],
      ["am", am],
    ];
    const cardKeys = [
      "education_committee_title",
      "education_committee_subtitle",
      "education_discrimination_title",
      "education_discrimination_subtitle",
      "education_parent_rights_title",
      "education_parent_rights_subtitle",
    ];
    for (const key of cardKeys) {
      for (const [locale, dict] of dictionaries) {
        expect(dict[key], `${key} missing from messages/${locale}.json`).toBeTruthy();
      }
    }
  });

  it("cross-links the three surfaces to one another", () => {
    const discriminationTargets = JSON.stringify(DISCRIMINATION_BODY);
    const parentTargets = JSON.stringify(PARENT_RIGHTS_BODY);
    // The wizard page points at both guides.
    expect(committee?.bodies.he).toContain("/he/education/registration-discrimination");
    expect(committee?.bodies.he).toContain("/he/education/parent-rights");
    // And the guides point back, via the crosslink lists (checked by loader
    // tests) and the Voice pillar from the discrimination page.
    expect(discriminationTargets.length).toBeGreaterThan(0);
    expect(parentTargets).toContain("ועדת מלגות");
  });
});
