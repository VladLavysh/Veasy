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
  <n-message-provider>
    <n-loading-bar-provider>
      <component :is="layout"/>
    </n-loading-bar-provider>
  </n-message-provider>
</template>
