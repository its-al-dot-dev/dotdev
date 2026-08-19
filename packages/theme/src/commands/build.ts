import { defineCommand } from 'citty'
import path from 'node:path'
import { loadBuildConfig } from './config'
import { loadTheme, watchTask } from './utils'
import { buildCSS } from './css'
import { buildTokens } from './tokens'
import { Part } from '../types'

export const build = defineCommand({
  meta: {
    name: 'build',
    description: 'Run theme build from config file',
  },
  args: {
    config: {
      type: 'string',
      description: 'Path to theme-build.config.ts',
      required: true,
    },
    watch: {
      type: 'boolean',
      description: 'Watch for changes and rebuild',
      default: false,
    },
  },
  async run({ args }) {
    const config = await loadBuildConfig(args.config)
    const input = path.resolve(config.input)
    const output = path.resolve(config.output ?? './dist')
    const watchPath = config.watchPath ? path.resolve(config.watchPath) : input

    async function runBuild(): Promise<void> {
      const theme = await loadTheme(input)

      for (const target of config.targets) {
        const targetOutput = path.resolve(output, target.name)
        switch (target.type) {
          case 'css':
            await buildCSS(input, targetOutput, target.name, target.parts?.join(',') as Part)
            break
          case 'tokens':
            await buildTokens(target.name, theme, targetOutput, target.parts?.join(',') as Part)
            break
        }
      }
    }

    await runBuild()

    if (config.watch || args.watch) {
      watchTask(runBuild, watchPath)
    }
  },
})
