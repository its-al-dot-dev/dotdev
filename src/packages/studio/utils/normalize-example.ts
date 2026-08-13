import type { Component } from 'vue'
import { stripDefineExample } from './strip-define-example.ts'

interface NormalizeExample {
  id: string
  component: Component
  code: string
}

function getExampleId(path: string): string {
  const filename = path.split('/').pop() ?? path
  return filename.replace(/\.vue$/, '').replace(/^\d+\./, '')
}

export function normalizeExamples(components?: Record<string, Component>, sources?: Record<string, string>) {
  const examples: NormalizeExample[] = []
  if (!components) return examples

  const paths = Object.keys(components).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  for (const path of paths) {
    examples.push({
      id: getExampleId(path),
      component: components[path],
      code: stripDefineExample(sources?.[path] ?? ''),
    })
  }

  return examples
}
