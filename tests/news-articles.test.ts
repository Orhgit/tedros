// Seed integrity + JSON-LD + loader tests for the News feed (RIN-425).

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

import { ALL_NEWS_TAGS, glyphForNewsTag, isNewsTag } from "../app/lib/news/categories";
import {
  ARTICLES,
  articleBody,
  articlesByPublishedDesc,
  articlesByTag,
  findArticle,
} from "../app/lib/news/articles.server";
import { breadcrumbJsonLd, newsArticleJsonLd } from "../app/lib/news/schema";

import { loader as landingLoader } from "../app/routes/$lang.news._index";
import { loader as detailLoader } from "../app/routes/$lang.news.$slug";
import { loader as tagLoader } from "../app/routes/$lang.news.tag.$tag";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

const ctx = { publicUrl: "https://tedros.co.il", locale: "he" as const };

describe("ARTICLES seed shape", () => {
  it("contains 40 articles", () => {
    expect(ARTICLES).toHaveLength(49);
  });

  it("every article has unique slug + HE/EN/AM body non-empty", () => {
    const slugs = ARTICLES.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const a of ARTICLES) {
      expect(a.bodies.he.length).toBeGreaterThan(100);
      expect(a.bodies.en.length).toBeGreaterThan(100);
      expect(a.bodies.am.length).toBeGreaterThan(40);
    }
  });

  it("every article has at least one valid tag", () => {
    for (const a of ARTICLES) {
      expect(a.tags.length).toBeGreaterThanOrEqual(1);
      for (const tg of a.tags) {
        expect(ALL_NEWS_TAGS.includes(tg)).toBe(true);
      }
    }
  });

  it("publishedAt + updatedAt are valid ISO dates", () => {
    for (const a of ARTICLES) {
      expect(a.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(a.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(a.updatedAt >= a.publishedAt).toBe(true);
    }
  });
});

describe("categories", () => {
  it("ALL_NEWS_TAGS contains 13 tags", () => {
    expect(ALL_NEWS_TAGS).toHaveLength(13);
  });

  it("isNewsTag narrows correctly", () => {
    expect(isNewsTag("announcement")).toBe(true);
    expect(isNewsTag("not-a-tag")).toBe(false);
  });

  it("every tag has a glyph", () => {
    for (const tg of ALL_NEWS_TAGS) {
      expect(glyphForNewsTag(tg)).toMatch(/.+/);
    }
  });
});

describe("lookup helpers", () => {
  it("articlesByPublishedDesc returns descending order", () => {
    const sorted = articlesByPublishedDesc();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1]!.publishedAt >= sorted[i]!.publishedAt).toBe(true);
    }
  });

  it("articlesByTag filters correctly", () => {
    const housingArticles = articlesByTag("housing");
    expect(housingArticles.length).toBeGreaterThan(0);
    for (const a of housingArticles) {
      expect(a.tags.includes("housing")).toBe(true);
    }
  });

  it("findArticle returns null on unknown slug", () => {
    expect(findArticle("nope")).toBeNull();
  });

  it("articleBody falls back to HE for unknown locales", () => {
    const a = ARTICLES[0]!;
    // @ts-expect-error — intentionally probe fallback
    expect(articleBody(a, "xx")).toBe(a.bodies.he);
  });
});

describe("JSON-LD generators", () => {
  it("newsArticleJsonLd emits @type=NewsArticle with required fields", () => {
    const a = ARTICLES[0]!;
    const out = newsArticleJsonLd(ctx, {
      slug: a.slug,
      headline: a.title.he,
      description: a.excerpt.he,
      datePublished: a.publishedAt,
      dateModified: a.updatedAt,
      tags: a.tags,
    });
    expect(out["@type"]).toBe("NewsArticle");
    expect(out["headline"]).toBe(a.title.he);
    expect(out["datePublished"]).toBe(a.publishedAt);
    expect(out["dateModified"]).toBe(a.updatedAt);
    expect(out["url"]).toBe(`https://tedros.co.il/he/news/${a.slug}`);
    expect(out["author"]).toBeDefined();
    expect(out["publisher"]).toBeDefined();
  });

  it("breadcrumbJsonLd emits 1-indexed positions", () => {
    const out = breadcrumbJsonLd(ctx, [
      { name: "Home", path: "/" },
      { name: "News", path: "/news" },
    ]);
    const items = out["itemListElement"] as Array<Record<string, unknown>>;
    expect(items[0]?.position).toBe(1);
    expect(items[1]?.position).toBe(2);
  });
});

describe("landing loader", () => {
  it("returns articles in HE/EN/AM with the expected count", async () => {
    for (const lang of ["he", "en", "am"]) {
      const data = await landingLoader(fakeArgs({ lang }));
      expect(data.articles).toHaveLength(49);
    }
  });

  it("articles arrive sorted descending by publishedAt", async () => {
    const data = await landingLoader(fakeArgs({ lang: "he" }));
    for (let i = 1; i < data.articles.length; i++) {
      expect(data.articles[i - 1]!.publishedAt >= data.articles[i]!.publishedAt).toBe(
        true,
      );
    }
  });
});

describe("detail loader", () => {
  it("loads every article in every locale", async () => {
    for (const a of ARTICLES) {
      for (const lang of ["he", "en", "am"]) {
        const data = await detailLoader(fakeArgs({ lang, slug: a.slug }));
        expect(data.article.slug).toBe(a.slug);
        expect(data.html.length).toBeGreaterThan(50);
      }
    }
  });

  it("returns up to 3 sibling articles excluding self", async () => {
    const data = await detailLoader(
      fakeArgs({ lang: "he", slug: "community-mortgage-2026-guide" }),
    );
    expect(data.siblings.length).toBeLessThanOrEqual(3);
    expect(
      data.siblings.find((s) => s.slug === "community-mortgage-2026-guide"),
    ).toBeUndefined();
  });

  it("404s on unknown slug + missing param", async () => {
    await expect(
      detailLoader(fakeArgs({ lang: "he", slug: "nope" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
    await expect(
      detailLoader(fakeArgs({ lang: "he", slug: undefined })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });
});

describe("by-tag loader", () => {
  it("loads housing tag with at least one article", async () => {
    const data = await tagLoader(fakeArgs({ lang: "he", tag: "housing" }));
    expect(data.tag).toBe("housing");
    expect(data.articles.length).toBeGreaterThanOrEqual(1);
  });

  it("404s on unknown tag", async () => {
    await expect(
      tagLoader(fakeArgs({ lang: "he", tag: "not-a-tag" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });

  it("404s on missing tag param", async () => {
    await expect(
      tagLoader(fakeArgs({ lang: "he", tag: undefined })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });
});
