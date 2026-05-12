// /:lang/orgs/:slug — Org profile detail (RIN-419 / part of RIN-417 SEO Wave 1b).
// Renders a single org with markdown body, Organization JSON-LD,
// related rights/glossary/orgs cross-links, and contact aside.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.orgs.$slug";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { getGlossaryEntry } from "~/lib/db/queries/glossary.server";
import { getOrgEntry, relatedOrgs } from "~/lib/db/queries/orgs.server";
import { getRightBySlug } from "~/lib/db/queries/rights.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { ORG_CATEGORY_TO_TAG, glyphForOrgCategory } from "~/lib/orgs/categories";
import { classesForTag, tagChipClasses } from "~/lib/rights/categories";
import { renderMarkdown } from "~/lib/utils/markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.slug) {
    throw data({ error: "missing-slug" }, { status: 404 });
  }
  const entry = getOrgEntry(params.slug, locale);
  if (!entry) {
    throw data({ error: "not-found" }, { status: 404 });
  }
  const html = renderMarkdown(entry.body);
  // Related rights / glossary terms — validate before linking so a typo in
  // the seed never produces a 404 link.
  const related = relatedOrgs(entry.slug, locale, 3);
  const relatedRightsResolved = entry.relatedRights
    .map((slug) => getRightBySlug(slug, locale))
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .map((r) => ({ slug: r.slug, title: r.title, summary: r.summary }));
  const relatedTermsResolved = entry.relatedTerms
    .map((slug) => getGlossaryEntry(slug, locale))
    .filter((g): g is NonNullable<typeof g> => g !== null)
    .map((g) => ({ slug: g.slug, term: g.term, summary: g.summary }));
  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}/orgs/${entry.slug}`;
  return {
    locale,
    entry,
    html,
    related,
    relatedRights: relatedRightsResolved,
    relatedTerms: relatedTermsResolved,
    shareUrl,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, entry } = data;
  const description = entry.shortDescription;
  return [
    { title: `${entry.name} — ${t(locale, "orgs_landing_title")} — Tedros` },
    { name: "description", content: description },
    { property: "og:title", content: entry.name },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: entry.name,
        description,
        foundingDate: String(entry.foundedYear),
        url: entry.websiteUrl,
        sameAs: [entry.websiteUrl],
        ...(entry.contactEmail ? { email: entry.contactEmail } : {}),
        address: {
          "@type": "PostalAddress",
          addressLocality: entry.headquartersCity,
          addressCountry: "IL",
        },
      },
    },
  ];
};

export default function OrgDetail({ loaderData }: Route.ComponentProps) {
  const { locale, entry, html, related, relatedRights, relatedTerms, shareUrl } =
    loaderData;
  const tag = ORG_CATEGORY_TO_TAG[entry.category];
  const tone = classesForTag(tag);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/orgs`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header
          className={`relative mb-8 overflow-hidden rounded-2xl border bg-card p-6 sm:p-10 ${tone.border}`}
        >
          <img
            src="https://images.unsplash.com/photo-1642505368560-f8b8efd2e722?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.15]"
            loading="lazy"
            decoding="async"
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
            <Link to={`/${locale}/orgs`} className="hover:underline">
              {t(locale, "orgs_breadcrumb_orgs")}
            </Link>
          </p>
          <div className="mt-3 flex items-start gap-4">
            <span aria-hidden="true" className="text-4xl leading-none">
              {glyphForOrgCategory(entry.category)}
            </span>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
                {entry.name}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-ink-700">
                {entry.shortDescription}
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to={`/${locale}/orgs?category=${entry.category}`}
              className={tagChipClasses(tag)}
            >
              <span aria-hidden="true" className="me-1">
                {glyphForOrgCategory(entry.category)}
              </span>
              {t(locale, `orgs_category_${entry.category}`)}
            </Link>
            <span className="text-xs text-ink-600">
              {t(locale, "orgs_founded_label")} {entry.foundedYear} ·{" "}
              {t(locale, "orgs_hq_label")}: {entry.headquartersCity}
            </span>
          </div>
        </header>

        <section
          className="prose prose-ink max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Tone-themed CTA aside — the official-website link */}
        <aside
          className={`mt-10 overflow-hidden rounded-lg border p-5 ${tone.softBg} ${tone.border}`}
        >
          <p className="text-sm font-medium text-earth-900">
            {t(locale, "orgs_website_label")}
          </p>
          <a
            href={entry.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-2 inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-base font-medium text-white shadow-sm transition hover:opacity-90 ${tone.accentBg}`}
          >
            <span aria-hidden="true">↗</span>
            {t(locale, "orgs_visit_website_cta")}
          </a>
          {entry.contactEmail && (
            <p className="mt-3 text-sm text-ink-700">
              {t(locale, "orgs_contact_label")}:{" "}
              <a
                href={`mailto:${entry.contactEmail}`}
                className="text-earth-800 underline hover:no-underline"
              >
                {entry.contactEmail}
              </a>
            </p>
          )}
        </aside>

        <div className="mt-6">
          <WhatsAppShare title={entry.name} url={shareUrl} locale={locale} />
        </div>

        {relatedRights.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "orgs_related_rights_heading")}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {relatedRights.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/${locale}/rights/${r.slug}`}
                    className="block rounded-lg border border-earth-200 bg-card p-4 text-sm transition hover:border-earth-400 hover:shadow-sm"
                  >
                    <span className="block font-medium text-earth-900">{r.title}</span>
                    <span className="mt-1 block text-ink-600">{r.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {relatedTerms.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "orgs_related_terms_heading")}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {relatedTerms.map((g) => (
                <li key={g.slug}>
                  <Link
                    to={`/${locale}/glossary/${g.slug}`}
                    className="block rounded-lg border border-earth-200 bg-card p-4 text-sm transition hover:border-earth-400 hover:shadow-sm"
                  >
                    <span className="block font-medium text-earth-900">{g.term}</span>
                    <span className="mt-1 block text-ink-600">{g.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "orgs_related_orgs_heading")}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {related.map((o) => (
                <li key={o.slug}>
                  <Link
                    to={`/${locale}/orgs/${o.slug}`}
                    className="block rounded-lg border border-earth-200 bg-card p-4 text-sm transition hover:border-earth-400 hover:shadow-sm"
                  >
                    <span className="block font-medium text-earth-900">{o.name}</span>
                    <span className="mt-1 block text-ink-600">{o.shortDescription}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
