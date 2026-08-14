<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'

interface Props {
  items: { id: string; title: string }[]
}

const props = defineProps<Props>()

const activeId = ref('')
let observer: IntersectionObserver | null = null

onMounted(() => {
  const ids = props.items.map((item) => item.id)

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
  <aside class="doc-sidebar" aria-label="On this page">
    <p class="doc-sidebar__title">On this page</p>

    <nav class="doc-sidebar__nav">
      <a
        v-for="item in items"
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
