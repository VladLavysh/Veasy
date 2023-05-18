<script setup lang="ts">
import { onMounted, ref, reactive, computed } from 'vue';
import { Transformer } from 'konva/lib/shapes/Transformer'
import { Stage } from 'konva/lib/Stage';
import { Shape } from 'konva/lib/Shape';
import { Save, UserProfile, SettingsAdjust } from '@vicons/carbon'
import { MessageReactive, NButton, NIcon, useMessage } from 'naive-ui'
import { canvasBackgroundConfig, transformerConfig, handleStageMouseDown, handleTransformEnd, downloadCanvas, saveCanvas, checkAvaliableDragPlace } from '../../utils/ts/canvas'
import { ToolShadowConfig } from '../../types/index'
import { useCanvasStore } from '../../store/canvas'
import SaveModal from './SaveModal.vue'
import CanvasGrid from './CanvasGrid.vue'
import SettingsModal from './SettingsModal.vue';

const transformer = ref<Transformer | null>(null)
const stage = ref<Stage | null>(null)
const shadow = ref<Shape | null>(null)
const savingCanvas = ref<Boolean>(false)
const showSaveModal = ref<Boolean>(false)
const showCanvasSettingsModal = ref<Boolean>(false)
let shadowPosition = reactive<ToolShadowConfig>({
  width: 0,
  height: 0,
  x: null,
  y: null,
  rotation: 0,
  fill: '#56e398',
  opacity: 0.5,
  stroke: '#37ba74',
  strokeWidth: 2,
  dash: [15, 2],
})

const message = useMessage()
const canvasStore = useCanvasStore()

const gridStatus = computed(() => canvasStore.canvasSettings.gridStatus)
const isGridVisible = computed(() => canvasStore.showGrid || gridStatus.value === 'always')
const isShadowVisible = computed(() => canvasStore.showShapeShadow)

const stageConfig = computed(() => {
  const { width, height } = canvasStore.canvasSettings

  return { width, height }
})

const stageBackgroundConfig = computed(() => {
  return {
    ...canvasBackgroundConfig,
    ...stageConfig.value,
    fill: canvasStore.canvasSettings.backgroundColor
  }
})

const dragHandler = (isOver: Boolean) => {
  if (canvasStore.isAddingAllowed === isOver) {
    return
  }

  if (gridStatus.value === 'default') {
    canvasStore.changeGridStatus(isOver)
  }
  canvasStore.changeAddingStatus(isOver)
}

const dragEndHandler = (event: MouseEvent) => {
  if (gridStatus.value === 'default') {
    canvasStore.changeGridStatus(false)
  }
  canvasStore.changeShadowStatus(false)

  handleTransformEnd(event, shadowPosition.x, shadowPosition.y)
}

const tranAndDragStartHandler = () => {
  if (gridStatus.value === 'default') {
    canvasStore.changeGridStatus(true)
  }
  canvasStore.changeShadowStatus(true)
}

const renderShadow = (e: { evt: MouseEvent }) => {
  const shapeTransformer = transformer.value?.getNode()

  if (!shapeTransformer) return

  const shadowCoords = e.evt.ctrlKey
    ? {
      x: shapeTransformer.x(),
      y: shapeTransformer.y()
    }
    : {
      x: Math.round(shapeTransformer.x() / 20) * 20,
      y: Math.round(shapeTransformer.y() / 20) * 20
    }

  const updatedData = {
    ...shadowCoords,
    width: shapeTransformer.width(),
    height: shapeTransformer.height(),
    rotation: shapeTransformer.rotation()
  }

  shadowPosition = Object.assign(shadowPosition, updatedData)
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

onMounted(() => {
  canvasStore.setTransformer(transformer.value as Transformer)
})
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
      <v-stage :config="stageConfig" ref="stage" @touchstart="handleStageMouseDown($event)"
        @mousedown="handleStageMouseDown($event)">

        <v-layer>
          <!-- BG for png\jpeg -->
          <v-rect :config="stageBackgroundConfig" />

          <!-- Grid -->
          <CanvasGrid v-if="isGridVisible" :key="[stageConfig.width, stageConfig.height].toString()" />

          <!-- Shape shadow -->
          <v-rect v-if="isShadowVisible" :config="shadowPosition" ref="shadow" />

          <!-- Shapes -->
          <component v-for="(tool, idx) of canvasStore.tools" :key="idx" :is="tool.konvaName" :config="tool"
            @transformstart="tranAndDragStartHandler" @transform="renderShadow" @transformend="dragEndHandler"
            @dragstart="tranAndDragStartHandler" @dragmove="renderShadow" @dragend="dragEndHandler" />

          <!-- Transformer for shapes -->
          <!--@dragmove="checkAvaliableDragPlace(false)"-->
          <v-transformer :config="transformerConfig" ref="transformer" />
        </v-layer>
      </v-stage>
    </div>

    <n-icon class="canvas-section__save" size="30" :component="Save" @click="showSaveModal = true"
      title="Save canvas" />

    <SaveModal v-model:isOpen="showSaveModal" v-model:isSaving="savingCanvas" @close="showSaveModal = false"
      @save="saveCanvasHandler" />

    <SettingsModal v-model:isOpen="showCanvasSettingsModal" @close="showCanvasSettingsModal = false" />
  </section>
</template>

<style scoped lang="scss">
@import '../../utils/css/mixins.scss';

.canvas-section {
  width: 100%;
  min-height: 100vh;
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
    white-space: nowrap;
    color: #465461;

    margin-left: 122px;

    transition: all .25s ease-in-out;
  }

  &__header-buttons,
  i {
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
    width: fit-content;

    margin: auto;

    box-shadow: 0 0 5px 1px #bebebe;
    background-color: #fff;
  }

  &__save {
    position: fixed;
    bottom: 25px;
    right: 330px;

    width: 50px;
    height: 50px;

    display: grid;
    place-items: center;

    border-radius: 10px;
    color: #fff;
    background-color: #7F91A1;

    cursor: pointer;
    transition: all .25s ease-in-out;

    &:hover {
      //color: rgb(32, 32, 32);
      box-shadow: 0 0 5px 0 #484848;
      transform: scale(1.1);
    }
  }
}

.header-scrolled {
  @include flex-row;

  // height: 35px;
  width: 100%;
  justify-content: space-between;

  padding: 0 100px;
  margin: auto;

  font-size: 0.75rem;

  background-color: #ffffff86;

  .canvas-section__label {
    flex: unset;
    margin-left: 20px;
  }

  .canvas-section__header-buttons {
    gap: 0;
  }

  i {
    font-size: 25px;
  }
}
</style>
