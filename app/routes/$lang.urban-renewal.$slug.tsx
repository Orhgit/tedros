// Urban-renewal neighborhood page — T3 template (TED-93 / ADR-016).
//
// Graduated from the TED-22 lead-only stub to a full content template:
// real per-neighborhood facts (project status, developer/authority, unit
// counts, community relevance), a legal-aid pointer into the `rights`
// content, and JSON-LD (Place + GovernmentService + BreadcrumbList +
// FAQPage backed by 3 visibly-rendered Q&As). The lead-capture form stays
// as a secondary CTA, not the only content — see docs/adr/016-urban-renewal-t3-template.md.

import { Link, isRouteErrorResponse, useRouteError } from "react-router";

import type { Route } from "./+types/$lang.urban-renewal.$slug";
import { LeadForm } from "~/components/lead-form";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { cityName, cityPath, findCityBySlug } from "~/lib/cities/registry";
import { getRightBySlug } from "~/lib/db/queries/rights.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import {
  findNeighborhoodBySlug,
  localized,
  neighborhoodName,
  URBAN_RENEWAL_PATH_PREFIX,
  type UrbanRenewalNeighborhood,
} from "~/lib/urban-renewal/registry";
import { hydrateNeighborhood } from "~/lib/urban-renewal/content.server";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  governmentServiceJsonLd,
  placeJsonLd,
  type SchemaContext,
} from "~/lib/urban-renewal/schema";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const slug = params.slug ?? "";
  const indexEntry = findNeighborhoodBySlug(slug);
  if (!indexEntry) {
    throw new Response("Neighborhood not found", { status: 404 });
  }
  // Re-attach the long-form prose here (ADR-020) so it travels as loader
  // data. `meta` below reads it off `data` — it must not import the server
  // module itself.
  const neighborhood = hydrateNeighborhood(indexEntry);
  const city = findCityBySlug(neighborhood.citySlug);
  if (!city) {
    // Registry integrity guard — every neighborhood must reference a real city.
    throw new Response("City not found for neighborhood", { status: 500 });
  }
  const legalRight = getRightBySlug(neighborhood.rightSlug, locale);
  const env = getEnv();

  return {
    locale,
    neighborhood,
    city,
    legalRight,
    turnstileSiteKey: env.TURNSTILE_SITE_KEY ?? null,
    publicUrl: env.PUBLIC_URL,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, neighborhood, city, publicUrl } = data;
  const name = neighborhoodName(neighborhood, locale);
  const city_ = cityName(city, locale);
  const title = t(locale, "urw_meta_title", { name, city: city_ });
  const description = t(locale, "urw_meta_description", { name, city: city_ });
  const path = `${URBAN_RENEWAL_PATH_PREFIX}/${neighborhood.slug}`;
  const canonical = `${publicUrl}${path}`;

  const ctx: SchemaContext = { publicUrl: publicUrl ?? "http://localhost:3000", locale };
  const breadcrumbs = breadcrumbJsonLd(ctx, [
    { name: t(locale, "urw_breadcrumb_home"), path: "/" },
    { name: city_, path: `/cities/${city.slug}` },
    { name, path },
  ]);
  const place = placeJsonLd(ctx, neighborhood, city_);
  const service = governmentServiceJsonLd(ctx, neighborhood, city_);
  const faqs = faqJsonLd(ctx, buildFaqEntries(neighborhood));

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: t(locale, "urw_keywords", { name, city: city_ }) },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { property: "og:url", content: canonical },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    ...hreflangMeta(publicUrl, locale, path),
    { "script:ld+json": breadcrumbs },
    { "script:ld+json": place },
    { "script:ld+json": service },
    { "script:ld+json": faqs },
  ];
};

/** Build a `{he,en,am}` text by running a per-locale `t()` lookup in each locale. */
function allLocales(fn: (locale: Locale) => string): {
  he: string;
  en: string;
  am: string;
} {
  return {
    he: fn("he"),
    en: fn("en"),
    am: fn("am"),
  };
}

/** Same unit-summary text the component renders — kept in one place so the
 * visible FAQ answer and the FAQPage JSON-LD never drift apart. */
function unitsText(neighborhood: UrbanRenewalNeighborhood, locale: Locale): string {
  if (neighborhood.units.note) return localized(neighborhood.units.note, locale);
  if (neighborhood.units.before !== undefined && neighborhood.units.after !== undefined) {
    return t(locale, "urw_units_before_after", {
      before: neighborhood.units.before,
      after: neighborhood.units.after,
    });
  }
  if (neighborhood.units.after !== undefined) {
    return t(locale, "urw_units_planned_only", { after: neighborhood.units.after });
  }
  return localized(neighborhood.status, locale);
}

// Shared between `meta` (JSON-LD) and the component (visible DOM) — Google
// requires FAQ schema to be backed by visible Q&As (schema-org.md §11).
function buildFaqEntries(neighborhood: UrbanRenewalNeighborhood) {
  const name = neighborhood.name;
  return [
    {
      question: allLocales((l) => t(l, "urw_faq_q_status", { name: name[l] })),
      answer: neighborhood.status,
    },
    {
      question: allLocales((l) => t(l, "urw_faq_q_units", { name: name[l] })),
      answer: allLocales((l) => unitsText(neighborhood, l)),
    },
    {
      question: allLocales((l) => t(l, "urw_faq_q_legal")),
      answer: allLocales((l) => t(l, "urw_faq_a_legal")),
    },
  ];
}

