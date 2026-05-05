import { describe, expect, it } from "vitest";

import {
  allEducationTrackSlugs,
  getEducationTrackBySlug,
  listEducationTracks,
  trackContentCount,
} from "../app/lib/db/queries/education-tracks.server";
import {
  EDUCATION_TRACKS,
  EDUCATION_TRACK_DEFINITIONS,
  glyphForEducationTrack,
} from "../app/lib/education/tracks";

describe("education-tracks definitions", () => {
  it("has 3 tracks (academic, vocational, career-shift)", () => {
    expect(EDUCATION_TRACKS).toEqual(["academic", "vocational", "career-shift"]);
  });

  it("every track has HE/EN/AM name + shortDescription + intro", () => {
    for (const t of EDUCATION_TRACK_DEFINITIONS) {
      expect(t.name.he).toBeTruthy();
      expect(t.name.en).toBeTruthy();
      expect(t.name.am).toBeTruthy();
      expect(t.shortDescription.he).toBeTruthy();
      expect(t.intro.he.length).toBeGreaterThan(100);
      expect(t.intro.en.length).toBeGreaterThan(100);
      expect(t.intro.am.length).toBeGreaterThan(50);
    }
  });

  it("every track has a glyph", () => {
    for (const t of EDUCATION_TRACK_DEFINITIONS) {
      expect(glyphForEducationTrack(t.slug)).toBeTruthy();
    }
  });

  it("track slugs are kebab-case", () => {
    for (const t of EDUCATION_TRACK_DEFINITIONS) {
      expect(t.slug).toMatch(/^[a-z]+(-[a-z]+)*$/);
    }
  });
});

describe("listEducationTracks", () => {
  it("returns 3 tracks with HE locale", () => {
    const tracks = listEducationTracks("he");
    expect(tracks).toHaveLength(3);
    expect(tracks.map((t) => t.slug)).toEqual(["academic", "vocational", "career-shift"]);
  });

  it("translates names per locale", () => {
    const he = listEducationTracks("he").find((t) => t.slug === "academic");
    const en = listEducationTracks("en").find((t) => t.slug === "academic");
    expect(he?.name).toBe("אקדמי");
    expect(en?.name).toBe("Academic");
  });

  it("includes scholarship + program counts (>0 for each track)", () => {
    const tracks = listEducationTracks("he");
    for (const t of tracks) {
      const total = t.scholarshipCount + t.programCount;
      expect(total, `track ${t.slug} should have content`).toBeGreaterThan(0);
    }
  });
});

describe("getEducationTrackBySlug", () => {
  it("returns full detail for known slug", () => {
    const academic = getEducationTrackBySlug("academic", "he");
    expect(academic).not.toBeNull();
    expect(academic?.name).toBe("אקדמי");
    expect(academic?.intro.length).toBeGreaterThan(100);
    expect(academic?.scholarships.length).toBeGreaterThan(0);
  });

  it("academic track aggregates only undergrad/masters/phd/pre-academic scholarships", () => {
    const academic = getEducationTrackBySlug("academic", "he");
    expect(academic).not.toBeNull();
    const levels = new Set(academic!.scholarships.map((s) => s.level));
    for (const level of levels) {
      expect(
        ["undergrad", "masters", "phd", "pre-academic"].includes(level),
        `academic track contains scholarship level ${level}`,
      ).toBe(true);
    }
  });

  it("vocational track aggregates only vocational scholarships matching tech/career-shift tags", () => {
    const voc = getEducationTrackBySlug("vocational", "he");
    expect(voc).not.toBeNull();
    for (const s of voc!.scholarships) {
      expect(s.level).toBe("vocational");
      const hit = s.tags.some((tag) =>
        ["vocational", "tech", "career-shift"].includes(tag),
      );
      expect(hit, `${s.slug} tags=${s.tags.join(",")}`).toBe(true);
    }
  });

  it("returns null for unknown slug", () => {
    expect(getEducationTrackBySlug("does-not-exist", "he")).toBeNull();
  });
});

describe("trackContentCount", () => {
  it("returns >0 for every track (no thin pages)", () => {
    for (const slug of allEducationTrackSlugs()) {
      expect(trackContentCount(slug), `track ${slug}`).toBeGreaterThan(0);
    }
  });

  it("returns 0 for unknown slug", () => {
    expect(trackContentCount("nope")).toBe(0);
  });
});
