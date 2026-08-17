import { Component } from 'dotdev/theme'

export const select = new Component({
  ui: 'select',

  semantics: {
    'text-default': 'text-foreground',
    'text-placeholder': ['neutral-400', 'neutral-500'],

    'bg-soft': ['neutral-100', 'neutral-800'],
    'bg-outlined': 'bg-background',
    'border-outlined': ['neutral-300', 'neutral-700'],
    'border-underlined': ['neutral-200', 'neutral-700'],
    'border-hover': ['neutral-400', 'neutral-600'],
    'border-invalid': 'danger-500/50',

    'bg-popup': 'color-white',
    'border-popup': ['neutral-100', 'neutral-800'],
  },

  utilities: {
    'pl-sm': 'pl-(--ui-space-sm)',
    'pl-md': 'pl-(--ui-space-md)',
    'pl-lg': 'pl-(--ui-space-lg)',
    'h-sm': 'h-(--ui-size-sm)',
    'h-md': 'h-(--ui-size-md)',
    'h-lg': 'h-(--ui-size-lg)',
    'rounded-sm': 'rounded-(--ui-radius-sm)',
    'rounded-md': 'rounded-(--ui-radius-md)',
    'rounded-lg': 'rounded-(--ui-radius-lg)',
    'rounded-popup-sm': 'rounded-(--ui-radius-sm)',
    'rounded-popup-md': 'rounded-(--ui-radius-md)',
    'rounded-popup-lg': 'rounded-(--ui-radius-lg)',

    'size-sm': 'text-(length:--ui-label-sm) select-pl-sm select-h-sm select-rounded-sm',
    'size-md': 'text-(length:--ui-label-sm) select-pl-md select-h-md select-rounded-md',
    'size-lg': 'text-(length:--ui-label-md) select-pl-lg select-h-lg select-rounded-lg',
    'size-popup-sm': 'select-rounded-popup-sm',
    'size-popup-md': 'select-rounded-popup-md',
    'size-popup-lg': 'select-rounded-popup-lg',

    transition: 'transition-[background-color,border-color,opacity,color]',
  },

  rules: {
    '&': `inline-flex justify-start cursor-pointer select-transition min-w-50 select-text-default`,
    '&--sm': 'select-size-sm',
    '&--md': 'select-size-md',
    '&--lg': 'select-size-lg',
    '&--soft': `select-bg-soft border border-transparent`,
    '&--outlined': `select-bg-outlined border select-border-outlined`,
    '&--underlined': `bg-transparent border-b rounded-none select-border-underlined`,
    '&:is(:hover,&--focused)': `select-border-hover`,
    '&--invalid': `select-border-invalid!`,
    '&--invalid.&--soft': `border`,
    '&--disabled': 'disabled',
    '&__label': `select-none outline-none flex flex-1 items-center truncate`,
    '&__label--placeholder': `select-text-placeholder`,
    '&__dropdown': `flex items-center justify-center aspect-square`,
    '&__listbox-wrapper': `select-bg-popup p-0.5 shadow-md border select-border-popup`,
    '&__listbox-wrapper--sm': 'select-size-popup-sm',
    '&__listbox-wrapper--md': 'select-size-popup-md',
    '&__listbox-wrapper--lg': 'select-size-popup-lg',
  },
})
