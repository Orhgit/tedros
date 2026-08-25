// Resource route — `/:lang/statistics/:topic.csv` (TED-20 wave 1).
// Serves a topic's stats as CSV (label, value, source, year, caveat) so
// journalists/researchers/Wikipedia editors can cite the underlying
// figures directly instead of screenshotting the page. Linked from the
// Dataset JSON-LD `distribution` field on the detail page.

import type { Route } from "./+types/$lang.statistics.$topic[.]csv";
import { csvFilenameForTopic, topicToCsv } from "~/lib/statistics/csv.server";
import { isStatTopic } from "~/lib/statistics/categories";
import { findStatTopic } from "~/lib/statistics/topics.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";

export function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.topic || !isStatTopic(params.topic)) {
    throw new Response("Not found", { status: 404 });
  }
  const topic = findStatTopic(params.topic);
  if (!topic) {
    throw new Response("Not found", { status: 404 });
  }

  const csv = topicToCsv(topic, locale);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${csvFilenameForTopic(topic)}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
