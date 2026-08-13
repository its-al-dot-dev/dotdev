import { defineSheet } from 'dotdev/theme'

export default defineSheet({
  name: 'layout',
  semantics: {
    'h-header': '56px',
    'w-sidebar': '240px',
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

    // TODO replace .d to $ namespace
    '&__sidebar-body .d-menu__heading.level-0': `not-first:mt-4 uppercase text-sm`,

    '.app-logo': 'flex items-center gap-2',
    '.app-logo__icon': 'block size-7 text-brand',
    '.app-logo__title': 'font-bold text-xl tracking-tight',
    '.app-logo__title span': 'text-brand',
  },
})
