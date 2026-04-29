// /:lang/rights/:slug — Rights detail page (RIN-337 / part of RIN-328).
// Renders a single right's body (markdown-rendered) with eligibility
// summary, tags, and a CTA out to the official government form.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.rights.$slug";
import { getRightBySlug } from "~/lib/db/queries/rights.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
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
  return { locale, right, html };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, right } = data;
  const description = right.summary;
  return [
    { title: `${right.title} — Tedros` },
    { name: "description", content: description },
    { property: "og:title", content: right.title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": {
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
    },
  ];
};

export default function RightDetail({ loaderData }: Route.ComponentProps) {
  const { locale, right, html } = loaderData;
  return (
    <article className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <div className="container-default mx-auto max-w-3xl py-10">
        <p className="text-sm font-medium text-earth-700">
          <Link to={`/${locale}`} className="hover:underline">
            {t(locale, "rights_breadcrumb_home")}
          </Link>{" "}
          /{" "}
          <Link to={`/${locale}/rights`} className="hover:underline">
            {t(locale, "rights_landing_title")}
          </Link>
        </p>
        <header className="mt-3 mb-6">
          <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {right.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">{right.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {right.tags.map((tg) => (
              <Link
                key={tg}
                to={`/${locale}/rights?tag=${tg}`}
                className="rounded-full bg-earth-100 px-2.5 py-0.5 text-xs text-earth-900 hover:bg-earth-200"
              >
                {t(locale, `rights_tag_${tg}`)}
              </Link>
            ))}
          </div>
        </header>

        <section
          className="prose prose-ink max-w-none"
          // Body is rendered from a vetted internal seed source — escapeHtml
          // is applied by the markdown renderer for any inline HTML.
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <aside className="mt-10 rounded-lg border border-earth-200 bg-earth-50 p-5">
          <p className="text-sm font-medium text-earth-900">
            {t(locale, "rights_official_form_label")}
          </p>
          <a
            href={right.govUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-base font-medium text-primary-foreground shadow-sm transition hover:bg-earth-700"
          >
            {t(locale, "rights_official_form_cta")}
          </a>
          <p className="mt-2 text-xs text-ink-600">
            {t(locale, "rights_official_form_disclaimer")}
          </p>
        </aside>
      </div>
    </article>
  );
}
