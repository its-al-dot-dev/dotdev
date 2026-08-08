type UISize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type UISizeValue = 'h' | 'w' | 'rounded' | 'size' | 'gap' | 'pl' | 'px' | 'text' | 'min-w'

const SIZES: UISize[] = ['xs', 'sm', 'md', 'lg', 'xl']

type CssVarUtilityValue = string | ((size: UISize) => string)

export function createCssVarUtilities(map: Partial<Record<UISizeValue, CssVarUtilityValue>>) {
  return Object.fromEntries(
    Object.entries(map).flatMap(([utility, variable]) =>
      SIZES.map((size) => [`@${utility}-${size}`, createUtilityValue(utility, variable, size)]),
    ),
  )
}

function createUtilityValue(utility: string, variable: CssVarUtilityValue, size: UISize) {
  if (typeof variable === 'function') return variable(size)
  return `${utility}-(--ui-${variable}-${size})`
}

export function tw<T>(options: T) {
  return options
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
