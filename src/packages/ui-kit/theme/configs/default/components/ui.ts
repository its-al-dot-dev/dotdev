import { defineSheet } from 'dotdev/theme'

const sizeKeys = ['h', 'size']
const spaceKeys = ['px', 'py', 'p', 'pl', 'pr', 'pt', 'pb']

export default defineSheet({
  name: 'ui',
  scope: 'global',

  vars: {
    'brand-50': 'var(--color-indigo-50)',
    'brand-100': 'var(--color-indigo-100)',
    'brand-200': 'var(--color-indigo-200)',
    'brand-300': 'var(--color-indigo-300)',
    'brand-400': 'var(--color-indigo-400)',
    'brand-500': 'var(--color-indigo-500)',
    'brand-600': 'var(--color-indigo-600)',
    'brand-700': 'var(--color-indigo-700)',
    'brand-800': 'var(--color-indigo-800)',
    'brand-900': 'var(--color-indigo-900)',
    'brand-950': 'var(--color-indigo-950)',

    'neutral-50': 'var(--color-slate-50)',
    'neutral-100': 'var(--color-slate-100)',
    'neutral-200': 'var(--color-slate-200)',
    'neutral-300': 'var(--color-slate-300)',
    'neutral-400': 'var(--color-slate-400)',
    'neutral-500': 'var(--color-slate-500)',
    'neutral-600': 'var(--color-slate-600)',
    'neutral-700': 'var(--color-slate-700)',
    'neutral-800': 'var(--color-slate-800)',
    'neutral-900': 'var(--color-slate-900)',
    'neutral-950': 'var(--color-slate-950)',

    'danger-50': 'var(--color-red-50)',
    'danger-100': 'var(--color-red-100)',
    'danger-200': 'var(--color-red-200)',
    'danger-300': 'var(--color-red-300)',
    'danger-400': 'var(--color-red-400)',
    'danger-500': 'var(--color-red-500)',
    'danger-600': 'var(--color-red-600)',
    'danger-700': 'var(--color-red-700)',
    'danger-800': 'var(--color-red-800)',
    'danger-900': 'var(--color-red-900)',
    'danger-950': 'var(--color-red-950)',

    'warning-50': 'var(--color-amber-50)',
    'warning-100': 'var(--color-amber-100)',
    'warning-200': 'var(--color-amber-200)',
    'warning-300': 'var(--color-amber-300)',
    'warning-400': 'var(--color-amber-400)',
    'warning-500': 'var(--color-amber-500)',
    'warning-600': 'var(--color-amber-600)',
    'warning-700': 'var(--color-amber-700)',
    'warning-800': 'var(--color-amber-800)',
    'warning-900': 'var(--color-amber-900)',
    'warning-950': 'var(--color-amber-950)',

    'info-50': 'var(--color-sky-50)',
    'info-100': 'var(--color-sky-100)',
    'info-200': 'var(--color-sky-200)',
    'info-300': 'var(--color-sky-300)',
    'info-400': 'var(--color-sky-400)',
    'info-500': 'var(--color-sky-500)',
    'info-600': 'var(--color-sky-600)',
    'info-700': 'var(--color-sky-700)',
    'info-800': 'var(--color-sky-800)',
    'info-900': 'var(--color-sky-900)',
    'info-950': 'var(--color-sky-950)',

    'success-50': 'var(--color-emerald-50)',
    'success-100': 'var(--color-emerald-100)',
    'success-200': 'var(--color-emerald-200)',
    'success-300': 'var(--color-emerald-300)',
    'success-400': 'var(--color-emerald-400)',
    'success-500': 'var(--color-emerald-500)',
    'success-600': 'var(--color-emerald-600)',
    'success-700': 'var(--color-emerald-700)',
    'success-800': 'var(--color-emerald-800)',
    'success-900': 'var(--color-emerald-900)',
    'success-950': 'var(--color-emerald-950)',

    'space-xs': '0.5rem',
    'space-sm': '0.625rem',
    'space-md': '0.75rem',
    'space-lg': '1rem',
    'space-xl': '1.25rem',

    'radius-xs': '0.125rem',
    'radius-sm': '0.375rem',
    'radius-md': '0.5rem',
    'radius-lg': '0.75rem',
    'radius-xl': '1rem',

    'size-xs': '2rem',
    'size-sm': '2.25rem',
    'size-md': '2.5rem',
    'size-lg': '2.75rem',
    'size-xl': '3rem',

    'gap-xs': '0.25rem',
    'gap-sm': '0.375rem',
    'gap-md': '0.5rem',
    'gap-lg': '0.625rem',
    'gap-xl': '0.75rem',

    'label-xs': '0.75rem',
    'label-sm': '0.875rem',
    'label-md': '1rem',
    'label-lg': '1.125rem',
    'label-xl': '1.25rem',
  },

  semantics: {
    'font-sans': `'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
    'font-mono': `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace`,

    'bg-background': ['white', 'neutral-950'],
    'bg-surface': ['neutral-50', 'neutral-900'],
    'text-foreground': ['neutral-900', 'neutral-100'],
    'text-muted': ['neutral-500', 'neutral-400'],
    'border-default': ['neutral-200', 'neutral-800'],
    'text-placeholder': ['neutral-400', 'neutral-500'],

    /* Brand */
    'bg-brand': ['brand-500', 'brand-400'],
    'bg-brand-hover': ['brand-600', 'brand-300'],
    'text-brand': ['brand-600', 'brand-400'],
    'text-on-brand': ['neutral-50', 'neutral-950'],
    'bg-brand-soft': ['brand-50', 'brand-500/16'],
    'bg-brand-soft-hover': ['brand-100', 'brand-500/26'],
    'border-brand': ['brand-500', 'brand-400'],
    'ring-brand': 'brand-500/50',

    /* Neutral */
    'bg-neutral': ['neutral-800', 'neutral-200'],
    'bg-neutral-hover': ['neutral-700', 'neutral-300'],
    'text-neutral': ['neutral-700', 'neutral-300'],
    'text-on-neutral': ['neutral-50', 'neutral-900'],
    'bg-neutral-soft': ['neutral-100', 'neutral-500/16'],
    'bg-neutral-soft-hover': ['neutral-200', 'neutral-500/26'],
    'border-neutral': ['neutral-300', 'neutral-700'],
    'ring-neutral': 'neutral-500/50',

    /* Danger */
    'bg-danger': ['danger-600', 'danger-400'],
    'bg-danger-hover': ['danger-700', 'danger-300'],
    'text-danger': ['danger-600', 'danger-400'],
    'text-on-danger': ['neutral-50', 'neutral-950'],
    'bg-danger-soft': ['danger-50', 'danger-500/16'],
    'bg-danger-soft-hover': ['danger-100', 'danger-500/26'],
    'border-danger': ['danger-500', 'danger-400'],
    'ring-danger': 'danger-500/50',

    /* Warning */
    'bg-warning': ['warning-500', 'warning-400'],
    'bg-warning-hover': ['warning-600', 'warning-300'],
    'text-warning': ['warning-700', 'warning-400'],
    'text-on-warning': ['neutral-950', 'neutral-950'],
    'bg-warning-soft': ['warning-50', 'warning-500/16'],
    'bg-warning-soft-hover': ['warning-100', 'warning-500/26'],
    'border-warning': ['warning-600', 'warning-400'],
    'ring-warning': 'warning-500/50',

    /* Info */
    'bg-info': ['info-700', 'info-400'],
    'bg-info-hover': ['info-800', 'info-300'],
    'text-info': ['info-700', 'info-400'],
    'text-on-info': ['neutral-50', 'neutral-950'],
    'bg-info-soft': ['info-50', 'info-500/16'],
    'bg-info-soft-hover': ['info-100', 'info-500/26'],
    'border-info': ['info-600', 'info-400'],
    'ring-info': 'info-500/50',

    /* Success */
    'bg-success': ['success-700', 'success-400'],
    'bg-success-hover': ['success-800', 'success-300'],
    'text-success': ['success-700', 'success-400'],
    'text-on-success': ['neutral-50', 'neutral-950'],
    'bg-success-soft': ['success-50', 'success-500/16'],
    'bg-success-soft-hover': ['success-100', 'success-500/26'],
    'border-success': ['success-600', 'success-400'],
    'ring-success': 'success-500/50',
  },

  utilities: {
    ...flatMapObject(sizeKeys, (key) => ({
      [`${key}-xs`]: `${key}-(--ui-size-xs)`,
      [`${key}-sm`]: `${key}-(--ui-size-sm)`,
      [`${key}-md`]: `${key}-(--ui-size-md)`,
      [`${key}-lg`]: `${key}-(--ui-size-lg)`,
      [`${key}-xl`]: `${key}-(--ui-size-xl)`,
    })),

    ...flatMapObject(spaceKeys, (key) => ({
      [`${key}-xs`]: `${key}-(--ui-space-xs)`,
      [`${key}-sm`]: `${key}-(--ui-space-sm)`,
      [`${key}-md`]: `${key}-(--ui-space-md)`,
      [`${key}-lg`]: `${key}-(--ui-space-lg)`,
      [`${key}-xl`]: `${key}-(--ui-space-xl)`,
    })),

    'gap-xs': 'gap-(--ui-gap-xs)',
    'gap-sm': 'gap-(--ui-gap-sm)',
    'gap-md': 'gap-(--ui-gap-md)',
    'gap-lg': 'gap-(--ui-gap-lg)',
    'gap-xl': 'gap-(--ui-gap-xl)',

    'label-xs': 'text-(length:--ui-label-xs)',
    'label-sm': 'text-(length:--ui-label-sm)',
    'label-md': 'text-(length:--ui-label-md)',
    'label-lg': 'text-(length:--ui-label-lg)',
    'label-xl': 'text-(length:--ui-label-xl)',

    'radius-xs': 'rounded-(--ui-radius-xs)',
    'radius-sm': 'rounded-(--ui-radius-sm)',
    'radius-md': 'rounded-(--ui-radius-md)',
    'radius-lg': 'rounded-(--ui-radius-lg)',
    'radius-xl': 'rounded-(--ui-radius-xl)',

    disabled: 'pointer-events-none opacity-60',

    // Need for tailwind IntelliSense
    'brand-*': `bg-[color-mix(in_oklab,--value(--ui-brand-*)_--modifier(integer,--default(100))%,transparent)]`,
    'neutral-*': `bg-[color-mix(in_oklab,--value(--ui-neutral-*)_--modifier(integer,--default(100))%,transparent)]`,
    'danger-*': `bg-[color-mix(in_oklab,--value(--ui-danger-*)_--modifier(integer,--default(100))%,transparent)]`,
    'warning-*': `bg-[color-mix(in_oklab,--value(--ui-warning-*)_--modifier(integer,--default(100))%,transparent)]`,
    'info-*': `bg-[color-mix(in_oklab,--value(--ui-info-*)_--modifier(integer,--default(100))%,transparent)]`,
    'success-*': `bg-[color-mix(in_oklab,--value(--ui-success-*)_--modifier(integer,--default(100))%,transparent)]`,
  },
})

function flatMapObject<TKey extends PropertyKey, TValue>(
  keys: readonly TKey[],
  callback: (key: TKey) => Record<string, TValue>,
): Record<string, TValue> {
  return Object.assign({}, ...keys.map(callback))
}
