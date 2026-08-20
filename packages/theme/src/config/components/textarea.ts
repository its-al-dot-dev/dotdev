import { defineComponent } from '@dotdev/design'

export const textarea = defineComponent({
  ui: 'textarea',
  semantics: {
    'bg-soft': 'bg-neutral-soft',
    'bg-outlined': 'bg-background',
    'border-outlined': 'border-neutral',
    'border-focus': 'border-brand',
    'border-invalid': 'border-danger',
    'text-default': 'text-foreground',
    'text-placeholder': 'text-placeholder',

    'px-sm': 'space-sm',
    'px-md': 'space-md',
    'px-lg': 'space-lg',
    'text-sm': 'type-sm',
    'text-md': 'type-md',
    'text-lg': 'type-md',

    rounded: 'radius-md',
  },
  utilities: {
    'size-sm': 'textarea-text-sm textarea-px-sm',
    'size-md': 'textarea-text-md textarea-px-md',
    'size-lg': 'textarea-text-lg textarea-px-lg',
    transition: 'transition-[background-color,opacity,border,color]',
  },
  rules: {
    '&': 'textarea-text-default textarea-transition outline-none resize-none py-[0.4em]',
    '&:focus-visible': 'textarea-border-focus',
    '&::placeholder': 'textarea-text-placeholder',

    '&--outlined, &--underlined': 'textarea-border-outlined',
    '&--outlined, &--soft': 'textarea-rounded',
    '&--outlined': 'textarea-bg-outlined border',
    '&--underlined': 'border-b',
    '&--soft': 'textarea-bg-soft border border-transparent',

    '&:disabled': 'disabled',
    '&--invalid': 'textarea-border-invalid',
    '&--invalid:focus-visible': 'textarea-border-invalid',

    '&--sm': 'textarea-size-sm',
    '&--md': 'textarea-size-md',
    '&--lg': 'textarea-size-lg',
  },
})
