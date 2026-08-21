import { useRoute } from 'vue-router'
import type { DocPageMeta } from './types.ts'

export function defineDocPage(options: DocPageMeta) {
  const route = useRoute()
  route.meta.doc = { ...options, icon: options.icon ?? 'component-1' }
}
