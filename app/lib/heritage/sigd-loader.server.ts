// Shared loader payload for the three Sigd season routes (TED-169).
//
// The three routes differ only in which `SigdPage` they render and which
// siblings they cross-link, so the assembly lives here once. Keeps the copy
// in the content module (ADR-020) and out of the route files.

import type { SigdSeasonEventRow } from "~/components/sections/sigd-season-article";
import { getEnv } from "../env.server";
import { formatDate } from "../i18n/format";
import type { Locale } from "../i18n/config";
import { t } from "../i18n/messages";
import { renderMarkdown } from "../utils/markdown";
import { eventPath, sigdEventsPath, sigdGuestsPath, sigdSchoolsPath } from "./links";
import { breadcrumbJsonLd, heritageArticleJsonLd, type JsonLd } from "./schema";
import {
  SIGD_5787_DATE,
  SIGD_5787_HEBREW_DATE,
  SIGD_EVENTS_2026,
  SIGD_EVENTS_PAGE,
  SIGD_GUESTS_PAGE,
  SIGD_SCHOOLS_PAGE,
  SIGD_SEASON_PUBLISHED,
  type SigdPage,
  sigdPageBody,
  sigdPageDescription,
  sigdPageTitle,
} from "./sigd.server";
import { sigdMenuPath } from "../culinary/links";

export type SigdSeasonKind = "events" | "schools" | "guests";

const PAGES: Record<SigdSeasonKind, SigdPage> = {
  events: SIGD_EVENTS_PAGE,
  schools: SIGD_SCHOOLS_PAGE,
  guests: SIGD_GUESTS_PAGE,
};

const PATHS: Record<SigdSeasonKind, string> = {
  events: sigdEventsPath(),
  schools: sigdSchoolsPath(),
  guests: sigdGuestsPath(),
};

function relatedFor(kind: SigdSeasonKind, locale: Locale) {
  const guide = {
    path: eventPath("sigd"),
    label: t(locale, "sigd_related_guide_label"),
    description: t(locale, "sigd_related_guide_desc"),
  };
  const events = {
    path: sigdEventsPath(),
    label: t(locale, "sigd_related_events_label"),
    description: t(locale, "sigd_related_events_desc"),
  };
  const schools = {
    path: sigdSchoolsPath(),
    label: t(locale, "sigd_related_schools_label"),
    description: t(locale, "sigd_related_schools_desc"),
  };
  const guests = {
    path: sigdGuestsPath(),
    label: t(locale, "sigd_related_guests_label"),
    description: t(locale, "sigd_related_guests_desc"),
  };
  const menu = {
    path: sigdMenuPath(),
    label: t(locale, "sigd_related_menu_label"),
    description: t(locale, "sigd_related_menu_desc"),
  };

  if (kind === "events") return [guide, schools, guests, menu];
  if (kind === "schools") return [guide, events, guests, menu];
  return [guide, events, schools, menu];
}

export function sigdSeasonPayload(kind: SigdSeasonKind, locale: Locale) {
  const page = PAGES[kind];
  const path = PATHS[kind];
  const { PUBLIC_URL } = getEnv();

  const title = sigdPageTitle(page, locale);
  const description = sigdPageDescription(page, locale);
  const html = renderMarkdown(sigdPageBody(page, locale));

  const events: SigdSeasonEventRow[] =
    kind === "events"
      ? SIGD_EVENTS_2026.map((e) => ({
          id: e.id,
          name: e.name[locale] ?? e.name.he,
          organizer: e.organizer[locale] ?? e.organizer.he,
          location: e.location[locale] ?? e.location.he,
          date: formatDate(locale, e.date),
          startTime: e.startTime,
          sourceUrl: e.sourceUrl,
          sourceLabel: e.sourceLabel[locale] ?? e.sourceLabel.he,
          verifiedOn: e.verifiedOn,
          notes: e.notes ? (e.notes[locale] ?? e.notes.he) : undefined,
        }))
      : [];

  const article: JsonLd = heritageArticleJsonLd(
    { publicUrl: PUBLIC_URL, locale },
    {
      path,
      headline: title,
      description,
      datePublished: SIGD_SEASON_PUBLISHED,
    },
  );

  const breadcrumb: JsonLd = breadcrumbJsonLd({ publicUrl: PUBLIC_URL, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "heritage_events_landing_title"), path: "/heritage/events" },
    { name: t(locale, "sigd_related_guide_label"), path: eventPath("sigd") },
    { name: title, path },
  ]);

  return {
    locale,
    kind,
    path,
    title,
    description,
    html,
    events,
    dateLabel: t(locale, "sigd_date_label"),
    dateValue: formatDate(locale, SIGD_5787_DATE),
    hebrewDate: SIGD_5787_HEBREW_DATE,
    eventsHeading: kind === "events" ? t(locale, "sigd_events_heading") : undefined,
    emptyHeading: kind === "events" ? t(locale, "sigd_events_empty_heading") : undefined,
    emptyBody: kind === "events" ? t(locale, "sigd_events_empty_body") : undefined,
    sourceLabel: t(locale, "culinary_source_label"),
    verifiedLabel: t(locale, "sigd_events_verified_label"),
    homeLabel: t(locale, "rights_breadcrumb_home"),
    sectionLabel: t(locale, "heritage_events_landing_title"),
    sectionPath: "/heritage/events",
    relatedHeading: t(locale, "sigd_related_heading"),
    related: relatedFor(kind, locale),
    backLabel: t(locale, "sigd_back_to_guide"),
    backPath: eventPath("sigd"),
    publicUrl: PUBLIC_URL,
    article,
    breadcrumb,
  };
}
