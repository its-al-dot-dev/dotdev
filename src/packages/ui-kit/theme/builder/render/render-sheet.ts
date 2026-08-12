// ============================================================================
// render-sheet — композиция всех блоков листа в единый CSS-текст.
//
// Порядок блоков (важно сохранить): vars -> semantics -> utilities -> rules -> styles.
// ============================================================================

import type { Resolver, SheetConfig } from '../types.ts'
import { renderSemanticsBlock } from './render-semantics.ts'
import { renderRulesBlock, renderStylesBlock, renderUtilitiesBlock, renderVarsBlock } from './render-blocks.ts'

export function renderSheet(
  config: SheetConfig,
  base: string,
  resolve: Resolver,
  values: Map<string, string>,
): string {
  const blocks: string[] = [
    renderVarsBlock(config.vars, config.name, resolve),
    renderSemanticsBlock(config.semantics, config.name, config.scope, resolve, values),
    renderUtilitiesBlock(config.utilities, config.name, config.scope),
    renderRulesBlock(base, config.rules),
    renderStylesBlock(base, config.styles),
  ]

  return blocks.filter(Boolean).join('\n\n')
}
