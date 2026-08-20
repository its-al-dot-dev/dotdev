import { defineComponent } from '@dotdev/design'

export const layout = defineComponent({
  ui: 'layout',
  layer: 'studio',
  semantics: {
    'h-header': '56px',
    'w-sidebar': '240px',
    'text-heading': ['--d-neutral-400', '--d-neutral-500'],
  },
  utilities: {
    root: 'bg-background text-foreground transition-[background-color]',
    panel: 'bg-surface border-default backdrop-blur-md transition-[background-color,border]',
  },
  rules: {
    '.layout': `flex min-h-svh layout-root`,
    '.layout__body': `flex-1 min-w-0`,

    '.layout__header': `sticky top-0 z-100 flex items-center justify-between px-4 border-b`,
    '.layout__header-group': `flex items-center gap-2`,

    '.layout__header, .layout__sidebar': `layout-panel`,
    '.layout__header, .layout__sidebar-header': `layout-h-header`,

    '.layout__sidebar': `z-50 flex layout-w-sidebar flex-col overflow-hidden border-r sticky top-0 h-svh`,

    '.layout__sidebar-header': `flex items-center shrink-0 px-4`,
    '.layout__sidebar-body': `flex-1 overflow-y-auto px-2 py-4`,
    '.layout__sidebar-footer': `flex items-center justify-between shrink-0 px-4 py-3`,
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
