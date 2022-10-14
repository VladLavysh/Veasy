<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { Unlocked, Locked } from '@vicons/carbon'
import { useCanvasStore } from '../store/canvas'

const store = useCanvasStore()

const fillSui = (color: string) => {
  console.log('COLOR', color);

}

const tool = computed(() => {
  return store.selectedTool || null
})

const lockerComponent = computed(() => {
  if (tool.value) {
    return tool.value.draggable ? Unlocked : Locked
  }
})

const normalizedToolName = computed(() => {
  return tool.value
    ? tool.value.name.match(/([^_]+)/)![0]
    : ''
})

const lockerColor = computed(() => {
  return tool.value?.draggable
    ? '#aff9c4'
    : '#ffad9f'
})

const toggleToolDraggable = () => {
  if (tool.value) {
    tool.value.draggable = !tool.value.draggable
  }
}
</script>

<template>
  <aside class="tool-editor">
    <div class="tool-editor__label">
      <h1>Tool Editor</h1>
      <h3 v-if="!tool">Choose any tool to customize</h3>
    </div>

    <div v-if="tool" class="tool-editor__items">
      <n-divider class="item__divider" />
      <div class="item__label">
        <span>{{ normalizedToolName }}</span>
        <n-icon size="20" :color="lockerColor" :component="lockerComponent" @click="toggleToolDraggable" />
      </div>

      <div class="item item__color">
        <span>Fill color</span>
        <n-color-picker v-model:value="tool.fill" />
      </div>
      <div class="item item__color">
        <span>Stroke color</span>
        <n-color-picker v-model:value="tool.stroke" />
      </div>
    </div>
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

.item {
  width: 100%;
  font-size: 1rem;

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

    .tool-locked {
      color: #ffad9f;
    }
  }

  &__divider {
    margin: 10px 0;
  }

  &__color {}
}
</style>