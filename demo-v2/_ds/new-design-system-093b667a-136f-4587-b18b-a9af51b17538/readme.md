# New Design System

A shadcn/ui-based component library and UI kit, extracted from a mounted Figma file. The file recreates the full shadcn/ui component catalogue (light/dark "neutral" theme, radius `0.625rem`) and layers a custom brand accent (a warm orange scale, `primary-50…900`), a Radix-style neutral/alpha color system, and semantic success/warning/error/info scales on top. It also ships 5 icon families (Lucide wired into every component; Tabler, Phosphor, HugeIcons, Remix as swappable alternates) and two example products: an **Authentication** flow (Login / Signup / OTP) and a **Dashboard** application (sidebar + charts + tasks table).

**Source:** a Figma file ("Design System.fig") mounted read-only for this build — 159 frames across the pages listed in `page`, `page2`–`page5`, plus 5 icon-library pages. No public Figma link or codebase was provided; only the mounted file. If you have the original Figma file link or a production codebase this kit was drawn from, attach it so future passes can verify against real components/get-design-context instead of the static export.

No real brand mark exists in the source scope — the only graphic resembling a logo was small tool chrome on the Figma file's internal token-export cover pages (a third-party plugin's own branding, not a product mark), so it has been left out entirely. The design system's name renders in plain type wherever a mark would go (see `thumbnail.html`); attach a real logo asset if one exists and this can be swapped in.

## Contents

- `styles.css` — root stylesheet, imports every token file below. Link this one file from any consuming project.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `shadows.css`, `animations.css`, `fonts.css`.
- `components/` — 57 React UI primitives across 7 groups (`forms/`, `overlays/`, `navigation/`, `data-display/`, `tags/`, `feedback/`, `date/`). See the full list below.
- `assets/icons/{lucide,tabler,phosphor,hugeicons,remix}/` — materialized icon-data sets (see Iconography below).
- `guidelines/` — foundation specimen cards (colors, type, spacing, iconography) shown in the Design System tab.
- `ui_kits/authentication/` — Login, Signup, OTP screens, interactive.
- `ui_kits/dashboard/` — Sidebar app shell with Dashboard (charts + table), Tasks and Playground screens.
- `thumbnail.html` — homepage tile.
- `SKILL.md` — portable skill definition for use outside this environment.

## Components (57)

**Forms** — Button, ButtonGroup, Input, Textarea, Label, Field (+FieldGroup), Checkbox, CheckboxCard, RadioGroup, Switch, Toggle (+ToggleGroup), Slider, Select, NativeSelect, InputGroup, InputOTP, Kbd, Combobox
**Overlays** — Tooltip, Dialog, AlertDialog, Popover, HoverCard, Drawer, Sheet, DropdownMenu, ContextMenu, Command
**Navigation** — Breadcrumb, Tabs, Pagination, Menubar, NavigationMenu, Sidebar
**Data Display** — Badge, Avatar, Separator, AspectRatio, Card (+Header/Content/Footer), Accordion, Collapsible, Item, ScrollArea, Table, DataTable, Carousel, Chart (BarChart/LineChart/AreaChart/RadarChart/RadialChart/ChartTooltip), Text
**Tags** — Tag (pill, 6 colors), Chip (square, 7 colors incl. disabled). Default glyphs ship as helper components LucideRocket, TablerPercentage100, RemixCloseLarge (from the Calendar Improvements kit).
**Feedback** — Alert, Progress, Skeleton, Spinner, Sonner, Empty
**Date** — Calendar, DatePicker
**Icon wrappers** — LucideIcon, TablerIcon, PhosphorIcon, HugeIcon, RemixIcon (see Iconography)

This is the complete set of named, top-level component frames the source Figma file defines within the requested scope (55 pages: Accordion → Tooltip, alphabetically, plus the Chart sub-pages and 5 icon-library pages). No components outside this inventory were invented.

### Why the automated family count (242) is higher than 55/75 built

