import type { Component } from 'vue'
import type { UiKitIcon } from '@dotdev/ui-kit'

export type DocExampleFile = string | Component
export type DocExampleSources = Record<string, string>

export interface DocExampleCode {
  file: string
  ext: string
  code: string
}

export interface DocExampleMeta {
  title: string
  description: string
  preview?: Component | null
  includes?: DocExampleFile[] // files to include in the example, preview is always included, includes files are relative to the example, e.g. 'base' without extension
}

export interface DocExampleResult extends DocExampleMeta {
  id: string
  codes: DocExampleCode[]
}

export interface DocPageMeta {
  title: string
  description: string
  styleScope?: string // component root selector, need for autogenerate style docs, 'button' -> '.$ns-button'
  icon?: UiKitIcon
  sources: DocExampleSources
  examples: DocExampleMeta[]
}

declare module 'vue-router' {
  interface RouteMeta {
    doc?: DocPageMeta
  }
}
