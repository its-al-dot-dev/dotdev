<script lang="ts" setup>
import { ScrollArea } from '@dotdev/ui-kit'
import { useCodeHighlight } from './composables/useCodeHighlight.ts'

interface Props {
  code: string
  lang?: string
}

const props = defineProps<Props>()

const { htmlCode } = useCodeHighlight(() => props.code, { lang: props.lang ?? 'vue' })
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
    color: var(--ui-text-muted);
  }
}
</style>
