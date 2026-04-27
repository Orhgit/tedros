// Partitioned-table SQL helper for audit_log (Vega D4).
//
// Drizzle's PG core has no DSL for declarative partitioning. The first-run
// migration sequence (after QA-PR1 review):
//   1. `drizzle-kit generate` emits `0000_init.sql` with `CREATE TABLE audit_log`
//      using the composite PK `(id, occurred_at)` declared in `schema/audit.ts`.
//   2. `_post_init.sql.ts → postInitSql()` runs immediately after and replaces
//      that table with the partitioned form (`auditLogParent()` here) plus
//      initial monthly partitions via `ensureRollingPartitions(now)`. No hand
//      editing of `0000_init.sql` is required.
//   3. DevOps wires `ensureRollingPartitions(now)` into a daily cron — keeps
//      current + next 2 months of partitions ahead so a write at 23:59 on
//      the last day never fails for missing partition.
//
// CI test (Engineer-owned, post-skeleton): assert the next 2 months'
// partitions exist; tests live in `app/lib/db/__tests__/partitions.test.ts`.

export function auditLogParent(): string {
  return /* sql */ `
    CREATE TABLE audit_log (
      id           uuid          NOT NULL DEFAULT gen_random_uuid(),
      occurred_at  timestamptz   NOT NULL DEFAULT now(),
      actor_id     uuid,
      actor_type   actor_type    NOT NULL,
      action       audit_action  NOT NULL,
      entity_type  text          NOT NULL,
      entity_id    uuid          NOT NULL,
      agency_id    uuid,
      before       jsonb,
      after        jsonb,
      diff         jsonb,
      request_id   text,
      ip           inet,
      user_agent   text,
      PRIMARY KEY (id, occurred_at)
    ) PARTITION BY RANGE (occurred_at);
  `;
}

/**
 * Create a single monthly partition.
 * @param yearMonth e.g. "2026_05" — used in the partition name.
 * @param from inclusive lower bound, ISO date e.g. "2026-05-01".
 * @param to exclusive upper bound, ISO date e.g. "2026-06-01".
 */
export function auditLogPartition(
  yearMonth: string,
  from: string,
  to: string,
): string {
  return /* sql */ `
    CREATE TABLE IF NOT EXISTS audit_log_${yearMonth}
      PARTITION OF audit_log
      FOR VALUES FROM ('${from}') TO ('${to}');

    -- Per-partition indexes (parent indexes don't propagate to existing
    -- partitions; declaring on each keeps planner choices consistent).
    CREATE INDEX IF NOT EXISTS audit_log_${yearMonth}_occurred_at_idx
      ON audit_log_${yearMonth} (occurred_at);
    CREATE INDEX IF NOT EXISTS audit_log_${yearMonth}_actor_idx
      ON audit_log_${yearMonth} (actor_id, occurred_at);
    CREATE INDEX IF NOT EXISTS audit_log_${yearMonth}_entity_idx
      ON audit_log_${yearMonth} (entity_type, entity_id, occurred_at);
    CREATE INDEX IF NOT EXISTS audit_log_${yearMonth}_agency_idx
      ON audit_log_${yearMonth} (agency_id, occurred_at);
  `;
}

/**
 * Idempotent: ensures the partition for a given month exists.
 * Call from a daily worker. Pass `now()` to also keep the current month
 * created on first deploy of the worker.
 */
export function ensureMonthPartition(date: Date): string {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth(); // 0..11
  const next = new Date(Date.UTC(y, m + 1, 1));
  const yearMonth = `${y}_${String(m + 1).padStart(2, "0")}`;
  const from = `${y}-${String(m + 1).padStart(2, "0")}-01`;
  const to = `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}-01`;
  return auditLogPartition(yearMonth, from, to);
}

/**
 * Daily worker entry point. Ensures current + next 2 months exist so a
 * write at 23:59 on the last day never fails for missing partition.
 */
export function ensureRollingPartitions(now: Date = new Date()): string[] {
  const months: string[] = [];
  for (let i = 0; i < 3; i++) {
    months.push(
      ensureMonthPartition(
        new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + i, 1)),
      ),
    );
  }
  return months;
}
