#!/usr/bin/env bash
# TED-167 — on-host availability probe + crash forensics for tedros.
#
# Runs every minute from root's crontab. Two jobs:
#   1. Record when /healthz stops answering, so an outage has a local
#      timestamp instead of being reconstructed from Search Console 3 days later.
#   2. Capture WHY. The September 2026 incident (19 "JavaScript heap out of
#      memory" crashes) was only diagnosable because docker had kept the logs;
#      a container recreate would have erased them. On failure this snapshots
#      restart count, memory and the last non-request log lines immediately.
#
# Read it with:  tail -50 /var/log/tedros-health.log
# Find outages:  grep DOWN /var/log/tedros-health.log
set -uo pipefail

LOG=/var/log/tedros-health.log
STATE=/var/run/tedros-health.state
NOW=$(date -Iseconds)
CONTAINER=tedros-tedros-1

code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 http://127.0.0.1:3001/healthz 2>/dev/null || echo "000")
prev=$(cat "$STATE" 2>/dev/null || echo "up")

if [ "$code" = "200" ]; then
  # Log recovery once, not every minute.
  if [ "$prev" != "up" ]; then
    echo "[$NOW] RECOVERED: /healthz 200" >> "$LOG"
    echo "up" > "$STATE"
  fi
  exit 0
fi

echo "up" > /dev/null
echo "down" > "$STATE"

# Only capture full forensics on the transition into failure, to keep the log usable.
if [ "$prev" = "up" ]; then
  {
    echo "[$NOW] DOWN: /healthz returned $code"
    echo "  restarts: $(docker inspect "$CONTAINER" --format '{{.RestartCount}} exit={{.State.ExitCode}} oom={{.State.OOMKilled}} status={{.State.Status}}' 2>/dev/null || echo 'inspect failed')"
    echo "  host mem: $(free -m 2>/dev/null | awk '/^Mem:/{print $3"MB used / "$2"MB"}')"
    echo "  --- last non-request log lines ---"
    docker logs "$CONTAINER" 2>&1 | grep -vE " (GET|POST|HEAD) " | tail -12 | sed 's/^/  /'
  } >> "$LOG" 2>&1
else
  echo "[$NOW] still down ($code)" >> "$LOG"
fi
