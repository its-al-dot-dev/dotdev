import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import VueRouter from 'vue-router/vite'
import { fileURLToPath } from 'url'
import AutoImport from 'unplugin-auto-import/vite'
import svgLoader from 'vite-svg-loader'
import { uiKitIcons } from '@dotdev/icons'

export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    VueRouter({ routesFolder: ['./src/pages'], exclude: ['**/docs/*'] }),
    vue(),
    tailwindcss(),
    AutoImport({ imports: { '@dotdev/studio': ['defineExample'] } }),
    svgLoader({
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: { overrides: { removeViewBox: false } },
          },
        ],
      },
    }),
    uiKitIcons({ outDir: './src/generated/icons' }),
  ],
  resolve: {
    alias: {
      '@dotdev/ui-kit': fileURLToPath(new URL('../../packages/ui-kit/src', import.meta.url)),
      '@dotdev/studio': fileURLToPath(new URL('../../packages/studio/src', import.meta.url)),
    },
  },
})
