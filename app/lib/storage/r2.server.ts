// R2 presigned-upload stub (TED-21).
//
// Real R2 wiring lives with DevOps (env vars + AWS SDK v3 S3 client). The
// shape returned here is intentionally compatible with that future
// implementation: `{ uploadUrl, r2Key, headers, expiresAt }`. Until DevOps
// lands credentials we return a `dev://` placeholder that the dashboard
// renders as "uploads disabled" rather than crashing.

import { randomUUID } from "node:crypto";

export type PresignedUpload = {
  uploadUrl: string;
  r2Key: string;
  headers: Record<string, string>;
  expiresAt: string; // ISO 8601
  enabled: boolean;
};

export function presignListingImageUpload(opts: {
  agencyId: string;
  listingId: string;
  contentType: string;
}): PresignedUpload {
  // Content-addressed key under /agencies/<agency>/listings/<listing>/.
  const ext =
    opts.contentType === "image/png"
      ? "png"
      : opts.contentType === "image/webp"
        ? "webp"
        : "jpg";
  const r2Key = `agencies/${opts.agencyId}/listings/${opts.listingId}/${randomUUID()}.${ext}`;
  const enabled = Boolean(process.env.R2_ACCOUNT_ID && process.env.R2_BUCKET);

  return {
    uploadUrl: enabled
      ? `https://${process.env.R2_BUCKET}.${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${r2Key}`
      : `dev://r2/${r2Key}`,
    r2Key,
    headers: { "Content-Type": opts.contentType },
    expiresAt: new Date(Date.now() + 15 * 60_000).toISOString(),
    enabled,
  };
}
