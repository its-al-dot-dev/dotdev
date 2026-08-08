import { sizes, tw } from '../utils.ts'
import { fieldStyles } from './field.ts'

export default tw({
  ...fieldStyles(),

  '&--sm': sizes('sm', 'h', 'px', 'text'),
  '&--md': sizes('md', 'h', 'px', 'text'),
  '&--lg': sizes('lg', 'h', 'px', 'text'),
})
