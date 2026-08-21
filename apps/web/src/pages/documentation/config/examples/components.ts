import { createUiKit } from '@dotdev/ui-kit'

export const uiKit = createUiKit({
  components: {
    button: { color: 'primary', size: 'lg', variant: 'soft' },
    input: { size: 'md' },
  },
})
