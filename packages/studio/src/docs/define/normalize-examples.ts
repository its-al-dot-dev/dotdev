import type { DocExampleCode, DocExampleFile, DocExampleMeta, DocExampleResult, DocExampleSources } from './types.ts'

export function normalizeExamples(examples: DocExampleMeta[], sources: DocExampleSources): DocExampleResult[] {
  return examples.map((example) => ({
    ...example,
    id: slugify(example.title),
    preview: example.preview ?? null,
    codes: normalizeFiles([...(example.preview ? [example.preview] : []), ...(example.includes ?? [])], sources),
  }))
}

function normalizeFiles(files: DocExampleFile[], sources: DocExampleSources): DocExampleCode[] {
  const groups = Map.groupBy(Object.keys(sources), getFileBaseName)

  return files.flatMap((file) => {
    const name = typeof file === 'string' ? file : getComponentName(file)
    if (!name) return []

    return (groups.get(name) ?? []).toSorted(vueFirst).map((path) => ({
      file: getFileName(path),
      ext: getFileExtension(path),
      code: sources[path],
    }))
  })
}

function vueFirst(a: string, b: string): number {
  return Number(getFileExtension(b) === 'vue') - Number(getFileExtension(a) === 'vue')
}

function getComponentName(file: DocExampleFile): string {
  const component = file as { name?: string; __name?: string }
  return component.name ?? component.__name ?? ''
}

function getFileName(path: string): string {
  return path.split('/').pop() ?? path
}

function getFileBaseName(path: string): string {
  const name = getFileName(path)
  const dot = name.lastIndexOf('.')

  return dot === -1 ? name : name.slice(0, dot)
}

function getFileExtension(path: string): string {
  const name = getFileName(path)
  const dot = name.lastIndexOf('.')

  return dot === -1 ? '' : name.slice(dot + 1)
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w-]+/g, '')
}
