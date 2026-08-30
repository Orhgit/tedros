// /:lang/family/mourning — Beta Israel mourning & funeral guide (TED-138).
// The ceremony, mourning days, the tezkar (ተዝካር) memorial, burial via the
// chevra kadisha, death-related Bituach Leumi rights, and a section for
// non-Ethiopian guests at a levaya/azkara.
// JSON-LD: Article + BreadcrumbList + WebPage.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.family.mourning";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { getFamilyTopic } from "~/lib/family/topics.server";
import {
  MOURNING_CHECKLIST,
  MOURNING_GUEST_TIPS,
  MOURNING_SOURCES,
} from "~/lib/family/mourning.server";
import { familyPath, mourningPath } from "~/lib/family/links";
import { articleJsonLd, breadcrumbJsonLd, webPageJsonLd } from "~/lib/family/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

/** First published — bump dateModified in `meta` on substantive edits. */
const PUBLISHED_AT = "2026-08-30";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  const topic = getFamilyTopic("mourning");
  if (!topic) throw new Response("Not Found", { status: 404 });

  const title = topic.title[locale];
  const subtitle = topic.subtitle[locale];
  const body = topic.body[locale];
  const resources = topic.resources.map((r) => ({
    name: r.name,
    phone: r.phone,
    url: r.url,
    description: r.description[locale],
  }));
  const checklist = MOURNING_CHECKLIST.map((s) => ({
    id: s.id,
    title: s.title[locale],
    detail: s.detail[locale],
    officialUrl: s.officialUrl,
    officialLabel: s.officialLabel?.[locale],
    internalPath: s.internalPath,
    internalLabel: s.internalLabel?.[locale],
  }));
  const guestTips = MOURNING_GUEST_TIPS.map((g) => ({
    id: g.id,
    title: g.title[locale],
    detail: g.detail[locale],
  }));
  const sources = MOURNING_SOURCES.map((s) => ({
    name: s.name[locale],
    url: s.url,
  }));

  return {
    locale,
    title,
    subtitle,
    body,
    resources,
    checklist,
    guestTips,
    sources,
    publicUrl: PUBLIC_URL,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, title, subtitle, publicUrl } = data;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: subtitle },
    ...hreflangMeta(publicUrl, locale, mourningPath()),
    { property: "og:title", content: title },
    { property: "og:description", content: subtitle },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": articleJsonLd(
        { publicUrl, locale },
        {
          path: mourningPath(),
          headline: title,
          description: subtitle,
          datePublished: PUBLISHED_AT,
        },
      ),
    },
    {
      "script:ld+json": webPageJsonLd(
        { publicUrl, locale },
        { path: mourningPath(), name: title, description: subtitle },
      ),
    },
    {
      "script:ld+json": breadcrumbJsonLd({ publicUrl, locale }, [
        { name: t(locale, "family_breadcrumb_home"), path: "/" },
        { name: t(locale, "family_breadcrumb_family"), path: "/family" },
        { name: title, path: mourningPath() },
      ]),
    },
  ];
};

