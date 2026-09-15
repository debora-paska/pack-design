# Pack Design

Standalone [Storybook](https://storybook.js.org/) for Pack UI kits: primitives plus custom HR Overview, Individual Report, and Assessment components.

Repo: [github.com/debora-paska/pack-design](https://github.com/debora-paska/pack-design).

This GitHub repo is the viewable catalog. Source of truth stays `packages/ui` in the Pack monorepo. When this copy lives at `pack/design-playground/pack-design`, Pack git ignores it.

## Run locally

```bash
pnpm install
pnpm storybook
```

Opens [http://localhost:6006](http://localhost:6006).

## Host on Fly.io

GitHub does not render Storybook. Fly serves the static `pnpm build-storybook` output.

Install the [Fly CLI](https://fly.io/docs/flyctl/install/), then from this folder:

```bash
fly auth login
fly apps create pack-design
fly deploy
```

If `pack-design` is taken, change `app` in `fly.toml` and use that name in `fly apps create`.

After deploy: `https://pack-design.fly.dev`

The machine stops when idle (`min_machines_running = 0`) and starts again on the next request. Redeploy after a kit sync with `fly deploy`.

## Sync from Pack

When this repo lives at `pack/design-playground/pack-design`:

```bash
pnpm sync
git add -A
git commit -m "Sync Storybook from packages/ui"
git push
```

Or set `PACK_UI_DIR` to the `packages/ui` path if you cloned this repo somewhere else.

`pnpm sync` copies `src/`, `.storybook/`, and the Vite/Svelte/Storybook config. It does not overwrite `package.json`, this README, or `scripts/`.
