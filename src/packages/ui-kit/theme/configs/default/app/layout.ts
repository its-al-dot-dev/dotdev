import { defineStyleSheet } from 'dotdev/theme'

export default defineStyleSheet({
  tokens: {
    'header-height': '56px',
    'sidebar-width': '240px',
  },
  utilities: {
    'transition-theme': `transition-colors`,
    'text-default': `ui-text-primary`,
    'text-secondary': `text-primary-500 dark:text-primary-400`,
    'border-default': `border-primary-200 dark:border-primary-800 transition-[border-color]`,

    'surface-base': `bg-primary-50 dark:bg-primary-950`,
    'surface-panel': `bg-white dark:bg-primary-950 layout-border-default`,

    'header-height': `h-(--layout-header-height)`,
    'sidebar-width': `w-(--layout-sidebar-width)`,
  },
  component: {
    '&': `flex min-h-svh layout-surface-base layout-text-default`,
    '&__body': `flex-1 min-w-0`,

    '&__header': `layout-header-height sticky top-0 z-100 flex items-center justify-between px-4 border-b`,
    '&__header-group': `flex items-center gap-2`,

    '&__header, &__sidebar': `layout-surface-panel`,

    '&__backdrop': `fixed inset-0 z-40 bg-primary-950/50 lg:hidden`,

    '&__sidebar': `fixed inset-y-0 left-0 z-50 flex w-(--layout-sidebar-width) min-w-0 shrink-0 flex-col overflow-hidden pt-(--layout-header-height) border-r layout-surface-panel lg:sticky lg:top-0 lg:h-svh lg:pt-0`,
    '&__sidebar--open': `translate-x-0`,
    '&__sidebar--closed': `-translate-x-full lg:translate-x-0 lg:w-0 lg:border-r-0`,

    '&__sidebar-header': `layout-header-height flex items-center shrink-0 px-4 border-b layout-surface-panel`,
    '&__sidebar-body': `flex-1 overflow-y-auto px-2 py-4`,
    '&__sidebar-body .d-menu__heading': ``,
    '&__sidebar-body .d-menu__heading.level-0': `not-first:mt-4 uppercase text-sm layout-text-secondary`,
  },
})
