import { createApp } from 'vue'
import { createUiKit } from 'dotdev/ui-kit'
import { icons } from 'dotdev/icons'

const app = createApp({})

const uiKit = createUiKit({
  namespace: 'd',
  icons,
})

app.use(uiKit)

app.mount('#app')
