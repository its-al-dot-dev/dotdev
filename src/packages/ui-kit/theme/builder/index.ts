// ============================================================================
// builder — публичный barrel.
//
// Замороженный контракт defineSheet (+ его типы) остаётся прежним.
// Пользовательский конфиг собирается через defineConfig; рендер — ThemeBuilder;
// запись на диск — writeThemeFiles.
// ============================================================================

export { defineSheet } from './define-sheet.ts'
export { defineConfig } from './define-config.ts'
export { ThemeBuilder, createThemeBuilder } from './theme-builder.ts'
export { TokenRegistry } from './registry.ts'
export { createResolver } from './resolver.ts'
export { writeThemeFiles } from './persist/index.ts'
export type { GroupStyles } from './persist/index.ts'

export type {
  TokenRef,
  DarkToken,
  SemanticValue,
  SheetConfig,
  Sheet,
  Resolver,
  ThemeConfig,
  ThemeGroup,
} from './types.ts'
