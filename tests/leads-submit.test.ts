// End-to-end test for `submitLead` — the dependency-injected core that the
// route action wraps. Exercises validation, honeypot, rate limit, agency
// resolution, and Resend mock dispatch without spinning up a DB.

import { beforeEach, describe, expect, it, vi } from "vitest";

import { createMockAdapter } from "../app/lib/integrations/resend";
import { createInMemoryRateLimiter } from "../app/lib/leads/rate-limit";
import {
  submitLead,
  type AgencyContact,
  type LeadInsertRow,
  type SubmitLeadDeps,
} from "../app/lib/leads/submit-lead";
import type { LeadSource } from "../app/lib/leads/source";

const LISTING_ID = "11111111-2222-3333-4444-555555555555";
const AGENCY_ID = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";

interface Harness {
  email: ReturnType<typeof createMockAdapter>;
  inserted: LeadInsertRow[];
  insertCount: number;
  agency: AgencyContact | null;
  agencyLookups: LeadSource[];
  deps: SubmitLeadDeps;
}

function buildHarness(overrides?: {
  agency?: AgencyContact | null;
  rateLimit?: SubmitLeadDeps["rateLimit"];
}): Harness {
  const email = createMockAdapter();
  const inserted: LeadInsertRow[] = [];
  const agencyLookups: LeadSource[] = [];
  const agency = overrides?.agency === undefined ? null : overrides.agency;

  const deps: SubmitLeadDeps = {
    async lookupAgencyContact(source) {
      agencyLookups.push(source);
      return agency;
    },
    async insertLead(row) {
      inserted.push(row);
      return { id: `lead-${inserted.length}` };
    },
    email,
    rateLimit:
      overrides?.rateLimit ?? createInMemoryRateLimiter({ limit: 3, windowMs: 60_000 }),
    defaultToEmail: "admin@tedros.local",
  };

  return {
    email,
    inserted,
    get insertCount() {
      return inserted.length;
    },
    agency,
    agencyLookups,
    deps,
  };
}

const baseFields = (overrides: Record<string, string> = {}) => ({
  name: "Or Hazan",
  email: "or@example.com",
  phone: "+972-50-1234567",
  message: "I would like more info.",
  source: "mortgage-calc",
  locale: "he",
  ...overrides,
});

describe("submitLead — happy path", () => {
  it("inserts the lead and sends both agency + auto-reply emails", async () => {
    const h = buildHarness();
    const result = await submitLead(
      { formData: baseFields(), ip: "203.0.113.10", userAgent: "vitest" },
      h.deps,
    );
    expect(result.kind).toBe("ok");
    if (result.kind !== "ok") return;
    expect(result.leadId).toBe("lead-1");
    expect(result.emailedAgency).toBe(true);
    expect(result.emailedUser).toBe(true);

    expect(h.inserted).toHaveLength(1);
    const row = h.inserted[0]!;
    expect(row.listingId).toBeNull();
    expect(row.contact.source).toBe("mortgage-calc");
    expect(row.metadata.sourceKind).toBe("mortgage-calc");
    expect(row.metadata.locale).toBe("he");
    expect(row.metadata.ip).toBe("203.0.113.10");

    expect(h.email.sent).toHaveLength(2);
    const [agencyMail, userMail] = h.email.sent;
    expect(agencyMail!.to).toBe("admin@tedros.local");
    expect(agencyMail!.replyTo).toBe("or@example.com");
    expect(agencyMail!.tags?.find((t) => t.name === "type")?.value).toBe(
      "lead-to-agency",
    );
    expect(userMail!.to).toBe("or@example.com");
    expect(userMail!.tags?.find((t) => t.name === "type")?.value).toBe("lead-auto-reply");
  });

  it("sets listing_id and routes to the agency when source = listing:{uuid} resolves", async () => {
    const h = buildHarness({
      agency: {
        agencyId: AGENCY_ID,
        email: "office@my-agency.example",
        dashboardUrl: "https://tedros.local/dashboard/leads",
      },
    });
    const result = await submitLead(
      {
        formData: baseFields({ source: `listing:${LISTING_ID}` }),
        ip: "203.0.113.11",
      },
      h.deps,
    );
    expect(result.kind).toBe("ok");
    expect(h.inserted[0]?.listingId).toBe(LISTING_ID);
    expect(h.email.sent[0]?.to).toBe("office@my-agency.example");
    // Dashboard link should appear in the agency mail body.
    expect(h.email.sent[0]?.html).toContain("https://tedros.local/dashboard/leads");
  });

  it("falls back to the default recipient when no agency is found", async () => {
    const h = buildHarness({ agency: null });
    await submitLead(
      { formData: baseFields({ source: `agency:${AGENCY_ID}` }), ip: "1.1.1.1" },
      h.deps,
    );
    expect(h.email.sent[0]?.to).toBe("admin@tedros.local");
  });
});

