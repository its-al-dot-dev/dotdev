import { calcVar, defineStyleSheet, sizes, tr } from 'dotdev/theme'

export default defineStyleSheet({
  component: {
    '&': `inline-flex self-start p-0.5 gap-0.5 ui-text-primary ui-rounded-md ${tr('bg', 'color')}`,
    '&--sm': sizes('sm', 'h', 'text'),
    '&--md': sizes('md', 'h', 'text'),
    '&--lg': sizes('lg', 'h', 'text'),
    '&--outlined': `border ui-border-primary ui-bg-primary`,
    '&--subtle': `ui-bg-subtle`,
    '&--disabled': `ui-disabled`,

    '&__item': `inline-flex items-center justify-center rounded-${calcVar('radius-md', '-2px')} bg-transparent select-none outline-none cursor-pointer ${tr('bg', 'opacity')}`,
    '&__item:focus-visible': `ring-1 ring-inset ui-ring-brand`,
    '&__item:disabled': `ui-disabled`,
    '&__item:hover': 'ui-bg-subtle-hover',
    '& &__item--selected': 'ui-bg-subtle-active',

    '&--sm &__item': `${sizes('sm', 'px', 'gap')}`,
    '&--md &__item': `${sizes('md', 'px', 'gap')}`,
    '&--lg &__item': `${sizes('lg', 'px', 'gap')}`,

    '&.&--square &__item': `aspect-square px-0`,
  },
})
