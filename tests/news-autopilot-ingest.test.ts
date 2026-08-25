// News autopilot ingest route tests (TED-114 / ADR-019).
//
// Covers: bearer-secret auth (missing/wrong/unconfigured -> 401), Zod payload
// validation (missing fields, invalid tags, bad URL -> 422 / malformed JSON
// -> 400), the server-side enforcement that a caller can never self-certify
// "human_reviewed" (enStatus/amStatus/status are always forced, regardless
// of what the payload contains), sourceUrl dedup via onConflictDoNothing,
// and the GET watchdog status check.
//
// `~/lib/db.server` is mocked (see below) so this file needs no live
// Postgres connection — the route's DB calls are captured/controlled via
// `__mockState`, exercising the same request-handling code path the real
// route runs, minus the actual insert/select I/O.

import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("~/lib/db.server", () => {
  const state = {
    insertCaptured: [] as Array<Record<string, unknown>>,
    insertReturning: [] as Array<{ id: string }>,
    selectCount: 0,
  };
  const db = {
    insert: vi.fn(() => ({
      values: (v: Record<string, unknown>) => {
        state.insertCaptured.push(v);
        return {
          onConflictDoNothing: () => ({
            returning: async () => state.insertReturning,
          }),
        };
      },
    })),
    select: vi.fn(() => ({
      from: () => ({
        where: async () => [{ total: state.selectCount }],
      }),
    })),
  };
  return { db, __mockState: state };
});

beforeAll(() => {
  process.env.NODE_ENV = "test";
  process.env.PORT = process.env.PORT ?? "3000";
  process.env.PUBLIC_URL = process.env.PUBLIC_URL ?? "https://tedros.co.il";
  process.env.DATABASE_URL =
    process.env.DATABASE_URL ??
    "postgres://tedros:tedros_test@localhost:5432/tedros_test";
  process.env.AUTH_SECRET = process.env.AUTH_SECRET ?? "x".repeat(32);
  process.env.AUTH_TRUST_HOST = process.env.AUTH_TRUST_HOST ?? "true";
  process.env.EMAIL_FROM = process.env.EMAIL_FROM ?? "no-reply@tedros.local";
  process.env.AUTOPILOT_SECRET = "s".repeat(32);
});

import { action, loader } from "../app/routes/api.internal.news-autopilot.ingest";
import * as dbServerMock from "~/lib/db.server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;

const mockState = (dbServerMock as AnyArgs).__mockState as {
  insertCaptured: Array<Record<string, unknown>>;
  insertReturning: Array<{ id: string }>;
  selectCount: number;
};

const SECRET = "s".repeat(32);
const URL_ = "https://tedros.local/api/internal/news-autopilot/ingest";

function req(
  method: "GET" | "POST",
  opts: { auth?: string | null; body?: unknown; rawBody?: string } = {},
): Request {
  const headers: Record<string, string> = {};
  if (opts.auth !== null) {
    headers.authorization = opts.auth ?? `Bearer ${SECRET}`;
  }
  if (method === "POST") headers["content-type"] = "application/json";
  return new Request(URL_, {
    method,
    headers,
    body:
      method === "POST"
        ? (opts.rawBody ?? JSON.stringify(opts.body ?? validPayload()))
        : undefined,
  });
}

function invalidPayloadData(result: { data: unknown }) {
  return result.data as {
    error: string;
    issues: { fieldErrors: Record<string, string[] | undefined> };
  };
}

function validPayload(overrides: Record<string, unknown> = {}) {
  return {
    sourceUrl: "https://example.com/article-1",
    sourceName: "Example News",
    rawSnapshot: "Some verbatim snippet from the source.",
    tags: ["housing"],
    heTitle: { he: "כותרת בעברית" },
    heExcerpt: { he: "תקציר בעברית" },
    heBody: "גוף הכתבה המלא בעברית, עם מספיק תוכן לבדיקה.",
    ...overrides,
  };
}

