// /:lang/education/tracks/:slug — Education-track detail (RIN-507 / Phase 5 Wave 2).
// Aggregates scholarships (Wave 1) + programs (RIN-424) in a single track view.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.education.tracks.$slug";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { getEducationTrackBySlug } from "~/lib/db/queries/education-tracks.server";
import { glyphForEducationTrack } from "~/lib/education/tracks";
import { glyphForScholarshipLevel } from "~/lib/education/categories";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { renderMarkdown } from "~/lib/utils/markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.slug) {
    throw data({ error: "missing-slug" }, { status: 404 });
  }
  const detail = getEducationTrackBySlug(params.slug, locale);
  if (!detail) {
    throw data({ error: "not-found" }, { status: 404 });
  }
  const introHtml = renderMarkdown(detail.intro);
  const { PUBLIC_URL } = getEnv();
  return { locale, detail, introHtml, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, detail, publicUrl } = data;
  return [
    { title: `${detail.name} — ${t(locale, "tracks_landing_title")} — Tedros` },
    { name: "description", content: detail.shortDescription },
    ...hreflangMeta(publicUrl, locale, `/education/tracks/${detail.slug}`),
    { property: "og:title", content: detail.name },
    { property: "og:description", content: detail.shortDescription },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: detail.name,
        description: detail.shortDescription,
        hasPart: detail.scholarships.map((s) => ({
          "@type": "EducationalOccupationalProgram",
          name: s.name,
          url: s.applicationUrl,
        })),
      },
    },
  ];
};

export default function TrackDetail({ loaderData }: Route.ComponentProps) {
  const { locale, detail, introHtml } = loaderData;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/education/tracks`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header className="relative mb-8 isolate overflow-hidden rounded-2xl border border-earth-200 p-6 sm:p-10">
          <img
            src="https://images.unsplash.com/photo-1764145177622-8317fbfe1877?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent" aria-hidden="true" />
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>
            {" / "}
            <Link to={`/${locale}/education`} className="hover:underline">
              {t(locale, "education_pillar_title")}
            </Link>
            {" / "}
            <Link to={`/${locale}/education/tracks`} className="hover:underline">
              {t(locale, "tracks_landing_title")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            <span aria-hidden="true" className="me-2 text-3xl">
              {glyphForEducationTrack(detail.slug)}
            </span>
            {detail.name}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-700">
            {detail.shortDescription}
          </p>
        </header>

        <div
          className="prose prose-sm prose-headings:font-display prose-headings:text-earth-900 prose-a:text-earth-700 prose-a:underline-offset-2 hover:prose-a:underline mb-10 max-w-none text-ink-700"
          dangerouslySetInnerHTML={{ __html: introHtml }}
        />

        {detail.scholarships.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-semibold text-earth-900">
              {t(locale, "tracks_scholarships_heading")}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {detail.scholarships.map((s) => (
                <Link
                  key={s.slug}
                  to={`/${locale}/education/scholarships/${s.slug}`}
                  className="group block rounded-lg border border-earth-200 bg-card p-4 transition hover:border-earth-400"
                >
                  <div className="flex items-start gap-2">
                    <span aria-hidden="true" className="text-xl">
                      {glyphForScholarshipLevel(s.level)}
                    </span>
                    <div className="flex-1">
                      <p className="font-display text-sm font-semibold text-earth-900 group-hover:text-earth-700">
                        {s.name}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-600">
                        {s.shortDescription}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {detail.programs.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-semibold text-earth-900">
              {t(locale, "tracks_programs_heading")}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {detail.programs.map((p) => (
                <Link
                  key={p.slug}
                  to={`/${locale}/programs/${p.slug}`}
                  className="group block rounded-lg border border-earth-200 bg-card p-4 transition hover:border-earth-400"
                >
                  <p className="font-display text-sm font-semibold text-earth-900 group-hover:text-earth-700">
                    {p.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-600">
                    {p.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {detail.scholarships.length === 0 && detail.programs.length === 0 && (
          <p className="rounded-lg border border-earth-200 bg-card p-6 text-center text-base text-ink-600">
            {t(locale, "tracks_empty_state")}
          </p>
        )}
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
