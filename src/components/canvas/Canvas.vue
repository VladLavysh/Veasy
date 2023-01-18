<script setup lang="ts">
import { ref } from 'vue';
import { Transformer } from 'konva/lib/shapes/Transformer'
import { Save } from '@vicons/carbon'
import { Stage } from 'konva/lib/Stage';
import { MessageReactive, useMessage } from 'naive-ui'

import { konvaConfig, transformerConfig, handleStageMouseDown, handleTransformEnd, exportToPDF, saveCanvas } from '../../utils/ts/canvas'
import { useCanvasStore } from '../../store/canvas'
import SaveModal from './SaveModal.vue'
import CanvasGrid from './CanvasGrid.vue'

const message = useMessage()
const canvasStore = useCanvasStore()

const transformer = ref<Transformer | null>(null)
const stage = ref<Stage | null>(null)
const savingCanvas = ref<Boolean>(false)
const showModal = ref<Boolean>(false)

const dragHandler = (isOver: Boolean) => {
  if (canvasStore.isAddingAllowed === isOver) {
    return
  }

  canvasStore.changeGridStatus(isOver)
  canvasStore.changeAddingStatus(isOver)
}

const dragEndHandler = (event: MouseEvent) => {
  canvasStore.changeGridStatus(false)
  handleTransformEnd(event)
}

const saveCanvasHandler = (fileData: { name: string, type: string, saveTo: string }) => {
  //if (!canvasStore.tools.length) {
  //  message.info('There is nothing to save')
  //  return
  //}

  const messageReactive: MessageReactive | null = fileData.saveTo === 'account'
    ? message.loading('Saving...')
    : message.info('The download should start in a few seconds.')

  setTimeout(() => {
    if (fileData.saveTo === 'account') {
      //saveCanvas()
      message.success('Saved successfully!')
    } else {
      //exportToPDF(stage.value)
    }

    showModal.value = false
    savingCanvas.value = false
    messageReactive?.destroy()
  }, 2000)
}
</script>

<template>
  <section class="canvas-section">
    <h2 class="canvas-section__label">Canvas Name</h2>

    <div class="canvas-section__canvas" @dragover.prevent="dragHandler(true)" @dragleave="dragHandler(false)">
      <v-stage :config="konvaConfig" ref="stage" @touchstart="handleStageMouseDown($event, transformer)"
        @mousedown="handleStageMouseDown($event, transformer)">

        <v-layer>
          <CanvasGrid v-if="canvasStore.showGrid" />

          <component v-for="(tool, idx) of canvasStore.tools" :key="idx" :is="tool.konvaName" :config="tool"
            @transformend="handleTransformEnd" @dragstart="canvasStore.changeGridStatus(true)"
            @dragend="dragEndHandler" />

          <v-transformer :config="transformerConfig" ref="transformer" />
        </v-layer>
      </v-stage>
    </div>

    <n-icon class="canvas-section__save" size="30" :component="Save" @click="showModal = true" />

    <SaveModal :isOpen="showModal" v-model:isSaving="savingCanvas" @close="showModal = false"
      @save="saveCanvasHandler" />
  </section>
</template>

<style scoped lang="scss">
@import '../../utils/css/mixins.scss';

.canvas-section {
  width: 100%;
  padding: 0 20px 40px;

  overflow-y: scroll;
  background-color: #D3E1ED;

  &__label {
    width: 100%;
    text-align: center;

    color: #465461;

    h2 {
      flex: 1;
    }

    i {
      cursor: pointer;
      transition: all .25s ease-in-out;

      border-radius: 5px;

      &:hover {
        color: rgb(32, 32, 32);
        box-shadow: 0 0 5px 2px #a8b8c7;
      }
    }
  }

  &__canvas {
    width: 800px;
    height: 1120px;

    margin: auto;

    //border: 2px solid #ccc;
    box-shadow: 0 0 5px 1px #bebebe;
    background-color: #fff;
  }

  &__save {
    position: sticky;
    bottom: -20px;
    left: 95%;

    width: 50px;
    height: 50px;

    display: grid;
    place-items: center;

    cursor: pointer;
    transition: all .25s ease-in-out;

    border-radius: 10px;

    color: #fff;
    background-color: #7F91A1;

    &:hover {
      //color: rgb(32, 32, 32);
      box-shadow: 0 0 5px 0 #000000;
    }
  }
}
</style>
