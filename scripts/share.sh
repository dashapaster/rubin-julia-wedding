#!/usr/bin/env bash

set -euo pipefail

PORT="${PORT:-3000}"
HOSTNAME="${HOSTNAME:-127.0.0.1}"
SHARE_HOST="${SHARE_HOST:-}"
NEXT_PUBLIC_SITE_URL_DEFAULT="http://${HOSTNAME}:${PORT}"

cleanup() {
  if [[ -n "${NEXT_PID:-}" ]] && kill -0 "$NEXT_PID" 2>/dev/null; then
    kill "$NEXT_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed."
  exit 1
fi

NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]")"
if [[ "$NODE_MAJOR" -lt 20 ]]; then
  echo "This project needs Node 20.9+."
  echo "Current version: $(node -v)"
  exit 1
fi

if ! command -v ssh >/dev/null 2>&1; then
  echo "ssh is required for localhost.run sharing."
  exit 1
fi

if [[ ! -f ".env.local" ]]; then
  echo "Missing .env.local"
  echo "Copy .env.example to .env.local and add your Supabase keys first."
  exit 1
fi

echo "Starting the wedding site locally on ${NEXT_PUBLIC_SITE_URL_DEFAULT} ..."
PORT="$PORT" HOSTNAME="$HOSTNAME" NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-$NEXT_PUBLIC_SITE_URL_DEFAULT}" npm run dev > /tmp/wedding-site.log 2>&1 &
NEXT_PID=$!

for _ in {1..60}; do
  if curl -s "http://${HOSTNAME}:${PORT}" >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

if ! curl -s "http://${HOSTNAME}:${PORT}" >/dev/null 2>&1; then
  echo "The local site did not start."
  echo "Check /tmp/wedding-site.log for details."
  exit 1
fi

echo
echo "Local site is running."
echo "When you stop this terminal, the public link will stop working too."
echo

if [[ -n "$SHARE_HOST" ]]; then
  echo "Requesting custom public link: https://${SHARE_HOST}"
  echo "This only works if that domain/subdomain is configured with localhost.run."
  echo
  exec ssh -o StrictHostKeyChecking=accept-new -R "${SHARE_HOST}:80:localhost:${PORT}" localhost.run
else
  echo "Requesting a free public link from localhost.run ..."
  echo
  exec ssh -o StrictHostKeyChecking=accept-new -R "80:localhost:${PORT}" nokey@localhost.run
fi
