<script lang="ts" setup>
import { ScrollArea } from '@dotdev/ui-kit'
import { useCodeHighlight } from './composables/useCodeHighlight.ts'

interface Props {
  code: string
  lang?: string
}

const props = defineProps<Props>()

const LANG_BY_EXTENSION: Record<string, string> = {
  vue: 'vue',
  ts: 'typescript',
  tsx: 'typescript',
  mts: 'typescript',
  js: 'javascript',
  jsx: 'javascript',
  mjs: 'javascript',
  css: 'css',
  scss: 'scss',
  json: 'json',
  html: 'html',
  md: 'markdown',
  sh: 'bash',
  bash: 'bash',
}

const { htmlCode } = useCodeHighlight(() => props.code, { lang: LANG_BY_EXTENSION[props.lang ?? 'vue'] })
</script>

<template>
  <ScrollArea class="doc-code">
    <div class="doc-code__raw" v-html="htmlCode" />
  </ScrollArea>
</template>

<style>
.shiki {
  code {
    counter-reset: step;
    counter-increment: step 0;
  }

  code .line::before {
    content: counter(step);
    counter-increment: step;
    width: 3rem;
    padding-right: 1rem;
    display: inline-block;
    text-align: right;
    opacity: 0.5;
  }
}
</style>