export default function UrbanRenewalNeighborhoodPage({
  loaderData,
}: Route.ComponentProps) {
  const { locale, neighborhood, city, legalRight, turnstileSiteKey } = loaderData;
  const name = neighborhoodName(neighborhood, locale);
  const cityDisplayName = cityName(city, locale);

  const faqStatusQ = t(locale, "urw_faq_q_status", { name });
  const faqUnitsQ = t(locale, "urw_faq_q_units", { name });
  const faqLegalQ = t(locale, "urw_faq_q_legal");
  const faqLegalA = t(locale, "urw_faq_a_legal");
  const statusText = localized(neighborhood.status, locale);
  const unitsSummary = unitsText(neighborhood, locale);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader
        locale={locale}
        currentPath={`/${locale}/urban-renewal/${neighborhood.slug}`}
      />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <nav aria-label="Breadcrumb" className="text-sm text-earth-700">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to={`/${locale}`} className="hover:underline">
                {t(locale, "urw_breadcrumb_home")}
              </Link>
            </li>
            <li aria-hidden className="icon-flip">
              ›
            </li>
            <li>
              <Link to={cityPath(locale, city.slug)} className="hover:underline">
                {cityDisplayName}
              </Link>
            </li>
            <li aria-hidden className="icon-flip">
              ›
            </li>
            <li aria-current="page" className="text-earth-900">
              {name}
            </li>
          </ol>
        </nav>

        <header className="mt-4">
          <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {t(locale, "urw_h1", { name, city: cityDisplayName })}
          </h1>
        </header>

        <section
          aria-labelledby="urw-status-heading"
          className="mt-8 rounded-lg border border-earth-200 bg-white p-6"
        >
          <h2 id="urw-status-heading" className="text-xl font-semibold text-earth-900">
            {t(locale, "urw_section_status_title")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-700">{statusText}</p>
        </section>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <section
            aria-labelledby="urw-authority-heading"
            className="rounded-lg border border-earth-200 bg-white p-6"
          >
            <h2
              id="urw-authority-heading"
              className="text-lg font-semibold text-earth-900"
            >
              {t(locale, "urw_section_authority_title")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              {localized(neighborhood.authority, locale)}
            </p>
          </section>

          <section
            aria-labelledby="urw-units-heading"
            className="rounded-lg border border-earth-200 bg-white p-6"
          >
            <h2 id="urw-units-heading" className="text-lg font-semibold text-earth-900">
              {t(locale, "urw_section_units_title")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">{unitsSummary}</p>
          </section>
        </div>

        <section
          aria-labelledby="urw-community-heading"
          className="mt-6 rounded-lg border border-earth-200 bg-earth-50/60 p-6"
        >
          <h2 id="urw-community-heading" className="text-xl font-semibold text-earth-900">
            {t(locale, "urw_section_community_title")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-700">
            {localized(neighborhood.communityContext, locale)}
          </p>
        </section>

        {legalRight && (
          <aside className="mt-6 overflow-hidden rounded-lg border border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-700 dark:bg-emerald-950">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
              {t(locale, "urw_section_legal_title")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-emerald-800 dark:text-emerald-200">
              {legalRight.summary}
            </p>
            <Link
              to={`/${locale}/rights/${legalRight.slug}`}
              className="mt-3 inline-flex items-center gap-2 rounded-md bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
            >
              {t(locale, "urw_legal_cta")}
              <span aria-hidden="true">↗</span>
            </Link>
          </aside>
        )}

        {/* Visible FAQ block — backs the FAQPage JSON-LD emitted in `meta` */}
        <section aria-labelledby="urw-faq-heading" className="mt-8">
          <h2 id="urw-faq-heading" className="text-xl font-semibold text-earth-900">
            {t(locale, "urw_section_faq_title")}
          </h2>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="font-medium text-earth-900">{faqStatusQ}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink-700">{statusText}</dd>
            </div>
            <div>
              <dt className="font-medium text-earth-900">{faqUnitsQ}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink-700">
                {unitsSummary}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-earth-900">{faqLegalQ}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink-700">{faqLegalA}</dd>
            </div>
          </dl>
        </section>

        {/* Lead-capture form — secondary CTA, not the page's only content */}
        <section
          aria-labelledby="urw-lead-heading"
          className="mt-10 rounded-lg border border-earth-200 bg-white p-6"
        >
          <h2 id="urw-lead-heading" className="text-xl font-semibold text-earth-900">
            {t(locale, "urw_lead_cta_title")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-700">
            {t(locale, "urw_lead_cta_body")}
          </p>
          <div className="mt-6">
            <LeadForm
              locale={locale}
              source={{ kind: "urban-renewal", slug: neighborhood.slug }}
              {...(turnstileSiteKey ? { turnstileSiteKey } : {})}
            />
          </div>
        </section>

        {neighborhood.sources.length > 0 && (
          <footer className="mt-10 border-t border-gray-200 pt-4 text-xs text-gray-500 dark:border-gray-800">
            <p className="font-medium">{t(locale, "urw_sources_title")}</p>
            <ul className="mt-1 list-inside list-disc">
              {neighborhood.sources.map((src) => (
                <li key={src}>{src}</li>
              ))}
            </ul>
          </footer>
        )}

        <div className="mt-6">
          <Link to={cityPath(locale, city.slug)} className="text-sm hover:underline">
            {t(locale, "urw_back_to_city", { city: cityDisplayName })}
          </Link>
        </div>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : 500;
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-bold">{status}</h1>
      <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
        {status === 404 ? "Neighborhood not found." : "Unexpected error."}
      </p>
    </main>
  );
}