The compiler's Figma-metadata scan counts every *Figma component set*, including internal sub-parts, prototypes and documentation chrome that aren't separate products. Breaking down the ~167 "missing" sets:

- **Internal variant/state sub-parts of components already built** (the bulk of the gap) — e.g. the many duplicate "Buttons" (×14), "Form" (×8), "Default" (×5), "Outline" (×4), "Dropdown menu"/"Dropdown_menu"/"Dropdown Menu" spelling variants (×6), "Popover" (×3), "Navigation_menu" (×3), "Tooltip" (×3), "With_button"/"With_text"/"With Label" (×6), "X" (×3), "Radio_group", "Select", "Separator", "Hover_card", "Item", "Label", "Small"/"Large", "Size", "Combobox", "Context menu", "Dialog", "Drawer", "Sheet", "Sidebar", "Menubar", "Checkboxes", "Controlled", "Native Select", "Date and Time Picker", "Date of Birth Picker", "Month and Year Selector", "Natural Language Picker", "Picker with Input" — these are all states/sizes/sub-slots *inside* the 55 primitives already built (Button, Field, DropdownMenu, Popover, NavigationMenu, Tooltip, RadioGroup, Select, Separator, HoverCard, Item, Label, Combobox, ContextMenu, Dialog, Drawer, Sheet, Sidebar, Menubar, Checkbox, NativeSelect, DatePicker/Calendar), not separate products.
- **Prefixed sub-atoms**: `.Dropdown Menu Item`, `.Error`, `.Label`, `.Pagination Item` — rendered inside DropdownMenu / Field / Label / Pagination respectively, not standalone.
- **Prototype/dark-mode duplicate pages**: `Alert dialog / Dark mode / Prototype`, the second `Accordion` set — demo frames on the `*-Prototype` pages, duplicating Accordion/AlertDialog already built.
- **Standalone icon symbols mis-counted as "families"**: `check`, `ellipsis-horizontal`, `magnifying-glass` — single icon glyphs, covered by the icon families below, not shadcn primitives.
- **`Social Icons` (52 variants: 26 platforms × 2 colors)** — OAuth/brand logos (LinkedIn, X, Facebook, etc.). Skipped: no matching brand-logo asset exists in Lucide or the 4 sampled icon sets, and hand-drawing brand marks isn't allowed. Flag if you want these imported from the source `.fig` directly.
- **Figma export plugin's own documentation chrome**: `Color`, `Text`, `Icon` (the 3–4-variant sets), `tab`, `Wrapper` — internal building blocks of the token-export cover pages (`Typography-Tokens`, `colors-Tokens`), not product UI.
- **`Examples` (×2)** — an internal example-picker frame, superseded here by the Authentication/Dashboard UI kits, which cover the same ground with real screens.

Nothing in this list is a distinct, missing product primitive — every genuinely named top-level component frame in the source scope has a built counterpart.

### Intentional additions
- **shadcn/ui catalogue (63 primitives: `Accordion`, `Badge`, `Card`(+subparts), charts, forms, overlays, navigation, feedback, date)** — these come from the original **"Design System.fig"** build, not the later-mounted **"Calendar Improvements.fig"** (which defines only `Tag`/`Chip`). The adherence check compares against whichever kit is currently mounted, so it flags them as "named after nothing in the kit" — this is expected and intentional: they are the design system's core inventory and are staying.
- **Icon wrapper components** (`LucideIcon` etc.) — the source has no equivalent "Icon" component; one is needed to render the materialized glyph data as JSX.
- **`ChartTooltip`** — bundled with `Chart.jsx` since the source's `Tooltip2`/chart-tooltip page is a chart-only variant of the general Tooltip, not a separate top-level primitive.
- **`CheckboxCard`** and **`Text`** — built from the source's genuinely distinct `Checkbox_card` and `Text` component families (not covered by any of the 55 top-level pages above).

## Tokens

