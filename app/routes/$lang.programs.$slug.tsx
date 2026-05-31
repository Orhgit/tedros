// /:lang/programs/:slug — Program detail (RIN-424 / SEO Wave 3b).
// Renders one program with operating-org backref, fact sidebar (duration/
// location/forWhom), markdown body, related rights/terms, and
// EducationalOccupationalProgram or Service JSON-LD.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.programs.$slug";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { getGlossaryEntry } from "~/lib/db/queries/glossary.server";
import { getOrgEntry } from "~/lib/db/queries/orgs.server";
import { getProgramEntry } from "~/lib/db/queries/programs.server";
import { getRightBySlug } from "~/lib/db/queries/rights.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { PROGRAM_TRACK_TO_TAG, glyphForProgramTrack } from "~/lib/programs/categories";
import { classesForTag, tagChipClasses } from "~/lib/rights/categories";
import { renderMarkdown } from "~/lib/utils/markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.slug) {
    throw data({ error: "missing-slug" }, { status: 404 });
  }
  const entry = getProgramEntry(params.slug, locale);
  if (!entry) {
    throw data({ error: "not-found" }, { status: 404 });
  }
  const html = renderMarkdown(entry.body);
  const org = getOrgEntry(entry.orgSlug, locale);
  const relatedRights = entry.relatedRights
    .map((slug) => getRightBySlug(slug, locale))
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .map((r) => ({ slug: r.slug, title: r.title, summary: r.summary }));
  const relatedTerms = entry.relatedTerms
    .map((slug) => getGlossaryEntry(slug, locale))
    .filter((g): g is NonNullable<typeof g> => g !== null)
    .map((g) => ({ slug: g.slug, term: g.term, summary: g.summary }));
  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}/programs/${entry.slug}`;
  return { locale, entry, html, org, relatedRights, relatedTerms, shareUrl, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, entry, org, publicUrl } = data;
  const description = entry.shortDescription;
  // Educational tracks → EducationalOccupationalProgram. Others → Service.
  const isEducational =
    entry.track === "education" || entry.track === "career" || entry.track === "funding";
  const ld = isEducational
    ? {
        "@context": "https://schema.org",
        "@type": "EducationalOccupationalProgram",
        name: entry.title,
        description,
        ...(org ? { provider: { "@type": "Organization", name: org.name } } : {}),
        timeRequired: entry.duration,
        applicationDeadline: undefined,
      }
    : {
        "@context": "https://schema.org",
        "@type": "Service",
        name: entry.title,
        description,
        ...(org ? { provider: { "@type": "Organization", name: org.name } } : {}),
        areaServed: { "@type": "Country", name: "IL" },
      };
  return [
    { title: `${entry.title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, `/programs/${entry.slug}`),
    { property: "og:title", content: entry.title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": ld },
  ];
};

export default function ProgramDetail({ loaderData }: Route.ComponentProps) {
  const { locale, entry, html, org, relatedRights, relatedTerms, shareUrl } = loaderData;
  const tag = PROGRAM_TRACK_TO_TAG[entry.track];
  const tone = classesForTag(tag);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/programs`} />
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
            <Link to={`/${locale}/programs`} className="hover:underline">
              {t(locale, "programs_breadcrumb")}
            </Link>
          </p>
          <div className="mt-3 flex items-start gap-4">
            <span aria-hidden="true" className="text-4xl leading-none">
              {glyphForProgramTrack(entry.track)}
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
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to={`/${locale}/programs?track=${entry.track}`}
              className={tagChipClasses(tag)}
            >
              <span aria-hidden="true" className="me-1">
                {glyphForProgramTrack(entry.track)}
              </span>
              {t(locale, `program_track_${entry.track}`)}
            </Link>
            {org && (
              <Link to={`/${locale}/orgs/${org.slug}`} className={tagChipClasses(tag)}>
                {t(locale, "programs_operated_by_label")}: {org.name}
              </Link>
            )}
          </div>
        </header>

        {/* Fact-sheet sidebar — duration / location / for whom */}
        <section
          className={`mb-8 grid grid-cols-1 gap-3 rounded-lg border p-5 sm:grid-cols-3 ${tone.softBg} ${tone.border}`}
        >
          <div>
            <p className="text-xs font-medium text-ink-600">
              {t(locale, "programs_duration_label")}
            </p>
            <p className="mt-1 text-sm font-medium text-earth-900">{entry.duration}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-ink-600">
              {t(locale, "programs_location_label")}
            </p>
            <p className="mt-1 text-sm font-medium text-earth-900">{entry.location}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-ink-600">
              {t(locale, "programs_for_whom_label")}
            </p>
            <p className="mt-1 text-sm font-medium text-earth-900">{entry.forWhom}</p>
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
              {t(locale, "programs_related_rights_heading")}
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
              {t(locale, "programs_related_terms_heading")}
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
