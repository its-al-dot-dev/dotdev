import { defineSheet } from 'dotdev/theme'

export default defineSheet({
  name: 'menu',

  semantics: {
    'text-default': 'text-muted',
    'text-heading': 'text-muted',
    'text-item': 'text-muted',
    'text-item-hover': 'text-foreground',
    'bg-item-hover': 'bg-neutral-soft',
  },

  vars: {
    gap: '0.125rem',
    'py-heading': '0.25rem',
  },

  utilities: {
    gap: 'gap-(--menu-gap)',
    'py-heading': 'py-(--menu-py-heading)',

    'px-heading-sm': 'px-(--ui-space-sm)',
    'px-heading-md': 'px-(--ui-space-md)',
    'px-heading-lg': 'px-(--ui-space-lg)',

    'px-item-sm': 'px-(--ui-space-sm)',
    'px-item-md': 'px-(--ui-space-md)',
    'px-item-lg': 'px-(--ui-space-lg)',
    'gap-item-sm': 'gap-(--ui-gap-sm)',
    'gap-item-md': 'gap-(--ui-gap-md)',
    'gap-item-lg': 'gap-(--ui-gap-lg)',
    'h-item-sm': 'h-(--ui-size-sm)',
    'h-item-md': 'h-(--ui-size-md)',
    'h-item-lg': 'h-(--ui-size-lg)',
    'rounded-item-sm': 'rounded-(--ui-radius-sm)',
    'rounded-item-md': 'rounded-(--ui-radius-md)',
    'rounded-item-lg': 'rounded-(--ui-radius-lg)',

    'size-sm': 'text-(length:--ui-label-sm)',
    'size-md': 'text-(length:--ui-label-sm)',
    'size-lg': 'text-(length:--ui-label-md)',
    'size-heading-sm': 'menu-px-heading-sm',
    'size-heading-md': 'menu-px-heading-md',
    'size-heading-lg': 'menu-px-heading-lg',
    'size-item-sm': 'menu-px-item-sm menu-gap-item-sm menu-h-item-sm menu-rounded-item-sm',
    'size-item-md': 'menu-px-item-md menu-gap-item-md menu-h-item-md menu-rounded-item-md',
    'size-item-lg': 'menu-px-item-lg menu-gap-item-lg menu-h-item-lg menu-rounded-item-lg',
  },

  rules: {
    '&': `flex flex-col menu-gap menu-text-default`,
    '&--sm': 'menu-size-sm',
    '&--md': 'menu-size-md',
    '&--lg': 'menu-size-lg',

    '&__heading': `font-medium menu-py-heading transition-[color] menu-text-heading`,
    '&--sm &__heading': 'menu-size-heading-sm',
    '&--md &__heading': 'menu-size-heading-md',
    '&--lg &__heading': 'menu-size-heading-lg',

    '&__item': `flex w-full items-center outline-none cursor-pointer transition-[background-color,color,opacity] menu-text-item`,
    '&__item:disabled': 'disabled',
    '&__item:is(:hover, :focus-visible, &__item--active, &__item.router-link-exact-active)': `menu-text-item-hover menu-bg-item-hover`,
    '&--sm &__item': 'menu-size-item-sm',
    '&--md &__item': 'menu-size-item-md',
    '&--lg &__item': 'menu-size-item-lg',

    '&__item-icon': `text-[1.2em]`,
  },
})
