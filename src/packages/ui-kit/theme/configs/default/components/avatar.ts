import { tw } from '../utils.ts'

// Avatar
export default tw({
  '&': 'size-[2.5em] box-border flex items-center justify-center relative rounded-full bg-[color-mix(in_oklab,currentColor_10%,transparent)] border-[color-mix(in_oklab,currentColor_50%,transparent)]',
  '&--border': `border`,
  '&__image': `rounded-[inherit]`,
})
