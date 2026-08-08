import type { RouteRecordNormalized } from 'vue-router'
import type { UIMenuItem } from 'dotdev/ui-kit'

interface Node {
  segment: string
  path: string
  route?: RouteRecordNormalized
  children: Map<string, Node>
}

export function routesToMenu(routes: RouteRecordNormalized[]): UIMenuItem[] {
  const root: Node = {
    segment: '',
    path: '',
    children: new Map(),
  }

  for (const route of routes) {
    if (route.path === '/') continue

    const segments = route.path.split('/').filter(Boolean)

    let node = root
    let currentPath = ''

    for (const segment of segments) {
      currentPath += `/${segment}`

      if (!node.children.has(segment)) {
        node.children.set(segment, {
          segment,
          path: currentPath,
          children: new Map(),
        })
      }

      node = node.children.get(segment)!
    }

    node.route = route
  }

  const result: UIMenuItem[] = []

  function walk(node: Node, level: number) {
    if (node.route) {
      result.push({
        label: String(node.route.name ?? node.segment),
        to: node.path,
        class: `level-${level}`,
        kind: node.route.meta.kind,
        icon: node.route.meta.icon,
      })
    }

    const children = [...node.children.values()].sort((a, b) => a.segment.localeCompare(b.segment))

    for (const child of children) {
      walk(child, level + 1)
    }
  }

  for (const child of [...root.children.values()].sort((a, b) => a.segment.localeCompare(b.segment))) {
    walk(child, 0)
  }

  return result
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $studioMenu: UIMenuItem[]
  }
}
