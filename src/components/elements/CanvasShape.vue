<!-- NOT IN USE !!!!!!!!!!! -->
<!--import CanvasShape from './elements/CanvasShape.vue'-->
<!--<CanvasShape v-for="(tool, idx) of canvasStore.tools" :key="idx" :tool="tool" />-->

<script setup lang="ts">
import { Tool } from '../../types';
import { shapeConfig } from '../../utils/ts/canvas'

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