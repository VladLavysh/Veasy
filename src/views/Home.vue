<script setup lang="ts">
import ToolsBar from '../components/ToolsBar.vue';
import Canvas from '../components/Canvas.vue';
import MenuBar from '../components/MenuBar.vue';
import ToggleButton from '../components/utils/ToggleButton.vue';
</script>

<template>
  <div class="home">
    <ToolsBar id="toolsBar" />
    <ToggleButton />
    <Canvas />
    <MenuBar />
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
</style>