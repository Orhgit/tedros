// /:lang/education/scholarships/guides/:slug — a hand-written application guide
// (TED-168). Article + FAQPage + BreadcrumbList JSON-LD.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.education.scholarships.guides.$slug";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { getScholarshipGuideBySlug } from "~/lib/db/queries/scholarship-guides.server";
import { getScholarshipBySlug } from "~/lib/db/queries/scholarships.server";
import {
  breadcrumbJsonLd,
  educationArticleJsonLd,
  faqPageJsonLd,
} from "~/lib/education/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { formatDate } from "~/lib/i18n/format";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { renderMarkdown } from "~/lib/utils/markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.slug) {
    throw data({ error: "missing-slug" }, { status: 404 });
  }
  const guide = getScholarshipGuideBySlug(params.slug, locale);
  if (!guide) {
    throw data({ error: "not-found" }, { status: 404 });
  }
  const html = renderMarkdown(guide.body);
  const related = guide.relatedScholarships
    .map((slug) => getScholarshipBySlug(slug, locale))
    .filter((s): s is NonNullable<typeof s> => s !== null)
    .map((s) => ({ slug: s.slug, name: s.name, shortDescription: s.shortDescription }));
  const { PUBLIC_URL } = getEnv();
  return {
    locale,
    guide,
    html,
    related,
    publicUrl: PUBLIC_URL,
    shareUrl: `${PUBLIC_URL}/${locale}/education/scholarships/guides/${guide.slug}`,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, guide, publicUrl } = data;
  const path = `/education/scholarships/guides/${guide.slug}`;
  const ctx = { publicUrl, locale };
  return [
    { title: `${guide.title} — Tedros` },
    { name: "description", content: guide.summary },
    ...hreflangMeta(publicUrl, locale, path),
    { property: "og:title", content: guide.title },
    { property: "og:description", content: guide.summary },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": educationArticleJsonLd(ctx, {
        path,
        headline: guide.title,
        description: guide.summary,
        datePublished: guide.updated,
      }),
    },
    { "script:ld+json": faqPageJsonLd(ctx, path, guide.faqs) },
    {
      "script:ld+json": breadcrumbJsonLd(ctx, [
        { name: t(locale, "education_pillar_title"), path: "/education" },
        {
          name: t(locale, "scholarships_landing_title"),
          path: "/education/scholarships",
        },
        {
          name: t(locale, "scholarship_guides_landing_title"),
          path: "/education/scholarships/guides",
        },
        { name: guide.title, path },
      ]),
    },
  ];
};

export default function ScholarshipGuideDetail({ loaderData }: Route.ComponentProps) {
  const { locale, guide, html, related, shareUrl } = loaderData;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader
        locale={locale}
        currentPath={`/${locale}/education/scholarships/guides`}
      />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header className="mb-8 rounded-2xl border border-earth-200 p-6 sm:p-10">
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>
            {" / "}
            <Link to={`/${locale}/education/scholarships`} className="hover:underline">
              {t(locale, "scholarships_landing_title")}
            </Link>
            {" / "}
            <Link
              to={`/${locale}/education/scholarships/guides`}
              className="hover:underline"
            >
              {t(locale, "scholarship_guides_landing_title")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-700">{guide.summary}</p>
          <p className="mt-3 text-xs text-ink-600">
            {t(locale, "scholarship_guide_updated", {
              date: formatDate(locale, guide.updated),
            })}
          </p>
        </header>

        <div
          className="prose prose-sm prose-headings:font-display prose-headings:text-earth-900 prose-a:text-earth-700 prose-a:underline-offset-2 hover:prose-a:underline max-w-none text-ink-700"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {guide.faqs.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 font-display text-lg font-semibold text-earth-900">
              {t(locale, "scholarship_guide_faq_heading")}
            </h2>
            <dl className="space-y-4">
              {guide.faqs.map((f) => (
                <div
                  key={f.question}
                  className="rounded-lg border border-earth-200 bg-card p-4"
                >
                  <dt className="font-display text-sm font-semibold text-earth-900">
                    {f.question}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-700">
                    {f.answer}
                  </dd>
                </div>
              ))}
            </dl>
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

        <div className="mt-10 border-t border-earth-200 pt-6">
          <WhatsAppShare locale={locale} url={shareUrl} title={guide.title} />
        </div>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
