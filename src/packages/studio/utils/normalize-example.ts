import type { Component } from 'vue'
import type { ExampleMeta } from '../docs/define-example.ts'
import { stripDefineExample } from './strip-define-example.ts'

interface NormalizeExample {
  id: string
  title?: string
  desc?: string
  lang?: string
  component?: Component
  code: string
}

const LANG_BY_EXTENSION: Record<string, string> = {
  vue: 'vue',
  ts: 'typescript',
  tsx: 'typescript',
  mts: 'typescript',
  js: 'javascript',
  jsx: 'javascript',
  mjs: 'javascript',
  css: 'css',
  scss: 'scss',
  json: 'json',
  html: 'html',
  md: 'markdown',
  sh: 'bash',
  bash: 'bash',
}

function getExampleLang(path: string): string {
  const extension = path.split('.').pop()?.toLowerCase() ?? ''
  return LANG_BY_EXTENSION[extension] ?? 'text'
}

function getExampleId(path: string): string {
  const filename = path.split('/').pop() ?? path
  return filename.replace(/\.[^.]+$/, '').replace(/^\d+\./, '')
}

function isVueFile(path: string): boolean {
  return path.endsWith('.vue')
}

function toExampleTitle(id: string): string {
  return id
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function normalizeExamples(
  components?: Record<string, Component>,
  sources?: Record<string, string>,
  meta?: Record<string, ExampleMeta>,
) {
  const examples: NormalizeExample[] = []
  if (!sources) return examples

  const paths = Object.keys(sources).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  for (const path of paths) {
    const id = getExampleId(path)
    const isVue = isVueFile(path)
    const exampleMeta = meta?.[id]

    examples.push({
      id,
      title: isVue ? undefined : exampleMeta?.title ?? toExampleTitle(id),
      desc: isVue ? undefined : exampleMeta?.desc,
      lang: getExampleLang(path),
      component: isVue ? components?.[path] : undefined,
      code: stripDefineExample(sources[path] ?? ''),
    })
  }

  return examples
}