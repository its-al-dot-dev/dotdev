import { Component } from 'dotdev/theme'

export const table = new Component({
  ui: 'table',

  semantics: {
    'px-cell': '0.75rem',
    'py-cell': '0.625rem',
    'px-head': '0.75rem',
    'py-head': '0.5rem',
    'top-sticky': '0px',
  },

  rules: {
    '&': `w-full text-sm border-separate border-spacing-0`,

    '&__caption': `caption-top px-4 pt-2 pb-4 text-left text-xs text-muted`,

    '&__head': `table-px-head table-py-head text-left align-middle font-medium uppercase tracking-wider text-xs text-muted whitespace-nowrap border-b border-default`,
    '&__cell': `table-px-cell table-py-cell text-left align-middle border-b border-default`,

    '&__row': `transition-[background-color]`,
    '&--hover &__row:hover': `bg-neutral-soft`,
    '&__row--selected': `bg-brand-soft`,

    '&--sticky-header &__head': `sticky table-top-sticky z-1 bg-background`,
  },
})
