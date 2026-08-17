import { Component } from 'dotdev/theme'

export const doc = new Component({
  ui: 'doc',
  semantics: {
    'bg-tint': ['brand-50', 'brand-400/10'],
    'bg-card': ['neutral-50', 'neutral-500/10'],
    'bg-grid-color': 'neutral-500/30',
  },
  utilities: {
    card: `doc-bg-card border border-default rounded-2xl transition-[background-color,border-color]`,
    'bg-grid': 'bg-[radial-gradient(var(--d-doc-bg-grid-color)_1px,transparent_1px)] bg-size-[20px_20px]',
    'code-text': 'text-[0.9em]',
  },
  rules: {
    '.doc-page': `py-10 px-4 lg:px-8 flex gap-10 items-start`,
    '.doc-page__body': `w-full min-w-0`,
    '.doc-page__header': `mb-8`,
    '.doc-page__caption': `flex items-center justify-between gap-4 mb-3`,
    '.doc-page__caption-label': `flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted`,
    '.doc-page__title': `font-bold text-2xl tracking-tight flex items-center gap-3`,
    '.doc-page__title-icon': `size-7.5 flex items-center justify-center border border-brand-soft bg-brand-soft text-brand text-base rounded-lg`,
    '.doc-page__gh': `font-mono text-muted`,
    '.doc-page__desc': `mt-4 text-muted max-w-prose`,
    '.doc-page__divider': `mt-10 mb-10 border-default`,
    '.doc-page__example': `scroll-mt-24`,

    '.doc-section': `flex flex-col gap-5 scroll-mt-24`,
    '.doc-section__title': `font-semibold text-sm uppercase tracking-wider text-muted`,

    '.doc-sidebar': `sticky top-24 hidden xl:block w-64 shrink-0 max-h-[calc(100vh-6rem)] overflow-y-auto`,
    '.doc-sidebar__title': `font-mono text-xs uppercase tracking-wider text-muted mb-4`,
    '.doc-sidebar__nav': `flex flex-col gap-1 border-l border-default`,
    '.doc-sidebar__link': `text-sm text-muted -ml-px border-l-2 border-transparent px-3 py-1.5 transition-[color,border-color] hover:text-foreground`,
    '.doc-sidebar__link--active': `border-brand text-foreground font-medium`,

    '.doc-block': `mb-10 mt-4 scroll-mt-24`,
    '.doc-block__header': `mb-4`,
    '.doc-block__title': `text-lg font-semibold mb-2`,
    '.doc-block__desc': `text-muted`,

    '.doc-desc': `whitespace-pre-wrap`,
    '.doc-desc code': `doc-code-text doc-bg-tint px-1.5 py-px rounded-sm text-brand`,

    '.doc-card': `doc-card`,
    '.doc-card__header, .doc-card__footer': `border-default p-2 flex justify-between transition-[border-color]`,
    '.doc-card__footer': `border-t`,

    '.doc-example': `flex flex-col min-h-100 overflow-hidden`,
    '.doc-example__actions': `flex gap-1`,
    '.doc-example__body': `flex flex-1 flex-col bg-background transition-[background-color]`,
    '.doc-example__canvas': `flex flex-1 items-center justify-center flex-wrap gap-4 px-6 py-6`,
    '.doc-example__code-view': `flex flex-1`,

    '.doc-code': `max-h-100 h-auto`,
    '.doc-code__raw': `py-4 pr-4`,
    '.doc-code .shiki': `flex text-sm outline-none`,
    '.doc-code .shiki code': `pr-4`,
    '.doc-code .shiki span': `text-(--shiki-light) dark:text-(--shiki-dark)`,

    '.doc-tokens': `flex flex-col gap-6 scroll-mt-24 mt-12`,
    '.doc-tokens__header': `flex items-start gap-4`,
    '.doc-tokens__icon': `size-7.5 flex items-center justify-center border border-brand-soft bg-brand-soft text-brand text-base rounded-lg shrink-0`,
    '.doc-tokens__title': `font-semibold text-lg tracking-tight`,
    '.doc-tokens__desc': `text-sm text-muted mt-1`,
    '.doc-tokens__group': `flex flex-col gap-3 not-last:pb-6 not-last:border-b border-default`,
    '.doc-tokens__group-label': `font-mono text-xs uppercase tracking-wider text-muted`,
    '.doc-tokens__grid': `grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4`,

    '.doc-token': `flex flex-col border border-default rounded-lg overflow-hidden`,
    '.doc-token__well': `h-16 flex items-center justify-center doc-bg-tint`,
    '.doc-token__well--end': `items-end pb-2`,
    '.doc-token__meta': `flex flex-col gap-0.5 border-t border-default p-2`,
    '.doc-token__name': `font-mono text-[11px] text-muted truncate`,
    '.doc-token__value': `font-mono text-xs text-foreground truncate`,
    '.doc-token__swatch': `size-9 rounded-md ring-1 ring-inset ring-black/10 dark:ring-white/10`,
    '.doc-token__shape': `inline-block size-2.5 rounded-sm bg-neutral`,
    '.doc-token__shape--rect': `h-8 w-12 bg-neutral`,
    '.doc-token__bar': `w-3 rounded-sm bg-neutral`,
    '.doc-token__label': `font-semibold leading-none`,
  },
})
