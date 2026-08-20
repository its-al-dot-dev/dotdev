import { defineTheme } from '@dotdev/design'
import { layout } from './app/layout.ts'
import { landing } from './app/landing.ts'
import { doc } from './app/doc.ts'
import { themeConfig } from '@dotdev/theme'

export default defineTheme({
  ...themeConfig,
  components: { layout, landing, doc },
})
