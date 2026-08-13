import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { studio } from 'dotdev/studio'
import { createUiKit } from 'dotdev/ui-kit'

const app = createApp(App)

const uiKit = createUiKit({
  namespace: 'd',
  components: {
    button: {},
  },
})

app.use(uiKit)

app.use(router)
app.use(studio)

app.mount('#app')
