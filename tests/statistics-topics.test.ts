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
} from "../app/lib/statistics/topics.server";
import {
  breadcrumbJsonLd,
  statTopicJsonLd,
} from "../app/lib/statistics/schema";

import { loader as landingLoader } from "../app/routes/$lang.statistics._index";
import { loader as topicLoader } from "../app/routes/$lang.statistics.$topic";

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
