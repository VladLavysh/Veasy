<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import ToolsBarItem from '../components/elements/ToolsBarItem.vue'
import { ToolFromBar } from '../types';
import { toolsBarItems } from '../utils/ts/tools'
import { addToCanvas } from '../utils/ts/canvas'

const newToolData = ({ name, konvaName }: ToolFromBar) => ({
  name,
  konvaName,
  id: uuidv4()
})

const draggingElementPos = (event: DragEvent) => {
  if (event.dataTransfer) {
    event.dataTransfer.setDragImage((event.target as Element), 45, 45);
  }
}
</script>

<template>
  <aside class="tools-bar">
    <h1 class="tools-bar__label">Tools</h1>

    <div class="tools-bar__items">
      <ToolsBarItem v-for="item of toolsBarItems" :key="item.name" :tool="item" draggable="true"
        @dragstart="draggingElementPos" @dragend="addToCanvas($event, newToolData(item))" />
    </div>
  </aside>
</template>

<style scoped lang="scss">
@import '../../src/utils/css/mixins.scss';

.tools-bar {
  width: 120px;
  min-width: 120px;

  transition: all .3s ease-in-out;
  overflow-y: scroll;

  background-color: #7F91A1;

  @media screen and (max-width: 850px) {
    display: none;
  }

  &__label {
    width: 100%;
    text-align: center;
    color: #fff;
  }

  &__items {
    @include flex-row;
    width: 100%;

    flex-wrap: wrap;
    gap: 15px;

    padding: 5px 10px;
    box-sizing: border-box;
  }
}

.tools-bar-wide {
  width: 500px;
}
</style>
