// Wave 9 articles — News autopilot promotions (TED-114 / ADR-019).
//
// Unlike waves 3-8 (hand-authored by Content & SEO), entries here are
// appended by `scripts/news-promote.ts` from an approved `news_drafts` row.
// Do not hand-edit entries below without also updating the corresponding
// `news_drafts.promoted_slug` bookkeeping — see the script for the full
// promotion flow (content approval in the admin review UI happens first,
// in Postgres; this file only ever receives already-approved content).
//
// Import and spread into ARTICLES in articles.server.ts.

import type { NewsArticleEntry } from "./articles.server";

export const ARTICLES_WAVE9: NewsArticleEntry[] = [
  // news:promote appends new entries above this line.
];
