<script lang="ts" setup>
import draggable from 'vuedraggable'
import { Close, Draggable } from '@vicons/carbon'
import { computed } from 'vue'

import { removeFromCanvas, handleStageMouseDown } from '../../utils/ts/canvas'
import { useCanvasStore } from '../../store/canvas'
import { useToolsStore } from '../../store/tools'
import { ToolConfig } from '../../types'

const toolsStore = useToolsStore()
const canvasStore = useCanvasStore()

const activeTools = computed({
  get() {
    return [...canvasStore.tools].reverse()
  },
  set(tools: ToolConfig[]) {
    canvasStore.updateToolsList(tools.reverse())
  }
})

const activeToolName = (name: string) => {
  return name.substring(0, name.indexOf('_') + 6)
}

const setSelectedTool = (name: string) => {
  // canvasStore.setSelectedTool(name)
  handleStageMouseDown(name)
}
</script>

<template>
  <div class='tools-bar__list'>
    <Transition name="list" mode="out-in">
      <div v-if="toolsStore.isPanelOpen">
        <draggable v-if="canvasStore.getActiveTools.length" v-model="activeTools" item-key="id" tag="ul"
          ghost-class="ghost-tool" handle=".handle-tool">
          <template #item="{ element }">
            <li @click="setSelectedTool(element.name)" :class="[canvasStore.selectedTool?.name === element.name ? 'active-tool' : '']">
              <n-icon size="20" class="handle-tool" :component="Draggable" />
              <span>{{ activeToolName(element.name) }}</span>
              <n-icon size="20" :component="Close" @click.stop="removeFromCanvas(element.id)" />
            </li>
          </template>
        </draggable>

        <h3 v-else>There are no tools yet</h3>
      </div>

      <h3 v-else>Tools: {{ canvasStore.getActiveTools.length }}</h3>
    </Transition>
  </div>
</template>


<style scoped lang="scss">
@import '../../utils/css/mixins.scss';

.tools-bar__list {
  width: 100%;
  max-height: 30%;

  padding: 0 10px;

  background: #7f91a1;
  border-top: 1px solid #fff;

  transition: all .25s ease-in-out;

  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;

  h3 {
    color: #fff;
    text-align: center;
    white-space: nowrap;
  }

  .ghost-tool {
    opacity: 0.8;
    background-color: #28bc99;
  }

  .handle-tool {
    transition: 0.25s ease-in-out all;
    cursor: move;

     &:hover {
      color: #28bc99;
    }
  }

  ul {
    padding: 0
  }

  li {
    @include flex-row;
    justify-content: space-between;

    color: #e3e8ed;

    border-radius: 5px;
    list-style-type: none;
    cursor: default;

    padding: 0 10px 0 20px;

    transition: 0.25s ease-in-out all;

    &:hover {
      background-color: #6f8497;
    }

    i:last-child {
      transition: 0.25s ease-in-out all;
      padding: 5px;
      cursor: pointer;

      &:hover {
        color: #fc5151;
      }
    }
  }
}

.active-tool {
  background-color: #28bc99;
}

.tools-bar__label {
  position: sticky;
  top: 5px;

  width: 100%;
  height: 30px;

  text-align: center;
  align-self: flex-start;
  color: #fff;

  margin: 0;
  padding: 10px 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease-in-out;
}

.list-enter-from {
  opacity: 0;
}

.list-leave-to {
  opacity: 0;
}
</style>
