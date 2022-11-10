<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Main from './layouts/Main.vue';
import Login from './layouts/Login.vue';

const route = useRoute()

const layout = computed(() => {
  return route.path === '/login' ? Login : Main
})
</script>

<template>
  <component :is="layout"/>
</template>
