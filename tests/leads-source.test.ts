import { describe, expect, it } from "vitest";

import { parseLeadSource, serializeLeadSource } from "../app/lib/leads/source";

const UUID = "11111111-2222-3333-4444-555555555555";

describe("parseLeadSource", () => {
  it("parses listing:{uuid}", () => {
    expect(parseLeadSource(`listing:${UUID}`)).toEqual({
      kind: "listing",
      listingId: UUID,
    });
  });

  it("parses agency:{uuid}", () => {
    expect(parseLeadSource(`agency:${UUID}`)).toEqual({
      kind: "agency",
      agencyId: UUID,
    });
  });

  it("parses urban-renewal:{slug}", () => {
    expect(parseLeadSource("urban-renewal:kiryat-moshe")).toEqual({
      kind: "urban-renewal",
      slug: "kiryat-moshe",
    });
  });

  it("parses bare tokens", () => {
    expect(parseLeadSource("mortgage-calc")).toEqual({ kind: "mortgage-calc" });
    expect(parseLeadSource("general")).toEqual({ kind: "general" });
  });

  it("rejects malformed values", () => {
    expect(parseLeadSource(undefined)).toBeNull();
    expect(parseLeadSource(null)).toBeNull();
    expect(parseLeadSource("")).toBeNull();
    expect(parseLeadSource("listing:not-a-uuid")).toBeNull();
    expect(parseLeadSource("urban-renewal:WITH_CAPS")).toBeNull();
    expect(parseLeadSource("unknown:value")).toBeNull();
  });
});

describe("serializeLeadSource", () => {
  it("round-trips through parse", () => {
    const cases = [
      { kind: "listing" as const, listingId: UUID },
      { kind: "agency" as const, agencyId: UUID },
      { kind: "urban-renewal" as const, slug: "ramat-eliyahu" },
      { kind: "mortgage-calc" as const },
      { kind: "general" as const },
    ];
    for (const source of cases) {
      const serialized = serializeLeadSource(source);
      expect(parseLeadSource(serialized)).toEqual(source);
    }
  });
});
