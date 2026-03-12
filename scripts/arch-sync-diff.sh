#!/bin/bash
# arch-sync-diff.sh — Generates a compact diff for the architecture graph
# Compares actual files in src/ against the architecture-graph.ts data
# Output: ADD/DEL/DRIFT/VERSION lines for efficient AI-driven patching
# Token cost: ~200 tokens output (vs ~10000 for full file read)

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GRAPH_FILE="$PROJECT_ROOT/src/data/architecture-graph.ts"
PACKAGE_JSON="$PROJECT_ROOT/package.json"

# 1. Collect all source files (excluding tests, declarations, assets)
mapfile -t SRC_FILES < <(
  find "$PROJECT_ROOT/src" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    ! -name "*.test.*" \
    ! -name "*.d.ts" \
    ! -name "vite-env.d.ts" \
    ! -path "*/assets/*" \
    | sed "s|$PROJECT_ROOT/||" \
    | sort
)

# 2. Extract known file paths from architecture-graph.ts
mapfile -t GRAPH_FILES < <(
  grep -oP "filePath:\s*'[^']+'" "$GRAPH_FILE" \
    | sed "s/filePath: '//;s/'//" \
    | sort
)

# 3. Find ADD (files in src/ but not in graph)
for src_file in "${SRC_FILES[@]}"; do
  found=0
  for graph_file in "${GRAPH_FILES[@]}"; do
    if [[ "$src_file" == "$graph_file" ]]; then
      found=1
      break
    fi
  done
  if [[ $found -eq 0 ]]; then
    lines=$(wc -l < "$PROJECT_ROOT/$src_file" 2>/dev/null || echo 0)
    echo "ADD $src_file $lines"
  fi
done

# 4. Find DEL (files in graph but not in src/)
for graph_file in "${GRAPH_FILES[@]}"; do
  if [[ ! -f "$PROJECT_ROOT/$graph_file" ]]; then
    echo "DEL $graph_file"
  fi
done

# 5. Find DRIFT (line count mismatch > 20 lines)
while IFS= read -r line; do
  file_path=$(echo "$line" | grep -oP "'[^']+'" | head -1 | tr -d "'")
  graph_lines=$(echo "$line" | grep -oP '\d+' | tail -1)
  if [[ -f "$PROJECT_ROOT/$file_path" ]]; then
    actual_lines=$(wc -l < "$PROJECT_ROOT/$file_path")
    diff=$((actual_lines - graph_lines))
    abs_diff=${diff#-}
    if [[ $abs_diff -gt 20 ]]; then
      echo "DRIFT $file_path ${graph_lines}->${actual_lines}"
    fi
  fi
done < <(grep -oP "'src/[^']+'\s*:\s*\d+" "$GRAPH_FILE")

# 6. Version check
GRAPH_VERSION=$(grep -oP "version:\s*'[^']+'" "$GRAPH_FILE" | head -1 | sed "s/version: '//;s/'//")
PKG_VERSION=$(grep -oP '"version":\s*"[^"]+"' "$PACKAGE_JSON" | sed 's/"version": "//;s/"//')
if [[ "$GRAPH_VERSION" != "$PKG_VERSION" ]]; then
  echo "VERSION ${GRAPH_VERSION}->${PKG_VERSION}"
fi

# 7. Summary
echo "---"
echo "GRAPH_FILES=${#GRAPH_FILES[@]} SRC_FILES=${#SRC_FILES[@]}"
