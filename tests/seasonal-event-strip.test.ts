// TED-185 — the homepage strip, and the date window that governs it.
//
// The bug this guards is not "the strip does not appear". It is the opposite:
// a seasonal banner that outlives its season. That is the same class of
// mistake as a page saying no event has been published after one has, and
// this project has now made that mistake once.
//
// So the assertions below spend most of their effort on absence.

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
  SIGD_5787_DATE,
  SIGD_EVENTS_2026,
  SIGD_LEAD_DAYS,
  daysUntil,
  upcomingSigdEvent,
} from "../app/lib/heritage/sigd.server";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const args = (locale: string) => ({ params: { lang: locale } }) as any;

// Imported dynamically, not statically: the homepage route pulls in
// `submit.server` -> `db.server`, which validates the environment at module
// scope. A static import runs that during collection, before `beforeAll` has
// set the test environment, and the file fails to load at all.
async function homeLoader(a: ReturnType<typeof args>) {
  const mod = await import("../app/routes/$lang._index");
  return mod.loader(a);
}

function shift(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

describe("daysUntil", () => {
  it("is 0 on the day itself", () => {
    expect(daysUntil(SIGD_5787_DATE, SIGD_5787_DATE)).toBe(0);
  });

  it("counts whole days forward", () => {
    expect(daysUntil(shift(SIGD_5787_DATE, -1), SIGD_5787_DATE)).toBe(1);
    expect(daysUntil(shift(SIGD_5787_DATE, -21), SIGD_5787_DATE)).toBe(21);
  });

  it("goes negative once the date has passed", () => {
    expect(daysUntil(shift(SIGD_5787_DATE, 1), SIGD_5787_DATE)).toBe(-1);
  });
});

describe("the strip's date window opens and, above all, closes", () => {
  it("shows the assembly on the first day of the window", () => {
    const first = shift(SIGD_5787_DATE, -SIGD_LEAD_DAYS);
    expect(upcomingSigdEvent(first)?.date).toBe(SIGD_5787_DATE);
  });

  it("still shows it on the day of the event", () => {
    expect(upcomingSigdEvent(SIGD_5787_DATE)?.date).toBe(SIGD_5787_DATE);
  });

  it("is silent the day BEFORE the window opens", () => {
    const tooEarly = shift(SIGD_5787_DATE, -(SIGD_LEAD_DAYS + 1));
    expect(upcomingSigdEvent(tooEarly)).toBeUndefined();
  });

  it("is silent the day AFTER the event — it removes itself", () => {
    // The whole point. Nobody has to remember to take it down, because
    // nobody remembered to run three scheduled sweeps either.
    expect(upcomingSigdEvent(shift(SIGD_5787_DATE, 1))).toBeUndefined();
  });

  it("stays silent a year later", () => {
    expect(upcomingSigdEvent(shift(SIGD_5787_DATE, 365))).toBeUndefined();
  });

  it("picks the nearest event when several are in the window", () => {
    // Only meaningful once municipalities publish, but the ordering should
    // not be discovered then.
    if (SIGD_EVENTS_2026.length < 2) return;
    const first = shift(SIGD_5787_DATE, -SIGD_LEAD_DAYS);
    const dates = SIGD_EVENTS_2026.map((e) => e.date).sort();
    expect(upcomingSigdEvent(first)?.date).toBe(dates[0]);
  });
});

describe("the homepage loader", () => {
  it("supplies the strip payload in every locale while the event is near", async () => {
    // The loader reads the real clock, so this only asserts shape when the
    // window happens to be open, and asserts absence otherwise. Either way
    // it must not throw and must not half-populate.
    const today = new Date().toISOString().slice(0, 10);
    const expected = upcomingSigdEvent(today);

    for (const locale of ["he", "en", "am"] as const) {
      const data = await homeLoader(args(locale));
      if (!expected) {
        expect(data.seasonalEvent).toBeNull();
        continue;
      }
      const strip = data.seasonalEvent!;
      expect(strip.name.length).toBeGreaterThan(5);
      expect(strip.location.length).toBeGreaterThan(3);
      expect(strip.date.length).toBeGreaterThan(3);
      expect(strip.eyebrow.length).toBeGreaterThan(1);
      expect(strip.ctaLabel.length).toBeGreaterThan(1);
      expect(strip.countdown.length).toBeGreaterThan(1);
      // No un-substituted placeholder reaching a reader.
      expect(strip.countdown).not.toContain("{");
      // It must link the page that carries the source, not the article.
      expect(strip.href).toBe("/heritage/sigd/events-2026");
    }
  });

  it("links a path that resolves to a real route", async () => {
    const data = await homeLoader(args("he"));
    if (!data.seasonalEvent) return;
    const { loader: eventsLoader } =
      await import("../app/routes/$lang.heritage.sigd.events-2026");
    const page = await eventsLoader(args("he"));
    expect(page.path).toBe(data.seasonalEvent.href);
  });
});
