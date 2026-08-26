// /:lang/rights/:slug — Rights detail page (RIN-337 / part of RIN-328).
// Renders a single right's body (markdown-rendered) with eligibility
// summary, tags, and a CTA out to the official government form. Visual
// theming follows the right's primary tag (see `lib/rights/categories.ts`).

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.rights.$slug";
import { EligibilityWizard } from "~/components/sections/eligibility-wizard";
import { RelatedRights } from "~/components/sections/related-rights";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { CITIES, cityName } from "~/lib/cities/registry";
import { getRightBySlug, relatedRights } from "~/lib/db/queries/rights.server";
import { getEnv } from "~/lib/env.server";
import { relevantCities } from "~/lib/rights/relevance";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { classesForTag, glyphForTag, tagChipClasses } from "~/lib/rights/categories";
import { extractApplicationSteps } from "~/lib/rights/extract-steps";
import { renderMarkdown } from "~/lib/utils/markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.slug) {
    throw data({ error: "missing-slug" }, { status: 404 });
  }
  const right = getRightBySlug(params.slug, locale);
  if (!right) {
    throw data({ error: "not-found" }, { status: 404 });
  }
  const html = renderMarkdown(right.body);
  const related = relatedRights(right.slug, locale, 4);
  const steps = extractApplicationSteps(right.body, locale);
  // City-level pages (rights/<slug>/<city>) existed but nothing linked to
  // them — orphan pages reachable only from the sitemap (TED-125).
  const cities = relevantCities(right.slug, CITIES).map((c) => ({
    slug: c.slug,
    name: cityName(c, locale),
  }));
  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}/rights/${right.slug}`;
  return { locale, right, html, related, steps, cities, shareUrl, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, right, steps, publicUrl } = data;
  const description = right.summary;
  // GovernmentService describes WHAT the right is; HowTo describes the
  // application steps. Emit both so Google can pick the most useful
  // rich-result variant per query.
  const ldBlocks: Array<Record<string, unknown>> = [
    {
      "@context": "https://schema.org",
      "@type": "GovernmentService",
      name: right.title,
      description,
      provider: { "@type": "GovernmentOrganization", name: "Government of Israel" },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: right.govUrl,
      },
    },
  ];
  if (steps.length >= 2) {
    ldBlocks.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: right.title,
      description,
      step: steps.map((text, idx) => ({
        "@type": "HowToStep",
        position: idx + 1,
        text,
      })),
    });
  }
  return [
    { title: `${right.title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, `/rights/${right.slug}`),
    { property: "og:title", content: right.title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    ...ldBlocks.map((b) => ({ "script:ld+json": b })),
  ];
};

export default function RightDetail({ loaderData }: Route.ComponentProps) {
  const { locale, right, html, related, cities, shareUrl } = loaderData;
  const primaryTag = right.tags[0] ?? "housing";
  const tone = classesForTag(primaryTag);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/rights`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        {/* Tone-aware hero block */}
        <header
          className={`relative isolate mb-8 overflow-hidden rounded-2xl border p-6 sm:p-10 ${tone.border}`}
        >
          <img
            src="https://images.unsplash.com/photo-1662894312546-667d7698a1f7?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/95 via-earth-50/80 to-earth-50/45"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/95 via-earth-50/80 to-earth-50/45"
            aria-hidden="true"
          />
          <span
            aria-hidden="true"
            className={`absolute inset-s-0 inset-e-0 top-0 h-1.5 ${tone.accentBg}`}
          />
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/rights`} className="hover:underline">
              {t(locale, "rights_landing_title")}
            </Link>
          </p>
          <div className="mt-3 flex items-start gap-4">
            <span aria-hidden="true" className="text-4xl leading-none">
              {glyphForTag(primaryTag)}
            </span>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
                {right.title}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-ink-700">{right.summary}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {right.tags.map((tg) => (
              <Link
                key={tg}
                to={`/${locale}/rights?tag=${tg}`}
                className={tagChipClasses(tg)}
              >
                <span aria-hidden="true" className="me-1">
                  {glyphForTag(tg)}
                </span>
                {t(locale, `rights_tag_${tg}`)}
              </Link>
            ))}
          </div>
        </header>

        {/* Body — markdown-rendered from a vetted seed (HTML-escaped). */}
        <section
          className="prose prose-ink max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Eligibility wizard — inline when the right defines a schema (RIN-338) */}
        {right.wizard && (
          <EligibilityWizard
            schema={right.wizard}
            locale={locale}
            govUrl={right.govUrl}
            primaryTag={primaryTag}
          />
        )}

        {/* Tone-themed CTA aside out to the official government form */}
        <aside
          className={`mt-10 overflow-hidden rounded-lg border p-5 ${tone.softBg} ${tone.border}`}
        >
          <p className="text-sm font-medium text-earth-900">
            {t(locale, "rights_official_form_label")}
          </p>
          <a
            href={right.govUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-2 inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-base font-medium text-white shadow-sm transition hover:opacity-90 ${tone.accentBg}`}
          >
            <span aria-hidden="true">↗</span>
            {t(locale, "rights_official_form_cta")}
          </a>
          <p className="mt-2 text-xs text-ink-600">
            {t(locale, "rights_official_form_disclaimer")}
          </p>
        </aside>

        {/* Share button — pre-filled WhatsApp message with title + URL */}
        <div className="mt-6">
          <WhatsAppShare title={right.title} url={shareUrl} locale={locale} />
        </div>

        {/* City-level pages for this right (rights/<slug>/<city>) */}
        {cities.length > 0 && (
          <section className="mt-8" aria-labelledby="right-cities-heading">
            <h2
              id="right-cities-heading"
              className="font-display text-xl font-semibold text-earth-900"
            >
              {t(locale, "rights_cities_section_title")}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/${locale}/rights/${right.slug}/${c.slug}`}
                    className="inline-flex items-center rounded-full border border-earth-300 bg-earth-100 px-3 py-1 text-sm text-earth-900 transition hover:bg-earth-200"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Related rights by tag overlap (RIN-339 / Phase-3 enrichment) */}
        <RelatedRights rights={related} locale={locale} />
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
