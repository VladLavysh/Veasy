<script setup lang="ts">
import { useCanvasStore } from '../store/canvas'
import { configKonva } from '../utils/ts'
import CanvasShape from './elements/CanvasShape.vue'

const canvasStore = useCanvasStore()

const dragHandler = (isOver: Boolean) => {
  if (canvasStore.isAddingAllowed === isOver) {
    return
  }

  canvasStore.changeAddingStatus(isOver)
}
</script>

<template>
  <section class="canvas-section">
    <h2>Canvas Name</h2>
    <div class="canvas" @dragover.prevent="dragHandler(true)" @dragleave="dragHandler(false)">
      <v-stage :config="configKonva">
        <v-layer>
          <CanvasShape v-for="(tool, idx) of canvasStore.tools" :key="idx" :tool="tool" />
        </v-layer>
      </v-stage>
    </div>
  </section>
</template>

<style scoped lang="scss">
.canvas-section {
  width: 100%;
  padding: 0 20px 40px;

  overflow-y: scroll;
  background-color: #D3E1ED;
}

.canvas {
  width: 800px;
  height: 1120px;

  margin: auto;

  //border: 2px solid #ccc;
  box-shadow: 0 0 5px 1px #bebebe;
  background-color: #fff;
}
</style>
