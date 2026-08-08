import { type Component, defineAsyncComponent } from 'vue'

export function createExample(loader: () => Promise<any>, rawLoader: () => Promise<any>) {
  return {
    component: defineAsyncComponent(loader) as Component,
    code: async (): Promise<string> => {
      const mod = await rawLoader()
      return typeof mod === 'string' ? mod : mod.default
    },
  }
}
