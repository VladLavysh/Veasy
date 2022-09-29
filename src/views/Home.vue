<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { startResize, resize, endResize } from '../utils/resize'
import ToolsBar from '../components/ToolsBar.vue';
import Canvas from '../components/Canvas.vue';
import MenuBar from '../components/MenuBar.vue';

const toolsBar = ref({})
const canvasSection = ref({})

const areSectionsReady = computed(() => {
  return '$el' in toolsBar.value && '$el' in canvasSection.value
})

onMounted(() => {
  toolsBar.value = toolsBar.value.$el
  canvasSection.value = canvasSection.value.$el
})
</script>

<template>
  <div class="home">
    <ToolsBar ref="toolsBar" />
    <div v-if="areSectionsReady" class="home__resizer" @mousedown="startResize(toolsBar, canvasSection, $event)"
      @mousemove="resize" @mouseup="endResize">
    </div>
    <Canvas ref="canvasSection" />
    <MenuBar />
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  justify-content: space-between;
  //gap: 10px;

  width: 100%;
  height: 100vh;
  max-height: 100vh;

  @media screen and (max-width: 530px) {
    flex-direction: column-reverse;
    justify-content: flex-end;
  }

  &__resizer {
    width: 10px;
    position: relative;

    cursor: e-resize;
    transition: background .2s ease-in-out;

    background-color: white;

    &::after {
      content: '';

      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      width: 3px;
      height: 25px;

      border-radius: 5px;
      transition: background .2s ease-in-out;

      z-index: 9;

      background-color: #b4b4b4;
    }

    &:hover {
      background: #ebebeb;

      &::after {
        background-color: #777777;
      }
    }
  }
}
</style>