<script setup lang="ts">
import Creator from './views/Creator.vue'
</script>

<template>
  <n-message-provider>
    <n-loading-bar-provider>
      <Creator />
    </n-loading-bar-provider>
  </n-message-provider>
</template>
