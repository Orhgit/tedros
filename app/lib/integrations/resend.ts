// Resend adapter (ADR-001 v3 — Resend is the outbound mail provider).
// Interface-first so tests and dev environments can swap a mock for the
// real HTTP client without touching call-sites.
//
// We hit the Resend REST API directly via `fetch` rather than depending on
// the `resend` npm package — keeps the bundle lean and avoids adding a
// dependency for a single endpoint (`POST /emails`).

export type EmailAddress = string;

export interface SendEmailInput {
  to: EmailAddress | EmailAddress[];
  from?: EmailAddress;
  replyTo?: EmailAddress | EmailAddress[];
  subject: string;
  html: string;
  text: string;
  // Useful for grouping in Resend dashboards and for testability.
  tags?: { name: string; value: string }[];
}

export interface SendEmailResult {
  id: string;
  // Whether this came from a real provider or the mock — handy in tests.
  provider: "resend" | "mock";
}

export interface EmailAdapter {
  send(input: SendEmailInput): Promise<SendEmailResult>;
}

// --- Resend HTTP implementation -------------------------------------------

interface ResendConfig {
  apiKey: string;
  defaultFrom: EmailAddress;
  // Allow tests to inject a fake fetch.
  fetchImpl?: typeof fetch;
}

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export function createResendAdapter(config: ResendConfig): EmailAdapter {
  const fetchImpl = config.fetchImpl ?? fetch;
  return {
    async send(input) {
      const from = input.from ?? config.defaultFrom;
      const body = {
        from,
        to: Array.isArray(input.to) ? input.to : [input.to],
        subject: input.subject,
        html: input.html,
        text: input.text,
        ...(input.replyTo
          ? { reply_to: Array.isArray(input.replyTo) ? input.replyTo : [input.replyTo] }
          : {}),
        ...(input.tags ? { tags: input.tags } : {}),
      };
      const res = await fetchImpl(RESEND_ENDPOINT, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errBody = await safeReadText(res);
        throw new Error(
          `Resend send failed (${res.status} ${res.statusText}): ${errBody}`,
        );
      }
      const json = (await res.json()) as { id?: string };
      if (!json.id) {
        throw new Error("Resend response missing id");
      }
      return { id: json.id, provider: "resend" };
    },
  };
}

async function safeReadText(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return "<no body>";
  }
}

// --- Mock adapter (dev + tests) -------------------------------------------
// Captures sends in-memory and (in dev) prints a one-liner to stdout so the
// developer can see that a mail would have been delivered.

export interface MockEmailAdapter extends EmailAdapter {
  readonly sent: SendEmailInput[];
  reset(): void;
}

export function createMockAdapter(
  options: { logToConsole?: boolean } = {},
): MockEmailAdapter {
  const sent: SendEmailInput[] = [];
  let counter = 0;
  return {
    sent,
    reset() {
      sent.length = 0;
      counter = 0;
    },
    async send(input) {
      sent.push(input);
      counter += 1;
      if (options.logToConsole) {
        const to = Array.isArray(input.to) ? input.to.join(", ") : input.to;
        console.log(`[email:mock] → ${to}  ${input.subject}`);
      }
      return { id: `mock-${counter}`, provider: "mock" };
    },
  };
}
