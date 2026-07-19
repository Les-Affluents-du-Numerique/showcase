#!/bin/sh

# postAttachCommand is run every time VS Code reconnects. Leave an existing
# Astro server alone instead of starting a second process on the same port.
if command -v lsof >/dev/null 2>&1 && lsof -tiTCP:4321 -sTCP:LISTEN >/dev/null 2>&1; then
  exit 0
fi

if curl --fail --silent http://127.0.0.1:4321 >/dev/null 2>&1; then
  exit 0
fi

exec pnpm dev --host
