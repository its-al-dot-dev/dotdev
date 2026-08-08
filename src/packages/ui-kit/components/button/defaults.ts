import type { UIButtonProps } from './button.types.ts'

export const getDefaults = (): UIButtonProps => {
  return {
    size: 'md',
    color: 'primary',
    variant: 'solid',
    iconPos: 'prefix',
    type: 'button',
  }
}
