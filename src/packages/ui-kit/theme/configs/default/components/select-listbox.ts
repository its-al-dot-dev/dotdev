import { defineSheet } from 'dotdev/theme'

export default defineSheet({
  name: 'select-listbox',

  semantics: {
    'text-default': 'text-foreground',
    'bg-item-hover': ['neutral-100', 'neutral-800'],
  },

  vars: {
    'gap': '0.125rem',
    'rounded-item-sm': 'calc(var(--ui-radius-sm) - 2px)',
    'rounded-item-md': 'calc(var(--ui-radius-md) - 2px)',
    'rounded-item-lg': 'calc(var(--ui-radius-lg) - 2px)',
  },

  utilities: {
    'gap': 'gap-(--select-listbox-gap)',
    'rounded-item-sm': 'rounded-(--select-listbox-rounded-item-sm)',
    'rounded-item-md': 'rounded-(--select-listbox-rounded-item-md)',
    'rounded-item-lg': 'rounded-(--select-listbox-rounded-item-lg)',

    'px-item-sm': 'px-(--ui-space-sm)',
    'px-item-md': 'px-(--ui-space-md)',
    'px-item-lg': 'px-(--ui-space-lg)',
    'gap-item-sm': 'gap-(--ui-gap-sm)',
    'gap-item-md': 'gap-(--ui-gap-md)',
    'gap-item-lg': 'gap-(--ui-gap-lg)',
    'h-item-sm': 'h-(--ui-size-sm)',
    'h-item-md': 'h-(--ui-size-md)',
    'h-item-lg': 'h-(--ui-size-lg)',

    'size-item-sm': 'text-(length:--ui-label-sm) select-listbox-px-item-sm select-listbox-gap-item-sm select-listbox-h-item-sm select-listbox-rounded-item-sm',
    'size-item-md': 'text-(length:--ui-label-sm) select-listbox-px-item-md select-listbox-gap-item-md select-listbox-h-item-md select-listbox-rounded-item-md',
    'size-item-lg': 'text-(length:--ui-label-md) select-listbox-px-item-lg select-listbox-gap-item-lg select-listbox-h-item-lg select-listbox-rounded-item-lg',
  },

  rules: {
    '&': `flex flex-col select-listbox-gap transition-opacity overflow-y-auto max-h-[200px] select-listbox-text-default`,
    '&--disabled': 'disabled',

    '&__item': `flex shrink-0 items-center outline-none select-none cursor-pointer transition-[background-color,color,opacity]`,
    '&__item:is(:hover,&__item--selected,&__item--focused)': `select-listbox-bg-item-hover`,
    '&--sm &__item': 'select-listbox-size-item-sm',
    '&--md &__item': 'select-listbox-size-item-md',
    '&--lg &__item': 'select-listbox-size-item-lg',
  },
})
