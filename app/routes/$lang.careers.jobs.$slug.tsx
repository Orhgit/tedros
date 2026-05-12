// /:lang/careers/jobs/:slug — Job-posting detail (RIN-474 / RIN-469).
//
// Emits a Google for Jobs–eligible `JobPosting` JSON-LD per active job.
// Past-`validThrough` jobs return **410 Gone** (Google's recommended
// signal — "this resource is permanently gone", distinct from 404 which
// implies "we don't know"). Empty seed → every URL 404s, which is
// correct because no job has ever existed at that slug.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.careers.jobs.$slug";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { findCareerTrack } from "~/lib/careers/careers.server";
import { findJob, isJobActive } from "~/lib/careers/jobs.server";
import { jobPath, trackPath } from "~/lib/careers/links";
import { breadcrumbJsonLd, jobPostingJsonLd } from "~/lib/careers/schema";
import { CITIES, cityName } from "~/lib/cities/registry";
import { getOrgEntry } from "~/lib/db/queries/orgs.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { renderMarkdown } from "~/lib/utils/markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.slug) {
    throw data({ error: "missing-slug" }, { status: 404 });
  }
  const job = findJob(params.slug);
  if (!job) {
    throw data({ error: "not-found" }, { status: 404 });
  }
  // Past-`validThrough` → 410 Gone so Google drops it from Jobs cleanly.
  // We still resolve the entry for an "expired job" page, but the loader
  // throws so the route never renders the application CTA.
  if (!isJobActive(job)) {
    throw data({ error: "expired" }, { status: 410 });
  }

  const html = renderMarkdown(job.bodies[locale] ?? job.bodies.he);
  const city = CITIES.find((c) => c.slug === job.citySlug) ?? null;
  const org = job.employerOrgSlug ? getOrgEntry(job.employerOrgSlug, locale) : null;
  const track = findCareerTrack(job.trackSlug);

  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}${jobPath(job.slug)}`;

  return {
    locale,
    job,
    html,
    city,
    org,
    track,
    shareUrl,
    publicUrl: PUBLIC_URL,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, job, city, org, track, publicUrl } = data;
  const title = job.title[locale] ?? job.title.he;
  const description = job.description[locale] ?? job.description.he;
  const employerName = org
    ? org.name
    : (job.employerNameExternal ?? job.employerOrgSlug ?? "");
  const cityNameLocal = city ? cityName(city, locale) : job.citySlug;
  const trackName = track ? (track.name[locale] ?? track.name.he) : job.trackSlug;

  const jobJsonLd = jobPostingJsonLd(
    { publicUrl, locale },
    {
      slug: job.slug,
      title: job.title,
      description: job.description,
      postedAt: job.postedAt,
      validThrough: job.validThrough,
      hiringOrganization: {
        name: employerName,
        ...(job.employerOrgSlug ? { orgSlug: job.employerOrgSlug } : {}),
      },
      jobLocation: {
        addressLocality: cityNameLocal,
        ...(job.region ? { addressRegion: job.region } : {}),
      },
      employmentType: job.employmentType,
      ...(job.baseSalary ? { baseSalary: job.baseSalary } : {}),
      applicationUrl: job.applicationUrl,
      affirmativeAction: job.affirmativeAction,
    },
  );

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "careers_breadcrumb_careers"), path: "/careers" },
    { name: t(locale, "careers_jobs_landing_title"), path: "/careers/jobs" },
    { name: title, path: jobPath(job.slug) },
  ]);

  return [
    { title: `${title} — ${employerName} — Tedros` },
    { name: "description", content: description },
    {
      tagName: "link",
      rel: "canonical",
      href: `${publicUrl}/${locale}${jobPath(job.slug)}`,
    },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": jobJsonLd },
    { "script:ld+json": breadcrumb },
    { name: "robots", content: "max-image-preview:large" },
    { name: "x-job-track", content: trackName },
  ];
};

const EMPLOYMENT_TYPE_KEY: Record<string, string> = {
  FULL_TIME: "careers_jobs_type_full_time",
  PART_TIME: "careers_jobs_type_part_time",
  CONTRACTOR: "careers_jobs_type_contractor",
  VOLUNTEER: "careers_jobs_type_volunteer",
};

export default function JobDetail({ loaderData }: Route.ComponentProps) {
  const { locale, job, html, city, org, track, shareUrl } = loaderData;
  const title = job.title[locale] ?? job.title.he;
  const employerName = org
    ? org.name
    : (job.employerNameExternal ?? job.employerOrgSlug ?? "");
  const cityNameLocal = city ? cityName(city, locale) : job.citySlug;
  const trackName = track ? (track.name[locale] ?? track.name.he) : job.trackSlug;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/careers`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header className="relative mb-6 isolate overflow-hidden rounded-2xl border border-earth-200 p-6 sm:p-10">
          <img
            src="https://images.unsplash.com/photo-1691820776176-fcfbd25096c9?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent" aria-hidden="true" />
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/careers`} className="hover:underline">
              {t(locale, "careers_breadcrumb_careers")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/careers/jobs`} className="hover:underline">
              {t(locale, "careers_jobs_landing_title")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">
            {employerName} · {cityNameLocal}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-earth-200 bg-earth-50 px-2.5 py-0.5 text-xs text-earth-800">
              {t(
                locale,
                EMPLOYMENT_TYPE_KEY[job.employmentType] ?? "careers_jobs_type_full_time",
              )}
            </span>
            {job.affirmativeAction && (
              <span className="inline-flex items-center rounded-full border border-accent-red/30 bg-accent-red/5 px-2.5 py-0.5 text-xs text-accent-red">
                {t(locale, "careers_jobs_affirmative_badge")}
              </span>
            )}
            {track && (
              <Link
                to={`/${locale}${trackPath(track.slug)}`}
                className="inline-flex items-center rounded-full border border-earth-200 bg-card px-2.5 py-0.5 text-xs text-earth-800 hover:border-earth-400"
              >
                {trackName} →
              </Link>
            )}
          </div>
        </header>

        <section
          className="prose prose-ink max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <aside className="mt-10 overflow-hidden rounded-lg border border-earth-200 bg-earth-50 p-5">
          <p className="text-sm font-medium text-earth-900">
            {t(locale, "careers_jobs_apply_label")}
          </p>
          <a
            href={job.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 rounded-md bg-earth-800 px-5 py-2.5 text-base font-medium text-white shadow-sm transition hover:bg-earth-700"
          >
            <span aria-hidden="true">↗</span>
            {t(locale, "careers_jobs_apply_cta")}
          </a>
          <p className="mt-3 text-xs text-ink-600">
            {t(locale, "careers_jobs_apply_disclaimer")}
          </p>
        </aside>

        <div className="mt-6">
          <WhatsAppShare title={title} url={shareUrl} locale={locale} />
        </div>

        <div className="mt-12 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}/careers/jobs`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true">←</span>
            {t(locale, "careers_jobs_back_to_landing")}
          </Link>
        </div>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
