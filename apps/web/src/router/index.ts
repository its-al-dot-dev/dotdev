import { createRouter, createWebHistory } from "vue-router";
import { handleHotUpdate, routes } from "vue-router/auto-routes";

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      const el = document.querySelector(to.hash);
      if (!el) return savedPosition || { top: 0 };

      const rect = el.getBoundingClientRect();

      return {
        top: rect.top + window.scrollY - 40,
        behavior: "smooth",
      };
    }
  },
});

if (import.meta.hot) {
  handleHotUpdate(router);
}
