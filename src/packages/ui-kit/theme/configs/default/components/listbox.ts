import { defineSheet } from 'dotdev/theme'

export default defineSheet({
  name: 'listbox',

  semantics: {
    'text-default': 'text-foreground',
    'bg-soft': 'bg-neutral-soft',
    'bg-outlined': 'bg-background',
    'border-outlined': 'border-neutral',
    'border-invalid': 'border-danger',

    'bg-item-hover': 'bg-neutral-soft',
    'bg-item-selected': 'bg-neutral-soft',
    'bg-item-soft-hover': 'bg-neutral-soft-hover',
    'bg-item-soft-selected': 'bg-neutral-soft-hover',
    'ring-item-highlighted': 'ring-brand',
    'text-item-selected': 'text-brand',

    'px-sm': 'space-sm',
    'px-md': 'space-md',
    'px-lg': 'space-lg',
    'h-sm': 'size-sm',
    'h-md': 'size-md',
    'h-lg': 'size-lg',
    'gap-sm': 'gap-sm',
    'gap-md': 'gap-md',
    'gap-lg': 'gap-lg',
    'text-sm': 'label-sm',
    'text-md': 'label-md',
    'text-lg': 'label-md',
  },

  vars: {
    gap: '0.125rem',
    p: '0.25rem',
    rounded: 'radius-md',
    'rounded-item': 'calc(var(--ui-radius-md) - 4px)',
  },

  utilities: {
    gap: 'gap-(--listbox-gap)',
    p: 'p-(--listbox-p)',
    rounded: 'rounded-(--listbox-rounded)',
    'rounded-item': 'rounded-(--listbox-rounded-item)',

    size: 'listbox-p listbox-rounded',
    'size-sm': 'listbox-text-sm',
    'size-md': 'listbox-text-md',
    'size-lg': 'listbox-text-lg',
    'size-item-sm': 'listbox-px-sm listbox-gap-sm listbox-h-sm',
    'size-item-md': 'listbox-px-md listbox-gap-md listbox-h-md',
    'size-item-lg': 'listbox-px-lg listbox-gap-lg listbox-h-lg',

    transition: 'transition-[background-color,border-color,opacity]',
    'transition-item': 'transition-[background-color,color,box-shadow,opacity]',
    'transition-checkmark': 'transition-[opacity]',
  },

  rules: {
    '&': `listbox-text-default grid listbox-gap select-none outline-none listbox-transition`,

    '&--grid': `grid-cols-[repeat(var(--ui-listbox-columns),minmax(0,1fr))]`,

    '&--soft': 'listbox-bg-soft',
    '&--outlined': `listbox-bg-outlined listbox-border-outlined border`,
    '&--outlined, &--soft': 'listbox-size',

    '&--invalid': 'listbox-border-invalid',
    '&--disabled': 'disabled',

    '&--sm': 'listbox-size-sm',
    '&--md': 'listbox-size-md',
    '&--lg': 'listbox-size-lg',

    '&__item': `listbox-rounded-item flex items-center hover:listbox-bg-item-hover cursor-pointer listbox-transition-item`,
    '&__item[data-highlighted]': 'listbox-ring-item-highlighted ring-1 ring-inset',
    '&__item--disabled': 'disabled',

    '&--soft &__item': 'hover:listbox-bg-item-soft-hover',
    '&--soft &__item--selected': 'listbox-bg-item-soft-selected listbox-text-item-selected',

    '&__item--selected': 'listbox-bg-item-selected listbox-text-item-selected',

    '&--sm &__item': 'listbox-size-item-sm',
    '&--md &__item': 'listbox-size-item-md',
    '&--lg &__item': 'listbox-size-item-lg',

    '&.&--square &__item': 'px-0 aspect-square justify-center',

    '&__checkmark': `opacity-0 text-[1.2em] listbox-transition-checkmark`,
    '&__checkmark--right': 'ml-auto',
    '&__item--selected &__checkmark': 'opacity-100',
  },
})
