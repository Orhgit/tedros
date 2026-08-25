#!/usr/bin/env -S node --import tsx
// News autopilot promotion script (TED-114 / ADR-016 §5).
//
// Reads one `status = 'approved'` row from `news_drafts` and appends a
// `NewsArticleEntry` object literal into `app/lib/news/articles-wave6.server.ts`
// — the static seed stays the publish surface (ADR-015's static-vs-DB rule);
// this script never writes to the News routes' read path directly, only to
// the wave file a normal PR then carries.
//
// Usage:
//   pnpm news:promote --draft <uuid>
//   pnpm news:promote --draft <uuid> --fast-track
//
// Standard path: writes the wave-file entry, marks the draft `promoted` with
// `promotionMethod = "manual_pr"`, and prints next steps for opening a normal
// PR (this script does NOT call `gh` itself — the diff is left staged for
// the operator/agent to review and push, same as any other hand-authored
// content change).
//
// --fast-track (Amendment 1, ADR-016 §5): only skips the *human* PR-review
// click — never content review (already done in the admin UI before a draft
// reaches `approved`) and never CI. This script marks
// `promotionMethod = "fast_track"` for audit and prints the `gh pr create`
// + `gh pr merge --auto` invocations the operator runs next; it does not
// invoke `gh` itself, so nothing ships without an explicit, separate,
// reviewable step even on the fast-track path.
//
// AM gate (ADR-016 §4): the AM body is promoted only if
// `amStatus = "human_reviewed"`, OR the AM urgent-override quadruplet is
// fully set (`amUrgentOverride && amUrgentOverrideReason && amUrgentOverrideByUserId`).
// Otherwise the promoted entry ships with HE+EN only — AM stays pending,
// matching the existing graceful-degradation pattern already used by the
// hand-authored seed (shorter/absent `am` fields are a supported shape, not
// an error).
//
// TODO(DevOps): once `.github/workflows/news-autopilot.yml` exists (not
// created by this change — see ADR-016 implementation handoff), the
// fast-track branch here is what that workflow's "promote" job shells out
// to; for now this stays a manually-invoked script.

import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { eq } from "drizzle-orm";

import { db } from "../app/lib/db.server";
import { newsDrafts } from "../app/lib/db/schema/news-drafts";
import { isNewsTag, type NewsTag } from "../app/lib/news/categories";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WAVE_FILE = path.join(__dirname, "..", "app/lib/news/articles-wave6.server.ts");
const INSERTION_MARKER = "// news:promote appends new entries above this line.";

// --- CLI args ------------------------------------------------------------------

function parseArgs(argv: string[]) {
  const draftIndex = argv.indexOf("--draft");
  const draftId = draftIndex >= 0 ? argv[draftIndex + 1] : undefined;
  const fastTrack = argv.includes("--fast-track");
  return { draftId, fastTrack };
}

// --- slug ------------------------------------------------------------------------

function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[֑-ׇ]/g, "") // strip Hebrew niqqud, if any slipped through
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 80);
}

function slugFromHebrewTitle(heTitle: string): string {
  // Hebrew titles don't romanize cleanly with a naive slugify — fall back to
  // a short random suffix rather than emitting Hebrew (or empty) slugs into
  // URLs. A human reviewer can rename before/at PR time if a nicer slug is
  // wanted; this only needs to be unique and URL-safe.
  const base = slugify(heTitle);
  if (base.length >= 3) return `${base}-${randomUUID().slice(0, 6)}`;
  return `news-${randomUUID().slice(0, 8)}`;
}

// --- object-literal rendering ----------------------------------------------------

function tsString(value: string): string {
  return JSON.stringify(value);
}

function renderTranslatable(t: { he: string; en?: string; am?: string }): string {
  const lines = [`he: ${tsString(t.he)},`];
  if (t.en) lines.push(`en: ${tsString(t.en)},`);
  if (t.am) lines.push(`am: ${tsString(t.am)},`);
  return `{\n      ${lines.join("\n      ")}\n    }`;
}

function renderEntry(entry: {
  slug: string;
  title: { he: string; en?: string; am?: string };
  excerpt: { he: string; en?: string; am?: string };
  publishedAt: string;
  updatedAt: string;
  tags: NewsTag[];
  bodies: { he: string; en?: string; am?: string };
  sourceUrl: string;
  amPromoted: boolean;
}): string {
  const bodyLines = [`he: ${tsString(entry.bodies.he)},`];
  if (entry.bodies.en) bodyLines.push(`en: ${tsString(entry.bodies.en)},`);
  if (entry.amPromoted && entry.bodies.am) {
    bodyLines.push(`am: ${tsString(entry.bodies.am)},`);
  } else {
    // AM not approved (or no urgent override) — graceful degradation,
    // matches how partial-locale entries already work elsewhere in the seed.
    bodyLines.push(`// am: pending human review (news_drafts id below)`);
  }

  return `  {
    // Promoted from news_drafts by scripts/news-promote.ts — source: ${entry.sourceUrl}
    slug: ${tsString(entry.slug)},
    publishedAt: ${tsString(entry.publishedAt)},
    updatedAt: ${tsString(entry.updatedAt)},
    tags: [${entry.tags.map(tsString).join(", ")}],
    title: ${renderTranslatable(entry.title)},
    excerpt: ${renderTranslatable(entry.excerpt)},
    bodies: {
      ${bodyLines.join("\n      ")}
    },
  },`;
}

