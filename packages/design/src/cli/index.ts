import { defineCommand, runMain } from 'citty'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const pkg = JSON.parse(readFileSync(resolve(__dirname, '../../package.json'), 'utf-8'))

const main = defineCommand({
  meta: {
    name: '@dotdev/design',
    version: pkg.version,
    description: 'CLI для компиляции тем дизайн-системы',
  },
  subCommands: {
    build: () => import('./commands/build.ts').then((m) => m.default),
    watch: () => import('./commands/watch.ts').then((m) => m.default),
  },
})

runMain(main)
