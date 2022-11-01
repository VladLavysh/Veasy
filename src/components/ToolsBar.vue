<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import ToolsBarItem from '../components/elements/ToolsBarItem.vue'
import { ToolFromBar } from '../types';
import { toolsBarItems } from '../utils/ts/tools'
import { addToCanvas } from '../utils/ts/canvas'
import { useCanvasStore } from '../store/canvas'

const store = useCanvasStore()

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
    <div class="tools-bar__items">
      <h1 class="tools-bar__label">Tools</h1>

      <ToolsBarItem v-for="item of toolsBarItems" :key="item.name" :tool="item" draggable="true"
        @dragstart="draggingElementPos" @dragend="addToCanvas($event, newToolData(item))" />
    </div>

    <div class="tools-bar__list">
      <h1 class="tools-bar__label">Active tools</h1>
      <ul v-if="store.getToolsName.length">
        <li v-for="(itemName, idx) in store.getToolsName" :key="idx" draggable="true">
          {{ itemName }}
        </li>
      </ul>
      <h3 v-else> There are no tools here yet</h3>
    </div>

  </aside>
</template>

<style scoped lang="scss">
@import '../../src/utils/css/mixins.scss';

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

  &__label {
    width: 100%;
    height: 35px;
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

    overflow-y: scroll;
  }

  &__list {
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    max-height: 50%;

    background: #7f91a1;
    box-shadow: 0 0 10px #5e5e5e;

    overflow-y: scroll;

    &::before {
      content: '';

      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 5px;

      background: #fff;

      z-index: 7;
    }

    h3 {
      width: 100%;
      text-align: center;
      color: #fff;
    }

    li {
      color: #e3e8ed;
    }
  }
}

.tools-bar-wide {
  width: 500px;
}
</style>