// --- main ------------------------------------------------------------------------

async function main() {
  const { draftId, fastTrack } = parseArgs(process.argv.slice(2));

  if (!draftId) {
    console.error("Usage: pnpm news:promote --draft <uuid> [--fast-track]");
    process.exit(1);
  }

  const [row] = await db
    .select()
    .from(newsDrafts)
    .where(eq(newsDrafts.id, draftId))
    .limit(1);

  if (!row) {
    console.error(`No news_drafts row found for id ${draftId}`);
    process.exit(1);
  }

  // Content approval (§5) is never skipped by either path — fast-track only
  // removes the second, redundant human look at the same content as a PR
  // diff, not this gate.
  if (row.status !== "approved") {
    console.error(
      `Draft ${draftId} has status "${row.status}", not "approved". ` +
        `Promotion requires the admin review UI to approve content first — ` +
        `see app/routes/admin.news-drafts.tsx.`,
    );
    process.exit(1);
  }

  if (!row.heTitle || !row.heExcerpt || !row.heBody) {
    console.error(`Draft ${draftId} is missing required HE content — cannot promote.`);
    process.exit(1);
  }

  const tags = (Array.isArray(row.tags) ? row.tags : []).filter(
    (t): t is NewsTag => typeof t === "string" && isNewsTag(t),
  );
  if (tags.length === 0) {
    console.error(`Draft ${draftId} has no valid tags — cannot promote.`);
    process.exit(1);
  }

  // AM gate (ADR-016 §4, Amendment 1) — human review, or a fully-set,
  // audited urgent override. Never a bare flag.
  const amOverrideValid =
    row.amUrgentOverride &&
    Boolean(row.amUrgentOverrideReason) &&
    Boolean(row.amUrgentOverrideByUserId);
  const amApproved = row.amStatus === "human_reviewed" || amOverrideValid;

  if (row.amUrgentOverride && !amOverrideValid) {
    console.error(
      `Draft ${draftId} has amUrgentOverride=true but is missing reason/admin id — refusing to treat as an override. Fix the row or clear the flag.`,
    );
    process.exit(1);
  }

  const slug = slugFromHebrewTitle(row.heTitle.he);
  const today = new Date().toISOString().slice(0, 10);

  const entryText = renderEntry({
    slug,
    title: {
      he: row.heTitle.he,
      en: row.enTitle?.en,
      am: amApproved ? row.amTitle?.am : undefined,
    },
    excerpt: {
      he: row.heExcerpt.he,
      en: row.enExcerpt?.en,
      am: amApproved ? row.amExcerpt?.am : undefined,
    },
    publishedAt: row.publishedAtSource?.toISOString().slice(0, 10) ?? today,
    updatedAt: today,
    tags,
    bodies: {
      he: row.heBody,
      en: row.enBody ?? undefined,
      am: row.amBody ?? undefined,
    },
    sourceUrl: row.sourceUrl,
    amPromoted: amApproved,
  });

  const waveFileSource = readFileSync(WAVE_FILE, "utf8");
  if (!waveFileSource.includes(INSERTION_MARKER)) {
    console.error(
      `${WAVE_FILE} is missing the insertion marker ("${INSERTION_MARKER}"). ` +
        `Was it hand-edited? Insert manually or restore the marker.`,
    );
    process.exit(1);
  }
  const updatedWaveFile = waveFileSource.replace(
    INSERTION_MARKER,
    `${entryText}\n  ${INSERTION_MARKER}`,
  );
  writeFileSync(WAVE_FILE, updatedWaveFile, "utf8");

  const promotionMethod = fastTrack ? "fast_track" : "manual_pr";
  await db
    .update(newsDrafts)
    .set({
      status: "promoted",
      promotedSlug: slug,
      promotionMethod,
    })
    .where(eq(newsDrafts.id, draftId));

  console.log(`Promoted draft ${draftId} → slug "${slug}" in ${WAVE_FILE}`);
  if (!amApproved) {
    console.log(
      `  AM not promoted (amStatus="${row.amStatus}", amUrgentOverride=${row.amUrgentOverride}) — HE+EN only, matches existing partial-locale pattern.`,
    );
  }

  console.log("");
  console.log("Next steps (this script does not run git/gh itself):");
  console.log(`  git checkout -b news/${slug}`);
  console.log(`  git add ${path.relative(process.cwd(), WAVE_FILE)}`);
  console.log(
    `  git commit -m "feat(news): promote autopilot draft — ${slug} (TED-114)"`,
  );
  console.log(`  git push -u origin news/${slug}`);
  if (fastTrack) {
    console.log(`  gh pr create --fill --label news-autopilot-fast-track  # then:`);
    console.log(
      `  gh pr merge --auto --squash  # merges once CI is green — no human "approve" click`,
    );
  } else {
    console.log(`  gh pr create --fill --label news-autopilot`);
    console.log(`  # then open a normal human PR review as usual`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    // db.server.ts holds a module-level postgres.js client; exit explicitly
    // so a one-shot CLI invocation doesn't hang on an open connection pool.
    process.exit(0);
  });
