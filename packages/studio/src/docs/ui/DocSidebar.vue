<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import type { DocExampleResult } from '../define'

interface Props {
  examples: DocExampleResult[]
}

const props = defineProps<Props>()

const activeId = ref('')
let observer: IntersectionObserver | null = null

onMounted(() => {
  const ids = props.examples.map((item) => item.id)

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeId.value = entry.target.id
      }
    },
    { rootMargin: '-80px 0px -65% 0px' },
  )

  for (const id of ids) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <aside aria-label="On this page" class="doc-sidebar">
    <p class="doc-sidebar__title">On this page</p>

    <nav class="doc-sidebar__nav">
      <a
        v-for="item in examples"
        :key="item.id"
        :class="{ 'doc-sidebar__link--active': activeId === item.id }"
        :href="`#${item.id}`"
        class="doc-sidebar__link"
      >
        {{ item.title }}
      </a>
    </nav>
  </aside>
</template>
