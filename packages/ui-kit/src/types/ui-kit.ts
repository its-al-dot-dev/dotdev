export interface UiKitRegister {}

// type OpenKeys<T> = keyof T | (string & {})
export type UiKitOverride<T, K extends string> = K extends keyof UiKitRegister ? UiKitRegister[K] : T

export interface UiKitBaseProps {
  namespace?: UiKitNamespace
  ui?: string
}

interface UiKitIcons {}
type UiKitIconDefault = keyof UiKitIcons
export type UiKitIcon = keyof UiKitOverride<UiKitIconDefault, 'icons'>

interface UiKitNamespaces {
  d: true
}
type UiKitNamespaceDefault = keyof UiKitNamespaces | (string & {})
export type UiKitNamespace = UiKitOverride<UiKitNamespaceDefault, 'namespace'>

interface UiKitSizes {
  sm: true
  md: true
  lg: true
}
type UiKitSizeDefault = keyof UiKitSizes | (string & {})
export type UiKitSize = UiKitOverride<UiKitSizeDefault, 'size'>

interface UiKitColors {
  primary: true
  neutral: true
  warning: true
  success: true
  danger: true
  info: true
}
type UiKitColorDefault = keyof UiKitColors | (string & {})
export type UiKitColor = UiKitOverride<UiKitColorDefault, 'color'>

interface UiKitFieldVariants {
  outlined: true
  soft: true
  underlined: true
  plain: true
}
type UiKitFieldVariantDefault = keyof UiKitFieldVariants | (string & {})
export type UiKitFieldVariant = UiKitOverride<UiKitFieldVariantDefault, 'fieldVariant'>
