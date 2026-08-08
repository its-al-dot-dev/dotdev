import { sizes, tw } from '../utils.ts'
import { fieldStyles } from './field.ts'

const { '&': base, ...styles } = fieldStyles()

export default tw({
  '&': `${base} py-[0.4em] resize-none`,
  ...styles,

  '&--sm': sizes('sm', 'px', 'text'),
  '&--md': sizes('md', 'px', 'text'),
  '&--lg': sizes('lg', 'px', 'text'),
})
