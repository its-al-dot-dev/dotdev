import type { Component, InjectionKey } from 'vue'
import type { DefineThemeConfig, ThemeAPI } from '@dotdev/theme'
import type {
  UIAccordionProps,
  UIAvatarProps,
  UIBreadcrumbsProps,
  UIButtonProps,
  UICheckboxProps,
  UIDividerProps,
  UIGroupAddonProps,
  UIGroupProps,
  UIIconButtonProps,
  UIIconProps,
  UIInputProps,
  UiKitIcon,
  UiKitNamespace,
  UIListBoxProps,
  UIMenuItemProps,
  UIMenuProps,
  UIMessageProps,
  UIRadioProps,
  UIScrollAreaProps,
  UISelectButtonProps,
  UISelectProps,
  UISwitchProps,
  UITableProps,
  UITagProps,
  UITextareaProps,
} from '@dotdev/ui-kit'

export interface UiKitConfig {
  namespace?: UiKitNamespace
  theme?: Omit<DefineThemeConfig, 'namespace'>
  components?: {
    accordion?: Partial<UIAccordionProps>
    avatar?: Partial<UIAvatarProps>
    breadcrumbs?: Partial<UIBreadcrumbsProps>
    button?: Partial<UIButtonProps>
    'icon-button'?: Partial<UIIconButtonProps>
    'select-button'?: Partial<UISelectButtonProps>
    menu?: Partial<UIMenuProps>
    'menu-item'?: Partial<UIMenuItemProps>
    input?: Partial<UIInputProps>
    group?: Partial<UIGroupProps>
    'group-addon'?: Partial<UIGroupAddonProps>
    listbox?: Partial<UIListBoxProps>
    select?: Partial<UISelectProps>
    switch?: Partial<UISwitchProps>
    textarea?: Partial<UITextareaProps>
    tag?: Partial<UITagProps>
    message?: Partial<UIMessageProps>
    divider?: Partial<UIDividerProps>
    checkbox?: Partial<UICheckboxProps>
    radio?: Partial<UIRadioProps>
    icon?: Partial<UIIconProps>
    'scroll-area'?: Partial<UIScrollAreaProps>
    table?: Partial<UITableProps>
  }
  icons?: Partial<Record<UiKitIcon, Component>>
}

export interface UiKitConfigWithTheme {
  config: UiKitConfig
  theme: ThemeAPI
}

export const UI_KIT_CONFIG_KEY: InjectionKey<Map<string, UiKitConfigWithTheme>> = Symbol('dotdev-ui-config')
export const UI_KIT_NAMESPACE_KEY: InjectionKey<string> = Symbol('dotdev-ui-namespace')
