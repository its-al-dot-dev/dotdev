import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'

import type { CompileResult } from '../builder/compiler.ts'
import { log } from './logger.ts'
import { compileWithTailwind } from './tailwind.ts'

export interface WriteOptions {
  outputType?: 'css' | 'config'
  split?: boolean
  output?: string
  cwd?: string
}

export async function writeResult(structured: CompileResult, options: WriteOptions = {}): Promise<void> {
  const cwd = options.cwd ?? process.cwd()
  const outputType = options.outputType ?? 'css'

  if (outputType === 'config') {
    await writeTsOutput(structured, options, cwd)
    return
  }

  if (options.split) {
    writeSplitCssOutput(structured, options, cwd)
    return
  }

  writeSingleCssOutput(structured, options, cwd)
}

async function writeTsOutput(structured: CompileResult, options: WriteOptions, cwd: string): Promise<void> {
  const outDir = getOutputDir(cwd, options)

  mkdirSync(outDir, { recursive: true })

  const contextPath = resolve(outDir, 'theme.ctx.css')
  const configPath = resolve(outDir, 'theme.config.ts')
  const typesPath = resolve(outDir, 'theme.types.ts')
  const indexPath = resolve(outDir, 'index.ts')

  const config = {
    ...structured.theme.config,
    components: Object.fromEntries([...structured.components].map(([name, component]) => [name, component.config])),
  }

  const definition = objectToInterface('ThemeDefinition', config)

  writeFile(typesPath, definition, cwd)
  writeFile(configPath, `export default ${JSON.stringify(config, null, 2)}`, cwd)
  writeFile(contextPath, structured.theme.css, cwd)

  const exports = [
    `export { default as theme } from './theme.config.ts'`,
    `export type { ThemeDefinition } from './theme.types.ts'`,
  ]

  try {
    for (const [name, component] of structured.components) {
      const css = await compileWithTailwind([`@reference "${contextPath}";`, component.css].join('\n\n'))
      const componentPath = resolve(outDir, `${name}.ts`)

      writeFile(componentPath, `export default ${JSON.stringify(css)}`, cwd)
      exports.push(`export { default as ${toExportName(name)}Style } from './${name}.ts'`)
    }

    writeFile(indexPath, `${exports.join('\n')}\n`, cwd)
  } finally {
    rmSync(contextPath, { force: true })
  }
}

function writeSplitCssOutput(structured: CompileResult, options: WriteOptions, cwd: string): void {
  const outDir = getOutputDir(cwd, options)

  mkdirSync(outDir, { recursive: true })

  if (structured.theme.css) {
    writeFile(resolve(outDir, 'theme.css'), structured.theme.css, cwd)
  }

  for (const [name, component] of structured.components) {
    writeFile(resolve(outDir, `${name}.css`), component.css, cwd)
  }
}

function writeSingleCssOutput(structured: CompileResult, options: WriteOptions, cwd: string): void {
  const css = [structured.theme.css, ...Array.from(structured.components.values(), (c) => c.css)]
    .filter(Boolean)
    .join('\n\n')

  if (!options.output) {
    process.stdout.write(`${css}\n`)
    return
  }

  const outputPath = resolve(cwd, options.output)
  writeFile(outputPath, css, cwd)
}

function getOutputDir(cwd: string, options: WriteOptions): string {
  return resolve(cwd, options.output ?? './dist')
}

function writeFile(path: string, content: string, cwd: string): void {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${content}\n`, 'utf-8')
  log.success(relative(cwd, path))
}

function objectToInterface(name: string, value: Record<string, unknown>): string {
  const render = (object: Record<string, unknown>, indent = 2): string => {
    const spaces = ' '.repeat(indent)

    const fields = Object.entries(object).map(([key, value]) => {
      const type = isPlainObject(value) ? render(value, indent + 2) : 'T'

      return `${spaces}"${key}"?: ${type}`
    })

    return `{\n${fields.join('\n')}\n${' '.repeat(indent - 2)}}`
  }

  return `export interface ${name}<T = string | [string, string]> ${render(value)}`
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function toExportName(name: string): string {
  return name.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase())
}
