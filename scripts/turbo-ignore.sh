#!/usr/bin/env sh

if [ -f next.config.js ]; then
  npx turbo-ignore --fallback=HEAD^1
else
  exit 1
fi
