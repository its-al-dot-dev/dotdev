import { defineCommand } from 'citty'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { loadTheme } from './utils'

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
  },
  async run({ args }) {
    const theme = await loadTheme(args.input)
    const output = path.resolve(args.output)

    await mkdir(output, { recursive: true })
    await writeFile(path.join(output, `${args.name}.css`), theme.toCSS())

    const relative = path.relative(process.cwd(), path.join(output, `${args.name}.css`))
    console.log(`css -> ${relative}`)
  },
})
