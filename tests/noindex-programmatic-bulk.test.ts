// TED-187 — the 120 programmatic URLs that have nobody behind them.
//
// Two clusters are withdrawn from the index here. They are NOT deleted, 410'd
// or unlinked: every page still renders and still sits behind its hub. Only
// the invitation to index is withdrawn, and it is reversible by flipping these
// two conditions back.
//
//   * 30 anonymous professional slots (× 3 locales = 90 URLs). Each describes
//     a *type* of professional — "what to expect from a lawyer in Maale
//     Adumim" — and has nobody behind it until someone onboards. The other 5
//     slots name a real person who asked to be listed and stay indexed, which
//     is why the arithmetic is 90 and not 105.
//
//   * 10 careers success stories (× 3 locales = 30 URLs). TED-163 established
//     these are explicitly-labelled composite illustrations. That labelling is
//     correct and stays; what changes is that we stop offering a composite
//     illustration to a search engine as an answer about a real career. They
//     drew zero impressions in the six weeks to 8.11.2026.
//
// Most of this file asserts ABSENCE, which is the kind of test that passes for
// the wrong reason. So each cluster is checked from both sides: the thing that
// must be gone, and a sibling that must still be there. If someone drops the
// noindex, or re-adds the paths to a sitemap, or the slot data changes shape
// so that `listedProfessional` stops discriminating, one of these fails.

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

import { STORIES } from "../app/lib/careers/stories.server";
import { PROFESSIONALS } from "../app/lib/professionals/professionals.server";
import {
  loader as storyLoader,
  meta as storyMeta,
} from "../app/routes/$lang.careers.stories.$slug";
import {
  loader as profileLoader,
  meta as profileMeta,
} from "../app/routes/$lang.professionals.profile.$slug";
import { loader as careersSitemap } from "../app/routes/sitemap-careers[.]xml";
import { loader as contentSitemap } from "../app/routes/sitemap-content[.]xml";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyArgs = any;
const args = (params: Record<string, string>): AnyArgs => ({ params });

async function metaOf(
  loader: (a: AnyArgs) => unknown,
  meta: (a: AnyArgs) => unknown,
  params: Record<string, string>,
): Promise<any[]> {
  const data = await loader(args(params));
  return meta({ data } as AnyArgs) as any[];
}

function robotsOf(tags: any[]): string | undefined {
  return tags.find((t) => t && t.name === "robots")?.content;
}
function hreflangCount(tags: any[]): number {
  return tags.filter((t) => t && t.tagName === "link" && t.hrefLang).length;
}
// hreflangMeta() emits the self-canonical too, so skipping it drops both. That
// is the right pairing: Google treats noindex plus a canonical as conflicting
// instructions, and a page we are not asking to index needs no canonical.
function canonicalCount(tags: any[]): number {
  return tags.filter((t) => t && t.tagName === "link" && t.rel === "canonical").length;
}
function ldTypes(tags: any[]): string[] {
  return tags
    .filter((t) => t && t["script:ld+json"])
    .map((t) => t["script:ld+json"]["@type"] as string);
}

const ANON = PROFESSIONALS.filter((p) => !p.listedProfessional);
const LISTED = PROFESSIONALS.filter((p) => p.listedProfessional);

async function locs(loader: () => unknown): Promise<string[]> {
  const xml = await (loader() as Response).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1] ?? "");
}

describe("the slot data still discriminates (TED-187)", () => {
  // If this drifts, every other assertion in the file is measuring the wrong
  // set, so it is asserted up front rather than derived silently.
  it("has 30 anonymous slots and 5 with a real named professional", () => {
    expect(PROFESSIONALS).toHaveLength(35);
    expect(ANON).toHaveLength(30);
    expect(LISTED).toHaveLength(5);
  });

  it("ships 10 composite stories", () => {
    expect(STORIES).toHaveLength(10);
  });
});

