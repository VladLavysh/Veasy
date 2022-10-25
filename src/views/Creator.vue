<script setup lang="ts">
import ToolsBar from '../components/ToolsBar.vue';
import Canvas from '../components/Canvas.vue';
import ToolEditor from '../components/ToolEditor.vue';
import ToggleButton from '../components/elements/ToggleButton.vue';
import { onMounted, ref } from 'vue';
import { useCanvasStore } from '../store/canvas';

const store = useCanvasStore()

const isToolsPanelOpen = ref(false)

onMounted(async () => {
  const selectedCV = await store.getSelectedCV()
  console.log('selectedCV', selectedCV);
})

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
  height: 100vh;
  height: calc(100vh - 40px);

  @media screen and (max-width: 530px) {
    flex-direction: column-reverse;
    justify-content: flex-end;
  }
}
</style>