// ============================================================================
// write-theme — персистенция: запись собранной темы на диск.
// Чистый IO, никакой рендер-логики здесь нет.
//
// Структура вывода (по группам):
//   {output}/{theme}/index.css          — импорты group-индексов
//   {output}/{theme}/{group}/*.css      — листы группы
//   {output}/{theme}/{group}/index.css  — импорты листов группы
// ============================================================================

import * as fs from 'fs/promises'
import * as path from 'path'

export type GroupStyles = Record<string, Record<string, string>>

export async function writeThemeFiles(
  folderPath: string,
  themeName: string,
  groupStyles: GroupStyles,
): Promise<string> {
  try {
    const themeDir = path.resolve(folderPath + '/' + themeName)
    await fs.mkdir(themeDir, { recursive: true })

    const themeImports: string[] = []

    for (const [groupName, styles] of Object.entries(groupStyles)) {
      if (!groupName) continue

      const groupDir = path.join(themeDir, groupName)
      await fs.mkdir(groupDir, { recursive: true })

      const importLines: string[] = []
      for (const [sheetName, cssContent] of Object.entries(styles)) {
        if (!sheetName) continue

        const fileName = `${sheetName}.css`
        await fs.writeFile(path.join(groupDir, fileName), cssContent.trim() + '\n', 'utf-8')
        importLines.push(`@import './${fileName}';`)
      }

      const indexContent = importLines.join('\n') + (importLines.length ? '\n' : '')
      await fs.writeFile(path.join(groupDir, 'index.css'), indexContent, 'utf-8')

      themeImports.push(`@import './${groupName}/index.css';`)
    }

    const themeIndexContent = themeImports.join('\n') + (themeImports.length ? '\n' : '')
    await fs.writeFile(path.join(themeDir, 'index.css'), themeIndexContent, 'utf-8')

    return themeDir
  } catch (error) {
    throw new Error(`Failed to save theme "${themeName}" at path "${folderPath}": ${(error as Error).message}`)
  }
}
