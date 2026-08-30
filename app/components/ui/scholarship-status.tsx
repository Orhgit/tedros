// Scholarship freshness UI (TED-139): open/closed badge + deadline text.
// Shared by the scholarships index, detail, and scholarship×city routes.
// `tba` intentionally renders no badge — we only announce what we verified.

import type { ScholarshipStatus } from "~/lib/education/scholarships.server";
import type { Locale } from "~/lib/i18n/config";
import { formatDate } from "~/lib/i18n/format";
import { t } from "~/lib/i18n/messages";

export function ScholarshipStatusBadge({
  locale,
  status,
  className = "",
}: {
  locale: Locale;
  status: ScholarshipStatus;
  className?: string;
}) {
  if (status === "tba") return null;
  const open = status === "open";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        open
          ? "bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-100"
          : "bg-ink-100 text-ink-600 dark:bg-ink-900 dark:text-ink-300"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${open ? "bg-green-600" : "bg-ink-400"}`}
      />
      {t(locale, open ? "scholarship_status_open" : "scholarship_status_closed")}
    </span>
  );
}

/** Deadline cell text: rolling → "open year-round", ISO → localized date, null → "not announced". */
export function deadlineText(
  locale: Locale,
  deadline: "rolling" | string | null,
): string {
  if (deadline === "rolling") return t(locale, "scholarship_deadline_rolling");
  if (!deadline) return t(locale, "scholarship_deadline_tba");
  return formatDate(locale, deadline);
}
