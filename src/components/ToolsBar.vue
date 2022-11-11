<script setup lang="ts">
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid'
import ToolsBarItem from '../components/elements/ToolsBarItem.vue'
import { ToolFromBar } from '../types';
import { toolsBarItems } from '../utils/ts/tools'
import { addToCanvas, removeFromCanvas } from '../utils/ts/canvas'
import { useCanvasStore } from '../store/canvas'
import { Close } from '@vicons/carbon'

const props = defineProps({
  isToolsPanelOpen: Boolean
})

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

const isListVisible = ref(false)

const toggleListVisibility = () => {
  if (!props.isToolsPanelOpen) return

  isListVisible.value = !isListVisible.value
}
</script>

<template>
  <aside class="tools-bar" ref="tools_bar">
    <div class="tools-bar__items">
      <h1 class="tools-bar__label">Tools</h1>

      <div class="tools-bar__items-content">
        <ToolsBarItem v-for="item of toolsBarItems" :key="item.name" :tool="item" draggable="true"
          @dragstart="draggingElementPos" @dragend="addToCanvas($event, newToolData(item))" />
      </div>
    </div>

    <div :class="['tools-bar__list', isListVisible ? 'list-active' : '']" @click="toggleListVisibility()">
      <h1 class="tools-bar__label">Active</h1>

      <Transition name="list" mode="out-in">
        <div v-if="isListVisible">
          <ul v-if="store.getToolsName.length">
            <li v-for="(itemName, idx) in store.getToolsName" :key="idx" draggable="true">
              <span>- {{ itemName }}</span>
              <n-icon size="20" :component="Close" @click.stop="removeFromCanvas(idx)" />
            </li>
          </ul>
          <h3 v-else>There are no tools here yet</h3>
        </div>
      </Transition>
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
    position: sticky;
    top: 5px;

    width: 100%;
    height: 30px;

    text-align: center;
    align-self: flex-start;
    color: #fff;
  }

  &__items {
    @include flex-column;
    width: 100%;
    height: calc(100% - 65px);

    padding: 5px 10px;
    box-sizing: border-box;

    overflow-y: scroll;
  }

  &__items-content {
    @include flex-row;
    flex-wrap: wrap;
    gap: 15px;
  }

  &__list {
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 65px;

    background: #7f91a1;
    box-shadow: 0 0 10px #5e5e5e;

    transition: all .3s ease-in-out;
    cursor: pointer;

    overflow-y: scroll;

    h3 {
      width: 100%;
      text-align: center;
      color: #fff;
    }

    li {
      @include flex-row;
      justify-content: flex-start;
      gap: 10px;

      list-style-type: none;

      color: #e3e8ed;

      i {
        padding: 5px;
      }
    }
  }

  .list-active {
    height: 50%;
    overflow-y: scroll;
  }
}

.tools-bar-wide {
  width: 500px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease-out;
}

.list-enter-from {
  opacity: 0;
}

.list-leave-to {
  opacity: 0;
}
</style>
