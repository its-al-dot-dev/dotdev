import { defineSheet } from 'dotdev/theme'

export default defineSheet({
  name: 'doc',
  vars: {
    'grid-color': 'neutral-500/30',
    'brand-gradient': 'bg-brand-soft',
    'secondary-gradient': 'bg-surface',
  },
  semantics: {
    'bg-tint': ['brand-50', 'brand-400/10'],
    'bg-card': ['neutral-50', 'neutral-500/10'],
  },
  utilities: {
    card: `doc-bg-card border border-default rounded-2xl transition-[background-color,border-color]`,
    'bg-grid': 'bg-[radial-gradient(var(--doc-grid-color)_1px,transparent_1px)] bg-size-[20px_20px]',
    'bg-gradient': 'bg-[linear-gradient(135deg,var(--doc-brand-gradient),var(--doc-secondary-gradient)_70%)]',
    'code-text': 'text-[0.9em]',
  },
  rules: {
    '&-page': `py-10 px-4 lg:px-8 flex gap-10 items-start`,
    '&-page__body': `w-full min-w-0`,
    '&-page__header': `mb-8`,
    '&-page__caption': `flex items-center justify-between gap-4 mb-3`,
    '&-page__caption-label': `flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted`,
    '&-page__title': `font-bold text-2xl tracking-tight flex items-center gap-3`,
    '&-page__title-icon': `size-7.5 flex items-center justify-center border border-brand-soft bg-brand-soft text-brand text-base rounded-lg`,
    '&-page__gh': `font-mono text-muted`,
    '&-page__desc': `mt-4 text-muted max-w-prose`,
    '&-page__divider': `mt-10 mb-10 border-default`,
    '&-page__example': `scroll-mt-24`,

    '&-section': `flex flex-col gap-5 scroll-mt-24`,
    '&-section__title': `font-semibold text-sm uppercase tracking-wider text-muted`,

    '&-sidebar': `sticky top-24 hidden xl:block w-64 shrink-0 max-h-[calc(100vh-6rem)] overflow-y-auto`,
    '&-sidebar__title': `font-mono text-xs uppercase tracking-wider text-muted mb-4`,
    '&-sidebar__nav': `flex flex-col gap-1 border-l border-default`,
    '&-sidebar__link': `text-sm text-muted -ml-px border-l-2 border-transparent px-3 py-1.5 transition-[color,border-color] hover:text-foreground`,
    '&-sidebar__link--active': `border-brand text-foreground font-medium`,

    '&-block': `mb-10 mt-4 scroll-mt-24`,
    '&-block__header': `mb-4`,
    '&-block__title': `text-lg font-semibold mb-2`,
    '&-block__desc': `text-muted`,

    '&-desc': `whitespace-pre-wrap`,
    '&-desc code': `doc-code-text doc-bg-tint px-1.5 py-px rounded-sm text-brand`,

    '&-card': `doc-card`,
    '&-card__header, &-card__footer': `border-default p-2 flex justify-between transition-[border-color]`,
    '&-card__footer': `border-t`,

    '&-example': `flex flex-col min-h-100 overflow-hidden`,
    '&-example__actions': `flex gap-1`,
    '&-example__body': `flex flex-1 flex-col bg-background transition-[background-color]`,
    '&-example__canvas': `flex flex-1 items-center justify-center flex-wrap gap-4 px-6 py-6`,
    '&-example__code-view': `flex flex-1`,

    '&-code': `max-h-100 h-auto`,
    '&-code__raw': `py-4 pr-4`,
    '&-code .shiki': `flex text-sm outline-none`,
    '&-code .shiki code': `pr-4`,
    '&-code .shiki span': `text-(--shiki-light) dark:text-(--shiki-dark)`,
  },
})