export default function MourningGuidePage({ loaderData }: Route.ComponentProps) {
  const { locale, title, subtitle, body, resources, checklist, guestTips, sources } =
    loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}${familyPath()}`} />
      <main id="main-content" className="container-default mx-auto max-w-4xl py-10">
        {/* Header — deliberately no stock hero image on a mourning page. */}
        <header className="mb-8 rounded-2xl border border-earth-200 bg-earth-50 px-6 py-8 sm:px-10 sm:py-12">
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "family_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}${familyPath()}`} className="hover:underline">
              {t(locale, "family_breadcrumb_family")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">{subtitle}</p>
        </header>

        {/* Checklist — the "what do I do now" answer, first. */}
        <section className="mb-10" aria-labelledby="mourning-checklist-heading">
          <h2
            id="mourning-checklist-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {locale === "he"
              ? "מה עושים כשמישהו נפטר — צעד אחר צעד"
              : locale === "am"
                ? "አንድ ሰው ሲሞት ምን ማድረግ — ደረጃ በደረጃ"
                : "What to do when someone passes away — step by step"}
          </h2>
          <ol className="space-y-4">
            {checklist.map((step, i) => (
              <li
                key={step.id}
                className="rounded-xl border border-earth-200 bg-card p-5"
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-earth-100 font-display text-base font-bold text-earth-800"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-earth-900">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-700">
                      {step.detail}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      {step.officialUrl && (
                        <a
                          href={step.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-earth-700 underline hover:text-earth-900"
                        >
                          {step.officialLabel ?? step.officialUrl} ↗
                        </a>
                      )}
                      {step.internalPath && (
                        <Link
                          to={`/${locale}${step.internalPath}`}
                          className="text-xs font-medium text-earth-700 underline hover:text-earth-900"
                        >
                          {step.internalLabel}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Full guide body */}
        <section
          className="mb-10 rounded-2xl border border-earth-200 bg-card p-6"
          aria-labelledby="mourning-guide-heading"
        >
          <h2
            id="mourning-guide-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {locale === "he"
              ? "המסורת, התזכר והזכויות — המדריך המלא"
              : locale === "am"
                ? "ባህሉ፣ ተዝካሩ እና መብቶቹ — ሙሉው መመሪያ"
                : "The tradition, the tezkar, and the rights — the full guide"}
          </h2>
          <div className="space-y-3 text-sm leading-relaxed whitespace-pre-line text-ink-700">
            {body}
          </div>
        </section>

        {/* For guests */}
        <section className="mb-10" aria-labelledby="mourning-guests-heading">
          <h2
            id="mourning-guests-heading"
            className="mb-1 font-display text-xl font-semibold text-earth-900"
          >
            {locale === "he"
              ? "לאורחים — באים לנחם משפחה מהקהילה?"
              : locale === "am"
                ? "ለእንግዶች — ከማኅበረሰቡ ቤተሰብን ለማጽናናት መጥተዋል?"
                : "For guests — coming to comfort a family from the community?"}
          </h2>
          <p className="mb-4 text-sm text-ink-600">
            {locale === "he"
              ? "מה שכדאי לדעת לפני שמגיעים ללוויה, לשבעה או לאזכרה של משפחה יוצאת אתיופיה."
              : locale === "am"
                ? "የኢትዮጵያ ተወላጅ ቤተሰብ ቀብር፣ ሺቫ ወይም አዝካራ ከመድረስዎ በፊት ማወቅ ያለብዎት።"
                : "What to know before attending a levaya, shiva, or azkara of an Ethiopian-Israeli family."}
          </p>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {guestTips.map((tip) => (
              <li key={tip.id} className="rounded-xl border border-earth-200 bg-card p-5">
                <h3 className="font-display text-base font-semibold text-earth-900">
                  {tip.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-700">{tip.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Resources */}
        <section className="mb-10" aria-labelledby="mourning-resources-heading">
          <h2
            id="mourning-resources-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {t(locale, "family_resources_heading")}
          </h2>
          <ul className="space-y-4">
            {resources.map((r) => (
              <li key={r.name} className="rounded-xl border border-earth-200 bg-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-base font-semibold text-earth-900">
                      {r.name}
                    </h3>
                    {r.phone && (
                      <a
                        href={`tel:${r.phone.replace(/[^0-9+*]/g, "")}`}
                        className="mt-1 inline-block font-display text-xl font-bold text-earth-700 hover:underline"
                        aria-label={`${r.name}: ${r.phone}`}
                      >
                        {r.phone}
                      </a>
                    )}
                    <p className="mt-1 text-sm text-ink-600">{r.description}</p>
                  </div>
                  {r.url && (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-md border border-earth-200 px-3 py-1.5 text-xs font-medium text-earth-700 transition hover:border-earth-400 hover:bg-earth-50"
                    >
                      {locale === "he" ? "לאתר" : locale === "am" ? "ድህረ ገጽ" : "Website"}{" "}
                      ↗
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Sources */}
        <section
          className="mb-10 rounded-xl border border-earth-200 bg-earth-50 p-5"
          aria-labelledby="mourning-sources-heading"
        >
          <h2
            id="mourning-sources-heading"
            className="font-display text-base font-semibold text-earth-900"
          >
            {locale === "he" ? "מקורות" : locale === "am" ? "ምንጮች" : "Sources"}
          </h2>
          <ul className="mt-2 space-y-1">
            {sources.map((s) => (
              <li key={s.url} className="text-sm text-ink-700">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-earth-900"
                >
                  {s.name} ↗
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-600">
            {locale === "he"
              ? "המנהגים משתנים ממשפחה למשפחה ומקהילה לקהילה — התיאור כאן הוא כללי. סכומי הזכויות נכונים ל-01.01.2026; בדקו תמיד את הסכום העדכני באתר ביטוח לאומי."
              : locale === "am"
                ? "ልማዶች ከቤተሰብ ወደ ቤተሰብ ይለያያሉ — እዚህ ያለው መግለጫ አጠቃላይ ነው። የመብት መጠኖች እ.ኤ.አ. 01.01.2026 ትክክል ናቸው፤ ወቅታዊውን መጠን ሁልጊዜ በብሔራዊ ኢንሹራንስ ድህረ ገጽ ያረጋግጡ።"
                : "Customs vary by family and community — the description here is general. Benefit amounts are correct as of 01.01.2026; always verify the current amount on the Bituach Leumi site."}
          </p>
        </section>

        {/* Back navigation */}
        <div className="border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}${familyPath()}`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true" className="icon-flip inline-block">
              ←
            </span>
            {t(locale, "family_breadcrumb_family")}
          </Link>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
