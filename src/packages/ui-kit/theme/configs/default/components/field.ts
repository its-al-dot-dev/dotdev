import type { StyleSheetComponent } from 'dotdev/theme'
import { tr } from 'dotdev/theme'

export function fieldStyles(): StyleSheetComponent {
  return {
    '&': `ui-text-primary outline-none ${tr('bg', 'opacity', 'border', 'color')}`,

    '&:focus-visible': `ui-border-brand`,
    '&::placeholder': `ui-text-placeholder`,

    '&--outlined, &--underlined': `ui-border-primary ui-bg-primary`,
    '&--outlined, &--subtle': `ui-rounded-md`,
    '&--outlined': `border`,
    '&--underlined': `border-b`,
    '&--subtle': `ui-bg-subtle border border-transparent`,

    '&:disabled': `ui-disabled`,
    '&--invalid': `ui-border-danger`,
    '&--invalid:focus-visible': `ui-border-danger`,
  }
}
