// TED-147 — the Amharic-learning hub and the Hebrew-ulpan guide.
//
// Two things these tests exist to stop:
//
// 1. **A silently wrong alphabet.** The fidel chart is generated from base
//    code points rather than typed out, which is what makes it cheap — but it
//    also means a single wrong number silently renders a whole row of
//    plausible-looking garbage that almost no reviewer would catch. The chart
//    is therefore pinned against known glyphs and against the structural
//    invariants of the Ethiopic Unicode block.
//
// 2. **The rejected ulpan claim coming back.** The spec this page grew out of
//    was withdrawn because it presented a two-teacher ulpan model as an
//    available service when the ministry's own 2014 review says it was tried
//    in individual classrooms and never rolled out. A future edit that
//    re-introduces that promise should fail here.

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
  FIDEL_ORDERS,
  FIDEL_ORDER_COUNT,
  FIDEL_ROWS,
  FIDEL_SYLLABLE_COUNT,
  fidelChar,
  fidelLatin,
} from "../app/lib/education/fidel";
import {
  AMHARIC_COURSES,
  AMHARIC_HUB_CROSSLINKS,
  AMHARIC_HUB_FAQ,
  AMHARIC_HUB_SECTIONS,
  AMHARIC_HUB_SOURCES,
  AMHARIC_HUB_SUBTITLE,
  AMHARIC_HUB_SUMMARY,
  AMHARIC_HUB_TITLE,
  AMHARIC_PHRASES,
  AMHARIC_SUPPLY_GAP,
  ULPAN_BODY,
  ULPAN_FAQ,
  ULPAN_SOURCES,
  ULPAN_STEPS,
  ULPAN_SUBTITLE,
  ULPAN_TITLE,
  ulpanCrosslinks,
  ulpanFaq,
  ulpanResources,
  ulpanSources,
  ulpanSteps,
} from "../app/lib/education/amharic.server";
import { amharicHubPath, amharicUlpanPath } from "../app/lib/education/links";
import {
  breadcrumbJsonLd,
  educationArticleJsonLd,
  faqPageJsonLd,
} from "../app/lib/education/schema";
import { GLOSSARY } from "../app/lib/glossary/glossary.server";
import he from "../messages/he.json";
import en from "../messages/en.json";
import am from "../messages/am.json";

const LOCALES = ["he", "en", "am"] as const;
type Loc = (typeof LOCALES)[number];

// ───────────────────────────────────────────────────────────────────────────
// The fidel chart
// ───────────────────────────────────────────────────────────────────────────

