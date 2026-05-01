import { describe, expect, it } from "vitest";

import {
  allProgramSlugs,
  getProgramEntry,
  listPrograms,
  listProgramsByOrg,
} from "../app/lib/db/queries/programs.server";
import { ORGS } from "../app/lib/orgs/orgs.server";
import { ALL_PROGRAM_TRACKS, glyphForProgramTrack } from "../app/lib/programs/categories";
import { PROGRAMS } from "../app/lib/programs/programs.server";

describe("programs seed integrity", () => {
  it("has at least 20 programs", () => {
    expect(PROGRAMS.length).toBeGreaterThanOrEqual(20);
  });

  it("every program has unique slug", () => {
    const slugs = PROGRAMS.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every slug is Latin kebab-case", () => {
    for (const e of PROGRAMS) {
      expect(e.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("every track is a registered enum member", () => {
    for (const e of PROGRAMS) {
      expect(ALL_PROGRAM_TRACKS).toContain(e.track);
    }
  });

  it("every orgSlug resolves to a real org", () => {
    const orgSlugs = new Set(ORGS.map((o) => o.slug));
    for (const e of PROGRAMS) {
      expect(orgSlugs.has(e.orgSlug), `${e.slug} → ${e.orgSlug}`).toBe(true);
    }
  });

  it("every program has HE/EN/AM body + structured fields", () => {
    for (const e of PROGRAMS) {
      expect(e.title.he).toBeTruthy();
      expect(e.title.en).toBeTruthy();
      expect(e.title.am).toBeTruthy();
      expect(e.duration.he).toBeTruthy();
      expect(e.location.he).toBeTruthy();
      expect(e.forWhom.he).toBeTruthy();
      expect(e.bodies.he.length).toBeGreaterThan(100);
      expect(e.bodies.en.length).toBeGreaterThan(100);
      expect(e.bodies.am.length).toBeGreaterThan(50);
    }
  });
});

describe("listPrograms", () => {
  it("returns all programs in the requested locale", () => {
    expect(listPrograms("he").length).toBe(PROGRAMS.length);
    expect(listPrograms("en").length).toBe(PROGRAMS.length);
    expect(listPrograms("am").length).toBe(PROGRAMS.length);
  });
});

describe("listProgramsByOrg", () => {
  it("returns only programs for that org", () => {
    const enpPrograms = listProgramsByOrg("enp", "he");
    expect(enpPrograms.length).toBeGreaterThan(0);
    for (const p of enpPrograms) expect(p.orgSlug).toBe("enp");
  });

  it("totals across orgs match seed length", () => {
    const total = ORGS.reduce(
      (acc, o) => acc + listProgramsByOrg(o.slug, "he").length,
      0,
    );
    expect(total).toBe(PROGRAMS.length);
  });
});

describe("getProgramEntry", () => {
  it("returns full detail for known slug", () => {
    const space = getProgramEntry("enp-space", "he");
    expect(space).not.toBeNull();
    expect(space?.orgSlug).toBe("enp");
    expect(space?.body.length).toBeGreaterThan(200);
  });

  it("returns null for unknown slug", () => {
    expect(getProgramEntry("nope", "he")).toBeNull();
  });
});

describe("glyphForProgramTrack", () => {
  it("returns a glyph for every track", () => {
    for (const t of ALL_PROGRAM_TRACKS) {
      expect(glyphForProgramTrack(t).length).toBeGreaterThan(0);
    }
  });
});

describe("allProgramSlugs", () => {
  it("matches the seed length", () => {
    expect(allProgramSlugs().length).toBe(PROGRAMS.length);
  });
});