`tokens/colors.css` ports the **exact** hex values supplied for this run: the shadcn "neutral" mode scale (background/foreground/border/ring/card/popover/primary/secondary/muted/accent/destructive, light + `[data-theme="dark"]`), a 12-step neutral gray scale, 12-step black/white alpha ramps, the `primary-50…900` brand-orange scale, and `success/warning/error/info-50…500` semantic scales. `typography.css`, `spacing.css`, `radius.css` and `shadows.css` encode the Tailwind-default-shaped scales the source's Figma Variables collections use verbatim (variable names like `rounded-sm`, `px-1,5`, `gap-2` are literally Tailwind utility names) — confirmed against exact pixel values read from Button/Badge/Field/Item frames (e.g. button radius 8px, badge/card radius 10px = shadcn's `--radius: 0.625rem` default, input/button shadow `0px 1px 2px rgba(0,0,0,.1)`). 1,085 custom properties are registered, covering every value the kit's 1,428-variable collections express: `tokens/scale.css` ports the full directional padding/margin/gap scale (35 spacing steps × p/px/py/pt/pr/pb/pl, m/mx/my/mt/mr/mb/ml, gap/gap-x/gap-y), `tokens/sizing.css` ports height/width/max-height/max-width and border-width/opacity/stroke-width, and `tokens/tw-palette.css` ports the Tailwind slate/zinc reference palette (the kit's "Ungrouped"/"tw/colors" collections). The remaining gap to 1,428 is the source naming every value per-utility-class (e.g. `px-1,5` and `py-1,5` as separate variables even though identical) — this build aliases those to one `--space-*` scale reused across every directional token, so the same numeric coverage exists under far fewer, more usable names.

## Content fundamentals

