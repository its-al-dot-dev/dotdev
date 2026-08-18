import { Component } from '@dotdev/theme'

export const landing = new Component({
  ui: 'landing',
  layer: 'studio',
  rules: {
    '.landing': `mx-auto w-full max-w-6xl px-4 py-16 lg:py-24`,

    /* Hero */
    '.landing__hero': `grid gap-12 lg:grid-cols-2 lg:items-center`,
    '.landing__hero-copy': `flex flex-col items-start gap-5`,
    '.landing__kicker': `flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-muted`,
    '.landing__kicker-mark': `size-2.5 rounded-full bg-brand`,
    '.landing__title': `font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance`,
    '.landing__subtitle': `max-w-xl text-lg text-muted text-balance`,
    '.landing__actions': `flex flex-wrap items-center gap-3 mt-1`,
    '.landing__meta': `flex items-center gap-2.5 font-mono text-xs text-muted`,
    '.landing__meta-sep': `size-1 rounded-full bg-neutral-400`,

    /* Demo window */
    '.landing__demo': `w-full rounded-2xl border border-default doc-bg-grid overflow-hidden`,
    '.landing__demo-bar': `flex items-center justify-between border-b border-default bg-surface px-4 h-10`,
    '.landing__demo-label': `font-mono text-xs uppercase tracking-widest text-muted`,
    '.landing__demo-version': `font-mono text-xs text-muted`,
    '.landing__demo-stage': `flex flex-col items-center justify-center gap-4 px-6 py-14`,
    '.landing__demo-row': `flex flex-wrap items-center justify-center gap-3`,

    /* Section head */
    '.landing__section': `mt-24`,
    '.landing__section-head': `flex flex-col items-center gap-3 text-center`,
    '.landing__section-title': `font-bold text-3xl tracking-tight text-balance`,
    '.landing__section-sub': `max-w-2xl text-muted`,

    /* Features */
    '.landing__features': `grid gap-5 mt-12 sm:grid-cols-3`,
    '.landing__feature': `flex flex-col gap-2 rounded-xl border border-default p-5 text-left transition-colors hover:border-neutral-300`,
    '.landing__feature-index': `font-mono text-xs text-muted`,
    '.landing__feature-title': `font-semibold text-lg tracking-tight`,
    '.landing__feature-desc': `text-sm text-muted`,

    /* Packages */
    '.landing__packages': `grid gap-5 mt-12 sm:grid-cols-2`,
    '.landing__package': `flex flex-col gap-2.5 rounded-xl border border-default p-5 text-left`,
    '.landing__package-head': `flex items-center gap-2.5`,
    '.landing__package-icon': `size-7.5 flex items-center justify-center rounded-lg border border-brand-soft bg-brand-soft text-brand text-base`,
    '.landing__package-name': `font-mono text-sm font-medium`,
    '.landing__package-desc': `text-sm text-muted`,

    /* Getting started */
    '.landing__steps': `grid gap-5 mt-12 lg:grid-cols-3`,
    '.landing__step': `flex flex-col gap-3 rounded-xl border border-default p-5 text-left`,
    '.landing__step-index': `font-mono text-xs text-muted`,
    '.landing__step-title': `font-semibold text-lg tracking-tight`,
    '.landing__step-desc': `text-sm text-muted`,
    '.landing__step-code': `rounded-lg border border-default bg-neutral-soft p-4 font-mono type-xs leading-relaxed overflow-x-auto`,

    /* CTA */
    '.landing__cta': `mt-24 flex flex-col items-center gap-4 text-center`,
    '.landing__cta-title': `font-bold text-3xl lg:text-4xl tracking-tight text-balance`,
    '.landing__cta-sub': `max-w-xl text-muted`,
    '.landing__cta-actions': `flex flex-wrap items-center justify-center gap-3 mt-1`,
    '.landing__cta-version': `font-mono text-xs text-muted`,
  },
})
