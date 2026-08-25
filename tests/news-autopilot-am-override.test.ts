// AM urgent-override rate-limit tests (TED-114 / ADR-019 §4, Amendment 2).
//
// Covers the rolling-7-day "~2/week" hard cap: under the limit is allowed,
// exactly at the limit is locked, and timestamps outside the 7-day window
// don't count toward it. Also covers `amOverrideResetAt`'s "when it resets"
// value used by the admin UI's lockout message.

import { describe, expect, it } from "vitest";
import {
  AM_OVERRIDE_WEEKLY_LIMIT,
  AM_OVERRIDE_WINDOW_MS,
  amOverrideResetAt,
  isAmOverrideAllowed,
} from "../app/lib/news/autopilot/am-override";

const NOW = new Date("2026-08-24T12:00:00.000Z");

function daysAgo(days: number): Date {
  return new Date(NOW.getTime() - days * 24 * 60 * 60 * 1000);
}

describe("isAmOverrideAllowed", () => {
  it("allows an override with zero prior overrides in the window", () => {
    expect(isAmOverrideAllowed([], NOW)).toBe(true);
  });

  it("allows an override with one prior override in the window (under the limit)", () => {
    expect(isAmOverrideAllowed([daysAgo(1)], NOW)).toBe(true);
  });

  it("hard-blocks at exactly the weekly limit (2)", () => {
    expect(AM_OVERRIDE_WEEKLY_LIMIT).toBe(2);
    expect(isAmOverrideAllowed([daysAgo(1), daysAgo(3)], NOW)).toBe(false);
  });

  it("blocks past the weekly limit too", () => {
    expect(isAmOverrideAllowed([daysAgo(1), daysAgo(2), daysAgo(3)], NOW)).toBe(false);
  });

  it("does not count timestamps outside the 7-day window", () => {
    // Both older than 7 days — window should be empty, so allowed.
    expect(isAmOverrideAllowed([daysAgo(8), daysAgo(10)], NOW)).toBe(true);
  });

  it("counts a timestamp exactly at the 7-day boundary as still in-window", () => {
    const exactlySevenDaysAgo = new Date(NOW.getTime() - AM_OVERRIDE_WINDOW_MS);
    expect(isAmOverrideAllowed([exactlySevenDaysAgo, daysAgo(1)], NOW)).toBe(false);
  });

  it("mixes in-window and out-of-window timestamps correctly", () => {
    // One in-window (day 2), one out-of-window (day 9) -> only 1 counts -> allowed.
    expect(isAmOverrideAllowed([daysAgo(2), daysAgo(9)], NOW)).toBe(true);
  });
});

describe("amOverrideResetAt", () => {
  it("returns null when under the limit", () => {
    expect(amOverrideResetAt([daysAgo(1)], NOW)).toBeNull();
  });

  it("returns the oldest in-window override's timestamp + window length when at the limit", () => {
    const oldest = daysAgo(3);
    const reset = amOverrideResetAt([daysAgo(1), oldest], NOW);
    expect(reset).toEqual(new Date(oldest.getTime() + AM_OVERRIDE_WINDOW_MS));
  });

  it("ignores out-of-window timestamps when computing the reset time", () => {
    // Only one in-window override -> under the limit -> null, even though a
    // stale out-of-window timestamp is also present.
    expect(amOverrideResetAt([daysAgo(1), daysAgo(9)], NOW)).toBeNull();
  });
});
