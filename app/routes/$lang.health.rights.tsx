// /:lang/health/rights — Health Rights hub (RIN-657).
//
// Lists 7 health rights for the Ethiopian-Israeli community as expandable
// article sections. Each right includes a legal citation and last-reviewed date.
//
// Schema.org: FAQPage (rights as Q&A) + BreadcrumbList.
// YMYL: HealthDisclaimer rendered on every render.
// CTA: links to /rights (main rights hub).

import { Link } from "react-router";

import type { Route } from "./+types/$lang.health.rights";
import { HealthDisclaimer } from "~/components/health/health-disclaimer";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { getEnv } from "~/lib/env.server";
import {
  HEALTH_RIGHTS,
  rightTitle,
  rightBody,
  rightLegalBasis,
} from "~/lib/health/rights.server";
import { breadcrumbJsonLd, faqJsonLd } from "~/lib/health/schema";
import { healthPath } from "~/lib/health/links";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  const rights = HEALTH_RIGHTS.map((r) => ({
    slug: r.slug,
    title: rightTitle(r, locale),
    body: rightBody(r, locale),
    legalBasis: rightLegalBasis(r, locale),
    lastReviewed: r.lastReviewed,
  }));

  return { locale, rights, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, publicUrl, rights } = data;
  const title = t(locale, "health_rights_title");
  const description = t(locale, "health_rights_subtitle");
  const url = `${publicUrl}/${locale}/health/rights`;

  const faqSchema = faqJsonLd(
    { publicUrl, locale },
    rights.map((r) => ({
      question: r.title,
      answer: r.body.split("\n")[0] ?? r.body,
    })),
  );

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "health_breadcrumb_home"), path: "/" },
    { name: t(locale, "health_breadcrumb_health"), path: "/health" },
    { name: title, path: "/health/rights" },
  ]);

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": faqSchema },
    { "script:ld+json": breadcrumb },
  ];
};

export default function HealthRights({ loaderData }: Route.ComponentProps) {
  const { locale, rights } = loaderData;
  const title = t(locale, "health_rights_title");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/health`} />

      <main id="main-content" className="container-default mx-auto max-w-3xl py-10">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-ink-600">
          <Link to={`/${locale}`} className="hover:underline">
            {t(locale, "health_breadcrumb_home")}
          </Link>
          {" / "}
          <Link to={`/${locale}${healthPath()}`} className="hover:underline">
            {t(locale, "health_breadcrumb_health")}
          </Link>
          {" / "}
          <span aria-current="page">{title}</span>
        </nav>

        {/* Page header */}
        <header className="relative mb-8 isolate overflow-hidden rounded-2xl border border-earth-200 p-6 sm:p-10">
          <img
            src="https://images.unsplash.com/photo-1625255178547-44af3d0718c3?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent" aria-hidden="true" />
          <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">
            {t(locale, "health_rights_subtitle")}
          </p>
        </header>

        {/* YMYL Disclaimer */}
        <HealthDisclaimer locale={locale} variant="standard" />

        {/* Rights list */}
        <ol className="space-y-6">
          {rights.map((right, index) => (
            <li
              key={right.slug}
              id={right.slug}
              className="rounded-2xl border border-earth-200 bg-card p-5 sm:p-6"
            >
              <div className="flex items-start gap-4">
                {/* Index badge */}
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-earth-100 font-display text-sm font-bold text-earth-800"
                >
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-lg font-semibold text-earth-900">
                    {right.title}
                  </h2>

                  {/* Body — paragraphs separated by blank lines */}
                  <div className="mt-3 space-y-3">
                    {right.body.split("\n\n").map((para, pIdx) => (
                      <p key={pIdx} className="text-sm leading-relaxed text-ink-700">
                        {para.trim()}
                      </p>
                    ))}
                  </div>

                  {/* Legal basis */}
                  {right.legalBasis && (
                    <p className="mt-4 rounded-md bg-earth-50 px-3 py-2 text-xs text-ink-600">
                      <span className="font-semibold">
                        {t(locale, "health_rights_legal_basis_label")}:{" "}
                      </span>
                      {right.legalBasis}
                    </p>
                  )}

                  {/* Last reviewed */}
                  <p className="mt-2 text-xs text-ink-500">
                    {t(locale, "health_rights_last_reviewed_label")}: {right.lastReviewed}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* CTA — link to main rights hub */}
        <div className="mt-10 rounded-xl border border-earth-200 bg-earth-50 p-5 text-center">
          <p className="mb-3 text-sm text-ink-700">
            {t(locale, "health_rights_subtitle")}
          </p>
          <Link
            to={`/${locale}/rights`}
            className="inline-flex items-center gap-2 rounded-lg bg-earth-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-earth-900"
          >
            {t(locale, "health_rights_back_to_rights_cta")}
            <span aria-hidden="true">←</span>
          </Link>
        </div>

        {/* Back link */}
        <div className="mt-8 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}${healthPath()}`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true">←</span>
            {t(locale, "health_back_to_hub")}
          </Link>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
