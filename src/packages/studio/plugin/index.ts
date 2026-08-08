import type { Plugin } from 'vite'
import { createFilter } from 'vite'
import path from 'node:path'
import { type ComponentMeta, createChecker } from 'vue-component-meta'
import type { PlayComponentMeta } from './component-meta.types.ts'
import { normalizeComponentMeta } from './normalize-meta.ts'

export interface PluginOptions {
  /** Относительный или абсолютный путь к tsconfig */
  tsconfigPath?: string
  /** Минимальный паттерн включения файлов */
  include?: string | RegExp | Array<string | RegExp>
  /** Паттерн исключений */
  exclude?: string | RegExp | Array<string | RegExp>
}

// ==========================================
// 1. Helpers & Meta Processors
// ==========================================

/**
 * Безопасная инъекция метаданных в экспорт по умолчанию.
 * Используем прикрепление к default export вместо жесткой привязки к _sfc_main.
 */
function injectMetadataToCode(code: string, metaList: PlayComponentMeta[], key = '__meta'): string {
  if (!metaList.length) return code

  const jsonMeta = JSON.stringify(metaList.length === 1 ? metaList[0] : metaList)

  // Прикрепляем к объекту компонента через экспорт по умолчанию
  const injection =
    `\n;if (typeof __default__ !== 'undefined') { __default__.${key} = ${jsonMeta}; }` +
    `\nelse if (typeof _sfc_main !== 'undefined') { _sfc_main.${key} = ${jsonMeta}; }`

  return `${code}${injection}`
}

// ==========================================
// 2. Main Plugin Definition
// ==========================================

export default function playgroundDocs(options: PluginOptions = {}): Plugin {
  const { include = '**/*.vue', exclude = '**/node_modules/**', tsconfigPath = 'tsconfig.app.json' } = options

  // Фильтр от rollup/vite для корректной работы с glob-паттернами
  const filter = createFilter(include, exclude)

  let checker: ReturnType<typeof createChecker> | null = null
  let root = process.cwd()

  function initChecker() {
    const fullTsconfigPath = path.isAbsolute(tsconfigPath) ? tsconfigPath : path.resolve(root, tsconfigPath)

    return createChecker(fullTsconfigPath, {
      printer: { newLine: 1 },
      schema: true,
    })
  }

  function extractMetadata(filePath: string): PlayComponentMeta[] {
    if (!checker) return []

    try {
      const exportNames = checker.getExportNames(filePath)

      return exportNames
        .map((name) => checker!.getComponentMeta(filePath, name))
        .filter((meta): meta is ComponentMeta => Boolean(meta))
        .map((meta) => normalizeComponentMeta(meta, filePath))
    } catch (error) {
      console.warn(`[playground-plugin] Meta extraction failed for ${filePath}:`, error)
      return []
    }
  }

  return {
    name: 'playground:vite-plugin-metadata',

    configResolved(config) {
      root = config.root
    },

    buildStart() {
      // Инициализируем checker при старте сборки/dev-сервера
      if (!checker) {
        checker = initChecker()
      }
    },

    buildEnd() {
      // Очистка ссылки для помощи Garbage Collector при заверешении сборки
      checker = null
    },

    transform(code, id) {
      // Игнорируем virtual-модули и файлы вне фильтра
      const cleanId = id.split('?')[0]
      if (!cleanId.endsWith('.vue') || !filter(cleanId)) {
        return null
      }

      const metadata = extractMetadata(cleanId)
      if (!metadata.length) return null

      return {
        code: injectMetadataToCode(code, metadata),
        map: null, // Если не генерируем sourcemap, явно передаем null
      }
    },

    async handleHotUpdate({ file, read, modules }) {
      if (!filter(file) || !checker) return

      try {
        // Обновляем файл в инкрементальном фиксаторе TypeScript
        const content = await read()
        checker.updateFile(file, content)
      } catch (err) {
        console.warn(`[playground-plugin] Failed to update file in HMR: ${file}`, err)
      }

      // Возвращаем модули для стандартного перезапуска HMR во Vite
      return modules
    },
  }
}
