// /:lang/education/scholarships/:slug/:city — Programmatic SEO cell (RIN-508).
//
// One page per (scholarship × city) where the city is in the
// SCHOLARSHIP_RELEVANCE_CITIES top-community set. Inherits the scholarship's
// body content but adds a city overlay: localized title prefix + the
// city's community context. Long-tail SEO that targets searches like
// "מלגת ISEF בנתניה" — Kol-Zchut and competitor sites don't index these.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.education.scholarships.$slug_.$city";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { findCityBySlug, cityName, cityOverview } from "~/lib/cities/registry";
import { getOrgEntry } from "~/lib/db/queries/orgs.server";
import {
  getScholarshipBySlug,
  relatedScholarships,
  listScholarships,
} from "~/lib/db/queries/scholarships.server";
import {
  SCHOLARSHIP_LEVEL_TO_TAG,
  glyphForScholarshipLevel,
} from "~/lib/education/categories";
import { isScholarshipCellRelevant } from "~/lib/education/scholarship-relevance";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { classesForTag, tagChipClasses } from "~/lib/rights/categories";
import { renderMarkdown } from "~/lib/utils/markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.slug || !params.city) {
    throw data({ error: "missing-params" }, { status: 404 });
  }
  const entry = getScholarshipBySlug(params.slug, locale);
  const city = findCityBySlug(params.city);
  if (!entry || !city) {
    throw data({ error: "not-found" }, { status: 404 });
  }
  if (!isScholarshipCellRelevant(city.slug)) {
    throw data({ error: "not-relevant" }, { status: 404 });
  }
  const html = renderMarkdown(entry.body);
  const related = relatedScholarships(entry.slug, locale, 3);
  const provider = getOrgEntry(entry.providerOrgSlug, locale);
  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}/education/scholarships/${entry.slug}/${city.slug}`;
  const cityScholarships = listScholarships(locale)
    .filter((s) => s.slug !== entry.slug && isScholarshipCellRelevant(city.slug))
    .slice(0, 4);
  return {
    locale,
    entry,
    city,
    html,
    related,
    provider,
    publicUrl: PUBLIC_URL,
    shareUrl,
    cityScholarships,
  };
}

function prepFor(locale: Locale): string {
  return locale === "en" ? "in " : locale === "am" ? "በ" : "ב";
}

function formatAmount(min: number, max: number, locale: Locale): string {
  if (min === 0 && max === 0) return t(locale, "scholarship_amount_free");
  if (min === max) return `₪${min.toLocaleString(locale)}`;
  return `₪${min.toLocaleString(locale)}–₪${max.toLocaleString(locale)}`;
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, entry, city, publicUrl } = data;
  const cityNameLocal = cityName(city, locale);
  const prep = prepFor(locale);
  const title = `${entry.name} ${prep}${cityNameLocal} — Tedros`;
  const description = `${entry.shortDescription} ${prep}${cityNameLocal}.`;
  const path = `/education/scholarships/${entry.slug}/${city.slug}`;
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    ...hreflangMeta(publicUrl, locale, path),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "EducationalOccupationalProgram",
        name: `${entry.name} — ${cityNameLocal}`,
        description: entry.shortDescription,
        url: entry.applicationUrl,
        ...(entry.amountMaxIls > 0
          ? {
              offers: {
                "@type": "Offer",
                priceCurrency: "ILS",
                priceSpecification: {
                  "@type": "PriceSpecification",
                  minPrice: entry.amountMinIls,
                  maxPrice: entry.amountMaxIls,
                  priceCurrency: "ILS",
                },
              },
            }
          : {}),
      },
    },
  ];
};

export default function ScholarshipCityCell({ loaderData }: Route.ComponentProps) {
  const { locale, entry, city, html, related, provider, shareUrl, cityScholarships } =
    loaderData;
  const cityNameLocal = cityName(city, locale);
  const prep = prepFor(locale);
  const overview = cityOverview(city, locale);
  const tag = SCHOLARSHIP_LEVEL_TO_TAG[entry.level];
  const tone = classesForTag(tag);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/education/scholarships`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header
          className={`relative isolate mb-8 overflow-hidden rounded-2xl border p-6 sm:p-10 ${tone.border}`}
        >
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
          <span
            aria-hidden="true"
            className={`absolute inset-s-0 inset-e-0 top-0 h-1.5 ${tone.accentBg}`}
          />
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
            {" / "}
            <Link
              to={`/${locale}/education/scholarships/${entry.slug}`}
              className="hover:underline"
            >
              {entry.name}
            </Link>
          </p>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
            <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
              <span aria-hidden="true" className="me-2 text-3xl">
                {glyphForScholarshipLevel(entry.level)}
              </span>
              {entry.name} {prep}
              {cityNameLocal}
            </h1>
            <span className={tagChipClasses(tag)}>
              {t(locale, `scholarship_level_${entry.level.replace(/-/g, "_")}`)}
            </span>
          </div>
          <p className="mt-3 text-base leading-relaxed text-ink-700">
            {entry.shortDescription}
          </p>
        </header>

        <aside className="mb-8 grid grid-cols-1 gap-3 rounded-lg border border-earth-200 bg-card p-5 sm:grid-cols-3">
          <div>
            <p className="text-xs font-medium text-ink-600">
              {t(locale, "scholarship_amount_label")}
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-earth-900">
              {formatAmount(entry.amountMinIls, entry.amountMaxIls, locale)}
            </p>
            <p className="text-xs text-ink-600">{entry.amountNote}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-ink-600">
              {t(locale, "scholarship_deadline_label")}
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-earth-900">
              {entry.deadline === "rolling"
                ? t(locale, "scholarship_deadline_rolling")
                : entry.deadline}
            </p>
          </div>
          <div className="flex items-end">
            <a
              href={entry.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-md bg-earth-800 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-earth-700"
            >
              {t(locale, "scholarship_apply_cta")} →
            </a>
          </div>
        </aside>

        {overview && (
          <section className="mb-10 rounded-lg border border-earth-200 bg-earth-50/50 p-5">
            <h2 className="font-display text-lg font-semibold text-earth-900">
              {t(locale, "rights_city_context_heading")} {cityNameLocal}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">{overview}</p>
            <p className="mt-3 text-sm">
              <Link
                to={`/${locale}/cities/${city.slug}`}
                className="text-earth-700 underline underline-offset-2 hover:text-earth-900"
              >
                {t(locale, "rights_city_more_link")}
              </Link>
            </p>
          </section>
        )}

        <div
          className="prose prose-sm prose-headings:font-display prose-headings:text-earth-900 prose-a:text-earth-700 prose-a:underline-offset-2 hover:prose-a:underline max-w-none text-ink-700"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {provider && (
          <section className="mt-10 rounded-lg border border-earth-200 bg-card p-5">
            <h2 className="font-display text-lg font-semibold text-earth-900">
              {t(locale, "scholarship_provider_heading")}
            </h2>
            <Link
              to={`/${locale}/orgs/${provider.slug}`}
              className="group mt-3 block rounded-md border border-earth-200 p-4 transition hover:border-earth-400"
            >
              <p className="font-display text-base font-semibold text-earth-900 group-hover:text-earth-700">
                {provider.name}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">
                {provider.shortDescription}
              </p>
            </Link>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 font-display text-lg font-semibold text-earth-900">
              {t(locale, "scholarship_similar_heading")}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/${locale}/education/scholarships/${r.slug}/${city.slug}`}
                  className="group block rounded-md border border-earth-200 bg-card p-4 transition hover:border-earth-400"
                >
                  <p className="font-display text-sm font-semibold text-earth-900 group-hover:text-earth-700">
                    {r.name}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-600">
                    {r.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {cityScholarships.length > 0 && (
          <section className="mt-10 rounded-2xl border border-earth-200 bg-earth-50 p-5">
            <h2 className="text-sm font-semibold tracking-wide text-earth-900 uppercase">
              {t(locale, "education_scholarships_title")} — {cityName(city, locale)}
            </h2>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {cityScholarships.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/${locale}/education/scholarships/${s.slug}/${city.slug}`}
                    className="flex items-start gap-2 rounded-lg border border-earth-200 bg-white p-3 text-sm transition hover:border-earth-400"
                  >
                    <span aria-hidden="true" className="text-lg leading-none">
                      {glyphForScholarshipLevel(s.level)}
                    </span>
                    <span className="text-ink-800">{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-10 border-t border-earth-200 pt-6">
          <WhatsAppShare locale={locale} url={shareUrl} title={entry.name} />
        </div>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
