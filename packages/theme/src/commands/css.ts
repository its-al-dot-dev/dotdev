import { defineCommand } from 'citty'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import chokidar from 'chokidar'
import { loadTheme } from './utils'

async function buildCSS(input: string, output: string, name: string): Promise<void> {
  const theme = await loadTheme(input)
  const outDir = path.resolve(output)

  await mkdir(outDir, { recursive: true })
  await writeFile(path.join(outDir, `${name}.css`), theme.toCSS())

  const relative = path.relative(process.cwd(), path.join(outDir, `${name}.css`))
  console.log(`css -> ${relative}`)
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

    await buildCSS(input, args.output, args.name)

    if (args.watch) {
      console.log(`Watching ${watchPath} for changes...`)
      chokidar.watch(watchPath, { ignoreInitial: true }).on('change', async () => {
        console.log('Change detected, rebuilding...')
        await buildCSS(input, args.output, args.name)
      })
    }
  },
})
