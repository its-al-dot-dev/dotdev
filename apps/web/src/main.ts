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
    primitives: {},
  },
})

app.use(createUiKit([base, landing]))
app.use(router)
app.use(studio)

app.mount('#app')
