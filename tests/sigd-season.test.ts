// TED-169 — the Sigd season pages, and the date that keeps going wrong.
//
// The reason this file exists: 19.11.2026 shipped to production in three
// places and was found by a reader, not by CI. A date is checkable, so it is
// checked here rather than trusted — every assertion below re-derives the
// date from the Hebrew calendar instead of comparing it to another constant
// in the repo, which is how the wrong date stayed consistent with itself.

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

import { findHeritageEvent } from "../app/lib/heritage/events.server";
import {
  eventPath,
  sigdEventsPath,
  sigdGuestsPath,
  sigdSchoolsPath,
} from "../app/lib/heritage/links";
import {
  SIGD_5787_DATE,
  SIGD_5787_HEBREW_DATE,
  SIGD_EVENTS_2026,
  SIGD_EVENTS_PAGE,
  SIGD_GUESTS_PAGE,
  SIGD_SCHOOLS_PAGE,
  sigdPageBody,
} from "../app/lib/heritage/sigd.server";

import { loader as eventsLoader } from "../app/routes/$lang.heritage.sigd.events-2026";
import { loader as guestsLoader } from "../app/routes/$lang.heritage.sigd.guests";
import { loader as schoolsLoader } from "../app/routes/$lang.heritage.sigd.schools";
import { loader as indexLoader } from "../app/routes/$lang.heritage.sigd._index";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
const args = (lang: string): AnyArgs => ({ params: { lang } });

const LOCALES = ["he", "en", "am"] as const;
const PAGES = [SIGD_EVENTS_PAGE, SIGD_SCHOOLS_PAGE, SIGD_GUESTS_PAGE];

