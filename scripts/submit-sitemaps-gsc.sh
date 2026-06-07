#!/usr/bin/env bash
# submit-sitemaps-gsc.sh — submits all Tedros sub-sitemaps to Google Search Console.
#
# Prerequisites:
#   gcloud CLI installed + authenticated with webmasters scope:
#   gcloud auth application-default login \
#     --scopes="https://www.googleapis.com/auth/webmasters,https://www.googleapis.com/auth/cloud-platform"
#
# Usage:
#   ./scripts/submit-sitemaps-gsc.sh

set -euo pipefail

BASE_URL="${BASE_URL:-https://tedros.co.il}"
SITE_ENC="sc-domain%3Atedros.co.il"
GSC_BASE="https://www.googleapis.com/webmasters/v3"

SITEMAPS=(
  "sitemap-core.xml"
  "sitemap-rights.xml"
  "sitemap-careers.xml"
  "sitemap-health.xml"
  "sitemap-content.xml"
  "sitemap-news.xml"
)

echo "Getting access token..."
TOKEN=$(gcloud auth application-default print-access-token 2>/dev/null || gcloud auth print-access-token 2>/dev/null)
if [ -z "$TOKEN" ]; then
  echo "ERROR: No access token. Run:"
  echo "  gcloud auth application-default login \\"
  echo "    --scopes=\"https://www.googleapis.com/auth/webmasters,https://www.googleapis.com/auth/cloud-platform\""
  exit 1
fi

echo "Submitting sitemaps to GSC for $BASE_URL ..."
echo ""

for sitemap in "${SITEMAPS[@]}"; do
  SITEMAP_URL="${BASE_URL}/${sitemap}"
  SITEMAP_ENC=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$SITEMAP_URL', safe=''))")

  HTTP_CODE=$(curl -s -o /tmp/gsc_response.json -w "%{http_code}" \
    -X PUT \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    "${GSC_BASE}/sites/${SITE_ENC}/sitemaps/${SITEMAP_ENC}")

  if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "204" ]; then
    echo "  ✓  $sitemap"
  else
    echo "  ✗  $sitemap (HTTP $HTTP_CODE)"
    cat /tmp/gsc_response.json 2>/dev/null | python3 -m json.tool 2>/dev/null || true
  fi
done

echo ""
echo "Done. Verify at: https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Atedros.co.il"