- **Component documentation copy** (seen on every component's Figma doc frame) is terse and factual, third person, present tense: *"Displays a button or a component that looks like a button."*, *"A versatile component that you can use to display any content."* No first/second person, no marketing language, no emoji.
- **Product/UI-kit copy** (Login, Dashboard, etc.) mirrors real shadcn example-app copy: short labels ("Login", "Forgot your password?", "Sign in with GitHub"), sentence case, no exclamation marks, no emoji.
- **Tone**: neutral, engineering-documentation register — describe what the thing *is* and *does*, not why the user should feel excited about it.
- **Casing**: sentence case throughout (titles, buttons, labels) — never Title Case, never ALL CAPS except tiny "LAST UPDATED ON"-style metadata labels with heavy letter-spacing on the token-export cover pages (a tool chrome pattern, not product UI).

## Visual foundations

- **Color**: near-monochrome UI (white/near-black `gray-1`/`gray-12` plus `border`/`muted` grays) with a single warm-orange accent (`primary-500 #ff5d18`) reserved for primary actions and chart series; semantic success/warning/error/info scales appear only in alerts, badges and status dots. Dark mode inverts background/foreground and swaps `border`/`card`/`popover` — the orange accent and semantic scales stay largely the same hue, sometimes with light/dark stops flipped.
- **Type**: Inter is the dominant UI font (component docs, forms, buttons). Geist appears on several component doc frames (Badge) and throughout the Dashboard/product screens — both are shipped; `--font-sans` defaults to Inter, `--font-display` is Geist for anyone who wants the dashboard's flavor. Roboto Mono covers code/mono contexts (chart tooltips, OTP-adjacent numerals). Sizes follow the Tailwind default type scale (14/16/18/20/24/30/36/48/60/72/96/128); weights 200–900 are all available but 400/500/600 do the real work.
- **Spacing & radius**: 4px-based spacing rhythm; radius follows shadcn's newer default token (`--radius: 0.625rem` = 10px) with sm=6/md=8/lg=10/xl=14 derived from it. Buttons and inputs use `radius-md` (8px), badges/cards/popovers use `radius-lg` (10px) or larger.
- **Borders & shadows**: every interactive control (button, input, select, card) carries a 1px `var(--border)` outline plus a barely-visible `shadow-xs` (`0px 1px 2px rgba(0,0,0,.1)`) — there is no heavier default card shadow; elevation only escalates for popovers/dialogs (`shadow-md`/`shadow-lg`).
- **Backgrounds**: flat solid fills only — no gradients, no photographic full-bleed sections, no illustration or pattern textures anywhere in the primitives. The one gradient in the source (a soft peach/blue wash on the internal token-export cover pages) is tool chrome for the Figma-export plugin itself, not part of the product's visual language, and is not reproduced here.
- **Animation**: no keyframed/bounced motion in the primitives; only a slow `pulse` (Skeleton) and linear `spin` (Spinner) are defined, matching shadcn's own defaults. Overlays (Dialog/Sheet/Drawer/Popover) are shown/hidden with no transition in this build — add a fade/slide if your product wants one, the source doesn't specify motion curves.
- **Hover/press states**: not explicitly specified in the static export; components in this build default to the browser's native `:hover`/`:active` for form controls and a `var(--accent)` background swap on menu items — follow that convention for anything new.
- **Transparency/blur**: only the overlay scrim behind Dialog/Sheet/Drawer/AlertDialog (`--overlay`, `#0000004c`) uses alpha; no backdrop blur is used anywhere in the source.
- **Imagery**: no photography, illustration, or brand imagery exists in the scoped frames beyond UI chrome and the tiny logo glyph — product screens use plain avatars/initials, not photos.
- **Corner radii & cards**: see Spacing & radius above; cards are a 1px border + `radius-xl` (14px) + no shadow by default, per `Card.jsx`.

## Iconography

**Lucide** is the design system's real, wired-in icon set — every component in the source references `lucide/<name>` instances (e.g. `lucide/chevron-down`, `lucide/circle-check`). It's materialized as `LucideIcon` (`assets/icons/lucide/`), covering the ~140 glyphs actually used across the 55 components and 2 UI kits. For any Lucide icon not in that curated set, either materialize more from the source `.fig` or use the public Lucide package/CDN (same open icon set, so no substitution risk).

The source file *also* contains 4 complete alternate icon-library pages (Tabler, Phosphor, HugeIcons, Remix — combined with Lucide, ~15,000 glyphs total per the file's metadata) as a browsable reference/swap-in catalogue, not wired into any component. A representative sample of each (30–46 glyphs) is materialized as `TablerIcon`, `PhosphorIcon`, `HugeIcon`, `RemixIcon` so the option is real, inspectable code rather than a placeholder; the remaining thousands of glyphs in each family can be pulled from the source `.fig` on demand, or from each library's public CDN (all 5 are open-source).

No custom icon font, emoji, or unicode-glyph icons are used anywhere in the source.

## UI kits

- **Authentication** (`ui_kits/authentication/`) — Login, Signup, OTP verification. Card-centered auth forms with an "Acme Inc." gallery-icon lockup, matching the source Login/Signup/OTP frames.
- **Dashboard** (`ui_kits/dashboard/`) — collapsible Sidebar shell, Dashboard (stat cards + chart + data table), Tasks (filterable data table) and a Playground-style settings screen, matching the source Dashboard/Tasks/Playground/Featured frames.

## Caveats & help wanted

- Font files: **Inter**, **Geist** and **Roboto Mono** are loaded from Google Fonts (`tokens/fonts.css`) — all three are the exact families the source uses (not substitutes), so no swap is needed, but you'll need network access to Google Fonts for them to render outside this preview.
- Only Lucide is fully wired to real usage; the other 4 icon families are intentionally sampled (see Iconography) rather than fully imported, given they aren't used anywhere in the actual components. Ask if you want any of them expanded.
- The Figma Variables collections (1428 variables) were not imported 1:1 by name — token *values* are all represented, but under a compact alias set rather than the source's exact variable names. Flag if you need the literal `px-1,5`-style names preserved for a design-tool round-trip.
- Hover/press/motion specifics for overlays weren't specified in the static export and were designed conventionally (see Visual foundations) — happy to tune once you confirm intended easing/duration.

**Ask:** tell us which of the above to prioritize — expanding icon coverage, wiring literal Figma variable names, or adding real motion — and we'll iterate.
