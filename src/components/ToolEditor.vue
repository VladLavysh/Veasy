<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { Unlocked, Locked } from '@vicons/carbon'
import { useCanvasStore } from '../store/canvas'
import { borderTypes } from '../utils/ts/tools'

const store = useCanvasStore()

const tool = computed(() => {
  return store.selectedTool || null
})

const lockerComponent = computed(() => {
  return tool.value?.draggable ? Unlocked : Locked
})

const lockerColor = computed(() => {
  return tool.value?.draggable
    ? '#aff9c4'
    : '#ffad9f'
})

const normalizedToolName = computed(() => {
  return tool.value
    ? tool.value.name.match(/([^_]+)/)![0]
    : ''
})

const toolBorderType = computed(() => {
  if (!tool.value) return
  if (!Array.isArray(tool.value.dash)) return

  return tool.value.dash[0] === 0
    ? 'solid'
    : 'dashed'
})

const toggleToolDraggable = () => {
  if (!tool.value) return

  tool.value.draggable = !tool.value.draggable
}

const changeToolBorder = (borderType: [0, 0] | [5, 5]) => {
  if (!tool.value) return

  tool.value.dash = borderType
}

const changeBorderVisibility = (isVisible: boolean) => {
  if (!tool.value) return

  tool.value.strokeWidth = isVisible ? 2 : 0
}
</script>

<!-- Shapes switch animation (left to right) -->
<template>
  <aside class="tool-editor">
    <h1 class="tool-editor__label">Tool Editor</h1>

    <Transition name="editor" mode="out-in">
      <div v-if="tool" class="tool-editor__items items">
        <n-divider class="items__divider" />

        <!-- Tool name -->
        <div class="items__label">
          <span>{{ normalizedToolName }}</span>
          <n-icon size="20" :color="lockerColor" :component="lockerComponent" @click="toggleToolDraggable" />
        </div>

        <!-- Color -->
        <div class="items__body">
          <h3 class="item__label">Color</h3>
          <div class="item item-no-margin" v-if="normalizedToolName !== 'Barrier'">
            <span>Fill</span>
            <n-color-picker v-model:value="tool.fill" />
          </div>
          <div class="item" v-if="normalizedToolName !== 'Arrow'">
            <span>Stroke</span>
            <n-color-picker v-model:value="tool.stroke" />
          </div>
        </div>

        <!-- Border -->
        <div class="items__body">
          <div class="item__label item__label-border">
            <h3>Border</h3>
            <n-switch @update:value="changeBorderVisibility" :value="!!tool.strokeWidth" size="small" />
          </div>
          <div class="item">
            <span>Type</span>
            <n-select :value="toolBorderType" @update:value="changeToolBorder" :options="borderTypes"
              :disabled="!(!!tool.strokeWidth)" />
          </div>
          <div class="item">
            <span>Width</span>
            <n-input-number v-model:value="tool.strokeWidth" :validator="(x: number) => x > 0"
              :disabled="!(!!tool.strokeWidth)" size="medium" />
          </div>
        </div>
      </div>
      <h3 v-else class="tool-editor__label">Choose any tool to customize</h3>
    </Transition>

  </aside>
</template>

<style scoped lang="scss">
@import '../../src/utils/css/mixins.scss';

.tool-editor {
  width: 400px;

  transition: all .3s ease-in-out;
  //overflow-y: scroll;
  background-color: #7F91A1;

  &__label {
    text-align: center;
    color: #fff;
  }

  &__items {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 15px;

    padding: 0 15px;
    color: #fff;
  }
}

.items {
  &__divider {
    margin: 10px 0 0;
  }

  &__label {
    @include flex-row;
    gap: 10px;

    span {
      height: 25px;
      font-size: 1.2rem;
    }

    i {
      color: #aff9c4;
      cursor: pointer;
    }
  }

  &__body {
    width: 100%;
  }
}

.item {
  width: 100%;
  margin-bottom: 10px;

  >span {
    font-size: 0.9rem
  }

  &-no-margin {
    margin: 0;
  }

  &__divider {
    margin: 10px 0;
  }

  &__label {
    margin: 10px 0 5px;

    &-border {
      @include flex-row;
      justify-content: space-between;

      height: 30px;
    }
  }
}

.editor-enter-active,
.editor-leave-active {
  transition: all 0.25s ease-out;
}

.editor-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}

.editor-leave-to {
  opacity: 0;
  transform: translateY(80px);
}
</style>