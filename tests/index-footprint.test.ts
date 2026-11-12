// ADR-025 — the total number of URLs this site asks Google to take seriously.
//
// `tests/sitemap-urls.test.ts` pins each sitemap separately, which catches a
// change that re-inflates one cluster. It does not show the aggregate, and the
// aggregate is the number this site got wrong: on 2026-08-30 a single wave of
// 136 files and +22,646 lines landed, and nobody had to look at what it did to
// the footprint, because no number anywhere described the footprint.
//
// This file is that number. It is deliberately one assertion with a large
// comment, rather than a clever rule, because the judgment it guards cannot be
// automated — see the last section of ADR-025. A machine can see how many URLs
// we submit. It cannot see whether anybody stands behind them. So the test's
// job is not to decide; it is to make the question unavoidable at the moment
// the count changes, by failing a build that nobody asked a question about.

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

import { loader as careersSitemap } from "../app/routes/sitemap-careers[.]xml";
import { loader as contentSitemap } from "../app/routes/sitemap-content[.]xml";
import { loader as coreSitemap } from "../app/routes/sitemap-core[.]xml";
import { loader as healthSitemap } from "../app/routes/sitemap-health[.]xml";
import { loader as newsSitemap } from "../app/routes/sitemap-news[.]xml";
import { loader as rightsSitemap } from "../app/routes/sitemap-rights[.]xml";

const SITEMAPS = [
  coreSitemap,
  rightsSitemap,
  careersSitemap,
  healthSitemap,
  contentSitemap,
  newsSitemap,
];

/**
 * The agreed submitted footprint, all locales, as of TED-187 phase 2.
 *
 * 1,992 before TED-187. 1,572 after. The 420 that left had, between them, a
 * measured 0 clicks in the six weeks to 8.11.2026.
 *
 * **Raising this number is the point of the test.** It is not a budget to be
 * topped up when a wave needs room. Before you raise it, ADR-025 asks one
 * question about the pages you are adding, and it is the only question:
 *
 *   Is there a named human, or a cited primary source, behind each one?
 *
 * If yes — a professional who onboarded, a kes with a phone number from the
 * register, a shop someone verified, a reported article — raise it, and say in
 * the commit who it is. That is what the site is for.
 *
 * If no, the pages can still ship. They just ship `noindex,follow` and stay
 * out of every sitemap, like the 420 withdrawn here, and this number does not
 * move. A page is allowed to exist without being submitted; that is the whole
 * distinction this change rests on.
 *
 * The ceiling carries 100 URLs (~33 paths) of headroom so that ordinary
 * additions — the next reported article, the next onboarded professional — do
 * not need a test edit to land. A change that needs more than that headroom is
 * a wave, and a wave should be a conversation.
 */
const SUBMITTED_URL_CEILING = 1672;
const SUBMITTED_URL_FLOOR = 1400;

describe("the submitted index footprint (ADR-025)", () => {
  it("stays under the agreed ceiling", async () => {
    let total = 0;
    const perSitemap: string[] = [];
    for (const loader of SITEMAPS) {
      const xml = await (loader() as Response).text();
      const n = [...xml.matchAll(/<loc>/g)].length;
      total += n;
      perSitemap.push(String(n));
    }

    expect(
      total,
      `Submitted ${total} URLs (per sitemap: ${perSitemap.join(", ")}), ceiling ` +
        `${SUBMITTED_URL_CEILING}. Read the comment above SUBMITTED_URL_CEILING ` +
        `before raising it: is there a named human or a cited source behind each ` +
        `page you are adding? If not, ship them noindex and leave this alone.`,
    ).toBeLessThanOrEqual(SUBMITTED_URL_CEILING);
  });

  // The other direction, so that this file keeps working as a description of
  // the site rather than as a one-way ratchet. A large *drop* means a sitemap
  // loader started throwing, or a registry came back empty, and silently
  // submitting almost nothing is its own outage.
  it("has not collapsed, which would mean a sitemap stopped working", async () => {
    let total = 0;
    for (const loader of SITEMAPS) {
      const xml = await (loader() as Response).text();
      total += [...xml.matchAll(/<loc>/g)].length;
    }
    expect(total).toBeGreaterThanOrEqual(SUBMITTED_URL_FLOOR);
  });

  it("submits every path in all three locales", async () => {
    for (const loader of SITEMAPS) {
      const xml = await (loader() as Response).text();
      const n = [...xml.matchAll(/<loc>/g)].length;
      expect(n % 3).toBe(0);
    }
  });
});
