import postcss from 'postcss'
import tailwindcss from '@tailwindcss/postcss'

export async function compileWithTailwind(input: string, from: string): Promise<string> {
  const result = await postcss([tailwindcss()]).process(input, { from })
  return result.css
}