beforeEach(() => {
  mockState.insertCaptured.length = 0;
  mockState.insertReturning = [{ id: "11111111-1111-1111-1111-111111111111" }];
  mockState.selectCount = 0;
  vi.clearAllMocks();
});

// --- auth --------------------------------------------------------------------

describe("POST /api/internal/news-autopilot/ingest — auth", () => {
  it("401s when the Authorization header is missing", async () => {
    const result = await action({ request: req("POST", { auth: null }) } as AnyArgs);
    expect(result.init?.status).toBe(401);
    expect(result.data).toEqual({ error: "Unauthorized" });
    expect(mockState.insertCaptured).toHaveLength(0);
  });

  it("401s when the scheme is not Bearer", async () => {
    const result = await action({
      request: req("POST", { auth: `Basic ${SECRET}` }),
    } as AnyArgs);
    expect(result.init?.status).toBe(401);
  });

  it("401s when the token is wrong", async () => {
    const result = await action({
      request: req("POST", { auth: "Bearer wrong-token-wrong-token-wrong12345" }),
    } as AnyArgs);
    expect(result.init?.status).toBe(401);
    expect(mockState.insertCaptured).toHaveLength(0);
  });

  it("401s a GET status check without a token", async () => {
    const result = await loader({ request: req("GET", { auth: null }) } as AnyArgs);
    expect(result.init?.status).toBe(401);
  });

  it("accepts a correctly-authorized GET status check", async () => {
    mockState.selectCount = 3;
    const result = await loader({ request: req("GET") } as AnyArgs);
    expect(result.init).toBeNull();
    const data = result.data as { freshDraftsToday: number; checkedAt: string };
    expect(data.freshDraftsToday).toBe(3);
    expect(typeof data.checkedAt).toBe("string");
  });
});

describe("AUTOPILOT_SECRET not configured", () => {
  it("401s any request, even with a well-formed token, when the secret is unset", async () => {
    vi.resetModules();
    const prevSecret = process.env.AUTOPILOT_SECRET;
    delete process.env.AUTOPILOT_SECRET;
    try {
      const fresh = await import("../app/routes/api.internal.news-autopilot.ingest");
      const result = await fresh.action({
        request: req("POST", { auth: `Bearer ${"x".repeat(32)}` }),
      } as AnyArgs);
      expect(result.init?.status).toBe(401);
    } finally {
      process.env.AUTOPILOT_SECRET = prevSecret;
    }
  });
});

// --- method handling -----------------------------------------------------------

describe("POST-only enforcement on the action", () => {
  it("405s a non-POST method reaching the action handler", async () => {
    const result = await action({ request: req("GET") } as AnyArgs);
    expect(result.init?.status).toBe(405);
  });
});

// --- payload validation ---------------------------------------------------------

