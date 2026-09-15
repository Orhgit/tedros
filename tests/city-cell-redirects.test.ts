// TED-172 — the four zero-value city-matrix templates 301 to their pillar page.
//
// The duplication audit (docs/research/2026-09-14-programmatic-matrix-audit.md)
// measured these templates at 0–1.7 % corpus-unique content while 86 % of their
// impressions came from queries with no city name in them. Each route now carries
// its own `CITY_CELLS_ENABLED = false` flag, the TED-132 precedent from
// `$lang.careers.$track.$city.tsx`. This file pins the redirect contract for all
// three locales; `tests/sitemap-urls.test.ts` pins that the URLs are also gone
// from the sitemaps, because a URL must never be both 301'd and submitted.

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

import { CITIES } from "../app/lib/cities/registry";
import { PRIORITY_RIGHTS } from "../app/lib/db/seeds/rights";
import { SCHOLARSHIPS } from "../app/lib/education/scholarships.server";
import { SCHOLARSHIP_RELEVANCE_CITIES } from "../app/lib/education/scholarship-relevance";
import { relevantCities } from "../app/lib/rights/relevance";
import { LEGACY_SCHOLARSHIP_REDIRECTS } from "../app/lib/education/scholarships.server";
import { loader as rightsCellLoader } from "../app/routes/$lang.rights.$slug_.$city";
import { loader as rightsPillarLoader } from "../app/routes/$lang.rights.$slug";
import { loader as scholarshipCellLoader } from "../app/routes/$lang.education.scholarships.$slug_.$city";
import { loader as scholarshipPillarLoader } from "../app/routes/$lang.education.scholarships.$slug";
import { loader as eventPillarLoader } from "../app/routes/$lang.heritage.events.$event";
import { loader as supplierPillarLoader } from "../app/routes/$lang.heritage.wedding.suppliers.$category";

const LOCALES = ["he", "en", "am"] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

async function responseFrom(
  loader: (args: AnyArgs) => unknown,
  params: Record<string, string | undefined>,
): Promise<Response> {
  try {
    await loader(fakeArgs(params));
    throw new Error("loader did not throw");
  } catch (thrown) {
    return thrown as Response;
  }
}

