import type { RouteRecordNormalized } from 'vue-router'
import type { UIMenuItem } from '@dotdev/ui-kit'

interface Node {
  segment: string
  path: string
  route?: RouteRecordNormalized
  children: Map<string, Node>
}

interface StudioMenuItem extends UIMenuItem {
  children: UIMenuItem[]
}

export function routesToMenu(routes: RouteRecordNormalized[]): StudioMenuItem[] {
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

  function flatten(node: Node, level: number, items: UIMenuItem[]) {
    const children = [...node.children.values()].sort((a, b) => a.segment.localeCompare(b.segment))

    for (const child of children) {
      if (child.route) {
        items.push({
          label: String(child.route.name ?? child.segment),
          to: child.path,
          kind: child.route.meta.kind,
        })
      }

      flatten(child, level + 1, items)
    }
  }

  const result: (UIMenuItem & { children: UIMenuItem[] })[] = []

  for (const child of [...root.children.values()].sort((a, b) => a.segment.localeCompare(b.segment))) {
    const children: UIMenuItem[] = []

    flatten(child, 1, children)

    result.push({
      label: String(child.route?.name ?? child.segment),
      to: child.route ? child.path : undefined,
      kind: child.route?.meta.kind,
      icon: child.route?.meta.icon,
      children,
    })
  }

  return result
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $studioMenu: StudioMenuItem[]
  }
}
