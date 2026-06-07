#!/usr/bin/env bash
# post-deploy-seo.sh — run once after every production deploy.
# Pings IndexNow + submits sitemaps to GSC.
#
# Usage: ./scripts/post-deploy-seo.sh

set -euo pipefail

BASE_URL="${BASE_URL:-https://tedros.co.il}"
INDEXNOW_KEY="${INDEXNOW_KEY:-266aaac460ad69529d18d0c9e96b9ebd}"
KEY_LOCATION="${BASE_URL}/${INDEXNOW_KEY}.txt"

# ── 1. Verify key file is live ─────────────────────────────────────────────
echo "Checking IndexNow key file..."
CODE=$(curl -s -o /dev/null -w "%{http_code}" "${KEY_LOCATION}")
if [ "$CODE" != "200" ]; then
  echo "ERROR: Key file not accessible at ${KEY_LOCATION} (HTTP $CODE)"
  echo "Make sure the file public/${INDEXNOW_KEY}.txt is deployed."
  exit 1
fi
echo "  ✓  Key file live"

# ── 2. Ping IndexNow for all URLs from all sitemaps ────────────────────────
echo ""
echo "Collecting URLs from sitemap index..."

ALL_URLS=()
for SITEMAP in sitemap-core.xml sitemap-rights.xml sitemap-careers.xml \
               sitemap-health.xml sitemap-content.xml sitemap-news.xml; do
  while IFS= read -r url; do
    ALL_URLS+=("$url")
  done < <(curl -s "${BASE_URL}/${SITEMAP}" | grep '<loc>' | sed 's/.*<loc>//;s/<\/loc>//')
done

TOTAL=${#ALL_URLS[@]}
echo "  Total URLs: $TOTAL"

# Submit in batches of 500 (IndexNow recommended)
BATCH_SIZE=500
BATCHES=$(( (TOTAL + BATCH_SIZE - 1) / BATCH_SIZE ))

for (( i=0; i<BATCHES; i++ )); do
  START=$(( i * BATCH_SIZE ))
  BATCH=("${ALL_URLS[@]:$START:$BATCH_SIZE}")
  BATCH_LEN=${#BATCH[@]}

  # Build JSON via python
  PAYLOAD=$(printf '%s\n' "${BATCH[@]}" | python3 -c "
import sys, json
urls = [l.strip() for l in sys.stdin if l.strip()]
print(json.dumps({
  'host': 'tedros.co.il',
  'key': '${INDEXNOW_KEY}',
  'keyLocation': '${KEY_LOCATION}',
  'urlList': urls
}))
")

  HTTP=$(curl -sk -o /tmp/inow_batch.txt -w "%{http_code}" \
    -X POST https://api.indexnow.org/indexnow \
    -H "Content-Type: application/json" \
    -d "$PAYLOAD")

  RESP=$(cat /tmp/inow_batch.txt 2>/dev/null | head -1)
  echo "  Batch $((i+1))/$BATCHES ($BATCH_LEN URLs): HTTP $HTTP $RESP"
done

# ── 3. Submit sitemaps to GSC ──────────────────────────────────────────────
echo ""
echo "Submitting sitemaps to Google Search Console..."

TOKEN=$(gcloud auth application-default print-access-token 2>/dev/null || \
        gcloud auth print-access-token 2>/dev/null || echo "")

if [ -z "$TOKEN" ]; then
  echo "  ⚠  No GSC token. Authenticate once with:"
  echo "     gcloud auth application-default login \\"
  echo "       --scopes='https://www.googleapis.com/auth/webmasters,https://www.googleapis.com/auth/cloud-platform'"
  echo "  Then re-run this script."
else
  SITE_ENC="sc-domain%3Atedros.co.il"
  GSC_BASE="https://www.googleapis.com/webmasters/v3"

  for SITEMAP in sitemap-core.xml sitemap-rights.xml sitemap-careers.xml \
                 sitemap-health.xml sitemap-content.xml sitemap-news.xml; do
    SITEMAP_URL="${BASE_URL}/${SITEMAP}"
    SITEMAP_ENC=$(python3 -c "import urllib.parse; print(urllib.parse.quote('${SITEMAP_URL}', safe=''))")

    HTTP=$(curl -sk -o /tmp/gsc_r.txt -w "%{http_code}" \
      -X PUT \
      -H "Authorization: Bearer $TOKEN" \
      "${GSC_BASE}/sites/${SITE_ENC}/sitemaps/${SITEMAP_ENC}")

    if [ "$HTTP" = "200" ] || [ "$HTTP" = "204" ]; then
      echo "  ✓  $SITEMAP"
    else
      echo "  ✗  $SITEMAP (HTTP $HTTP) — $(cat /tmp/gsc_r.txt 2>/dev/null | python3 -c 'import sys,json; d=json.load(sys.stdin); print(d.get("error",{}).get("message",""))' 2>/dev/null)"
    fi
  done
fi

echo ""
echo "Done."
