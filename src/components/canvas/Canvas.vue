<script setup lang="ts">
import { ref } from 'vue';
import { konvaConfig, transformerConfig, handleStageMouseDown, handleTransformEnd } from '../../utils/ts/canvas'
import CanvasGrid from './CanvasGrid.vue'
import { useCanvasStore } from '../../store/canvas'

const canvasStore = useCanvasStore()

const transformer = ref(null)

const dragHandler = (isOver: Boolean) => {
  if (canvasStore.isAddingAllowed === isOver) {
    return
  }

  canvasStore.changeGridStatus(isOver)
  canvasStore.changeAddingStatus(isOver)
}
</script>

<!-- Grid 2.0 -->
<!-- https://codepen.io/pierrebleroux/pen/gGpvxJ?editors=0010 -->
<template>
  <section class="canvas-section">
    <h2 class="canvas-section__label">Canvas Name</h2>
    <div class="canvas-section__canvas" @dragover.prevent="dragHandler(true)" @dragleave="dragHandler(false)">
      <v-stage :config="konvaConfig" @touchstart="handleStageMouseDown($event, transformer)"
        @mousedown="handleStageMouseDown($event, transformer)" @mouseup="canvasStore.changeGridStatus(false)">
        <v-layer>
          <CanvasGrid v-if="canvasStore.showGrid" />

          <component v-for="(tool, idx) of canvasStore.tools" :key="idx" :is="tool.konvaName" :config="tool"
            @transformend="handleTransformEnd" @dragend="handleTransformEnd">
          </component>

          <v-transformer ref="transformer" :config="transformerConfig" />
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
