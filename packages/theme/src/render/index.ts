import type { Registry } from '../registry'
import { renderRules } from './rules'
import { renderTypes } from './types'
import { renderUtilities } from './utilities'
import { renderVars } from './vars'

export { renderTypes }

export interface ComponentFiles {
  variables: string
  utilities: string
  rules: string
}

export interface ThemeFiles {
  variables: string
  utilities: string
  components: Record<string, ComponentFiles>
}

export function renderAll(registry: Registry): string {
  const files = renderFiles(registry)
  const components = Object.values(files.components).map(
    (c) => [c.variables, c.rules].filter(Boolean).join('\n\n'),
  )
  return [files.variables, files.utilities, ...components].filter(Boolean).join('\n\n')
}

export function renderFiles(registry: Registry): ThemeFiles {
  const components: Record<string, ComponentFiles> = {}
  for (const ui of registry.componentUis()) {
    components[ui] = {
      variables: renderVars(registry, ui),
      utilities: renderUtilities(registry, ui),
      rules: renderRules(registry, ui),
    }
  }
  return {
    variables: renderVars(registry),
    utilities: renderUtilities(registry),
    components,
  }
}
