import * as fs from 'fs/promises'
import * as path from 'path'

export type ComponentStyles = Record<string, string>

export async function saveTheme(
  folderPath: string,
  themeName: string,
  componentStyles: ComponentStyles
): Promise<string> {
  try {
    const themeDir = path.resolve(folderPath + '/' + themeName, 'components')
    await fs.mkdir(themeDir, { recursive: true })

    const importLines: string[] = []

    for (const [componentName, cssContent] of Object.entries(componentStyles)) {
      if (!componentName) continue

      const componentFileName = `${componentName}.css`
      const componentFilePath = path.join(themeDir, componentFileName)

      await fs.writeFile(componentFilePath, cssContent.trim() + '\n', 'utf-8')
      importLines.push(`@import './${componentFileName}';`)
    }

    const indexContent = importLines.join('\n') + (importLines.length ? '\n' : '')
    const indexFilePath = path.join(themeDir, 'index.css')

    await fs.writeFile(indexFilePath, indexContent, 'utf-8')

    return themeDir
  } catch (error) {
    throw new Error(`Failed to save theme "${themeName}" at path "${folderPath}": ${(error as Error).message}`)
  }
}
