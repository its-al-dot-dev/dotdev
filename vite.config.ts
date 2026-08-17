import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import VueRouter from 'vue-router/vite'
import { fileURLToPath } from 'url'
import AutoImport from 'unplugin-auto-import/vite'
import svgLoader from 'vite-svg-loader'
import playgroundDocs from './src/packages/studio/plugin/index.ts'
import uiKitIcons from './src/packages/icons/plugin.ts'

export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    VueRouter({ routesFolder: ['./src/app/pages', './src/packages/docs'], exclude: ['**/docs/*', '**/*Play.vue'] }),
    vue(),
    tailwindcss(),
    playgroundDocs({ include: './src/packages/ui-kit/components/**/*.{vue,ts}' }),
    AutoImport({ imports: { 'dotdev/studio': ['defineExample'] } }),
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
    uiKitIcons({
      dir: './src/packages/icons/pack',
      outDir: './src/packages/icons',
    }),
  ],
  resolve: {
    alias: {
      'dotdev/theme': fileURLToPath(new URL('./src/packages/theme', import.meta.url)),
      'dotdev/ui-kit': fileURLToPath(new URL('./src/packages/ui-kit', import.meta.url)),
      'dotdev/studio': fileURLToPath(new URL('./src/packages/studio', import.meta.url)),
      'dotdev/icons': fileURLToPath(new URL('./src/packages/icons', import.meta.url)),
    },
  },
})
