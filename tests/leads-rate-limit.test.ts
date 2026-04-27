import { describe, expect, it } from "vitest";

import { createInMemoryRateLimiter } from "../app/lib/leads/rate-limit";

describe("createInMemoryRateLimiter", () => {
  it("allows up to the limit and blocks the next one", () => {
    const rl = createInMemoryRateLimiter({ limit: 3, windowMs: 60_000 });
    expect(rl.check("1.2.3.4").ok).toBe(true);
    expect(rl.check("1.2.3.4").ok).toBe(true);
    expect(rl.check("1.2.3.4").ok).toBe(true);
    const blocked = rl.check("1.2.3.4");
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("isolates buckets by key (different IPs)", () => {
    const rl = createInMemoryRateLimiter({ limit: 1, windowMs: 60_000 });
    expect(rl.check("a").ok).toBe(true);
    expect(rl.check("a").ok).toBe(false);
    expect(rl.check("b").ok).toBe(true);
  });

  it("releases attempts that have aged out of the window", () => {
    const rl = createInMemoryRateLimiter({ limit: 2, windowMs: 1000 });
    const t0 = new Date("2026-01-01T00:00:00Z");
    expect(rl.check("ip", t0).ok).toBe(true);
    expect(rl.check("ip", new Date(t0.getTime() + 200)).ok).toBe(true);
    expect(rl.check("ip", new Date(t0.getTime() + 400)).ok).toBe(false);
    // Window slides past the first hit.
    expect(rl.check("ip", new Date(t0.getTime() + 1500)).ok).toBe(true);
  });

  it("reports retryAfterSeconds based on the oldest tracked hit", () => {
    const rl = createInMemoryRateLimiter({ limit: 1, windowMs: 5000 });
    const t0 = new Date("2026-01-01T00:00:00Z");
    rl.check("ip", t0);
    const blocked = rl.check("ip", new Date(t0.getTime() + 1000));
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterSeconds).toBe(4);
  });
});
