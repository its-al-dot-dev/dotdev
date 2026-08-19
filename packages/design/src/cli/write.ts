import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import type { CompileResult } from '../builder/compiler.ts'
import { log } from './logger.ts'

export interface WriteOptions {
  split?: boolean
  output?: string
  cwd?: string
}

export function writeResult(structured: CompileResult, options: WriteOptions = {}) {
  const cwd = options.cwd ?? process.cwd()

  if (options.split) {
    const outDir = resolve(cwd, options.output ?? './dist')
    mkdirSync(outDir, { recursive: true })

    if (structured.theme) {
      const themePath = resolve(outDir, 'theme.css')
      writeFileSync(themePath, structured.theme + '\n', 'utf-8')
      log.success(relative(cwd, themePath))
    }

    for (const [name, css] of structured.components) {
      const compPath = resolve(outDir, `${name}.css`)
      writeFileSync(compPath, css + '\n', 'utf-8')
      log.success(relative(cwd, compPath))
    }
  } else {
    const css = [structured.theme, ...structured.components.values()].filter(Boolean).join('\n\n')

    if (options.output) {
      const outPath = resolve(cwd, options.output)
      mkdirSync(dirname(outPath), { recursive: true })
      writeFileSync(outPath, css + '\n', 'utf-8')
      log.success(relative(cwd, outPath))
    } else {
      process.stdout.write(css + '\n')
    }
  }
}
