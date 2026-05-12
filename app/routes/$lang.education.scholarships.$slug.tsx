// /:lang/education/scholarships/:slug — Scholarship detail (RIN-504 / Phase 5 Wave 1).
// Renders a single scholarship with markdown body, EducationalOccupationalProgram
// JSON-LD, related scholarships + provider org cross-links.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.education.scholarships.$slug";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { getOrgEntry } from "~/lib/db/queries/orgs.server";
import { getRightBySlug } from "~/lib/db/queries/rights.server";
import {
  getScholarshipBySlug,
  relatedScholarships,
} from "~/lib/db/queries/scholarships.server";
import {
  SCHOLARSHIP_LEVEL_TO_TAG,
  glyphForScholarshipLevel,
} from "~/lib/education/categories";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { classesForTag, tagChipClasses } from "~/lib/rights/categories";
import { renderMarkdown } from "~/lib/utils/markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.slug) {
    throw data({ error: "missing-slug" }, { status: 404 });
  }
  const entry = getScholarshipBySlug(params.slug, locale);
  if (!entry) {
    throw data({ error: "not-found" }, { status: 404 });
  }
  const html = renderMarkdown(entry.body);
  const related = relatedScholarships(entry.slug, locale, 3);
  const provider = getOrgEntry(entry.providerOrgSlug, locale);
  const relatedRightsResolved = entry.relatedRights
    .map((slug) => getRightBySlug(slug, locale))
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .map((r) => ({ slug: r.slug, title: r.title, summary: r.summary }));
  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}/education/scholarships/${entry.slug}`;
  return {
    locale,
    entry,
    html,
    related,
    provider,
    relatedRights: relatedRightsResolved,
    shareUrl,
  };
}

function formatAmount(min: number, max: number, locale: Locale): string {
  if (min === 0 && max === 0) return t(locale, "scholarship_amount_free");
  if (min === max) return `₪${min.toLocaleString(locale)}`;
  return `₪${min.toLocaleString(locale)}–₪${max.toLocaleString(locale)}`;
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, entry } = data;
  const description = entry.shortDescription;
  return [
    { title: `${entry.name} — ${t(locale, "scholarships_landing_title")} — Tedros` },
    { name: "description", content: description },
    { property: "og:title", content: entry.name },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "EducationalOccupationalProgram",
        name: entry.name,
        description,
        url: entry.applicationUrl,
        educationalProgramMode: "full-time",
        ...(entry.amountMaxIls > 0
          ? {
              offers: {
                "@type": "Offer",
                price: entry.amountMinIls,
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
        provider: {
          "@type": "Organization",
          name: entry.providerOrgSlug,
        },
      },
    },
  ];
};

export default function ScholarshipDetail({ loaderData }: Route.ComponentProps) {
  const { locale, entry, html, related, provider, relatedRights, shareUrl } = loaderData;
  const tag = SCHOLARSHIP_LEVEL_TO_TAG[entry.level];
  const tone = classesForTag(tag);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/education/scholarships`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header
          className={`relative mb-8 isolate overflow-hidden rounded-2xl border p-6 sm:p-10 ${tone.border}`}
        >
          <img
            src="https://images.unsplash.com/photo-1764145177622-8317fbfe1877?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent" aria-hidden="true" />
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
          </p>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
            <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
              <span aria-hidden="true" className="me-2 text-3xl">
                {glyphForScholarshipLevel(entry.level)}
              </span>
              {entry.name}
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
                  to={`/${locale}/education/scholarships/${r.slug}`}
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

        {relatedRights.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 font-display text-lg font-semibold text-earth-900">
              {t(locale, "scholarship_related_rights_heading")}
            </h2>
            <ul className="space-y-2">
              {relatedRights.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/${locale}/rights/${r.slug}`}
                    className="text-sm text-earth-700 underline underline-offset-2 hover:text-earth-900"
                  >
                    {r.title}
                  </Link>
                  {r.summary && (
                    <span className="ms-2 text-xs text-ink-600">— {r.summary}</span>
                  )}
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
