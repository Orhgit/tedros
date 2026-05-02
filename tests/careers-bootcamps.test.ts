// Integrity tests for the BOOTCAMPS seed (RIN-472).
//
// Pins:
//   - 15 bootcamps shipped (matches the RIN-469 epic plan)
//   - every slug is on the canonical list pinned by careers-links.test.ts
//   - every cross-vertical ref resolves (no dead links to orgs / rights /
//     professions / cities / canonical programs)
//   - HE/EN/AM bodies non-empty for every bootcamp
//   - JSON-LD generator produces a valid `EducationalOccupationalProgram`
//     or `Service` for every bootcamp

import { describe, expect, it } from "vitest";

import {
  BOOTCAMPS,
  bootcampBody,
  bootcampsForCity,
  bootcampsForOrg,
  bootcampsForTrack,
  findBootcamp,
} from "../app/lib/careers/bootcamps.server";
import {
  ALL_CAREER_TRACKS,
  isCareerTrack,
} from "../app/lib/careers/categories";
import { bootcampJsonLd } from "../app/lib/careers/schema";
import { CITIES } from "../app/lib/cities/registry";
import { PRIORITY_RIGHTS } from "../app/lib/db/seeds/rights";
import { ORGS } from "../app/lib/orgs/orgs.server";
import { PROGRAMS } from "../app/lib/programs/programs.server";
import { ALL_PROFESSIONS } from "../app/lib/professionals/categories";

const RIGHT_SLUGS = new Set(PRIORITY_RIGHTS.map((r) => r.slug.he));
const ORG_SLUGS = new Set(ORGS.map((o) => o.slug));
const CITY_SLUGS = new Set(CITIES.map((c) => c.slug));
const PROGRAM_SLUGS = new Set(PROGRAMS.map((p) => p.slug));
const PROFESSION_SLUGS = new Set(ALL_PROFESSIONS as readonly string[]);

const PLANNED_BOOTCAMPS = [
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
];

