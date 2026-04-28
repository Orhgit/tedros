import { describe, expect, it, vi } from "vitest";

import { createMockAdapter, createResendAdapter } from "../app/lib/integrations/resend";

describe("createMockAdapter", () => {
  it("captures sends and returns a mock id", async () => {
    const mock = createMockAdapter();
    const result = await mock.send({
      to: "to@example.com",
      subject: "hi",
      html: "<p>hi</p>",
      text: "hi",
    });
    expect(result.provider).toBe("mock");
    expect(result.id).toMatch(/^mock-/);
    expect(mock.sent).toHaveLength(1);
    expect(mock.sent[0]?.to).toBe("to@example.com");
  });

  it("reset() clears captured sends", async () => {
    const mock = createMockAdapter();
    await mock.send({ to: "a@b.c", subject: "s", html: "h", text: "t" });
    mock.reset();
    expect(mock.sent).toHaveLength(0);
  });
});

describe("createResendAdapter", () => {
  it("POSTs the expected body to Resend with the bearer token", async () => {
    const fetchImpl = vi.fn(async () => {
      return new Response(JSON.stringify({ id: "re_abc123" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }) as unknown as typeof fetch;

    const adapter = createResendAdapter({
      apiKey: "test-key",
      defaultFrom: "no-reply@tedros.local",
      fetchImpl,
    });

    const result = await adapter.send({
      to: "agent@example.com",
      subject: "subject",
      html: "<p>html</p>",
      text: "text",
      replyTo: "user@example.com",
      tags: [{ name: "type", value: "lead-to-agency" }],
    });

    expect(result.id).toBe("re_abc123");
    expect(result.provider).toBe("resend");
    expect(fetchImpl).toHaveBeenCalledOnce();
    const [url, init] = (fetchImpl as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.method).toBe("POST");
    expect((init.headers as Record<string, string>).authorization).toBe(
      "Bearer test-key",
    );
    const body = JSON.parse(init.body as string);
    expect(body.from).toBe("no-reply@tedros.local");
    expect(body.to).toEqual(["agent@example.com"]);
    expect(body.reply_to).toEqual(["user@example.com"]);
    expect(body.tags).toEqual([{ name: "type", value: "lead-to-agency" }]);
  });

  it("throws on non-2xx responses", async () => {
    const fetchImpl = vi.fn(
      async () => new Response("nope", { status: 401, statusText: "Unauthorized" }),
    ) as unknown as typeof fetch;
    const adapter = createResendAdapter({
      apiKey: "bad",
      defaultFrom: "x@y.z",
      fetchImpl,
    });
    await expect(
      adapter.send({ to: "a@b.c", subject: "s", html: "h", text: "t" }),
    ).rejects.toThrow(/Resend send failed \(401/);
  });
});
