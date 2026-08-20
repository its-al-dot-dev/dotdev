import postcss from 'postcss'
import tailwindcss from '@tailwindcss/postcss'

const removeTailwindProperties = {
  postcssPlugin: 'remove-tailwind-properties',

  OnceExit(root: any) {
    root.walkComments((comment: any) => {
      if (comment.text.includes('tailwindcss v')) {
        comment.remove()
      }
    })

    root.walkAtRules('layer', (rule: any) => {
      if (rule.params === 'properties') {
        rule.remove()
      }
    })
  },
}

export async function compileWithTailwind(input: string, from?: string): Promise<string> {
  const result = await postcss([tailwindcss(), removeTailwindProperties]).process(
    `@reference "tailwindcss"; ${input}`,
    { from },
  )

  return result.css
}
