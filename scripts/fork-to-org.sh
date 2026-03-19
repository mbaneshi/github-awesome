#!/bin/bash
# Fork trending repos to awesome-oss-trending org
# Usage: ./fork-to-org.sh [YYYY-MM-DD]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DATA_DIR="$SCRIPT_DIR/../data"
DATE="${1:-$(date +%Y-%m-%d)}"
ORG="awesome-oss-trending"
DATA_FILE="$DATA_DIR/$DATE.json"

if [ ! -f "$DATA_FILE" ]; then
  echo "Error: $DATA_FILE not found"
  exit 1
fi

echo "Forking repos from $DATA_FILE to $ORG..."

jq -r '.repos[].full_name' "$DATA_FILE" | while read -r repo; do
  name=$(echo "$repo" | cut -d/ -f2)

  # Check if already forked
  if gh repo view "$ORG/$name" &>/dev/null 2>&1; then
    echo "  Skip (exists): $ORG/$name"
    continue
  fi

  echo "  Forking: $repo → $ORG/$name"
  if gh repo fork "$repo" --org "$ORG" --clone=false 2>/dev/null; then
    echo "  Done: $ORG/$name"
  else
    echo "  Failed: $repo (may not exist or already forked)"
  fi

  sleep 2  # rate limit
done

echo "Forking complete for $DATE"
