import { createRouter, createWebHistory } from "vue-router"

const routes = [
  { path: '/', name: 'Templates', component: () => import('../views/Templates.vue') },
  { path: '/profile', name: 'Profile', component: () => import('../views/Profile.vue') },
  { path: '/settings', name: 'Settings', component: () => import('../views/Settings.vue') },
  { path: '/creator', name: 'Creator', component: () => import('../views/Creator.vue') },
  { path: '/login', name: 'Login', component: () => import('../layouts/Login.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
