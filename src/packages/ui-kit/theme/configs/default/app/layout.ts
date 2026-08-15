import { defineSheet } from 'dotdev/theme'

export default defineSheet({
  name: 'layout',
  semantics: {
    'h-header': '56px',
    'w-sidebar': '240px',
    'text-heading': ['neutral-400', 'neutral-500'],
  },
  utilities: {
    root: 'bg-background text-foreground transition-[background-color]',
    panel: 'bg-surface border-default backdrop-blur-md transition-[background-color,border]',
  },
  rules: {
    '&': `flex min-h-svh layout-root`,
    '&__body': `flex-1 min-w-0`,

    '&__header': `sticky top-0 z-100 flex items-center justify-between px-4 border-b`,
    '&__header-group': `flex items-center gap-2`,

    '&__header, &__sidebar': `layout-panel`,
    '&__header, &__sidebar-header': `layout-h-header`,

    '&__sidebar': `z-50 flex layout-w-sidebar flex-col overflow-hidden border-r sticky top-0 h-svh`,

    '&__sidebar-header': `flex items-center shrink-0 px-4`,
    '&__sidebar-body': `flex-1 overflow-y-auto px-2 py-4`,
    '&__sidebar-footer': `flex items-center justify-between shrink-0 px-4 py-3`,
    '.app-version': 'font-mono text-xs text-muted',

    '.app-logo': 'flex items-center gap-2',
    '.app-logo__icon': 'block size-7 text-brand',
    '.app-logo__title': 'font-bold text-xl tracking-tight',
    '.app-logo__title span': 'text-brand',

    '.app-crumb': 'flex items-center gap-2 min-w-0',
    '.app-crumb__path': 'flex items-center gap-1.5 text-sm min-w-0',
    '.app-crumb__segment': 'text-muted whitespace-nowrap truncate',
    '.app-crumb__segment--current': 'text-foreground',
    '.app-crumb__sep': 'size-3.5 shrink-0 text-neutral opacity-50',
    '.app-kbd': 'font-sans text-sm text-muted',

    '.app-menu': 'flex flex-col gap-0.5',
    '.app-menu__item-icon': 'text-sm text-muted',
    '.app-menu__item-label': 'flex-1 min-w-0 truncate',

    '.app-menu .d-accordion__item + .d-accordion__item': 'mt-3',

    '.app-menu .d-accordion__trigger': `h-7 px-2 py-0 text-xs font-semibold uppercase tracking-wider text-muted hover:text-foreground`,
    '.app-menu .d-accordion__trigger--open': 'text-foreground',

    '.app-menu .d-accordion__indicator': 'text-xs',

    '.app-menu .d-menu': 'mt-1 mb-2 ml-2 pl-1.5 border-l border-default',

    '.app-menu .d-menu__item': 'relative pl-4',
    '.app-menu .d-menu__heading': `text-[0.6875rem] font-medium uppercase tracking-wider layout-text-heading pl-1.5 py-0 mt-2.5 mb-1.5`,
  },
})
