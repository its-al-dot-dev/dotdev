import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { studio } from '@dotdev/studio'
import { createUiKit, defineUiKitConfig } from '@dotdev/ui-kit'
import { icons } from './generated/icons'

const app = createApp(App)

const base = defineUiKitConfig({ namespace: 'd', icons })
const landing = defineUiKitConfig({
  namespace: 'landing',
  icons,
  theme: {
    primitives: {
      /* Violet ramp — louder than the indigo workbench */
      'brand-50': 'oklch(96.9% 0.016 293.76)',
      'brand-100': 'oklch(94.3% 0.029 294.59)',
      'brand-200': 'oklch(89.4% 0.057 293.28)',
      'brand-300': 'oklch(81.4% 0.111 293.57)',
      'brand-400': 'oklch(70.2% 0.183 293.54)',
      'brand-500': 'oklch(60.6% 0.25 292.72)',
      'brand-600': 'oklch(54.1% 0.281 293.01)',
      'brand-700': 'oklch(47.6% 0.247 293.46)',
      'brand-800': 'oklch(40.1% 0.199 293.55)',
      'brand-900': 'oklch(35.7% 0.165 293.98)',
      'brand-950': 'oklch(28.3% 0.141 291.09)',

      /* Roomier scale — landing pages breathe */
      'space-xs': '0.625rem',
      'space-sm': '0.75rem',
      'space-md': '1rem',
      'space-lg': '1.25rem',
      'space-xl': '1.5rem',

      'size-xs': '2.25rem',
      'size-sm': '2.5rem',
      'size-md': '2.75rem',
      'size-lg': '3rem',
      'size-xl': '3.5rem',

      'gap-xs': '0.375rem',
      'gap-sm': '0.5rem',
      'gap-md': '0.625rem',
      'gap-lg': '0.75rem',
      'gap-xl': '1rem',

      'type-xs': '0.8125rem',
      'type-sm': '0.9375rem',
      'type-md': '1.0625rem',
      'type-lg': '1.25rem',
      'type-xl': '1.375rem',

      'radius-xs': '0.25rem',
      'radius-sm': '0.5rem',
      'radius-md': '0.625rem',
      'radius-lg': '0.75rem',
      'radius-xl': '1rem',
    },
    semantics: {
      /* Violet-tinted night instead of flat grey */
      'bg-background': ['white', 'oklch(14.5% 0.03 293)'],
      'bg-surface': ['white', 'oklch(18% 0.035 293)'],
      'text-foreground': ['$neutral-900', '$brand-50'],
      'text-muted': ['$neutral-500', 'oklch(75% 0.05 293)'],
      'border-default': ['$neutral-100', '$brand-500/20'],

      /* Punchier calls to action */
      'bg-brand': ['$brand-600', '$brand-500'],
      'bg-brand-hover': ['$brand-700', '$brand-400'],
      'text-brand': ['$brand-700', '$brand-300'],
      'bg-brand-soft': ['$brand-100', '$brand-500/20'],
      'bg-brand-soft-hover': ['$brand-200', '$brand-500/30'],
      'border-brand-soft': ['$brand-300', '$brand-500/40'],
      'ring-brand': ['$brand-500/40', '$brand-400/60'],
    },
  },
})

app.use(createUiKit([base, landing]))
app.use(router)
app.use(studio)

app.mount('#app')
