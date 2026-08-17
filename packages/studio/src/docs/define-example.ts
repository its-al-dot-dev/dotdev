import { inject } from 'vue'

export interface ExampleMeta {
  title?: string
  desc?: string
}

export const EXAMPLE_KEY = Symbol('EXAMPLE_KEY')

export function defineExample(meta: ExampleMeta) {
  const context = inject<ExampleMeta>(EXAMPLE_KEY, {})

  if (!context) {
    throw new Error('defineExample() must be used inside an example context')
  }

  Object.assign(context, meta)
}
