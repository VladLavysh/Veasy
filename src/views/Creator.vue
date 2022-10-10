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
  <div class="home">
    <ToolsBar :class="[isToolsPanelOpen ? 'tools-bar-wide' : '']" />
    <ToggleButton @open="isToolsPanelOpen = !isToolsPanelOpen" />

    <Canvas />

    <MenuBar />

    <!-- <n-tabs class="tabs" type="line" size="large" animated>
      <n-tab-pane name="tool" tab="Tool Editor">
        <ToolEditor/>
      </n-tab-pane>
      <n-tab-pane name="menu" tab="Menu">
        <MenuBar />
      </n-tab-pane>
    </n-tabs> -->
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100vh;
  max-height: 100vh;

  @media screen and (max-width: 530px) {
    flex-direction: column-reverse;
    justify-content: flex-end;
  }
}

.tabs {
  width: 90px;
  // min-width: 75px;

  // padding: 20px 5px;
  background-color: #7F91A1;
}
</style>