describe("payload validation", () => {
  it("400s on malformed JSON", async () => {
    const result = await action({
      request: req("POST", { rawBody: "{not valid json" }),
    } as AnyArgs);
    expect(result.init?.status).toBe(400);
    expect(mockState.insertCaptured).toHaveLength(0);
  });

  it("422s when a required field (sourceUrl) is missing", async () => {
    const { sourceUrl: _drop, ...rest } = validPayload();
    const result = await action({ request: req("POST", { body: rest }) } as AnyArgs);
    expect(result.init?.status).toBe(422);
    const data = invalidPayloadData(result);
    expect(data.error).toBe("Invalid payload");
    expect(data.issues.fieldErrors.sourceUrl).toBeDefined();
    expect(mockState.insertCaptured).toHaveLength(0);
  });

  it("422s when sourceUrl is not a valid URL", async () => {
    const result = await action({
      request: req("POST", { body: validPayload({ sourceUrl: "not-a-url" }) }),
    } as AnyArgs);
    expect(result.init?.status).toBe(422);
    expect(invalidPayloadData(result).issues.fieldErrors.sourceUrl).toBeDefined();
  });

  it("422s on an empty tags array", async () => {
    const result = await action({
      request: req("POST", { body: validPayload({ tags: [] }) }),
    } as AnyArgs);
    expect(result.init?.status).toBe(422);
    expect(invalidPayloadData(result).issues.fieldErrors.tags).toBeDefined();
  });

  it("422s on a tag that is not one of ALL_NEWS_TAGS", async () => {
    const result = await action({
      request: req("POST", { body: validPayload({ tags: ["not-a-real-tag"] }) }),
    } as AnyArgs);
    expect(result.init?.status).toBe(422);
    expect(invalidPayloadData(result).issues.fieldErrors.tags).toBeDefined();
    expect(mockState.insertCaptured).toHaveLength(0);
  });

  it("422s when heBody is missing (HE is the required source of truth)", async () => {
    const { heBody: _drop, ...rest } = validPayload();
    const result = await action({ request: req("POST", { body: rest }) } as AnyArgs);
    expect(result.init?.status).toBe(422);
    expect(invalidPayloadData(result).issues.fieldErrors.heBody).toBeDefined();
  });

  it("accepts a minimal HE-only payload (EN/AM omitted)", async () => {
    const result = await action({
      request: req("POST", { body: validPayload() }),
    } as AnyArgs);
    expect(result.init?.status).toBe(201);
    expect(mockState.insertCaptured).toHaveLength(1);
  });
});

// --- server-side status enforcement ---------------------------------------------

describe("the routine cannot self-certify human_reviewed", () => {
  it("forces enStatus=machine_draft, amStatus=machine_draft, status=pending even when the payload tries to set human_reviewed/approved", async () => {
    const payload = validPayload({
      enTitle: { en: "Title EN" },
      enExcerpt: { en: "Excerpt EN" },
      enBody: "EN body content here, long enough.",
      amTitle: { am: "ርዕስ" },
      amExcerpt: { am: "ማጠቃለያ" },
      amBody: "የአማርኛ ይዘት እዚህ አለ።",
      // Not part of the Zod schema — must be silently ignored, not trusted.
      enStatus: "human_reviewed",
      amStatus: "human_reviewed",
      status: "approved",
      reviewerUserId: "22222222-2222-2222-2222-222222222222",
    });

    const result = await action({ request: req("POST", { body: payload }) } as AnyArgs);
    expect(result.init?.status).toBe(201);

    const inserted = mockState.insertCaptured[0]!;
    expect(inserted.enStatus).toBe("machine_draft");
    expect(inserted.amStatus).toBe("machine_draft");
    expect(inserted.status).toBe("pending");
    expect(inserted.reviewerUserId).toBeUndefined();
  });

  it("sets amStatus=skipped when no AM body was produced", async () => {
    const result = await action({
      request: req("POST", { body: validPayload() }),
    } as AnyArgs);
    expect(result.init?.status).toBe(201);
    expect(mockState.insertCaptured[0]!.amStatus).toBe("skipped");
  });
});

// --- dedup -----------------------------------------------------------------------

describe("sourceUrl dedup (onConflictDoNothing)", () => {
  it("reports duplicate:true and 200-ish response when the insert is a no-op", async () => {
    mockState.insertReturning = []; // simulates the unique index conflict
    const result = await action({
      request: req("POST", { body: validPayload() }),
    } as AnyArgs);
    expect(result.data).toEqual({ ok: true, duplicate: true });
    expect(result.init).toBeNull();
  });

  it("reports duplicate:false and 201 with the new id on first ingest", async () => {
    mockState.insertReturning = [{ id: "abc-123" }];
    const result = await action({
      request: req("POST", { body: validPayload() }),
    } as AnyArgs);
    expect(result.init?.status).toBe(201);
    expect(result.data).toEqual({ ok: true, duplicate: false, id: "abc-123" });
  });
});