describe("the Ge'ez fidel chart", () => {
  it("is 34 consonants × 7 orders = 238 syllables", () => {
    expect(FIDEL_ROWS).toHaveLength(34);
    expect(FIDEL_ORDER_COUNT).toBe(7);
    expect(FIDEL_SYLLABLE_COUNT).toBe(238);
  });

  it("generates the glyphs a reader would check first", () => {
    // ሀ ሁ ሂ ሃ ሄ ህ ሆ — the opening row of every fidel chart ever printed.
    const h = FIDEL_ROWS[0]!;
    expect(FIDEL_ORDERS.map((_, i) => fidelChar(h, i)).join("")).toBe("ሀሁሂሃሄህሆ");

    // መ — the m-row, first order. The single most recognisable Ge'ez letter.
    const m = FIDEL_ROWS.find((r) => r.latin === "m")!;
    expect(fidelChar(m, 0)).toBe("መ");
    expect(fidelChar(m, 3)).toBe("ማ");

    // The vowel-carrier row spells out አማርኛ's first letter and እ.
    const glottal = FIDEL_ROWS.find((r) => r.latin === "ʾ")!;
    expect(fidelChar(glottal, 0)).toBe("አ");
    expect(fidelChar(glottal, 5)).toBe("እ");
  });

  it("keeps every glyph inside the Ethiopic Unicode block", () => {
    for (const row of FIDEL_ROWS) {
      for (let order = 0; order < FIDEL_ORDER_COUNT; order += 1) {
        const cp = fidelChar(row, order).codePointAt(0)!;
        expect(
          cp,
          `row ${row.latin} order ${order} escaped U+1200–U+137F`,
        ).toBeGreaterThanOrEqual(0x1200);
        expect(cp).toBeLessThanOrEqual(0x137f);
      }
    }
  });

  it("gives every syllable a distinct glyph", () => {
    const seen = new Set<string>();
    for (const row of FIDEL_ROWS) {
      for (let order = 0; order < FIDEL_ORDER_COUNT; order += 1) {
        seen.add(fidelChar(row, order));
      }
    }
    expect(seen.size).toBe(FIDEL_SYLLABLE_COUNT);
  });

  it("starts each row on an 8-aligned base, so orders 1–7 cannot run into the next consonant", () => {
    // Every consonant occupies 8 code points in the block. A base that is not
    // 8-aligned would make `base + order` walk into a neighbouring letter.
    for (const row of FIDEL_ROWS) {
      expect(
        row.base % 8,
        `${row.latin} base U+${row.base.toString(16)} is misaligned`,
      ).toBe(0);
    }
  });

  it("lists the bases in ascending order with no duplicates", () => {
    const bases = FIDEL_ROWS.map((r) => r.base);
    expect(bases).toEqual([...new Set(bases)]);
    expect(bases).toEqual([...bases].sort((a, b) => a - b));
  });

  it("excludes the labialised series, whose 5-member pattern has gaps", () => {
    // U+1248 ቈ, U+1288 ኈ, U+12B0 ኰ, U+1310 ጐ do not have seven consecutive forms.
    for (const labialised of [0x1248, 0x1288, 0x12b0, 0x1310]) {
      expect(FIDEL_ROWS.some((r) => r.base === labialised)).toBe(false);
    }
  });

  it("romanises the seven orders with the seven distinct vowels", () => {
    expect(FIDEL_ORDERS.map((o) => o.vowel)).toEqual(["ä", "u", "i", "a", "e", "ə", "o"]);
    const m = FIDEL_ROWS.find((r) => r.latin === "m")!;
    expect(fidelLatin(m, 0)).toBe("mä");
    expect(fidelLatin(m, 3)).toBe("ma");
  });

  it("names every order in Ge'ez, starting with ግዕዝ", () => {
    expect(FIDEL_ORDERS[0]!.geez).toBe("ግዕዝ");
    expect(FIDEL_ORDERS).toHaveLength(7);
    for (const order of FIDEL_ORDERS) {
      expect(order.geez).not.toBe("");
      expect(order.latin).not.toBe("");
    }
  });
});

// ───────────────────────────────────────────────────────────────────────────
// The hub content
// ───────────────────────────────────────────────────────────────────────────

describe("the Amharic-learning hub", () => {
  it("is authored in all three locales", () => {
    for (const loc of LOCALES) {
      expect(AMHARIC_HUB_TITLE[loc]).toBeTruthy();
      expect(AMHARIC_HUB_SUBTITLE[loc]).toBeTruthy();
      expect(AMHARIC_SUPPLY_GAP[loc]).toBeTruthy();
      for (const s of AMHARIC_HUB_SECTIONS) {
        expect(s.heading[loc], `${s.id} heading missing ${loc}`).toBeTruthy();
        expect(s.body[loc], `${s.id} body missing ${loc}`).toBeTruthy();
      }
      for (const f of AMHARIC_HUB_FAQ) {
        expect(f.question[loc], `${f.id} question missing ${loc}`).toBeTruthy();
        expect(f.answer[loc], `${f.id} answer missing ${loc}`).toBeTruthy();
      }
    }
  });

  it("keeps a meta description short enough for a SERP snippet", () => {
    for (const loc of LOCALES) {
      expect(AMHARIC_HUB_SUBTITLE[loc].length).toBeLessThanOrEqual(320);
    }
  });

  it("carries a standalone Amharic summary written in Ge'ez script", () => {
    // The point of this block is a reader who reads Amharic and not Hebrew, so
    // it must actually be Ge'ez — not a Hebrew paragraph that got mislabelled.
    expect(AMHARIC_HUB_SUMMARY).toMatch(/[ሀ-፿]/);
    expect(AMHARIC_HUB_SUMMARY).not.toMatch(/[֐-׿]/);
  });

  it("teaches the abugida structure rather than calling them 238 letters", () => {
    const faq = AMHARIC_HUB_FAQ.find((f) => f.id === "how-many-letters")!;
    expect(faq.answer.he).toContain("238");
    expect(faq.answer.he).toContain("34");
    expect(faq.answer.en.toLowerCase()).toContain("abugida");
  });

  it("states the bagrut entitlement, including the no-teacher route", () => {
    const section = AMHARIC_HUB_SECTIONS.find((s) => s.id === "bagrut")!;
    // 5 units, grades 10–12, and the fact a student can sit it regardless.
    expect(section.body.he).toContain("5 יחידות");
    expect(section.body.en).toContain("5-unit");
    const faq = AMHARIC_HUB_FAQ.find((f) => f.id === "bagrut-no-teacher")!;
    expect(faq.answer.he).toMatch(/כן\./);
    expect(faq.answer.en).toMatch(/^Yes\./);
  });
});

