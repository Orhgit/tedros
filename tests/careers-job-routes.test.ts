// Loader integration tests for the Careers Hub Wave 4 job-board routes
// (RIN-474). JOBS now ships with 8 V1 public-sector seeds (RIN-474 V1),
// but each test block operates on a controlled-empty JOBS state restored
// by beforeEach/afterEach. Tests that need specific jobs push them explicitly.
//
// We mutate `JOBS` in-place inside isolated `it` blocks; beforeEach drains
// it so every test starts from a known-empty state regardless of the V1
// seed data. The static module pattern makes this safe — no other tests
// in the suite read `JOBS`.

import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";

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

import { JOBS, type JobPostingEntry } from "../app/lib/careers/jobs.server";
import { loader as jobsLandingLoader } from "../app/routes/$lang.careers.jobs._index";
import { loader as jobDetailLoader } from "../app/routes/$lang.careers.jobs.$slug";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

const sampleActiveJob: JobPostingEntry = {
  slug: "test-mentor-tech-career-tel-aviv",
  title: { he: "מנטור Tech-Career — תל אביב", en: "Tech-Career Mentor — Tel Aviv" },
  description: {
    he: "ליווי קוהורט bootcamp בתל אביב, פגישות שבועיות, מענה על שאלות עיצוב מערכות.",
    en: "Mentor a Tel Aviv bootcamp cohort, weekly meetings, system-design Q&A.",
  },
  employerOrgSlug: "enp",
  citySlug: "tel-aviv",
  region: "Center",
  employmentType: "PART_TIME",
  postedAt: "2026-04-01T08:00:00Z",
  // Far in the future so isJobActive(now) is true.
  validThrough: "2099-01-01T00:00:00Z",
  applicationUrl: "https://www.enp.org.il/careers",
  affirmativeAction: false,
  trackSlug: "tech",
  bodies: {
    he: "## תיאור התפקיד\n\nליווי קוהורט bootcamp 8200 שעות.",
    en: "## Role description\n\nMentor a bootcamp cohort, ~8 hours/month.",
    am: "## የሚና መግለጫ\n\nቡት ካምፕ ቡድን ይምሩ።",
  },
};

const sampleExpiredJob: JobPostingEntry = {
  ...sampleActiveJob,
  slug: "test-expired-job",
  validThrough: "2020-01-01T00:00:00Z", // far in the past
};

beforeEach(() => {
  // Drain before each test — every block starts with a known-empty state.
  JOBS.length = 0;
});
afterEach(() => {
  JOBS.length = 0; // belt-and-suspenders
});

describe("jobs landing — empty-seed behavior (default)", () => {
  it("renders empty state for HE/EN/AM", async () => {
    for (const lang of ["he", "en", "am"]) {
      const data = await jobsLandingLoader(fakeArgs({ lang }));
      expect(data.locale).toBe(lang);
      expect(data.jobs).toHaveLength(0);
    }
  });

  it("falls back to HE when lang is unknown", async () => {
    const data = await jobsLandingLoader(fakeArgs({ lang: "xx" }));
    expect(data.locale).toBe("he");
  });
});

describe("jobs landing — with active jobs", () => {
  it("returns active jobs only (not expired ones)", async () => {
    JOBS.push(sampleActiveJob, sampleExpiredJob);
    const data = await jobsLandingLoader(fakeArgs({ lang: "he" }));
    expect(data.jobs).toHaveLength(1);
    expect(data.jobs[0]?.slug).toBe(sampleActiveJob.slug);
  });

  it("surfaces locale-aware titles and city names", async () => {
    JOBS.push(sampleActiveJob);
    const en = await jobsLandingLoader(fakeArgs({ lang: "en" }));
    expect(en.jobs[0]?.title).toBe("Tech-Career Mentor — Tel Aviv");
    expect(en.jobs[0]?.cityName).toBe("Tel Aviv");
  });
});

describe("job detail — empty seed", () => {
  it("404s on every slug while JOBS is empty", async () => {
    await expect(
      jobDetailLoader(fakeArgs({ lang: "he", slug: "anything" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });
});

describe("job detail — active job", () => {
  it("loads with all expected fields", async () => {
    JOBS.push(sampleActiveJob);
    const data = await jobDetailLoader(
      fakeArgs({ lang: "he", slug: sampleActiveJob.slug }),
    );
    expect(data.job.slug).toBe(sampleActiveJob.slug);
    expect(data.html.length).toBeGreaterThan(20);
    expect(data.city?.slug).toBe("tel-aviv");
    expect(data.org?.slug).toBe("enp");
    expect(data.track?.slug).toBe("tech");
  });
});

describe("job detail — 410 Gone for expired postings", () => {
  it("returns 410 not 404 when valid_through is in the past", async () => {
    JOBS.push(sampleExpiredJob);
    await expect(
      jobDetailLoader(fakeArgs({ lang: "he", slug: sampleExpiredJob.slug })),
    ).rejects.toMatchObject({ init: { status: 410 } });
  });

  it("404s when slug is missing entirely", async () => {
    await expect(
      jobDetailLoader(fakeArgs({ lang: "he", slug: undefined })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });

  it("404s when slug is unknown (vs 410 for expired-but-known)", async () => {
    await expect(
      jobDetailLoader(fakeArgs({ lang: "he", slug: "never-seeded" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });
});
