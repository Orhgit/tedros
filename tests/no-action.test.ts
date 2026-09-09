import { describe, expect, it } from "vitest";
import { isWriteMethod, rejectUnhandledWrite } from "~/lib/http/no-action";

/**
 * TED-166: unmatched POSTs used to make React Router build a full `Error`
 * with a stack trace per request, which is the memory pressure behind the
 * production OOM crash loop. The contract these tests lock in is that the
 * rejection is a bare `Response` — never an `Error` — so nothing captures a
 * stack.
 */
describe("rejectUnhandledWrite", () => {
  function thrown(status: 404 | 405): unknown {
    try {
      rejectUnhandledWrite(status);
    } catch (caught) {
      return caught;
    }
    throw new Error("rejectUnhandledWrite did not throw");
  }

  it("throws a Response, not an Error, so no stack trace is captured", () => {
    for (const status of [404, 405] as const) {
      const caught = thrown(status);
      expect(caught).toBeInstanceOf(Response);
      expect(caught).not.toBeInstanceOf(Error);
    }
  });

  it("404 has no Allow header — the path simply does not exist", async () => {
    const response = thrown(404) as Response;
    expect(response.status).toBe(404);
    expect(response.headers.get("Allow")).toBeNull();
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    await expect(response.text()).resolves.toBe("Not Found");
  });

  it("405 advertises the methods that are allowed (RFC 9110 §15.5.6)", async () => {
    const response = thrown(405) as Response;
    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe("GET, HEAD");
    await expect(response.text()).resolves.toBe("Method Not Allowed");
  });
});

describe("isWriteMethod", () => {
  it("covers the methods React Router dispatches to `action`", () => {
    for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
      expect(isWriteMethod(method)).toBe(true);
      expect(isWriteMethod(method.toLowerCase())).toBe(true);
    }
  });

  it("leaves read methods to the loader", () => {
    for (const method of ["GET", "HEAD", "OPTIONS"]) {
      expect(isWriteMethod(method)).toBe(false);
    }
  });
});

describe("catch-all route actions", () => {
  it("routes/$ answers 404 for the scanner paths it swallows", async () => {
    const { action } = await import("~/routes/$");
    // The splat covers paths that match nothing, e.g. /wp-admin/admin-ajax.php.
    const caught = await action({} as never).catch((error: unknown) => error);
    expect(caught).toBeInstanceOf(Response);
    expect((caught as Response).status).toBe(404);
  });
});
