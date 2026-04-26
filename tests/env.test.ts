import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const validEnv = {
  NODE_ENV: "test",
  PORT: "3000",
  PUBLIC_URL: "http://localhost:3000",
  DATABASE_URL: "postgres://tedros:tedros_test@localhost:5432/tedros_test",
  AUTH_SECRET: "x".repeat(32),
  AUTH_TRUST_HOST: "true",
  EMAIL_FROM: "no-reply@tedros.local",
} as const;

async function loadEnvFresh() {
  vi.resetModules();
  return await import("../app/lib/env.server");
}

const originalEnv = { ...process.env };

beforeEach(() => {
  process.env = { ...originalEnv };
});
afterEach(() => {
  process.env = { ...originalEnv };
});

describe("env.server (Zod boundary)", () => {
  it("parses a valid env without throwing", async () => {
    Object.assign(process.env, validEnv);
    const { getEnv } = await loadEnvFresh();
    const env = getEnv();
    expect(env.DATABASE_URL).toBe(validEnv.DATABASE_URL);
    expect(env.AUTH_TRUST_HOST).toBe(true);
    expect(env.PORT).toBe(3000);
  });

  it("throws when DATABASE_URL is missing", async () => {
    Object.assign(process.env, validEnv);
    delete process.env.DATABASE_URL;
    const { getEnv } = await loadEnvFresh();
    expect(() => getEnv()).toThrow(/DATABASE_URL/);
  });

  it("throws when AUTH_SECRET is too short", async () => {
    Object.assign(process.env, validEnv);
    process.env.AUTH_SECRET = "short";
    const { getEnv } = await loadEnvFresh();
    expect(() => getEnv()).toThrow(/AUTH_SECRET/);
  });

  it("throws when PUBLIC_URL is not a URL", async () => {
    Object.assign(process.env, validEnv);
    process.env.PUBLIC_URL = "not-a-url";
    const { getEnv } = await loadEnvFresh();
    expect(() => getEnv()).toThrow();
  });

  it("caches the parse result across calls", async () => {
    Object.assign(process.env, validEnv);
    const { getEnv } = await loadEnvFresh();
    const a = getEnv();
    process.env.DATABASE_URL = "postgres://other/db";
    const b = getEnv();
    expect(a).toBe(b);
  });
});