describe("anonymous professional slots are withdrawn", () => {
  it("are noindex,follow — follow, so the rights and glossary links stay crawlable", async () => {
    const tags = await metaOf(profileLoader, profileMeta, {
      lang: "he",
      slug: ANON[0]!.slug,
    });
    expect(robotsOf(tags)).toBe("noindex,follow");
  });

  it("emit no hreflang and no canonical — both contradict a noindex", async () => {
    const tags = await metaOf(profileLoader, profileMeta, {
      lang: "he",
      slug: ANON[0]!.slug,
    });
    expect(hreflangCount(tags)).toBe(0);
    expect(canonicalCount(tags)).toBe(0);
  });

  it("emit no Person node — a Person claims a specific human exists", async () => {
    for (const slot of ANON.slice(0, 5)) {
      const tags = await metaOf(profileLoader, profileMeta, {
        lang: "he",
        slug: slot.slug,
      });
      expect(ldTypes(tags), slot.slug).not.toContain("Person");
    }
  });

  it("are absent from sitemap-content", async () => {
    const all = await locs(contentSitemap);
    const offenders = ANON.flatMap((s) =>
      all.filter((l) => l.endsWith(`/professionals/profile/${s.slug}`)),
    );
    expect(offenders).toEqual([]);
  });
});

describe("real listed professionals are NOT withdrawn", () => {
  // The other side of the guard. Without this block, deleting the whole
  // cluster would pass every test above.
  it("stay indexable, with hreflang", async () => {
    const tags = await metaOf(profileLoader, profileMeta, {
      lang: "he",
      slug: LISTED[0]!.slug,
    });
    expect(robotsOf(tags)).toBeUndefined();
    // he/en/am + x-default.
    expect(hreflangCount(tags)).toBe(4);
    expect(canonicalCount(tags)).toBe(1);
  });

  it("emit a Person node carrying the person's own name", async () => {
    const slot = LISTED[0]!;
    const tags = await metaOf(profileLoader, profileMeta, {
      lang: "he",
      slug: slot.slug,
    });
    expect(ldTypes(tags)).toContain("Person");
    const person = tags.find((t) => t && t["script:ld+json"]?.["@type"] === "Person")![
      "script:ld+json"
    ];
    expect(person.name).toBe(slot.listedProfessional!.name);
    // The old code fell back to `slot.title` when there was no person; that
    // fallback is what produced a Person for nobody.
    expect(person.name).not.toBe(slot.title);
  });

  it("are still submitted in sitemap-content, 5 slots × 3 locales", async () => {
    const all = await locs(contentSitemap);
    for (const slot of LISTED) {
      const mine = all.filter((l) => l.endsWith(`/professionals/profile/${slot.slug}`));
      expect(mine, slot.slug).toHaveLength(3);
    }
  });
});

describe("careers success stories are withdrawn", () => {
  it("are noindex,follow with no hreflang", async () => {
    const tags = await metaOf(storyLoader, storyMeta, {
      lang: "he",
      slug: STORIES[0]!.slug,
    });
    expect(robotsOf(tags)).toBe("noindex,follow");
    expect(hreflangCount(tags)).toBe(0);
  });

  it("are absent from sitemap-careers", async () => {
    const all = await locs(careersSitemap);
    const offenders = STORIES.flatMap((s) =>
      all.filter((l) => l.endsWith(`/careers/stories/${s.slug}`)),
    );
    expect(offenders).toEqual([]);
  });

  it("but the /careers/stories landing is still submitted — the pages stay reachable", async () => {
    const all = await locs(careersSitemap);
    const landing = all.filter((l) => /\/(he|en|am)\/careers\/stories$/.test(l));
    expect(landing).toHaveLength(3);
  });

  it("and the detail pages still render, so nothing was deleted", async () => {
    const data = (await storyLoader(args({ lang: "he", slug: STORIES[0]!.slug }))) as any;
    expect(data.story.slug).toBe(STORIES[0]!.slug);
    expect(data.html.length).toBeGreaterThan(200);
  });
});

describe("the TED-173 rule holds: a noindex page is never submitted", () => {
  it("no withdrawn path appears in either sitemap", async () => {
    const all = [...(await locs(contentSitemap)), ...(await locs(careersSitemap))];
    const withdrawn = [
      ...ANON.map((s) => `/professionals/profile/${s.slug}`),
      ...STORIES.map((s) => `/careers/stories/${s.slug}`),
    ];
    expect(withdrawn).toHaveLength(40);
    const offenders = all.filter((l) =>
      withdrawn.some((p) => new URL(l).pathname.replace(/^\/(he|en|am)/, "") === p),
    );
    expect(offenders).toEqual([]);
  });
});
