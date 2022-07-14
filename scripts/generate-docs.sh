#!/usr/bin/env bash

echo "Generating documentation based on type definitions"
npx typedoc \
  --out docs \
  --name "Ensomata Package Template" \
  --theme default \
  --includeVersion \
  --gitRevision \
  --hideGenerator true \
  --githubPages false \
  "src/index.ts"