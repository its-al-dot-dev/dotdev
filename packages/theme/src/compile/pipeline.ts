import fs from 'node:fs/promises'
import path from 'node:path'
import postcss from 'postcss'
import { compileWithTailwind } from './tailwind'
import { collectLocals, collectPropertyValues, pruneEmptyRules, removeTailwindDecls, stripBanner, isPropertiesLayer } from './prune'
import { createVarResolver, type VarResolver } from './resolve'
import { inlineVars } from './inline'
import { toComponentTemplate } from './template'

const ENTRY = '@import "tailwindcss/utilities" source(none);'
const REFERENCE = ['@reference "tailwindcss";', '@reference "./utilities.css";'].join('\n')

export interface CompileOptions {
  namespace: string
  utilitiesCss: string
  from?: string
}

export interface CompileResult {
  template: string
  hasContent: boolean
}

export async function compileComponentRules(
  rules: string,
  options: CompileOptions,
): Promise<CompileResult> {
  const { namespace, from } = options

  const buildDir = from ? path.dirname(from) : path.join(process.cwd(), '.build', `theme-${Date.now()}`)
  const selfManaged = !from

  if (selfManaged) {
    await fs.mkdir(buildDir, { recursive: true })
    await fs.writeFile(path.join(buildDir, 'utilities.css'), options.utilitiesCss)
  }

  try {
    const fromPath = from ?? path.join(buildDir, 'rules.css')
    const compiled = await compileWithTailwind(
      [ENTRY, REFERENCE, rules].join('\n'),
      fromPath,
    )



    const stripped = stripBanner(compiled)
    if (!stripped.trim()) return { template: '', hasContent: false }

    const ast = postcss.parse(stripped)

    const propertyValues = collectPropertyValues(ast)
    const locals = collectLocals(ast)
    const resolver = createVarResolver(locals, propertyValues, namespace)

    for (const node of ast.nodes ?? []) {
      if (node.type !== 'rule') continue
      node.walkDecls((decl) => {
        if (decl.prop.startsWith('--tw-')) return
        decl.value = inlineVars(decl.value, resolver)
      })
    }

    removeTailwindDecls(ast)
    pruneEmptyRules(ast)

    const componentNodes: string[] = []
    for (const node of ast.nodes ?? []) {
      if (node.type === 'atrule' && node.name === 'property') continue
      if (isPropertiesLayer(node)) continue
      componentNodes.push(node.toString())
    }

    const template = toComponentTemplate(componentNodes.join('\n'), namespace)
    return { template, hasContent: true }
  } finally {
    if (selfManaged) {
      await fs.rm(buildDir, { recursive: true, force: true })
    }
  }
}
