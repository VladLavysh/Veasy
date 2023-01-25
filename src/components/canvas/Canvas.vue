<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { Transformer } from 'konva/lib/shapes/Transformer'
import { Stage } from 'konva/lib/Stage';
import { Save, UserProfile, SettingsAdjust } from '@vicons/carbon'
import { MessageReactive, useMessage } from 'naive-ui'
import { konvaConfig, canvasBackgroundConfig, transformerConfig, handleStageMouseDown, handleTransformEnd, downloadCanvas, saveCanvas } from '../../utils/ts/canvas'
import { useCanvasStore } from '../../store/canvas'
import SaveModal from './SaveModal.vue'
import CanvasGrid from './CanvasGrid.vue'
import SettingsModal from './SettingsModal.vue';
import { log } from 'console';

const message = useMessage()
const canvasStore = useCanvasStore()

const transformer = ref<Transformer | null>(null)
const stage = ref<Stage | null>(null)
const savingCanvas = ref<Boolean>(false)
const showSaveModal = ref<Boolean>(false)
const showCanvasSettingsModal = ref<Boolean>(false)

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
  if (!canvasStore.tools.length) {
    message.info('Canvas is clear - there is nothing to save')
    return
  }

  const messageReactive: MessageReactive | null = fileData.saveTo === 'account'
    ? message.loading('Saving...')
    : message.info('The download should start in a few seconds.')

  setTimeout(() => {
    if (fileData.saveTo === 'account') {
      message.loading('Saving canvas to db...')
      saveCanvas()
      message.success('Saved successfully!')
    } else {
      downloadCanvas({ ...stage.value } as Stage, fileData.name, fileData.type)
    }

    showSaveModal.value = false
    savingCanvas.value = false
    messageReactive?.destroy()
  }, 2000)
}

const changeHeaderStyle = (event: Event) => {
  const target = event.target as HTMLElement
  const header = document.querySelector('.canvas-section__header') as HTMLElement

  if (target.scrollTop > 40 && header.classList.contains('header-scrolled')) {
    return
  }

  header.classList.toggle('header-scrolled', target.scrollTop > 40)
}
</script>

<template>
  <section class="canvas-section" @scroll="changeHeaderStyle">
    <div class="canvas-section__header">
      <h2 class="canvas-section__label">{{ canvasStore.canvasSettings.name }}</h2>
      <div class="canvas-section__header-buttons">
        <n-button quaternary type="info" size="large" title="Canvas settings">
          <template #icon>
            <n-icon color="#5e6b77" :component="SettingsAdjust" @click="showCanvasSettingsModal = true" />
          </template>
        </n-button>
        <n-button quaternary type="info" size="large" title="User profile">
          <template #icon>
            <n-icon color="#5e6b77" :component="UserProfile" />
          </template>
        </n-button>
      </div>
    </div>

    <div class="canvas-section__canvas" @dragover.prevent="dragHandler(true)" @dragleave="dragHandler(false)">
      <v-stage :config="konvaConfig" ref="stage" @touchstart="handleStageMouseDown($event, transformer)"
        @mousedown="handleStageMouseDown($event, transformer)">

        <v-layer>
          <v-rect :config="{...canvasBackgroundConfig, fill: canvasStore.canvasSettings.backgroundColor}" /> <!-- bg for png\jpeg -->

          <CanvasGrid v-if="canvasStore.showGrid" /> <!-- grid -->

          <component v-for="(tool, idx) of canvasStore.tools" :key="idx" :is="tool.konvaName" :config="tool"
            @transformend="handleTransformEnd" @dragstart="canvasStore.changeGridStatus(true)"
            @dragend="dragEndHandler" /> <!-- shapes -->

          <v-transformer :config="transformerConfig" ref="transformer" /> <!-- transformer for shapes -->
        </v-layer>
      </v-stage>
    </div>

    <n-icon class="canvas-section__save" size="30" :component="Save" @click="showSaveModal = true" title="Save canvas" />

    <SaveModal v-model:isOpen="showSaveModal" v-model:isSaving="savingCanvas" @close="showSaveModal = false"
      @save="saveCanvasHandler" />

    <SettingsModal v-model:isOpen="showCanvasSettingsModal" @close="showCanvasSettingsModal = false" />
  </section>
</template>

<style scoped lang="scss">
@import '../../utils/css/mixins.scss';

.canvas-section {
  width: 100%;
  padding-bottom: 40px;

  overflow-y: scroll;
  background-color: #D3E1ED;

  &__header {
    @include flex-row;
    justify-content: space-between;

    height: 70px;
    width: 800px;
    position: sticky;
    top: 0;
    
    margin: auto;
    
    z-index: 8;
    
    transition: all .25s ease-in-out;
    box-sizing: border-box;
  }

  &__label {
    align-self: center;
    flex: 1;
    text-align: center;
    color: #465461;

    margin-left: 122px;
  }

  &__header-buttons, i {
    transition: all .25s ease-in-out;
  } 
  &__header-buttons {
    display: flex;
    gap: 10px;
    
  }
  &__header-buttons i {
    font-size: 30px;
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

.header-scrolled {
  @include flex-row;

  // height: 35px;
  width: 800px;
  justify-content: space-between;

  padding: 0;
  margin: auto;

  font-size: 0.75rem;

  background-color: #ffffff86;

  .canvas-section__header-buttons {
    gap: 0;
  }

  i {
    font-size: 25px;
  }
}
</style>
