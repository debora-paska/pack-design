# Pack Design System

> Pack is an external mentoring & coaching platform. Companies use Pack
> to pair junior employees with vetted external mentors and coaches,
> schedule sessions, run assessments, and measure development outcomes.
> The product surface is a SvelteKit web app with three primary
> personas: **Mentor / Coach**, **Mentee**, and **Admin / Manager**.
>
> This system is the canonical reference for everything a designer
> needs before producing a Pack mockup, marketing surface, or new
> screen. The goal is consistency: every Pack artifact should feel
> like the same product, made by the same team, talking in the same
> voice.

---

## Index

| File | What's inside |
| --- | --- |
| [`README.md`](README.md) | This document — voice, content rules, visual foundations, iconography, usage |
| [`colors_and_type.css`](colors_and_type.css) | All design tokens (colors, type scale, spacing, radii, shadows) + `@font-face` + utility classes — **import this in every Pack HTML file** |
| [`assets/`](assets/) | Brand mark, app icons |
| [`fonts/`](fonts/) | Montserrat Light & Medium (the only weights Pack ships) |
| `previews/` | Visual previews of tokens & primitives (rendered as cards) |
| `kits/` | UI kits showing the system applied to real product surfaces |

---

## 1. Content & Voice

Pack is professional but **warm**. It sits between a corporate HR
tool and a personal coaching app, and the writing should feel
**human and supportive** without slipping into self-help platitudes.

### Tone

- **Direct, not curt.** Tell users what's happening and what to do
  next. Skip throat-clearing.
- **Encouraging, not therapeutic.** "Great session — see you next
  Tuesday." Not "You did amazing! 🎉"
- **Plain, not corporate.** "Book a session" beats "Schedule
  a development engagement."
- **Bilingual-aware.** Pack is used in English and Italian — keep
  copy short and concrete so translations don't break layout.

### Vocabulary

Use Pack's own words. They appear throughout the codebase and in
training material; deviating creates confusion.

| Use | Don't use |
| --- | --- |
| Mentor, Coach | Advisor, Tutor |
| Mentee, Coachee | Student, Trainee, Pupil |
| Manager (their line manager) | Boss, Supervisor (≠ same role) |
| Session | Meeting, Call (a "call" is the live video room **inside** a session) |
| Program | Plan, Track, Curriculum |
| Assessment | Survey, Form, Questionnaire |
| Chemistry call | Intro call, Discovery call |
| Check-in | 1:1, Pulse |
| Match | Pairing, Assignment |

### Microcopy patterns

- **Buttons** are **action verbs in Title Case**: "Book Session",
  "Send Feedback", "Save Changes". Two words max where possible.
- **Empty states** combine a one-line statement of fact with a
  single CTA. Example: *"No upcoming sessions. — Book a session."*
- **Errors** explain what happened in plain language. Never expose
  raw HTTP codes or stack traces.
- **Success toasts** are past-tense and quiet:
  "Slot created.", "Feedback saved." No exclamation marks.
- **Numbers in body copy** spell zero–nine; numerals from 10 up.
  Always numerals when units are attached: "3 sessions", "12%".
- **Dates** follow user locale. Default to relative-then-absolute
  ("Tomorrow · 14:00", "Next Tue · 09:30") on dashboard; absolute
  ("Wed 23 Apr · 14:00–15:00") in calendars and emails.

### Things Pack copy never does

- ❌ Emoji in product UI. (Reactions in chat are the only exception.)
- ❌ "Welcome back, friend!" / second-person familiar greetings.
- ❌ Marketing exclamations in transactional surfaces.
- ❌ Made-up internal jargon. If it isn't in the vocabulary table
  above, it probably shouldn't be in the UI.

---

## 2. Visual Foundations

### 2.1 Color

Pack's identity is **warm orange on calm neutral.** Orange is the
single thing that signals "this is Pack" — use it intentionally,
not decoratively. The rest of the palette is supporting cast.

The complete palette is defined as CSS custom properties in
`colors_and_type.css`. **Always reference tokens via
`var(--color-…)` — never paste hex values into mockups.**

#### Roles

