// Application-layer multi-tenant scoping (TED-21).
//
// We don't use Postgres RLS — Auth.js owns the connection pool and there's
// no per-request `SET app.current_user`. Instead, every agency-scoped query
// goes through the helpers below and they bake the `agency_id` filter into
// the WHERE clause. The contract:
//
//   1. The action layer calls `requireAgencyMember(userId, agencyId)` first.
//   2. Then it calls one of the `for*Of(agencyId)` helpers to build the
//      WHERE fragment that scopes the query.
//
// Step 2 is paranoia in depth — even if a future bug skips step 1, the
// query still cannot leak rows from another agency unless `agencyId` itself
// is wrong.

import { and, eq, isNull, sql, type SQL } from "drizzle-orm";

import { db } from "../db.server";
import {
  AGENCY_ROLES,
  agencies,
  agencyMembers,
  type AgencyRoleInAgency,
} from "./schema/identity";
import { leads, listings } from "./schema/realestate";

// --- Membership check ------------------------------------------------------

export type AgencyMembership = {
  userId: string;
  agencyId: string;
  roleInAgency: AgencyRoleInAgency;
  status: "invited" | "active" | "suspended";
};

/**
 * Returns the membership row if the user is an *active* member of the
 * agency. Suspended/invited memberships do not grant access.
 */
export async function getActiveMembership(
  userId: string,
  agencyId: string,
): Promise<AgencyMembership | null> {
  const rows = await db
    .select({
      userId: agencyMembers.userId,
      agencyId: agencyMembers.agencyId,
      roleInAgency: agencyMembers.roleInAgency,
      status: agencyMembers.status,
    })
    .from(agencyMembers)
    .where(
      and(
        eq(agencyMembers.userId, userId),
        eq(agencyMembers.agencyId, agencyId),
        eq(agencyMembers.status, "active"),
      ),
    )
    .limit(1);
  const row = rows[0];
  if (!row) return null;
  // `roleInAgency` is text in the DB; narrow to the enum here.
  if (!(AGENCY_ROLES as readonly string[]).includes(row.roleInAgency)) {
    return null;
  }
  return row as AgencyMembership;
}

/**
 * Throws a 403 Response if the user is not an active member.
 * Call from a server action before scoping queries.
 */
export async function requireAgencyMember(
  userId: string,
  agencyId: string,
): Promise<AgencyMembership> {
  const m = await getActiveMembership(userId, agencyId);
  if (!m) {
    throw new Response("Forbidden — not a member of this agency", {
      status: 403,
    });
  }
  return m;
}

/**
 * Throws unless the user is the agency *owner*. Used for high-stakes
 * actions like deleting the agency or rotating the primary contact.
 */
export async function requireAgencyOwner(
  userId: string,
  agencyId: string,
): Promise<AgencyMembership> {
  const m = await requireAgencyMember(userId, agencyId);
  if (m.roleInAgency !== "owner") {
    throw new Response("Forbidden — owner role required", { status: 403 });
  }
  return m;
}

// --- Publish gate ----------------------------------------------------------

/**
 * Per ADR-005 + TED-21: a listing can only transition to `status='active'`
 * if the agency's verification_status is `verified`. Suspended / pending /
 * rejected agencies see their listings frozen at `draft`.
 */
export async function canPublishListing(agencyId: string): Promise<boolean> {
  const rows = await db
    .select({ status: agencies.verificationStatus })
    .from(agencies)
    .where(eq(agencies.id, agencyId))
    .limit(1);
  return rows[0]?.status === "verified";
}

export async function requirePublishGate(agencyId: string): Promise<void> {
  if (!(await canPublishListing(agencyId))) {
    throw new Response("Forbidden — agency must be verified before publishing listings", {
      status: 403,
    });
  }
}

// --- WHERE-fragment helpers ------------------------------------------------
// Tiny `SQL`-builders for the two agency-scoped tables. Compose with `and()`
// at the call site:
//
//   const rows = await db.select().from(listings)
//     .where(and(forListingsOf(agencyId), eq(listings.status, "active")));

export function forListingsOf(agencyId: string): SQL {
  return and(eq(listings.agencyId, agencyId), isNull(listings.deletedAt)) as SQL;
}

export function forLeadsOf(agencyId: string): SQL {
  return eq(leads.agencyId, agencyId);
}

// --- Public-site visibility -----------------------------------------------
// Use on `/listings` and `/listings/:slug` loaders. The partial index
// `listings_live_published_idx` is keyed off the same predicate.

export function publiclyVisibleListing(): SQL {
  return and(
    isNull(listings.deletedAt),
    eq(listings.status, "active"),
    sql`${listings.publishedAt} IS NOT NULL`,
  ) as SQL;
}
