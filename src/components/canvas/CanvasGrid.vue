<script setup lang="ts">
import { konvaConfig } from '../../utils/ts/canvas'

const divider = 16
const xLinesCount = Math.round(konvaConfig.width / divider)
const yLinesCount = Math.round(konvaConfig.height / divider)
</script>

<template>
  <v-group>
    <!-- Lines by X coordinates -->
    <v-line v-for="n in xLinesCount" :config="{
      x: n * divider,
      y: 0,
      points: [0, 0, 0, konvaConfig.height],
      stroke: '#ccc',
      strokeWidth: 1,
      opacity: 0.6,
    }" />
    <!-- Lines by Y coordinates -->
    <v-line v-for="n in yLinesCount" :config="{
      x: 0,
      y: n * divider,
      points: [0, 0, konvaConfig.width, 0],
      stroke: '#ccc',
      strokeWidth: 1,
      opacity: 0.6,
    }" />
  </v-group>
</template>

<style scoped>

</style>
