<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Transformer } from 'konva/lib/shapes/Transformer'
import { DocumentDownload, Save, UserProfile } from '@vicons/carbon'
import { Stage } from 'konva/lib/Stage';
import { useLoadingBar } from 'naive-ui'
import { useMessage } from 'naive-ui'

import { konvaConfig, transformerConfig, handleStageMouseDown, handleTransformEnd, exportToPDF, saveCanvas } from '../../utils/ts/canvas'
import { useCanvasStore } from '../../store/canvas'
import CanvasGrid from './CanvasGrid.vue'

const canvasStore = useCanvasStore()
const message = useMessage()
const loadingBar = useLoadingBar()

const transformer = ref<Transformer | null>(null)
const stage = ref<Stage | null>(null)
const showModal = ref<Boolean>(false)
const savingCanvas = ref<Boolean>(false)
const loadingBarTargetRef = ref<HTMLElement | undefined>(undefined)

const fileData = reactive<{name: string, type: string, saveTo: string}>({
  name: 'canvas',
  type: '.pdf',
  saveTo: ''
})
const fileExtensions = [
  {
  label: '.pdf',
  value: 'pdf',
  },
  {
  label: '.png',
  value: 'png',
  },
  {
  label: '.jpeg',
  value: 'jpeg',
  },
  {
  label: '.svg',
  value: 'svg',
  }
]


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

const selectSavePlace = ($event: MouseEvent) => {
  const target = $event.target as HTMLElement
  const targetBtn = target?.closest('.place-btn') as HTMLElement
  
  if (!targetBtn || fileData.saveTo === targetBtn.dataset.saveTo) return
  
  fileData.saveTo = targetBtn.dataset.saveTo || ''
}

const saveCanvasHandler = () => {
  if (!fileData.saveTo || !fileData.name) {
    // TODO: show error + validation
    return
  }

  savingCanvas.value = true

  message.info('The download will start in a few seconds')

  setTimeout(() => {
    if (fileData.saveTo === 'account') {
      loadingBar.start()
      saveCanvas()
    } else {
      exportToPDF(stage.value)
    }
    
    showModal.value = false
    fileData.saveTo = ''

    savingCanvas.value = false
  }, 2000)
}
</script>

<!-- Grid 2.0 -->
<!-- https://codepen.io/pierrebleroux/pen/gGpvxJ?editors=0010 -->
<template>
  <section class="canvas-section">
    <div class="canvas-section__label">
      <h2>Canvas Name</h2>
      <n-icon size="30" :component="Save" @click="showModal = true" />
    </div>
    
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

    <n-loading-bar-provider
      :to="loadingBarTargetRef"
      container-style="position: absolute;"
    >
      <n-modal
      ref="loadingBarTargetRef"
      v-model:show="showModal"
      preset="card"
      :style="{width: '400px'}"
      title="Save"
      size="huge"
      :segmented="{content: 'soft', footer: 'soft'}"
      footer-style="text-align: center"
    >

    <div class="canvas-section__save-modal">
      <h3 style="margin-top: 0">Save canvas to:</h3>
      <div class="modal-where-btns" @click="selectSavePlace">
        <div :class="[fileData.saveTo === 'account' ? 'btn-active' : '', 'place-btn']"
              data-save-to="account">
          <h2>Account</h2>
          <n-icon size="50" :component="UserProfile" />
        </div>
        <div :class="[fileData.saveTo === 'device' ? 'btn-active' : '', 'place-btn']"
              data-save-to="device">
          <h2>Device</h2>
          <n-icon size="50" :component="DocumentDownload" />
        </div>
      </div>
    </div>
    <n-divider />

    <div>
      <h3 style="margin-top: 0">File name and extention:</h3>
      <n-input-group>
        <n-input
          v-model:value="fileData.name"
          type="text"
          placeholder="File name"
        />
        <n-select v-model:value="fileData.type" :options="fileExtensions" style="width: 33%" />
      </n-input-group>
    </div>
    <template #footer>
      <n-button type="primary" size="medium" :disabled="savingCanvas" style="width: 90px" @click="saveCanvasHandler">Save</n-button>
    </template>
      </n-modal>
      <loading-bar-trigger />
    </n-loading-bar-provider>

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
    @include flex-row;
    width: 100%;
    padding: 0 10px;
  
    box-sizing: border-box;
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
  &__save-modal {
    @include flex-column;
    gap: 20px;

    h3 {
      align-self: flex-start;
      margin: 0;
    }

    .modal-where-btns {
      @include flex-row;
      width: 100%;
      gap: 30px;

      .place-btn {
        min-width: 100px;
        flex: 1;
        text-align: center;

        border: 2px solid #6e6e6e;
        border-radius: 7px;

        cursor: pointer;
        transition: all .25s ease-in-out;

        &:hover {
          box-shadow: 0 0 5px 2px #989fa7;
          transform: scale(1.05);
        }

        > h2, i {
          margin: 10px 0;
        }
      }

      &:hover > .place-btn:not(:hover) {
        opacity: 0.5;
      }
    }
  }
}

.modal-save-btn {
  text-align: center;
}
.btn-active {
  box-shadow: 0 0 5px 2px #989fa7;
  border-color: #a0ffcf !important;
  background-color: #a0ffcf;
}
</style>
