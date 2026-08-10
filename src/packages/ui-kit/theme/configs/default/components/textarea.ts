import { defineStyleSheet, sizes } from 'dotdev/theme'
import { fieldStyles } from './field.ts'

const field = fieldStyles()

export default defineStyleSheet({
  component: {
    ...field,
    '&': `${field['&']} py-[0.4em] resize-none`,

    '&--sm': sizes('sm', 'px', 'text'),
    '&--md': sizes('md', 'px', 'text'),
    '&--lg': sizes('lg', 'px', 'text'),
  },
})
