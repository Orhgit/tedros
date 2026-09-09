/**
 * Cheap rejection for write requests to routes that have no `action` (TED-166).
 *
 * Vulnerability scanners hammer this site with POSTs to paths that don't
 * exist (`/wp-admin/admin-ajax.php`, `/login`, `/.git/config`, `POST /` …).
 * Without an `action` export, React Router answers each one by constructing a
 * `new Error(...)` with a full stack trace inside `ErrorResponseImpl`
 * ("You made a POST request to "X" but did not provide an `action` …"). At
 * scanner volume that is thousands of captured stack traces flowing through
 * the request pipeline and the error logger, which is the pressure that
 * pushed the production container into `FATAL ERROR: Reached heap limit`.
 *
 * Throwing a bare `Response` instead produces a route error response with no
 * `Error` object and no stack capture, so the request costs the same as any
 * GET that misses.
 */

/** Methods React Router dispatches to `action` rather than `loader`. */
const WRITE_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export function isWriteMethod(method: string): boolean {
  return WRITE_METHODS.has(method.toUpperCase());
}

/**
 * Reject a write request to a path that has no handler. Always throws.
 *
 * Use 404 for paths that genuinely don't exist, 405 for paths that exist but
 * only serve GET.
 */
export function rejectUnhandledWrite(status: 404 | 405): never {
  throw new Response(status === 404 ? "Not Found" : "Method Not Allowed", {
    status,
    headers: {
      // 405 must advertise what *is* allowed (RFC 9110 §15.5.6).
      ...(status === 405 ? { Allow: "GET, HEAD" } : {}),
      "Cache-Control": "no-store",
    },
  });
}
