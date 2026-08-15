import { defineSheet } from 'dotdev/theme'

export default defineSheet({
  name: 'landing',

  rules: {
    '&': `mx-auto w-full max-w-6xl px-4 py-16 lg:py-24`,

    /* Hero */
    '&__hero': `grid gap-12 lg:grid-cols-2 lg:items-center`,
    '&__hero-copy': `flex flex-col items-start gap-5`,
    '&__kicker': `flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-muted`,
    '&__kicker-mark': `size-2.5 rounded-full bg-brand`,
    '&__title': `font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance`,
    '&__subtitle': `max-w-xl text-lg text-muted text-balance`,
    '&__actions': `flex flex-wrap items-center gap-3 mt-1`,
    '&__meta': `flex items-center gap-2.5 font-mono text-xs text-muted`,
    '&__meta-sep': `size-1 rounded-full bg-neutral-400`,

    /* Demo window */
    '&__demo': `w-full rounded-2xl border border-default doc-bg-grid overflow-hidden`,
    '&__demo-bar': `flex items-center justify-between border-b border-default bg-surface px-4 h-10`,
    '&__demo-label': `font-mono text-xs uppercase tracking-widest text-muted`,
    '&__demo-version': `font-mono text-xs text-muted`,
    '&__demo-stage': `flex flex-col items-center justify-center gap-4 px-6 py-14`,
    '&__demo-row': `flex flex-wrap items-center justify-center gap-3`,

    /* Section head */
    '&__section': `mt-24`,
    '&__section-head': `flex flex-col items-center gap-3 text-center`,
    '&__section-title': `font-bold text-3xl tracking-tight text-balance`,
    '&__section-sub': `max-w-2xl text-muted`,

    /* Features */
    '&__features': `grid gap-5 mt-12 sm:grid-cols-3`,
    '&__feature': `flex flex-col gap-2 rounded-xl border border-default p-5 text-left transition-colors hover:border-neutral-300`,
    '&__feature-index': `font-mono text-xs text-muted`,
    '&__feature-title': `font-semibold text-lg tracking-tight`,
    '&__feature-desc': `text-sm text-muted`,

    /* Packages */
    '&__packages': `grid gap-5 mt-12 sm:grid-cols-2`,
    '&__package': `flex flex-col gap-2.5 rounded-xl border border-default p-5 text-left`,
    '&__package-head': `flex items-center gap-2.5`,
    '&__package-icon': `size-7.5 flex items-center justify-center rounded-lg border border-brand-soft bg-brand-soft text-brand text-base`,
    '&__package-name': `font-mono text-sm font-medium`,
    '&__package-desc': `text-sm text-muted`,

    /* Getting started */
    '&__steps': `grid gap-5 mt-12 lg:grid-cols-3`,
    '&__step': `flex flex-col gap-3 rounded-xl border border-default p-5 text-left`,
    '&__step-index': `font-mono text-xs text-muted`,
    '&__step-title': `font-semibold text-lg tracking-tight`,
    '&__step-desc': `text-sm text-muted`,
    '&__step-code': `rounded-lg border border-default bg-neutral-soft p-4 font-mono text-[0.75rem] leading-relaxed overflow-x-auto`,

    /* CTA */
    '&__cta': `mt-24 flex flex-col items-center gap-4 text-center`,
    '&__cta-title': `font-bold text-3xl lg:text-4xl tracking-tight text-balance`,
    '&__cta-sub': `max-w-xl text-muted`,
    '&__cta-actions': `flex flex-wrap items-center justify-center gap-3 mt-1`,
    '&__cta-version': `font-mono text-xs text-muted`,
  },
})
