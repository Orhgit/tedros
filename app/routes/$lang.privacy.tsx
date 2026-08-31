// Privacy policy (TED-119). Lead forms across the site require consent and
// linked to /privacy, but the page never existed — collecting leads without a
// reachable policy is both a broken promise and a legal exposure.
//
// HE is source-of-truth (CLAUDE.md); EN + AM mirrored. Per ADR-020 the
// policy text lives in `~/lib/pages/privacy-copy.server.ts`; the loader
// resolves the one locale being rendered and both the component and `meta`
// read it off loader data, so only that locale reaches the browser.

import type { Route } from "./+types/$lang.privacy";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { privacyContent } from "~/lib/pages/privacy-copy.server";

const LAST_UPDATED = "2026-08-25";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();
  return { locale, publicUrl: PUBLIC_URL, content: privacyContent(locale) };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, publicUrl, content } = data;
  return [
    { title: `${content.title} — Tedros` },
    { name: "description", content: content.metaDescription },
    ...hreflangMeta(publicUrl, locale, "/privacy"),
  ];
};

export default function PrivacyPolicy({ loaderData }: Route.ComponentProps) {
  const { locale, content } = loaderData;
  return (
    <>
      <SiteHeader locale={locale} currentPath={`/${locale}/privacy`} />
      <main id="main-content" className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-earth-900">
          {content.title}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {content.updatedLabel}: {LAST_UPDATED}
        </p>
        <p className="mt-6 leading-relaxed text-gray-800 dark:text-gray-200">
          {content.intro}
        </p>
        {content.sections.map((section) => (
          <section key={section.heading} className="mt-8">
            <h2 className="text-xl font-semibold text-earth-900">{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p
                key={p}
                className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300"
              >
                {p}
              </p>
            ))}
          </section>
        ))}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
