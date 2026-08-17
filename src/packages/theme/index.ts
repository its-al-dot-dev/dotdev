export { Component, Theme } from "./theme";
export type {
  Category,
  ComponentConfig,
  PrimitiveEntry,
  RegistryEntry,
  ResolvedValue,
  RuleEntry,
  Scope,
  SemanticEntry,
  ThemeConfig,
  ThemeTokens,
  UtilityEntry,
} from "./types";

export {
  defineTheme,
  injectCSS,
  mergeTokens,
  renderRuntimeVars,
  themeInjectionKey,
  toComponentTemplate,
  useComponentTheme,
  useThemeProvider,
  validateTokens,
} from "./runtime";

export type {
  RuntimeTheme,
  ThemeContext,
  ThemeDefinition,
  ThemeProvider,
} from "./runtime";
