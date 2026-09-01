// Loader integration tests for the Careers Hub Wave 2 routes (RIN-472):
// bootcamp detail (`/:lang/careers/programs/:program`) and the
// affirmative-action explainer (`/:lang/careers/affirmative-action`).

import { beforeAll, describe, expect, it } from "vitest";

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
});

import { loader as bootcampLoader } from "../app/routes/$lang.careers.programs.$program";
import { loader as affirmativeActionLoader } from "../app/routes/$lang.careers.affirmative-action";
import { BOOTCAMPS } from "../app/lib/careers/bootcamps.server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
function fakeArgs(params: Record<string, string | undefined>): AnyArgs {
  return { params };
}

describe("bootcamp detail loader — happy path", () => {
  it("loads every bootcamp in every locale without throwing", async () => {
    for (const b of BOOTCAMPS) {
      for (const lang of ["he", "en", "am"]) {
        const data = await bootcampLoader(fakeArgs({ lang, program: b.slug }));
        expect(data.entry.slug).toBe(b.slug);
        expect(data.locale).toBe(lang);
        expect(data.html.length).toBeGreaterThan(50);
        // Track context resolves correctly.
        expect(data.track.slug).toBe(b.trackSlug);
      }
    }
  });

  it("resolves the hosting org through the orgs query layer", async () => {
    const enp = await bootcampLoader(
      fakeArgs({ lang: "he", program: "olim-beyahad-mentorship" }),
    );
    expect(enp.org).not.toBeNull();
    expect(enp.org?.slug).toBe("olim-beyahad");
  });

  it("returns sibling bootcamps in the same track (≤3, excluding self)", async () => {
    const tech = await bootcampLoader(
      fakeArgs({ lang: "he", program: "olim-beyahad-mentorship" }),
    );
    expect(tech.siblings.length).toBeLessThanOrEqual(3);
    expect(tech.siblings.find((s) => s.slug === "olim-beyahad-mentorship")).toBeUndefined();
  });

  it("surfaces relatedRights through the rights query layer", async () => {
    const enp = await bootcampLoader(
      fakeArgs({ lang: "he", program: "olim-beyahad-mentorship" }),
    );
    expect(enp.relatedRights.find((r) => r.slug === "student-aid")).toBeDefined();
  });

  it("resolves cities into name/slug pairs", async () => {
    const enp = await bootcampLoader(
      fakeArgs({ lang: "he", program: "olim-beyahad-mentorship" }),
    );
    expect(enp.cityNames.find((c) => c.slug === "tel-aviv")).toBeDefined();
  });
});

describe("bootcamp detail loader — error paths", () => {
  it("404s when program param is missing", async () => {
    await expect(
      bootcampLoader(fakeArgs({ lang: "he", program: undefined })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });

  it("404s when program slug is unknown", async () => {
    await expect(
      bootcampLoader(fakeArgs({ lang: "he", program: "nope" })),
    ).rejects.toMatchObject({ init: { status: 404 } });
  });
});

describe("affirmative-action loader", () => {
  it("renders for HE/EN/AM with non-empty body", async () => {
    for (const lang of ["he", "en", "am"]) {
      const data = await affirmativeActionLoader(fakeArgs({ lang }));
      expect(data.locale).toBe(lang);
      expect(data.html.length).toBeGreaterThan(200);
    }
  });

  it("falls back to HE for unknown locales", async () => {
    const data = await affirmativeActionLoader(fakeArgs({ lang: "xx" }));
    expect(data.locale).toBe("he");
  });
});
