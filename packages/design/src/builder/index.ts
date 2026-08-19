import type { ThemeConfig } from './theme.ts'

export { Component } from './component.ts'
export { Theme, NAMESPACE } from './theme.ts'
export { Compiler, type CompilerOptions, type CompilerScope, type CompilerKind, type CompileResult } from './compiler.ts'

export function defineConfig(config: ThemeConfig) {
  return config
}
