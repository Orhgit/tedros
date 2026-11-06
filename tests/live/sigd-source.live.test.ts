// Does the organiser still say what we say they say? (TED-185)
//
// The 5787 failure was not that somebody wrote something false. It was that
// `SIGD_EVENTS_RECHECK` named three sweep dates and nothing on earth read
// them, so for five weeks the site told readers no Sigd event had been
// published while the organiser's own page carried the ceremony.
//
// `tests/sigd-season.test.ts` closes half of that: it fails when a sweep
// date has passed and the list is still empty. But it only runs when
// somebody opens a PR, and it cannot see the organiser's page at all — it
// would have stayed green through all of September if the list had been
// filled with something wrong.
//
// This file closes the other half. It fetches each listed event's own
// `sourceUrl` and checks that the page still carries the date and the start
// time we publish from it. It runs on a schedule, not on a PR, because a
// source host having a bad afternoon is not a reason to block a deploy.

import { describe, expect, it } from "vitest";

import { SIGD_EVENTS_2026, SIGD_5787_DATE } from "../../app/lib/heritage/sigd.server";

const UA = "tedros-source-watch (+https://tedros.co.il)";

async function fetchText(url: string): Promise<{ status: number; text: string }> {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  return { status: res.status, text: await res.text() };
}

/** Visible text: scripts and tags stripped, whitespace collapsed. */
function rendered(html: string): string {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");
  return stripped.replace(/\s+/g, " ");
}

/** `2026-11-09` as the organiser writes it: `09.11.2026`. */
function dottedDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

/** The same date one Hebrew year earlier, which is the trap on these hosts. */
function previousCycleYear(iso: string): string {
  return String(Number(iso.slice(0, 4)) - 1);
}

describe("every listed Sigd event still matches its source", () => {
  if (SIGD_EVENTS_2026.length === 0) {
    it("has nothing to check, which is itself worth saying out loud", () => {
      // Not a pass to be proud of. `tests/sigd-season.test.ts` decides
      // whether an empty list is acceptable today; this file only reports.
      expect(SIGD_EVENTS_2026).toEqual([]);
    });
  }

  for (const event of SIGD_EVENTS_2026) {
    describe(event.id, () => {
      it("serves the source page", async () => {
        const { status } = await fetchText(event.sourceUrl);
        expect(status, `${event.sourceUrl} returned ${status}`).toBe(200);
      });

      it("still carries the date we publish from it", async () => {
        const { text } = await fetchText(event.sourceUrl);
        const visible = rendered(text);
        const dotted = dottedDate(event.date);
        expect(
          visible.includes(dotted),
          `${event.sourceUrl} no longer states ${dotted}. Either the ` +
            `organiser changed the event or the page moved. Re-read it ` +
            `before the site keeps asserting this.`,
        ).toBe(true);
      });

      it("has not quietly become last cycle's event", async () => {
        // The 5786 assembly sits on the same host. A source page that
        // starts showing only the previous year's date is the exact way a
        // stale schedule gets published as a current one.
        const { text } = await fetchText(event.sourceUrl);
        const visible = rendered(text);
        const lastYear = previousCycleYear(event.date);
        if (visible.includes(`.${lastYear}`)) {
          expect(
            visible.includes(dottedDate(event.date)),
            `${event.sourceUrl} mentions ${lastYear} and no longer states ` +
              `${dottedDate(event.date)} — it may have reverted to the ` +
              `previous cycle's event.`,
          ).toBe(true);
        }
      });

      it("still carries the start time we publish, when we publish one", async () => {
        if (!event.startTime) return;
        const { text } = await fetchText(event.sourceUrl);
        const visible = rendered(text);
        expect(
          visible.includes(event.startTime),
          `${event.sourceUrl} no longer states ${event.startTime}. We are ` +
            `publishing a start time the organiser does not.`,
        ).toBe(true);
      });

      it("agrees with the holiday date the statute fixes", () => {
        // A source can be wrong. The Hebrew calendar is checked in
        // `tests/sigd-season.test.ts`; here we only refuse to list a 5787
        // event on a day that is not the 5787 holiday.
        if (event.date.startsWith("2026")) {
          expect(event.date).toBe(SIGD_5787_DATE);
        }
      });
    });
  }
});

describe("our own pages serve the event to readers", () => {
  const BASE = process.env.SITE_URL ?? "https://tedros.co.il";

  it("states the venue, and no longer says nothing was published", async () => {
    if (SIGD_EVENTS_2026.length === 0) return;
    const { status, text } = await fetchText(`${BASE}/he/heritage/sigd/events-2026`);
    expect(status).toBe(200);
    const visible = rendered(text);
    expect(visible).not.toContain("טרם פורסמו");
    expect(visible).toContain("טיילת שרובר");
  });

  it("links the organiser's own publication, not a write-up of it", async () => {
    if (SIGD_EVENTS_2026.length === 0) return;
    const { text } = await fetchText(`${BASE}/he/heritage/sigd/events-2026`);
    for (const event of SIGD_EVENTS_2026) {
      const host = new URL(event.sourceUrl).host;
      expect(text, `the page does not link ${host}`).toContain(host);
    }
  });
});
