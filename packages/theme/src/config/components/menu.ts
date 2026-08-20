import { defineComponent } from '@dotdev/design'

export const menu = defineComponent({
  ui: 'menu',

  semantics: {
    'text-default': 'text-muted',
    'text-heading': 'text-muted',
    'text-item': 'text-muted',
    'text-item-hover': 'text-foreground',
    'bg-item-hover': 'bg-neutral-soft',
    gap: '0.125rem',
    'py-heading': '0.25rem',

    'px-heading-sm': 'space-sm',
    'px-heading-md': 'space-md',
    'px-heading-lg': 'space-lg',
    'px-item-sm': 'space-sm',
    'px-item-md': 'space-md',
    'px-item-lg': 'space-lg',
    'gap-item-sm': 'gap-sm',
    'gap-item-md': 'gap-md',
    'gap-item-lg': 'gap-lg',
    'h-item-sm': 'size-sm',
    'h-item-md': 'size-md',
    'h-item-lg': 'size-lg',
    'rounded-item-sm': 'radius-sm',
    'rounded-item-md': 'radius-md',
    'rounded-item-lg': 'radius-lg',

    'text-sm': 'type-sm',
    'text-md': 'type-sm',
    'text-lg': 'type-md',
  },

  utilities: {
    'size-heading-sm': 'menu-px-heading-sm',
    'size-heading-md': 'menu-px-heading-md',
    'size-heading-lg': 'menu-px-heading-lg',
    'size-item-sm': 'menu-px-item-sm menu-gap-item-sm menu-h-item-sm menu-rounded-item-sm',
    'size-item-md': 'menu-px-item-md menu-gap-item-md menu-h-item-md menu-rounded-item-md',
    'size-item-lg': 'menu-px-item-lg menu-gap-item-lg menu-h-item-lg menu-rounded-item-lg',
  },

  rules: {
    '&': `flex flex-col menu-gap menu-text-default`,
    '&--sm': 'menu-text-sm',
    '&--md': 'menu-text-md',
    '&--lg': 'menu-text-lg',

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
