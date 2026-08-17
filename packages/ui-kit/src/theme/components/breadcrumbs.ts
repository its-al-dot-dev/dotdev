import { Component } from '@dotdev/theme'

export const breadcrumbs = new Component({
  ui: 'breadcrumbs',

  semantics: {
    gap: '0.5em',
    'text-icon': '0.875em',
    'text-muted': 'text-muted',
    'text-current': 'text-foreground',
  },

  rules: {
    '&': `inline-flex min-w-0`,

    '&__list': `flex items-center breadcrumbs-gap min-w-0`,
    '&__item': `flex items-center breadcrumbs-gap min-w-0`,
    '&__link': `inline-flex items-center breadcrumbs-gap breadcrumbs-text-muted whitespace-nowrap outline-none cursor-pointer transition-colors hover:text-foreground`,
    '&__link:focus-visible': `ring-1 rounded-sm`,
    '&__link--current': `breadcrumbs-text-current cursor-default`,
    '&__separator': `breadcrumbs-text-icon breadcrumbs-text-muted shrink-0 opacity-80`,
    '&__icon': `breadcrumbs-text-icon shrink-0`,
    '&__label': `truncate`,
  },
})
