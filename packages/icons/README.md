# @dotdev/icons

Vite plugin that auto-generates a typed icon registry from SVG files.

## Setup

```ts
// vite.config.ts
import { uiKitIcons } from '@dotdev/icons'

export default defineConfig({
  plugins: [
    uiKitIcons({ outDir: './src/generated/icons' }),
  ],
})
```

The plugin scans `pack/` (337 icons by default) at build start and generates four files into `outDir`. In dev mode it watches for SVG add/remove and triggers a full reload.

## Generated files

| File | Purpose |
|---|---|
| `icons.ts` | `Record<UiKitIcon, Component>` — maps icon names to Vue components |
| `icon-types.d.ts` | Augments `@dotdev/ui-kit` with `UiKitRegister.icons` (union of all names) |
| `svg-env.d.ts` | Ambient module declaration for `*.svg?component` imports |
| `index.ts` | Barrel — re-exports `icons` |

## Usage

```ts
import { icons } from './generated/icons'

const uiKit = createUiKit({
  namespace: 'd',
  icons,
})
```

## Adding icons

The default icon set ships in `pack/`. To use your own, pass a custom `dir`:

```ts
uiKitIcons({ dir: './src/assets/icons', outDir: './src/generated/icons' })
```

Any `.svg` file in the source folder is picked up automatically on next build or dev reload.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `outDir` | `string` | **required** | Output directory for generated files |
| `dir` | `string` | `pack/` inside the package | Folder with SVG icons |
| `typesFile` | `string` | `icon-types.d.ts` | Types output filename |
| `svgEnvFile` | `string` | `svg-env.d.ts` | SVG ambient module filename |
| `iconsFile` | `string` | `icons.ts` | Icon registry filename |
| `indexFile` | `string` | `index.ts` | Barrel file filename |