describe("family phrases", () => {
  const allPhrases = AMHARIC_PHRASES.flatMap((g) => g.phrases);

  it("has unique ids across every group", () => {
    const ids = allPhrases.map((p) => p.id);
    expect(ids).toEqual([...new Set(ids)]);
  });

  it("writes every phrase in Ge'ez script with a Latin transliteration", () => {
    for (const p of allPhrases) {
      expect(p.am, `${p.id} is not in Ge'ez script`).toMatch(/^[ሀ-፿\s]+$/);
      expect(p.translit, `${p.id} has no transliteration`).toBeTruthy();
      // A transliteration containing Ge'ez means the two columns got swapped.
      expect(p.translit, `${p.id} transliteration contains Ge'ez`).not.toMatch(/[ሀ-፿]/);
    }
  });

  it("translates every phrase into all three locales", () => {
    for (const p of allPhrases) {
      for (const loc of LOCALES) {
        expect(p.meaning[loc], `${p.id} meaning missing ${loc}`).toBeTruthy();
      }
    }
  });

  it("gives both addressee genders wherever the form changes", () => {
    // Amharic inflects for the gender of the person addressed. Shipping only
    // one form is the mistake a grandmother notices first.
    const byId = new Map(allPhrases.map((p) => [p.id, p]));
    const pairs: Array<[string, string]> = [
      ["love-f", "love-m"],
      ["how-are-you-f", "how-are-you-m"],
      ["welcome-f", "welcome-m"],
      ["morning-f", "morning-m"],
    ];
    for (const [f, m] of pairs) {
      expect(byId.get(f), `${f} missing`).toBeTruthy();
      expect(byId.get(m), `${m} missing`).toBeTruthy();
      expect(byId.get(f)!.am).not.toBe(byId.get(m)!.am);
    }
  });

  it("leads with the words said to a parent or grandparent", () => {
    const family = AMHARIC_PHRASES.find((g) => g.id === "family")!;
    const ids = family.phrases.map((p) => p.id);
    expect(ids).toContain("mother");
    expect(ids).toContain("father");
    expect(ids).toContain("grandmother");
    expect(ids).toContain("grandfather");
  });
});

