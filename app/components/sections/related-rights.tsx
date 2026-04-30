// "Related rights" card row (Phase 3 enrichment).
//
// Renders 3-4 related-by-tag-overlap right summaries below the main body
// of a detail / cell page. Tone-coloured per right's primary tag, same
// look-and-feel as the landing grid so the visual language stays
// consistent.

import { Link } from "react-router";

import type { Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { classesForTag, glyphForTag, tagChipClasses } from "~/lib/rights/categories";
import type { RightSummary } from "~/lib/db/queries/rights.server";

interface RelatedRightsProps {
  rights: RightSummary[];
  locale: Locale;
}

export function RelatedRights({ rights, locale }: RelatedRightsProps) {
  if (rights.length === 0) return null;
  return (
    <section
      aria-labelledby="related-rights-heading"
      className="mt-12 border-t border-earth-200 pt-10"
    >
      <h2
        id="related-rights-heading"
        className="font-display text-xl font-semibold tracking-tight text-earth-900 sm:text-2xl"
      >
        {t(locale, "rights_related_heading")}
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {rights.map((r) => {
          const primaryTag = r.tags[0] ?? "housing";
          const tone = classesForTag(primaryTag);
          return (
            <Link
              key={r.slug}
              to={`/${locale}/rights/${r.slug}`}
              className={`group relative block overflow-hidden rounded-lg border bg-card p-4 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md ${tone.border} hover:border-earth-400`}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-s-0 inset-e-0 top-0 h-1 ${tone.accentBg}`}
              />
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-sm font-semibold text-earth-900 group-hover:text-earth-700">
                  {r.title}
                </h3>
                <span
                  aria-hidden="true"
                  className="text-lg leading-none"
                  title={t(locale, `rights_tag_${primaryTag}`)}
                >
                  {glyphForTag(primaryTag)}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-600">
                {r.summary}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {r.tags.slice(0, 2).map((tg) => (
                  <span key={tg} className={tagChipClasses(tg)}>
                    {t(locale, `rights_tag_${tg}`)}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
