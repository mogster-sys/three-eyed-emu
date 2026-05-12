#!/usr/bin/env bash
# Deploy three-eyed-emu to Hostinger via SSH/rsync
# Usage: ./deploy.sh

set -euo pipefail

REMOTE_HOST="hostinger"
REMOTE_PATH="domains/threeeyedemu.com.au/public_html"
LOCAL_DIR="dist"

echo "==> Building production bundle..."
npm run build

echo "==> Deploying to ${REMOTE_HOST}:${REMOTE_PATH}"
rsync -avz --delete \
  --exclude='.htaccess' \
  --human-readable \
  --progress \
  "${LOCAL_DIR}/" \
  "${REMOTE_HOST}:${REMOTE_PATH}/"

echo ""
echo "==> Done. Visit https://threeeyedemu.com.au (Ctrl+Shift+R to bypass cache)"