describe("the verified course list", () => {
  it("has unique ids and an https URL each", () => {
    const ids = AMHARIC_COURSES.map((c) => c.id);
    expect(ids).toEqual([...new Set(ids)]);
    for (const c of AMHARIC_COURSES) {
      expect(c.url, `${c.id} is not https`).toMatch(/^https:\/\//);
    }
  });

  it("describes each entry in all three locales, with audience and cost", () => {
    for (const c of AMHARIC_COURSES) {
      for (const loc of LOCALES) {
        expect(c.name[loc], `${c.id} name missing ${loc}`).toBeTruthy();
        expect(c.description[loc], `${c.id} description missing ${loc}`).toBeTruthy();
        expect(c.audience[loc], `${c.id} audience missing ${loc}`).toBeTruthy();
        // Cost is never left blank — "not published, ask" is a valid answer,
        // an empty string is how a reader ends up assuming "free".
        expect(c.cost[loc], `${c.id} cost missing ${loc}`).toBeTruthy();
      }
    }
  });

  it("includes the two verified community providers and the ministry route", () => {
    const ids = AMHARIC_COURSES.map((c) => c.id);
    expect(ids).toContain("tegest");
    expect(ids).toContain("mulu");
    expect(ids).toContain("moe-bagrut");
  });

  it("lists no provider that could not be read at authoring time", () => {
    // Dropped deliberately: goethe-verlag/50LANGUAGES returns 403 to fetches,
    // and no live municipal course page was found. Re-adding either needs a
    // fresh verification round, not a revert of this line.
    const urls = AMHARIC_COURSES.map((c) => c.url).join(" ");
    expect(urls).not.toContain("goethe-verlag");
    expect(urls).not.toContain("50languages");
  });

  it("says out loud that no municipal course was verified", () => {
    // Silence here reads as "none exist". The gap note must survive edits.
    expect(AMHARIC_SUPPLY_GAP.he).toMatch(/מתנ|עיריות/);
    expect(AMHARIC_SUPPLY_GAP.en.toLowerCase()).toContain("community centre");
  });
});

// ───────────────────────────────────────────────────────────────────────────
// The ulpan guide — and the claim it must not make
// ───────────────────────────────────────────────────────────────────────────

describe("the Hebrew-ulpan guide", () => {
  it("is authored in all three locales", () => {
    for (const loc of LOCALES) {
      expect(ULPAN_TITLE[loc]).toBeTruthy();
      expect(ULPAN_SUBTITLE[loc]).toBeTruthy();
      expect(ULPAN_BODY[loc]).toBeTruthy();
      expect(ulpanSteps(loc as Loc)).not.toHaveLength(0);
      expect(ulpanFaq(loc as Loc)).not.toHaveLength(0);
      expect(ulpanResources(loc as Loc)).not.toHaveLength(0);
      expect(ulpanSources(loc as Loc)).not.toHaveLength(0);
    }
  });

  it("points at the ministry's live national ulpan list", () => {
    const listUrl =
      "https://adult-education.education.gov.il/inheritance_language/olpanim/";
    expect(ULPAN_SOURCES.map((s) => s.url)).toContain(listUrl);
    expect(ULPAN_STEPS[0]!.officialUrl).toBe(listUrl);
  });

  it("frames the two-teacher model as history, never as a bookable service", () => {
    // The spec that produced this page was withdrawn precisely because it did
    // the opposite. The 2014 ministry review is the reason, so the page must
    // keep saying it was never rolled out system-wide.
    expect(ULPAN_BODY.he).toContain("לא ניתן היה להטמיע דרך זו בכל המערכת");
    expect(ULPAN_BODY.he).toContain("אילוצי תקציב");
    expect(ULPAN_BODY.en).toContain("budget constraints");
    expect(ULPAN_BODY.en.toLowerCase()).toContain("historical background");
  });

  it("answers the bilingual-ulpan question with a clear no", () => {
    const faq = ULPAN_FAQ.find((f) => f.id === "is-there-bilingual")!;
    expect(faq.answer.he).toMatch(/^לא כשירות/);
    expect(faq.answer.en).toMatch(/^Not as a service/);
  });

  it("cites the 2014 review that withdrew the original claim", () => {
    expect(ULPAN_SOURCES.map((s) => s.url)).toContain(
      "https://meyda.education.gov.il/files/AdultEducation/hed_haulpan/hed_1_102_sara_rubinshtain.pdf",
    );
  });

  it("quotes no price, since none is published centrally", () => {
    const faq = ULPAN_FAQ.find((f) => f.id === "cost")!;
    expect(faq.answer.he).not.toMatch(/\d+\s*(₪|שקל)/);
  });

  it("gives every step a title and detail in every locale", () => {
    for (const loc of LOCALES) {
      for (const step of ulpanSteps(loc as Loc)) {
        expect(step.title, `${step.id} title missing ${loc}`).toBeTruthy();
        expect(step.detail, `${step.id} detail missing ${loc}`).toBeTruthy();
      }
    }
  });
});

// ───────────────────────────────────────────────────────────────────────────
// Wiring: links, glossary reciprocity, schema, messages
// ───────────────────────────────────────────────────────────────────────────

describe("routing and cross-links", () => {
  it("uses the canonical locale-relative paths", () => {
    expect(amharicHubPath()).toBe("/education/amharic");
    expect(amharicUlpanPath()).toBe("/education/amharic/ulpan");
  });

  it("links the hub and the ulpan page to each other", () => {
    expect(AMHARIC_HUB_CROSSLINKS.map((c) => c.path)).toContain(amharicUlpanPath());
    expect(ulpanCrosslinks("he").map((c) => c.path)).toContain(amharicHubPath());
  });

  it("links the hub out to the glossary terms it builds on", () => {
    const paths = AMHARIC_HUB_CROSSLINKS.map((c) => c.path);
    expect(paths).toContain("/glossary/geez");
    expect(paths).toContain("/glossary/orit");
    expect(paths).toContain("/glossary");
  });

  it("links the glossary back to the hub, both ways (TED-147)", () => {
    // The reciprocal half. `content-links` proves the links resolve; this
    // proves they exist at all, which is the thing a content edit drops.
    for (const slug of ["geez", "fidel"]) {
      const entry = GLOSSARY.find((e) => e.slug === slug)!;
      expect(entry, `glossary entry ${slug} vanished`).toBeTruthy();
      expect(entry.bodies.he, `${slug} HE body lost its hub link`).toContain(
        "/he/education/amharic",
      );
      expect(entry.bodies.en, `${slug} EN body lost its hub link`).toContain(
        "/en/education/amharic",
      );
    }
  });

  it("labels every cross-link in every locale", () => {
    for (const loc of LOCALES) {
      for (const link of AMHARIC_HUB_CROSSLINKS) {
        expect(link.label[loc], `${link.path} label missing ${loc}`).toBeTruthy();
      }
    }
  });
});

describe("structured data", () => {
  const ctx = { publicUrl: "https://tedros.co.il", locale: "he" as const };

  it("emits an Article for the hub", () => {
    const jsonLd = educationArticleJsonLd(ctx, {
      path: amharicHubPath(),
      headline: AMHARIC_HUB_TITLE.he,
      description: AMHARIC_HUB_SUBTITLE.he,
      datePublished: "2026-08-31",
    });
    expect(jsonLd["@type"]).toBe("Article");
    expect(JSON.stringify(jsonLd)).toContain("/he/education/amharic");
  });

  it("emits an FAQPage carrying every hub question", () => {
    const jsonLd = faqPageJsonLd(
      ctx,
      amharicHubPath(),
      AMHARIC_HUB_FAQ.map((f) => ({ question: f.question.he, answer: f.answer.he })),
    );
    expect(jsonLd["@type"]).toBe("FAQPage");
    expect(jsonLd.mainEntity).toHaveLength(AMHARIC_HUB_FAQ.length);
  });

  it("emits a three-level breadcrumb for the ulpan page", () => {
    const jsonLd = breadcrumbJsonLd(ctx, [
      { name: "בית", path: "/" },
      { name: "חינוך", path: "/education" },
      { name: ULPAN_TITLE.he, path: amharicUlpanPath() },
    ]);
    expect(jsonLd["@type"]).toBe("BreadcrumbList");
    expect(jsonLd.itemListElement).toHaveLength(3);
  });
});

describe("sources and messages", () => {
  it("cites the ministry circular that carries the bagrut entitlement", () => {
    expect(AMHARIC_HUB_SOURCES.map((s) => s.url)).toContain(
      "https://apps.education.gov.il/mankal/Horaa.aspx?siduri=340",
    );
  });

  it("gives every source an https URL and a name per locale", () => {
    for (const source of [...AMHARIC_HUB_SOURCES, ...ULPAN_SOURCES]) {
      expect(source.url).toMatch(/^https:\/\//);
      for (const loc of LOCALES) {
        expect(source.name[loc], `${source.url} name missing ${loc}`).toBeTruthy();
      }
    }
  });

  it("mirrors the education-index card labels into all three locales", () => {
    const dicts: Array<[string, Record<string, string>]> = [
      ["he", he],
      ["en", en],
      ["am", am],
    ];
    for (const key of [
      "education_amharic_title",
      "education_amharic_subtitle",
      "education_amharic_ulpan_title",
      "education_amharic_ulpan_subtitle",
    ]) {
      for (const [loc, dict] of dicts) {
        expect(dict[key], `${key} missing from messages/${loc}.json`).toBeTruthy();
      }
    }
  });
});
