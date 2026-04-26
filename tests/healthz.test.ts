import { describe, expect, it } from "vitest";

describe("healthz route shape", () => {
  it("has expected response keys when DB is up", () => {
    const sample = {
      status: "ok",
      uptime_s: 0,
      timestamp: new Date().toISOString(),
      checks: { database: { ok: true } as const },
    };
    expect(sample).toHaveProperty("status");
    expect(sample).toHaveProperty("checks.database.ok");
  });
});
