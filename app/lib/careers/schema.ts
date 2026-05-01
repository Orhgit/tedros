// JSON-LD generators for the Careers Hub vertical (RIN-470 / RIN-469).
//
// Pure functions — return plain objects suitable for embedding in a
// route's `meta` export under `{ "script:ld+json": ... }`. Each generator
// is unit-tested against the Schema.org type it claims to produce.
//
// Schemas covered:
//   careerTrackJsonLd        → WebPage + ItemList
//   bootcampJsonLd           → EducationalOccupationalProgram | Service
//   jobPostingJsonLd         → JobPosting (Google for Jobs eligible)
//   successStoryJsonLd       → Article + Person (anonymized)
//   faqJsonLd                → FAQPage
//   careersStatisticsJsonLd  → Dataset
//   breadcrumbJsonLd         → BreadcrumbList helper
//
// Sub-2..Sub-6 routes consume these. They never reach the client bundle
// directly; routes serialize them into the document head.

import type { Locale } from "../i18n/config";
import type { CareerTrackEntry } from "./careers.server";

// ── shared types ───────────────────────────────────────────────────────────

export type JsonLd = Record<string, unknown>;

export interface SchemaContext {
  /** Public site URL prefix, e.g. `https://tedros.co.il` (no trailing slash). */
  publicUrl: string;
  locale: Locale;
}

const SCHEMA_CONTEXT = "https://schema.org";

function localizedText(t: { he: string; en?: string; am?: string }, locale: Locale): string {
  return t[locale] ?? t.he;
}

function urlFor(ctx: SchemaContext, path: string): string {
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  return `${ctx.publicUrl}/${ctx.locale}${trimmed}`;
}

// ── breadcrumbs ────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  /** Path relative to the locale, e.g. `/careers` or `/careers/tech`. */
  path: string;
}

export function breadcrumbJsonLd(
  ctx: SchemaContext,
  items: BreadcrumbItem[],
): JsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: urlFor(ctx, item.path),
    })),
  };
}

// ── career track (Sub-2 — track pages) ─────────────────────────────────────

export function careerTrackJsonLd(
  ctx: SchemaContext,
  entry: CareerTrackEntry,
  options: { recommendedBootcampNames?: string[] } = {},
): JsonLd {
  const url = urlFor(ctx, `/careers/${entry.slug}`);
  const name = localizedText(entry.name, ctx.locale);
  const description = localizedText(entry.shortDescription, ctx.locale);

  const itemList =
    options.recommendedBootcampNames && options.recommendedBootcampNames.length > 0
      ? {
          "@type": "ItemList",
          itemListElement: options.recommendedBootcampNames.map((bcName, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: bcName,
          })),
        }
      : undefined;

  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebPage",
    "@id": url,
    url,
    name,
    description,
    inLanguage: ctx.locale,
    isPartOf: {
      "@type": "WebSite",
      url: ctx.publicUrl,
      name: "Tedros",
    },
    ...(itemList ? { mainEntity: itemList } : {}),
  };
}

// ── bootcamp / program (Sub-3) ─────────────────────────────────────────────

export type BootcampProgramType = "Bootcamp" | "Apprenticeship" | "Course" | "Mentorship";

export interface BootcampJsonLdInput {
  slug: string;
  /** Track this bootcamp leads into. Used to build the canonical URL. */
  trackSlug: string;
  name: { he: string; en?: string; am?: string };
  shortDescription: { he: string; en?: string; am?: string };
  /** Operating organisation (org slug + display name). */
  org?: { slug: string; name: { he: string; en?: string; am?: string } };
  programType: BootcampProgramType;
  /** Duration as ISO-8601 duration (e.g. `P12W`). Optional for non-formal programs. */
  timeToComplete?: string;
  /** True when financial aid is available to community members. */
  financialAidEligible?: boolean;
  /** Plain-text occupational category (e.g. `software-developer`). */
  occupationalCategory?: string;
  applicationUrl?: string;
}

