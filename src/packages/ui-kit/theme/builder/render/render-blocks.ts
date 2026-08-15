// ============================================================================
// render-blocks — рендер простых блоков листа: vars, utilities, rules, styles.
// ============================================================================

import type { Resolver, SheetConfig } from '../types.ts'
import { buildSelector } from './selector.ts'
import { utilityName, varPrefix } from './naming.ts'

export function renderVarsBlock(vars: SheetConfig['vars'], name: string, resolve: Resolver): string {
  if (!vars || !Object.keys(vars).length) return ''
  const prefix = varPrefix(name)

  const lines = Object.entries(vars).map(([key, value]) => {
    const $key = key.startsWith('--') ? key : prefix(key)
    return `  ${$key}: ${resolve(value)};`
  })

  return `@theme {\n${lines.join('\n')}\n}`
}

export function renderUtilitiesBlock(
  utilities: SheetConfig['utilities'],
  name: string,
  scope: SheetConfig['scope'],
): string {
  if (!utilities || !Object.keys(utilities).length) return ''
  const utilName = utilityName(name, scope ?? 'local')
  return Object.entries(utilities)
    .map(([key, value]) => `@utility ${utilName(key)} {\n  @apply ${value};\n}`)
    .join('\n\n')
}

export function renderRulesBlock(base: string, rules: SheetConfig['rules']): string {
  if (!rules || !Object.keys(rules).length) return ''
  const list = Object.entries(rules)
    .filter(([, value]) => value)
    .map(([key, value]) => indent(`${buildSelector(key, base)} {\n  @apply ${value};\n}`))
  return `@layer components {\n${list.join('\n\n')}\n}`
}

export function renderStylesBlock(base: string, styles: SheetConfig['styles']): string {
  if (!styles || !Object.keys(styles).length) return ''
  const list = Object.entries(styles)
    .filter(([, value]) => value)
    .map(([key, value]) => indent(`${buildSelector(key, base)} {\n  ${value};\n}`))
  return `@layer components {\n${list.join('\n\n')}\n}`
}

/** Отступ текста на 2 пробела для вложенных блоков (@layer components) */
function indent(text: string): string {
  return text
    .split('\n')
    .map((line) => `  ${line}`)
    .join('\n')
}
