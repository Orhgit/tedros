// /:lang/professionals/profile/:slug — directory-slot detail (RIN-444 / Wave 2b).
// Renders one anonymous-slot information page. Person schema is INTENTIONALLY
// NOT emitted here — these slots describe a *type* of professional, not a
// named individual. When real profs onboard, the slot becomes a real Person
// listing with sameAs/jobTitle/knowsLanguage at that point.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.professionals.profile.$slug";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { findCityBySlug, cityName } from "~/lib/cities/registry";
import { getGlossaryEntry } from "~/lib/db/queries/glossary.server";
import { getOrgEntry } from "~/lib/db/queries/orgs.server";
import { getProfessionalSlot } from "~/lib/db/queries/professionals.server";
import { getRightBySlug } from "~/lib/db/queries/rights.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import {
  PROFESSION_TO_TAG,
  glyphForProfession,
  professionMessageKey,
} from "~/lib/professionals/categories";
import { classesForTag, tagChipClasses } from "~/lib/rights/categories";
import { renderMarkdown } from "~/lib/utils/markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.slug) {
    throw data({ error: "missing-slug" }, { status: 404 });
  }
  const slot = getProfessionalSlot(params.slug, locale);
  if (!slot) {
    throw data({ error: "not-found" }, { status: 404 });
  }
  const html = renderMarkdown(slot.body);
  const city = findCityBySlug(slot.citySlug);
  // Validate cross-links so a typo in seed never produces a 404 link.
  const relatedRights = slot.relatedRights
    .map((slug) => getRightBySlug(slug, locale))
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .map((r) => ({ slug: r.slug, title: r.title, summary: r.summary }));
  const relatedTerms = slot.relatedTerms
    .map((slug) => getGlossaryEntry(slug, locale))
    .filter((g): g is NonNullable<typeof g> => g !== null)
    .map((g) => ({ slug: g.slug, term: g.term, summary: g.summary }));
  const relatedOrgs = slot.relatedOrgs
    .map((slug) => getOrgEntry(slug, locale))
    .filter((o): o is NonNullable<typeof o> => o !== null)
    .map((o) => ({
      slug: o.slug,
      name: o.name,
      shortDescription: o.shortDescription,
    }));
  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}/professionals/profile/${slot.slug}`;
  return {
    locale,
    slot,
    html,
    city,
    relatedRights,
    relatedTerms,
    relatedOrgs,
    shareUrl,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, slot } = data;
  const description = slot.shortDescription;
  return [
    { title: `${slot.title} — Tedros` },
    { name: "description", content: description },
    { property: "og:title", content: slot.title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
  ];
};

export default function ProfessionalProfile({ loaderData }: Route.ComponentProps) {
  const { locale, slot, html, city, relatedRights, relatedTerms, relatedOrgs, shareUrl } =
    loaderData;
  const tag = PROFESSION_TO_TAG[slot.profession];
  const tone = classesForTag(tag);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/professionals`} />
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
            <Link to={`/${locale}/professionals`} className="hover:underline">
              {t(locale, "professionals_breadcrumb")}
            </Link>{" "}
            /{" "}
            <Link
              to={`/${locale}/professionals/${slot.profession}`}
              className="hover:underline"
            >
              {t(locale, professionMessageKey(slot.profession))}
            </Link>
          </p>
          <div className="mt-3 flex items-start gap-4">
            <span aria-hidden="true" className="text-4xl leading-none">
              {glyphForProfession(slot.profession)}
            </span>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
                {slot.title}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-ink-700">
                {slot.shortDescription}
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to={`/${locale}/professionals/${slot.profession}`}
              className={tagChipClasses(tag)}
            >
              <span aria-hidden="true" className="me-1">
                {glyphForProfession(slot.profession)}
              </span>
              {t(locale, professionMessageKey(slot.profession))}
            </Link>
            {city && (
              <Link
                to={`/${locale}/professionals/${slot.profession}/${city.slug}`}
                className={tagChipClasses(tag)}
              >
                📍 {cityName(city, locale)}
              </Link>
            )}
          </div>
        </header>

        <section
          className="prose prose-ink max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-8">
          <WhatsAppShare title={slot.title} url={shareUrl} locale={locale} />
        </div>

        {relatedRights.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "professionals_related_rights_heading")}
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
              {t(locale, "professionals_related_orgs_heading")}
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
              {t(locale, "professionals_related_terms_heading")}
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

        <aside
          className={`mt-10 overflow-hidden rounded-lg border p-5 ${tone.softBg} ${tone.border}`}
        >
          <h2 className="text-sm font-medium text-earth-900">
            {t(locale, "professionals_join_cta_heading")}
          </h2>
          <p className="mt-2 text-sm text-ink-700">
            {t(locale, "professionals_join_cta_body")}
          </p>
          <Link
            to={`/${locale}/about`}
            className={`mt-3 inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-base font-medium text-white shadow-sm transition hover:opacity-90 ${tone.accentBg}`}
          >
            <span aria-hidden="true">→</span>
            {t(locale, "professionals_join_cta_link")}
          </Link>
        </aside>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
