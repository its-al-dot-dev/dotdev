import type { Component, InjectionKey } from 'vue'
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
  UISelectButtonProps,
  UISelectProps,
  UISwitchProps,
  UITagProps,
  UITextareaProps,
} from 'dotdev/ui-kit'

export interface UiKitConfig {
  namespace?: UiKitNamespace
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
  }
  icons?: Partial<Record<UiKitIcon, Component>>
}

export const UI_KIT_CONFIG_KEY: InjectionKey<UiKitConfig> = Symbol('dotdev-ui-config')
