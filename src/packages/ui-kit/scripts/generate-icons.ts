import { readdirSync, writeFileSync } from 'fs'
import { parse, resolve } from 'path'

interface GenerateIconsOptions {
  input: string
  output: string
}

export function generateIconTypes({ input, output }: GenerateIconsOptions) {
  const iconsDir = resolve(input)
  const outputFile = resolve(output)

  const icons = readdirSync(iconsDir)
    .filter((file) => file.endsWith('.svg'))
    .map((file) => parse(file).name)
    .sort()

  const content = `/**
 * Generated file. Do not edit.
 */

export type IconName =
${icons.map((icon) => `  | '${icon}'`).join('\n')}
`

  writeFileSync(outputFile, content)

  console.log(`Generated ${icons.length} icon names`)
}

generateIconTypes({
  input: resolve(__dirname, '../components/icon/icons'),
  output: resolve(__dirname, '../types/icons.types.d.ts'),
})
