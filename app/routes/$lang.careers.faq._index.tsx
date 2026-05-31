// /:lang/careers/faq — FAQ landing (RIN-475 / RIN-469).
// 20 long-tail Q&A entries grouped by orderIndex with a client-side
// search input. Emits a top-level `FAQPage` JSON-LD with summarized
// Q&A pairs (rich-snippet eligible).

import { Link, useSearchParams } from "react-router";

import type { Route } from "./+types/$lang.careers.faq._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { faqsByOrder } from "~/lib/careers/faqs.server";
import { faqPath } from "~/lib/careers/links";
import { breadcrumbJsonLd, faqJsonLd } from "~/lib/careers/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const faqs = faqsByOrder().map((f) => ({
    slug: f.slug,
    question: f.question[locale] ?? f.question.he,
    shortAnswer: f.shortAnswer[locale] ?? f.shortAnswer.he,
    trackSlug: f.trackSlug,
    orderIndex: f.orderIndex,
  }));
  const { PUBLIC_URL } = getEnv();
  return { locale, faqs, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, faqs, publicUrl } = data;
  const title = t(locale, "careers_faq_landing_title");
  const description = t(locale, "careers_faq_landing_subtitle");
  const _url = `${publicUrl}/${locale}/careers/faq`;

  // Aggregate FAQPage with all 20 questions — Google can pick top entries
  // for the rich snippet without us having to author per-page schema here.
  const faqPageJsonLd = faqJsonLd(
    { publicUrl, locale },
    faqs.map((f) => ({
      question: { he: f.question, en: f.question, am: f.question },
      answer: { he: f.shortAnswer, en: f.shortAnswer, am: f.shortAnswer },
    })),
  );

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "careers_breadcrumb_careers"), path: "/careers" },
    { name: title, path: "/careers/faq" },
  ]);

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, "/careers/faq"),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { "script:ld+json": faqPageJsonLd },
    { "script:ld+json": breadcrumb },
  ];
};

export default function FaqLanding({ loaderData }: Route.ComponentProps) {
  const { locale, faqs } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q")?.toLowerCase() ?? "";

  const filtered = q
    ? faqs.filter(
        (f) =>
          f.question.toLowerCase().includes(q) || f.shortAnswer.toLowerCase().includes(q),
      )
    : faqs;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/careers`} />
      <main id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header className="mb-8">
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/careers`} className="hover:underline">
              {t(locale, "careers_breadcrumb_careers")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "careers_faq_landing_title")}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">
            {t(locale, "careers_faq_landing_subtitle")}
          </p>
        </header>

        <section className="mb-6">
          <input
            type="search"
            value={q}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams);
              if (e.target.value) params.set("q", e.target.value);
              else params.delete("q");
              setSearchParams(params, { replace: true });
            }}
            placeholder={t(locale, "careers_faq_search_placeholder")}
            className="w-full rounded-md border border-input bg-card px-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 focus:outline-none"
            aria-label={t(locale, "careers_faq_search_placeholder")}
          />
        </section>

        {filtered.length === 0 ? (
          <p className="text-center text-base text-ink-600">
            {t(locale, "careers_faq_empty_state")}
          </p>
        ) : (
          <ul className="space-y-3">
            {filtered.map((f) => (
              <li key={f.slug}>
                <Link
                  to={`/${locale}${faqPath(f.slug)}`}
                  className="block rounded-lg border border-earth-200 bg-card p-4 transition hover:border-earth-400 hover:shadow-sm"
                >
                  <p className="font-display text-base font-semibold text-earth-900">
                    {f.question}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">
                    {f.shortAnswer}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}/careers`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true">←</span>
            {t(locale, "careers_track_back_to_hub")}
          </Link>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
