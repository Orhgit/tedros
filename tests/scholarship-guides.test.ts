// Scholarship application guides (TED-168).
//
// These pages exist because the vertical had eighteen "here is a scholarship"
// pages and zero "here is how you apply" pages. The assertions below protect
// the two properties that make them worth their URLs: they are original (the
// failure ADR-024 names) and every claim in them is attributed (ADR-021).

import { describe, expect, it } from "vitest";

import {
  SCHOLARSHIP_GUIDES,
  allScholarshipGuideSlugs,
  getScholarshipGuide,
} from "../app/lib/education/scholarship-guides.server";
import {
  getScholarshipGuideBySlug,
  guidesForScholarship,
  listScholarshipGuides,
} from "../app/lib/db/queries/scholarship-guides.server";
import { SCHOLARSHIPS } from "../app/lib/education/scholarships.server";
import { SUPPORTED_LOCALES } from "../app/lib/i18n/config";

describe("scholarship guides — registry integrity", () => {
  it("ships at least three hand-written guides", () => {
    expect(SCHOLARSHIP_GUIDES.length).toBeGreaterThanOrEqual(3);
  });

  it("has unique, url-safe slugs", () => {
    const slugs = allScholarshipGuideSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug, slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("carries title, summary, body and FAQs in every locale", () => {
    for (const guide of SCHOLARSHIP_GUIDES) {
      for (const locale of SUPPORTED_LOCALES) {
        expect(guide.title[locale], `${guide.slug}.title.${locale}`).toBeTruthy();
        expect(guide.summary[locale], `${guide.slug}.summary.${locale}`).toBeTruthy();
        expect(
          guide.bodies[locale]?.length ?? 0,
          `${guide.slug}.bodies.${locale}`,
        ).toBeGreaterThan(800);
        expect(
          guide.faqs[locale]?.length ?? 0,
          `${guide.slug}.faqs.${locale}`,
        ).toBeGreaterThan(0);
      }
    }
  });

  it("keeps summaries short enough to survive as a meta description", () => {
    for (const guide of SCHOLARSHIP_GUIDES) {
      // Google truncates around 160 characters; allow headroom but catch a
      // whole paragraph pasted into the field.
      expect(guide.summary.he.length, guide.slug).toBeLessThan(260);
    }
  });

  it("points relatedScholarships at entries that still exist", () => {
    const slugs = new Set(SCHOLARSHIPS.map((s) => s.slug));
    for (const guide of SCHOLARSHIP_GUIDES) {
      for (const slug of guide.relatedScholarships) {
        expect(slugs.has(slug), `${guide.slug} → ${slug}`).toBe(true);
      }
    }
  });

  it("records the date its sources were read", () => {
    for (const guide of SCHOLARSHIP_GUIDES) {
      expect(guide.updated, guide.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe("scholarship guides — sourcing (ADR-021)", () => {
  // The guides quote deadlines, eligibility thresholds and amounts. A guide
  // that states any of those without naming where it came from is the exact
  // failure TED-148, TED-152 and TED-157 each produced.
  it("every Hebrew body names at least one primary source with a date", () => {
    for (const guide of SCHOLARSHIP_GUIDES) {
      const he = guide.bodies.he;
      expect(he, `${guide.slug} cites no source URL`).toMatch(/https?:\/\//);
      expect(he, `${guide.slug} prints no verification date`).toMatch(
        /(נבדק|נקרא|נקראו)/,
      );
      expect(he, `${guide.slug} prints no year`).toMatch(/20\d\d/);
    }
  });

  it("sources are the granting bodies, not aggregators", () => {
    const allowedHosts = [
      "che.org.il",
      "gov.il",
      "perach.org.il",
      "perach-prj.weizmann.ac.il",
      "isef.org.il",
      "biu.ac.il",
      "olim-beyahad.org.il",
      "tech-career.org",
    ];
    for (const guide of SCHOLARSHIP_GUIDES) {
      for (const locale of SUPPORTED_LOCALES) {
        const urls = guide.bodies[locale].match(/https?:\/\/[^\s)"']+/g) ?? [];
        for (const url of urls) {
          const host = new URL(url).hostname.replace(/^www\./, "");
          expect(
            allowedHosts.some((h) => host === h || host.endsWith(`.${h}`)),
            `${guide.slug}/${locale} cites ${host}, which is not a granting body`,
          ).toBe(true);
        }
      }
    }
  });
});

describe("scholarship guides — the claims TED-168 was opened to fix", () => {
  it("the comparison guide states that two government scholarships do not stack", () => {
    const guide = getScholarshipGuide("marom-vs-minhal-vs-vatat");
    expect(guide).not.toBeNull();
    expect(guide?.bodies.he).toContain("מגורם ממשלתי אחר");
  });

  it("the comparison guide states the 15-year line that splits the two tracks", () => {
    const he = getScholarshipGuide("marom-vs-minhal-vs-vatat")?.bodies.he ?? "";
    expect(he).toContain("15 שנה");
  });

  it("the guides say VATAT doctoral scholarships are institution-only", () => {
    const he = getScholarshipGuide("how-to-apply")?.bodies.he ?? "";
    expect(he).toContain("באמצעות המוסדות בלבד");
  });

  it("the refusals guide says the priority level scores, and does not multiply", () => {
    const he = getScholarshipGuide("why-applications-are-refused")?.bodies.he ?? "";
    expect(he).toContain("הרמה משפיעה על **הניקוד**");
    expect(he).toContain("ורמת העדיפות אינה מכפיל");
    // It may name the retired percentage table only in order to debunk it.
    expect(he).toMatch(/לא נמצאה|אינה מופיעה/);
  });
});

describe("scholarship guides — query layer", () => {
  it("lists every guide in the requested locale", () => {
    const he = listScholarshipGuides("he");
    const en = listScholarshipGuides("en");
    expect(he.length).toBe(SCHOLARSHIP_GUIDES.length);
    expect(he[0]?.title).not.toBe(en[0]?.title);
  });

  it("resolves a guide by slug and returns an unknown slug as null", () => {
    expect(getScholarshipGuideBySlug("how-to-apply", "he")?.slug).toBe("how-to-apply");
    expect(getScholarshipGuideBySlug("no-such-guide", "he")).toBeNull();
  });

  it("finds the guides that reference a given scholarship", () => {
    const forMarom = guidesForScholarship("marom-che", "he");
    expect(forMarom.length).toBeGreaterThan(0);
    expect(guidesForScholarship("no-such-scholarship", "he")).toEqual([]);
  });
});
