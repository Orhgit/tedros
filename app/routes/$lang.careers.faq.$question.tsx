// /:lang/careers/faq/:question — FAQ detail (RIN-475 / RIN-469).
// One-question-per-page rendering with `FAQPage` JSON-LD that's rich-snippet
// eligible. The body is markdown rendered via the shared helper so links
// to other verticals stay clickable.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.careers.faq.$question";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { findCareerTrack } from "~/lib/careers/careers.server";
import { faqBody, faqsByOrder, findFaq } from "~/lib/careers/faqs.server";
import { faqPath, trackPath } from "~/lib/careers/links";
import { breadcrumbJsonLd, faqJsonLd } from "~/lib/careers/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { renderMarkdown } from "~/lib/utils/markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.question) {
    throw data({ error: "missing-slug" }, { status: 404 });
  }
  const faq = findFaq(params.question);
  if (!faq) {
    throw data({ error: "not-found" }, { status: 404 });
  }

  const html = renderMarkdown(faqBody(faq, locale));
  const track = faq.trackSlug ? findCareerTrack(faq.trackSlug) : null;

  // 3 cross-link FAQs in the same order range (excluding self).
  const allFaqs = faqsByOrder();
  const idx = allFaqs.findIndex((f) => f.slug === faq.slug);
  const related = [allFaqs[idx - 1], allFaqs[idx + 1], allFaqs[idx + 2]]
    .filter((f): f is NonNullable<typeof f> => f !== undefined)
    .slice(0, 3)
    .map((f) => ({
      slug: f.slug,
      question: f.question[locale] ?? f.question.he,
    }));

  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}${faqPath(faq.slug)}`;

  return { locale, faq, html, track, related, shareUrl, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, faq, publicUrl } = data;
  const question = faq.question[locale] ?? faq.question.he;
  const description = faq.shortAnswer[locale] ?? faq.shortAnswer.he;

  const faqPageJsonLd = faqJsonLd({ publicUrl, locale }, [
    { question: faq.question, answer: faq.shortAnswer },
  ]);

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "careers_breadcrumb_careers"), path: "/careers" },
    { name: t(locale, "careers_faq_landing_title"), path: "/careers/faq" },
    { name: question, path: faqPath(faq.slug) },
  ]);

  return [
    { title: `${question} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, faqPath(faq.slug)),
    { property: "og:title", content: question },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": faqPageJsonLd },
    { "script:ld+json": breadcrumb },
  ];
};

export default function FaqDetail({ loaderData }: Route.ComponentProps) {
  const { locale, faq, html, track, related, shareUrl } = loaderData;
  const question = faq.question[locale] ?? faq.question.he;
  const shortAnswer = faq.shortAnswer[locale] ?? faq.shortAnswer.he;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/careers`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header className="relative mb-8 isolate overflow-hidden rounded-2xl border border-earth-200 px-6 py-8 sm:px-10 sm:py-12">
          <img
            src="https://images.unsplash.com/photo-1691820776176-fcfbd25096c9?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent" aria-hidden="true" />
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/careers`} className="hover:underline">
              {t(locale, "careers_breadcrumb_careers")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/careers/faq`} className="hover:underline">
              {t(locale, "careers_faq_landing_title")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {question}
          </h1>
        </header>

        <aside className="mb-8 rounded-2xl border border-accent-yellow/40 bg-accent-yellow/10 p-5">
          <p className="text-xs font-semibold tracking-wide text-earth-900 uppercase">
            {t(locale, "careers_faq_tldr_label")}
          </p>
          <p className="mt-2 text-base leading-relaxed text-ink-800">{shortAnswer}</p>
        </aside>

        <section
          className="prose prose-ink max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-10 flex flex-wrap items-center gap-3">
          {track && (
            <Link
              to={`/${locale}${trackPath(track.slug)}`}
              className="inline-flex items-center rounded-full border border-earth-200 bg-card px-3 py-1 text-sm text-earth-800 transition hover:border-earth-400 hover:bg-earth-50"
            >
              {track.name[locale] ?? track.name.he} →
            </Link>
          )}
          <span className="text-xs text-ink-600">
            {t(locale, "careers_faq_reviewed_label")}: {faq.reviewedAt}
          </span>
        </div>

        <div className="mt-6">
          <WhatsAppShare title={question} url={shareUrl} locale={locale} />
        </div>

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "careers_faq_related_heading")}
            </h2>
            <ul className="mt-4 space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/${locale}${faqPath(r.slug)}`}
                    className="block rounded-md border border-earth-200 bg-card p-3 text-sm text-earth-800 transition hover:border-earth-400 hover:shadow-sm"
                  >
                    {r.question}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}/careers/faq`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true">←</span>
            {t(locale, "careers_faq_back_to_landing")}
          </Link>
        </div>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
