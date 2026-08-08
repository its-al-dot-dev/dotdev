<script lang="ts" setup>
// import { computed, onMounted, onUnmounted, ref } from 'vue'
// import type { DocConfig } from '../../docs/config.ts'
//
// interface Props {
//   config: DocConfig
// }
//
// const props = defineProps<Props>()
//
// const groups = computed(() => {
//   return Object.entries(props.config.blocks).map(([key, blocks]) => ({
//     key,
//     title: key.charAt(0).toUpperCase() + key.slice(1),
//     items: Object.entries(blocks).map(([id, block]) => ({ id, title: block.title ?? id })),
//   }))
// })
//
// const activeId = ref('')
// let observer: IntersectionObserver | null = null
//
// onMounted(() => {
//   const ids = groups.value.flatMap((group) => group.items.map((item) => item.id))
//
//   observer = new IntersectionObserver(
//     (entries) => {
//       for (const entry of entries) {
//         if (entry.isIntersecting) {
//           activeId.value = entry.target.id
//         }
//       }
//     },
//     { rootMargin: '-80px 0px -65% 0px' }
//   )
//
//   for (const id of ids) {
//     const el = document.getElementById(id)
//     if (el) observer.observe(el)
//   }
// })
//
// onUnmounted(() => {
//   observer?.disconnect()
// })
</script>

<template>
  <!--  <aside class="doc-sidebar">-->
  <!--    <p class="doc-sidebar__title">On this page</p>-->

  <!--    <nav class="doc-sidebar__nav">-->
  <!--      <template v-for="group in groups" :key="group.key">-->
  <!--        <div class="doc-sidebar__group">-->
  <!--          <RouterLink :to="`#${group.key}`" class="doc-sidebar__group-title">-->
  <!--            {{ group.title }}-->
  <!--          </RouterLink>-->

  <!--          <RouterLink-->
  <!--            v-for="item in group.items"-->
  <!--            :key="item.id"-->
  <!--            :class="{ 'doc-sidebar__link&#45;&#45;active': activeId === item.id }"-->
  <!--            :to="`#${item.id}`"-->
  <!--            class="doc-sidebar__link"-->
  <!--          >-->
  <!--            {{ item.title }}-->
  <!--          </RouterLink>-->
  <!--        </div>-->
  <!--      </template>-->
  <!--    </nav>-->
  <!--  </aside>-->
</template>

<style>
@reference 'tailwindcss';

.doc-sidebar {
  @apply sticky top-24 w-64 shrink-0 max-h-[calc(100vh-6rem)] overflow-y-auto;
}

.doc-sidebar__title {
  @apply uppercase tracking-wider mb-4;
}

.doc-sidebar__nav {
  @apply flex flex-col gap-5;
}

.doc-sidebar__group {
  @apply flex flex-col gap-0.5;
}

.doc-sidebar__group-title {
  @apply mb-1 px-3;
}

.doc-sidebar__link {
  @apply text-sm px-3 py-1.5 border-l-2 border-transparent -ml-px transition-colors;
}

.doc-sidebar__link:hover {
}

.doc-sidebar__link--active {
  @apply font-medium;
}
</style>
