import { describe, expect, it } from "vitest";

import { CAREER_TRACKS, findCareerTrack } from "../app/lib/careers/careers.server";
import {
  bootcampJsonLd,
  breadcrumbJsonLd,
  careerTrackJsonLd,
  careersStatisticsJsonLd,
  faqJsonLd,
  jobPostingJsonLd,
  successStoryJsonLd,
  type SchemaContext,
} from "../app/lib/careers/schema";

const ctx: SchemaContext = { publicUrl: "https://tedros.co.il", locale: "he" };

describe("breadcrumbJsonLd", () => {
  it("produces a BreadcrumbList with 1-indexed positions and locale-aware URLs", () => {
    const out = breadcrumbJsonLd(ctx, [
      { name: "ראשי", path: "/" },
      { name: "קריירה", path: "/careers" },
      { name: "הייטק", path: "/careers/tech" },
    ]);
    expect(out["@type"]).toBe("BreadcrumbList");
    const items = out["itemListElement"] as Array<Record<string, unknown>>;
    expect(items).toHaveLength(3);
    expect(items[0]?.position).toBe(1);
    expect(items[2]?.item).toBe("https://tedros.co.il/he/careers/tech");
  });
});

describe("careerTrackJsonLd", () => {
  const tech = findCareerTrack("tech")!;
  it("emits @type=WebPage with locale-aware url + name", () => {
    const out = careerTrackJsonLd(ctx, tech);
    expect(out["@type"]).toBe("WebPage");
    expect(out["url"]).toBe("https://tedros.co.il/he/careers/tech");
    expect(out["inLanguage"]).toBe("he");
    expect(out["name"]).toBe("הייטק");
  });

  it("respects locale fallback when EN translation present", () => {
    const out = careerTrackJsonLd({ ...ctx, locale: "en" }, tech);
    expect(out["url"]).toBe("https://tedros.co.il/en/careers/tech");
    expect(out["name"]).toBe("Tech");
  });

  it("attaches a mainEntity ItemList when bootcamp names are provided", () => {
    const out = careerTrackJsonLd(ctx, tech, {
      recommendedBootcampNames: ["ENP Tech-Career", "ITWorks"],
    });
    const main = out["mainEntity"] as Record<string, unknown>;
    expect(main["@type"]).toBe("ItemList");
    const items = main["itemListElement"] as Array<Record<string, unknown>>;
    expect(items).toHaveLength(2);
    expect(items[0]?.position).toBe(1);
  });
});

describe("bootcampJsonLd", () => {
  it("renders a formal program as EducationalOccupationalProgram with provider", () => {
    const out = bootcampJsonLd(ctx, {
      slug: "enp-tech-career",
      trackSlug: "tech",
      name: { he: "ENP Tech-Career", en: "ENP Tech-Career" },
      shortDescription: { he: "bootcamp הייטק 12 חודשים", en: "12-month tech bootcamp" },
      org: { slug: "enp", name: { he: "ENP", en: "ENP" } },
      programType: "Bootcamp",
      timeToComplete: "P52W",
      financialAidEligible: true,
      occupationalCategory: "software-developer",
      applicationUrl: "https://example.org/apply",
    });
    expect(out["@type"]).toBe("EducationalOccupationalProgram");
    expect(out["programType"]).toBe("Bootcamp");
    expect(out["financialAidEligible"]).toBe(true);
    expect(out["timeToComplete"]).toBe("P52W");
    const provider = out["provider"] as Record<string, unknown>;
    expect(provider["sameAs"]).toBe("https://tedros.co.il/he/orgs/enp");
  });

  it("renders a Mentorship as Service (semantic match for 1:1 programs)", () => {
    const out = bootcampJsonLd(ctx, {
      slug: "olim-beyahad-mentorship",
      trackSlug: "tech",
      name: { he: "Olim Beyahad Mentorship" },
      shortDescription: { he: "1:1 mentorship" },
      org: { slug: "olim-beyahad", name: { he: "Olim Beyahad" } },
      programType: "Mentorship",
      financialAidEligible: false,
    });
    expect(out["@type"]).toBe("Service");
    expect(out["areaServed"]).toEqual({ "@type": "Country", name: "Israel" });
  });
});

