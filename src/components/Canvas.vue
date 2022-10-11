<script setup lang="ts">
import { useCanvasStore } from '../store/canvas'
import { konvaConfig, shapeConfig, handleStageMouseDown, handleTransformEnd } from '../utils/ts/canvas'
import { Tool } from '../types/index';
import { onMounted, ref } from 'vue';
import { log } from 'console';

const canvasStore = useCanvasStore()

const transformer = ref(null)

const dragHandler = (isOver: Boolean) => {
  if (canvasStore.isAddingAllowed === isOver) {
    return
  }
  canvasStore.changeAddingStatus(isOver)
}
</script>

<template>
  <section class="canvas-section">
    <h2 class="canvas-section__label">Canvas Name</h2>

    <div class="canvas-section__canvas" @dragover.prevent="dragHandler(true)" @dragleave="dragHandler(false)">
      <v-stage :config="konvaConfig" @mousedown="handleStageMouseDown($event, transformer)" @touchstart="handleStageMouseDown($event, transformer)">
        <v-layer>
          <component v-for="(tool, idx) of canvasStore.tools" :key="idx" :is="tool.konvaName"
            :config="shapeConfig(tool as Tool)" @transformend="handleTransformEnd">
          </component>
          <v-transformer ref="transformer" />
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

  &__label {
    color: #465461;
  }

  &__canvas {
    width: 800px;
    height: 1120px;

    margin: auto;

    //border: 2px solid #ccc;
    box-shadow: 0 0 5px 1px #bebebe;
    background-color: #fff;
  }
}
</style>