export function bootcampJsonLd(ctx: SchemaContext, input: BootcampJsonLdInput): JsonLd {
  const url = urlFor(ctx, `/careers/programs/${input.slug}`);
  const name = localizedText(input.name, ctx.locale);
  const description = localizedText(input.shortDescription, ctx.locale);

  // Mentorship programs aren't formal courses → render as `Service` instead
  // of `EducationalOccupationalProgram`. Google indexes both, but Service is
  // the right semantic for an unstructured 1:1 mentorship.
  const isFormalProgram = input.programType !== "Mentorship";

  const provider = input.org
    ? {
        "@type": "Organization",
        name: localizedText(input.org.name, ctx.locale),
        sameAs: urlFor(ctx, `/orgs/${input.org.slug}`),
      }
    : undefined;

  if (!isFormalProgram) {
    return {
      "@context": SCHEMA_CONTEXT,
      "@type": "Service",
      "@id": url,
      url,
      name,
      description,
      ...(provider ? { provider } : {}),
      areaServed: { "@type": "Country", name: "Israel" },
      ...(input.applicationUrl ? { termsOfService: input.applicationUrl } : {}),
    };
  }

  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "EducationalOccupationalProgram",
    "@id": url,
    url,
    name,
    description,
    programType: input.programType,
    ...(provider ? { provider } : {}),
    ...(input.occupationalCategory
      ? { occupationalCategory: input.occupationalCategory }
      : {}),
    ...(input.timeToComplete ? { timeToComplete: input.timeToComplete } : {}),
    ...(typeof input.financialAidEligible === "boolean"
      ? { financialAidEligible: input.financialAidEligible }
      : {}),
    ...(input.applicationUrl ? { applicationUrl: input.applicationUrl } : {}),
  };
}

// ── job posting (Sub-5 — Google for Jobs) ──────────────────────────────────

export type EmploymentType = "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "VOLUNTEER";

export interface JobPostingJsonLdInput {
  slug: string;
  title: { he: string; en?: string; am?: string };
  description: { he: string; en?: string; am?: string };
  /** ISO-8601 timestamp when the posting went live. */
  postedAt: string;
  /** ISO-8601 timestamp after which the job is no longer valid. */
  validThrough: string;
  hiringOrganization: {
    name: string;
    /** Optional Tedros org slug — when present, used for `sameAs`. */
    orgSlug?: string;
    /** Logo URL (absolute). */
    logoUrl?: string;
  };
  jobLocation: {
    /** City name in HE for `addressLocality` (Google guidance). */
    addressLocality: string;
    /** Optional region (e.g. `Center`). */
    addressRegion?: string;
  };
  employmentType: EmploymentType;
  /** Optional salary range — omit if undisclosed (Google for Jobs allows this). */
  baseSalary?: {
    minValue: number;
    maxValue: number;
    currency: string;
    unitText: "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";
  };
  /** External application URL. */
  applicationUrl?: string;
  /** True when the job is flagged as Order-50 affirmative-action. */
  affirmativeAction?: boolean;
}

export function jobPostingJsonLd(ctx: SchemaContext, input: JobPostingJsonLdInput): JsonLd {
  const url = urlFor(ctx, `/careers/jobs/${input.slug}`);
  const title = localizedText(input.title, ctx.locale);
  const description = localizedText(input.description, ctx.locale);

  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "JobPosting",
    "@id": url,
    url,
    title,
    description,
    datePosted: input.postedAt,
    validThrough: input.validThrough,
    hiringOrganization: {
      "@type": "Organization",
      name: input.hiringOrganization.name,
      ...(input.hiringOrganization.orgSlug
        ? { sameAs: urlFor(ctx, `/orgs/${input.hiringOrganization.orgSlug}`) }
        : {}),
      ...(input.hiringOrganization.logoUrl
        ? { logo: input.hiringOrganization.logoUrl }
        : {}),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: input.jobLocation.addressLocality,
        ...(input.jobLocation.addressRegion
          ? { addressRegion: input.jobLocation.addressRegion }
          : {}),
        addressCountry: "IL",
      },
    },
    employmentType: input.employmentType,
    ...(input.baseSalary
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: input.baseSalary.currency,
            value: {
              "@type": "QuantitativeValue",
              minValue: input.baseSalary.minValue,
              maxValue: input.baseSalary.maxValue,
              unitText: input.baseSalary.unitText,
            },
          },
        }
      : {}),
    ...(input.applicationUrl ? { directApply: true, url: input.applicationUrl } : {}),
    ...(input.affirmativeAction
      ? {
          jobBenefits:
            ctx.locale === "he"
              ? "משרה מסומנת לייצוג הולם (צו 50)"
              : ctx.locale === "am"
                ? "ቦታው ለቅድሚያ ውክልና (ትዕዛዝ 50) ምልክት ተደርጎበታል"
                : "Affirmative-action flagged position (Order 50)",
        }
      : {}),
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Israel",
    },
  };
}

