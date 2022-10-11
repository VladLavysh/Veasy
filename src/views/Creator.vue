<script setup lang="ts">
import ToolsBar from '../components/ToolsBar.vue';
import Canvas from '../components/Canvas.vue';
import MenuBar from '../components/MenuBar.vue';
import ToolEditor from '../components/ToolEditor.vue';
import ToggleButton from '../components/elements/ToggleButton.vue';
import { ref } from 'vue';

const isToolsPanelOpen = ref(false)
</script>

<template>
  <div class="creator">
    <ToolsBar :class="[isToolsPanelOpen ? 'tools-bar-wide' : '']" />
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
  height: calc(100vh - 35px);

  @media screen and (max-width: 530px) {
    flex-direction: column-reverse;
    justify-content: flex-end;
  }
}
</style>