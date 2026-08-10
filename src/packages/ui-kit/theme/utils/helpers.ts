export const disabled = 'disabled:pointer-events-none disabled:opacity-50'

type UISize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type UISizeValue = 'h' | 'w' | 'rounded' | 'size' | 'gap' | 'pl' | 'px' | 'text' | 'min-w'

const SIZES: UISize[] = ['xs', 'sm', 'md', 'lg', 'xl']

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

export function resolveTokenValue(value: string) {
  return /^[a-zA-Z][a-zA-Z0-9-]*$/.test(value) ? `var(--color-${value})` : value
}

export const themeUtilityProperties = new Set(['bg', 'text', 'border'])

const themeModifiers = [
  'focus-visible',
  'focus-within',
  'group-hover',
  'group-focus',
  'group-active',
  'hover',
  'focus',
  'active',
  'disabled',
  'checked',
  'visited',
  'dark',
  'light',
]

export function findThemeModifier(key: string) {
  return themeModifiers.find((modifier) => key.endsWith(`-${modifier}`))
}
