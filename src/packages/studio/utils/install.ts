import type { App } from 'vue'
import type { Router } from 'vue-router'
import { routesToMenu } from './routes-to-menu.ts'
import { createPinia } from 'pinia'

function resolveRouter(app: App): Router | null {
  const router = app.config.globalProperties.$router
  return router ?? null
}

export const studio = {
  install(app: App) {
    const router = resolveRouter(app)
    const pinia = createPinia()

    app.use(pinia)

    if (router) {
      console.log(routesToMenu(router.getRoutes()))
      app.config.globalProperties.$studioMenu = routesToMenu(router.getRoutes())
    }
  },
}
