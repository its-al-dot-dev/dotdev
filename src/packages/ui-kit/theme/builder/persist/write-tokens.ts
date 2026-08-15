// ============================================================================
// write-tokens — персистенция: запись манифеста токенов (tokens.json).
// Чистый IO, никакой сборки манифеста здесь нет.
// ============================================================================

import * as fs from 'fs/promises'
import * as path from 'path'
import type { TokenManifest } from '../types.ts'

export async function writeTokensManifest(
  folderPath: string,
  themeName: string,
  manifest: TokenManifest,
): Promise<string> {
  const themeDir = path.resolve(folderPath, themeName)
  await fs.mkdir(themeDir, { recursive: true })

  const filePath = path.join(themeDir, 'tokens.json')
  await fs.writeFile(filePath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8')

  return filePath
}
