#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PACK_UI="${PACK_UI_DIR:-$ROOT/../../packages/ui}"

if [[ ! -d "$PACK_UI/src" ]]; then
	echo "Cannot find Pack UI at $PACK_UI"
	echo "Run this from pack/design-playground/pack-design, or set PACK_UI_DIR to packages/ui."
	exit 1
fi

rsync -a --delete \
	--exclude node_modules \
	--exclude .svelte-kit \
	--exclude storybook-static \
	--exclude dist \
	--exclude build \
	--exclude .output \
	--exclude sst-env.d.ts \
	--exclude .DS_Store \
	"$PACK_UI/src/" "$ROOT/src/"

rsync -a --delete \
	--exclude .DS_Store \
	"$PACK_UI/.storybook/" "$ROOT/.storybook/"

cp "$PACK_UI/vite.config.ts" "$ROOT/vite.config.ts"
cp "$PACK_UI/svelte.config.js" "$ROOT/svelte.config.js"
cp "$PACK_UI/tsconfig.json" "$ROOT/tsconfig.json"
cp "$PACK_UI/components.json" "$ROOT/components.json"
cp "$PACK_UI/build-tokens.js" "$ROOT/build-tokens.js"

echo "Synced Storybook sources from $PACK_UI"
echo "This does not overwrite package.json, README, or scripts."
