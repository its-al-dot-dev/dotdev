type GenericObject = Record<string | symbol, any>

function isObject(item: unknown): item is GenericObject {
  return (
    item !== null &&
    typeof item === 'object' &&
    !Array.isArray(item) &&
    !(item instanceof Date) &&
    !(item instanceof RegExp)
  )
}

export function deepMerge<T extends GenericObject>(target: T, ...sources: Array<GenericObject | undefined | null>): T {
  if (!sources.length) return target

  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    const output = target as GenericObject

    for (const key of Reflect.ownKeys(source)) {
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        continue
      }

      const targetValue = output[key]
      const sourceValue = source[key]

      if (isObject(sourceValue)) {
        if (!isObject(targetValue)) {
          output[key] = {}
        }
        deepMerge(output[key], sourceValue)
      } else if (Array.isArray(sourceValue)) {
        output[key] = [...sourceValue]
      } else if (sourceValue !== undefined) {
        output[key] = sourceValue
      }
    }
  }

  return deepMerge(target, ...sources)
}
