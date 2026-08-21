import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import VueRouter from 'vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import svgLoader from 'vite-svg-loader'
import { uiKitIcons } from '@dotdev/icons'
import { extendRoute } from '@dotdev/studio/vite'

const svgoConfig = {
  plugins: [{ name: 'preset-default' as const, params: { overrides: { removeViewBox: false as const } } }],
}

export default defineConfig({
  server: {
    host: true,
  },
  optimizeDeps: {
    exclude: ['@dotdev/studio'],
  },
  plugins: [
    VueRouter({ routesFolder: ['./src/pages'], exclude: ['**/examples/**'], extendRoute }),
    vue(),
    tailwindcss(),
    AutoImport({ imports: { '@dotdev/studio': ['defineExample'] } }),
    svgLoader({ svgoConfig }),
    uiKitIcons({ outDir: './src/generated/icons' }),
  ],
})
