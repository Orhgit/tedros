// Cloudflare Turnstile server-side verification.
// Stays a no-op (always-allow) when TURNSTILE_SECRET_KEY is unset, which is
// the documented dev/test path — the honeypot is the only protection then.

const TURNSTILE_ENDPOINT = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export interface TurnstileVerifierOptions {
  secret: string;
  fetchImpl?: typeof fetch;
}

export function createTurnstileVerifier(opts: TurnstileVerifierOptions) {
  const fetchImpl = opts.fetchImpl ?? fetch;
  return async (token: string, ip?: string): Promise<boolean> => {
    if (!token) return false;
    const body = new URLSearchParams({ secret: opts.secret, response: token });
    if (ip) body.set("remoteip", ip);
    try {
      const res = await fetchImpl(TURNSTILE_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) return false;
      const json = (await res.json()) as { success?: boolean };
      return json.success === true;
    } catch {
      return false;
    }
  };
}
