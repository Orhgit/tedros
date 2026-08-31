// /:lang/about — About Tedros (Phase 3 polish).
//
// Tells visitors what the project is, the thesis behind the 3-layer model
// (Read / Do / Connect), and where to find the open code + research. Static
// page — the copy is unique to this one page, so it does not belong in the
// global messages dictionary either.
//
// Per ADR-020 the copy lives in `~/lib/pages/about-copy.server.ts`; the
// loader resolves the single locale being rendered and both the component
// and `meta` read it off loader data. `meta` cannot import the server module
// directly — `meta` is not stripped from the client build.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.about";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { aboutCopy } from "~/lib/pages/about-copy.server";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();
  return { locale, publicUrl: PUBLIC_URL, copy: aboutCopy(locale) };
}

// The two strings `meta` needs when the loader produced no data. Previously
// `meta` fell back to `COPY[DEFAULT_LOCALE]` for this case; DEFAULT_LOCALE is
// "he", so these are the same two Hebrew strings, and the emitted tags are
// unchanged. Only these two are inlined — the rest of the page copy is
// server-only (ADR-020).
const META_FALLBACK = {
  title: "אודות טדרוס",
  intro:
    "טדרוס הוא פורטל קהילתי מקיף ליוצאי אתיופיה בישראל. הפרויקט מאגד מידע, זכויות ושירותים שכבר קיימים — ומתרגם אותם לעברית, אנגלית ואמהרית — כדי להפוך קריאה לפעולה. לא רק לדעת — לקבל. לא רק לבקש — לקבל בחזרה.",
};

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  const publicUrl = data?.publicUrl ?? "http://localhost:3000";
  const c = data?.copy ?? META_FALLBACK;
  return [
    { title: `${c.title} — Tedros` },
    { name: "description", content: c.intro },
    ...hreflangMeta(publicUrl, locale, "/about"),
    { property: "og:title", content: c.title },
    { property: "og:description", content: c.intro },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${publicUrl}/#organization`,
        name: "Tedros",
        url: publicUrl,
        logo: `${publicUrl}/logo.png`,
        description:
          locale === "he"
            ? 'פורטל קהילתי מקיף ליוצאי אתיופיה בישראל — זכויות, קריירה, בריאות, נדל"ן, קהילה.'
            : locale === "am"
              ? "ለኢትዮጵያ-እስራኤላውያን ሁሉን አቀፍ ማህበረሰብ ፖርታል — መብቶች፣ ሥራ፣ ጤና፣ ሪል እስቴት።"
              : "Comprehensive community portal for Ethiopian-Israelis — rights, careers, health, real-estate.",
        foundingDate: "2026",
        areaServed: { "@type": "Country", name: "Israel" },
        audience: {
          "@type": "Audience",
          audienceType:
            locale === "he" ? "יוצאי אתיופיה בישראל" : "Ethiopian-Israeli community",
        },
        inLanguage: ["he", "en", "am"],
        sameAs: ["https://github.com/Orhgit/tedros"],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "info@tedros.co.il",
          availableLanguage: ["Hebrew", "English", "Amharic"],
        },
      },
    },
  ];
};

export default function AboutPage({ loaderData }: Route.ComponentProps) {
  const { locale, copy: c } = loaderData;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/about`} />
      <main id="main-content" className="container-default mx-auto max-w-3xl py-10">
        {/* Hero */}
        <header className="mb-10 overflow-hidden rounded-2xl border border-earth-200 px-6 py-10 sm:px-10 sm:py-14">
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {c.homeBreadcrumb}
            </Link>
          </p>
          <p className="mt-3 text-sm font-medium tracking-wide text-earth-600 uppercase">
            {c.kicker}
          </p>
          <h1 className="mt-1 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {c.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-700">{c.intro}</p>
        </header>

        {/* Three-layer model */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-earth-900 sm:text-3xl">
            {c.threeLayers.heading}
          </h2>
          <ul className="mt-6 space-y-4 text-ink-700">
            <li className="border-s-4 border-accent-green ps-4 leading-relaxed">
              {c.threeLayers.read}
            </li>
            <li className="border-s-4 border-accent-yellow ps-4 leading-relaxed">
              {c.threeLayers.do_}
            </li>
            <li className="border-s-4 border-accent-red ps-4 leading-relaxed">
              {c.threeLayers.connect}
            </li>
          </ul>
        </section>

        {/* Open source */}
        <section className="mb-12 rounded-2xl border border-earth-200 bg-earth-50 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-earth-900">
            {c.openSourceHeading}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-700">
            {c.openSourceBody}
          </p>
          <a
            href="https://github.com/Orhgit/tedros"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-base font-medium text-primary-foreground shadow-sm transition hover:bg-earth-700"
          >
            <span aria-hidden="true">↗</span>
            {c.openSourceCta}
          </a>
        </section>

        {/* Sources & methodology */}
        <section className="mb-12 rounded-2xl border border-earth-200 bg-earth-50 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-earth-900">
            {c.sourcesHeading}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-700">{c.sourcesBody}</p>
          <a
            href="https://github.com/Orhgit/tedros/tree/main/docs/research"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-base font-medium text-primary-foreground shadow-sm transition hover:bg-earth-700"
          >
            <span aria-hidden="true">↗</span>
            {c.sourcesCta}
          </a>
        </section>

        {/* CTAs to live pillars */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            to={`/${locale}/rights`}
            className="flex items-center justify-between rounded-lg border-2 border-earth-300 bg-card px-5 py-4 transition hover:border-earth-500 hover:bg-earth-50"
          >
            <span className="font-display text-lg font-semibold text-earth-900">
              {c.rightsCta}
            </span>
            <span aria-hidden="true" className="icon-flip inline-block text-earth-700">
              →
            </span>
          </Link>
          <Link
            to={`/${locale}/cities`}
            className="flex items-center justify-between rounded-lg border-2 border-earth-300 bg-card px-5 py-4 transition hover:border-earth-500 hover:bg-earth-50"
          >
            <span className="font-display text-lg font-semibold text-earth-900">
              {c.realestateCta}
            </span>
            <span aria-hidden="true" className="icon-flip inline-block text-earth-700">
              →
            </span>
          </Link>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
