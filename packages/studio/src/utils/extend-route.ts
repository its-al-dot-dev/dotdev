import { readFileSync } from 'node:fs'

export interface ExtendRouteNode {
  readonly component?: string
  readonly name: string | false
}

/**
 * Extracts the page title from the `defineDocPage()` call in the page source
 * and uses it as the route name, so menus and navigation get human-readable
 * names without duplicating `definePage({ name })`.
 */
export function extendRoute(route: ExtendRouteNode): void {
  const file = route.component
  if (!file?.endsWith('.vue')) return

  const source = readFileSync(file, 'utf8')
  const callIndex = source.indexOf('defineDocPage(')
  if (callIndex === -1) return

  const title = source.slice(callIndex).match(/\btitle:\s*['"`]([^'"`\n]+)/)?.[1]
  if (!title) return

  ;(route as { name?: string }).name = title
}
