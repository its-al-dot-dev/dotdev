import type { Component } from 'vue'
import { deepMerge } from '../utils/deep-merge.ts'

export interface DocBlockItem {
  title?: string
  desc?: string
  [key: string]: any
}

export interface DocType {
  title: string
  desc: string
  [group: string]: Record<string, DocBlockItem> | string | undefined
}

export interface CodeBlockItem {
  component?: Component
  code?: string
}

export interface CodeType {
  [group: string]: Record<string, CodeBlockItem> | undefined
}

export interface UIDocBlock {
  component?: Component
  code?: string
}

export interface DocConfig {
  blocks: Record<string, UIDocBlock[]>
}

export function buildDocConfig(doc: DocType, code: CodeType): DocConfig {
  const docBlocks: Record<string, Record<string, DocBlockItem>> = {}

  for (const group of Object.keys(doc)) {
    if (group === 'title' || group === 'desc') continue

    const blocks = doc[group]
    if (blocks && typeof blocks === 'object') {
      docBlocks[group] = blocks as Record<string, DocBlockItem>
    }
  }

  return {
    blocks: deepMerge({}, docBlocks, code),
  }
}

export function createDocConfig(docs: {
  codes: Record<string, string>
  components: Record<string, Component>
}): DocConfig {
  const { codes, components } = docs
  const blocks: Record<string, UIDocBlock[]> = {}

  const paths: string[] = []

  for (const path in codes) {
    paths.push(path)
  }

  paths.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  for (const path of paths) {
    const code = codes[path]

    const parts = path.split('/')
    const key = parts.length > 3 ? parts[2] : parts[1].replace('.vue', '')

    blocks[key] ??= []

    blocks[key].push({
      code,
      component: components[path],
    })
  }

  return { blocks }
}
