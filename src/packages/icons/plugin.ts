import type { Plugin } from 'vite'
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { isAbsolute, join, parse, relative, resolve, sep } from 'node:path'

export interface UiKitIconsPluginOptions {
  /** Папка с svg-иконками (обязательно) */
  dir: string
  /** Куда писать сгенерированные файлы (по умолчанию — папка с иконками) */
  outDir?: string
  /** Имя файла с типами иконок (по умолчанию: icon-types.d.ts) */
  typesFile?: string
  /** Имя файла с объявлением модуля *.svg?component (по умолчанию: svg-env.d.ts) */
  svgEnvFile?: string
  /** Имя файла с картой иконок (по умолчанию: icons.ts) */
  iconsFile?: string
}

const DEFAULT_TYPES_FILE = 'icon-types.d.ts'
const DEFAULT_SVG_ENV_FILE = 'svg-env.d.ts'
const DEFAULT_ICONS_FILE = 'icons.ts'

function toIdentifier(name: string): string {
  const identifier = name
    .split('-')
    .filter(Boolean)
    .map((part, index) => (index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join('')

  return /^[A-Za-z]/.test(identifier) ? identifier : `_${identifier}`
}

function renderTypes(icons: string[]): string {
  const entries = icons.map((icon) => `      '${icon}': true`).join('\n')

  return `/**
 * Generated file. Do not edit.
 */

declare module 'dotdev/ui-kit' {
  interface UIMenuItem {
    to?: import('vue-router').RouteLocationRaw
  }

  interface UiKitRegister {
    icons: {
${entries}
    }
  }
}

export {}
`
}

function renderSvgEnv(): string {
  return `/**
 * Generated file. Do not edit.
 */

declare module '*.svg?component' {
  import type { FunctionalComponent, SVGAttributes } from 'vue'
  const component: FunctionalComponent<SVGAttributes>
  export default component
}
`
}

function renderIcons(icons: string[], iconsDir: string, outDir: string): string {
  const rel = relative(outDir, iconsDir).split(sep).join('/')
  const prefix = rel === '' ? '.' : `./${rel}`

  const imports = icons.map((icon) => `import ${toIdentifier(icon)} from '${prefix}/${icon}.svg?component'`)
  const entries = icons.map((icon) => `  '${icon}': ${toIdentifier(icon)},`)

  return `/**
 * Generated file. Do not edit.
 */

import type { Component } from 'vue'
import type { UiKitIcon } from 'dotdev/ui-kit'
${imports.join('\n')}

export const icons: Record<UiKitIcon, Component> = {
${entries.join('\n')}
}
`
}

export default function uiKitIcons(options: UiKitIconsPluginOptions): Plugin {
  const iconsDir = options.dir
  const outDir = options.outDir ?? iconsDir
  const typesFile = options.typesFile ?? DEFAULT_TYPES_FILE
  const svgEnvFile = options.svgEnvFile ?? DEFAULT_SVG_ENV_FILE
  const iconsFile = options.iconsFile ?? DEFAULT_ICONS_FILE

  let root = process.cwd()

  const resolveDir = (dir: string) => (isAbsolute(dir) ? dir : resolve(root, dir))

  function getIcons(): string[] {
    return readdirSync(resolveDir(iconsDir))
      .filter((file) => file.endsWith('.svg'))
      .map((file) => parse(file).name)
      .sort()
  }

  function writeIfChanged(file: string, content: string) {
    try {
      if (readFileSync(file, 'utf8') === content) return
    } catch {
      // файла ещё нет — пишем
    }

    writeFileSync(file, content)
  }

  function regenerate() {
    try {
      const icons = getIcons()

      const resolvedOutDir = resolveDir(outDir)
      mkdirSync(resolvedOutDir, { recursive: true })

      writeIfChanged(join(resolvedOutDir, typesFile), renderTypes(icons))
      writeIfChanged(join(resolvedOutDir, svgEnvFile), renderSvgEnv())
      writeIfChanged(join(resolvedOutDir, iconsFile), renderIcons(icons, resolveDir(iconsDir), resolvedOutDir))

      console.log(`[dotdev:icons] Generated ${icons.length} icon${icons.length === 1 ? '' : 's'} -> ${outDir}`)
    } catch (error) {
      console.warn(`[dotdev:icons] Failed to generate icons:`, error)
    }
  }

  function isIconChange(file: string): boolean {
    return file.endsWith('.svg') && file.startsWith(resolveDir(iconsDir))
  }

  return {
    name: 'dotdev:icons',

    configResolved(config) {
      root = config.root
    },

    configureServer(server) {
      server.watcher.on('add', (file) => {
        if (!isIconChange(file)) return
        regenerate()
        server.ws.send({ type: 'full-reload' })
      })

      server.watcher.on('unlink', (file) => {
        if (!isIconChange(file)) return
        regenerate()
        server.ws.send({ type: 'full-reload' })
      })
    },

    buildStart() {
      regenerate()
    },
  }
}
