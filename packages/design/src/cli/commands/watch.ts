import { defineCommand } from 'citty'
import { relative, resolve } from 'node:path'
import chokidar from 'chokidar'
import { loadConfig } from '../load-config.ts'
import { applyExclude, compile, parseKinds, parseScope } from '../compile.ts'
import { writeResult } from '../write.ts'
import { log } from '../logger.ts'

export default defineCommand({
  meta: {
    name: 'watch',
    description: 'Следит за изменениями и пересобирает тему',
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
    dir: {
      type: 'string',
      alias: 'd',
      description: 'Директория для наблюдения',
      default: '.',
    },
    poll: {
      type: 'boolean',
      alias: 'p',
      description: 'Использовать polling',
      default: false,
    },
    interval: {
      type: 'string',
      description: 'Интервал polling в мс',
      default: '100',
    },
  },
  async run({ args }) {
    const cwd = process.cwd()
    const watchDir = resolve(cwd, args.dir)
    const kinds = parseKinds(args.kinds)

    async function build() {
      try {
        const config = await loadConfig(args.input)
        const componentNames = Object.keys(config.components ?? {})
        const scope = applyExclude(parseScope(args.scope), args.exclude, componentNames)

        const { structured } = compile(config, {
          namespace: args.namespace,
          scope,
          kinds,
        })

        writeResult(structured, { split: args.split, output: args.output, cwd })
      } catch (err: any) {
        log.error(err.message)
      }
    }

    await build()

    const watcher = chokidar.watch(watchDir, {
      ignoreInitial: true,
      awaitWriteFinish: { stabilityThreshold: 100 },
      usePolling: args.poll,
      interval: Number(args.interval),
    })

    watcher.on('change', (path) => {
      log.change(relative(cwd, path))
      build()
    })

    watcher.on('add', (path) => {
      log.add(relative(cwd, path))
      build()
    })

    watcher.on('unlink', (path) => {
      log.remove(relative(cwd, path))
      build()
    })

    log.info(`Watching ${relative(cwd, watchDir)}...`)
  },
})
