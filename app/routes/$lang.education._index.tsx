// /:lang/education — Education pillar landing (RIN-504 / Phase 5 Wave 1).
// Top-level entry to the education hub. Routes to scholarships (this wave),
// programs (Wave 1b), and tracks (Wave 2) once those ship.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.education._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { listScholarships } from "~/lib/db/queries/scholarships.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const scholarships = listScholarships(locale);
  const { PUBLIC_URL } = getEnv();
  return { locale, scholarshipCount: scholarships.length, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  const publicUrl = data?.publicUrl ?? "";
  return [
    { title: `${t(locale, "education_pillar_title")} — Tedros` },
    { name: "description", content: t(locale, "education_pillar_subtitle") },
    ...hreflangMeta(publicUrl, locale, "/education"),
    { property: "og:title", content: t(locale, "education_pillar_title") },
    { property: "og:description", content: t(locale, "education_pillar_subtitle") },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { property: "og:url", content: `${publicUrl}/${locale}/education` },
  ];
};

export default function EducationPillar({ loaderData }: Route.ComponentProps) {
  const { locale, scholarshipCount } = loaderData;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/education`} />
      <main id="main-content" className="container-default mx-auto max-w-5xl py-10">
        <header className="relative isolate mb-10 overflow-hidden rounded-2xl border border-earth-200 px-6 py-8 sm:px-10 sm:py-12">
          <img
            src="https://images.unsplash.com/photo-1764145177622-8317fbfe1877?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent"
            aria-hidden="true"
          />
          <div
            aria-hidden="true"
            className="absolute -inset-e-12 -top-12 size-40 rounded-full bg-accent-green/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -inset-s-16 -bottom-16 size-56 rounded-full bg-accent-yellow/10 blur-3xl"
          />
          <p className="relative text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>
          </p>
          <h1 className="relative mt-2 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "education_pillar_title")}
          </h1>
          <p className="relative mt-4 max-w-2xl text-lg leading-relaxed text-ink-700">
            {t(locale, "education_pillar_subtitle")}
          </p>
        </header>

        <section
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          aria-label={t(locale, "education_pillar_title")}
        >
          <Link
            to={`/${locale}/education/scholarships`}
            className="group block rounded-lg border border-earth-200 bg-card p-6 shadow-xs transition-all hover:-translate-y-0.5 hover:border-earth-400 hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <span aria-hidden="true" className="text-3xl">
                🎓
              </span>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold text-earth-900 group-hover:text-earth-700">
                  {t(locale, "scholarships_landing_title")}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">
                  {t(locale, "scholarships_landing_subtitle")}
                </p>
                <p className="mt-2 text-xs text-ink-500">
                  {scholarshipCount} {t(locale, "scholarships_count_label")}
                </p>
              </div>
            </div>
          </Link>

          <Link
            to={`/${locale}/education/tracks`}
            className="group block rounded-lg border border-earth-200 bg-card p-6 shadow-xs transition-all hover:-translate-y-0.5 hover:border-earth-400 hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <span aria-hidden="true" className="text-3xl">
                🧭
              </span>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold text-earth-900 group-hover:text-earth-700">
                  {t(locale, "tracks_landing_title")}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">
                  {t(locale, "tracks_landing_subtitle")}
                </p>
              </div>
            </div>
          </Link>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