| Role | Token | When to use |
| --- | --- | --- |
| **Brand mark** | `--color-primary-500` `#FF8B45` | The icon's signature orange. Logo, brand moments. |
| **Primary action** | `--color-primary-600` `#FF8133` | Primary buttons, active nav border, links in CTAs, focus ring. Hover: `--color-primary-700`. |
| **Primary tint** | `--color-primary-50/100` | Mobile-nav active background, subtle banners, primary chip backgrounds. |
| **Secondary** (sky) | `--color-secondary-300/500` | Calendar slot fills, decorative info blocks. Never for actions. |
| **Tertiary** (blue) | `--color-tertiary-500` | Default tag fill, link text in dense tables, data-viz contrast. |
| **Ink** (text) | `--color-ink` `#101410` | Headings & primary body text. |
| **Paper** (canvas) | `--color-paper` `#F9FAFC` | App background. Cards sit on top in `--color-white`. |
| **Gray 100–700** | scale | Borders, dividers, secondary copy, disabled states. |
| **Positive** | `--color-positive-600/800` | Confirmed sessions, completed assessments, success toasts. |
| **Negative** | `--color-negative-600` | Destructive actions, errors, overdue indicators. |

#### Pairing rules

- Primary on white: ✅ default CTA pattern.
- Primary on `primary-50`: ✅ subtle hover/selected for nav.
- Primary on `primary-600`: ❌ never two oranges adjacent.
- Tertiary tag on white card: ✅ default informational tag.
- Status colors only ever express status — never decoration.

#### Accessibility

- Body text minimum: `--color-gray-700` on `--color-paper` /
  `--color-white` (passes WCAG AA at 14 px / 4.5:1).
- Primary button text is always white on `--color-primary-600`
  (passes AA at 14 px medium).
- Don't use gray below 500 for any text the user must read.

### 2.2 Typography

Pack types in **Montserrat**. Only **Light (300)** and **Medium
(500)** are licensed and shipped. Anything heavier is off-brand —
do **not** synthesize bold by stacking strokes; the browser will
fake-bold and it looks wrong.

- **Light (300)** — body copy, descriptions, table cells, helper
  text. Most of the screen, most of the time.
- **Medium (500)** — headings, button labels, form labels, eyebrow
  text, KPI numbers, anything that needs emphasis.
- **Italic** is available in both weights but used sparingly —
  only for genuine emphasis or proper nouns from other languages.

#### Scale

The full scale is in CSS custom properties. The defaults you'll
reach for most:

| Use | Token | Size / weight |
| --- | --- | --- |
| Page hero (login, marketing) | `.t-display` | 30 px Medium |
| Page title | `.t-h1` | 24 px Medium |
| Section heading | `.t-h2` | 20 px Medium |
| Card title | `.t-h3` | 18 px Medium |
| Default body | `.t-body` | 14 px Light |
| Long-form body | `.t-body-lg` | 16 px Light |
| Form labels & button text | `.t-label` | 14 px Medium |
| Captions, metadata | `.t-meta` | 12 px Light |
| Eyebrows / overlines | `.t-eyebrow` | 12 px Medium uppercase, +tracking |

Body line-height defaults to **1.5**; headings to **1.35**.
Long marketing paragraphs use **1.65**.

### 2.3 Spacing, radius, shadow

Pack uses an **8 px base unit** with a 4 px half-step for tight
clusters (icon + label, chip insets). Cards are roomy: prefer
`--space-6` (24 px) over tighter packing.

- **Radius:** `--radius-sm` 4 px (tags), `--radius-md` 6 px
  (buttons, inputs), `--radius-lg` 8 px (cards). Avoid pill
  buttons — they're not part of the visual vocabulary.
- **Shadow:** `--shadow` for cards (the workhorse).
  `--shadow-lg` only for floating elements (dropdowns, tooltips,
  toasts, the "+" floating action). Never shadow on flat
  in-page elements.
- **Borders:** `1 px` `--color-gray-100` for dividers and quiet
  borders; `--color-gray-300` only when a stronger separation
  is genuinely needed.
- **Focus:** Always use the `--ring-focus` recipe (white halo +
  primary-500 outer ring). Never remove focus outlines.

### 2.4 Layout

- Main app is centered with **`max-w-7xl` (1280 px)** content.
  Wide data screens (events, users) use `120rem` (1920 px).
