// /:lang/compare/:slug — Comparison detail (RIN-421 / SEO Wave 3a).
// Renders a single X-vs-Y page: side-by-side header, criteria table, body,
// related rights/orgs/terms, and ItemList JSON-LD with both sides as items.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.compare.$slug";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import {
  COMPARISON_CATEGORY_TO_TAG,
  glyphForComparisonCategory,
} from "~/lib/comparisons/categories";
import { getComparisonEntry } from "~/lib/db/queries/comparisons.server";
import { getGlossaryEntry } from "~/lib/db/queries/glossary.server";
import { getOrgEntry } from "~/lib/db/queries/orgs.server";
import { getRightBySlug } from "~/lib/db/queries/rights.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { classesForTag, tagChipClasses } from "~/lib/rights/categories";
import { renderMarkdown } from "~/lib/utils/markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.slug) {
    throw data({ error: "missing-slug" }, { status: 404 });
  }
  const entry = getComparisonEntry(params.slug, locale);
  if (!entry) {
    throw data({ error: "not-found" }, { status: 404 });
  }
  const html = renderMarkdown(entry.body);
  const relatedRights = entry.relatedRights
    .map((slug) => getRightBySlug(slug, locale))
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .map((r) => ({ slug: r.slug, title: r.title, summary: r.summary }));
  const relatedTerms = entry.relatedTerms
    .map((slug) => getGlossaryEntry(slug, locale))
    .filter((g): g is NonNullable<typeof g> => g !== null)
    .map((g) => ({ slug: g.slug, term: g.term, summary: g.summary }));
  const relatedOrgs = entry.relatedOrgs
    .map((slug) => getOrgEntry(slug, locale))
    .filter((o): o is NonNullable<typeof o> => o !== null)
    .map((o) => ({
      slug: o.slug,
      name: o.name,
      shortDescription: o.shortDescription,
    }));
  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}/compare/${entry.slug}`;
  return {
    locale,
    entry,
    html,
    relatedRights,
    relatedTerms,
    relatedOrgs,
    shareUrl,
    publicUrl: PUBLIC_URL,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, entry, publicUrl } = data;
  const description = entry.shortDescription;
  return [
    { title: `${entry.title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, `/compare/${entry.slug}`),
    { property: "og:title", content: entry.title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: entry.title,
        description,
        numberOfItems: 2,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: entry.sideA.name,
            description: entry.sideA.tagline,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: entry.sideB.name,
            description: entry.sideB.tagline,
          },
        ],
      },
    },
  ];
};

function linkHrefFor(
  locale: Locale,
  link?: { type: "right" | "org" | "glossary"; slug: string },
): string | null {
  if (!link) return null;
  if (link.type === "right") return `/${locale}/rights/${link.slug}`;
  if (link.type === "org") return `/${locale}/orgs/${link.slug}`;
  return `/${locale}/glossary/${link.slug}`;
}

export default function ComparisonDetail({ loaderData }: Route.ComponentProps) {
  const { locale, entry, html, relatedRights, relatedTerms, relatedOrgs, shareUrl } =
    loaderData;
  const tag = COMPARISON_CATEGORY_TO_TAG[entry.category];
  const tone = classesForTag(tag);
  const sideAHref = linkHrefFor(locale, entry.sideA.link);
  const sideBHref = linkHrefFor(locale, entry.sideB.link);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/compare`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header
          className={`relative mb-8 isolate overflow-hidden rounded-2xl border p-6 sm:p-10 ${tone.border}`}
        >
          <img
            src="https://images.unsplash.com/photo-1642505368560-f8b8efd2e722?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent" aria-hidden="true" />
          <span
            aria-hidden="true"
            className={`absolute inset-s-0 inset-e-0 top-0 h-1.5 ${tone.accentBg}`}
          />
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/compare`} className="hover:underline">
              {t(locale, "comparisons_breadcrumb")}
            </Link>
          </p>
          <div className="mt-3 flex items-start gap-4">
            <span aria-hidden="true" className="text-4xl leading-none">
              {glyphForComparisonCategory(entry.category)}
            </span>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
                {entry.title}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-ink-700">
                {entry.shortDescription}
              </p>
            </div>
          </div>
          <div className="mt-5">
            <Link
              to={`/${locale}/compare?category=${entry.category}`}
              className={tagChipClasses(tag)}
            >
              {t(locale, `comparison_category_${entry.category}`)}
            </Link>
          </div>
        </header>

        {/* Side-by-side header cards */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { side: entry.sideA, href: sideAHref, label: "A" },
            { side: entry.sideB, href: sideBHref, label: "B" },
          ].map(({ side, href, label }) => {
            const card = (
              <div
                className={`rounded-lg border bg-card p-5 ${tone.border} hover:border-earth-400`}
              >
                <p className="text-xs font-medium text-ink-600">
                  {label === "A"
                    ? t(locale, "comparisons_winner_a_label")
                    : t(locale, "comparisons_winner_b_label")}
                </p>
                <h2 className="mt-1 font-display text-lg font-semibold text-earth-900">
                  {side.name}
                </h2>
                <p className="mt-1 text-sm text-ink-600">{side.tagline}</p>
              </div>
            );
            return href ? (
              <Link key={label} to={href}>
                {card}
              </Link>
            ) : (
              <div key={label}>{card}</div>
            );
          })}
        </section>

        {/* Criteria table */}
        <section className="mb-10">
          <h2 className="mb-3 font-display text-xl font-semibold text-earth-900">
            {t(locale, "comparisons_criteria_heading")}
          </h2>
          <div className="overflow-x-auto rounded-lg border border-earth-200">
            <table className="w-full text-sm">
              <thead className={`${tone.softBg} text-earth-900`}>
                <tr>
                  <th className="px-4 py-3 text-start font-semibold">·</th>
                  <th className="px-4 py-3 text-start font-semibold">
                    {entry.sideA.name}
                  </th>
                  <th className="px-4 py-3 text-start font-semibold">
                    {entry.sideB.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {entry.criteria.map((c, idx) => {
                  const wA = c.winner === "a" || c.winner === "both";
                  const wB = c.winner === "b" || c.winner === "both";
                  return (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-card" : "bg-earth-50/40"}
                    >
                      <td className="px-4 py-3 font-medium text-earth-900">{c.label}</td>
                      <td
                        className={`px-4 py-3 text-ink-700 ${wA ? "font-semibold" : ""}`}
                      >
                        {wA && (
                          <span aria-hidden="true" className="me-1">
                            ✓
                          </span>
                        )}
                        {c.a}
                      </td>
                      <td
                        className={`px-4 py-3 text-ink-700 ${wB ? "font-semibold" : ""}`}
                      >
                        {wB && (
                          <span aria-hidden="true" className="me-1">
                            ✓
                          </span>
                        )}
                        {c.b}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section
          className="prose prose-ink max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-8">
          <WhatsAppShare title={entry.title} url={shareUrl} locale={locale} />
        </div>

        {relatedRights.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "comparisons_related_rights_heading")}
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

        {relatedOrgs.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "comparisons_related_orgs_heading")}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {relatedOrgs.map((o) => (
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

        {relatedTerms.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "comparisons_related_terms_heading")}
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
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
