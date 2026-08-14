---
name: dotdev
description: A precise Vue component workbench — BEM + Tailwind, namespaced themes, no CSS-in-JS.
colors:
  brand: "#6366f1"
  brand-hover: "#4f46e5"
  brand-deep: "#4f46e5"
  brand-soft: "#eef2ff"
  background: "#ffffff"
  danger: "#dc2626"
  danger-soft: "#fef2f2"
  warning: "#f59e0b"
  warning-soft: "#fffbeb"
  info: "#0369a1"
  info-soft: "#f0f9ff"
  success: "#047857"
  success-soft: "#ecfdf5"
  neutral-50: "oklch(95.58% 0.007 277.16)"
  neutral-100: "oklch(91.19% 0.014 281.55)"
  neutral-200: "oklch(82.14% 0.030 279.26)"
  neutral-400: "oklch(63.44% 0.062 279.07)"
  neutral-500: "oklch(53.68% 0.082 277.40)"
  neutral-800: "oklch(29.20% 0.039 277.47)"
  neutral-900: "oklch(19.96% 0.020 279.96)"
  neutral-950: "oklch(17.08% 0.015 278.37)"
typography:
  display:
    fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
  title:
    fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.05em"
  mono:
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace"
    fontSize: "0.875rem"
    fontWeight: 400
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
spacing:
  xs: "0.5rem"
  sm: "0.625rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.25rem"
components:
  button-primary-solid:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.neutral-50}"
    rounded: "{rounded.md}"
    padding: "0 1rem"
    height: "2.5rem"
  button-primary-soft:
    backgroundColor: "{colors.brand-soft}"
    textColor: "{colors.brand-deep}"
    rounded: "{rounded.md}"
    padding: "0 1rem"
    height: "2.5rem"
  button-outlined:
    backgroundColor: "transparent"
    textColor: "{colors.brand-deep}"
    rounded: "{rounded.md}"
    padding: "0 1rem"
    height: "2.5rem"
  button-neutral-solid:
    backgroundColor: "{colors.neutral-800}"
    textColor: "{colors.neutral-50}"
    rounded: "{rounded.md}"
    padding: "0 1rem"
    height: "2.5rem"
  input-outlined:
    backgroundColor: "{colors.background}"
    textColor: "{colors.neutral-900}"
    rounded: "{rounded.md}"
    padding: "0 0.75rem"
    height: "2.5rem"
  input-soft:
    backgroundColor: "{colors.neutral-50}"
    textColor: "{colors.neutral-900}"
    rounded: "{rounded.md}"
    padding: "0 0.75rem"
    height: "2.5rem"
  tag-soft:
    backgroundColor: "{colors.brand-soft}"
    textColor: "{colors.brand-deep}"
    rounded: "0.5em"
    padding: "0 0.5em"
    height: "1.75em"
  switch-checked:
    backgroundColor: "{colors.brand}"
    rounded: "9999px"
    height: "1.5rem"
  doc-card:
    backgroundColor: "{colors.neutral-50}"
    rounded: "{rounded.xl}"
---

# Design System: dotdev

## Overview

**Creative North Star: "The Precision Workbench"**

dotdev is a developer's workbench, not a showcase. Every component is a precisely calibrated instrument: quiet, engineer-clean, and confident in its own dimensions. Surfaces are flat and calm; structure is carried by hairline borders and tonal fills rather than shadow or ornament. The personality is restrained by design — nothing here shouts, because the point of a workbench is that the work stays readable and the tooling stays out of the way.

Density is comfortable and consistent: a single control-height scale (2rem–3rem), a single radius family (0.125–1rem), and a single spacing rhythm (0.5–1.25rem) that every component composes from. Color is treated as meaning, not decoration: one indigo accent for selection, focus, and the primary action, plus a fixed semantic set (danger / warning / info / success) that appears only when it carries information. The neutral ramp is a bespoke cool grey with a faint violet undertone (oklch hue ≈ 277–282°), which keeps the whole surface palette cool, technical, and slightly softer than pure gray.

The system speaks through detail: a 1px hairline that separates panels, an inset top-highlight on solid fills that makes them read as machined, a 50%-alpha focus ring that appears instead of an offset outline, and a JetBrains Mono voice reserved for code, version stamps, and keyboard hints. Dark mode is a first-class twin, derived by mirroring the same ramp and swapping soft fills to translucent color-mixes rather than paler tints.