describe("submitLead — validation", () => {
  it("rejects an empty name", async () => {
    const h = buildHarness();
    const result = await submitLead(
      { formData: baseFields({ name: "" }), ip: "1.1.1.1" },
      h.deps,
    );
    expect(result.kind).toBe("validation_error");
    if (result.kind !== "validation_error") return;
    expect(result.errors.name).toBeDefined();
    expect(h.insertCount).toBe(0);
    expect(h.email.sent).toHaveLength(0);
  });

  it("rejects invalid email", async () => {
    const h = buildHarness();
    const result = await submitLead(
      { formData: baseFields({ email: "not-an-email" }), ip: "1.1.1.1" },
      h.deps,
    );
    expect(result.kind).toBe("validation_error");
  });

  it("requires email or phone", async () => {
    const h = buildHarness();
    const result = await submitLead(
      { formData: baseFields({ email: "", phone: "" }), ip: "1.1.1.1" },
      h.deps,
    );
    expect(result.kind).toBe("validation_error");
    if (result.kind !== "validation_error") return;
    expect(Object.values(result.errors)).toContain("contact_required");
  });

  it("rejects unknown source tokens", async () => {
    const h = buildHarness();
    const result = await submitLead(
      { formData: baseFields({ source: "weird:thing" }), ip: "1.1.1.1" },
      h.deps,
    );
    expect(result.kind).toBe("validation_error");
  });
});

describe("submitLead — honeypot", () => {
  it("returns honeypot, writes nothing, sends nothing", async () => {
    const h = buildHarness();
    const result = await submitLead(
      {
        formData: baseFields({ website: "http://spam.example" }),
        ip: "1.1.1.1",
      },
      h.deps,
    );
    expect(result.kind).toBe("honeypot");
    expect(h.insertCount).toBe(0);
    expect(h.email.sent).toHaveLength(0);
  });
});

describe("submitLead — rate limit", () => {
  it("blocks the 4th lead from the same IP within the window", async () => {
    const h = buildHarness();
    const ip = "198.51.100.5";
    for (let i = 0; i < 3; i++) {
      const r = await submitLead({ formData: baseFields(), ip }, h.deps);
      expect(r.kind).toBe("ok");
    }
    const blocked = await submitLead({ formData: baseFields(), ip }, h.deps);
    expect(blocked.kind).toBe("rate_limited");
    if (blocked.kind === "rate_limited") {
      expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
    }
    // 4th attempt must not insert or send mail.
    expect(h.insertCount).toBe(3);
    expect(h.email.sent.length).toBe(6); // 3 leads × 2 mails each
  });
});

describe("submitLead — Turnstile", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("rejects the lead when verifyTurnstile returns false", async () => {
    const h = buildHarness();
    const verify = vi.fn(async () => false);
    const result = await submitLead(
      { formData: baseFields({ turnstileToken: "tk-1" }), ip: "1.1.1.1" },
      { ...h.deps, verifyTurnstile: verify },
    );
    expect(result.kind).toBe("turnstile_failed");
    expect(verify).toHaveBeenCalledWith("tk-1", "1.1.1.1");
    expect(h.insertCount).toBe(0);
    expect(h.email.sent).toHaveLength(0);
  });

  it("accepts the lead when verifyTurnstile returns true", async () => {
    const h = buildHarness();
    const verify = vi.fn(async () => true);
    const result = await submitLead(
      { formData: baseFields({ turnstileToken: "tk-ok" }), ip: "1.1.1.1" },
      { ...h.deps, verifyTurnstile: verify },
    );
    expect(result.kind).toBe("ok");
  });
});

describe("submitLead — resilience", () => {
  it("still returns ok when the agency send throws (lead row already saved)", async () => {
    const h = buildHarness();
    let calls = 0;
    h.deps.email = {
      async send() {
        calls++;
        if (calls === 1) throw new Error("boom: agency");
        return { id: "ok", provider: "mock" };
      },
    };
    const result = await submitLead({ formData: baseFields(), ip: "1.1.1.1" }, h.deps);
    expect(result.kind).toBe("ok");
    if (result.kind !== "ok") return;
    expect(result.emailedAgency).toBe(false);
    expect(result.emailedUser).toBe(true);
    expect(h.insertCount).toBe(1);
  });
});
