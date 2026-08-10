import { calcVar, defineStyleSheet, sizes, tr } from 'dotdev/theme'

export default defineStyleSheet({
  component: {
    '&': `ui-text-primary grid gap-0.5 select-none outline-none ${tr('bg', 'border', 'opacity')}`,

    '&--grid': `grid-cols-[repeat(var(--ui-listbox-columns),minmax(0,1fr))]`,

    '&--subtle': 'ui-bg-subtle',
    '&--outlined': `ui-bg-primary ui-border-primary border`,
    '&--outlined, &--subtle': `p-1 rounded-${calcVar('radius-md', '+4px')}`,

    '&--invalid': 'ui-border-danger',
    '&--disabled': 'ui-disabled',

    '&--sm': sizes('sm', 'text'),
    '&--md': sizes('md', 'text'),
    '&--lg': sizes('lg', 'text'),

    '&__item': `ui-rounded-md flex items-center hover:ui-bg-subtle-hover cursor-pointer ${tr('bg', 'ring', 'opacity')}`,
    '&__item[data-highlighted]': 'ui-ring-brand ring-1 ring-inset',
    '&__item--disabled': 'ui-disabled',

    '&__item--selected': 'ui-bg-subtle-active',
    '&__item--selected:hover': 'ui-bg-subtle-active',

    '&--sm &__item': sizes('sm', 'px', 'gap', 'h'),
    '&--md &__item': sizes('md', 'px', 'gap', 'h'),
    '&--lg &__item': sizes('lg', 'px', 'gap', 'h'),

    '&.&--square &__item': 'px-0 aspect-square justify-center',

    '&__checkmark': `ui-text-brand opacity-0 text-[1.2em] ${tr('opacity')}`,
    '&__checkmark--right': 'ml-auto',
    '&__item--selected &__checkmark': 'opacity-100',
  },
})
