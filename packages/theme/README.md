# @dotdev/theme

Design token system for Tailwind CSS. Generates CSS variables, `@utility` directives, and component templates from a single TypeScript config.

## Install

```bash
bun add @dotdev/theme
```

## Theme Config

```ts
import { Theme } from '@dotdev/theme'

export default new Theme({
  name: 'Default',
  namespace: 'd',
  primitives: {
    'brand-500': '#6366f1',
    'space-xs': '0.5rem',
  },
  semantics: {
    'bg-brand': ['brand-500', 'brand-400'],        // light, dark
    'text-muted': 'neutral-500',
  },
  utilities: {
    'brand-xs': 'bg-(--d-brand-xs)',
    disabled: 'pointer-events-none opacity-60',
  },
  components: {
    button: new Component({
      ui: 'button',
      primitives: { 'px-sm': '0.75rem' },
      semantics: { 'bg-solid': 'brand-500' },
      utilities: { 'bg-primary-solid': 'bg-(--d-button-bg-solid)' },
      rules: {
        '.d-button': 'inline-flex items-center justify-center rounded font-semibold',
        '.d-button--sm': 'button-px-sm button-h-sm',
      },
    }),
  },
})
```

### Token Naming

- `--` prefix → global (no namespace): `--brand-500` → `--d-brand-500`
- No prefix → namespaced per component: `bg-solid` → `--d-button-bg-solid`

## CLI

### `css` — CSS Variables

```bash
npx dotdev-theme css --input ./theme.ts --output ./dist --name default
```

Outputs `default.css` with `@theme` block, `.dark` overrides, `@utility` directives, and compiled component rules.

### `tokens` — TypeScript Runtime

```bash
npx dotdev-theme tokens --input ./theme.ts --output ./dist --name default
```

Outputs:
- `tokens.ts` — resolved token values as `const` object
- `components/<name>.ts` — compiled CSS templates per component

## Runtime

```ts
import { defineTheme } from '@dotdev/theme'
import tokens from './default/tokens'

const theme = defineTheme({
  tokens,
  namespace: 'd',
  // override any token:
  semantics: { 'bg-brand': '#818cf8' },
})

// inject <style> into document.head
theme.inject()

// or use the CSS string directly
console.log(theme.css)
```

## APIs

| Export | Description |
|---|---|
| `Theme` | Build-time theme class |
| `Component` | Component config wrapper |
| `defineTheme()` | Create runtime theme with overrides |
| `mergeTokens()` | Deep-merge two token objects |
| `validateTokens()` | Check all `$ref` references exist |
| `renderRuntimeVars()` | Generate CSS `:root`/`.dark` vars from tokens |
| `injectCSS()` | Insert/update `<style>` tag in DOM |
| `toComponentTemplate()` | Replace namespace placeholders in CSS |

## Architecture

```
Theme Config (TS)
  ↓
Registry (in-memory token graph)
  ↓
├── toCSS()    → default.css (@theme + @utility + rules)
├── toFiles()  → per-component { vars, utilities, rules }
├── toTypes()  → TypeScript types
└── toTokens() → resolved token values
```

## Dependencies

- `postcss` + `@tailwindcss/postcss` — for compiling component rules
- `citty` — CLI framework
