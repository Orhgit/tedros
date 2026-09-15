// /:lang/education/scholarships/guides — application-guide index (TED-168).
//
// The static `guides` segment outranks the `:slug` scholarship route and the
// `:slug/:city` cell route in React Router's ranking, so no redirect gymnastics
// are needed here.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.education.scholarships.guides._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { listScholarshipGuides } from "~/lib/db/queries/scholarship-guides.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { formatDate } from "~/lib/i18n/format";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();
  return { locale, guides: listScholarshipGuides(locale), publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  const publicUrl = data?.publicUrl ?? "http://localhost:3000";
  const title = t(locale, "scholarship_guides_landing_title");
  const description = t(locale, "scholarship_guides_landing_subtitle");
  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, "/education/scholarships/guides"),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
  ];
};

export default function ScholarshipGuidesIndex({ loaderData }: Route.ComponentProps) {
  const { locale, guides } = loaderData;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader
        locale={locale}
        currentPath={`/${locale}/education/scholarships/guides`}
      />
      <main id="main-content" className="container-default mx-auto max-w-4xl py-10">
        <header className="mb-10 rounded-2xl border border-earth-200 px-6 py-8 sm:px-10 sm:py-12">
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>
            {" / "}
            <Link to={`/${locale}/education`} className="hover:underline">
              {t(locale, "education_pillar_title")}
            </Link>
            {" / "}
            <Link to={`/${locale}/education/scholarships`} className="hover:underline">
              {t(locale, "scholarships_landing_title")}
            </Link>
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "scholarship_guides_landing_title")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-700">
            {t(locale, "scholarship_guides_landing_subtitle")}
          </p>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.slug}
              to={`/${locale}/education/scholarships/guides/${g.slug}`}
              className="group block rounded-lg border border-earth-200 bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-earth-400 hover:shadow-md"
            >
              <h2 className="font-display text-base font-semibold text-earth-900 group-hover:text-earth-700">
                {g.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{g.summary}</p>
              <p className="mt-3 text-xs text-ink-600">
                {t(locale, "scholarship_guide_updated", {
                  date: formatDate(locale, g.updated),
                })}
              </p>
            </Link>
          ))}
        </section>

        <p className="mt-10 text-sm">
          <Link
            to={`/${locale}/education/scholarships`}
            className="text-earth-700 underline underline-offset-2 hover:text-earth-900"
          >
            {t(locale, "scholarship_guide_back_to_scholarships")}
          </Link>
        </p>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
