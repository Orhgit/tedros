import { describe, expect, it } from "vitest";

import { CAREER_TRACKS } from "../app/lib/careers/careers.server";
import {
  ALL_CAREER_TRACKS,
  glyphForCareerTrack,
  isCareerTrack,
} from "../app/lib/careers/categories";
import {
  allSlugReferences,
  bootcampPath,
  faqPath,
  internalLinkCount,
  jobPath,
  recommendedBootcampSlugs,
  relatedOrgSlugs,
  relatedProfessionSlugs,
  relatedRightSlugs,
  relatedTermSlugs,
  storyPath,
  trackCityPath,
  trackPath,
  tracksForBootcamp,
  tracksForOrg,
  tracksForRight,
} from "../app/lib/careers/links";
import { GLOSSARY } from "../app/lib/glossary/glossary.server";
import { ORGS } from "../app/lib/orgs/orgs.server";
import { ALL_PROFESSIONS } from "../app/lib/professionals/categories";
import { PRIORITY_RIGHTS } from "../app/lib/db/seeds/rights";

const RIGHT_SLUGS = new Set(PRIORITY_RIGHTS.map((r) => r.slug.he));
const ORG_SLUGS = new Set(ORGS.map((o) => o.slug));
const GLOSSARY_SLUGS = new Set(GLOSSARY.map((g) => g.slug));
const PROFESSION_SLUGS = new Set(ALL_PROFESSIONS as readonly string[]);

// Bootcamps planned in RIN-472 (Sub-3 — Wave 2). Until that ships we
// validate the careers seed only references slugs from this canonical
// list — anything else would be a typo.
const PLANNED_BOOTCAMPS = new Set([
  "enp-tech-career",
  "olim-beyahad-mentorship",
  "isef-excellence-employment",
  "hila-bagrut-tech",
  "itworks-israel",
  "codeoved",
  "scaleup-velocity",
  "presen",
  "career-counselors-network",
  "enp-teaching-fellowship",
  "madrasa-trades",
  "ta-employment-academy",
  "atidim-academic",
  "atidim-military",
  "place-il",
]);

describe("categories — every track is enumerable", () => {
  it("ALL_CAREER_TRACKS contains exactly 10 tracks", () => {
    expect(ALL_CAREER_TRACKS).toHaveLength(10);
  });

  it("isCareerTrack narrows correctly", () => {
    expect(isCareerTrack("tech")).toBe(true);
    expect(isCareerTrack("not-a-track")).toBe(false);
  });

  it("every track has a glyph", () => {
    for (const t of ALL_CAREER_TRACKS) {
      expect(glyphForCareerTrack(t)).toMatch(/.+/);
    }
  });
});

