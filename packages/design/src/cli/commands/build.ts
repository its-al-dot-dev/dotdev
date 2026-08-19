import { defineCommand } from 'citty'
import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname, relative } from 'node:path'
import { loadConfig } from '../load-config.ts'
import { compile, parseScope, parseKinds } from '../compile.ts'
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
      description: 'Путь выходного файла (stdout если не указан)',
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
    kinds: {
      type: 'string',
      alias: 'k',
      description: 'Типы токенов через запятую: primitives, utilities, rules',
    },
  },
  async run({ args }) {
    const config = await loadConfig(args.input)
    const scope = parseScope(args.scope)
    const kinds = parseKinds(args.kinds)

    const { css } = compile(config, {
      namespace: args.namespace,
      scope,
      kinds,
    })

    if (args.output) {
      const outPath = resolve(process.cwd(), args.output)
      mkdirSync(dirname(outPath), { recursive: true })
      writeFileSync(outPath, css + '\n', 'utf-8')
      log.success(relative(process.cwd(), outPath))
    } else {
      process.stdout.write(css + '\n')
    }
  },
})
