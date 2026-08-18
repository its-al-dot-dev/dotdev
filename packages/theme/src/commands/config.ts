import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'
import type { BuildConfig } from '../types'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const jiti = createJiti(__dirname, {
  fsCache: false,
})

export async function loadBuildConfig(configPath: string): Promise<BuildConfig> {
  const resolved = path.resolve(process.cwd(), configPath)
  const config = await jiti.import<BuildConfig>(resolved, { default: true })
  if (!config || !Array.isArray(config.targets)) {
    throw new Error(`Invalid build config: ${configPath}. Expected { targets: BuildTarget[] }`)
  }
  return config
}
