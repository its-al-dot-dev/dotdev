export const disabled = 'disabled:pointer-events-none disabled:opacity-50'

type UISize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type UISizeValue = 'h' | 'w' | 'rounded' | 'size' | 'gap' | 'pl' | 'px' | 'text' | 'min-w'

const SIZES: UISize[] = ['xs', 'sm', 'md', 'lg', 'xl']

export interface StyleSheetConfig {
  /** CSS-переменные → `@theme { --<name>-<key>: value; }` */
  theme?: Record<string, string>
  /** Tailwind-утилиты → `@utility <name>-<key> { @apply value; }` */
  utilities?: Record<string, string>
  /** Компонентные BEM-правила → `@layer components { <selector> { @apply value; } }` */
  component?: Record<string, string>
  /** «Сырые» нативные декларации → `@layer components { <selector> { value; } }` */
  styles?: Record<string, string>
}

export type StyleSheetComponent = NonNullable<StyleSheetConfig['component']>

export interface StyleSheet {
  $render(base: string, name: string): string
}

export function defineStyleSheet(config: StyleSheetConfig): StyleSheet {
  return {
    $render(base, name) {
      const parts: string[] = []

      const themeVars = config.theme && Object.entries(config.theme).filter(([, value]) => value)
      if (themeVars?.length) {
        parts.push(`@theme {\n${themeVars.map(([key, value]) => `  --${name}-${key}: ${value};`).join('\n')}\n}`)
      }

      for (const [key, value] of Object.entries(config.utilities ?? {})) {
        if (!value) continue
        parts.push(`@utility ${name}-${key} {\n   @apply ${value};\n}`)
      }

      const toSelector = (key: string) => key.replace(/\.&/g, '&').replace(/&/g, base).replace(/\.{2,}/g, '.')

      const componentRules = Object.entries(config.component ?? {})
        .filter(([, value]) => value)
        .map(([key, value]) => `${toSelector(key)} {\n  @apply ${value};\n}`)

      const rawRules = Object.entries(config.styles ?? {})
        .filter(([, value]) => value)
        .map(([key, value]) => `${toSelector(key)} {\n  ${value};\n}`)

      if (componentRules.length || rawRules.length) {
        parts.push(`@layer components {\n${[...componentRules, ...rawRules].join('\n\n')}\n}`)
      }

      return parts.join('\n\n')
    },
  }
}

export function createCssVarUtilities(map: Partial<Record<UISizeValue, CssVarUtilityValue>>) {
  return Object.fromEntries(
    Object.entries(map).flatMap(([utility, variable]) =>
      SIZES.map((size) => [`${utility}-${size}`, createUtilityValue(utility, variable, size)]),
    ),
  )
}

type CssVarUtilityValue = string | ((size: UISize) => string)

function createUtilityValue(utility: string, variable: CssVarUtilityValue, size: UISize) {
  if (typeof variable === 'function') return variable(size)
  return `${utility}-(--ui-${variable}-${size})`
}

export function sizes(size: UISize, ...values: UISizeValue[]) {
  return values.map((v) => `ui-${v}-${size}`).join(' ')
}

export function calcVar(variable: string, offset: string) {
  return `[calc(var(--ui-${variable})${offset})]`
}

type TransitionKey = 'bg' | 'ring' | 'color' | 'border' | 'opacity' | 'translate' | 'all'
const transitionMap: Record<TransitionKey, string> = {
  bg: 'background-color',
  color: 'color',
  border: 'border-color',
  opacity: 'opacity',
  translate: 'translate',
  all: 'all',
  ring: 'box-shadow',
}

export function tr(...keys: TransitionKey[]) {
  if (keys.includes('all')) return 'transition-all'
  return `transition-[${keys.map((key) => transitionMap[key]).join(',')}]`
}
