<script setup lang="ts">
import ToolsBarItem from '../components/elements/ToolsBarItem.vue'
import { TextSelection, List, Image, Blockchain, Barrier, Link, ChevronRight, Code } from '@vicons/carbon'
//import { useToolsStore } from '../store/tools';
//const store = useToolsStore()
const toolsBarItems = [
  { name: 'Text input', component: TextSelection },
  { name: 'List', component: List },
  { name: 'Image', component: Image },
  { name: 'Container', component: Blockchain },
  { name: 'Barrier', component: Barrier },
  { name: 'Link', component: Link },
  { name: 'Arrow', component: ChevronRight },
  { name: 'Code', component: Code },
]
</script>

<template>
  <section class="tools-bar">
    <h1>Tools Bar</h1>
    <div class="tools-bar__items">
      <ToolsBarItem v-for="item of toolsBarItems" :key="item.name" :tool="item" />
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '../../src/utils/css/mixins.scss';

.tools-bar {
  width: 120px;
  min-width: 120px;

  transition: all .3s ease-in-out;

  background-color: #7F91A1;

  @media screen and (max-width: 850px) {
    display: none;
  }

  &__items {
    @include flex-row;

    flex-wrap: wrap;
    gap: 15px 0;
    width: 100%;
  }
}

.tools-bar-wide {
  width: 500px;
}
</style>
