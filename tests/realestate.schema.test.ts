import { describe, expect, it } from "vitest";
import { getTableConfig } from "drizzle-orm/pg-core";

import { agencies, agencyMembers } from "../app/lib/db/schema/identity";
import {
  leadStatusEnum,
  leads,
  listingStatusEnum,
  listingTypeEnum,
  listings,
} from "../app/lib/db/schema/realestate";
import { verificationStatusEnum } from "../app/lib/db/schema/identity";
import { DEMO_LISTINGS, validateSeedListings } from "../app/lib/db/seeds/listings";
import { PAYLOAD_COLLECTIONS } from "../app/lib/cms/collections";

describe("listing_type enum", () => {
  it("includes all six types required by TED-21", () => {
    expect(listingTypeEnum.enumValues).toEqual(
      expect.arrayContaining([
        "sale",
        "rent",
        "urban_renewal",
        "investment",
        "gov_program",
        "commercial",
      ]),
    );
  });
});

describe("listing_status enum", () => {
  it("includes draft / active / sold / rented", () => {
    expect(listingStatusEnum.enumValues).toEqual(
      expect.arrayContaining(["draft", "active", "sold", "rented"]),
    );
  });
});

describe("verification_status enum", () => {
  it("includes suspended", () => {
    expect(verificationStatusEnum.enumValues).toContain("suspended");
  });
});

describe("lead_status enum", () => {
  it("matches the TED-21 lifecycle", () => {
    expect(leadStatusEnum.enumValues).toEqual([
      "pending",
      "assigned",
      "contacted",
      "closed",
    ]);
  });
});

describe("listings table", () => {
  it("has a status column with default 'draft'", () => {
    const cfg = getTableConfig(listings);
    const status = cfg.columns.find((c) => c.name === "status");
    expect(status).toBeDefined();
    expect(status?.notNull).toBe(true);
    expect(status?.default).toBe("draft");
  });
});

describe("agencies table", () => {
  it("has legal_id and license_number columns", () => {
    const cfg = getTableConfig(agencies);
    const cols = cfg.columns.map((c) => c.name);
    expect(cols).toContain("legal_id");
    expect(cols).toContain("license_number");
  });
});

describe("agency_members table", () => {
  it("has a status column", () => {
    const cfg = getTableConfig(agencyMembers);
    const cols = cfg.columns.map((c) => c.name);
    expect(cols).toContain("status");
  });
});

describe("leads table", () => {
  it("has direct agency_id + normalised contact columns", () => {
    const cfg = getTableConfig(leads);
    const cols = cfg.columns.map((c) => c.name);
    for (const required of ["agency_id", "name", "email", "phone", "message"]) {
      expect(cols).toContain(required);
    }
  });
});

describe("DEMO_LISTINGS seed", () => {
  it("contains 5 listings", () => {
    expect(DEMO_LISTINGS).toHaveLength(5);
  });

  it("covers at least 4 distinct listing types", () => {
    const types = new Set(DEMO_LISTINGS.map((l) => l.type));
    expect(types.size).toBeGreaterThanOrEqual(4);
  });

  it("validates each listing's attributes", () => {
    expect(() => validateSeedListings()).not.toThrow();
  });
});

describe("Payload collection blueprints", () => {
  it("includes the five collections from the agent identity", () => {
    const slugs = PAYLOAD_COLLECTIONS.map((c) => c.slug).sort();
    expect(slugs).toEqual(["agencies", "articles", "listings", "programs", "rights"]);
  });

  it("each blueprint maps to a known Drizzle table", () => {
    const drizzleTables = new Set([
      "listings",
      "agencies",
      "articles",
      "rights",
      "programs",
    ]);
    for (const c of PAYLOAD_COLLECTIONS) {
      expect(drizzleTables.has(c.drizzleTable)).toBe(true);
    }
  });
});
