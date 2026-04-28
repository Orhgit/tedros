// Tiny token-window rate limiter for the lead form (TED-22).
//
// Spec: 3 leads from the same IP within a 60-minute sliding window.
// In-memory + per-process — fine for MVP behind a single Node instance.
// When Redis lands (ADR-001 / Phase 4) this becomes a Redis-backed limiter
// with the same shape so callers don't change.

export interface RateLimiter {
  check(key: string, now?: Date): RateLimitResult;
}

export interface RateLimitResult {
  ok: boolean;
  // How many attempts remain in the current window after this call.
  remaining: number;
  // Seconds until the oldest tracked attempt falls out of the window.
  retryAfterSeconds: number;
}

export interface RateLimiterOptions {
  /** Max attempts allowed within the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
  /** Soft cap on tracked keys to bound memory under abuse. */
  maxKeys?: number;
}

export function createInMemoryRateLimiter(options: RateLimiterOptions): RateLimiter {
  const limit = options.limit;
  const windowMs = options.windowMs;
  const maxKeys = options.maxKeys ?? 10_000;
  const buckets = new Map<string, number[]>();

  function evict(now: number) {
    if (buckets.size <= maxKeys) return;
    // Drop entries whose newest hit is already past the window —
    // they have no live attempts and can never block again.
    for (const [k, hits] of buckets) {
      const last = hits[hits.length - 1];
      if (last === undefined || now - last >= windowMs) buckets.delete(k);
      if (buckets.size <= maxKeys) break;
    }
  }

  return {
    check(key, now = new Date()) {
      const t = now.getTime();
      const cutoff = t - windowMs;
      const existing = buckets.get(key) ?? [];
      // Drop expired hits from the front of the array.
      let firstFresh = 0;
      while (firstFresh < existing.length) {
        const hit = existing[firstFresh];
        if (hit !== undefined && hit > cutoff) break;
        firstFresh++;
      }
      const fresh = firstFresh === 0 ? existing : existing.slice(firstFresh);

      if (fresh.length >= limit) {
        const oldest = fresh[0] ?? t;
        const retryAfterSeconds = Math.max(1, Math.ceil((oldest + windowMs - t) / 1000));
        // Persist the trimmed array so we don't keep walking expired entries.
        buckets.set(key, fresh);
        return { ok: false, remaining: 0, retryAfterSeconds };
      }

      fresh.push(t);
      buckets.set(key, fresh);
      evict(t);
      return { ok: true, remaining: limit - fresh.length, retryAfterSeconds: 0 };
    },
  };
}

// Default singleton for the lead form. Tests inject their own limiter into
// `submitLead` rather than reaching for this — keeps tests deterministic.
export const leadRateLimiter = createInMemoryRateLimiter({
  limit: 3,
  windowMs: 60 * 60 * 1000,
});
