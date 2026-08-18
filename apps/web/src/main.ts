import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { studio } from '@dotdev/studio'
import { createUiKit, useThemeProvider } from '@dotdev/ui-kit'
import { icons } from './generated/icons'

const app = createApp(App)

const uiKit = createUiKit({ namespace: 'd', icons })
app.use(uiKit)

const theme = useThemeProvider('d')
app.use(theme)

app.use(router)
app.use(studio)

app.mount('#app')
