<script setup lang="ts">
import ToolsBarItems from './ToolsBarItems.vue'
import ToolsBarActive from './ToolsBarActive.vue'

//const props = defineProps({
//  isToolsPanelOpen: Boolean
//})
</script>

<template>
  <aside class="tools-bar" ref="tools_bar">
    <ToolsBarItems />
    <ToolsBarActive />
  </aside>
</template>

<style scoped lang="scss">
.tools-bar {
  position: relative;

  width: 120px;
  min-width: 120px;

  transition: all .3s ease-in-out;
  //overflow-y: scroll;

  background-color: #7F91A1;

  @media screen and (max-width: 850px) {
    display: none;
  }
}

.tools-bar-wide {
  width: 500px;
}
</style>
