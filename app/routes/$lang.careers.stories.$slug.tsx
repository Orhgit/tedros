// /:lang/careers/stories/:slug — Success-story detail (RIN-475 / RIN-469).
// Renders one anonymized profile with markdown body + Article + Person
// JSON-LD. PII rules: nickname is first-name only, no real photos, body
// avoids naming specific employers without explicit consent.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.careers.stories.$slug";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { findBootcamp } from "~/lib/careers/bootcamps.server";
import {
  CAREER_TRACK_TO_TAG,
  glyphForCareerTrack,
  isCareerTrack,
} from "~/lib/careers/categories";
import { findCareerTrack } from "~/lib/careers/careers.server";
import { bootcampPath, storyPath, trackPath } from "~/lib/careers/links";
import { breadcrumbJsonLd, successStoryJsonLd } from "~/lib/careers/schema";
import { STORIES, findStory, storyBody } from "~/lib/careers/stories.server";
import { CITIES, cityName } from "~/lib/cities/registry";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { classesForTag } from "~/lib/rights/categories";
import { renderMarkdown } from "~/lib/utils/markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.slug) {
    throw data({ error: "missing-slug" }, { status: 404 });
  }
  const story = findStory(params.slug);
  if (!story) {
    throw data({ error: "not-found" }, { status: 404 });
  }

  const html = renderMarkdown(storyBody(story, locale));
  const city = CITIES.find((c) => c.slug === story.citySlug) ?? null;
  const track = isCareerTrack(story.trackSlug) ? findCareerTrack(story.trackSlug) : null;
  const programs = story.programsUsed
    .map((slug) => findBootcamp(slug))
    .filter((b): b is NonNullable<typeof b> => b !== null)
    .map((b) => ({ slug: b.slug, name: b.name[locale] ?? b.name.he }));

  // 3 sibling stories from the same track (excluding self).
  const siblings = STORIES.filter(
    (s) => s.trackSlug === story.trackSlug && s.slug !== story.slug,
  )
    .slice(0, 3)
    .map((s) => ({
      slug: s.slug,
      nickname: s.nickname[locale] ?? s.nickname.he,
      currentRole: s.currentRole[locale] ?? s.currentRole.he,
    }));

  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}${storyPath(story.slug)}`;

  return {
    locale,
    story,
    html,
    city,
    track,
    programs,
    siblings,
    shareUrl,
    publicUrl: PUBLIC_URL,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, story, city, track, publicUrl } = data;
  const nickname = story.nickname[locale] ?? story.nickname.he;
  const currentRole = story.currentRole[locale] ?? story.currentRole.he;
  const summary = story.summary[locale] ?? story.summary.he;
  const headline = `${nickname} — ${currentRole}`;
  const cityNameLocal = city ? cityName(city, locale) : story.citySlug;
  const trackName = track ? (track.name[locale] ?? track.name.he) : story.trackSlug;

  const storyJsonLd = successStoryJsonLd(
    { publicUrl, locale },
    {
      slug: story.slug,
      nickname,
      headline: { he: headline, en: headline, am: headline },
      summary: story.summary,
      trackSlug: story.trackSlug,
      currentRole: story.currentRole,
      city: { he: cityNameLocal, en: cityNameLocal, am: cityNameLocal },
      publishedAt: story.publishedAt,
    },
  );

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "careers_breadcrumb_careers"), path: "/careers" },
    { name: t(locale, "careers_stories_landing_title"), path: "/careers/stories" },
    { name: nickname, path: storyPath(story.slug) },
  ]);

  return [
    { title: `${headline} — Tedros` },
    { name: "description", content: summary },
    ...hreflangMeta(publicUrl, locale, storyPath(story.slug)),
    { property: "og:title", content: headline },
    { property: "og:description", content: summary },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": storyJsonLd },
    { "script:ld+json": breadcrumb },
    { name: "x-careers-track", content: trackName },
  ];
};

export default function StoryDetail({ loaderData }: Route.ComponentProps) {
  const { locale, story, html, city, track, programs, siblings, shareUrl } = loaderData;
  const nickname = story.nickname[locale] ?? story.nickname.he;
  const currentRole = story.currentRole[locale] ?? story.currentRole.he;
  const startingPoint = story.startingPoint[locale] ?? story.startingPoint.he;
  const cityNameLocal = city ? cityName(city, locale) : story.citySlug;
  const trackName = track ? (track.name[locale] ?? track.name.he) : story.trackSlug;
  const tag = isCareerTrack(story.trackSlug)
    ? CAREER_TRACK_TO_TAG[story.trackSlug]
    : "earth";
  const tone = classesForTag(tag);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/careers`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header
          className={`relative mb-8 isolate overflow-hidden rounded-2xl border p-6 sm:p-10 ${tone.border}`}
        >
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
          <span
            aria-hidden="true"
            className={`absolute inset-s-0 inset-e-0 top-0 h-1.5 ${tone.accentBg}`}
          />
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/careers`} className="hover:underline">
              {t(locale, "careers_breadcrumb_careers")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/careers/stories`} className="hover:underline">
              {t(locale, "careers_stories_landing_title")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {nickname} — {currentRole}
          </h1>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-ink-700 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold tracking-wide text-earth-700 uppercase">
                {t(locale, "careers_story_starting_point_label")}
              </p>
              <p className="mt-1">{startingPoint}</p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wide text-earth-700 uppercase">
                {t(locale, "careers_story_track_label")}
              </p>
              {track ? (
                <Link
                  to={`/${locale}${trackPath(track.slug)}`}
                  className="mt-1 inline-flex items-center gap-1 text-earth-800 hover:underline"
                >
                  <span aria-hidden="true">{glyphForCareerTrack(track.slug)}</span>
                  {trackName}
                </Link>
              ) : (
                <p className="mt-1">{trackName}</p>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wide text-earth-700 uppercase">
                {t(locale, "careers_story_city_label")}
              </p>
              <p className="mt-1">{cityNameLocal}</p>
            </div>
          </div>
        </header>

        <section
          className="prose prose-ink max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {programs.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "careers_story_programs_heading")}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {programs.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/${locale}${bootcampPath(p.slug)}`}
                    className="block rounded-lg border border-earth-200 bg-card p-4 text-sm transition hover:border-earth-400 hover:shadow-sm"
                  >
                    <span className="block font-medium text-earth-900">{p.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-6">
          <WhatsAppShare
            title={`${nickname} — ${currentRole}`}
            url={shareUrl}
            locale={locale}
          />
        </div>

        {siblings.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "careers_story_siblings_heading", { track: trackName })}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/${locale}${storyPath(s.slug)}`}
                    className="block rounded-lg border border-earth-200 bg-card p-4 text-sm transition hover:border-earth-400 hover:shadow-sm"
                  >
                    <span className="block font-medium text-earth-900">{s.nickname}</span>
                    <span className="mt-1 block text-ink-600">{s.currentRole}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-10 text-xs text-ink-600">
          {t(locale, "careers_stories_disclaimer")} · {story.publishedAt}
        </p>

        <div className="mt-12 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}/careers/stories`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true">←</span>
            {t(locale, "careers_stories_back_to_landing")}
          </Link>
        </div>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
