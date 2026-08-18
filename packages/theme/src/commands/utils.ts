import chokidar from 'chokidar'
import path from 'node:path'
import type { Theme } from '../index'

export async function loadTheme(input: string): Promise<Theme> {
  const resolved = path.resolve(process.cwd(), input)
  const mod = await import(`${resolved}?t=${Date.now()}`)
  return mod.default ?? Object.values(mod)[0]
}

export function watchTask(
  build: () => Promise<void>,
  watchPath: string,
): void {
  console.log(`Watching ${watchPath} for changes...`)
  let building = false
  chokidar.watch(watchPath, { ignoreInitial: true }).on('change', async () => {
    if (building) return
    building = true
    console.log('Change detected, rebuilding...')
    await build()
    building = false
  })
}
