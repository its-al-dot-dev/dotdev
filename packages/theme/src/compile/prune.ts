import postcss from 'postcss'

export function stripBanner(css: string): string {
  return css.replace(/^\/\*![\s\S]*?\*\/\s*/, '')
}

export function collectLocals(root: postcss.Container): Map<string, string> {
  const locals = new Map<string, string>()
  root.walkDecls((decl) => {
    if (decl.prop.startsWith('--')) locals.set(decl.prop, decl.value)
  })
  return locals
}

export function collectPropertyValues(root: postcss.Container): Map<string, string> {
  const values = new Map<string, string>()
  for (const node of root.nodes ?? []) {
    if (node.type === 'atrule') {
      const atRule = node as postcss.AtRule
      let initial: string | undefined
      atRule.walkDecls((decl) => {
        if (decl.prop === 'initial-value') initial = decl.value
      })
      if (initial != null) values.set(atRule.name.trim(), initial)
    }
  }
  return values
}

export function pruneEmptyRules(root: postcss.Container): void {
  root.each((node) => {
    if (node.type !== 'rule' && node.type !== 'atrule') return
    if (node.nodes) pruneEmptyRules(node)
    if (!node.nodes || node.nodes.length === 0) node.remove()
  })
}

export function removeTailwindDecls(ast: postcss.Root): void {
  ast.walkDecls((decl) => {
    if (decl.prop.startsWith('--tw-')) decl.remove()
  })
}

export function isPropertiesLayer(node: postcss.Node): boolean {
  if (node.type !== 'atrule') return false
  const atRule = node as postcss.AtRule
  return atRule.name === 'layer' && atRule.params.trim() === 'properties'
}
