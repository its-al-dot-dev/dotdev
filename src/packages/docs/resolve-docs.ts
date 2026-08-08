import type { Component } from 'vue'

export function resolveDocs(path: string) {
  const codes = import.meta.glob<string>('./**/docs/**/*.vue', {
    eager: true,
    query: '?raw',
    import: 'default',
  })

  const components = import.meta.glob<Component>('./**/docs/**/*.vue', {
    eager: true,
    import: 'default',
  })

  const filterByPath = <T>(items: Record<string, T>) => {
    return Object.fromEntries(Object.entries(items).filter(([key]) => key.includes(path)))
  }

  return {
    codes: filterByPath(codes),
    components: filterByPath(components),
  }
}
