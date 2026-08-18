import { defineCommand } from 'citty'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { loadTheme, watchTask } from './utils'
import type { Part } from '../types'

export async function buildCSS(input: string, output: string, name: string, part?: Part): Promise<void> {
  const theme = await loadTheme(input)
  const outDir = path.resolve(output)

  if (part?.startsWith('components')) {
    const selected = parseComponentList(part)
    const files = theme.toFiles()
    const components = selected
      ? Object.fromEntries(Object.entries(files.components).filter(([ui]) => selected.includes(ui)))
      : files.components

    await mkdir(outDir, { recursive: true })

    for (const [ui, file] of Object.entries(components)) {
      const css = [file.variables, file.rules].filter(Boolean).join('\n\n')
      if (!css.trim()) continue
      await writeFile(path.join(outDir, `${name}.${ui}.css`), css)
      console.log(`css -> ${path.relative(process.cwd(), path.join(outDir, `${name}.${ui}.css`))}`)
    }
    return
  }

  const parts = parsePartList(part)
  const css = buildCSSFromParts(theme, parts)

  await mkdir(outDir, { recursive: true })
  const fileName = parts.length === 1 && parts[0] !== 'all' ? `${name}.${parts[0]}.css` : `${name}.css`
  await writeFile(path.join(outDir, fileName), css)

  console.log(`css -> ${path.relative(process.cwd(), path.join(outDir, fileName))}`)
}

function parsePartList(part?: Part): Part[] {
  if (!part || part === 'all') return ['vars', 'utilities', 'rules']
  return part.split(',').map((p) => p.trim()) as Part[]
}

function parseComponentList(part: string): string[] | undefined {
  const components = part.split(':')[1]
  if (!components) return undefined
  return components
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean)
}

function buildCSSFromParts(
  theme: { toVarsCSS(): string; toUtilitiesCSS(): string; toRulesCSS(): string },
  parts: Part[],
): string {
  const chunks: string[] = []
  for (const p of parts) {
    switch (p) {
      case 'vars':
        chunks.push(theme.toVarsCSS())
        break
      case 'utilities':
        chunks.push(theme.toUtilitiesCSS())
        break
      case 'rules':
        chunks.push(theme.toRulesCSS())
        break
    }
  }
  return chunks.filter(Boolean).join('\n\n')
}

export const css = defineCommand({
  meta: {
    name: 'css',
    description: 'Generate CSS file with theme variables',
  },
  args: {
    input: {
      type: 'string',
      description: 'Path to theme config file',
      required: true,
    },
    output: {
      type: 'string',
      description: 'Output directory',
      default: './dist',
    },
    name: {
      type: 'string',
      description: 'Output file name (without extension)',
      default: 'index',
    },
    part: {
      type: 'string',
      description: 'Parts to generate: vars, utilities, rules, components, components:ui1,ui2 (default: all)',
    },
    watch: {
      type: 'boolean',
      description: 'Watch for changes and rebuild',
      default: false,
    },
    'watch-path': {
      type: 'string',
      description: 'Directory or file to watch (default: input file)',
    },
  },
  async run({ args }) {
    const input = path.resolve(args.input)
    const watchPath = args['watch-path'] ? path.resolve(args['watch-path']) : input

    await buildCSS(input, args.output, args.name, args.part as Part)

    if (args.watch) {
      watchTask(() => buildCSS(input, args.output, args.name, args.part as Part), watchPath)
    }
  },
})
