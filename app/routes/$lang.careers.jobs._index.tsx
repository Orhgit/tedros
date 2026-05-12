// /:lang/careers/jobs — Job-board landing (RIN-474 / RIN-469).
//
// Renders active JOBS as cards, with an empty-state for the common case
// (no postings cleared for publication yet — see `lib/careers/jobs.server.ts`
// seeding policy). When jobs exist, emits an `ItemList` JSON-LD block so
// Google's job aggregator can crawl the listing without duplicating the
// per-job `JobPosting` schema.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.careers.jobs._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { activeJobs } from "~/lib/careers/jobs.server";
import { jobPath } from "~/lib/careers/links";
import { breadcrumbJsonLd } from "~/lib/careers/schema";
import { CITIES } from "~/lib/cities/registry";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const jobs = activeJobs().map((j) => {
    const city = CITIES.find((c) => c.slug === j.citySlug);
    return {
      slug: j.slug,
      title: j.title[locale] ?? j.title.he,
      employer: j.employerOrgSlug ?? j.employerNameExternal ?? "",
      cityName: city ? (city.names[locale] ?? city.names.he) : j.citySlug,
      employmentType: j.employmentType,
      affirmativeAction: j.affirmativeAction,
      postedAt: j.postedAt,
    };
  });
  const { PUBLIC_URL } = getEnv();
  return { locale, jobs, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, jobs, publicUrl } = data;
  const title = t(locale, "careers_jobs_landing_title");
  const description = t(locale, "careers_jobs_landing_subtitle");
  const url = `${publicUrl}/${locale}/careers/jobs`;

  const itemList =
    jobs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: title,
          numberOfItems: jobs.length,
          itemListElement: jobs.map((j, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${publicUrl}/${locale}${jobPath(j.slug)}`,
          })),
        }
      : null;

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "careers_breadcrumb_careers"), path: "/careers" },
    { name: title, path: "/careers/jobs" },
  ]);

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    ...(itemList ? [{ "script:ld+json": itemList }] : []),
    { "script:ld+json": breadcrumb },
  ];
};

const EMPLOYMENT_TYPE_KEY: Record<string, string> = {
  FULL_TIME: "careers_jobs_type_full_time",
  PART_TIME: "careers_jobs_type_part_time",
  CONTRACTOR: "careers_jobs_type_contractor",
  VOLUNTEER: "careers_jobs_type_volunteer",
};

export default function JobsLanding({ loaderData }: Route.ComponentProps) {
  const { locale, jobs } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/careers`} />
      <main id="main-content" className="container-default mx-auto max-w-4xl py-10">
        <header className="relative mb-10 isolate overflow-hidden rounded-2xl border border-earth-200 bg-linear-to-br from-earth-50 via-background to-accent-yellow/10 px-6 py-8 sm:px-10 sm:py-12">
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/careers`} className="hover:underline">
              {t(locale, "careers_breadcrumb_careers")}
            </Link>
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "careers_jobs_landing_title")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-700">
            {t(locale, "careers_jobs_landing_subtitle")}
          </p>
          {jobs.length > 0 && (
            <p className="mt-3 text-sm text-ink-600">
              {jobs.length} {t(locale, "careers_jobs_count_label")}
            </p>
          )}
        </header>

        {jobs.length === 0 ? (
          <section className="rounded-2xl border border-dashed border-earth-200 bg-earth-50/40 p-8 text-center">
            <p className="text-base font-medium text-earth-900">
              {t(locale, "careers_jobs_empty_heading")}
            </p>
            <p className="mt-2 text-sm text-ink-700">
              {t(locale, "careers_jobs_empty_body")}
            </p>
            <Link
              to={`/${locale}/careers/affirmative-action`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-earth-800 hover:underline"
            >
              {t(locale, "careers_jobs_empty_cta")} →
            </Link>
          </section>
        ) : (
          <section
            aria-labelledby="jobs-list-heading"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <h2 id="jobs-list-heading" className="sr-only">
              {t(locale, "careers_jobs_landing_title")}
            </h2>
            {jobs.map((j) => (
              <Link
                key={j.slug}
                to={`/${locale}${jobPath(j.slug)}`}
                className="block rounded-lg border border-earth-200 bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-earth-400 hover:shadow-md"
              >
                <h3 className="font-display text-base font-semibold text-earth-900">
                  {j.title}
                </h3>
                <p className="mt-1 text-sm text-ink-600">
                  {j.employer} · {j.cityName}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-earth-200 bg-earth-50 px-2.5 py-0.5 text-xs text-earth-800">
                    {t(
                      locale,
                      EMPLOYMENT_TYPE_KEY[j.employmentType] ??
                        "careers_jobs_type_full_time",
                    )}
                  </span>
                  {j.affirmativeAction && (
                    <span className="inline-flex items-center rounded-full border border-accent-red/30 bg-accent-red/5 px-2.5 py-0.5 text-xs text-accent-red">
                      {t(locale, "careers_jobs_affirmative_badge")}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </section>
        )}
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
