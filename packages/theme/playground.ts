import { createTheme } from './src/runtime/create-theme.ts'
import * as fs from 'fs'
import * as path from 'path'
import { resolveTemplate } from './src/runtime/resolve-template.ts'
import button from './src/generated/button.ts'

function injectCSSToFile(css: string, id: string, update: boolean): void {
  const distDir = path.join(__dirname, 'dist')

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true })
  }

  const filePath = path.join(distDir, `${id}.css`)

  if (fs.existsSync(filePath) && !update) {
    console.log(`File ${filePath} already exists, skipping (update=false)`)
    return
  }

  fs.writeFileSync(filePath, css, 'utf-8')
  console.log(`CSS saved to ${filePath}`)
}

const themeAPI = createTheme({
  namespace: 'myapp',
  primitives: {
    'brand-500': '#ff0000',
    'brand-600': '#cc0000',
  },
  semantics: {
    'bg-brand': ['var(--myapp-brand-500)', 'var(--myapp-brand-600)'],
    'bg-brand-hover': ['$bg-brand', '$brand-600'],
  },
  components: {
    button: {
      'bg-primary-solid': '$bg-brand',
      'bg-primary-solid-hover': '$button-bg-primary-solid',
    },
  },
})

const primitivesCSS = themeAPI.toCSS(themeAPI.config.primitives || {})
injectCSSToFile(primitivesCSS, 'primitives', true)

const semanticsCSS = themeAPI.toCSS(themeAPI.config.semantics || {})
injectCSSToFile(semanticsCSS, 'semantics', true)

const buttonCSS = themeAPI.toCSS(themeAPI.config.components?.button || {}, 'button')
injectCSSToFile(buttonCSS, 'button', true)
injectCSSToFile(resolveTemplate(button, 'myapp'), 'button-css', true)