describe("rights × city cells — 301 to the right page", () => {
  it("redirects every (right, city) pair the sitemap used to publish", async () => {
    let checked = 0;
    for (const right of PRIORITY_RIGHTS) {
      for (const city of relevantCities(right.slug.he, CITIES)) {
        const res = await responseFrom(rightsCellLoader, {
          lang: "he",
          slug: right.slug.he,
          city: city.slug,
        });
        expect(res.status).toBe(301);
        expect(res.headers.get("Location")).toBe(`/he/rights/${right.slug.he}`);
        checked += 1;
      }
    }
    // The audit counted 2,138 HE cells; anything in that order of magnitude
    // means we really did walk the whole matrix and not a handful of it.
    expect(checked).toBeGreaterThan(1000);
  });

  it("keeps the locale in the redirect target", async () => {
    for (const lang of LOCALES) {
      const res = await responseFrom(rightsCellLoader, {
        lang,
        slug: "mashkanta-guide-ethiopians",
        city: "tel-aviv",
      });
      expect(res.status).toBe(301);
      expect(res.headers.get("Location")).toBe(
        `/${lang}/rights/mashkanta-guide-ethiopians`,
      );
    }
  });

  it("redirects the list-scoped cells the audit named", async () => {
    // These pillars are already city-specific — `rights/urban-renewal-netanya`
    // is about Netanya — so the cell was a straight duplicate (0.762–0.822).
    const listScoped: Array<[string, string]> = [
      ["urban-renewal-kiryat-moshe", "rehovot"],
      ["urban-renewal-ramat-eliyahu", "rishon-lezion"],
      ["urban-renewal-netanya", "netanya"],
      ["tech-career-bootcamp", "tel-aviv"],
      ["tech-career-bootcamp", "beer-sheva"],
      ["tech-career-bootcamp", "haifa"],
      ["falash-mura-direct-absorption", "netanya"],
      ["falash-mura-direct-absorption", "rishon-lezion"],
      ["falash-mura-direct-absorption", "rehovot"],
      ["falash-mura-direct-absorption", "kiryat-malakhi"],
    ];
    expect(listScoped).toHaveLength(10);
    for (const [slug, city] of listScoped) {
      const res = await responseFrom(rightsCellLoader, { lang: "he", slug, city });
      expect(res.status).toBe(301);
      expect(res.headers.get("Location")).toBe(`/he/rights/${slug}`);
    }
  });

  it("redirects pairs that used to 404 on relevance, so no inbound link is lost", async () => {
    const res = await responseFrom(rightsCellLoader, {
      lang: "he",
      slug: "urban-renewal-netanya",
      city: "eilat",
    });
    expect(res.status).toBe(301);
    expect(res.headers.get("Location")).toBe("/he/rights/urban-renewal-netanya");
  });

  it("still 404s on an unknown right + missing params", async () => {
    await expect(
      rightsCellLoader(fakeArgs({ lang: "he", slug: "not-a-right", city: "tel-aviv" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
    await expect(
      rightsCellLoader(fakeArgs({ lang: "he", slug: undefined, city: undefined })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });
});

describe("scholarship × city cells — 301 to the scholarship page", () => {
  it("redirects every (scholarship, city) pair the sitemap used to publish", async () => {
    for (const scholarship of SCHOLARSHIPS) {
      for (const city of SCHOLARSHIP_RELEVANCE_CITIES) {
        const res = await responseFrom(scholarshipCellLoader, {
          lang: "he",
          slug: scholarship.slug,
          city,
        });
        expect(res.status).toBe(301);
        expect(res.headers.get("Location")).toBe(
          `/he/education/scholarships/${scholarship.slug}`,
        );
      }
    }
  });

  it("keeps the locale in the redirect target", async () => {
    const slug = SCHOLARSHIPS[0]!.slug;
    for (const lang of LOCALES) {
      const res = await responseFrom(scholarshipCellLoader, {
        lang,
        slug,
        city: SCHOLARSHIP_RELEVANCE_CITIES[0],
      });
      expect(res.status).toBe(301);
      expect(res.headers.get("Location")).toBe(`/${lang}/education/scholarships/${slug}`);
    }
  });

  it("still 404s on an unknown scholarship + missing params", async () => {
    await expect(
      scholarshipCellLoader(
        fakeArgs({ lang: "he", slug: "not-a-scholarship", city: "netanya" }),
      ),
    ).rejects.toMatchObject({ init: { status: 404 } });
    await expect(
      scholarshipCellLoader(fakeArgs({ lang: "he", slug: undefined, city: undefined })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });
});

describe("legacy scholarship slugs land on the canonical pillar in one hop", () => {
  it("resolves the TED-152 merges straight to the pillar, not to a second redirect", async () => {
    for (const [legacy, canonical] of Object.entries(LEGACY_SCHOLARSHIP_REDIRECTS)) {
      for (const lang of LOCALES) {
        const res = await responseFrom(scholarshipCellLoader, {
          lang,
          slug: legacy,
          city: "netanya",
        });
        expect(res.status).toBe(301);
        expect(res.headers.get("Location")).toBe(
          `/${lang}/education/scholarships/${canonical}`,
        );
      }
    }
  });
});

describe("the pillar pages the cells redirect to still render", () => {
  it("loads each redirect target in he, en and am", async () => {
    for (const lang of LOCALES) {
      const right = await rightsPillarLoader(
        fakeArgs({ lang, slug: "mashkanta-guide-ethiopians" }),
      );
      expect(right.html.length).toBeGreaterThan(200);

      const scholarship = await scholarshipPillarLoader(
        fakeArgs({ lang, slug: SCHOLARSHIPS[0]!.slug }),
      );
      expect(scholarship.html.length).toBeGreaterThan(100);

      const event = await eventPillarLoader(fakeArgs({ lang, event: "sigd" }));
      expect(event.html.length).toBeGreaterThan(200);

      const supplier = await supplierPillarLoader(
        fakeArgs({ lang, category: "catering" }),
      );
      expect(supplier.suppliers.length).toBeGreaterThan(0);
    }
  });

  it("no longer links out to the cells it used to chip-link", async () => {
    const right = await rightsPillarLoader(
      fakeArgs({ lang: "he", slug: "mashkanta-guide-ethiopians" }),
    );
    expect(right).not.toHaveProperty("cities");

    const event = await eventPillarLoader(fakeArgs({ lang: "he", event: "sigd" }));
    expect(event).not.toHaveProperty("cities");

    const supplier = await supplierPillarLoader(
      fakeArgs({ lang: "he", category: "catering" }),
    );
    expect(supplier).not.toHaveProperty("cities");
  });
});
