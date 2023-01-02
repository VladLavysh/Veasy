import { createRouter, createWebHistory } from "vue-router"

const routes = [
  { path: '/', name: 'Creator', component: () => import('../views/Creator.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
