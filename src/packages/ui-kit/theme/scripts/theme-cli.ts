import path from 'node:path'
import fs from 'node:fs'
import { createJiti } from 'jiti'
import chokidar, { type FSWatcher } from 'chokidar'
import { parseArgs } from 'node:util'

import { uiKitTheme, type UiKitThemeConfig } from '../utils/uiKitTheme.ts'
import { saveTheme } from '../utils/saveTheme.ts'

const { values } = parseArgs({
  options: {
    input: {
      type: 'string',
      short: 'i',
    },
    output: {
      type: 'string',
      short: 'o',
      default: './output/themes',
    },
    watch: {
      type: 'boolean',
      short: 'w',
      default: false,
    },
  },
})

const inputArg = values.input
const outputDir = values.output
const isWatch = values.watch

if (!inputArg) {
  console.error('❌ Error: Please specify input config file or directory via --input or -i')
  process.exit(1)
}

// Разрешаем исходный путь
const resolvedInput = path.resolve(process.cwd(), inputArg)
let resolvedConfigPath = resolvedInput

// Если переданный путь существует и является папкой, ищем внутри index.ts
if (fs.existsSync(resolvedInput) && fs.statSync(resolvedInput).isDirectory()) {
  resolvedConfigPath = path.join(resolvedInput, 'index.ts')
}

// Проверяем существование конечного файла
if (!fs.existsSync(resolvedConfigPath)) {
  console.error(`❌ Error: Cannot find required file at ${resolvedConfigPath}`)
  process.exit(1)
}

const jiti = createJiti(import.meta.url, {
  interopDefault: true,
  moduleCache: false,
  alias: {
    'dotdev/theme': path.resolve(import.meta.dirname, '../'),
  },
})

let watcher: FSWatcher | undefined

async function buildTheme(): Promise<boolean> {
  const startTime = performance.now()

  try {
    const relativePath = path.relative(process.cwd(), resolvedConfigPath)
    console.log(`\n📦 Building theme from: ${relativePath}...`)

    const imported = (await jiti.import(resolvedConfigPath)) as {
      default?: UiKitThemeConfig
    }

    // Жесткая проверка на наличие export default
    if (!imported || !imported.default) {
      throw new Error('Config file must provide an "export default" with a valid configuration object.')
    }

    const config = imported.default

    if (!config.theme) {
      throw new Error('Configuration object must have a "theme" property.')
    }

    const stylesMap = uiKitTheme(config)
    const savedDir = await saveTheme(outputDir, config.theme, stylesMap)
    const duration = (performance.now() - startTime).toFixed(2)

    console.log(`✅ Theme "${config.theme}" built successfully in ${duration}ms`)
    console.log(`📁 Output: ${path.relative(process.cwd(), savedDir)}`)

    return true
  } catch (error) {
    console.error(`❌ Build failed: ${(error as Error).message}`)
    return false
  }
}

async function startWatcher() {
  if (!isWatch) return

  // Следим за всей папкой конфигурации. Это автоматически захватит index.ts
  // и все локальные файлы, которые он может импортировать (например, colors.ts).
  const watchTarget = fs.statSync(resolvedInput).isDirectory() ? resolvedInput : path.dirname(resolvedInput)

  watcher = chokidar.watch(watchTarget, {
    ignoreInitial: true,
  })

  watcher.on('change', async (file) => {
    console.log(`\n🔄 Changed: ${path.relative(process.cwd(), file)}`)
    await buildTheme()
  })

  console.log(`👀 Watching for changes in directory: ${path.relative(process.cwd(), watchTarget)}...`)
}

async function main() {
  const success = await buildTheme()

  if (!success && !isWatch) {
    process.exit(1)
  }

  if (isWatch) {
    await startWatcher()
  }
}

main()
