#!/usr/bin/env bash
# Usage: ./scripts/audit-sitemap.sh [BASE_URL]
# Scans every URL in the sitemap index and reports non-200 responses.
# Outputs: scripts/sitemap-audit-results.txt
#
# Example:
#   ./scripts/audit-sitemap.sh https://tedros.co.il
#   ./scripts/audit-sitemap.sh http://localhost:3000

BASE_URL="${1:-https://tedros.co.il}"
OUTPUT="$(dirname "$0")/sitemap-audit-results.txt"
CONCURRENT=10

echo "Auditing sitemaps at $BASE_URL ..."
echo "Results → $OUTPUT"
echo ""

# Collect all sub-sitemap URLs from the index
sub_sitemaps=$(curl -s "$BASE_URL/sitemap.xml" \
  | grep '<loc>' \
  | sed 's/.*<loc>//;s/<\/loc>.*//')

# If sitemap.xml is a urlset (not index), treat it as a single source
if [ -z "$sub_sitemaps" ]; then
  sub_sitemaps="$BASE_URL/sitemap.xml"
fi

# Collect all page URLs from all sub-sitemaps
all_urls=()
while IFS= read -r sitemap_url; do
  while IFS= read -r url; do
    all_urls+=("$url")
  done < <(curl -s "$sitemap_url" | grep '<loc>' | sed 's/.*<loc>//;s/<\/loc>.*//')
done <<< "$sub_sitemaps"

total=${#all_urls[@]}
echo "Found $total URLs to check"
echo "---"

: > "$OUTPUT"
checked=0
errors=0

check_url() {
  local url="$1"
  local code
  code=$(curl -o /dev/null -s -w "%{http_code}" --max-time 10 "$url")
  if [ "$code" != "200" ]; then
    echo "$code  $url" | tee -a "$OUTPUT"
    ((errors++))
  fi
  ((checked++))
  if (( checked % 50 == 0 )); then
    echo "  ... checked $checked/$total"
  fi
}

export -f check_url
export OUTPUT

# Run checks with limited concurrency using xargs
printf '%s\n' "${all_urls[@]}" | \
  xargs -P "$CONCURRENT" -I{} bash -c 'check_url "$@"' _ {}

echo ""
echo "Done. $checked URLs checked, $errors non-200 responses."
echo "Full report: $OUTPUT"