- Default vertical rhythm: `space-y-4` (16 px) between cards;
  `space-y-12` (48 px) between major sections.
- Mobile: 16 px gutters. Desktop: 32 px gutters.
- Page top has a 64 px fixed header; bottom has an auto footer.
- Cards span full width on mobile; in two-column layouts the
  content card always takes priority over sidebars.

---

## 3. Iconography

Pack uses **outline icons, 1.5 px stroke, square caps, round
joins, on a 24×24 viewbox.** The codebase mixes hand-drawn
SVG icons (in `lib/components/icons/`) and Flowbite Svelte
icons. New design work should standardize on outline icons
matching this spec.

### Rules

- Default size **20 px** in line with body text; **24 px** in
  buttons and nav; **16 px** for tags and dense table rows.
- Icon color inherits via `currentColor` — never hard-code a
  fill. This lets nav and tag styling drive the color.
- Pair icons with text labels by default. Icon-only is reserved
  for: the notifications bell, the language switcher, the close
  "×", and avatar menus.
- Don't decorate: an icon must add information ("Calendar" =
  calendar icon, fine; "Welcome 👋" = no).

The **brand mark** itself (`assets/pack-icon.svg`) is the only
filled glyph — orange disc with a white "P/A" stroke. It is
**not** an icon and should never be used inline next to text.

---

## 4. Components — applied tokens

The following primitives encode the rules above. They appear
nearly verbatim in the production codebase; redesigning them
should be deliberate and discussed.

### Button

```html
<button class="pack-btn pack-btn--primary">Book Session</button>
<button class="pack-btn pack-btn--secondary">Cancel</button>
```

- **Primary**: `bg-primary-600` → `bg-primary-700` on hover.
  White text, Medium weight, 14 px. `radius-md`. 8 px / 16 px
  padding (small) or 10 px / 20 px (default).
- **Secondary**: white background, `gray-300` border, `gray-700`
  text. Hover: `gray-50` background.
- **Destructive**: `negative-600` background. Always confirms
  via modal before acting.
- Disabled: opacity 50 %, no pointer events.

### Input field

White background, `gray-300` inset ring, `radius-md`, 6 px /
12 px padding, 14 px Light text. Focus replaces ring with
`primary-600` 2 px inset.

### Card

White surface, `radius-lg`, `--shadow`, 24 px padding. Optional
title row: 18 px Medium ink; right side may carry a collapse
toggle or warning icon.

### Tag

Pill-style chip, `radius-sm`, 10 px / 4 px padding, 14 px
Medium white text on `tertiary-500` (default) or
`primary-500` (alternative). Lower-case content.

### Avatar

Circle, 28 / 40 / 64 px sizes. `object-fit: cover`. Optional
2 px border colored by role for multi-profile users.

---

## 5. How to use this system

### Starting a new HTML mockup

1. Copy this directory's `colors_and_type.css` and `fonts/` next
   to your file (or reference them by relative path).
2. In `<head>`, link the stylesheet:
   ```html
   <link rel="stylesheet" href="colors_and_type.css" />
   ```
3. Apply `font-family: var(--font-sans);
   font-weight: var(--weight-light);
   color: var(--color-ink);
   background: var(--color-paper);` to `body`.
4. Reach for the `.t-*` utility classes for type, and reference
   color/space/radius tokens via `var(--…)`.

### Choosing color

1. Is this a primary action the user is meant to take? →
   `--color-primary-600`.
2. Is this status (success/error)? → positive / negative scale.
3. Is this informational decoration (a tag, a chip)? →
   `--color-tertiary-500` for default, `--color-primary-500`
   for emphasis.
4. Otherwise → ink, gray, white, paper. That's most of the UI.

### Adding a new component

- Build it with tokens, never bare hex.
- Match the shadow / radius / spacing rules above — surprises
  are visible.
- Add a card to `previews/` showing default and key states
  (hover, focus, disabled, error) so the next designer can see it.

### When you're tempted to invent

Ask: does the codebase already have this?
`grep` `lib/components/` first. If it exists, match it. If it
doesn't, the right move is usually to reuse an existing
primitive in a new arrangement, not to add a new one.
