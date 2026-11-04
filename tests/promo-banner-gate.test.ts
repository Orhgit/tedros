// TED-183 — the promo banner must never run above YMYL content.
//
// The gate existed since TED-121 but named three individual pages, so a
// "$150,000 seaside apartment" investment banner was serving above the public
// housing eligibility guide and every health condition page. A visitor reading
// about whether they qualify for subsidised housing is the last person who
// should be shown that ad, and it is exactly the kind of mismatch that costs a
// page its credibility.
//
// These assert whole sections rather than the URLs we happen to have today, so
// a new rights or health page is covered the day it ships.

import { describe, expect, it } from "vitest";
import { isSensitivePath } from "../app/components/sections/promo-banner";

describe("promo banner gate (TED-183)", () => {
  const MUST_BE_GATED = [
    // The pages that were actually serving the banner on 2026-11-04.
    "/he/rights/public-housing",
    "/he/health/conditions/vitamin-d-deficiency",
    "/he/education/scholarships/marom-che",
    // Section landings, not just pages beneath them.
    "/he/rights",
    "/he/health",
    "/he/education",
    "/he/family",
    // The original TED-121 cases must stay gated.
    "/he/family/domestic-violence",
    "/he/health/mental-health",
    "/he/voice/racism-report",
    // Every locale, not just Hebrew.
    "/en/rights/public-housing",
    "/am/health/conditions/vitamin-d-deficiency",
  ];

  it.each(MUST_BE_GATED)("hides the banner on %s", (path) => {
    expect(isSensitivePath(path)).toBe(true);
  });

  const MAY_SHOW = ["/he", "/he/news/sigd-2026-complete-guide", "/he/cities/netanya"];

  it.each(MAY_SHOW)("still allows the banner on %s", (path) => {
    expect(isSensitivePath(path)).toBe(false);
  });
});
