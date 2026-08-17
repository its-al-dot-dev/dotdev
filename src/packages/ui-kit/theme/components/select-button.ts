import { Component } from 'dotdev/theme'

export const selectButton = new Component({
  ui: 'select-button',

  semantics: {
    'border-outlined': 'border-neutral',
    'bg-item-outlined': 'bg-neutral-soft-hover',

    'bg-soft': 'bg-neutral-soft',
    'bg-outlined': 'bg-background',
    'bg-item-soft': ['color-white', 'neutral-800'],

    'text-default': 'text-muted',
    'text-selected': 'text-foreground',

    'px-sm': 'space-sm',
    'px-md': 'space-md',
    'px-lg': 'space-lg',
    'h-sm': 'size-sm',
    'h-md': 'size-md',
    'h-lg': 'size-lg',
    'gap-sm': 'gap-sm',
    'gap-md': 'gap-md',
    'gap-lg': 'gap-lg',
  },

  utilities: {
    'size-sm': `type-sm select-button-h-sm`,
    'size-md': `type-sm select-button-h-md`,
    'size-lg': `type-md select-button-h-lg`,
    'size-item-sm': `select-button-px-sm select-button-gap-sm`,
    'size-item-md': `select-button-px-md select-button-gap-md`,
    'size-item-lg': `select-button-px-lg select-button-gap-lg`,

    transition: 'transition-[background-color,color,border-color]',
    'transition-item': 'transition-[background-color,color,box-shadow,opacity]',
  },

  rules: {
    '&': `inline-flex self-start radius-md font-medium p-0.5 gap-0.5 select-button-transition`,
    '&--sm': `select-button-size-sm`,
    '&--md': `select-button-size-md`,
    '&--lg': `select-button-size-lg`,
    '&--outlined': `select-button-bg-outlined border select-button-border-outlined`,
    '&--soft': `select-button-bg-soft`,
    '&--disabled': `disabled`,

    '&__item': `inline-flex select-button-text-default items-center justify-center radius-sm bg-transparent select-none outline-none cursor-pointer select-button-transition-item`,
    '&__item:focus-visible': `ring-1 ring-inset ring-neutral`,
    '&__item:disabled': `disabled`,
    '&__item:hover': `select-button-text-selected`,
    '&__item--selected': `opacity-100 select-button-text-selected`,
    '&--soft &__item--selected': `shadow-xs select-button-bg-item-soft`,
    '&--outlined &__item--selected': `select-button-bg-item-outlined`,

    '&--sm &__item': `select-button-size-item-sm`,
    '&--md &__item': `select-button-size-item-md`,
    '&--lg &__item': `select-button-size-item-lg`,

    '&.&--square &__item': `aspect-square px-0`,
  },
})
