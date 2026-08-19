import { defineCommand } from 'citty'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { loadConfig } from '../load-config.ts'
import { applyExclude, compile, parseKinds, parseScope } from '../compile.ts'
import { log } from '../logger.ts'

export default defineCommand({
  meta: {
    name: 'build',
    description: 'Компилирует тему в CSS',
  },
  args: {
    input: {
      type: 'string',
      alias: 'i',
      description: 'Путь к файлу конфига',
      default: 'design.config.ts',
    },
    output: {
      type: 'string',
      alias: 'o',
      description: 'Путь выходного файла или директории (при --split)',
    },
    namespace: {
      type: 'string',
      alias: 'n',
      description: 'Переопределить namespace',
    },
    scope: {
      type: 'string',
      alias: 's',
      description: 'Область: all, theme или имя компонента',
      default: 'all',
    },
    exclude: {
      type: 'string',
      alias: 'e',
      description: 'Исключить через запятую: theme, имя компонента',
    },
    split: {
      type: 'boolean',
      description: 'Разбить вывод по компонентам в отдельные файлы',
    },
    kinds: {
      type: 'string',
      alias: 'k',
      description: 'Типы токенов через запятую: primitives, utilities, rules',
    },
  },
  async run({ args }) {
    const config = await loadConfig(args.input)
    const componentNames = Object.keys(config.components ?? {})
    const parsed = parseScope(args.scope)
    const scope = applyExclude(parsed, args.exclude, componentNames)
    const kinds = parseKinds(args.kinds)

    const { structured } = compile(config, {
      namespace: args.namespace,
      scope,
      kinds,
    })

    if (args.split) {
      const outDir = resolve(process.cwd(), args.output ?? './dist')
      mkdirSync(outDir, { recursive: true })

      if (structured.theme) {
        const themePath = resolve(outDir, 'theme.css')
        writeFileSync(themePath, structured.theme + '\n', 'utf-8')
        log.success(relative(process.cwd(), themePath))
      }

      for (const [name, css] of structured.components) {
        const compPath = resolve(outDir, `${name}.css`)
        writeFileSync(compPath, css + '\n', 'utf-8')
        log.success(relative(process.cwd(), compPath))
      }
    } else {
      const css = [structured.theme, ...structured.components.values()].filter(Boolean).join('\n\n')

      if (args.output) {
        const outPath = resolve(process.cwd(), args.output)
        mkdirSync(dirname(outPath), { recursive: true })
        writeFileSync(outPath, css + '\n', 'utf-8')
        log.success(relative(process.cwd(), outPath))
      } else {
        process.stdout.write(css + '\n')
      }
    }
  },
})
