<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import { ToolFromBar } from '../../types';
import { toolsBarItems } from '../../utils/ts/tools'
import { addToCanvas } from '../../utils/ts/canvas'

import ToolsBarItem from './ToolsBarItem.vue'

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
  <div class="tools-bar__items">
    <h1 class="tools-bar__label">Tools</h1>

    <div class="tools-bar__items-content">
      <ToolsBarItem v-for="item of toolsBarItems" :key="item.name" :tool="item" draggable="true"
        @dragstart="draggingElementPos" @dragend="addToCanvas($event, newToolData(item))" />
    </div>
  </div>
</template>


<style scoped lang="scss">
@import '../../utils/css/mixins.scss';

.tools-bar__items {
  @include flex-column;
  flex: 1;
  width: 100%;

  padding: 5px 10px;
  box-sizing: border-box;

  overflow-y: scroll;
}

.tools-bar__label {
  position: sticky;
  top: 5px;

  width: 100%;
  height: 30px;

  text-align: center;
  align-self: flex-start;
  color: #fff;
}

.tools-bar__items-content {
  @include flex-row;
  flex-wrap: wrap;
  gap: 15px;

  transition: 0.3s ease-in-out all;
}
</style>
