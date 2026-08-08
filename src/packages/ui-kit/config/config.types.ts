import type { InjectionKey } from 'vue'
import type {
  UIAvatarProps,
  UIButtonProps,
  UICheckboxProps,
  UIGroupAddonProps,
  UIGroupProps,
  UIIconButtonProps,
  UIInputProps,
  UiKitNamespace,
  UIListBoxProps,
  UIMenuProps,
  UISelectButtonProps,
  UISelectProps,
  UISwitchProps,
  UITextareaProps,
  UITagProps,
} from 'dotdev/ui-kit'

export interface UiKitConfig {
  namespace?: UiKitNamespace
  components?: {
    avatar?: Partial<UIAvatarProps>
    button?: Partial<UIButtonProps>
    'icon-button'?: Partial<UIIconButtonProps>
    'select-button'?: Partial<UISelectButtonProps>
    menu?: Partial<UIMenuProps>
    input?: Partial<UIInputProps>
    group?: Partial<UIGroupProps>
    'group-addon'?: Partial<UIGroupAddonProps>
    listbox?: Partial<UIListBoxProps>
    select?: Partial<UISelectProps>
    switch?: Partial<UISwitchProps>
    textarea?: Partial<UITextareaProps>
    tag?: Partial<UITagProps>
    checkbox?: Partial<UICheckboxProps>
  }
}

export const UI_KIT_CONFIG_KEY: InjectionKey<UiKitConfig> = Symbol('dotdev-ui-config')
