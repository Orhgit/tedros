// CSV export for statistics topics (TED-20 wave 1). The ticket calls this
// out explicitly as "key for citations" — journalists/researchers/Wikipedia
// editors can download the underlying figures with sources attached rather
// than screenshot the page.

import type { Locale } from "../i18n/config";
import {
  type StatTopicEntry,
  pickFigure,
  pickFigureConfidenceNote,
  statTopicName,
} from "./topics.server";

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function csvRow(values: string[]): string {
  return values.map(csvEscape).join(",");
}

/**
 * Renders a topic's figures as CSV: label, value, source name, source URL,
 * data year, and an optional confidence/caveat note. UTF-8 with BOM so
 * Excel opens Hebrew/Amharic text correctly.
 */
export function topicToCsv(entry: StatTopicEntry, locale: Locale): string {
  const header = csvRow([
    "label",
    "value",
    "source_name",
    "source_url",
    "data_year",
    "confidence_note",
  ]);
  const rows = entry.figures.map((f) =>
    csvRow([
      pickFigure(f, locale, "heading"),
      pickFigure(f, locale, "figure"),
      f.source.name,
      f.source.url,
      String(f.publishedYear),
      pickFigureConfidenceNote(f, locale) ?? "",
    ]),
  );
  const title = `# ${statTopicName(entry, locale)} — Tedros community statistics (${entry.slug})`;
  const BOM = String.fromCharCode(0xfeff);
  return `${BOM}${title}\n${[header, ...rows].join("\n")}\n`;
}

export function csvFilenameForTopic(entry: StatTopicEntry): string {
  return `tedros-statistics-${entry.slug}.csv`;
}
