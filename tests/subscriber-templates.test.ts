import { describe, expect, it } from "vitest";

import {
  renderConfirmationEmail,
  renderWelcomeEmail,
} from "../app/lib/subscribers/templates";
import type { Locale } from "../app/lib/i18n/config";

const LOCALES: Locale[] = ["he", "en", "am"];

describe("renderConfirmationEmail", () => {
  for (const locale of LOCALES) {
    it(`renders ${locale}: subject + html + text + URL`, () => {
      const url = "https://tedros.local/he/subscribe/confirm/abc";
      const out = renderConfirmationEmail({ locale, confirmUrl: url });
      expect(out.subject).toMatch(/Tedros/);
      expect(out.html).toContain(url);
      expect(out.html).toContain(`dir="${locale === "he" ? "rtl" : "ltr"}"`);
      expect(out.text).toContain(url);
      expect(out.text.length).toBeGreaterThan(0);
    });
  }

  it("escapes HTML in the URL to prevent XSS", () => {
    const url = "https://example.com/?x=<script>";
    const out = renderConfirmationEmail({ locale: "he", confirmUrl: url });
    expect(out.html).not.toContain("<script>");
    expect(out.html).toContain("&lt;script&gt;");
  });
});

describe("renderWelcomeEmail", () => {
  for (const locale of LOCALES) {
    it(`renders ${locale}: includes unsubscribe URL + signature`, () => {
      const url = "https://tedros.local/he/subscribe/unsubscribe/xyz";
      const out = renderWelcomeEmail({ locale, unsubscribeUrl: url });
      expect(out.subject).toMatch(/Tedros/);
      expect(out.html).toContain(url);
      expect(out.text).toContain(url);
    });
  }
});