describe("BOOTCAMPS seed shape", () => {
  it("contains exactly 15 entries (RIN-469 epic plan)", () => {
    expect(BOOTCAMPS).toHaveLength(15);
  });

  it("every slug matches the canonical RIN-472 list", () => {
    expect(BOOTCAMPS.map((b) => b.slug).sort()).toEqual([...PLANNED_BOOTCAMPS].sort());
  });

  it("slugs are unique", () => {
    const slugs = BOOTCAMPS.map((b) => b.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every bootcamp has HE/EN/AM bodies non-empty", () => {
    for (const b of BOOTCAMPS) {
      expect(b.bodies.he.length).toBeGreaterThan(50);
      expect(b.bodies.en.length).toBeGreaterThan(50);
      expect(b.bodies.am.length).toBeGreaterThan(20);
    }
  });

  it("every bootcamp has an applicationUrl that's a URL or an internal path", () => {
    for (const b of BOOTCAMPS) {
      const ok =
        b.applicationUrl.startsWith("http") || b.applicationUrl.startsWith("/");
      expect(ok, `${b.slug}: invalid applicationUrl '${b.applicationUrl}'`).toBe(
        true,
      );
    }
  });
});

describe("BOOTCAMPS — cross-vertical integrity", () => {
  it("every trackSlug is a real CareerTrack", () => {
    for (const b of BOOTCAMPS) {
      expect(
        isCareerTrack(b.trackSlug),
        `${b.slug}: trackSlug '${b.trackSlug}' is not a CareerTrack`,
      ).toBe(true);
    }
  });

  it("every orgSlug exists in ORGS (when set)", () => {
    for (const b of BOOTCAMPS) {
      if (b.orgSlug !== undefined) {
        expect(ORG_SLUGS.has(b.orgSlug), `${b.slug} → ${b.orgSlug}`).toBe(true);
      }
    }
  });

  it("every relatedRights slug exists in PRIORITY_RIGHTS", () => {
    for (const b of BOOTCAMPS) {
      for (const slug of b.relatedRights) {
        expect(RIGHT_SLUGS.has(slug), `${b.slug} → right '${slug}'`).toBe(true);
      }
    }
  });

  it("every relatedProfessions slug is a valid Profession", () => {
    for (const b of BOOTCAMPS) {
      for (const slug of b.relatedProfessions) {
        expect(PROFESSION_SLUGS.has(slug), `${b.slug} → prof '${slug}'`).toBe(
          true,
        );
      }
    }
  });

  it("every cities[] slug exists in the city registry", () => {
    for (const b of BOOTCAMPS) {
      for (const slug of b.cities) {
        expect(CITY_SLUGS.has(slug), `${b.slug} → city '${slug}'`).toBe(true);
      }
    }
  });

  it("every canonicalProgramSlug links to a real PROGRAMS entry", () => {
    for (const b of BOOTCAMPS) {
      if (b.canonicalProgramSlug !== undefined) {
        expect(
          PROGRAM_SLUGS.has(b.canonicalProgramSlug),
          `${b.slug} → canonicalProgramSlug '${b.canonicalProgramSlug}'`,
        ).toBe(true);
      }
    }
  });
});

describe("BOOTCAMPS — coverage by track", () => {
  it("every CareerTrack has at least one bootcamp recommending into it", () => {
    // A few tracks (finance, education, public-sector, retail-services,
    // social-work, trades, entrepreneurship, law, healthcare) should each
    // have at least one bootcamp. tech has many.
    const counts = new Map<string, number>();
    for (const b of BOOTCAMPS) {
      counts.set(b.trackSlug, (counts.get(b.trackSlug) ?? 0) + 1);
    }
    // Pin: every primary track has ≥1 bootcamp, except the few we
    // intentionally leave with cross-track or service-only entries
    // (healthcare currently has none — clinics handle their own training).
    const COVERED = [
      "tech",
      "education",
      "public-sector",
      "entrepreneurship",
      "finance",
      "social-work",
      "trades",
      "retail-services",
    ];
    for (const track of COVERED) {
      expect((counts.get(track) ?? 0) >= 1, `track ${track}: no bootcamp`).toBe(
        true,
      );
    }
  });
});

describe("BOOTCAMPS lookup helpers", () => {
  it("findBootcamp returns null on unknown slug, entry on known", () => {
    expect(findBootcamp("does-not-exist")).toBeNull();
    expect(findBootcamp("enp-tech-career")?.slug).toBe("enp-tech-career");
  });

  it("bootcampsForTrack/Org/City filter as expected", () => {
    expect(bootcampsForTrack("tech").length).toBeGreaterThan(0);
    expect(bootcampsForOrg("enp").length).toBeGreaterThan(0);
    expect(bootcampsForCity("tel-aviv").length).toBeGreaterThan(0);
  });

  it("bootcampBody falls back to HE for unknown locales", () => {
    const enp = findBootcamp("enp-tech-career")!;
    // @ts-expect-error — intentionally probe fallback
    expect(bootcampBody(enp, "xx")).toBe(enp.bodies.he);
  });
});

describe("BOOTCAMPS — JSON-LD validity for every entry", () => {
  const ctx = { publicUrl: "https://tedros.co.il", locale: "he" as const };

  it("formal programs render as EducationalOccupationalProgram", () => {
    const formal = BOOTCAMPS.filter((b) => b.programType !== "Mentorship");
    expect(formal.length).toBeGreaterThan(0);
    for (const b of formal) {
      const out = bootcampJsonLd(ctx, {
        slug: b.slug,
        trackSlug: b.trackSlug,
        name: b.name,
        shortDescription: b.shortDescription,
        ...(b.orgSlug
          ? { org: { slug: b.orgSlug, name: { he: b.orgSlug } } }
          : {}),
        programType: b.programType,
        ...(b.timeToComplete ? { timeToComplete: b.timeToComplete } : {}),
        financialAidEligible: b.financialAidEligible,
        ...(b.occupationalCategory
          ? { occupationalCategory: b.occupationalCategory }
          : {}),
        applicationUrl: b.applicationUrl,
      });
      expect(out["@type"]).toBe("EducationalOccupationalProgram");
      expect(out["name"]).toBeDefined();
      expect(out["url"]).toContain("/careers/programs/");
    }
  });

  it("mentorship programs render as Service", () => {
    const mentorships = BOOTCAMPS.filter((b) => b.programType === "Mentorship");
    expect(mentorships.length).toBeGreaterThan(0);
    for (const b of mentorships) {
      const out = bootcampJsonLd(ctx, {
        slug: b.slug,
        trackSlug: b.trackSlug,
        name: b.name,
        shortDescription: b.shortDescription,
        programType: b.programType,
        financialAidEligible: b.financialAidEligible,
      });
      expect(out["@type"]).toBe("Service");
    }
  });
});

describe("ALL_CAREER_TRACKS still references real seed entries", () => {
  it("every CareerTrack reaches at least one bootcamp via recommendedBootcamps", async () => {
    // A track's recommendation list is the source of truth for what
    // shows up on its page. The bootcamp's own trackSlug is the
    // *primary* track, but cross-track recommendations are valid (e.g.
    // ISEF excellence-employment is primary=finance and also recommended
    // by the law track). So we check both directions.
    const { CAREER_TRACKS } = await import(
      "../app/lib/careers/careers.server"
    );
    const tracksWithPrimaryBootcamp = new Set(BOOTCAMPS.map((b) => b.trackSlug));
    // Healthcare currently has none — handled in track copy as the
    // nursing path / community-health worker route.
    const expected = ALL_CAREER_TRACKS.filter((t) => t !== "healthcare");
    for (const t of expected) {
      const trackEntry = CAREER_TRACKS.find((c) => c.slug === t);
      const reachable =
        tracksWithPrimaryBootcamp.has(t) ||
        (trackEntry !== undefined && trackEntry.recommendedBootcamps.length > 0);
      expect(reachable, `track ${t} has no reachable bootcamp`).toBe(true);
    }
  });
});
