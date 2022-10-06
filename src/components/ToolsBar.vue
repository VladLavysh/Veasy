<script setup lang="ts">
import { TextSelection, List, Image, Checkbox, Barrier, Link, ChevronRight, Code, CircleDash } from '@vicons/carbon'
import ToolsBarItem from '../components/elements/ToolsBarItem.vue'
import { useCanvasStore } from '../store/canvas'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue';

const canvasStore = useCanvasStore()

// TODO: REFACTORING COMPONENTS TO LAZY LOAD!
const toolsBarItems = [
  { name: 'Text input', konvaName: 'v-text', component: TextSelection },
  { name: 'List', konvaName: '', component: List },
  { name: 'Image', konvaName: 'v-image', component: Image },
  { name: 'Container', konvaName: 'v-rect', component: Checkbox },
  { name: 'Barrier', konvaName: 'v-line', component: Barrier },
  { name: 'Link', konvaName: '', component: Link },
  { name: 'Arrow', konvaName: '', component: ChevronRight },
  { name: 'Code', konvaName: '', component: Code },
  { name: 'Circle', konvaName: 'v-circle', component: CircleDash },
  { name: 'Circle', konvaName: 'v-circle', component: CircleDash },
  { name: 'Circle', konvaName: 'v-circle', component: CircleDash },
]

const dropItem = (e: MouseEvent, name: String, konvaName: String) => {
  if (!canvasStore.isAddingAllowed) {
    return
  }

  const canvas = document.querySelector('.canvas') as HTMLDivElement

  canvasStore.addNewTool({
    name,
    konvaName,
    id: uuidv4().toString(),
    x: e.pageY - canvas.offsetTop,
    y: e.pageX - canvas.offsetLeft
  })

  canvasStore.changeAddingStatus(false)
}
</script>

<template>
  <section class="tools-bar">
    <h1>Tools Bar</h1>
    <div class="tools-bar__items">
      <ToolsBarItem v-for="item of toolsBarItems" :key="item.name" :tool="item" draggable="true"
        @dragend="dropItem($event, item.name, item.konvaName)" />
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
