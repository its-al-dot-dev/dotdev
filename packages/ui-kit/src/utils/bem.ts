export type BemClassResult = [string, Record<string, boolean>]

export type BemModifier =
  | string
  | number
  | boolean
  | null
  | undefined
  | BemModifier[]
  | Record<string, boolean | number | string | null | undefined>

export function bem(root: string, ...args: BemModifier[]): BemClassResult {
  const classes: Record<string, boolean> = {}

  function parse(item: BemModifier) {
    if (!item) return

    if (typeof item === 'string' || typeof item === 'number') {
      classes[`${root}--${item}`] = true
      return
    }

    if (Array.isArray(item)) {
      item.forEach(parse)
      return
    }

    if (typeof item === 'object') {
      for (const key in item) {
        const val = item[key]
        if (!val) continue

        if (typeof val === 'boolean') {
          classes[`${root}--${key}`] = true
        } else {
          classes[`${root}--${key}-${val}`] = true
        }
      }
    }
  }

  args.forEach(parse)

  return [root, classes]
}
