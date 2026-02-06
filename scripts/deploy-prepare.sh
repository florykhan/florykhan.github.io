#!/usr/bin/env bash
# Prepares static site for GitHub Pages deployment.
# Copies src/ to dist/ and rewrites relative paths so links work at /<repo>/
set -e

DIST=dist
rm -rf "$DIST"
mkdir -p "$DIST"

# Copy pages as site root (flatten pages/ to root)
cp src/pages/index.html "$DIST/"
cp src/pages/projects.html "$DIST/"
cp -r src/pages/narrative "$DIST/"
cp -r src/pages/projects "$DIST/"

# Copy assets
cp -r src/styles "$DIST/"
cp -r src/scripts "$DIST/"
cp -r src/assets "$DIST/"

# Root-level HTML (index, projects): ../styles -> styles, ../assets -> assets, ../scripts -> scripts
for f in "$DIST/index.html" "$DIST/projects.html"; do
  sed -i.bak 's|href="../styles/|href="styles/|g' "$f"
  sed -i.bak 's|src="../assets/|src="assets/|g' "$f"
  sed -i.bak 's|src="../scripts/|src="scripts/|g' "$f"
  rm -f "${f}.bak"
done

# Nested HTML (narrative/*, projects/*): ../../styles -> ../styles, ../../assets -> ../assets, ../../scripts -> ../scripts
for f in "$DIST/narrative"/*.html "$DIST/projects"/*.html; do
  [ -f "$f" ] || continue
  sed -i.bak 's|href="../../styles/|href="../styles/|g' "$f"
  sed -i.bak 's|src="../../assets/|src="../assets/|g' "$f"
  sed -i.bak 's|src="../../scripts/|src="../scripts/|g' "$f"
  rm -f "${f}.bak"
done

echo "Deploy bundle ready in $DIST/"