describe("jobPostingJsonLd (Google for Jobs)", () => {
  const baseInput = {
    slug: "enp-mentor-tech-career-netanya",
    title: { he: "מנטור ל-Tech-Career נתניה", en: "Tech-Career mentor — Netanya" },
    description: {
      he: "מלווה קוהורט bootcamp בנתניה, פגישות שבועיות, מענה על שאלות עיצוב מערכות.",
      en: "Mentor a Netanya bootcamp cohort, weekly meetings, system-design Q&A.",
    },
    postedAt: "2026-05-01T08:00:00Z",
    validThrough: "2026-08-01T08:00:00Z",
    hiringOrganization: {
      name: "ENP",
      orgSlug: "enp",
      logoUrl: "https://tedros.co.il/og/enp.png",
    },
    jobLocation: { addressLocality: "נתניה", addressRegion: "Center" },
    employmentType: "PART_TIME" as const,
    applicationUrl: "https://enp.org.il/jobs/mentor",
    affirmativeAction: false,
  };

  it("emits every required Google for Jobs field", () => {
    const out = jobPostingJsonLd(ctx, baseInput);
    expect(out["@type"]).toBe("JobPosting");
    // Required props per https://developers.google.com/search/docs/appearance/structured-data/job-posting:
    expect(out["title"]).toBeDefined();
    expect(out["description"]).toBeDefined();
    expect(out["datePosted"]).toBe("2026-05-01T08:00:00Z");
    expect(out["validThrough"]).toBe("2026-08-01T08:00:00Z");
    expect(out["hiringOrganization"]).toBeDefined();
    expect(out["jobLocation"]).toBeDefined();
    expect(out["employmentType"]).toBe("PART_TIME");
    const loc = out["jobLocation"] as Record<string, unknown>;
    const addr = loc["address"] as Record<string, unknown>;
    expect(addr["addressLocality"]).toBe("נתניה");
    expect(addr["addressCountry"]).toBe("IL");
  });

  it("links the hiring organization back to its Tedros org profile via sameAs", () => {
    const out = jobPostingJsonLd(ctx, baseInput);
    const hiring = out["hiringOrganization"] as Record<string, unknown>;
    expect(hiring["sameAs"]).toBe("https://tedros.co.il/he/orgs/enp");
  });

  it("attaches baseSalary when disclosed", () => {
    const out = jobPostingJsonLd(ctx, {
      ...baseInput,
      baseSalary: {
        minValue: 8000,
        maxValue: 12000,
        currency: "ILS",
        unitText: "MONTH",
      },
    });
    const salary = out["baseSalary"] as Record<string, unknown>;
    expect(salary["@type"]).toBe("MonetaryAmount");
    const value = salary["value"] as Record<string, unknown>;
    expect(value["unitText"]).toBe("MONTH");
  });

  it("flags affirmative-action with a localized jobBenefits string", () => {
    const heOut = jobPostingJsonLd(ctx, { ...baseInput, affirmativeAction: true });
    expect(heOut["jobBenefits"]).toContain("צו 50");
    const enOut = jobPostingJsonLd(
      { ...ctx, locale: "en" },
      { ...baseInput, affirmativeAction: true },
    );
    expect(enOut["jobBenefits"]).toContain("Order 50");
  });

  it("omits baseSalary when undisclosed (allowed by Google for Jobs)", () => {
    const out = jobPostingJsonLd(ctx, baseInput);
    expect(out["baseSalary"]).toBeUndefined();
  });
});

describe("successStoryJsonLd", () => {
  it("produces a Graph with anonymized Article + Person entries", () => {
    const out = successStoryJsonLd(ctx, {
      slug: "daniel-tech-tel-aviv",
      nickname: "דניאל",
      headline: { he: "דניאל, 28 — מבוגר תואר ל-Senior Backend" },
      summary: { he: "סיפור הצלחה של בוגר ENP Tech-Career" },
      trackSlug: "tech",
      currentRole: { he: "Senior backend engineer" },
      city: { he: "תל-אביב" },
      publishedAt: "2026-06-01T00:00:00Z",
    });
    const graph = out["@graph"] as Array<Record<string, unknown>>;
    expect(graph).toHaveLength(2);
    const article = graph[0]!;
    expect(article["@type"]).toBe("Article");
    expect(article["url"]).toContain("/he/careers/stories/daniel-tech-tel-aviv");
    const person = graph[1]!;
    expect(person["@type"]).toBe("Person");
    expect(person["name"]).toBe("דניאל");
    // Critical: no real surname, no PII fields beyond nickname.
    expect(person["familyName"]).toBeUndefined();
    expect(person["email"]).toBeUndefined();
  });
});

describe("faqJsonLd", () => {
  it("produces a FAQPage with one Question per entry", () => {
    const out = faqJsonLd(ctx, [
      {
        question: { he: "איך מתחילים קריירה בהייטק?" },
        answer: { he: "דרך bootcamp או mentorship + portfolio." },
      },
      {
        question: { he: "מה זה צו 50?" },
        answer: { he: "צו נציבות שירות המדינה לייצוג הולם." },
      },
    ]);
    expect(out["@type"]).toBe("FAQPage");
    const entities = out["mainEntity"] as Array<Record<string, unknown>>;
    expect(entities).toHaveLength(2);
    expect(entities[0]?.["@type"]).toBe("Question");
    const accepted = entities[0]?.acceptedAnswer as Record<string, unknown>;
    expect(accepted["@type"]).toBe("Answer");
  });
});

describe("careersStatisticsJsonLd", () => {
  it("emits a Dataset suitable for Google Dataset Search", () => {
    const out = careersStatisticsJsonLd(ctx, {
      name: { he: "תעסוקה — נתוני קהילת יוצאי אתיופיה" },
      description: { he: "סטטיסטיקות שכר/אבטלה/ייצוג ציבורי 2015-2024." },
      temporalCoverage: "2015/2024",
      keywords: ["תעסוקה", "Ethiopian-Israeli", "employment"],
      csvDownloadUrl: "https://tedros.co.il/data/careers-statistics.csv",
    });
    expect(out["@type"]).toBe("Dataset");
    expect(out["temporalCoverage"]).toBe("2015/2024");
    expect(out["isAccessibleForFree"]).toBe(true);
    const dist = (out["distribution"] as Array<Record<string, unknown>>)[0]!;
    expect(dist["encodingFormat"]).toBe("text/csv");
  });
});

describe("integration — every track produces a valid WebPage JSON-LD", () => {
  it("renders WebPage with locale-aware URL for every seeded track", () => {
    for (const track of CAREER_TRACKS) {
      const out = careerTrackJsonLd(ctx, track);
      expect(out["@type"]).toBe("WebPage");
      expect(out["url"]).toBe(`https://tedros.co.il/he/careers/${track.slug}`);
    }
  });
});
