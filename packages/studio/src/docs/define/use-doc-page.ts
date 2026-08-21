import { useRoute } from 'vue-router'
import { normalizeExamples } from './normalize-examples.ts'

export function useDocPage() {
  const route = useRoute()
  const doc = route.meta.doc

  if (!doc) {
    return
  }

  return {
    ...doc,
    group: route.path.split('/').find(Boolean),
    examples: normalizeExamples(doc.examples, doc.sources),
  }
}
