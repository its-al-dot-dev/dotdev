import { defineStyleSheet, sizes } from 'dotdev/theme'
import { fieldStyles } from './field.ts'

export default defineStyleSheet({
  component: {
    ...fieldStyles(),

    '&--sm': sizes('sm', 'h', 'px', 'text'),
    '&--md': sizes('md', 'h', 'px', 'text'),
    '&--lg': sizes('lg', 'h', 'px', 'text'),
  },
})
