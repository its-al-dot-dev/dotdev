import { resolve } from 'node:path'
import { createJiti } from 'jiti'
import type { ThemeConfig } from '../builder/theme.ts'

const cwd = process.cwd()
const jiti = createJiti(cwd, { interopDefault: true, moduleCache: false })

export async function loadConfig(input?: string): Promise<ThemeConfig> {
  const fileName = input ?? 'design.config.ts'
  const filePath = resolve(cwd, fileName)

  const mod = await jiti.import(filePath)
  const config = (mod as any).default ?? mod

  if (!config || typeof config !== 'object') {
    throw new Error(`[design] конфиг должен быть объектом: ${filePath}`)
  }

  return config as ThemeConfig
}
