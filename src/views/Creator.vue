<script setup lang="ts">
import ToolsBar from '../components/tool/ToolsBar.vue';
import Canvas from '../components/canvas/Canvas.vue';
import ToolEditor from '../components/tool/ToolEditor.vue';
import ToggleButton from '../components/ToggleButton.vue';
import { ref } from 'vue';
//import { useCanvasStore } from '../store/canvas';

const isToolsPanelOpen = ref(false)

</script>

<template>
  <div class="creator">
    <ToolsBar :class="[isToolsPanelOpen ? 'tools-bar-wide' : '']" :isToolsPanelOpen="isToolsPanelOpen" />
    <ToggleButton @open="isToolsPanelOpen = !isToolsPanelOpen" />

    <Canvas />

    <ToolEditor />
  </div>
</template>

<style scoped lang="scss">
.creator {
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100vh;
  height: 100vh;

  @media screen and (max-width: 530px) {
    flex-direction: column-reverse;
    justify-content: flex-end;
  }
}
</style>