// /:lang/glossary/:slug — Glossary detail (RIN-418 / part of RIN-417 SEO Wave 1).
// Renders a single term with markdown body, related rights/terms cross-links,
// and DefinedTerm + BreadcrumbList JSON-LD for SEO.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.glossary.$slug";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { getGlossaryEntry, relatedGlossaryTerms } from "~/lib/db/queries/glossary.server";
import { getRightBySlug } from "~/lib/db/queries/rights.server";
import { getEnv } from "~/lib/env.server";
import { CATEGORY_TO_TAG, glyphForCategory } from "~/lib/glossary/glossary";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { classesForTag, tagChipClasses } from "~/lib/rights/categories";
import { renderMarkdown } from "~/lib/utils/markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.slug) {
    throw data({ error: "missing-slug" }, { status: 404 });
  }
  const entry = getGlossaryEntry(params.slug, locale);
  if (!entry) {
    throw data({ error: "not-found" }, { status: 404 });
  }
  const html = renderMarkdown(entry.body);
  const related = relatedGlossaryTerms(entry.slug, locale, 3);
  // Related rights: validate each slug actually resolves before we link to
  // it, so a typo in the seed doesn't ship a 404 link to users.
  const relatedRights = entry.relatedRights
    .map((slug) => getRightBySlug(slug, locale))
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .map((r) => ({ slug: r.slug, title: r.title, summary: r.summary }));
  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}/glossary/${entry.slug}`;
  return { locale, entry, html, related, relatedRights, shareUrl };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, entry } = data;
  const description = entry.summary;
  return [
    { title: `${entry.term} — ${t(locale, "glossary_landing_title")} — Tedros` },
    { name: "description", content: description },
    { property: "og:title", content: entry.term },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        name: entry.term,
        description,
        inLanguage: locale,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: t(locale, "glossary_landing_title"),
        },
      },
    },
  ];
};

export default function GlossaryDetail({ loaderData }: Route.ComponentProps) {
  const { locale, entry, html, related, relatedRights, shareUrl } = loaderData;
  const tag = CATEGORY_TO_TAG[entry.category];
  const tone = classesForTag(tag);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/glossary`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header
          className={`relative mb-8 overflow-hidden rounded-2xl border bg-card p-6 sm:p-10 ${tone.border}`}
        >
          <span
            aria-hidden="true"
            className={`absolute inset-s-0 inset-e-0 top-0 h-1.5 ${tone.accentBg}`}
          />
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/glossary`} className="hover:underline">
              {t(locale, "glossary_breadcrumb_glossary")}
            </Link>
          </p>
          <div className="mt-3 flex items-start gap-4">
            <span aria-hidden="true" className="text-4xl leading-none">
              {glyphForCategory(entry.category)}
            </span>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
                {entry.term}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-ink-700">{entry.summary}</p>
            </div>
          </div>
          <div className="mt-5">
            <Link
              to={`/${locale}/glossary?category=${entry.category}`}
              className={tagChipClasses(tag)}
            >
              <span aria-hidden="true" className="me-1">
                {glyphForCategory(entry.category)}
              </span>
              {t(locale, `glossary_category_${entry.category}`)}
            </Link>
          </div>
        </header>

        <section
          className="prose prose-ink max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {entry.sources.length > 0 && (
          <aside
            className={`mt-10 overflow-hidden rounded-lg border p-5 ${tone.softBg} ${tone.border}`}
          >
            <h2 className="text-sm font-medium text-earth-900">
              {t(locale, "glossary_sources_heading")}
            </h2>
            <ul className="mt-2 space-y-1">
              {entry.sources.map((s) => (
                <li key={s.url} className="text-sm">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-earth-800 underline hover:no-underline"
                  >
                    {s.title} ↗
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <div className="mt-6">
          <WhatsAppShare title={entry.term} url={shareUrl} locale={locale} />
        </div>

        {relatedRights.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "glossary_related_rights_heading")}
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

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "glossary_related_terms_heading")}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/${locale}/glossary/${r.slug}`}
                    className="block rounded-lg border border-earth-200 bg-card p-4 text-sm transition hover:border-earth-400 hover:shadow-sm"
                  >
                    <span className="block font-medium text-earth-900">{r.term}</span>
                    <span className="mt-1 block text-ink-600">{r.summary}</span>
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