/** ICU's Hebrew calendar, used as an authority independent of this repo. */
const hebrew = new Intl.DateTimeFormat("en-u-ca-hebrew", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function hebrewDateOf(iso: string): string {
  return hebrew.format(new Date(`${iso}T00:00:00Z`));
}

function weekdayOf(iso: string): number {
  return new Date(`${iso}T00:00:00Z`).getUTCDay();
}

describe("Sigd 5787 — the date, derived rather than copied", () => {
  it("is 29 Cheshvan 5787 on the Hebrew calendar", () => {
    expect(hebrewDateOf(SIGD_5787_DATE)).toBe("29 Heshvan 5787");
  });

  it("is a Monday, 9 November 2026", () => {
    expect(SIGD_5787_DATE).toBe("2026-11-09");
    expect(weekdayOf(SIGD_5787_DATE)).toBe(1);
  });

  it("is the fiftieth day counting Yom Kippur 5787 as day one", () => {
    const yomKippur = "2026-09-21";
    expect(hebrewDateOf(yomKippur)).toBe("10 Tishri 5787");
    const elapsed =
      (Date.parse(`${SIGD_5787_DATE}T00:00:00Z`) - Date.parse(`${yomKippur}T00:00:00Z`)) /
      86_400_000;
    // 49 elapsed days = the 50th day inclusive. Both phrasings appear in the
    // copy and they have to stay consistent with each other.
    expect(elapsed).toBe(49);
  });

  it("is not 19.11.2026 — the retired date, which is 9 Kislev", () => {
    expect(hebrewDateOf("2026-11-19")).toBe("9 Kislev 5787");
    expect(SIGD_5787_DATE).not.toBe("2026-11-19");
  });

  it("agrees with the heritage event registry's next observance", () => {
    const sigd = findHeritageEvent("sigd");
    expect(sigd?.upcomingDates[0]).toBe(SIGD_5787_DATE);
  });

  it("states the Hebrew date the statute uses", () => {
    expect(SIGD_5787_HEBREW_DATE).toContain('כ"ט בחשוון');
  });
});

describe("the observance dates apply s.1(a)'s Shabbat rule", () => {
  it("keeps 5788 on 29 Cheshvan, which is not a Shabbat", () => {
    const sigd = findHeritageEvent("sigd");
    const d = sigd!.upcomingDates[1] as string;
    expect(hebrewDateOf(d)).toBe("29 Heshvan 5788");
    expect(weekdayOf(d)).not.toBe(6);
  });

  it("moves 5789 to the Thursday before, because 29 Cheshvan is a Shabbat", () => {
    const sigd = findHeritageEvent("sigd");
    const d = sigd!.upcomingDates[2] as string;
    // The calendar date itself is Saturday 18.11.2028 …
    expect(hebrewDateOf("2028-11-18")).toBe("29 Heshvan 5789");
    expect(weekdayOf("2028-11-18")).toBe(6);
    // … so the statute moves the observance to Thursday the 16th.
    expect(d).toBe("2028-11-16");
    expect(weekdayOf(d)).toBe(4);
  });
});

describe("the verified-events bar (ADR-021)", () => {
  it("lists no event without the organiser's own source and a check date", () => {
    for (const e of SIGD_EVENTS_2026) {
      expect(e.sourceUrl, `${e.id} has no sourceUrl`).toMatch(/^https:\/\//);
      expect(e.verifiedOn, `${e.id} has no verifiedOn`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(e.date, `${e.id} has a malformed date`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      for (const locale of LOCALES) {
        expect(e.name[locale], `${e.id} missing ${locale} name`).toBeTruthy();
      }
    }
  });

  it("never sources an event from this site's own indexed pages", () => {
    // A deleted fabrication stays in Google's index and comes back as a
    // search result. It is not a source.
    for (const e of SIGD_EVENTS_2026) {
      expect(e.sourceUrl).not.toContain("tedros.co.il");
    }
  });
});

describe("the season bodies state no unsourced logistics", () => {
  const allBodies = PAGES.flatMap((p) => LOCALES.map((l) => sigdPageBody(p, l)));

  it("prints no clock time anywhere", () => {
    // Every clock time this site ever published for Sigd was invented.
    for (const body of allBodies) {
      const times = body.match(/\b\d{1,2}:\d{2}\b/g) ?? [];
      expect(times).toEqual([]);
    }
  });

  it("does not resurrect the subsidised-bus or attendance claims", () => {
    // Same exemption ADR-021's `allowNear` takes: corrected copy sometimes has
    // to name a false claim in order to warn readers off it, so a claim is
    // only a violation when its own paragraph does not debunk it.
    const RETIRED =
      /הסעות (מסובסדות|מאורגנות)|16 ערי קליטה|~?5,000 (משתתפים|attendees)|subsidised buses|absorption cities/;
    const DEBUNK =
      /שום מקור|לא נשענה|לא נשענו|נמחק|הומצא|המציא|no source|deleted|invented/;
    for (const body of allBodies) {
      for (const para of body.split(/\n\n+/)) {
        if (RETIRED.test(para)) {
          expect(
            DEBUNK.test(para),
            `undebunked retired claim: ${para.slice(0, 90)}`,
          ).toBe(true);
        }
      }
    }
  });

  it("carries a source line in every locale of every page", () => {
    for (const page of PAGES) {
      for (const locale of LOCALES) {
        expect(sigdPageBody(page, locale)).toContain("fs.knesset.gov.il");
      }
    }
  });
});

describe("Sigd season routes", () => {
  it("renders all three pages in all three locales", async () => {
    for (const [loader, path] of [
      [eventsLoader, sigdEventsPath()],
      [schoolsLoader, sigdSchoolsPath()],
      [guestsLoader, sigdGuestsPath()],
    ] as const) {
      for (const locale of LOCALES) {
        const data = await loader(args(locale));
        expect(data.locale).toBe(locale);
        expect(data.path).toBe(path);
        expect(data.title.length).toBeGreaterThan(10);
        expect(data.html).toContain("<h2");
        expect(data.related.length).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it("emits Article + BreadcrumbList JSON-LD", async () => {
    const data = await eventsLoader(args("he"));
    expect(data.article["@type"]).toBe("Article");
    expect(data.breadcrumb["@type"]).toBe("BreadcrumbList");
    const crumbs = data.breadcrumb["itemListElement"] as Array<{ item: string }>;
    expect(crumbs).toHaveLength(4);
    expect(crumbs[3]!.item).toBe(`https://tedros.co.il/he${sigdEventsPath()}`);
  });

  it("shows the honest empty state while no event is verified", async () => {
    const data = await eventsLoader(args("he"));
    expect(data.events).toEqual([]);
    expect(data.emptyHeading).toBeTruthy();
    expect(data.emptyBody).toBeTruthy();
  });

  it("301s /heritage/sigd to the guide rather than serving a second hub", async () => {
    for (const locale of LOCALES) {
      await expect(indexLoader(args(locale))).rejects.toMatchObject({
        status: 301,
      });
      const thrown = await indexLoader(args(locale)).catch((r: Response) => r);
      expect((thrown as Response).headers.get("location")).toBe(
        `/${locale}${eventPath("sigd")}`,
      );
    }
  });
});
