import type { UIButtonEmits, UIButtonProps, UiKitIcon } from '@dotdev/ui-kit'

export interface UIIconButtonProps extends Omit<UIButtonProps, 'icon' | 'iconPos' | 'label'> {
  icon: UiKitIcon
}

export interface UIIconButtonSlots {}

export interface UIIconButtonEmits extends UIButtonEmits {}
