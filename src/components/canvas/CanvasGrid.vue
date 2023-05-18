<script setup lang="ts">
import { onMounted } from 'vue';
import { useCanvasStore } from '../../store/canvas';

const canvasStore = useCanvasStore()
const { width, height } = canvasStore.canvasSettings

//const dividerX = width / 30
//const dividerY = height / 30
const divider = 20
const xLinesCount = Math.round(width / divider)
const yLinesCount = Math.round(height / divider)
onMounted(() => {
  console.log('CanvasGrid mounted')
})
</script>

<!-- Grid 2.0 -->
<!-- https://codepen.io/pierrebleroux/pen/gGpvxJ?editors=0010 -->
<template>
  <v-group>
    <!-- Lines by X coordinates -->
    <v-line v-for="n in xLinesCount" :key="n" :config="{
      x: n * divider,
      y: 0,
      points: [0, 0, 0, height],
      stroke: '#ccc',
      strokeWidth: 1,
      opacity: 0.6,
    }" />
    <!-- Lines by Y coordinates -->
    <v-line v-for="n in yLinesCount" :key="n" :config="{
      x: 0,
      y: n * divider,
      points: [0, 0, width, 0],
      stroke: '#ccc',
      strokeWidth: 1,
      opacity: 0.6,
    }" />
  </v-group>
</template>

<style scoped>

</style>
