<script setup lang="ts">
import { Tool } from '../../types';
import { shapeConfig } from '../../utils/ts/index'

defineProps({
  tool: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <component :is="tool.konvaName" :config="shapeConfig(tool as Tool)" />
</template>
    
<style scoped lang="scss">

</style>