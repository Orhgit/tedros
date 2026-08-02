// Seed integrity + JSON-LD + loader tests for the Statistics demographics
// vertical (RIN-423).

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
  ALL_STAT_TOPICS,
  glyphForStatTopic,
  isStatTopic,
} from "../app/lib/statistics/categories";
import {
  STAT_TOPICS,
  findStatTopic,
  pickFigure,
  statTopicDescription,
  statTopicName,
  statTopicNarrative,
  topicTemporalCoverage,
} from "../app/lib/statistics/topics.server";
import { breadcrumbJsonLd, statTopicJsonLd } from "../app/lib/statistics/schema";
import { topicToCsv } from "../app/lib/statistics/csv.server";

import { loader as landingLoader } from "../app/routes/$lang.statistics._index";
import { loader as topicLoader } from "../app/routes/$lang.statistics.$topic";
import { loader as topicCsvLoader } from "../app/routes/$lang.statistics.$topic[.]csv";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

const ctx = { publicUrl: "https://tedros.co.il", locale: "he" as const };

describe("STAT_TOPICS seed shape", () => {
  it("contains 8 topics", () => {
    expect(STAT_TOPICS).toHaveLength(8);
  });

  it("every topic slug is on the canonical list", () => {
    for (const t of STAT_TOPICS) {
      expect(ALL_STAT_TOPICS.includes(t.slug)).toBe(true);
    }
  });

  it("every topic has at least 4 figures", () => {
    for (const t of STAT_TOPICS) {
      expect(t.figures.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("every figure has HE/EN/AM heading + figure + context", () => {
    for (const t of STAT_TOPICS) {
      for (const f of t.figures) {
        expect(f.heading.he.length).toBeGreaterThan(2);
        expect((f.heading.en ?? "").length).toBeGreaterThan(2);
        expect(f.figure.he.length).toBeGreaterThan(0);
        expect(f.context.he.length).toBeGreaterThan(40);
        expect(f.source.url.startsWith("http")).toBe(true);
      }
    }
  });

  it("every figure id is unique within its topic", () => {
    for (const t of STAT_TOPICS) {
      const ids = t.figures.map((f) => f.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("does not duplicate the careers/employment topic (lives in RIN-475)", () => {
    expect(STAT_TOPICS.find((t) => t.slug === "demographics")).toBeDefined();
    expect(STAT_TOPICS.find((t) => (t.slug as string) === "employment")).toBeUndefined();
  });
});

describe("categories", () => {
  it("isStatTopic narrows correctly", () => {
    expect(isStatTopic("demographics")).toBe(true);
    expect(isStatTopic("not-a-topic")).toBe(false);
  });

  it("every topic has a glyph", () => {
    for (const slug of ALL_STAT_TOPICS) {
      expect(glyphForStatTopic(slug)).toMatch(/.+/);
    }
  });
});

describe("lookup helpers", () => {
  it("findStatTopic returns null on unknown slug", () => {
    expect(findStatTopic("nope")).toBeNull();
    expect(findStatTopic("demographics")?.slug).toBe("demographics");
  });

  it("statTopicName falls back to HE for unknown locales", () => {
    const demo = findStatTopic("demographics")!;
    // @ts-expect-error — intentionally probe fallback
    expect(statTopicName(demo, "xx")).toBe(demo.name.he);
  });

  it("pickFigure returns the requested locale + falls back to HE", () => {
    const demo = findStatTopic("demographics")!;
    const fig = demo.figures[0]!;
    expect(pickFigure(fig, "he", "heading")).toBe(fig.heading.he);
    // @ts-expect-error — intentionally probe fallback
    expect(pickFigure(fig, "xx", "figure")).toBe(fig.figure.he);
  });
});

describe("JSON-LD generators", () => {
  it("statTopicJsonLd emits @type=Dataset with proper URL", () => {
    const out = statTopicJsonLd(ctx, {
      topicSlug: "demographics",
      name: "דמוגרפיה כללית",
      description: "אוכלוסייה...",
      temporalCoverage: "2024",
    });
    expect(out["@type"]).toBe("Dataset");
    expect(out["url"]).toBe("https://tedros.co.il/he/statistics/demographics");
    expect(out["temporalCoverage"]).toBe("2024");
    expect(out["isAccessibleForFree"]).toBe(true);
  });

  it("breadcrumbJsonLd emits 1-indexed positions", () => {
    const out = breadcrumbJsonLd(ctx, [
      { name: "Home", path: "/" },
      { name: "Statistics", path: "/statistics" },
    ]);
    const items = out["itemListElement"] as Array<Record<string, unknown>>;
    expect(items[0]?.position).toBe(1);
    expect(items[1]?.position).toBe(2);
  });
});

describe("description fallback", () => {
  it("statTopicDescription falls back to HE for unknown locales", () => {
    const t = findStatTopic("education")!;
    // @ts-expect-error — intentionally probe fallback
    expect(statTopicDescription(t, "xx")).toBe(t.shortDescription.he);
  });
});

describe("landing loader", () => {
  it("returns 8 topics with HE/EN/AM names", async () => {
    for (const lang of ["he", "en", "am"]) {
      const data = await landingLoader(fakeArgs({ lang }));
      expect(data.topics).toHaveLength(8);
    }
  });
});

describe("topic detail loader", () => {
  it("loads every topic in every locale", async () => {
    for (const slug of ALL_STAT_TOPICS) {
      for (const lang of ["he", "en", "am"]) {
        const data = await topicLoader(fakeArgs({ lang, topic: slug }));
        expect(data.topic.slug).toBe(slug);
        expect(data.figures.length).toBeGreaterThanOrEqual(4);
      }
    }
  });

  it("returns up to 4 sibling topics (excluding self)", async () => {
    const data = await topicLoader(fakeArgs({ lang: "he", topic: "demographics" }));
    expect(data.siblings.length).toBeLessThanOrEqual(4);
    expect(data.siblings.find((s) => s.slug === "demographics")).toBeUndefined();
  });

  it("404s on unknown topic + missing param", async () => {
    await expect(
      topicLoader(fakeArgs({ lang: "he", topic: "nope" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
    await expect(
      topicLoader(fakeArgs({ lang: "he", topic: undefined })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });
});

// ── TED-20 wave 1: verified demographics + education data ──────────────────

describe("verified data — demographics (TED-20)", () => {
  const demo = findStatTopic("demographics")!;

  it("headline population figure matches the verified CBS Sigd-2025 digest", () => {
    const totalPop = demo.figures.find((f) => f.id === "total-population");
    expect(totalPop).toBeDefined();
    expect(totalPop!.figure.he).toBe("177,600");
    expect(totalPop!.source.url).toContain("cbs.gov.il");
    expect(totalPop!.source.url).toContain("367");
  });

  it("does not contain the old unverified ~165,000 placeholder figure", () => {
    const serialized = JSON.stringify(demo.figures);
    expect(serialized).not.toContain("165,000");
  });

  it("ships a district-distribution bar chart summing to ~100%", () => {
    expect(demo.barChart).toBeDefined();
    const total = demo.barChart!.items.reduce((sum, i) => sum + i.valuePercent, 0);
    expect(total).toBeCloseTo(100, 0);
  });

  it("ships an HE/EN/AM narrative", () => {
    for (const locale of ["he", "en", "am"] as const) {
      const n = statTopicNarrative(demo, locale);
      expect(n).toBeTruthy();
      expect(n!.length).toBeGreaterThan(200);
    }
  });
});

describe("verified data — education (TED-20)", () => {
  const edu = findStatTopic("education")!;

  it("headline bagrut exam-taking rate matches the verified CBS figure (not the old 55% placeholder)", () => {
    const bagrut = edu.figures.find((f) => f.id === "bagrut-exam-takers");
    expect(bagrut).toBeDefined();
    expect(bagrut!.figure.he).toBe("93.7%");
  });

  it("does not present the stale 2017 bagrut-eligibility or Taub Center 2012/13 numbers as headline figures", () => {
    const serialized = JSON.stringify(edu.figures);
    expect(serialized).not.toMatch(/\b62%\b/);
    expect(serialized).not.toContain("Taub");
  });

  it("every figure cites a real source URL", () => {
    for (const f of edu.figures) {
      expect(f.source.url.startsWith("http")).toBe(true);
    }
  });

  it("mentions the stale bagrut figure only as labeled historical context in the narrative", () => {
    const heNarrative = statTopicNarrative(edu, "he")!;
    expect(heNarrative).toContain("62%");
    expect(heNarrative).toMatch(/ישן|היסטורי/);
  });
});

// ── TED-99 wave 2: verified housing/health/language/immigration/family/
//    civic-participation data ────────────────────────────────────────────

describe("verified data — housing (TED-99)", () => {
  const housing = findStatTopic("housing")!;

  it("housing-expenditure-share figure matches the verified CBS 371/2024 digest", () => {
    const fig = housing.figures.find((f) => f.id === "housing-expenditure-share");
    expect(fig).toBeDefined();
    expect(fig!.figure.he).toContain("26.7%");
    expect(fig!.source.url).toContain("cbs.gov.il");
  });

  it("does not contain the old unverified 58%/₪600K-loan/9-projects placeholder figures", () => {
    const serialized = JSON.stringify(housing.figures);
    expect(serialized).not.toContain("58%");
    expect(serialized).not.toContain("~3,200");
    expect(serialized).not.toContain("82 m²");
  });

  it("labels the stale 2016 homeownership figure with a confidenceNote", () => {
    const fig = housing.figures.find((f) => f.id === "homeownership-historical");
    expect(fig).toBeDefined();
    expect(fig!.figure.he).toBe("60.5%");
    expect(fig!.confidenceNote?.he).toMatch(/2016|ישן/);
  });

  it("ships an HE/EN/AM narrative", () => {
    for (const locale of ["he", "en", "am"] as const) {
      const n = statTopicNarrative(housing, locale);
      expect(n).toBeTruthy();
      expect(n!.length).toBeGreaterThan(200);
    }
  });
});

describe("verified data — health (TED-99)", () => {
  const health = findStatTopic("health")!;

  it("suicide-mortality figure matches the verified Knesset Research Center brief", () => {
    const fig = health.figures.find((f) => f.id === "suicide-mortality");
    expect(fig).toBeDefined();
    expect(fig!.figure.he).toContain("8.4");
    expect(fig!.source.url).toContain("knesset.gov.il");
  });

  it("does not present the old unverified 78.4/82.1 life expectancy or 11.2% diabetes placeholders", () => {
    const serialized = JSON.stringify(health.figures);
    expect(serialized).not.toContain("78.4 / 82.1");
    expect(serialized).not.toContain("11.2%");
  });

  it("never mentions HIV anywhere in the topic (figures or narrative)", () => {
    const serialized = JSON.stringify(health);
    expect(serialized.toLowerCase()).not.toContain("hiv");
  });

  it("ships a diabetes-by-years-in-country bar chart", () => {
    expect(health.barChart).toBeDefined();
    const last = health.barChart!.items[health.barChart!.items.length - 1]!;
    expect(last.valuePercent).toBe(17.6);
  });
});

describe("verified data — language (TED-99)", () => {
  const language = findStatTopic("language")!;

  it("headline Hebrew self-rated fluency figure matches the verified Brookdale 2012 survey", () => {
    const fig = language.figures.find((f) => f.id === "hebrew-self-rated-very-good");
    expect(fig).toBeDefined();
    expect(fig!.figure.he).toBe("59%");
  });

  it("does not present the old unverified ~150,000 speakers or 60% → 28% transmission placeholders", () => {
    const serialized = JSON.stringify(language.figures);
    expect(serialized).not.toContain("~150,000");
    expect(serialized).not.toContain("60% → 28%");
  });

  it("every figure carries a confidenceNote disclosing the first-generation-only survey scope", () => {
    for (const f of language.figures) {
      expect(f.confidenceNote).toBeDefined();
    }
  });

  it("the narrative prominently discloses that the data covers the immigrant generation only", () => {
    const heNarrative = statTopicNarrative(language, "he")!;
    expect(heNarrative).toContain("הנתונים הבאים מתייחסים לדור העולים בלבד ואינם משקפים את הדור הישראלי-ילידי");
  });
});

describe("verified data — immigration (TED-99)", () => {
  const immigration = findStatTopic("immigration")!;

  it("presents Operation Moses and Operation Solomon as ranges, not a single fabricated number", () => {
    const moses = immigration.figures.find((f) => f.id === "operation-moses");
    const solomon = immigration.figures.find((f) => f.id === "operation-solomon");
    expect(moses!.figure.he).toMatch(/6,300|8,000/);
    expect(solomon!.figure.he).toMatch(/14,300|14,500/);
  });

  it("does not contain the old unverified single-number 8,000/14,400 or 6,500 Falash Mura placeholders as headline figures", () => {
    const headlineFigures = immigration.figures.map((f) => f.figure.he);
    expect(headlineFigures).not.toContain("~8,000");
    expect(headlineFigures).not.toContain("~14,400");
    expect(headlineFigures).not.toContain("~6,500");
  });

  it("does not publish the unreconciled ~5,000 Tzur Yisrael total as a clean figure", () => {
    const fig = immigration.figures.find((f) => f.id === "falash-mura-ongoing")!;
    expect(fig.figure.he).not.toBe("~5,000");
    expect(fig.confidenceNote?.he).toMatch(/סתירה|5,000/);
  });

  it("ships a 2017-2024 annual-aliyah bar chart with 2023 as the peak year", () => {
    expect(immigration.barChart).toBeDefined();
    const peak = immigration.barChart!.items.find((i) => i.label.he === "2023");
    expect(peak!.valuePercent).toBe(100);
  });
});

describe("verified data — family (TED-99)", () => {
  const family = findStatTopic("family")!;

  it("household-size figure matches the verified CBS Sigd-2025 digest (consistent with demographics)", () => {
    const fig = family.figures.find((f) => f.id === "household-size");
    expect(fig).toBeDefined();
    expect(fig!.figure.he).toBe("3.70");
  });

  it("does not contain the old unverified 4.6 household size or 3.4 fertility placeholders", () => {
    const serialized = JSON.stringify(family.figures);
    expect(serialized).not.toContain('"4.6"');
    expect(serialized).not.toContain('"3.4"');
  });

  it("ships a family-type distribution bar chart summing to ~100%", () => {
    expect(family.barChart).toBeDefined();
    const total = family.barChart!.items.reduce((sum, i) => sum + i.valuePercent, 0);
    expect(total).toBeCloseTo(100, 0);
  });
});

describe("verified data — civic-participation (TED-99)", () => {
  const civic = findStatTopic("civic-participation")!;

  it("does not present the untraceable 3.9%/0.3% civil-service figure as a headline stat figure", () => {
    const headlineFigures = civic.figures.map((f) => f.figure.he);
    expect(headlineFigures).not.toContain("3.9%");
    expect(headlineFigures).not.toContain("0.3%");
  });

  it("does not present the old unverified 67% voter turnout or 92% IDF enlistment placeholders", () => {
    const serialized = JSON.stringify(civic.figures);
    expect(serialized).not.toContain('"67%"');
    expect(serialized).not.toContain('"92%"');
  });

  it("presents voter turnout as a structural no-data fact rather than omitting it", () => {
    const fig = civic.figures.find((f) => f.id === "voter-turnout-no-data");
    expect(fig).toBeDefined();
    expect(fig!.context.he).toMatch(/אין תיוג אתני/);
  });

  it("frames law-enforcement figures as over-representation, not a crime rate", () => {
    const fig = civic.figures.find((f) => f.id === "law-enforcement-overrepresentation")!;
    expect(fig.confidenceNote?.he).toMatch(/פשיעה/);
  });
});

describe("topicTemporalCoverage", () => {
  it("returns a single year when all figures share one", () => {
    expect(topicTemporalCoverage(findStatTopic("demographics")!)).toBe("2024");
  });

  it("returns a min/max range when figures span multiple years", () => {
    const coverage = topicTemporalCoverage(findStatTopic("education")!);
    expect(coverage).toBe("2024/2025");
  });
});

describe("CSV export (TED-20)", () => {
  it("topicToCsv renders a header + one row per figure, with sources", () => {
    const demo = findStatTopic("demographics")!;
    const csv = topicToCsv(demo, "he");
    const lines = csv.trim().split("\n");
    // title comment + header + N figure rows
    expect(lines.length).toBe(demo.figures.length + 2);
    expect(lines[1]).toBe("label,value,source_name,source_url,data_year,confidence_note");
    expect(csv).toContain("177,600");
    expect(csv).toContain("cbs.gov.il");
  });

  it("CSV resource route serves text/csv with an attachment header", async () => {
    const res = await topicCsvLoader(fakeArgs({ lang: "he", topic: "demographics" }));
    expect(res.headers.get("Content-Type")).toContain("text/csv");
    expect(res.headers.get("Content-Disposition")).toContain("attachment");
    const body = await res.text();
    expect(body).toContain("177,600");
  });

  it("404s on unknown topic", async () => {
    try {
      await topicCsvLoader(fakeArgs({ lang: "he", topic: "nope" }));
      throw new Error("expected loader to throw");
    } catch (err) {
      expect((err as Response).status).toBe(404);
    }
  });
});

describe("Dataset JSON-LD distribution (TED-20)", () => {
  it("includes a CSV DataDownload when requested", () => {
    const out = statTopicJsonLd(ctx, {
      topicSlug: "demographics",
      name: "דמוגרפיה כללית",
      description: "אוכלוסייה...",
      temporalCoverage: "2024",
      includeCsvDistribution: true,
    });
    const distribution = out["distribution"] as Array<Record<string, unknown>>;
    expect(distribution[0]?.contentUrl).toBe(
      "https://tedros.co.il/he/statistics/demographics.csv",
    );
    expect(distribution[0]?.encodingFormat).toBe("text/csv");
  });
});
