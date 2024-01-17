#!/bin/bash

echo "VERCEL_ENV: $VERCEL_ENV"

if [[ "$VERCEL_GIT_COMMIT_REF" == "migrate-vercel" ]] ; then
  echo "✅ - Start Build"
  exit 1;

else
  echo "🛑 - Cancel Build"
  exit 0;
fi