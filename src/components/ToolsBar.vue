<script setup lang="ts">
import { TextSelection, List, Image, Blockchain, Barrier, Link, ChevronRight, Code, CircleDash } from '@vicons/carbon'
import ToolsBarItem from '../components/elements/ToolsBarItem.vue'
import { useCanvasStore } from '../store/canvas'
import { v4 as uuidv4 } from 'uuid'

const canvasStore = useCanvasStore()

const toolsBarItems = [
  { name: 'Text input', component: TextSelection },
  { name: 'List', component: List },
  { name: 'Image', component: Image },
  { name: 'Container', component: Blockchain },
  { name: 'Barrier', component: Barrier },
  { name: 'Link', component: Link },
  { name: 'Arrow', component: ChevronRight },
  { name: 'Code', component: Code },
  { name: 'Circle', component: CircleDash },
  { name: 'Circle', component: CircleDash },
  { name: 'Circle', component: CircleDash },
]

const dropItem = (e: MouseEvent, name: String) => {
  if (!canvasStore.isAddingAllowed) {
    return
  }

  canvasStore.addNewTool({
    name,
    id: uuidv4().toString()
  })

  canvasStore.changeAddingStatus(false)
}
</script>

<template>
  <section class="tools-bar">
    <h1>Tools Bar</h1>
    <div class="tools-bar__items">
      <ToolsBarItem v-for="item of toolsBarItems" :key="item.name" :tool="item" draggable="true"
        @dragend="dropItem($event, item.name)" />
    </div>
  </section>
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

  &__items {
    @include flex-row;

    width: 100%;

    flex-wrap: wrap;
    gap: 15px 0;

    padding: 5px 0 25px;
  }
}

.tools-bar-wide {
  width: 500px;
}
</style>
