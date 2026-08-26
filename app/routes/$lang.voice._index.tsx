// /:lang/voice — Voice & Action pillar landing.
//
// 3-card hub linking to: racism-report, police-conduct, community-action.
// Schema.org: WebPage + BreadcrumbList.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.voice._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import {
  voicePath,
  racismReportPath,
  policeConductPath,
  communityActionPath,
} from "~/lib/voice/links";
import { breadcrumbJsonLd, webPageJsonLd } from "~/lib/voice/schema";

const VOICE_HERO_IMG =
  "https://images.unsplash.com/photo-1764145144753-922ae256714b?fm=webp&q=70&w=1200&fit=crop";

interface VoiceCard {
  slug: string;
  titleKey: string;
  subtitleKey: string;
  href: string;
  glyph: string;
}

const VOICE_CARDS: VoiceCard[] = [
  {
    slug: "racism-report",
    titleKey: "voice_racism_title",
    subtitleKey: "voice_racism_subtitle",
    href: racismReportPath(),
    glyph: "✊",
  },
  {
    slug: "police-conduct",
    titleKey: "voice_police_title",
    subtitleKey: "voice_police_subtitle",
    href: policeConductPath(),
    glyph: "⚖️",
  },
  {
    slug: "community-action",
    titleKey: "voice_community_title",
    subtitleKey: "voice_community_subtitle",
    href: communityActionPath(),
    glyph: "🗳️",
  },
];

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();
  return { locale, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, publicUrl } = data;
  const title = t(locale, "voice_landing_title");
  const description = t(locale, "voice_landing_subtitle");
  const url = `${publicUrl}/${locale}/voice`;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, "/voice"),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { property: "og:url", content: url },
    {
      "script:ld+json": webPageJsonLd(
        { publicUrl, locale },
        { path: voicePath(), name: title, description },
      ),
    },
    {
      "script:ld+json": breadcrumbJsonLd({ publicUrl, locale }, [
        { name: t(locale, "voice_breadcrumb_home"), path: "/" },
        { name: t(locale, "voice_breadcrumb_voice"), path: "/voice" },
      ]),
    },
  ];
};

export default function VoiceLanding({ loaderData }: Route.ComponentProps) {
  const { locale } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/voice`} />

      <main id="main-content" className="container-default mx-auto max-w-5xl py-10">
        {/* Hero */}
        <header className="relative isolate mb-10 overflow-hidden rounded-2xl border border-earth-200 bg-linear-to-br from-earth-50 via-background to-accent-green/10 px-6 py-8 sm:px-10 sm:py-12">
          <img
            src={VOICE_HERO_IMG}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/90 via-earth-50/60 to-transparent"
            aria-hidden="true"
          />
          <div
            aria-hidden="true"
            className="absolute -inset-e-12 -top-12 size-40 rounded-full bg-accent-green/15 blur-3xl"
          />
          <p className="relative text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "voice_breadcrumb_home")}
            </Link>
          </p>
          <h1 className="relative mt-2 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "voice_landing_title")}
          </h1>
          <p className="relative mt-4 max-w-2xl text-lg leading-relaxed text-ink-700">
            {t(locale, "voice_landing_subtitle")}
          </p>
        </header>

        {/* 3-card grid */}
        <section aria-labelledby="voice-topics-heading">
          <h2
            id="voice-topics-heading"
            className="sr-only mb-6 font-display text-2xl font-semibold text-earth-900"
          >
            {t(locale, "voice_landing_title")}
          </h2>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {VOICE_CARDS.map((card) => (
              <li key={card.slug}>
                <Link
                  to={`/${locale}${card.href}`}
                  className="group flex h-full flex-col rounded-2xl border border-earth-200 bg-card p-6 transition hover:-translate-y-0.5 hover:border-earth-400 hover:shadow-md"
                >
                  <span aria-hidden="true" className="mb-4 block text-4xl leading-none">
                    {card.glyph}
                  </span>
                  <p className="font-display text-lg font-semibold text-earth-900 group-hover:text-earth-700">
                    {t(locale, card.titleKey)}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                    {t(locale, card.subtitleKey)}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-earth-700">
                    {t(locale, "voice_card_read_more")}
                    <span aria-hidden="true" className="icon-flip inline-block">
                      →
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Tebeka callout */}
        <aside className="mt-10 rounded-xl border border-earth-300 bg-earth-50 p-6">
          <h2 className="font-display text-base font-semibold text-earth-900">
            {locale === "he"
              ? "טבקה — ייעוץ משפטי חינמי לקהילה"
              : locale === "am"
                ? "ቴቤካ — ለማህበረሰቡ ነጻ የሕግ ምክር"
                : "Tebeka — Free legal advice for the community"}
          </h2>
          <p className="mt-1 text-sm text-ink-600">
            {locale === "he"
              ? "לתלונות על גזענות, אפליה, ואלימות משטרתית — פנו ישירות לטבקה."
              : locale === "am"
                ? "ለዘረኝነት፣ አድሎ እና ፖሊስ ጥቃት ቅሬታዎች — ቴቤካን ቀጥተኛ ያናግሩ።"
                : "For racism, discrimination, and police-violence complaints — contact Tebeka directly."}
          </p>
          <a
            href="tel:035103538"
            className="mt-3 inline-flex items-center gap-2 font-display text-2xl font-bold text-earth-700 hover:underline"
            aria-label={
              locale === "he"
                ? "התקשרו לטבקה 03-5103538"
                : locale === "am"
                  ? "ቴቤካን ይደውሉ 03-5103538"
                  : "Call Tebeka 03-5103538"
            }
          >
            03-5103538
          </a>
        </aside>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
