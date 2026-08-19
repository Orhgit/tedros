// End-to-end test for `submitApplication` — the dependency-injected core
// the route action wraps. Exercises validation, honeypot, rate limit, and
// email dispatch without spinning up a DB. Mirrors leads-submit.test.ts.

import { describe, expect, it } from "vitest";

import { createMockAdapter } from "../app/lib/integrations/resend";
import { createInMemoryRateLimiter } from "../app/lib/leads/rate-limit";
import {
  formDataToApplicationInput,
  submitApplication,
  type ApplicationInsertRow,
  type SubmitApplicationDeps,
} from "../app/lib/professional-applications/submit-application";

function buildHarness(overrides?: { rateLimit?: SubmitApplicationDeps["rateLimit"] }) {
  const email = createMockAdapter();
  const inserted: ApplicationInsertRow[] = [];
  const deps: SubmitApplicationDeps = {
    async insertApplication(row) {
      inserted.push(row);
      return { id: `app-${inserted.length}` };
    },
    email,
    rateLimit:
      overrides?.rateLimit ?? createInMemoryRateLimiter({ limit: 3, windowMs: 60_000 }),
    notifyToEmail: "admin@tedros.local",
  };
  return { email, inserted, deps };
}

const baseFields = (overrides: Record<string, unknown> = {}) => ({
  name: "Maniela Mula",
  profession: "real-estate-agent",
  phone: "055-4543814",
  primaryRegions: ["jerusalem", "maale-adumim"],
  secondaryRegions: [],
  languages: ["am", "he"],
  consentToPublish: "on",
  locale: "he",
  website: "",
  ...overrides,
});

describe("submitApplication — happy path", () => {
  it("inserts the application and notifies the admin inbox", async () => {
    const h = buildHarness();
    const result = await submitApplication(
      { raw: baseFields(), ip: "203.0.113.10" },
      h.deps,
    );
    expect(result.kind).toBe("ok");
    if (result.kind !== "ok") return;
    expect(result.applicationId).toBe("app-1");
    expect(result.emailedAdmin).toBe(true);

    expect(h.inserted).toHaveLength(1);
    const row = h.inserted[0]!;
    expect(row.name).toBe("Maniela Mula");
    expect(row.profession).toBe("real-estate-agent");
    expect(row.primaryRegions).toEqual(["jerusalem", "maale-adumim"]);
    expect(row.nationwideRemote).toBe(false);
    expect(row.consentToPublish).toBe(true);

    expect(h.email.sent).toHaveLength(1);
    expect(h.email.sent[0]!.to).toBe("admin@tedros.local");
    expect(h.email.sent[0]!.subject).toContain("Maniela Mula");
  });

  it("accepts nationwide-remote for a location-optional profession with no regions", async () => {
    const h = buildHarness();
    const result = await submitApplication(
      {
        raw: baseFields({
          profession: "accountant",
          primaryRegions: [],
          nationwideRemote: "on",
        }),
        ip: "203.0.113.11",
      },
      h.deps,
    );
    expect(result.kind).toBe("ok");
    expect(h.inserted[0]!.nationwideRemote).toBe(true);
    expect(h.inserted[0]!.primaryRegions).toEqual([]);
  });
});

describe("submitApplication — validation", () => {
  it("rejects an unknown profession", async () => {
    const h = buildHarness();
    const result = await submitApplication(
      { raw: baseFields({ profession: "astronaut" }), ip: "203.0.113.12" },
      h.deps,
    );
    expect(result.kind).toBe("validation_error");
    expect(h.inserted).toHaveLength(0);
  });

  it("rejects a submission with no regions and no nationwide flag", async () => {
    const h = buildHarness();
    const result = await submitApplication(
      { raw: baseFields({ primaryRegions: [] }), ip: "203.0.113.13" },
      h.deps,
    );
    expect(result.kind).toBe("validation_error");
    if (result.kind !== "validation_error") return;
    expect(result.errors.primaryRegions).toBeDefined();
  });

  it("rejects more than 2 primary regions", async () => {
    const h = buildHarness();
    const result = await submitApplication(
      {
        raw: baseFields({
          primaryRegions: ["jerusalem", "haifa", "netanya"],
        }),
        ip: "203.0.113.14",
      },
      h.deps,
    );
    expect(result.kind).toBe("validation_error");
  });

  it("rejects a submission without consent", async () => {
    const h = buildHarness();
    const result = await submitApplication(
      { raw: baseFields({ consentToPublish: "" }), ip: "203.0.113.15" },
      h.deps,
    );
    expect(result.kind).toBe("validation_error");
  });

  it("rejects a submission with no languages", async () => {
    const h = buildHarness();
    const result = await submitApplication(
      { raw: baseFields({ languages: [] }), ip: "203.0.113.16" },
      h.deps,
    );
    expect(result.kind).toBe("validation_error");
  });

  it("rejects an invalid phone number", async () => {
    const h = buildHarness();
    const result = await submitApplication(
      { raw: baseFields({ phone: "abc" }), ip: "203.0.113.17" },
      h.deps,
    );
    expect(result.kind).toBe("validation_error");
  });
});

describe("submitApplication — spam protection", () => {
  it("silently drops honeypot submissions without inserting or emailing", async () => {
    const h = buildHarness();
    const result = await submitApplication(
      { raw: baseFields({ website: "http://spam.example" }), ip: "203.0.113.18" },
      h.deps,
    );
    expect(result.kind).toBe("honeypot");
    expect(h.inserted).toHaveLength(0);
    expect(h.email.sent).toHaveLength(0);
  });

  it("rate-limits after the configured number of attempts", async () => {
    const h = buildHarness({
      rateLimit: createInMemoryRateLimiter({ limit: 1, windowMs: 60_000 }),
    });
    const first = await submitApplication(
      { raw: baseFields(), ip: "203.0.113.19" },
      h.deps,
    );
    expect(first.kind).toBe("ok");
    const second = await submitApplication(
      { raw: baseFields(), ip: "203.0.113.19" },
      h.deps,
    );
    expect(second.kind).toBe("rate_limited");
  });
});

describe("formDataToApplicationInput", () => {
  it("collects repeated keys into arrays for multi-select fields", () => {
    const fd = new FormData();
    fd.append("name", "Test");
    fd.append("primaryRegions", "jerusalem");
    fd.append("primaryRegions", "haifa");
    fd.append("languages", "he");
    fd.append("languages", "am");

    const raw = formDataToApplicationInput(fd);
    expect(raw.name).toBe("Test");
    expect(raw.primaryRegions).toEqual(["jerusalem", "haifa"]);
    expect(raw.languages).toEqual(["he", "am"]);
  });

  it("keeps single-value fields as plain strings", () => {
    const fd = new FormData();
    fd.append("phone", "055-1234567");
    const raw = formDataToApplicationInput(fd);
    expect(raw.phone).toBe("055-1234567");
  });
});