// ── success story (Sub-6 — Article + anonymized Person) ────────────────────

export interface SuccessStoryJsonLdInput {
  slug: string;
  /** Display nickname (anonymized). Real names never leak through `Person.name`. */
  nickname: string;
  /** Display headline — locale-dependent. */
  headline: { he: string; en?: string; am?: string };
  /** Brief story summary (used as `description`). */
  summary: { he: string; en?: string; am?: string };
  /** Track this story belongs to (matches `CareerTrack`). */
  trackSlug: string;
  /** Display role, e.g. "Senior backend engineer". */
  currentRole: { he: string; en?: string; am?: string };
  /** City of residence (display name in matching locale). */
  city: { he: string; en?: string; am?: string };
  /** ISO-8601 publication date. */
  publishedAt: string;
}

export function successStoryJsonLd(
  ctx: SchemaContext,
  input: SuccessStoryJsonLdInput,
): JsonLd {
  const url = urlFor(ctx, `/careers/stories/${input.slug}`);
  const headline = localizedText(input.headline, ctx.locale);
  const description = localizedText(input.summary, ctx.locale);
  const role = localizedText(input.currentRole, ctx.locale);
  const city = localizedText(input.city, ctx.locale);

  return {
    "@context": SCHEMA_CONTEXT,
    "@graph": [
      {
        "@type": "Article",
        "@id": url,
        url,
        headline,
        description,
        datePublished: input.publishedAt,
        inLanguage: ctx.locale,
        author: {
          "@type": "Organization",
          name: "Tedros",
          url: ctx.publicUrl,
        },
        publisher: {
          "@type": "Organization",
          name: "Tedros",
          url: ctx.publicUrl,
        },
      },
      {
        "@type": "Person",
        // Anonymized — we never store or emit a real name.
        name: input.nickname,
        hasOccupation: {
          "@type": "Occupation",
          name: role,
          occupationLocation: {
            "@type": "City",
            name: city,
          },
        },
      },
    ],
  };
}

// ── FAQ (Sub-6) ────────────────────────────────────────────────────────────

export interface FaqEntry {
  question: { he: string; en?: string; am?: string };
  /** Plain-text or simple HTML answer. */
  answer: { he: string; en?: string; am?: string };
}

export function faqJsonLd(ctx: SchemaContext, entries: FaqEntry[]): JsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    inLanguage: ctx.locale,
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: localizedText(e.question, ctx.locale),
      acceptedAnswer: {
        "@type": "Answer",
        text: localizedText(e.answer, ctx.locale),
      },
    })),
  };
}

// ── statistics (Sub-6 — Dataset for Google Dataset Search) ─────────────────

export interface StatisticsJsonLdInput {
  /** Dataset display name. */
  name: { he: string; en?: string; am?: string };
  description: { he: string; en?: string; am?: string };
  /** ISO-8601 interval, e.g. `2015/2024`. */
  temporalCoverage: string;
  /** Optional URL to a downloadable CSV. */
  csvDownloadUrl?: string;
  /** Free-form keywords (English preferred for indexing). */
  keywords?: string[];
}

export function careersStatisticsJsonLd(
  ctx: SchemaContext,
  input: StatisticsJsonLdInput,
): JsonLd {
  const url = urlFor(ctx, "/careers/statistics");
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Dataset",
    "@id": url,
    url,
    name: localizedText(input.name, ctx.locale),
    description: localizedText(input.description, ctx.locale),
    temporalCoverage: input.temporalCoverage,
    creator: {
      "@type": "Organization",
      name: "Tedros",
      url: ctx.publicUrl,
    },
    license: "https://creativecommons.org/licenses/by-sa/4.0/",
    isAccessibleForFree: true,
    spatialCoverage: { "@type": "Country", name: "Israel" },
    ...(input.keywords && input.keywords.length > 0 ? { keywords: input.keywords } : {}),
    ...(input.csvDownloadUrl
      ? {
          distribution: [
            {
              "@type": "DataDownload",
              encodingFormat: "text/csv",
              contentUrl: input.csvDownloadUrl,
            },
          ],
        }
      : {}),
  };
}
