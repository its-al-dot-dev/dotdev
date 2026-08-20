import { createApp } from 'vue'
import { createUiKit } from '@dotdev/ui-kit'

const app = createApp({})

const uiKit = createUiKit({
  namespace: 'd',
})

app.use(uiKit)

app.mount('#app')
