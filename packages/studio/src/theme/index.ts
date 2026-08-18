import { Theme } from '@dotdev/theme'
import { layout } from './app/layout.ts'
import { landing } from './app/landing.ts'
import { doc } from './app/doc.ts'

export default new Theme({
  name: 'Studio',
  namespace: 's',
  components: {
    layout,
    landing,
    doc,
  },
})
