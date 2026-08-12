// ============================================================================
// builder — публичный barrel.
//
// Замороженный контракт defineSheet (+ его типы) остаётся прежним.
// Всё остальное — чистая оркестрация (ThemeBuilder) и персистенция
// (writeThemeFiles) — новый API вместо старых uiKitTheme/buildTheme/saveTheme.
// ============================================================================

export { defineSheet } from './define-sheet.ts'
export { ThemeBuilder, createThemeBuilder } from './theme-builder.ts'
export { TokenRegistry } from './registry.ts'
export { createResolver } from './resolver.ts'
export { writeThemeFiles } from './persist/index.ts'
export type { ComponentStyles } from './persist/index.ts'

export type {
  TokenRef,
  DarkToken,
  SemanticValue,
  SheetConfig,
  Sheet,
  Resolver,
  ThemeBuilderConfig,
} from './types.ts'