describe("seed coverage", () => {
  it("CAREER_TRACKS has one entry per slug in ALL_CAREER_TRACKS", () => {
    const seedSlugs = CAREER_TRACKS.map((t) => t.slug).sort();
    const expected = [...ALL_CAREER_TRACKS].sort();
    expect(seedSlugs).toEqual(expected);
  });

  it("priorities are unique 1..10", () => {
    const priorities = CAREER_TRACKS.map((t) => t.priority).sort((a, b) => a - b);
    expect(priorities).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("every track has HE, EN and AM bodies non-empty", () => {
    for (const t of CAREER_TRACKS) {
      expect(t.bodies.he.length).toBeGreaterThan(50);
      expect(t.bodies.en.length).toBeGreaterThan(50);
      expect(t.bodies.am.length).toBeGreaterThan(20);
    }
  });
});

describe("internal-link integrity — no dead refs", () => {
  it("every relatedRights slug exists in PRIORITY_RIGHTS", () => {
    for (const t of CAREER_TRACKS) {
      for (const slug of t.relatedRights) {
        expect(
          RIGHT_SLUGS.has(slug),
          `track=${t.slug} references missing right '${slug}'`,
        ).toBe(true);
      }
    }
  });

  it("every relatedOrgs slug exists in ORGS", () => {
    for (const t of CAREER_TRACKS) {
      for (const slug of t.relatedOrgs) {
        expect(
          ORG_SLUGS.has(slug),
          `track=${t.slug} references missing org '${slug}'`,
        ).toBe(true);
      }
    }
  });

  it("every relatedTerms slug exists in GLOSSARY", () => {
    for (const t of CAREER_TRACKS) {
      for (const slug of t.relatedTerms) {
        expect(
          GLOSSARY_SLUGS.has(slug),
          `track=${t.slug} references missing glossary term '${slug}'`,
        ).toBe(true);
      }
    }
  });

  it("every relatedProfessions slug is a real profession", () => {
    for (const t of CAREER_TRACKS) {
      for (const slug of t.relatedProfessions) {
        expect(
          PROFESSION_SLUGS.has(slug),
          `track=${t.slug} references missing profession '${slug}'`,
        ).toBe(true);
      }
    }
  });

  it("every recommendedBootcamps slug is on the RIN-472 plan", () => {
    for (const t of CAREER_TRACKS) {
      for (const slug of t.recommendedBootcamps) {
        expect(
          PLANNED_BOOTCAMPS.has(slug),
          `track=${t.slug} references off-plan bootcamp '${slug}'`,
        ).toBe(true);
      }
    }
  });
});

describe("per-track lookup helpers respect limits + parity with seed", () => {
  it("relatedRightSlugs caps at the requested limit", () => {
    expect(relatedRightSlugs("tech", 1).length).toBeLessThanOrEqual(1);
  });

  it("relatedOrgSlugs/relatedTermSlugs/recommendedBootcampSlugs return seed contents", () => {
    expect(relatedOrgSlugs("healthcare")).toContain("tene-briut");
    expect(relatedTermSlugs("law")).toContain("tebeka");
    expect(recommendedBootcampSlugs("tech")).toContain("enp-tech-career");
  });

  it("relatedProfessionSlugs respects limit (default 3)", () => {
    expect(relatedProfessionSlugs("public-sector").length).toBeLessThanOrEqual(3);
  });
});

describe("reverse lookups", () => {
  it("tracksForOrg('enp') returns tech + education + …", () => {
    const tracks = tracksForOrg("enp");
    expect(tracks).toContain("tech");
    expect(tracks).toContain("education");
  });

  it("tracksForBootcamp('enp-tech-career') returns the tech track", () => {
    expect(tracksForBootcamp("enp-tech-career")).toContain("tech");
  });

  it("tracksForRight('tebeka-legal-aid') surfaces law", () => {
    expect(tracksForRight("tebeka-legal-aid")).toContain("law");
  });
});

describe("path helpers", () => {
  it("trackPath/trackCityPath/bootcampPath/jobPath/storyPath/faqPath emit canonical paths", () => {
    expect(trackPath("tech")).toBe("/careers/tech");
    expect(trackCityPath("tech", "tel-aviv")).toBe("/careers/tech/tel-aviv");
    expect(bootcampPath("enp-tech-career")).toBe("/careers/programs/enp-tech-career");
    expect(jobPath("mentor-tech-career")).toBe("/careers/jobs/mentor-tech-career");
    expect(storyPath("daniel-tech-tel-aviv")).toBe(
      "/careers/stories/daniel-tech-tel-aviv",
    );
    expect(faqPath("how-to-start-tech")).toBe("/careers/faq/how-to-start-tech");
  });
});

describe("internalLinkCount + audit DoD", () => {
  it("every track has ≥3 internal links (Sub-2 DoD floor)", () => {
    for (const t of CAREER_TRACKS) {
      expect(internalLinkCount(t.slug)).toBeGreaterThanOrEqual(3);
    }
  });
});

describe("allSlugReferences integrity", () => {
  it("reports every (track, slug, kind) triple from the seed", () => {
    const refs = allSlugReferences();
    // Sanity: at least one ref per track.
    const seen = new Set(refs.map((r) => r.track));
    for (const t of CAREER_TRACKS) {
      expect(seen.has(t.slug)).toBe(true);
    }
  });

  it("kinds are limited to the documented set", () => {
    const refs = allSlugReferences();
    const allowed = new Set(["right", "org", "term", "bootcamp", "profession"]);
    for (const r of refs) {
      expect(allowed.has(r.kind)).toBe(true);
    }
  });
});
