import { defineCommand } from 'citty'
import { loadConfig } from '../load-config.ts'
import { applyExclude, compile, parseKinds, parseScope } from '../compile.ts'
import { writeResult } from '../write.ts'

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
    format: {
      type: 'string',
      alias: 'f',
      description: 'Формат вывода: css или config',
      default: 'css',
    },
  },
  async run({ args }) {
    const config = await loadConfig(args.input)
    const componentNames = Object.keys(config.components ?? {})
    const scope = applyExclude(parseScope(args.scope), args.exclude, componentNames)
    const kinds = parseKinds(args.kinds)

    const { structured } = compile(config, {
      namespace: args.namespace,
      scope,
      kinds,
    })

    await writeResult(structured, { split: args.split, output: args.output, outputType: args.format as 'css' | 'config' })
  },
})