**Key Characteristics:**
- Flat-by-default surfaces; hairline borders and tonal fills do the separating.
- One indigo accent reserved for selection, focus, and the primary action.
- Bespoke cool neutral ramp with a violet undertone, light and dark twins.
- Every control offers the same three fills — soft, outlined, solid — and a full semantic color set.
- Focus is always a 50%-alpha ring in the accent color; never an offset outline or glow.
- Plus Jakarta Sans for UI, JetBrains Mono for code, labels, and ⌘-hints.
- Refined and restrained: restrained weight, comfortable density, consistent radii.

## Colors

A quiet, cool, technical palette. One indigo accent does all the active work; six semantic hues exist only to mean something; the neutral ramp is a custom cool grey with a faint violet undertone.

### Primary
- **Quiet Indigo** (#6366f1 / light: indigo-500, dark: indigo-400): The single functional accent. Used for the primary action (solid buttons, switch/checkbox/radio checked state), brand text and logo, focus rings, and the selected state in lists. Rare by design — when everything is indigo, nothing is.
- **Indigo Deep** (#4f46e5 / indigo-600): Hover and pressed states for solid fills; brand-colored text in light mode.

### Secondary
- **Cool Paper** (#ffffff / light; neutral-950 in dark): The canvas. Background and surface are the same color at rest; panels are separated by hairlines, not tonal steps.

### Tertiary
- **Status Set** — used only as information, never decoration:
  - **Signal Red** (#dc2626, light: red-600 / dark: red-400): destructive actions, errors, invalid fields.
  - **Caution Amber** (#f59e0b, light: amber-500 / dark: amber-400): warnings and soft warnings.
  - **Alert Sky** (#0369a1, light: sky-700 / dark: sky-400): informational messages, type metadata in playgrounds.
  - **Confirm Emerald** (#047857, light: emerald-700 / dark: emerald-400): success and confirmations.

### Neutral
The ramp is bespoke — **Shadow Grey** — defined in OKLCH (hue ≈ 277–282°, the violet undertone), not Tailwind's default zinc/slate. Values (light → dark): neutral-50 `oklch(95.58% 0.007 277.16)`, neutral-100 `oklch(91.19% 0.014 281.55)`, neutral-200 `oklch(82.14% 0.030 279.26)`, neutral-400 `oklch(63.44% 0.062 279.07)`, neutral-500 `oklch(53.68% 0.082 277.40)`, neutral-800 `oklch(29.20% 0.039 277.47)`, neutral-900 `oklch(19.96% 0.020 279.96)`, neutral-950 `oklch(17.08% 0.015 278.37)`.

- **neutral-50 / neutral-100**: soft fills (input soft, hover washes, listbox items, doc cards in light mode).
- **neutral-400 / neutral-500**: muted text, placeholders, secondary content.
- **neutral-800**: the "solid neutral" fill (inverse of the canvas).
- **neutral-900 / neutral-100**: foreground text (light / dark).
- **neutral-950**: canvas in dark mode; "on" text in dark-mode solid fills.
- **Hairline** (neutral-100 / neutral-800): every border in the system.

### Named Rules
**The One-Accent Rule.** Indigo marks selection, focus, and the single primary action per view — nothing else. Status hues are meaning, not palette variety.
**The Hairline Rule.** Surfaces are separated by 1px borders at neutral-100 (light) / neutral-800 (dark), never by heavier strokes, gradients, or shadows.
**The Soft-Tint Rule.** In dark mode, soft fills are translucent color-mixes (16% ink, 26% on hover) instead of paler solid tints — the tint must never fight the canvas.

## Typography

**Display Font:** Plus Jakarta Sans (with ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial fallback)
**Body Font:** Plus Jakarta Sans
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SFMono-Regular, Menlo, Consolas, Liberation Mono fallback)

**Character:** An engineer-clean sans pairing with a humanist tail. Plus Jakarta Sans carries confident, slightly geometric geometry that stays quiet at small sizes; JetBrains Mono is used strictly as the "instrument voice" — code, version stamps, keyboard hints, technical metadata.

### Hierarchy
- **Display** (Plus Jakarta Sans, 700, 1.5rem, lh 1.3): Page titles in doc headers ("Tag", "Button") with a small icon tile beside them.
- **Title** (Plus Jakarta Sans, 600, 1.25rem, lh 1.35): Section and block titles within a page.
- **Body** (Plus Jakarta Sans, 400, 0.875rem, lh 1.5): Default text; description copy keeps a comfortable max measure (~65ch, `max-w-3xl`).
- **Label** (Plus Jakarta Sans, 500, 0.75rem, letter-spacing 0.05em, uppercase in nav): Navigation labels, control labels, headings in menus.
- **Mono** (JetBrains Mono, 400, 0.875rem): Inline code, code blocks (Shiki), version tags (v0.1.0), ⌘K hints, prop-type metadata in playgrounds.

### Named Rules
**The Instrument-Voice Rule.** JetBrains Mono is reserved for things a machine states — code, versions, key-combos, types. UI prose never switches to mono.

## Layout

The workbench frame is fixed and predictable. A left rail (**240px** sidebar) carries navigation; a sticky top bar (**56px** header) carries search, version, and theme toggle; content flows in a single responsive column to the right.

- **App shell:** sidebar sticky, full-height (`h-svh`), border-r hairline; header sticky top with a border-b hairline and a `backdrop-blur-md` over the canvas; both use the same surface color as the page.
- **Doc pages:** content column `py-10 px-4` (grows to `px-8` at `lg`, 1024px); page header is a card (`p-8`, `rounded-2xl`) with a soft brand→surface 135° gradient and a faint radial dot grid (`20px` grid, 1px dots at 30% neutral-500) on select canvases.
- **Responsive:** below 1024px the sidebar collapses into an overlay toggled from the header; sections scroll-snap to `scroll-mt-24` under the sticky header.
- **Spacing rhythm:** the ui-space scale (0.5 / 0.625 / 0.75 / 1 / 1.25rem) drives paddings and gaps; `gap` steps are half-steps (0.25–0.75rem); section rhythm in docs is a steady `mb-10` with dashed `border-dashed` dividers between major blocks.
- **Grouping:** control clusters use `Group` with attached addons — leading icons and trailing ⌘K tags seat inside the input's own fill, splitting radius where members join.

## Elevation & Depth

The system is **flat by default** and uses tonal layering, not shadows, to separate surfaces. Drop shadows are reserved for things that genuinely lift off the page, and even then they are small and tight.

- **select popup / listbox wrapper** (`shadow-md`): the one true "floating" surface.
- **switch thumb** and **selected segment in soft select-button** (`shadow-xs`): the tiny raised parts inside otherwise flat controls.
- **Solid fills** (buttons, tags, avatars) carry an **inset top highlight** (`inset 0 1px 0 rgba(255,255,255,.15)`): a machined edge that reads as a solid keycap, not a floating tile.

### Named Rules
**The Flat-By-Default Rule.** No shadows at rest. A surface earns a shadow only when it detaches from the page (popup, thumb, raised segment). Depth between coplanar surfaces is hairline + tonal fill, always.

## Shapes

A consistent, small-radius form language: corners are quiet, never aggressive, never pill-except-when-meant.

- **Radius family:** xs 0.125rem → sm 0.375rem → md 0.5rem (default for buttons, inputs, listbox, menu items, avatars-square) → lg 0.75rem → xl 1rem (doc cards, `rounded-2xl`).
- **Inset "nested radius" convention:** items that live inside a padded container subtract from the container radius — listbox item radius is `container − 4px`; select-listbox items are `container − 2px`.
- **Full rounds:** switch (9999px), avatars, and the `rounded` tag/button variant. Pill-shaped buttons exist but are opt-in (`--rounded`), not the default.
- **Control boxes:** checkbox (1–1.5rem, radius 0.25–0.5rem by size), radio (rounded-full), switch track 1.5rem tall with 0.125rem padding.
- **Code/description chips** use `rounded-sm` with a tinted brand wash (`bg-tint` = 5% brand in light, 10% in dark).

## Components

Every control is refined and restrained: the same three fills, the same semantic set, the same focus ring. Character lives in the details — the inset highlight, the nested radius, the ring instead of the glow.

### Buttons
- **Shape:** rounded (0.5rem), fixed heights by size — sm 2.25rem, md 2.5rem, lg 2.75rem; horizontal padding by size (sm 0.75rem, md 1rem, lg 1.25rem); gap 0.375–0.625rem; font-semibold at 0.875rem (lg: 1.125rem).
- **Primary (solid):** indigo fill, near-white text, inset top highlight; hover deepens one step (indigo-600).
- **Soft:** tonal tint fill (indigo-50 / 16% mix), brand text; hover deepens the tint (indigo-100 / 26%).
- **Outlined / Ghost / Text:** transparent fill; outlined keeps a 1px indigo hairline; ghost and text rely on a soft hover wash.
- **Focus:** 2px ring at 50% alpha of the accent color. Disabled: `opacity-60`, no pointer events. Loading swaps the icon for a spinning spinner.

### Inputs / Fields
- **Style:** outlined — hairline border on the canvas fill; soft — neutral-50 fill (16% mix in dark) with a transparent border; underlined — bottom hairline only.
- **Shape:** rounded (0.5rem); heights match buttons (sm/md/lg); text 1rem at md, 0.875rem at sm.
- **Focus:** the border shifts to indigo (no ring on text inputs). Placeholder at neutral-400.
- **Error / Disabled:** invalid fields take the danger border at rest and on focus; disabled is `opacity-60`.

### Chips (Tag)
- **Style:** compact — height 1.75em, padding 0.5em, radius 0.5em, gap 0.35em; optional `rounded` (pill) and `border` (1px at 30% `currentColor`) variants; avatar seats shrink the tag's leading/trailing padding.
- **Colors:** soft and solid across all six semantics; label at 0.875em.

### Switch / Checkbox / Radio
- **Switch:** 1.5rem track, 0.125rem padding, pill; outlined (hairline, thumb fills on check) or soft (tint fill, white thumb); checked = indigo. Focus ring 2px at 50% indigo.
- **Checkbox:** 1.25rem at md, radius 0.375rem; checked = indigo fill + white check; hover tints the border toward indigo.
- **Radio:** rounded-full; checked = indigo fill + white center dot; hover tints the border.
- All three: invalid = danger border; disabled = 60% opacity.

### Select / Listbox
- **Trigger:** outlined / soft / underlined like inputs; a square dropdown affordance on the right.
- **Popup:** floating white surface, `shadow-md`, hairline border, padding 0.25rem, radius 0.5rem; matches trigger size.
- **Items:** full-width rows, hover = neutral-soft wash, selected = neutral-soft fill with indigo text and a fading-in checkmark; keyboard-highlighted item gets a 1px inset indigo ring.
- **Segmented (select-button):** a padded shell (0.25rem gap 0.125rem) where the selected segment is raised — white + `shadow-xs` in soft, neutral-soft-hover fill in outlined — and unselected segments stay transparent with muted text.

### Navigation
- **Sidebar:** a grouped, collapsible menu; group headers uppercase `text-xs` + 0.05em tracking; items `h-10`, radius 0.5rem, muted text that moves to foreground on hover; active state is a neutral-soft wash. Hairline `hr` separators between groups.
- **Top bar:** 56px, hairline bottom border, surface fill with `backdrop-blur-md`; holds the logo (indigo 28px mark + "Dot.Dev" with brand-colored "Dev"), the search group, a JetBrains Mono version tag, and the theme toggle.

### Doc Cards (signature)
The signature doc surface: a rounded (1rem) card with a soft brand→surface 135° gradient header (`p-8`) containing an icon tile (`size-7.5`, rounded-lg, brand-soft fill, brand border, brand icon), the page title, and description at `max-w-3xl`. Dividers between sections are dashed hairlines. The example stage is a canvas (`bg-background`, hairline border, rounded-lg) with a centered wrap-flex of live components; below it a Shiki code panel in JetBrains Mono.

## Do's and Don'ts

### Do:
- **Do** use indigo for exactly one primary action per view, plus selection and focus. Its rarity is the point.
- **Do** keep surfaces flat at rest: separate panels with 1px hairlines and neutral-soft fills, not shadows or gradients (the doc header gradient and dot grid are reserved for documentation showcases).
- **Do** use the soft fill as the default for secondary actions; solid is for the one primary CTA.
- **Do** focus with a 2px ring at 50% alpha of the accent (buttons, switch, menu, listbox) or an accent border shift (text inputs) — never a default browser outline, never an offset ring, never a glow.
- **Do** give popups (select popup, floating surfaces) a `shadow-md` and let everything else stay shadowless.
- **Do** use uppercase + 0.05em tracking for navigation group labels and menu headings at `text-xs`.
- **Do** respect the three-fill grammar: soft / outlined / solid are the only fill styles a control may take.
- **Do** keep the neutral ramp cool with its violet undertone — don't reach for warm grays.

### Don't:
- **Don't** invent decorative color. The six semantic hues carry meaning only; brand-indigo is the sole decorative accent.
- **Don't** mix variants on one control (a solid body with an outlined border), and don't invent a fourth fill style.
- **Don't** add drop shadows at rest, or layer multiple shadows on one element.
- **Don't** use JetBrains Mono for UI prose, and don't switch UI copy to a serif or a display font.
- **Don't** use offsets/outlines/glows for focus; use the 50%-alpha ring convention.
- **Don't** expand radii into pill territory on default controls — the `rounded` pill is opt-in only.
- **Don't** separate every surface with a tonal step; the canvas and surfaces stay the same color and rely on hairlines.
