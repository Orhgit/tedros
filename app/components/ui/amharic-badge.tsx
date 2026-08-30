// "דובר/ת אמהרית" chip (TED-136) — shown on professional cards whenever the
// entry's language claim includes Amharic. Deliberately absent from entries
// without an explicit "am" claim (e.g. אורלי מנדפרו — open owner question),
// so a missing badge is itself information.

import type { Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

export function AmharicBadge({ locale }: { locale: Locale }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-accent-yellow/20 px-2 py-0.5 text-xs font-medium text-earth-900">
      <span aria-hidden="true">🗣️</span>
      {t(locale, "professionals_amharic_badge")}
    </span>
  );
}
