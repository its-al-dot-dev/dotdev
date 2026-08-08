import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import VueRouter from 'vue-router/vite'
import { fileURLToPath } from 'url'
import playgroundDocs from './src/packages/studio/plugin/index.ts'

export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    VueRouter({ routesFolder: ['./src/app/pages', './src/packages/docs'], exclude: ['**/docs/*', '**/*Play.vue'] }),
    vue(),
    tailwindcss(),
    playgroundDocs({ include: './src/packages/ui-kit/components/**/*.{vue,ts}' }),
  ],
  resolve: {
    alias: {
      'dotdev/ui-kit': fileURLToPath(new URL('./src/packages/ui-kit', import.meta.url)),
      'dotdev/studio': fileURLToPath(new URL('./src/packages/studio', import.meta.url)),
      'resolve-docs': fileURLToPath(new URL('./src/packages/docs/resolve-docs.ts', import.meta.url)),
    },
  },
})
