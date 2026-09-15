# Pack Design

Standalone [Storybook](https://storybook.js.org/) for Pack UI kits: primitives plus custom HR Overview, Individual Report, and Assessment components.

Repo: [github.com/debora-paska/pack-design](https://github.com/debora-paska/pack-design).

This GitHub repo is the viewable catalog. Source of truth stays `packages/ui` in the Pack monorepo. When this copy lives at `pack/design-playground/pack-design`, Pack git ignores it.

## Run

```bash
pnpm install
pnpm storybook
```

Opens [http://localhost:6006](http://localhost:6006).

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
