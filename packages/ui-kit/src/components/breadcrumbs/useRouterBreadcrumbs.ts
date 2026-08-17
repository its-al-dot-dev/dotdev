import { computed } from 'vue'
import { type RouteLocationMatched, useRoute } from 'vue-router'
import type { UIBreadcrumbItem } from './breadcrumbs.types.ts'

export interface UseRouterBreadcrumbsOptions {
  label?: (record: RouteLocationMatched) => string | symbol | undefined
  icon?: (record: RouteLocationMatched) => UIBreadcrumbItem['icon'] | undefined
  href?: (record: RouteLocationMatched) => string | undefined
  to?: (record: RouteLocationMatched) => string | undefined
  skip?: (record: RouteLocationMatched) => boolean
}

export function useRouterBreadcrumbs(options: UseRouterBreadcrumbsOptions = {}) {
  const route = useRoute()

  const items = computed<UIBreadcrumbItem[]>(() => {
    const result: UIBreadcrumbItem[] = []

    for (const record of route.matched) {
      if (record.meta.breadcrumb === false) continue
      if (options.skip?.(record)) continue

      const label = options.label?.(record) ?? record.meta.label ?? record.meta.title ?? record.name
      if (label == null) continue

      result.push({
        label: String(label),
        href: options.href?.(record) ?? record.path,
        to: options.to?.(record) ?? record.path,
        icon: options.icon?.(record) ?? record.meta.icon,
      })
    }

    return result
  })

  return { items, route }
}
