<script setup lang="ts">
import Creator from './views/Creator.vue'
</script>

<template>
  <n-message-provider>
    <Creator />
  </n-message-provider>
</template>

<style>
/* Overriding the default color of the active tab */
.n-tabs-tab--active {
  background-color: #deefff !important;
}
</style>