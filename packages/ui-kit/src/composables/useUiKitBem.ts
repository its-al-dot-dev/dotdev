import { bem, type BemClassResult, type BemModifier, type UiKitBaseProps } from '@dotdev/ui-kit'

export interface UseBemReturn {
  (): BemClassResult
  (element: string, ...modifiers: BemModifier[]): BemClassResult
  (...modifiers: BemModifier[]): BemClassResult
}

export function useBem(block: string): UseBemReturn {
  return function b(...args: any[]): BemClassResult {
    const [firstArg, ...rest] = args

    if (typeof firstArg === 'string' && firstArg) {
      return bem(`${block}__${firstArg}`, ...rest)
    }

    return bem(block, ...args)
  }
}

export function useUiKitBem(props: UiKitBaseProps): UseBemReturn {
  const namespace = props.namespace || 'd'
  const name = props.ui

  if (!name) {
    throw new Error('[dotdev/ui-kit]: The "ui" prop is required for useUiKitBem.')
  }

  return useBem(`${namespace}-${name}`)
}
