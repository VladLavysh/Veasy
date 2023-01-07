<script lang="ts" setup>
import draggable from 'vuedraggable'
import { computed } from 'vue'

import { Close } from '@vicons/carbon'
import { removeFromCanvas } from '../../utils/ts/canvas'
import { useCanvasStore } from '../../store/canvas'

const store = useCanvasStore()

const activeTools = computed({
  get() {
    return store.tools
  },
  set(tools) {
    store.updateToolsList(tools)
  }
})

const selectShape = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const shapeName = target.innerText

  //store.selectShape(shapeName)

}

const activeToolName = (name: string) => {
  return name.substring(0, name.indexOf('_') + 6)
}
</script>

<template>
  <div class='tools-bar__list'>
    <Transition name="list" mode="out-in">

      <draggable v-if="store.getActiveTools.length" v-model="activeTools" item-key="id" tag="ul"
        ghost-class="ghost-tool">
        <template #item="{ element }">
          <li @click="selectShape">
            <span>{{ activeToolName(element.name) }}</span>
            <n-icon size="20" :component="Close" @click.stop="removeFromCanvas(element.id)" />
          </li>
        </template>
      </draggable>

      <h3 v-else>There are no tools here yet</h3>

    </Transition>
  </div>
</template>


<style scoped lang="scss">
@import '../../utils/css/mixins.scss';

.tools-bar__list {
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 30%;

  background: #7f91a1;
  border-top: 1px solid #fff;

  transition: all .3s ease-in-out;

  overflow-y: scroll;

  h3 {
    width: 100%;
    text-align: center;
    color: #fff;
  }

  .ghost-tool {
    opacity: 0.8;
    background-color: #28bc99;
  }

  ul {
    padding: 0
  }

  li {
    @include flex-row;
    justify-content: space-between;

    color: #e3e8ed;

    list-style-type: none;
    cursor: move;

    padding: 0 30px 0 40px;

    transition: 0.2s ease-in-out all;

    &:hover {
      background-color: #637482;
    }

    i {
      transition: 0.2s ease-in-out all;
      padding: 5px;
      cursor: pointer;

      &:hover {
        color: #fc5151;
      }
    }
  }
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
  transition: all 0.3s ease-out;
}

.list-enter-from {
  opacity: 0;
}

.list-leave-to {
  opacity: 0;
}
</style>
